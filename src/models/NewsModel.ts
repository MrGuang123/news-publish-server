class NewsModel {
  getNewsList() {
    // 数据库操作
    return Promise.resolve([
      {
        id: 1,
        title: 'gaoji news'
      },
      {
        id: 2,
        title: 'laji news laji a'
      }
    ])
  }
}

export default NewsModel
