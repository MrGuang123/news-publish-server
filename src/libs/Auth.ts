import jwt from 'jsonwebtoken'
import config from '../config'
import { AuthInterface, AuthUser } from '@interfaces/AuthInterface'
import UserDao from '@dao/UserDao'
import StatusConstance from '@assets/StatusConstance'

// jwt默认加密方式：(HMAC SHA256)
export class Authentication implements AuthInterface {
  private userDao: UserDao
  private secret: string

  constructor(userDao: UserDao) {
    this.userDao = userDao
    this.secret = config.secret
  }

  static getAuthentication() {
    return new Authentication(new UserDao())
  }

  async validate(token: string): Promise<AuthUser> | undefined {
    try {
      const userInfo = jwt.verify(token, this.secret) as AuthUser
      const authUser: AuthUser = await this.userDao.findUser(userInfo)

      return authUser
    }catch(err) {
      // throw new Error(`403 - ${StatusConstance[403]}`)
      return undefined
    }
  }
  getToken(authUser: AuthUser): string {
    return jwt.sign(authUser, this.secret, {
      expiresIn: 2 * 60 * 60
    })
  }
}
