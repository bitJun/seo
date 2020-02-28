<template>
<div id="Bklist" class="app-container">
  <div class="dashboard-font" style="width: 1169px;background: #ffffff;padding-top: 20px;border-radius: 10px;position: relative">
    <div style="padding: 1.5% 2%;position: absolute;right: 20px;top: 0;z-index: 9999">
      <input type="text" placeholder="请输入关键字" style="width: 368px;height: 43px;border-radius: 30px;border: 1px solid #9AABB8;padding: 12px 26px;outline:none" v-model="whatinput" @keyup.enter="whatinputup">
      <img src="/images/icon/fangdajing.png" style="position: absolute;top: 28px;right: 40px;cursor:pointer;" @click="whatinputup">
    </div>
    <el-tabs v-model="activeNames" @tab-click="handleClicks">
      <el-tab-pane :label="items.title" v-for="items in columns" v-bind:key="items.id">
        <div class="dashboard-font" id="addthis">
          <el-tabs v-model="activeName2" @tab-click="handleClick2">
            <el-tab-pane :label="item.name" v-bind:key="item.id" v-for="item in newprojects"></el-tab-pane>
          </el-tabs>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item.title" v-bind:key="item.id" v-for="item in newplates"></el-tab-pane>
            <div v-if="items.id !== 5" style="width: 1169px;height: auto;margin:auto;background: #ffffff">
              <div style="display: flex;justify-content: space-between;padding: 1% 0 1% 1%">
                <div>
                  <div class="addkuang" style="padding: 20px;display: flex;margin-left: 2%;height: 135px;cursor:pointer;" @click="setdetail(item)" v-for="(item,index) in menulist" v-bind:key="index.url">
                    <div style="width: 161px;height: 86px;margin-right: 10px" v-if="item.img_url">
                      <img style="width: 161px;height: 86px;border-radius: 6px;object-fit:cover" :src="item.img_url" alt="">
                    </div>
                    <div v-if="item.img_url === ''" style="height: 86px;line-height: 40px;width: 757px">
                      <div style="font-weight: bold;color: #2B3E50;font-size: 20px" class="titlelist">{{ item.title }}</div>
                      <div v-html="item.abstract" class="over-list"></div>
                      <div style="color: #BDBDBD;font-size: 12px;display: flex;justify-content: flex-start;">
                        <div style="width: 250px;"><img src="/images/icon/riqi.png" style="vertical-align: middle;margin-bottom: 2px;width: 12px;height: 12px"> {{ setTimedays(item.regdate) }}</div>
                        <div v-if="item.sign_code === 1 || item.sign_code === '1'" style="color: #33ccd3;">{{item.sign_status}}</div>
                        <div v-if="item.sign_code === 2 || item.sign_code === '2'" style="color: #bdbdbd;">{{item.sign_status}}</div>
                        <div v-if="item.sign_code === 3 || item.sign_code === '3'" style="color: #e6213a;">{{item.sign_status}}</div>
                        <div v-if="item.sign_code === 4 || item.sign_code === '4'" style="color: #e6213a;">{{item.sign_status}}</div>
                        <div v-if="item.sign_code === 5 || item.sign_code === '5'" style="color: #bdbdbd;">{{item.sign_status}}</div>
                      </div>
                    </div>
                    <div v-else style="height: 86px;line-height: 40px;width: 600px">
                      <div style="font-weight: bold;color: #2B3E50;font-size: 20px" class="titlelist">{{ item.title }}</div>
                      <div v-html="item.abstract" class="over-list"></div>
                      <div style="color: #BDBDBD;font-size: 12px;display: flex;justify-content: flex-start;">
                        <div style="width: 250px;"><img src="/images/icon/riqi.png" style="vertical-align: middle;margin-bottom: 2px;width: 12px;height: 12px"> {{ setTimedays(item.regdate) }}</div>
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
            <div v-else style="width: 1169px;height: auto;margin:auto;background: #ffffff">
              <div style="display: flex;justify-content: space-between;padding: 1% 0 1% 1%">
                <div style="padding-left: 30px;width: 100%;padding-right: 69px" class="lines">
                  <div v-for="(item,index) in menulist" v-bind:key="index.url">
                    <div style="display: flex;width: 100%;height: 30px;color: #2B3E50;justify-content: space-between;align-items: center;margin: 10px 0">
                      <div style="display: flex;align-items: center">
                        <img src="/images/icon/mianshi.png" style="width: 32px;height: 27px;margin-right: 10px">
                        <div>湖南</div>丨<div>{{ item.title }}</div>
                      </div>
                      <div style="color: #BDBDBD;font-size: 12px;right: 0"><img src="/images/icon/riqi.png" style="vertical-align: middle;margin-bottom: 2px;width: 12px;height: 12px"> {{ setTimedays(item.regdate) }}</div>
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
            <!--              // 分页-->
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
          </el-tabs>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import {
  article,
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
      newprojects: '',
      newplates: '',
      handleClick2str: '',
      campus_id: '',
      columns: '',
      titlemust: '',
      tabs: ''
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
    this.campus_id = this.$route.query.campus_id
    this.tabs = this.$route.query.tabs
    info('').then(res => {
      const timestamp = res
      const options = {
        campus_id: this.campus_id,
        get_column: 1,
        timestamp: timestamp
      }
      referencev2(options).then(res => {
        console.log('res', res)
        if (res.code === 100) {
          this.columns = res.data.columns
          this.plates = res.data.plates
          // this.totalorder = res.total
          this.newplates = res.data.plates
          this.newprojects = res.data.projects
          this.menulist = res.data.articles.data
          this.totalorder = res.data.articles.total
          this.menulist.forEach(function (res) {
            var Dates = res.regdate.substring(0, 19)
            Dates = Dates.replace(/-/g, '/')
            var timestamp = new Date(Dates).getTime()
            res.regdate = timestamp
          })
          if (this.columns.length) {
            this.titlemust = this.columns[0].id
            console.log('111____', this.titlemust)
          }
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
          this.bannerimg = res
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
        path: '/ziliao/menulist',
        query: {
          detail: item.id,
          campus_id: this.campus_id
        }
      })
    },
    handleClick(tab, event) {
      this.handleClickstr = tab.$vnode.key
      info('').then(res => {
        const timestamp = res
        const options = {
          column_id: this.titlemust,
          campus_id: this.campus_id,
          get_plate: 0,
          project_id: this.handleClick2str,
          plate_id: this.handleClickstr,
          timestamp: timestamp
        }
        referencev2(options).then(res => {
          if (res.code === 100) {
            // this.newplates = res.plates
            // this.newprojects = res.projects
            this.menulist = res.data.articles.data
            this.totalorder = res.data.articles.total
            this.menulist.forEach(function (res) {
              var Dates = res.regdate.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.regdate = timestamp
            })
            // this.handleClick2str = '0'
            // this.activeName2 = '0'
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
    handleClicks(tab, event) {
      info('').then(res => {
        console.log("11111:", tab.$vnode.key)
        this.titlemust = tab.$vnode.key
        const timestamp = res
        const options = {
          column_id: tab.$vnode.key,
          campus_id: this.campus_id,
          get_column: 1,
          timestamp: timestamp
        }
        referencev2(options).then(res => {
          if (res.code === 100) {
            this.plates = res.data.plates
            // this.menulist = res.articles.data
            // this.totalorder = res.total
            this.newplates = res.data.plates
            this.newprojects = res.data.projects
            this.totalorder = res.data.articles.total
            this.menulist = res.data.articles.data
            console.log('11____', this.menulist)
            this.menulist.forEach(function (res) {
              var Dates = res.regdate.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.regdate = timestamp
            })
            this.handleClick2str = '0'
            this.handleClickstr = '0'
            this.activeName2 = '0'
            this.activeName = '0'
          } else {
            this.$alert(res.message, {
              callback: action => {
                this.$router.back(-1)
              }
            })
          }
        })
        // referBannerv2(options).then(res => {
        //   if (res.code === 100) {
        //     this.bannerimg = res
        //   } else {
        //     this.$alert(res.message, {
        //       callback: action => {
        //         this.$router.back(-1)
        //       }
        //     })
        //   }
        // })
      })
    },
    handleClick2(tab, event) {
      this.handleClick2str = tab.$vnode.key
      this.project_id = tab.$vnode.key

      info('').then(res => {
        const timestamp = res
        const options = {
          column_id: this.titlemust,
          campus_id: this.campus_id,
          get_plate: 0,
          plate_id: this.handleClickstr,
          project_id: this.handleClick2str,
          timestamp: timestamp
        }
        referencev2(options).then(res => {
          if (res.code === 100) {
            // this.newplates = res.plates
            // this.newprojects = res.projects
            this.menulist = res.data.articles.data
            this.totalorder = res.data.articles.total
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
      this.$router.push({
        path: '/nested/search',
        query: {
          whatinput: this.whatinput,
          campus_id: this.campus_id
        }
      })
      // info('').then(res => {
      //   const timestamp = res
      //   const options = { type: 1, keyword: this.whatinput, timestamp: timestamp }
      //   article(options).then(res => {
      //     if (res.code === 100) {
      //       this.menulist = res.data
      //       this.totalorder = res.total
      //       this.menulist.forEach(function(res) {
      //         var Dates = res.regdate.substring(0, 19)
      //         Dates = Dates.replace(/-/g, '/')
      //         var timestamp = new Date(Dates).getTime()
      //         res.regdate = timestamp
      //       })
      //     } else {
      //       this.$alert(res.message, {
      //         callback: action => {
      //           this.$router.back(-1)
      //         }
      //       })
      //     }
      //   })
      // })
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
          campus_id: this.campus_id,
          column_id: this.titlemust,
          project_id: this.handleClick2str,
          plate_id: this.handleClickstr,
          type: 1,
          pagesize: 9,
          page: val,
          timestamp: timestamp
        }
        referencev2(options).then(res => {
          if (res.code === 100) {
            // this.columns = res.columns
            // this.plates = res.plates
            // this.totalorder = res.total
            // this.newplates = res.plates
            // this.newprojects = res.projects
            this.menulist = res.data.articles.data
            this.totalorder = res.data.articles.total
            this.menulist.forEach(function (res) {
              var Dates = res.regdate.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.regdate = timestamp
            })
            if (this.columns.length) {
              this.titlemust = this.columns[0].id
              console.log('111____', this.titlemust)
            }
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
@import "../../static/styles/nested/menu/index.scss";
</style>
