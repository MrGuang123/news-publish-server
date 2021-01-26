import { Context } from 'koa'
import StatusConstance from '@libs/StatusConstance'

const responseFormat = (ctx: Context) => {
  const commonResponse = {
    code: ctx.status,
    msg: StatusConstance[ctx.status] || '暂无数据',
  }
  let key = ''

  if (ctx.body && typeof ctx.body === 'string') {
    key = 'msg'
  } else if (ctx.body) {
    key = 'data'
  }

  if (ctx.status >= 200 && ctx.status < 300) {
    ctx.status = 200
  }

  ctx.body = ctx.body ? {
    ...commonResponse,
    [key]: ctx.body
  } : commonResponse
}

const responseUrlFiter = (reg: string) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const regexp = new RegExp(reg)
    await next()
    if (regexp.test(ctx.originalUrl) && ctx.status >= 200 && ctx.status < 300) {
      responseFormat(ctx)
    }
  }
}

export default responseUrlFiter
