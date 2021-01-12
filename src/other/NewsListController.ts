import Controller from './Controller'
import NewsModel from '../models/NewsModel.js'
import { Context } from 'koa'

class NewsListController extends Controller {
  constructor() {
    super()
  }

  async actionIndex(ctx: Context) {
    // throw new Error('list error')
    const newsModel = new NewsModel()
    ctx.body = await newsModel.getNewsList()
  }
}

export default NewsListController
