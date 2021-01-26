import { AuthControllerInterface } from '@interfaces/AuthInterface'
import { GET, POST, route } from 'awilix-koa'
import Router from '@koa/router'

interface AuthService {
  authService: AuthControllerInterface
}

@route('/api/auth')
class AuthController {
  private authService: AuthControllerInterface
  constructor({ authService }: AuthService) {
    this.authService = authService
  }

  // 登陆接口
  @route('/login')
  @POST()
  async login(ctx: Router.RouterContext, next: () => Promise<unknown>) {
    const result = await this.authService.login(ctx.request.body)

    ctx.body = result
  }

  // 退出登陆接口
  @route('/logout')
  @GET()
  async logout(ctx: Router.RouterContext, next: () => Promise<unknown>) {
    const userId = ctx.request.query.userId
    const result = await this.authService.logout(userId)

    ctx.body = result
  }
}

export default AuthController
