import axios from 'axios'
// import {Message} from 'element-ui'; // ui库消息提示

// axios微信登录
var service = axios.create({

})
export default {
  get(url, param) {
    return new Promise((cback, reject) => {
      service({
        method: 'get',
        url: "select * from json where url=\'" + service.baseURL + "'",
        param: param,
        format: 'json'
      }).then(res => {
        console.log('res', res)
      }).catch(err => {
        console.log('err', err)
      })
    })
  }
}
