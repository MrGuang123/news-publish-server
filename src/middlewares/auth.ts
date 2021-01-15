import { Context } from 'koa'
import { AuthInterface } from '@interfaces/AuthInterface'


export function Auth(authentication: AuthInterface) {
  return async (ctx: Context, next: () => Promise<unknown>) => {
    const tokenArr = ctx.headers.authorization.split(' ');
    const token = tokenArr[0] === 'Bearer' ? tokenArr[1] : ''
    const user = await authentication.validate(token)

    ctx.state.user = user
    await next()
  }
}
