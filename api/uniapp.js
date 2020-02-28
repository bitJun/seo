import axios from 'axios'
import md5 from 'js-md5'
const base = '/App' // 测试环境
// const base = 'https://testapp.xiniaogongkao.com' // 生产环境
var userId = localStorage.getItem('userId')
var user_token = md5(userId + 'c0411')
// 视频中心调取app接口
export const video_detail = params => {
  return axios.post(`${base}/code/user_course/video_detail`, params, { headers: { 'xntoken': '8965402e5d38e42108b328a181c63bf3', 'version': '1.0.0', 'platform': 3, 'user_token': user_token, 'userId': userId }}).then(res => res)
}
