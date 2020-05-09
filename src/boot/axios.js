import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const HTTPClient = axios.create({
//   baseURL: `${process.env.API}`,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', Pragma: 'no-cache' }
})

// HTTPClient.interceptors.request.use(function (config) {
//   return Vue.prototype.$mgr.getUser()
//     .then((res) => {
//       // config.headers.Authorization = `Bearer ${res.id_token}`
//       return config
//     }, (err) => {
//       console.log(err)
//     })
// }, function (error) {
//   return Promise.reject(error)
// })

Vue.prototype.$axios = HTTPClient

export { HTTPClient }
