import Koa from 'koa'
import KoaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import cors from '@koa/cors'

// 创建路径别名
import './libs/PathAlias'

import config from './config'
import ErrorHandler from './middlewares/errorHandler'
import responseFilter from './middlewares/response'
import Logger from './middlewares/logger'
import ControllerInit from './ControllerInit'

const app = new Koa()

// 处理请求参数
app.use(bodyParser())

// 提供重要的安全头部信息
app.use(helmet())

// 允许跨域
app.use(cors())

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
