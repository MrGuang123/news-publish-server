import { Context } from 'koa'
import { AuthInterface } from '@interfaces/AuthInterface'
import config from '../config'

interface AuthOptions {
  blackList?: string[]
}

export function AuthMiddleware(authentication: AuthInterface, options: AuthOptions = { blackList: config.authBlackList }) {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    // 使用Bearer规范的token
    // 当前地址是否包含在黑名单中，如果是返回true
    const isInBlackList = options.blackList && options.blackList.some(url => {
      const reg = new RegExp(url)
      return reg.test(ctx.originalUrl)
    })

    if (!isInBlackList && !ctx.headers.authorization) {
      ctx.status = 403
    } else if (!isInBlackList) {
      const tokenArr = ctx.headers.authorization.split(' ');
      const token = tokenArr[0] === 'Bearer' ? tokenArr[1] : ''
      const user = await authentication.validate(token)

      if (user) {
        ctx.state.user = user
      } else {
        ctx.status = 403
      }
    }
    await next()
  }
}
