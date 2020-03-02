<template>
<div id="xiniao" class="app-container">
  <div class="dashboard-font" style="width: 1169px;background: #ffffff;padding-top: 20px;border-radius: 10px;position: relative">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="items.name" v-for="items in columns" v-bind:key="items.id">
        <div style="width: 1169px;height: auto;margin:auto;background: #ffffff">
          <div style="display: flex;justify-content: space-between;padding: 1% 0 1% 1%">
            <div>
              <div class="addkuang" style="padding: 20px;display: flex;margin-left: 2%;height: 135px;cursor:pointer;" @click="setdetail(item)" v-for="(item,index) in menulist" v-bind:key="index.url">
                <div style="width: 161px;height: 86px;margin-right: 10px" v-if="item.cover">
                  <img style="width: 161px;height: 86px;border-radius: 6px" :src="item.cover" alt="">
                </div>
                <div style="height: 86px;line-height: 40px;width: 600px">
                  <div style="font-weight: bold;color: #2B3E50;font-size: 20px" class="titlelist">{{ item.title }}</div>
                  <div class="over-list">{{item.content}}</div>
                  <div style="color: #BDBDBD;font-size: 12px;display: flex;justify-content: flex-start;">
                    <div style="width: 250px;"><img src="/images/icon/riqi.png" style="vertical-align: middle;margin-bottom: 2px;width: 12px;height: 12px"> {{ setTimedays(item.create_time) }}</div>
                    <div v-if="item.sign_code === 1 || item.sign_code === '1'" style="color: #33ccd3;">{{item.sign_status}}</div>
                    <div v-if="item.sign_code === 2 || item.sign_code === '2'" style="color: #bdbdbd;">{{item.sign_status}}</div>
                    <div v-if="item.sign_code === 3 || item.sign_code === '3'" style="color: #e6213a;">{{item.sign_status}}</div>
                    <div v-if="item.sign_code === 4 || item.sign_code === '4'" style="color: #e6213a;">{{item.sign_status}}</div>
                    <div v-if="item.sign_code === 5 || item.sign_code === '5'" style="color: #bdbdbd;">{{item.sign_status}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-right: 20px;margin-top: 22px">
              <div v-for="(item,index) in bannerimg" v-bind:key="index.url">
                <div style="width: 299px;height: 150px;margin-bottom: 30px;object-fit:cover">
                  <img :src="item.img_url" alt="" @click="setdetails(item)" style="width:299px; height:150px;margin-bottom: 20px;border-radius: 6px">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 100%;background: #ffffff" v-show="totalorder > 9">
          <div style="width: 800px;text-align: center">
            <div style="text-align: center">
              <div class="block">
                <el-pagination @size-change="handleSizeChangemyorder" @current-change="handleCurrentChangemyorder" :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next" :total="totalorder">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import {
  bkv2,
  info,
  referBannerv2,
  referencev2
} from '@/api/user'
export default {
  data() {
    return {
      activeName: '',
      activeName2: '',
      activeNames: '',
      plates: '',
      menulist: '',
      bannerimg: '',
      whatinput: '',
      currentPage1: 1, // 分页开始
      totalorder: 0,
      handleClick2str: '',
      campus_id: 0,
      columns: '',
      titlemust: ''
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
  created: function () {
    info('').then(res => {
      const timestamp = res
      const options = {
        campus_id: 0,
        type: 2,
        get_label: 1,
        pagesize: 9,
        timestamp: timestamp
      }
      bkv2(options).then(res => {
        console.log('res', res)
        if (res.code === 100) {
          console.log('111', res.data.news.total)
          this.columns = res.data.labels
          this.menulist = res.data.news.data
          this.totalorder = res.data.news.total
          this.menulist.forEach(item => {
            let Dates = item.create_time.substring(0, 19)
            Dates = Dates.replace(/-/g, '/')
            let timestamp = new Date(Dates).getTime()
            item.create_time = timestamp
          })
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
    setdetails(item) {
      // type1 不跳转 type2 有没有地址
      if (item.type === 2 || item.type === '2' && item.redirect_url && item.redirect_url !== '') {
        window.open(item.redirect_url, '_blank')
      }
    },
    setdetail(item) {
      this.$router.push({
        path: '/xiniaolist',
        query: {
          item: item.id
        }
      })
    },
    handleClick(tab, event) {
      this.handleClickstr = tab.$vnode.key
      info('').then(res => {
        const timestamp = res
        const options = {
          label_id: tab.$vnode.key,
          type: 2,
          pagesize: 9,
          timestamp: timestamp
        }
        bkv2(options).then(res => {
          if (res.code === 100) {
            this.menulist = res.data.news.data
            this.totalorder = res.data.news.data.total
            this.menulist.forEach(function (res) {
              var Dates = res.create_time.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.create_time = timestamp
            })
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
    handleSizeChangemyorder(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChangemyorder(val) {
      // console.log(`当前页: ${val}`)
      info('').then(res => {
        const timestamp = res
        const options = {
          label_id: this.handleClickstr,
          page: val,
          type: 2,
          pagesize: 9,
          timestamp: timestamp
        }
        bkv2(options).then(res => {
          if (res.code === 100) {
            this.menulist = res.data.news.data
            this.totalorder = res.data.news.data.total
            this.menulist.forEach(function (res) {
              console.log('1', res)
              var Dates = res.create_time.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.create_time = timestamp
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
@import "../../static/styles/dashboard/xiniao.scss";
</style>
