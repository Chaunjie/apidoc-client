import Cookies from 'js-cookie'
import encode from './encode'
import conf from './conf'

export default {
  setCookie (key, data, expires) {
    const str = JSON.stringify(data)
    const p = encode.encrypt(str)
    Cookies.set(key, p, { expires: expires || conf.expires })
  },
  getCookie (key) {
    const str = Cookies.get(key) || ''
    let obj = encode.decrypt(str)
    if (!obj) {
      obj = '""'
    }
    return JSON.parse(obj)
  },
  removeCookie (key) {
    Cookies.set(key, '', { path: '', expires: new Date() })
  }
}
