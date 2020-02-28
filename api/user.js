import axios from './axios';
import request from './http';
// import axios from 'axios';
// const base = '/Fco' // 测试环境
// const base = 'https://testpc.xiniaogongkao.com' // 测试环境
// const base = 'https://wapapi.xiniaogongkao.com' // 生产环境
const base = 'https://www.xiniaogongkao.com' // 生产环境


// v1版本
// 0 微信登录注册接口
export const login = params => {
  return axios.post(`/api/v1/login`, params).then(res => res)
}
// 1手机验证码拉取
export const loginphone = params => {
  return axios.post(`/api/v1/sendSms`, params).then(res => res)
}
// 2服务器时间戳拉取
export const info = params => {
  return axios.post(`/api/v1/info`, params).then(res => res)
}
// 3手机号登录
export const phoneLogin = params => {
  return axios.post(`/api/v1/phoneLogin`, params).then(res => res)
}
// 4课程-课程列表
export const course = params => {
  return axios.post(`/api/v1/course`, params).then(res => res)
}
// 5犀半球视频
export const recommend = params => {
  return axios.post(`/api/v1/recommend`, params).then(res => res)
}
// 6banner+咨询
export const home = params => {
  return axios.post(`/api/v1/home`, params).then(res => res)
}
// 7课程-咨讯
export const courseArticle = params => {
  return axios.post(`/api/v1/courseArticle`, params).then(res => res)
}
// 8备考-帖子列表
export const article = params => {
  return axios.post(`/api/v1/article`, params).then(res => res)
}
// 9备考-帖子详情
export const articleInfo = params => {
  return axios.post(`/api/v1/articleInfo`, params).then(res => res)
}
// 10备考-帖子评论列表
export const comment = params => {
  return axios.post(`/api/v1/comment`, params).then(res => res)
}
// 11备考-发布评论
export const addComment = params => {
  return axios.post(`/api/v1/addComment`, params).then(res => res)
}
// 12备考-评论点赞
export const addPraise = params => {
  return axios.post(`/api/v1/addPraise`, params).then(res => res)
}
// 13个人中心-我的课程
export const mycourse = params => {
  return axios.post(`/api/v1/mycourse`, params).then(res => res)
}
// 14个人中心-我的课程-详情
export const mycourseInfo = params => {
  return axios.post(`/api/v2/mycourseInfo`, params).then(res => res)
}
// 15个人中心-我的订单
export const myorder = params => {
  return axios.post(`/api/v1/myorder`, params).then(res => res)
}
// 16个人中心-我的订单-删除
export const delMyorder = params => {
  return axios.post(`/api/v1/delMyorder`, params).then(res => res)
}
// 17个人中心-我的收藏
export const mycollect = params => {
  return axios.post(`/api/v1/mycollect`, params).then(res => res)
}
// 18个人中心-我的地址
export const myaddress = params => {
  return axios.post(`/api/v1/myaddress`, params).then(res => res)
}
// 19个人中心-编辑地址
export const editAddress = params => {
  return axios.post(`/api/v1/editAddress`, params).then(res => res)
}
// 20个人中心-删除地址
export const delAddress = params => {
  return axios.post(`/api/v1/delAddress`, params).then(res => res)
}
// 21个人中心-我的优惠券
export const mycoupon = params => {
  return axios.post(`/api/v1/mycoupon`, params).then(res => res)
}
// 22个人中心-我的兑换
export const myexchange = params => {
  return axios.post(`/api/v1/myexchange`, params).then(res => res)
}
// 23个人中心-我的兑换-兑换课程
export const exchange = params => {
  return axios.post(`/api/v1/exchange`, params).then(res => res)
}
// 24个人中心-我的消息
export const mymessage = params => {
  return axios.post(`/api/v1/mymessage`, params).then(res => res)
}
// 25个人中心-我的消息-删除
export const delMessage = params => {
  return axios.post(`/api/v1/delMessage`, params).then(res => res)
}
// 26个人中心-我的消息-已读
export const readMessage = params => {
  return axios.post(`/api/v1/readMessage`, params).then(res => res)
}
// 27个人中心-编辑资料
export const editPersonal = params => {
  return axios.post(`/api/v1/editPersonal`, params).then(res => res)
}
// 28个人中心-个人资料
export const personal = params => {
  return axios.post(`/api/v1/personal`, params).then(res => res)
}
// 29备考-帖子取消||收藏
export const addCollect = params => {
  return axios.post(`/api/v1/addCollect`, params).then(res => res)
}
// 30犀半球视频流
export const notes = params => {
  return axios.post(`/api/v1/notes`, params).then(res => res)
}
// 31首页课程-详情
export const courseInfo = params => {
  return axios.post(`/api/v2/courseInfo`, params).then(res => res)
}
// 32备考banner
export const banner = params => {
  return axios.post(`/api/v1/banner`, params).then(res => res)
}
// 33订单-下单详情
export const orderInfo = params => {
  return axios.post(`/api/v1/orderInfo`, params).then(res => res)
}
// 34订单-下单详情-优惠券列表
export const orderCoupon = params => {
  return axios.post(`/api/v1/orderCoupon`, params).then(res => res)
}
// 35订单-创建订单
export const createOrder = params => {
  return axios.post(`/api/v1/createOrder`, params).then(res => res)
}
// 36视频中心直播录播回看
export const videoDetail = params => {
  return axios.post(`/api/v2/videoDetail`, params).then(res => res)
}
// 37课程-课程包
export const coursePackage = params => {
  return axios.post(`/api/v2/coursePackage`, params).then(res => res)
}
// 37token过期输出
export const freshenToken = params => {
  return axios.post(`/api/v1/freshenToken`, params).then(res => res)
}
// 38我的订单绑定地址
export const bindAddress = params => {
  return axios.post(`/api/v1/bindAddress`, params).then(res => res)
}
// 39我的订单绑定地址
export const wxPay = params => {
  return axios.post(`/api/v1/wxPay`, params).then(res => res)
}
// 40微信支付状态拿取
export const getOrderStatus = params => {
  return axios.post(`/api/v1/getOrderStatus`, params).then(res => res)
}
// 41支付宝支付
export const aliPay = params => {
  return axios.post(`/api/v1/aliPay`, params).then(res => res)
}
// 42直播模块 获取频道签名和时间戳
export const liveSign = params => {
  return axios.post(`/api/v1/liveSign`, params).then(res => res)
}
// 43直播模块 获取聊天室token
export const getChatToken = params => {
  return axios.post(`/api/v1/getChatToken`, params).then(res => res)
}
// v2版本
// 44 首页-banner|品牌咨询|备考|公考
export const homev2 = params => {
  return axios.post(`/api/v2/home`, params).then(res => res)
}
// 45 首页-犀半球
export const homeXbqv2 = params => {
  return axios.post(`/api/v2/homeXbq`, params).then(res => res)
}
// 46 首页-备考—文章列表
export const referencev2 = params => {
  return axios.post(`/api/v2/reference`, params).then(res => res)
}

// 47 首页-备考—详情页-发表评论
export const commentv2 = params => {
  return axios.post(`/api/v2/comment`, params).then(res => res)
}
//  首页-备考—详情页-评论列表
export const referCommentv2 = params => {
  return axios.post(`/api/v2/referComment`, params).then(res => res)
}
// 48 首页-备考—详情页-点赞
export const commentPraisev2 = params => {
  return axios.post(`/api/v2/commentPraise`, params).then(res => res)
}
// 49 首页-备考—详情页-点赞
export const collectv2 = params => {
  return axios.post(`/api/v2/collect`, params).then(res => res)
}
// 50 首页-订单页面-v2
export const orderInfov2 = params => {
  return axios.post(`/api/v2/orderInfo`, params).then(res => res)
}
// 47 分校地区
export const branchDetailsv2 = params => {
  return axios.post(`/api/v2/branchDetails`, params).then(res => res)
}
// 48 分校首页
export const branchIndexv2 = params => {
  return axios.post(`/api/v2/branchIndex`, params).then(res => res)
}
// 49 分校公开课更多
export const branchFreev2 = params => {
  return axios.post(`/api/v2/branchFree`, params).then(res => res)
}
// 50 打卡营详情
export const campInfov2 = params => {
  return axios.post(`/api/v2/campInfo`, params).then(res => res)
}

// // 61 分校公开课
// export const branchRecommendv2 = params => {
//   return axios.post(`/api/v2/branchRecommend`, params).then(res => res)
// }
// 62 备考-搜索
export const referSearchv2 = params => {
  return axios.post(`/api/v2/referSearch`, params).then(res => res)
}
// 63 备考-搜索
export const orderCouponv2 = params => {
  return axios.post(`/api/v2/orderCoupon`, params).then(res => res)
}

// 51 公开课详情
export const coursewareDetailsv2 = params => {
  return axios.post(`/api/v2/coursewareDetails`, params).then(res => res)
}
// 64 公开课详情 createOrder
export const createOrderv2 = params => {
  return axios.post(`/api/v2/createOrder`, params).then(res => res)
}

// 52 课程详情-课程推荐
export const courseRecommendv2 = params => {
  return axios.post(`/api/v2/courseRecommend`, params).then(res => res)
}
// 70 百科-资讯
export const bkv2 = params => {
  return axios.post(`/api/v2/bk`, params).then(res => res)
}
// 71 备考—banner
export const referBannerv2 = params => {
  return axios.post(`/api/v2/referBanner`, params).then(res => res)
}
// 72 备考—帖子详情
export const referInfov2 = params => {
  return axios.post(`/api/v2/referInfo`, params).then(res => res)
}
// 73 分校推荐课
export const branchRecommendv2 = params => {
  return axios.post(`/api/v2/branchRecommend`, params).then(res => res)
}
// 74 首页-公开课|热门课程
export const homeCoursev2 = params => {
  return axios.post(`/api/v2/homeCourse`, params).then(res => res)
}
// 75 犀半球-帖子列表
export const xbqv2 = params => {
  return axios.post(`/api/v2/xbq`, params).then(res => res)
}
// 76 犀半球-帖子详情
export const xbqInfov2 = params => {
  return axios.post(`/api/v2/xbqInfo`, params).then(res => res)
}
// 77 个人中心-我的订单-绑定地址
export const bindAddressv2 = params => {
  return axios.post(`/api/v2/bindAddress`, params).then(res => res)
}
// 78 公考百科|品牌资讯—帖子详情
export const bkInfov2 = params => {
  return axios.post(`/api/v2/bkInfo`, params).then(res => res)
}

// 101  分校公开课标签
export const lablev2 = params => {
  return axios.post(`/api/v2/lable`, params).then(res => res)
}

//102微信绑定手机号功能
export const bindPhone = params => {
  return axios.post(`/api/v1/bindPhone`, params).then(res => res)
}
// //推荐课程
// export const courseRecommendv2 = params => {
//   return axios.post(`/api/v2/courseRecommend`, params).then(res => res)
// }

export const seov2 = params => {
  return axios.post(`/api/v2/seo`, params).then(res => res)
}
