import { NewsInterface, NewsListQueryInterface, NewsInfoQueryInterface, CommonCreateInterface } from '@interfaces/NewsInterface'
import NewsDao from '@dao/NewsDao'

class NewsService implements NewsInterface {
  newsDao
  constructor() {
    this.newsDao = new NewsDao()
  }
  // 获取新闻列表
  getNewsList(params: NewsListQueryInterface) {
    const param = Object.assign({
      pageSize: 10,
      pageIndex: 1
    }, params)

    return this.newsDao.getNewsList(param)
  }

  // 获取新闻详情
  async getNewsInfo(params: NewsInfoQueryInterface) {
    const { id } = params

    try {
      const result = await this.newsDao.getNewsInfo(Number(id))

      return result
    }catch(e) {
      return undefined
    }
  }

  // 创建新闻
  async createNews(params: CommonCreateInterface) {
    const mustParam = ['newsTitle', 'summary', 'creatorId', 'areaId', 'content', 'labelIds', 'isPublished']
    const paramEnough = mustParam.every(key => params[key] !== 'undefined')

    if (!paramEnough) {
      return 'ErrorInfo:400:创建新闻参数不足'
    }

    try {
      const newsInfo = await this.newsDao.createNews(params)
      const result = await this.newsDao.getNewsInfo(newsInfo.id)

      return result
    }catch(e) {
      return 'ErrorInfo:400:创建新闻失败'
    }
  }

  // 修改新闻
  async updateNews(params: CommonCreateInterface) {
    const mustParam = ['newsTitle', 'summary', 'creatorId', 'areaId', 'content', 'labelIds', 'isPublished']
    const paramEnough = mustParam.every(key => params[key] !== 'undefined')

    if (!paramEnough) {
      return 'ErrorInfo:400:创建新闻参数不足'
    }

    params.id = Number(params.id)

    try {
      const newsInfo = await this.newsDao.getNewsInfo(params.id)
      if(newsInfo) {
        await this.newsDao.updateNews(params)

        return '修改新闻成功'
      }else {
        return '该新闻不存在'
      }
    }catch(e) {
      return '修改新闻失败'
    }

  }

  // 删除新闻
  async deleteNews(params: NewsInfoQueryInterface) {
    const { id } = params

    try {
      const newsInfo = await this.newsDao.getNewsInfo(Number(id))
      let newsJson
      if(newsInfo) {
        newsJson = newsInfo.toJSON()
        await this.newsDao.deleteNews(newsJson)
        return '删除成功'
      }else {
        return '该新闻不存在'
      }
    }catch(e) {
      return '删除新闻失败'
    }
  }
}

export default NewsService
