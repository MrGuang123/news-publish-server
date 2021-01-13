import Koa from 'koa'
import log4js from 'log4js'

class Logger {
  static init(app: Koa) {
    app.use(async (ctx: Koa.Context, next: () => Promise<void>) => {
      log4js.configure({
        appenders: {
          globalError: {
            type: 'file',
            filename: './logs/error.log'
          }
        },
        categories: {
          default: {
            appenders: ['globalError'],
            level: 'error'
          }
        }
      })
      const logger = log4js.getLogger()
      logger.level = 'debug'

      ctx.logger = logger
      await next()
    })
  }
}

export default Logger
