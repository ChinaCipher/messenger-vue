import Vue from 'vue'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

axios.defaults.baseURL = 'https://herher.ntut.io/api'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080'

class API {
  async uploadFile (formData) {
    let url = await axios.post('/static-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return url
  }
  async updateUserInfo (username, avatar, nickname) {
    let infoResponse = await axios.patch('/user/' + username, {
      avatar,
      nickname
    })
    let info = {
      ...infoResponse.data.user,
      privateKey: infoResponse.data.privateKey
    }
    return info
  }
  async getUserInfo (username) {
    let { data } = await axios.get('/user/' + username)
    let info = {
      ...data.user
    }
    return info
  }
  async register (username, secret) {
    await axios.post('/user', {
      username,
      secret
    })
    return true
  }
  async login (username, password) {
    let salt = '$2b$10$' + crypto.createHash('sha256').update(username).digest('hex').slice(0, 22)
    let code = (await axios.get('/session')).data.code
    let hash1 = await bcrypt.hash(password, salt)
    let hash2 = await bcrypt.hash(hash1, code)
    let { data } = await axios.post('/session', {
      username,
      password: hash2
    })
    let info = {
      ...data.user
    }

    // const decryptPrivateKey = () => {
    //   let key = crypto.createHash('sha256').update(password).digest('hex').slice(0, 32)
    //   let iv = crypto.createHash('sha256').update(username).digest('hex').slice(0, 16)
    //   let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    //   let decrypted = decipher.update(data.privateKey, 'hex', 'utf8') + decipher.final('utf8')
    //   return decrypted
    // }

    // let privateKey = decryptPrivateKey()
    let privateKey = data.privateKey

    return { info, privateKey }
  }
  async logout () {
    await axios.delete('/session')
    return true
  }
}

Vue.use(() => {
  Vue.prototype.$api = new API()
})
