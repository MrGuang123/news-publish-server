import * as Router from '@koa/router'
import NewsListController from './NewsListController'

const router = new Router()
const newsListController = new NewsListController()

const initController = function (app) {
  router.get('/', newsListController.actionIndex)

  app.use(router.routes()).use(router.allowedMethods())
}

export default initController
