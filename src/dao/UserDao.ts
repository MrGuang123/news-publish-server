import UserModel from '@models/UserModel'
import { UserListQueryInterface } from "@interfaces/UserInterface"
import { AuthUser } from '@interfaces/AuthInterface'

type updateData = {
  [key in keyof AuthUser]?: any
}
class UserDao {

  // 获取用户列表
  getUserList(params: UserListQueryInterface) {

    return UserModel.findAll({
      attributes: {
        exclude: ['password']
      },
      limit: params.pageSize,
      offset: params.pageSize * (params.pageIndex - 1)
    })
  }

  // 获取单个用户信息
  getUserInfo(userName: string): Promise<AuthUser> {
    return UserModel.findOne({
      where: {
        userName: userName
      },
      attributes: {
        exclude: ['password']
      }
    })
  }

  // 创建用户
  createUser(userInfo: AuthUser): Promise<AuthUser> {
    return UserModel.findOne({
      where: {
        id: userInfo.id,
        telephone: userInfo.telephone,
        roleIds: userInfo.roleIds
      },
      attributes: ['id', 'telephone', 'roleIds']
    })
  }

  // 更新用户
  async updateUser(targetUserInfo: updateData) {
    const result = await UserModel.update(targetUserInfo, {
      where: {
        id: targetUserInfo.id
      }
    })

    const user = await this.getUserInfo(targetUserInfo.userName)
    console.log(user.toJSON())
    return result
  }

  // 删除用户
  deleteUser(userInfo: AuthUser): Promise<AuthUser> {
    return UserModel.findOne({
      where: {
        id: userInfo.id,
        telephone: userInfo.telephone,
        roleIds: userInfo.roleIds
      },
      attributes: ['id', 'telephone', 'roleIds']
    })
  }
}

export default UserDao
