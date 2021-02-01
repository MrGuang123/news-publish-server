import { LabelDataInterface, LabelInterface, LabelListQueryInterface, LabelInfoQueryInterface, CommonCreateInterface } from '@interfaces/LabelInterface'
import { GET, POST, PUT, DELETE, route} from 'awilix-koa'
import { RouterContext } from '@koa/router'

interface LabelServiceInterface {
  labelService: LabelInterface
}

@route('/api')
class LabelController {
  labelService: LabelInterface
  constructor({ labelService }: LabelServiceInterface) {
    this.labelService = labelService
  }

  // 获取全部标签列表
  @route('/labels')
  @GET()
  async getLabelList(ctx: RouterContext, next: () => Promise<any>) {
    const params: LabelListQueryInterface = ctx.request.query
    const data = await this.labelService.getLabelList(params)

    ctx.body = data
  }

  // 获取标签信息
  @route('/labels/:id')
  @GET()
  async getLabelInfo(ctx: RouterContext, next: () => Promise<any>) {
    const params: LabelInfoQueryInterface = ctx.params
    const data = await this.labelService.getLabelInfo(params)

    ctx.body = data
  }

  // 创建标签
  @route('/labels')
  @POST()
  async createLabel(ctx: RouterContext, next: () => Promise<any>) {
    const params: CommonCreateInterface = ctx.request.body
    const data = await this.labelService.createLabel(params)

    // 设置ctx.body为一个数据之前，ctx.status的状态一直都是404
    // 刚才犯的错误是return了data，并没有设置ctx.body为data，导致ctx.status一直是404。。。
    ctx.body = data
  }

  // 更新标签
  @route('/labels/:id')
  @PUT()
  async updateLabel(ctx: RouterContext, next: () => Promise<any>) {
    const params: CommonCreateInterface = ctx.request.body
    const { id } = ctx.params
    params.id = id
    const data = await this.labelService.updateLabel(params)

    ctx.body = data
  }

  // 删除标签
  @route('/labels/:id')
  @DELETE()
  async deleteLabel(ctx: RouterContext, next: () => Promise<any>) {
    const params: LabelInfoQueryInterface = ctx.params
    const data = await this.labelService.deleteLabel(params)

    ctx.body = data
  }
}

export default LabelController
