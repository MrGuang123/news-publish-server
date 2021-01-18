interface status {
  [key: number]: string
}

const StatusConstance: status = {
  200: '请求成功',
  401: '未获取授权',
  403: '禁止访问',
  404: '没有找到该接口',
  500: '服务器错误'
}

export default StatusConstance
