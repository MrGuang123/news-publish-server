import Controller from './Controller'

class NewsListController extends Controller {
  constructor() {
    super()
  }

  actionIndex(ctx) {
    ctx.body = 'news list'
  }
}

export default NewsListController
