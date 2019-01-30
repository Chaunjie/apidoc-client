import crypto from 'crypto-js'
import conf from './conf'
const key = crypto.SHA256(conf.key).toString()

export default {
  encrypt (data) {
    let returnData = crypto.AES.encrypt(data, key)
    return returnData.toString()
  },
  decrypt (data) {
    let bytes = crypto.AES.decrypt(data, key)
    try {
      return bytes.toString(crypto.enc.Utf8)
    } catch (e) {}
    return '""'
  }
}
