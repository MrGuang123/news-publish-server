import { UserInterface } from "@interfaces/UserInterface"
import UserDao from '../dao/UserDao'

const userDao = new UserDao()
class UserService implements UserInterface {
  getUserList() {
    // 拿到参数解析处理 然后调用dao
    return userDao.getUserList()
  }
}

export default UserService
