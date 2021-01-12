import Koa from 'koa'
import { Logger } from 'log4js'
class ErrorHandler {
  static error(app: Koa, logger: Logger) {
    // 全局错误捕获
    app.use(async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        logger.error(err.message)
        ctx.body = {
          code: 500,
          msg: err
        }
      }
    })

    // 处理404
    app.use(async (ctx, next) => {
      await next()
      if (ctx.status === 404) {
        ctx.body = {
          code: 404,
          msg: '页面不存在'
        }
      }
    })
  }
}

export default ErrorHandler
