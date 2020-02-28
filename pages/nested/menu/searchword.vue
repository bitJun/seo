<template>
<div id="Bklist" class="app-container">
  <div class="dashboard-font" style="width: 1169px;padding-top: 20px;border-radius: 10px;position: relative">
    <div style="padding: 1.5% 2%;position: absolute;right: 20px;top: -20px;z-index: 9999;">
      <input type="text" placeholder="请输入关键字" style="color: #2b3e50;width: 368px;height: 43px;border-radius: 30px;border: 1px solid #9AABB8;padding: 12px 26px;outline:none;background: transparent" v-model="whatinput" @keyup.enter="whatinputup">
      <img src="/images/icon/fangdajing.png" style="position: absolute;top: 28px;right: 40px; cursor:pointer;" @click="whatinputup">
    </div>
    <div style="padding: 3% 0;position: absolute;top: -20px;z-index: 9999;color: #2b3e50">
      <img src="/images/icon/zuozuo.png" style="width: 15px;height: 15px;margin-right: 10px;vertical-align: middle;margin-bottom: 2px" @click="backoff">找到{{len}}个相关内容
    </div>
    <div style="margin-top: 80px">
      <div v-if="menulist&&menulist.length > 5" class="alldisplay">
        <div style="display: inline-block;width: 214px;height: 215px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in menulist" v-bind:key="index.url" @click="upvideo(items)">
          <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;">
            <img style="width: 214px;height: 121px;margin-right: 20px;border-radius: 10px 10px 0 0 " :src="items.cover" alt="">
            <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;width: 35px;height: 35px;left: 42%;top: 25%;z-index: 9999">
            <p style="color: #333333;font-size: 14px;padding: 0 10px;margin: 5px 0" class="only-over-lists">{{items.title}}</p>
            <p style="color: #9AABB8;font-size: 14px;padding: 0 10px" v-if="items.create_time"><img src="/images/icon/riqi.png" style="width: 13px;height: 13px;vertical-align: middle;margin-bottom: 2px"> {{(items.create_time).replace(/\-/g,".").substring(0,10)}}</p>
          </div>
        </div>
        <div class="list" v-if="len % row > 0" v-for="item in (row - len % row)" v-bind:key="item.url"></div>
      </div>
      <div v-else class="alldisplays">
        <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;display: inline-block;width: 214px;height: 215px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in menulist" v-bind:key="index.url" @click="upvideo(items)">
          <img style="width: 214px;height: 121px;margin-right: 20px;border-radius: 10px 10px 0 0" :src="items.cover" alt="">
          <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;width: 35px;height: 35px;left: 42%;top: 25%;z-index: 9999">
          <p style="color: #333333;font-size: 14px;padding: 0 10px;margin: 5px 0" class="only-over-lists">{{items.title}}</p>
          <p style="color: #9AABB8;font-size: 14px;padding: 0 10px" v-if="items.create_time"><img src="/images/icon/riqi.png" style="width: 13px;height: 13px;vertical-align: middle;margin-bottom: 2px"> {{(items.create_time).replace(/\-/g,".").substring(0,10)}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  info,
  referSearchv2,
  bkv2
} from '@/api/user'
export default {
  data() {
    return {
      menulist: '',
      plates: '',
      len: '',
      row: 5,
      index: null,
      num: null,
      whatinput: '',
      label_id: '',
      campus_id: ''
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
    this.whatinput = this.$route.query.item
    info('').then(res => {
      const timestamp = res
      const options = {
        type: 1,
        get_plate: 0,
        keyword: this.whatinput,
        timestamp: timestamp
      }
      bkv2(options).then(res => {
        if (res.code === 100) {
          this.menulist = res.data.news.data
          this.len = this.menulist.length
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
    whatinputup() {
      info('').then(res => {
        const timestamp = res
        const options = {
          type: 1,
          get_plate: 0,
          keyword: this.whatinput,
          timestamp: timestamp
        }
        bkv2(options).then(res => {
          if (res.code === 100) {
            this.menulist = res.data.news.data
            this.len = this.menulist.length
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
          type: 1,
          pagesize: 9,
          page: val,
          campus_id: this.campus_id,
          keyword: this.whatinput,
          timestamp: timestamp
        }
        referSearchv2(options).then(res => {
          if (res.code === 100) {
            // this.newplates = res.data.plates
            // this.newprojects = res.data.projects
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
    table(index) {
      this.num = index
    },
    tables() {
      this.num = null
      this.index = null
    },
    upvideo(items) {
      this.$router.push({
        path: '/GKword/GKlist',
        query: {
          happyid: items.id
        }
      })
    },
    backoff() {
      history.go(-1)
    }
  }
}
</script>

<style lang="scss" >
@import "../../../static/styles/nested/menu/searchword.scss";
</style>
