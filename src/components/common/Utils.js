//防抖debounce/节流throttle
//传一个函数，和一个等待时间
export function debounce(func,delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
