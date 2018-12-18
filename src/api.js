import Vue from 'vue'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

axios.defaults.baseURL = 'https://herher.ntut.io/api'
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8080'

const api = {

  getUserInfo: async (username) => {
    try {
      let infoResponse = await axios.get('/user', {
        params: {
          username
        }
      })
      let info = {
        ...infoResponse.data.user,
        publicKey: infoResponse.data.publicKey
      }
      return info
    } catch (e) {
      console.log(e)
      return undefined
    }
  },
  register: async (username, secret) => {
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
  },
  login: async (username, password) => {
    try {
      let salt = '$2b$10$' + crypto.createHash('sha256').update(username).digest('hex').slice(0, 22)
      let code = (await axios.get('/session')).data.code
      let hash1 = await bcrypt.hash(password, salt)
      let hash2 = await bcrypt.hash(hash1, code)
      let infoResponse = await axios.post('/session', {
        username,
        password: hash2
      })
      let info = {
        ...infoResponse.data.user,
        privateKey: infoResponse.data.privateKey
      }
      return info
    } catch (e) {
      console.log(e)
      return undefined
    }
  },
  logout: async () => {
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
  Vue.prototype.$api = api
})
