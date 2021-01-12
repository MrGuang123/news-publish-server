import { Context } from 'koa'

const responseFormat = (ctx: Context) => {
  const commonResponse = {
    code: 0,
    msg: 'success',
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
    if(regexp.test(ctx.originalUrl)) {
      responseFormat(ctx)
    }
  }
}

export default responseUrlFiter
