<template>
<div class="app-container">
  <div class="video-body">
    <div style="width: 745px;margin: 0 4% 1%;position: relative;display: inline-block">
      <div class="title">{{MXcalllist.title}}</div>
      <div style="display: flex;justify-content: space-between;color: #9AABB8;margin: 10px 0">
        <div style="font-size: 14px" v-if="MXcalllist.create_time"><img src="/images/icon/riqi.png" alt="" style="width: 12px;height: 12px;margin-right: 10px;vertical-align: middle;color: #9AABB8;margin-bottom: 4px">{{(MXcalllist.create_time).replace(/\-/g,".")}}</div>
      </div>
      <div style="color: #333333;padding: 20px 0" v-html="MXcalllist.content" class="contentimglist"></div>
    </div>
    <div>
      <div style="float: right">
        <div style="width: 299px;margin-right: 20px" v-for="(item,index) in banners" v-bind:key="index.url">
          <img :src="item.img_url" alt="" @click="setdetails(item)" style="height: 150px;width: 100%;margin-bottom: 20px;border-radius: 6px;object-fit:cover">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  info,
  bkInfov2,
  referBannerv2
} from '@/api/user'
export default {
  data() {
    return {
      MXcalllist: '',
      happyid: '',
      banners: ''
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
    this.happyid = this.$route.params.id
    this.newDay1()
  },
  methods: {
    newDay1() {
      info('').then(res => {
        const timestamp = res
        const options = {
          campus_id: 0,
          id: this.happyid,
          timestamp: timestamp
        }
        bkInfov2(options).then(res => {
          if (res.code === 100) {
            this.MXcalllist = res.data
          } else {
            this.$alert(res.message, {
              callback: action => {
                this.$router.back(-1)
              }
            })
          }
        })
        referBannerv2(options).then(res => {
          if (res.code === 100) {
            this.banners = res.data
          } else {
            this.$alert(res.message, {
              callback: action => {
                this.$router.back(-1)
              }
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/dashboard/xiniaolist.scss";
</style>
