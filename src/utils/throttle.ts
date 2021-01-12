// 每隔一段时间执行一次函数
// 第一次触发立即执行
// 如果在间隔时间内触发，会在间隔末尾再执行一次
const throttle = (fn: Function, delay: number) => {
  let isFirst = true
  let preDate = +new Date()
  let timer:any = null
  return () => {
    if(isFirst) {
      fn()
      preDate = +new Date()
      isFirst = false
    }else {
      const currentDate = +new Date()
      if(currentDate - preDate >= delay) {
        fn()
        preDate = +new Date()
      }else {
        if(timer) {
          clearTimeout(timer)
        }

        const timeWait = preDate + delay - +new Date()
        timer = setTimeout(() => {
          fn()
          preDate = +new Date()
        }, timeWait)
      }
    }
  }
}
