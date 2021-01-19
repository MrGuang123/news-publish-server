import { UserInterface, UserListQueryInterface } from "@interfaces/UserInterface"
import UserDao from '@dao/UserDao'
class UserService implements UserInterface {
  public userDao: UserDao
  constructor() {
    this.userDao = new UserDao()
  }

  // 获取全部用户列表
  getUserList(params: UserListQueryInterface) {
    const param = Object.assign({
      pageIndex: 1,
      pageSize: 10
    }, params)

    return this.userDao.getUserList(param)
  }

  // 获取一个用户信息
  getUserInfo(params: UserListQueryInterface) {
    const param = Object.assign({
      pageIndex: 1,
      pageSize: 10
    }, params)

    return this.userDao.getUserList(param)
  }

  // 创建用户
  createUser(params: UserListQueryInterface) {
    const param = Object.assign({
      pageIndex: 1,
      pageSize: 10
    }, params)

    return this.userDao.getUserList(param)
  }

  // 更新用户信息
  updateUser(params: UserListQueryInterface) {
    const param = Object.assign({
      pageIndex: 1,
      pageSize: 10
    }, params)

    return this.userDao.getUserList(param)
  }

  // 删除用户
  deleteUser(params: UserListQueryInterface) {
    const param = Object.assign({
      pageIndex: 1,
      pageSize: 10
    }, params)

    return this.userDao.getUserList(param)
  }
}

export default UserService
