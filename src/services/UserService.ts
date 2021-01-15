import { UserInterface, UserListQueryInterface } from "@interfaces/UserInterface"
import UserDao from '@dao/UserDao'
class UserService implements UserInterface {
  public userDao: UserDao
  constructor() {
    this.userDao = new UserDao()
  }
  getUserList(params: UserListQueryInterface) {
    const param = Object.assign({
      pageIndex: 1,
      pageSize: 10
    }, params)
    // 拿到参数解析处理 然后调用dao
    return this.userDao.getUserList(param)
  }
}

export default UserService
