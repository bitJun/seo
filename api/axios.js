import axios from 'axios'
import { MessageBox, Message } from 'element-ui';
import { stringify } from 'qs';

const service = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  },
});

service.interceptors.request.use(
  config => {
    const contentType = 'application/x-www-form-urlencoded; charset=utf-8';
    const methods = ['post', 'put', 'delete'];
    if (config.headers['Content-Type'] === contentType && methods.includes(config.method)) {
      config.data = stringify(config.data);
    }
    if (typeof window == 'object') {
      let token = window.localStorage.getItem('token');
      config.headers['token'] = token;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response;
    if (res.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {

      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      if (res.code === 201 || res.code === 202 || res.code === 203) {
        if (typeof window == 'object') {
          // let url = window.location.href.split('/')[0];
          // console.log(url)
          window.localStorage.clear();
          // this.$router.push({
          //   path: '/'
          // });
        }
      } else {
        return res.data;
      }
    }
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
