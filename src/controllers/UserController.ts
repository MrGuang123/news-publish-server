import { UserInterface, UserListQueryInterface, UserInfoQueryInterface, UserCreateParams } from '@interfaces/UserInterface';
import { GET, POST, PUT, DELETE, route } from 'awilix-koa'
import Router from '@koa/router'

interface UserServiceInterface {
  userService: UserInterface;
}


@route('/api')
class ApiController {
  private userService: UserInterface;
  constructor({ userService }: UserServiceInterface) {
    this.userService = userService;
  }

  // 获取全部用户列表
  @route('/users')
  @GET()
  async getUserList(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<any> {
    const params: UserListQueryInterface = ctx.request.query
    const data = await this.userService.getUserList(params)

    ctx.body = data
  }

  // 获取一个用户信息
  @route('/users/:id')
  @GET()
  async getUserInfo(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<any> {
    const params: UserInfoQueryInterface = ctx.params
    const data = await this.userService.getUserInfo(params)

    ctx.body = data || {}
  }

  // 创建用户
  @route('/users')
  @POST()
  async createUser(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<any> {
    const params: UserCreateParams = ctx.request.body
    const data = await this.userService.createUser(params)

    ctx.body = data
  }

  // 更新用户信息
  @route('/users/:id')
  @PUT()
  async updateUser(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<any> {
    const params: UserListQueryInterface = ctx.request.query
    const data = await this.userService.updateUser(params)

    ctx.body = data
  }

  // 删除用户
  @route('/users/:id')
  @DELETE()
  async deleteUser(ctx: Router.RouterContext, next: () => Promise<unknown>): Promise<any> {
    const params: UserInfoQueryInterface = ctx.params
    const data = await this.userService.deleteUser(params)

    ctx.body = data
  }
}

export default ApiController
