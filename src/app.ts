import Koa from 'koa'
import KoaStatic from 'koa-static'
import { addAliases } from 'module-alias'

import config from './config'
import ErrorHandler from './middlewares/errorHandler'
import responseFilter from './middlewares/response'
import Logger from './middlewares/logger'
import ControllerInit from './ControllerInit'
import { createContainer, Lifetime } from 'awilix'
import { scopePerRequest, loadControllers } from 'awilix-koa'

const app = new Koa()

// 创建映射，并且需要在tsconfig中配置baseUrl和paths，否则ts报错
addAliases({
  '@': `${__dirname}/src`,
  '@interfaces': `${__dirname}/src/interfaces`
})

// 日志添加到ctx
Logger.init(app)

// 统一处理响应数据格式
app.use(responseFilter('^/api'))

// 错误处理
ErrorHandler.error(app)

// 使用IOC方式初始化路由
ControllerInit.init(app)


// 设定静态资源文件夹
app.use(KoaStatic(config.staticDir))

// koa2-connect-history-api-fallback中间件让koa2支持SPA路由

app.listen(config.port, () => {
  console.log(`server start at: ${config.port}`)
})
