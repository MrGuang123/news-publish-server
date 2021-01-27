import { AuthControllerInterface, LoginParam, AuthUser, LoginResult } from "@interfaces/AuthInterface"
import UserDao from '@dao/UserDao'
import { Authentication } from '@libs/Auth'
import { isInBlackListValidate } from '@utils/smallUtils'
// import store from '@libs/RedisClass'

class AuthService implements AuthControllerInterface {
  public userDao: UserDao
  public authentication: Authentication
  constructor() {
    this.userDao = new UserDao()
    this.authentication = Authentication.getAuthentication()
  }

  // 登录
  async login(params: LoginParam, originalUrl: string) {
    // 如果不存在用户名或者密码返回参数错误
    if (!params.userName || !params.password) {
      return 'ErrorInfo:400:用户名或者密码不存在'
    }

    // 从数据库读取用户信息
    let user = await this.userDao.getUserInfo(params.userName)
    // 如果密码不符合返回权限错误
    if (user.password !== params.password) {
      return 'ErrorInfo:401:密码验证错误'
    }
    if (user.token === null && !isInBlackListValidate(originalUrl)) {
      return 'ErrorInfo:401:没有权限或者权限已失效'
    }

    // 将model进行JSON化并生成token
    const userJson = user.toJSON()
    userJson.token = null
    const token = this.authentication.getToken(userJson)
    userJson.token = token
    delete userJson.password

    // 将token等信息存储到Redis
    // store.setKey(`token:${userJson.id}`, JSON.stringify({
    //   userName: userJson.userName,
    //   password: userJson.password,
    //   token
    // }))

    // 将token添加到用户信息中
    try {
      await this.userDao.updateUser(userJson)

      return userJson
    } catch (err) {
      return 'ErrorInfo:400:token存储失败'
    }
  }

  // 退出登录
  async logout(userId: number) {
    try {
      const userData = await this.userDao.getUserInfo(Number(userId)) as AuthUser
      const userJson = userData.toJSON()
      userJson.token = null

      await this.userDao.updateUser(userJson)
      return '退出登陆成功'
    } catch (err) {
      return 'ErrorInfo:400:退出登陆失败'
    }
  }
}

export default AuthService
