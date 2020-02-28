<template>
<div class="app-container" id="ndd1">
  <div class="myclass_in">
    <h1>{{ courseall.coursename }}</h1>
    <div style="color: #999999">开课时间：
      <span v-if="courseall.start_time">{{(courseall.start_time).replace(/\-/g,".").substring(0,10) }}</span> -
      <span v-if="courseall.end_time">{{(courseall.end_time).replace(/\-/g,".").substring(0,10) }}</span>
      <span style="margin-left: 20px">{{ courseall.period }}课时</span>
    </div>
  </div>
  <div class="myclass_in">
    <el-tabs v-model="activeName">
      <el-tab-pane label="课程大纲" name="first" :key="'first'">
        <div style="height: auto">
          <div style="position: relative;padding-left: 37px;color: #333333;border-radius: 10px;background: #FFFBED;border: 1px solid #FFECA5;display: flex;justify-content: space-between;height: 45px;line-height: 45px;padding-right: 150px" v-if="float_content.id">今日直播：{{float_content.name}}
            <div @click="golivenew" style="cursor:pointer;background: #E6213A;color: #FFFFFF;width: 100px;height: 35px;border-radius: 50px;text-align: center;margin-top: 5px;line-height: 35px">去上课</div> <img @click="closethis" src="/images/zhibox.png" style="position: absolute;right: 18px;top: 17px;width: 10px;height: 10px">
          </div>
          <div style="border-bottom: 1px solid #E9E9E9;display: flex;justify-content: space-between;align-items: center;margin-left: 40px;position: relative" v-for="(item,index) in courselist" v-bind:key="index.url">
            <div style="line-height: 24px">
              <div style="background: #E4E4E4;color: #333333;padding: 0 8px;border-radius: 6px;position: absolute;left: -40px">{{ index+1 }}</div>
              <div>{{ item.name }}</div>
              <div style="color: #A8A8A8">
                <span style="margin-right: 10px">{{ item.teacher_nickname }}</span>
                <span v-if="item.start_time">{{(item.start_time).replace(/\-/g,".").substring(0,16) }}</span> -
                <span v-if="item.end_time">{{(item.end_time).replace(/\-/g,".").substring(10,16) }}</span>
              </div>
            </div>
            <div style="display: flex;padding: 20px 0">
              <div @click="dialogVisible = true" style="margin-right: 20px;background: #FCC80D;color: #ffffff;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px" v-if="item.has_homework === 1">课后作业</div>
              <div style="background: #EDF5F9;color: #939393;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px" v-if="item.status_type === 1">未开始</div>
              <div v-if="item.status_type === 2">
                <div v-if="item.type === 1" style="background: #E6213A;color: #FFFFFF;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px; cursor:pointer;" @click="golive(item)">去上课</div>
                <!-- <div v-if="item.type === 2" style="background: #EDF5F9;color: #33CCD3;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px; cursor:pointer;"  @click="golivemp4(item)">看回放1</div> -->
              </div>
              <div style="background: #EDF5F9;color: #33CCD3;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px; cursor:pointer;" v-if="item.status_type === 3" @click="golive(item)">看回放</div>
              <div style="background: #EDF5F9;color: #33CCD3;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px; cursor:pointer;" v-if="item.status_type === 2 && item.type === 2" @click="golive(item)">看回放</div>

              <div style="background: transparent;color: #939393;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px" v-if="item.status_type === 4">线下课程</div>
              <div style="background: #EDF5F9;color: #33CCD3;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px; cursor:pointer;" v-if="item.status_type === 5">面试课程</div>
              <div style="background: #EDF5F9;color: #939393;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px" v-if="item.status_type === 6">已结束</div>
              <div style="background: #E6213A;color: #FFFFFF;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px; cursor:pointer;" v-if="item.status_type === 7" @click="golive(item)">今日直播</div>
              <div style="background: #EDF5F9;color: #939393;width: 100px;height: 40px;border-radius: 20px;text-align: center;line-height: 40px" v-if="item.status_type === 8" @click="golive(item)">直播结束</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="课程讲义" name="second" :key="'second'">
        <div style="height: auto">
          <!--没有讲义-->
          <div v-if="this.wordselist === []" style="text-align: center;">
            <img style="margin-top: 20%" src="/images/zhanwei.png" alt="">
            <div>主人该课程没有讲义哦</div>
          </div>
          <div v-else style="border-bottom: 1px solid #E9E9E9" v-for="(item,index) in wordselist" v-bind:key="index.url">
            <div style="display: flex;justify-content: space-between;align-items: center;padding: 20px 0">
              <div><img style="vertical-align: middle;margin-right: 20px" src="/images/icon/jiangyi.png">{{ item.title }}</div>
              <div style="background: #EDF5F9;color: #33CCD3;border-radius: 20px;padding: 10px 20px;cursor:pointer;" @click="setInmg(item)">下载讲义</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_lists">
      <div style="text-align: center">
        <div style="font-size: 20px;margin-bottom: 50px;margin-top: 10px">您的作业需前往<span style="color: #33CCD3;">犀鸟APP</span>完成</div>
        <img style="width: 213px;height: 213px;" src="/images/gongkao.png" alt="">
        <div style="background: #F1F5F8;width: 80%;border-radius: 20px;margin: 40px auto;padding: 10px 0">如果您未下载APP，打开微信扫一扫下载</div>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import {
  video_detail
} from '~/api/uniapp'
import {
  mycourseInfo,
  info,
  videoDetail
} from '@/api/user'
export default {
  data() {
    return {
      activeName: 'first',
      dialogVisible: false,
      courseall: '',
      courselist: [],
      wordselist: '',
      vodcoss: '',
      livecoss: '',
      happyid: '',
      float_content: {}
    }
  },
  watch: {},
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
    this.$route.query.form
    this.happyid = this.$route.query.form
    info('').then(res => {
      const timestamp = res
      const options = {
        course_id: this.happyid,
        timestamp: timestamp
      }
      mycourseInfo(options).then(res => {
        if (res.code === 100) {
          this.courseall = res.data
          this.courselist = res.data.courseware
          this.wordselist = res.data.handout
          this.float_content = res.data.float_content
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
    closethis() {
      this.float_content.id = ''
    },
    closeShadow() {
      this.dialogVisible = false
    },
    handleClose(done) {
      done()
    },
    setInmg(item) {
      window.location.href = item.url
    },
    golive(item) {
      info('').then(res => {
        const timestamp = res
        const options = {
          courseware_id: item.id,
          timestamp: timestamp
        }
        videoDetail(options).then(res => {
          console.log('个人', res.data)
          console.log('回看id', res.data.videoId)
          console.log('直播状态', res.data.live_status)

          if (res.data.type === 2) {
            var mp4url = res.data.url
            window.open(mp4url, '_blank')
            return false
          }

          // 如果回看live_status为1 就是直播结束
          if (res.data.live_message === '') {
            if (res.data.live_status === 1 || res.data.live_status === '1') {
              const {
                href
              } = this.$router.resolve({
                path: '/Mycurriculum/vodopen', //回放页面
                query: {
                  ourseware_id: item.id
                }
              })
              window.open(href, '_blank')
            } else {
              if (res.data.countdown === 0) {
                const {
                  href
                } = this.$router.resolve({
                  path: '/Mycurriculum/liveopen', //直播播放页面
                  query: {
                    channel_id: item.id
                  }
                })
                window.open(href, '_blank')
              } else {
                const {
                  href
                } = this.$router.resolve({
                  path: '/Mycurriculum/livein', //直播等待页面
                  query: {
                    ourseware_id: item.id
                  }
                })
                window.open(href, '_blank')
              }
            }
          } else {
            this.$message(res.data.live_message)
          }
        })
      })
    },
    golivenew() {
      const {
        href
      } = this.$router.resolve({
        path: '/Mycurriculum/liveopen',
        query: {
          channel_id: this.float_content.id
        }
      })
      window.open(href, '_blank')
    },
    golivemp4(item) {

    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/Mycurriculum/myClass.scss";
</style>
