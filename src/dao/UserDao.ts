import UserModel from '@models/UserModel'
import { UserListQueryInterface, UserCreateParams, UserDataInterface } from "@interfaces/UserInterface"
import { AuthUser } from '@interfaces/AuthInterface'

type updateData = {
  [key in keyof AuthUser]?: any
}
class UserDao {

  // 获取用户列表
  getUserList(params: UserListQueryInterface) {

    return UserModel.findAll({
      // 取消sequelize包装，提高效率
      raw: true,
      where: {
        isDelete: 0
      },
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
}

export default UserDao
