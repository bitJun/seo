<template>
<div class="app-container" id="kdd1">
  <div class="dashboard-font">
    <div style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: flex-start">
      <div style="display: inline-block;width: 32%;background: #ffffff;border-radius: 10px;margin: 1% 7px;height:363px" @click="setdetails(item)" v-for="(item,index) in courselist" v-bind:key="index.url">
        <!--线上课程-->
        <div v-if="item.type === 3 || item.type === 8" style="width: 100%;display: inline-block;padding: 30px 30px 14px;">
          <div style="height: 18px;color: #33CCD3">{{ item.label_str }}</div>
          <h2 class="over-listsss">{{ item.coursename }}</h2>
          <p style="color: #999999;margin-top:-10px">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
          <el-scrollbar style="height: 100%;">
            <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
              <div style="margin: 0 6px">
                <img style="width: 95px;height: 121px;vertical-align:bottom" :src="itemlist.photo_url">
                <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">{{ itemlist.teacher_nickname }}</div>
              </div>
            </div>
          </el-scrollbar>
          <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 10px;align-items: center">
            <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.order_number }}</span> 人</div>
            <div v-if="item.price !== 0 && item.type!=8" style="color: #E6213A;font-weight: bold;font-size: 14px"><img v-if="item.is_assemble === 1 || item.is_assemble === '1'" src="/images/icon/tuan.png" style="width: 18px;height: 20px;margin-right: 4px" alt="">RMB<span style="font-size: 24px;">{{ item.price }}</span></div>
            <div v-if="item.price !== 0 && item.type==8" style="color: #E6213A;font-weight: bold;font-size: 14px"><img v-if="item.is_assemble === 1 || item.is_assemble === '1'" src="/images/icon/tuan.png" style="width: 18px;height: 20px;margin-right: 4px" alt="">RMB<span style="font-size: 24px;">{{ item.assemble_price }}</span></div>

            <div v-if="item.price == 0" style="color: #E6213A"><span style="font-size: 18px;font-weight: bold">免费</span></div>
          </div>
        </div>
        <!--课程包-->
        <div v-if="item.type === 2" style="width: 100%;display: inline-block;padding: 30px 30px 0 30px;cursor:pointer;">
          <div style="color: #33CCD3">{{ item.subheading }}</div>
          <h2 style="color:#333333;margin: 10px 0" class="only-listsss">{{ item.coursename }}</h2>
          <img :src="item.course_image" style="width: 100%;height: 246px;">
        </div>
        <!--广告课-->
        <div v-if="item.type === 7" style="width: 100%;display: inline-block;border-radius: 10px;cursor:pointer;height: 363px;">
          <img :src="item.course_image" style="width: 100%;border-radius: 10px 10px 0 0;height: 250px;">
          <div style="padding-left: 20px">
            <!-- <h3 class="only-listsss" style="color:#333333;margin: 10px 0" >{{ item.coursename }}</h3> -->
            <h2 class="only-listsss">{{ item.coursename }}</h2>
            <div style="color: #999999;font-size: 14px">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  coursePackage,
  info
} from '@/api/user'
export default {
  data() {
    return {
      courselist: '',
      Articlelist: '',
      happyid: ''
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
    this.happyid = this.$route.query.itemlist
    info('').then(res => {
      const timestamp = res
      const options = {
        course_id: this.happyid,
        timestamp: timestamp
      }
      coursePackage(options).then(res => {
        if (res.code === 100) {
          this.courselist = res.data
        } else {
          this.$alert(res.message, {
            callback: action => {
              this.$router.back(-1)
            }
          })
        }
      })
    })
  },
  methods: {
    setdetails(item) {
      console.log("获取参数：", item)
      if (item.type == 7) {
        console.log("广告课跳转", item.target_url)
        this.$router.push({
          path: '/example/details',
          query: {
            itemlist: item.target_url
          }
        })
      } else {
        this.$router.push({
          path: '/example/details',
          query: {
            itemlist: item.id
          }
        })

      }
    },
    topnum() {
      this.$router.push({
        path: '/ziliao/Reference'
      })
    },
    setdateilss(item) {
      this.$router.push({
        path: '/ziliao/menulist',
        query: {
          detail: item.id
        }
      })
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/dashboard/curriculumlist.scss";
</style>
