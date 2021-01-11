import * as Koa from 'koa'
import * as KoaStatic from 'koa-static'
import * as log4js from 'log4js'

import config from './config'
import initController from './controllers'
import ErrorHandler from './middlewares/errorHandler'

const app = new Koa()

// 日志处理
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

// 错误处理
ErrorHandler.error(app, logger)

// 设定静态资源文件夹
app.use(KoaStatic(config.staticDir))

// 初始化路由
initController(app)


// koa2-connect-history-api-fallback中间件让koa2支持SPA路由

app.listen(config.port, () => {
  console.log(`server start at: ${config.port}`)
})
