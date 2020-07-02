import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
const token = window.localStorage.getItem('token_clinic')
const HTTPClient = axios.create({
  // baseURL: 'http://127.0.0.1:3333/api/v1/',
  baseURL: 'https://medic-life-api.herokuapp.com/api/v1/',
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
})

HTTPClient.interceptors.request.use(
  async config => {
    if (!config.url.endsWith('login')) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

Vue.prototype.$axios = HTTPClient

export { HTTPClient }
