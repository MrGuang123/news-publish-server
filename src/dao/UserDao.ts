import UserModel from '@models/UserModel'
import { UserListQueryInterface } from "@interfaces/UserInterface"
import { AuthUser } from '@interfaces/AuthInterface'
class UserDao {
  getUserList(params: UserListQueryInterface) {

    return UserModel.findAll({
      attributes: {
        exclude: ['password']
      },
      limit: params.pageSize,
      offset: params.pageSize * (params.pageIndex - 1)
    })
  }
  findUser(userInfo: AuthUser): Promise<AuthUser>{
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
