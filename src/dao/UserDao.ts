import UserModel from '@models/UserModel'
import RoleModel from '@models/RolesModel'
import { UserListQueryInterface, UserCreateParams, UserDataInterface } from "@interfaces/UserInterface"
import { AuthUser } from '@interfaces/AuthInterface'
import { Op } from 'sequelize'

UserModel.belongsTo(RoleModel, {
  foreignKey: 'roleIds',
  targetKey: 'id',
  as: 'role'
})

type updateData = {
  [key in keyof AuthUser]?: any
}
class UserDao {

  // 获取用户列表
  getUserList(params: UserListQueryInterface) {
    let searchOption = {
      isDelete: 0
    }
    if(params.userName) {
      searchOption = Object.assign(searchOption, {
        userName: {
          [Op.like]: `%${params.userName}%`
        }
      })
    }

    return UserModel.findAll({
      // 取消sequelize包装，开启原生查询，提高效率
      // raw: true,
      subQuery: false,
      where: searchOption,
      include: [{
        model: RoleModel,
        as: 'role',
        attributes:[
          ['roleName', 'name']
        ]
      }],
      attributes: {
        exclude: ['password', 'token', 'isDelete']
      },
      limit: params.pageSize,
      offset: params.pageSize * (params.pageIndex - 1)
    })
  }

  // 获取单个用户信息
  getUserInfo(userFlag: string | number): Promise<UserDataInterface> {
    const action = typeof userFlag === 'string' ? 'userName' : 'id'
    return UserModel.findOne({
      where: {
        isDelete: 0,
        [action]: userFlag
      },
      attributes: {
        exclude: ['isDelete']
      }
    })
  }

  // 创建用户
  createUser(userInfo: UserCreateParams): Promise<AuthUser> {
    return UserModel.create(userInfo)
  }

  // 更新用户
  updateUser(targetUserInfo: updateData) {
    return UserModel.update(targetUserInfo, {
      where: {
        id: targetUserInfo.id
      }
    })
  }

  // 删除用户
  deleteUser(userInfo: AuthUser) {
    // 真实删除
    // return UserModel.destroy({
    //   where: {
    //     id: userInfo.id
    //   }
    // })

    // 软删除，只改变属性
    const params = Object.assign(userInfo, {
      isDelete: 1
    })
    return UserModel.update(params, {
      where: {
        id: userInfo.id
      }
    })
  }

  // 获取作者个数
  getAuthorNum(): Promise<any> {
    const params = {
      isDelete: 0,
      [Op.or]: [
        {
          roleIds: '0'
        },
        {
          roleIds: '1'
        }
      ]
    }
    return UserModel.count({
      where: params
    })
  }
}

export default UserDao
