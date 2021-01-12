import { IApi } from '@interfaces/IApi';
import { GET, route } from 'awilix-koa'
import Router from '@koa/router'

interface ApiServiceInterface {
  apiService: IApi;
}
// const Next: () => Promise<unknown>;

@route('/api')
class ApiController {
  private apiService: IApi;
  constructor({ apiService }: ApiServiceInterface) {
    this.apiService = apiService;
  }

  @route('/list')
  @GET()
  async newsList(ctx: Router.RouterContext, next: () => Promise<unknown>):Promise<any> {
    const data = await this.apiService.getInfo()
    ctx.body = data
  }
}

export default ApiController
