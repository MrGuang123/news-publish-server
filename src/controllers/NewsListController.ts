import Controller from './Controller'

class NewsListController extends Controller {
  constructor() {
    super()
  }

  actionIndex(ctx) {
    throw new Error('list error')
    ctx.body = 'news list'
  }
}

export default NewsListController
