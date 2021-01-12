import Koa from 'koa'
import KoaStatic from 'koa-static'
import * as log4js from 'log4js'
import { createContainer, Lifetime } from 'awilix'
import { scopePerRequest, loadControllers } from 'awilix-koa'
import { addAliases } from 'module-alias'

import config from './config'
// import initController from './other'
import ErrorHandler from './middlewares/errorHandler'
import responseFilter from './middlewares/response'

const app = new Koa()

// 创建映射，并且需要在tsconfig中配置baseUrl和paths，否则ts报错
addAliases({
  '@': `${__dirname}/src`,
  '@interfaces': `${__dirname}/src/interfaces`
})

// 创建容器，装载所有服务，为依赖注入做准备
const container = createContainer()
container.loadModules([`${__dirname}/services/*.ts`], {
  // 使用驼峰命名
  formatName: 'camelCase',
  resolverOptions: {
    // TRANSIENT:默认值，每次都注册，每次都返回一个新的实例,
    // SCOPED:作用域是容器，同一作用域或者其子作用域，将会重用,
    // SINGLETON: 单例，任何情况下都被重用
    lifetime: Lifetime.SCOPED
  }
})
// 把container注入到koa
app.use(scopePerRequest(container))
// 加载全部路由
app.use(loadControllers(`${__dirname}/controllers/*.ts`))

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

// 统一处理响应数据格式
app.use(responseFilter('^/api'))

// 设定静态资源文件夹
app.use(KoaStatic(config.staticDir))

// 初始化路由
// initController(app)


// koa2-connect-history-api-fallback中间件让koa2支持SPA路由

app.listen(config.port, () => {
  console.log(`server start at: ${config.port}`)
})
