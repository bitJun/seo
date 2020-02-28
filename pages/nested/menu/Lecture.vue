<template>
<div id="Bklist" class="app-container">
  <div class="dashboard-font">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <div style="background: #ffffff;padding: 2%">
        <input type="text" placeholder="2020" style="width: 40%;border-radius: 30px;border: 1px solid #9AABB8;padding: 12px 26px;outline:none" v-model="whatinput" @keyup.enter="whatinputup">
        <img src="/images/icon/fangdajing.png" style="position: absolute;top: 35px;left: 430px;cursor:pointer;" @click="whatinputup">
      </div>
      <el-tab-pane :label="item.title" v-bind:key="item.id" v-for="item in plates">
        <div style="width: 1169px;height: auto;margin:auto;background: #ffffff">
          <div style="display: flex;justify-content: space-between;padding: 1% 0 1% 1%">
            <div>
              <div class="addkuang" style="padding: 20px;display: flex;margin-left: 2%;height: 165px;cursor:pointer;" @click="setdetail(item)" v-for="(item,index) in menulist" v-bind:key="index.url">
                <div>
                  <img style="width: 118px;height: 118px;margin-right: 20px" :src="item.img_url" alt="">
                </div>
                <div style="height: 118px;line-height: 36px;width: 600px">
                  <div style="font-weight: bold;color: #2B3E50" class="titlelist">{{ item.title }}</div>
                  <div v-html="item.sub_title" class="over-list"></div>
                  <div style="display: flex;justify-content: space-between;width: 600px">
                    <div style="color: #BDBDBD;font-size: 12px"><img src="/images/icon/riqi.png" style="vertical-align: middle;margin-bottom: 2px;width: 12px;height: 12px"> {{ setTimedays(item.regdate) }}</div>
                    <div style="display: flex;justify-content: space-between;width: 140px; color: #849191;">
                      <div><img src="/images/icon/kan.png" alt="" style="margin-right: 5px;vertical-align: middle;width: 18px;height: 18px;margin-bottom: 4px">
                        <span>{{ item.view_num }}</span>
                      </div>
                      <div>
                        <img v-if="item.is_collect === 0" src="/images/icon/shoucang.png" alt="" style="width: 18px;height: 18px;vertical-align: middle;margin-bottom: 4px">
                        <img v-else src="/images/icon/shoucang1.png" alt="" style="width: 18px;height: 18px;vertical-align: middle;margin-bottom: 4px">
                        <span>{{ item.collect_num }}</span>
                      </div>
                      <div>
                        <img src="/images/icon/pinglun.png" alt="" style="margin-right: 3px;vertical-align: middle;width: 18px;height: 18px;margin-bottom: 4px">
                        <span>{{ item.comment_num }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-right: 20px">
              <div v-for="(item,index) in bannerimg" v-bind:key="index.url">
                <div style="width: 299px">
                  <img :src="item.img_url" alt="" @click="setdetails(index, item)" style="width: 100%">
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <div style="width: 100%;background: #ffffff">
        <div style="width: 800px;text-align: center">
          <div style="text-align: center">
            <div class="block">
              <el-pagination @size-change="handleSizeChangemyorder" @current-change="handleCurrentChangemyorder" :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next" :total="totalorder">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
</div>
</template>

<script>
import {
  article,
  info,
  banner
} from '@/api/user'
export default {
  data() {
    return {
      activeName: '',
      plates: '',
      menulist: '',
      bannerimg: '',
      whatinput: '',
      currentPage1: 1, // 分页开始
      totalorder: 0
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
    info('').then(res => {
      const timestamp = res
      const options = {
        type: 4,
        get_plate: 1,
        timestamp: timestamp
      }
      article(options).then(res => {
        if (res.code === 100) {
          this.plates = res.data.plates
          this.menulist = res.data.data
          this.totalorder = res.data.total
          this.menulist.forEach(function (res) {
            var Dates = res.regdate.substring(0, 19)
            Dates = Dates.replace(/-/g, '/')
            var timestamp = new Date(Dates).getTime()
            res.regdate = timestamp
          })
        } else {
          this.$alert(res.message, {
            callback: action => {
              this.$router.back(-1)
            }
          })
        }
      })
      banner(options).then(res => {
        if (res.code === 100) {
          this.bannerimg = res.data
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
    setTimedays(time) {
      if (time > 0) {
        var result
        time = parseInt(time)
        var minute = 1000 * 60
        var hour = minute * 60
        var day = hour * 24
        var month = day * 30
        var now = new Date().getTime()
        var diffValue = now - time
        if (diffValue < 0) {
          return
        }
        var monthC = diffValue / month
        var weekC = diffValue / (7 * day)
        var dayC = diffValue / day
        var hourC = diffValue / hour
        var minC = diffValue / minute
        if (monthC >= 1) {
          if (monthC <= 12) {
            result = '' + parseInt(monthC) + '月前'
          } else {
            result = '' + parseInt(monthC / 12) + '年前'
          }
        } else if (weekC >= 1) {
          result = '' + parseInt(weekC) + '周前'
        } else if (dayC >= 1) {
          result = '' + parseInt(dayC) + '天前'
        } else if (hourC >= 1) {
          result = '' + parseInt(hourC) + '小时前'
        } else if (minC >= 1) {
          result = '' + parseInt(minC) + '分钟前'
        } else {
          result = '刚刚'
        }
        return result
      } else {
        return ''
      }
    },
    // 跳转视频中心
    setdetails(index, item) {
      if (index === 0 || index === '0') {
        this.$router.push({
          path: '/videoLibrary/videoLibrary'
        })
      } else {
        window.open(item.redirect_url, '_blank')
      }
    },
    setdetail(item) {
      this.$router.push({
        path: '/nested/menulist',
        query: {
          detail: item.id
        }
      })
    },
    handleClick(tab, event) {
      info('').then(res => {
        const timestamp = res
        const options = {
          type: 4,
          get_plate: 0,
          plate_id: tab.$vnode.key,
          timestamp: timestamp
        }
        article(options).then(res => {
          if (res.code === 100) {
            this.menulist = res.data.data
            this.totalorder = res.data.total
            this.menulist.forEach(function (res) {
              var Dates = res.regdate.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.regdate = timestamp
            })
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
    whatinputup() {
      info('').then(res => {
        const timestamp = res
        const options = {
          type: 4,
          keyword: this.whatinput,
          timestamp: timestamp
        }
        article(options).then(res => {
          if (res.code === 100) {
            this.menulist = res.data.data
            this.totalorder = res.data.total
            this.menulist.forEach(function (res) {
              var Dates = res.regdate.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.regdate = timestamp
            })
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
    handleSizeChangemyorder(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChangemyorder(val) {
      // console.log(`当前页: ${val}`)
      console.log('当前页', val)
      info('').then(res => {
        this.menulist = []
        const timestamp = res
        const options = {
          type: 4,
          pagesize: 9,
          page: val,
          timestamp: timestamp
        }
        article(options).then(res => {
          if (res.code === 100) {
            this.menulist = res.data.data
            this.menulist.forEach(function (res) {
              var Dates = res.regdate.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.regdate = timestamp
            })
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
@import "../../../static/styles/nested/menu/Lecture.scss";
</style>
