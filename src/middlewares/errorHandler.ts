import Koa from 'koa'
import { Logger } from 'log4js'
import StatusConstance from '@assets/StatusConstance'
class ErrorHandler{

  static error(app: Koa) {
    // 全局错误捕获
    app.use(async (ctx: Koa.Context, next: () => Promise<unknown>) => {
      try {
        await next()
      } catch (err) {
        const code: number = ctx.code || 500
        const statusChar = StatusConstance[code] || 'UNKNOWN'

        ctx.logger.error(`状态码：${code} - ${statusChar} - 消息：${err.message}`)
        ctx.status = code
        ctx.body = {
          code: code,
          msg: `${statusChar} - ${err.message}`
        }
      }
    })

    // 捕获非200错误
    app.use(async (ctx, next) => {
      await next()
      if(ctx.status !== 200) {
        const statusChar = StatusConstance[ctx.status] || 'UNKNOWN'

        ctx.logger.error(`状态码：${ctx.status} - ${statusChar} - 消息：${ctx.request.url}`)
        ctx.status = ctx.status
        ctx.body = {
          code: ctx.status,
          msg: `${statusChar} - ${ctx.request.url}`
        }
      }
    })
  }
}

export default ErrorHandler
