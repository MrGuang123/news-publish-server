const Koa = require('koa')

import config from './config'

const app = new Koa()

app.use(ctx => {
  ctx.body = 'hello koa test6'
})

app.listen(config.port, () => {
  console.log(`server start at: ${config.port}`)
})
