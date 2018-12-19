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
    try {
      let { data } = await axios.get('/user/' + username)
      let info = {
        ...data.user
      }
      return info
    } catch (e) {
      console.log(e)
      return undefined
    }
  }
  async register (username, secret) {
    try {
      await axios.post('/user', {
        username,
        secret
      })
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
  async login (username, password) {
    try {
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
      let privateKey = data.privateKey
      return { info, privateKey }
    } catch (e) {
      console.log(e)
      return undefined
    }
  }
  async logout () {
    try {
      await axios.delete('/session')
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

Vue.use(() => {
  Vue.prototype.$api = new API()
})
