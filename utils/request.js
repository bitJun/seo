import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import qs from 'qs'
import sha1 from 'sha1'
import md5 from 'js-md5'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // base: '/Fco',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers['randomStr'] = '123'
var secretKey = 'API'
var randomString = '123'
axios.interceptors.request.use(
  config => {
    var seturl = config.url
    var token = localStorage.getItem('token')
    var acc = seturl.lastIndexOf('\/')
    var strurl = ''
    strurl = seturl.substring(acc + 1, seturl.length)
    var time = config.data.split('=')[config.data.split('=').length - 1]
    var signature1 = sha1(time + secretKey + randomString + strurl)
    var signature3 = md5(signature1).toUpperCase()
    config.headers['signature'] = signature3
    config.headers['timestamp'] = time
    if (token && token !== '') {
      config.headers['token'] = token
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  }
)
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
