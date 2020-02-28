<template>
<div class="app-container">
  <div class="titles">
    <div>
      <span>{{calssname}}</span>
      <img src="/images/zhibodengdai.png" alt="">
    </div>
  </div>
  <div class="bannerImg">
    <img src="/images/zhibobanner.jpg" style="width: 100%">
  </div>
  <div class="bodylist">
    <div class="d1">距离直播开始还有</div>
    <div class="d2">
      <span style="color: #484D62">
        <span :class="[nextopen === false ? 'time_obj' : 'time_objs']">{{DJhou}}</span><span class="time_list"> 时</span>
        <span :class="[nextopen === false ? 'time_obj' : 'time_objs']">{{DJmin}}</span><span class="time_list"> 分</span>
        <span :class="[nextopen === false ? 'time_obj' : 'time_objs']">{{DJsec}}</span><span class="time_list"> 秒</span>
      </span>
    </div>
    <div class="d3">您可提前15分钟进入直播教室</div>
    <div class="b4">
      <div>
        <div v-if="is_tips === 1" style="color: #A9A9B2;background: #ffffff">已设置提醒</div>
        <div v-else>
          <div v-if="nextopen === true">开播前15分钟提醒我</div>
          <div v-else style="background: #33ccd3;color: #FFFFFF">开播前15分钟提醒我</div>
        </div>
      </div>
      <div v-if="nextopen === false">进入直播</div>
      <div v-else @click="golive" style="background: #E7213A;color: #FFFFFF">进入直播</div>
    </div>
  </div>
</div>
</template>

<script>
import {
  info,
  videoDetail
} from '@/api/user'
export default {
  data() {
    return {
      ourseware_id: '',
      countDownList: '00天00时00分00秒',
      actEndTime: '',
      DJday: '00',
      DJhou: '00',
      DJmin: '00',
      DJsec: '00',
      is_tips: '',
      nextopen: false,
      calssname: ''
    }
  },
  head() {
    return {
      title: '犀鸟公考-犀鸟公考 - 大学生职业教育服务平台 公考、招教、部队文职',
      meta: [{
        hid: "description",
        name: "description",
        content: "犀鸟公考，公考，招教，部队文职，公务员，事业单位，教师招聘，公务员考试网，国家公务员考试网，国考，省考，国家公务员考试，公务员培训"
      }, {
        hid: 'viewport',
        name: 'keywords',
        content: '犀鸟公考是大学生职业教育服务平台，通过“在线直播+督学系统+游戏化激励+AI”的方式，让考试有效也有趣！提供公务员、事业单位、教师招聘、部队文职等考试服务'
      }]
    }
  },
  created() {
    this.ourseware_id = this.$route.query.ourseware_id
    this.setcurrculum()
    this.countDown()
  },
  methods: {
    setcurrculum() {
      info('').then(res => {
        const timestamp = res
        const options = {
          courseware_id: this.ourseware_id,
          timestamp: timestamp
        }
        videoDetail(options).then(res => {
          console.log('livein', res.data)
          this.actEndTime = res.data.start_time
          // this.actEndTime = '2020-01-14 17:55:00'
          this.is_tips = res.data.is_tips
          this.calssname = res.data.name
        })
      })
    },
    // 去看直播
    golive() {
      this.$router.replace({
        path: '/Mycurriculum/liveopen',
        query: {
          channel_id: this.ourseware_id
        }
      })
    },
    timeFormat(param) {
      return param < 10 ? '0' + param : param
    },
    countDown(it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime()
        // 对结束时间进行处理渲染到页面
        let endTime = new Date(this.actEndTime).getTime()
        let obj = null
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000
          // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24))
          let hou = parseInt(time % (60 * 60 * 24) / 3600)
          let min = parseInt(time % (60 * 60 * 24) % 3600 / 60)
          let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60)
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
        } else { // 活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
          clearInterval(interval)
        }
        this.DJday = obj.day
        this.DJhou = obj.hou
        this.DJmin = obj.min
        this.DJsec = obj.sec
        if (this.DJday === '00' && this.DJhou === '00' && this.DJmin < '15') {
          this.nextopen = true
        }
        // this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
      }, 1000)
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/Mycurriculum/livein.scss";
</style>
