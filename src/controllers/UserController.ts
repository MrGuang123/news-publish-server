import { UserInterface } from '@interfaces/UserInterface';
import { GET, route } from 'awilix-koa'
import Router from '@koa/router'

interface UserServiceInterface {
  userService: UserInterface;
}
// const Next: () => Promise<unknown>;

@route('/api/user')
class ApiController {
  private userService: UserInterface;
  constructor({ userService }: UserServiceInterface) {
    this.userService = userService;
  }

  @route('/list')
  @GET()
  async newsList(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<any> {
    // 获取参数传递给service
    const data = await this.userService.getUserList()

    ctx.body = data
  }
}

export default ApiController
