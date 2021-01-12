import Router from '@koa/router'
import NewsListController from './NewsListController'
import { Context } from 'koa'

const router = new Router()
const newsListController = new NewsListController()

const initController = function (app: Context) {
  router.get('/', newsListController.actionIndex)

  app.use(router.routes()).use(router.allowedMethods())
}

export default initController
