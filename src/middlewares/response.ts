import { Context } from 'koa'
import StatusConstance from '../assets/StatusConstance'

const responseFormat = (ctx: Context) => {
  const commonResponse = {
    code: ctx.status,
    msg: StatusConstance[ctx.status],
  }

  ctx.body = ctx.body ? {
    ...commonResponse,
    data: ctx.body
  } : commonResponse
}

const responseUrlFiter = (reg: string) => {
  return async (ctx: Context, next: () => Promise<any>) => {
    const regexp = new RegExp(reg)
    await next()
    if(regexp.test(ctx.originalUrl) && ctx.status === 200) {
      responseFormat(ctx)
    }
  }
}

export default responseUrlFiter
