import * as Koa from 'koa'
import * as KoaStatic from 'koa-static'

import config from './config'
import initController from './controllers'

const app = new Koa()

// 设定静态资源文件夹
app.use(KoaStatic(config.staticDir))

// 初始化路由
initController(app)

// koa2-connect-history-api-fallback中间件让koa2支持SPA路由

app.listen(config.port, () => {
  console.log(`server start at: ${config.port}`)
})
