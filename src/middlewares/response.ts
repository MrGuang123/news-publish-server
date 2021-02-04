import { Context } from 'koa'
import StatusConstance from '@libs/StatusConstance'

const responseFormat = (ctx: Context) => {
  const commonResponse = {
    code: ctx.status,
    msg: StatusConstance[ctx.status],
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

  // ctx.body = ctx.body ? {
  //   ...commonResponse,
  //   [key]: ctx.body
  // } : commonResponse
  if(ctx.body && ctx.body.code >= 300) {
    ctx.body = Object.assign(commonResponse, ctx.body)
  }else if (ctx.body) {
    ctx.body = {
      ...commonResponse,
      [key]: ctx.body
    }
  }else {
    ctx.body = commonResponse
  }
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
