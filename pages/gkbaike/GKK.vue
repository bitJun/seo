<template>
<div class="app-container">
  <div class="video-body">
    <div class="title">{{MXcalllist.name}} </div>
    <div style="display: flex;justify-content: space-between;color: #9AABB8;margin: 10px 0">
      <div style="font-size: 14px" v-if="MXcalllist.start_time&&MXcalllist.start_time !== ''"><img src="/images/icon/riqi.png" alt="" style="width: 12px;height: 12px;margin-right: 10px;vertical-align: middle;color: #9AABB8;margin-bottom: 4px">{{ (MXcalllist.start_time).substring(0,10).replace(/\-/g,".") }}</div>
      <div class="share-img" style="visibility: hidden"><span style="font-size: 14px">分享到：</span>
        <img src="/images/icon/wechatshare.png" title="分享到微信">
        <img src="/images/icon/qqshare.png" title="分享到QQ" @click="shareqq">
        <img src="/images/icon/weiboshare.png" title="分享到微博" @click="shareToSinaWB(event)">
      </div>
    </div>
    <div>
      <video controls="controls" style="width: 100%;height: auto" width="100%" height="auto" :src="MXcalllist.url"></video>
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
                    <img :src="item.desc_image" style="object-fit:cover">
                    <p class="p3 over-lists">{{item.coursename}}</p>
                    <p class="p4" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!==''">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
                    <p class="p4 x3" v-if="item.price!=0">已报{{item.order_number}}人 <span>RMB<span>{{item.price}}</span></span></p>
                    <p class="p4 x3" v-if="item.price==0">已报{{item.order_number}}人 <span><span>免费</span></span></p>

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
  coursewareDetailsv2,
  seov2
} from '@/api/user'
var _title, _source, _sourceUrl, _pic,
  _url = 'www.xiniaogongkao.com'
export default {
  data() {
    return {
      MXcalllist: '',
      happyid: '',
      course: '',
      campus_id: 0,
      key_word: '',
      describe: ''
    }
  },
  head() {
    return {
      title: '犀鸟公考-犀鸟公考 - 大学生职业教育服务平台 公考、招教、部队文职',
      meta: [{
        hid: "description",
        name: "description",
        content: this.describe || "犀鸟公考，公考，招教，部队文职，公务员，事业单位，教师招聘，公务员考试网，国家公务员考试网，国考，省考，国家公务员考试，公务员培训"
      }, {
        hid: 'viewport',
        name: 'keywords',
        content: this.key_word || '犀鸟公考是大学生职业教育服务平台，通过“在线直播+督学系统+游戏化激励+AI”的方式，让考试有效也有趣！提供公务员、事业单位、教师招聘、部队文职等考试服务'
      }]
    }
  },
  created() {
    this.happyid = this.$route.query.itemlist
    this.campus_id = this.$route.query.campus_id
    this.newDay1();
    this.getSeoInfo();
  },
  methods: {
    getSeoInfo() {
      let params = {
        type: 1,
        id: this.$route.query.itemlist
      }
      seov2(params)
        .then(res=>{
          console.log('res', res);
          this.describe = res.data.describe;
          this.key_word = res.data.key_word;
        })
    },
    newDay1() {
      info('').then(res => {
        const timestamp = res
        const options = {
          campus_id: this.campus_id,
          id: this.happyid,
          timestamp: timestamp
        }
        coursewareDetailsv2(options).then(res => {
          if (res.code === 100) {
            this.MXcalllist = res.data.courseware
            this.course = res.data.course
          } else {
            console.log(res.message)
          }
        })
      })
    },
    shareToSinaWB(event) {
      var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=895033136' // 真实的appkey，必选参数
      _shareUrl += '&url=' + encodeURIComponent(_url || document.location) // 参数url设置分享的内容链接|默认当前页location，可选参数
      _shareUrl += '&title=' + encodeURIComponent(_title || document.title) // 参数title设置分享的标题|默认当前页标题，可选参数
      _shareUrl += '&source=' + encodeURIComponent(_source || '')
      _shareUrl += '&sourceUrl=' + encodeURIComponent(_sourceUrl || '')
      _shareUrl += '&content=' + 'utf-8' // 参数content设置页面编码gb2312|utf-8，可选参数
      _shareUrl += '&pic=' + encodeURIComponent(_pic || '') // 参数pic设置图片链接|默认为空，可选参数
      window.open(_shareUrl, '_blank')
    },
    shareqq(title, url, pic) {
      var p = {
        url: 'https://www.xiniaogongkao.com', // /*获取URL，可加上来自分享到QQ标识，方便统计*/
        desc: '来自犀鸟铲屎官的分享', // /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
        title: '犀鸟公考', // /*分享标题(可选)*/
        summary: '犀鸟公考犀鸟公考', // /*分享描述(可选)*/
        pics: pic, // /*分享图片(可选)*/
        flash: '', // /*视频地址(可选)*/
        // commonClient : true, /*客户端嵌入标志*/
        site: 'QQ分享' // /*分享来源 (可选) ，如：QQ分享*/
      }
      var s = []
      for (var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''))
      }
      var target_url = 'http://connect.qq.com/widget/shareqq/index.html?' + s.join('&')
      window.open(target_url, 'qq', 'height=1080, width=1920')
    },
    setdetails(item) {
      if (item.type === 2) {
        this.$router.push({
          path: '/curriculumlist',
          query: {
            itemlist: item.id
          }
        })
      } else if (item.type === 3) {
        this.$router.push({
          path: '/example/details',
          query: {
            itemlist: item.id
          }
        })
      } else {
        if (item.target_way === 1) {
          window.open(item.target_url, '_blank')
        } else {
          this.$router.push({
            path: '/example/details',
            query: {
              itemlist: item.target_url
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/gkbaike/GKK.scss";
</style>
