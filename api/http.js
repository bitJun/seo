import axios from 'axios'
import { MessageBox, Message } from 'element-ui';
import { stringify } from 'qs';
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  },
})

// request interceptor
service.interceptors.request.use(
  config => {
    const contentType = 'application/x-www-form-urlencoded; charset=utf-8';
    const methods = ['post', 'put', 'delete'];
    if (config.headers['Content-Type'] === contentType && methods.includes(config.method)) {
      config.data = stringify(config.data);
    }
    // if (store.getters.token) {
    //   config.headers['token'] = getToken()
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    console.log('response', response);
    return res;
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
