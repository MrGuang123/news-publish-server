/**
 * 实现一个批量请求函数，multiRequest(urls, maxNum)，要求如下：
 * 要求最大并发数maxNum
 * 每当有一个请求返回，就留下一个空位，可以增加新的请求
 * 所有请求完成后，结果按照urls里面的顺序依次打出
 * @param {*} urls
 * @param {*} maxNum
 */
function multiRequest(urls = [], maxNum) {
  const len = urls.length
  const result = new Array(len).fill(false)
  let count = 0

  return new Promise((resolve, reject) => {
    while (count < maxNum) {
      next()
    }

    function next() {
      let current = count++
      console.log(current)
      if (current >= len) {
        !result.includes(false) && resolve(result)
        return
      }
      const url = urls[current]
      fetch(url).then(res => {
        result[current] = res
        if (current < len) {
          next()
        }
      }).catch(err => {
        result[current] = err
        if (current < len) {
          next()
        }
      })
    }
  })
}

function fetch(url) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(url)
    }, 500 + Math.floor(Math.random() * 500));
  })
}

const urls = new Array(30).fill(0).reduce(function (all, item, index) {
  all.push(index + 1)
  return all
}, [])

multiRequest(urls, 5).then(res => {
  console.log(res)
})
