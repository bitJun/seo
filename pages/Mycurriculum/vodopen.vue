<template>
<div class="app-container">
  <div class="titles">
    <div>
      <span>{{calssname}}</span>
      <img src="/images/zhibodengdai.png" alt="">
    </div>
  </div>
  <div style="display: flex;justify-content: space-between;width: 1199px;margin: 0 auto">
    <div style="width: 879px;height: 597px;">
      <div id="ppt" style="width:100%;height:100%;"></div>
    </div>
    <div style="width: 299px;height: 597px;">
      <div style="width: 100%;height: 160px;">
        <div id="player" style="width:100%;height:160px;"></div>
        <div id="wrap" style="width: 100%;height: 436px"><img src="/images/vodopen.png" style="width: 100%;height: 100%"></div>
      </div>
    </div>
  </div>
  <div class="titles" v-if="course.length">推荐课程</div>
  <div>
    <div id="moveImg">
      <div class="lc">
        <div class="items">
          <div class="right">
            <div class="Scroll-left">
              <div class="bd">
                <ul class="picList" style="display: flex;padding-left: 0;margin-top: 0">
                  <li style="position: relative" class="piclist_head" v-for="(item,index) in course" v-bind:key="index.url" @click="setdetails(item)">
                    <img :src="item.course_image" style="object-fit:cover">
                    <p class="p3 over-lists">{{item.coursename}}</p>
                    <p class="p4" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!==''" style="margin-bottom: 0">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
                    <p class="p4 x3" v-if="item.price!=0" style="margin-top: 0">已报{{item.order_number}}人 <span>RMB<span>{{item.price}}</span></span></p>
                    <p class="p4 x3" v-if="item.price==0" style="margin-top: 0">已报{{item.order_number}}人 <span><span>免费</span></span></p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  info,
  videoDetail,
  coursewareDetailsv2
} from '@/api/user'

export default {
  data() {
    return {
      courseware_id: '', // 房间id
      signtimes: '',
      mediaChannelKeytoken: '',
      speak: '',
      calssname: '',
      zhiboid: '',
      signTimesa: '',
      user_id: '',
      vodid: '',
      MXcalllist: '',
      course: ''
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
    this.courseware_id = this.$route.query.ourseware_id
    this.setcurrculum()
    this.tuijian()
  },
  methods: {
    tuijian() {
      info('').then(res => {
        const timestamp = res
        const options = {
          campus_id: 0,
          id: this.courseware_id,
          timestamp: timestamp
        }
        coursewareDetailsv2(options).then(res => {
          if (res.code === 100) {
            this.MXcalllist = res.data.courseware
            this.course = res.data.course
            if (res.data.live_message && res.data.live_message !== '') {
              this.$alert(res.data.live_message, {
                callback: action => {
                  history.go(-1)
                }
              })
            }
          } else {
            console.log(res.message)
          }
        })
      })
    },
    setcurrculum() {
      info('').then(res => {
        const timestamp = res
        const options = {
          courseware_id: this.courseware_id,
          timestamp: timestamp
        }
        videoDetail(options).then(res => {
          console.log('liveopen', res.data)
          this.calssname = res.data.name
          this.signtimes = res.data.live_sign
          this.mediaChannelKeytoken = res.data.chat
          this.signTimesa = res.data.timestamp
          this.zhiboid = res.data.channel_id
          this.user_id = res.data.user_id
          this.vodid = res.data.vid
          this.mvVideo()
          // this.PPT()
        })
      })
    },
    mvVideo() {
      var liveSdk = new PolyvLiveSdk({
        channelId: this.zhiboid,
        sign: this.signtimes, // 频道验证签名
        timestamp: this.signTimesa, // 毫秒级时间戳
        appId: 'fh5m88713v', // polyv 后台的appId
        user: {
          userId: this.user_id,
          userName: 'polyv-test',
          pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578053679897&di=966a4fc57b733fef1e82627180a78c6c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F30%2F20150930175854_w3CsQ.thumb.224_0.jpeg'
        }
      })
      var config = {
        pptEl: '#ppt',
        el: '#player',
        type: 'vod',
        autoplay: true,
        audioMode: true,
        width: '100%',
        height: '100%',
        pptWidth: '100%',
        pptHeight: '100%',
        controllerPosition: 'ppt',
        controller: true,
        pptNav: true,
        // 回放模式需要fileId、url、sessionId
        vid: this.vodid,
        fileId: undefined,
        url: undefined,
        sessionId: undefined
      }
      // 监听频道信息并初始化播放器
      liveSdk.on(PolyvLiveSdk.EVENTS.CHANNEL_DATA_INIT, (event, data) => {
        liveSdk.setupPlayer(config)
      })
    }
    // PPT() {
    //   var chatroom = new PolyvChatRoom({
    //     roomId: this.zhiboid,
    //     userId: this.user_id,
    //     nick: 'polyv-test',
    //     pic: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578053679897&di=966a4fc57b733fef1e82627180a78c6c&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F30%2F20150930175854_w3CsQ.thumb.224_0.jpeg',
    //     token: this.mediaChannelKeytoken.token,
    //     mediaChannelKey: this.mediaChannelKeytoken.mediaChannelKey,
    //     version: '2.0',
    //     container: '#wrap',
    //     width: 299,
    //     height: 436,
    //     showUserList: false,
    //     enableLike: false,
    //     enableAsk: false,
    //     enableBulletin: true,
    //     userType: '',
    //     roomMessage: function (data) {
    //       // TODO
    //       // data为聊天室socket消息，当有聊天室消息时会触发此方法
    //       console.log(data)
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/Mycurriculum/vodopen.scss";
</style>
