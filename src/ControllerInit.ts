import Koa from 'koa'
import { createContainer, Lifetime } from 'awilix'
import { scopePerRequest, loadControllers } from 'awilix-koa'


class ControllerInit {
  static init(app: Koa) {
    // 创建容器，装载所有服务，为依赖注入做准备
    const container = createContainer()
    container.loadModules([`${__dirname}/services/*.ts`], {
      // 使用驼峰命名
      formatName: 'camelCase',
      resolverOptions: {
        // TRANSIENT:默认值，每次都注册，每次都返回一个新的实例,
        // SCOPED:作用域是容器，同一作用域或者其子作用域，将会重用,
        // SINGLETON: 单例，任何情况下都被重用
        lifetime: Lifetime.SCOPED
      }
    })
    // 把container注入到koa
    app.use(scopePerRequest(container))
    // 加载全部路由
    app.use(loadControllers(`${__dirname}/controllers/*.ts`))
  }
}

export default ControllerInit
