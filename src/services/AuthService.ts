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
    // 如果不存在用户名或者密码返回参数错误
    if (!params.userName || !params.password) {
      return 'ErrorCode:400'
    }

    // 从数据库读取用户信息
    let user = await this.userDao.getUserInfo(params.userName)
    // 如果密码不符合返回权限错误
    if(user.password !== params.password) {
      return 'ErrorCode:401'
    }

    // 将model进行JSON化并生成token
    const userJson = user.toJSON()
    const token = this.authentication.getToken(userJson)

    // 将token等信息存储到Redis

    return userJson
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
