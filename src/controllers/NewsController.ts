import { NewsInterface, NewsListQueryInterface, NewsInfoQueryInterface, CommonCreateInterface } from '@interfaces/NewsInterface'
import { GET, POST, PUT, DELETE, route } from 'awilix-koa'
import { RouterContext } from '@koa/router'

interface NewsServiceInterface {
  newsService: NewsInterface
}

@route('/api')
class NewsController {
  newsService: NewsInterface
  constructor({ newsService }: NewsServiceInterface) {
    this.newsService = newsService
  }

  // 获取新闻列表
  @route('/news')
  @GET()
  async getNewsList(ctx: RouterContext, next: () => Promise<any>) {
    const params: NewsListQueryInterface = ctx.request.query
    const result = await this.newsService.getNewsList(params)

    ctx.body = result
  }

  // 获取新闻详情
  @route('/news/:id')
  @GET()
  async getNewsInfo(ctx: RouterContext, next: () => Promise<any>) {
    const params: NewsInfoQueryInterface = ctx.params
    const result = await this.newsService.getNewsInfo(params)

    ctx.body = result
  }

  // 创建新闻
  @route('/news')
  @POST()
  async createNews(ctx: RouterContext, next: () => Promise<any>) {
    const params: CommonCreateInterface = ctx.request.body
    const result = await this.newsService.createNews(params)

    ctx.body = result
  }

  // 修改新闻
  @route('/news/:id')
  @PUT()
  async updateNews(ctx: RouterContext, next: () => Promise<any>) {
    const params: CommonCreateInterface = ctx.request.body
    const { id } = ctx.params
    params.id = id
    const result = await this.newsService.updateNews(params)

    ctx.body = result
  }

  // 删除新闻
  @route('/news/:id')
  @DELETE()
  async deleteNews(ctx: RouterContext, next: () => Promise<any>) {
    const params: NewsInfoQueryInterface = ctx.params
    const result = await this.newsService.deleteNews(params)

    ctx.body = result
  }

}

export default NewsController
