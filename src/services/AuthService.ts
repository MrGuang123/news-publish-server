import { AuthControllerInterface, LoginParam, LogoutParam, LoginResult } from "@interfaces/AuthInterface"
import UserDao from '@dao/UserDao'
import { Authentication } from '@libs/Auth'
class AuthService implements AuthControllerInterface {
  public userDao: UserDao
  public authentication: Authentication
  constructor() {
    this.userDao = new UserDao()
    this.authentication = Authentication.getAuthentication()
  }

  // 获取全部用户列表
  async login(params: LoginParam) {
    if (!params.userName || !params.password) {
      return 'ErrorCode:400'
    }
    let user = await this.userDao.getUserInfo(params.userName)
    const userJson = user.toJSON()
    delete userJson.token
    // console.log(user.toJSON())
    const token = this.authentication.getToken(userJson)
    userJson.token = token
    console.log(token)
    console.log(token.length)
    return this.userDao.updateUser(userJson)

  }

  // 获取一个用户信息
  logout(params: LogoutParam) {
    const param = Object.assign({
      pageIndex: 1,
      pageSize: 10
    }, params)
    return 'world'
    // return this.userDao.getUserList(param)
  }
}

export default AuthService
