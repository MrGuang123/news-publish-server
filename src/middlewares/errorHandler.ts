import Koa from 'koa'
import { Logger } from 'log4js'
import StatusConstance from '@libs/StatusConstance'
class ErrorHandler {

  static error(app: Koa) {
    // 全局错误捕获
    app.use(async (ctx: Koa.Context, next: () => Promise<unknown>) => {
      try {
        await next()
      } catch (err) {
        const code: number = ctx.code || 500
        let statusChar: string
        if (err.errors && err.errors[0] && err.errors[0].message) {
          statusChar = err.errors[0].message
        } else {
          statusChar = StatusConstance[code] || 'UNKNOWN'
        }

        ctx.logger.error(`状态码：${code} - ${statusChar} - 消息：${err.message}`)
        // ctx.status = code
        ctx.status = 200
        ctx.body = {
          code: code,
          msg: `${statusChar} - ${err.message}`
        }
      }
    })

    // 捕获非200错误
    app.use(async (ctx, next) => {
      await next()
      if (ctx.status >= 300) {
        const statusChar = StatusConstance[ctx.status] || 'UNKNOWN'

        ctx.logger.error(`状态码：${ctx.status} - ${statusChar} - 消息：${ctx.request.url}`)
        // ctx.status = ctx.status
        // 为了正常返回前端请求，前端通过code来判断当前错误信息
        const code = ctx.status
        ctx.status = 200
        ctx.body = {
          code: code,
          msg: `${statusChar} - ${ctx.request.url}`
        }
      }

      if (typeof ctx.body === 'string' && ctx.body.includes('ErrorInfo')) {
        const errorArr = ctx.body.split(':')
        const ErrorCode = Number(errorArr[1]) || 400
        const errorMsg = errorArr[2] || StatusConstance[ErrorCode] || '客户端错误'
        ctx.status = ErrorCode
        ctx.body = {
          code: ErrorCode,
          msg: `${errorMsg} - ${ctx.request.url}`
        }
      }
    })
  }
}

export default ErrorHandler
