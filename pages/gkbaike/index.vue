<template>
<div class="app-container">
  <div class="alllist">
    <div style="width: 1169px;margin: 14px auto;height: auto;border-radius: 10px;overflow: hidden">
      <div id="twolist">
        <div style="position: absolute;right: 0;top: -12px;z-index: 99">
          <input type="text" placeholder="请输入关键字" style="width: 368px;height: 43px;border-radius: 30px;border: 1px solid #9AABB8;padding: 12px 26px;outline:none;background: transparent" v-model="whatinput" @keyup.enter="whatinputup">
          <img src="/images/icon/fangdajing.png" style="position: absolute;top: 10px;right: 20px;cursor:pointer;" @click="whatinputup">
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane :label="item.name" v-bind:key="item.id" v-for="item in plates">
            <div>
              <div v-if="menulist&&menulist.length > 5" class="alldisplay">
                <div style="display: inline-block;width: 214px;height: 215px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in menulist" v-bind:key="index.url" @click="upvideo(items)">
                  <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;">
                    <img style="width: 214px;height: 121px;margin-right: 20px;border-radius: 10px 10px 0 0 " :src="items.cover" alt="">
                    <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;width: 35px;height: 35px;left: 42%;top: 25%;z-index: 9999">
                    <p style="color: #333333;font-size: 14px;padding: 0 10px;margin-bottom: 0" class="only-over-lists">{{items.title}}</p>
                    <p style="color: #9AABB8;font-size: 14px;padding: 0 10px;margin-top: 10px" v-if="items.create_time"><img src="/images/icon/riqi.png" style="width: 13px;height: 13px;vertical-align: middle;margin-bottom: 2px"> {{(items.create_time).replace(/\-/g,".").substring(0,10)}}</p>
                  </div>
                </div>
                <div class="list" v-if="len % row > 0" v-for="item in (row - len % row)" v-bind:key="item.url"></div>
              </div>
              <div v-else class="alldisplays">
                <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;display: inline-block;width: 214px;height: 215px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in menulist" v-bind:key="index.url" @click="upvideo(items)">
                  <img style="width: 214px;height: 121px;margin-right: 20px;border-radius: 10px 10px 0 0" :src="items.cover" alt="">
                  <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;width: 35px;height: 35px;left: 42%;top: 25%;z-index: 9999">
                  <p style="color: #333333;font-size: 14px;padding: 0 10px;margin-bottom: 0" class="only-over-lists">{{items.title}}</p>
                  <p style="color: #9AABB8;font-size: 14px;padding: 0 10px;margin-top: 10px" v-if="items.create_time"><img src="/images/icon/riqi.png" style="width: 13px;height: 13px;vertical-align: middle;margin-bottom: 2px"> {{(items.create_time).replace(/\-/g,".").substring(0,10)}}</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  info,
  bkv2
} from '@/api/user'
export default {
  data() {
    return {
      activeName: '',
      menulist: '',
      plates: '',
      len: '',
      row: 5,
      index: null,
      num: null,
      whatinput: '',
      label_id: ''
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
    this.newDay1()
  },
  methods: {
    handleClick(tab, event) {
      this.label_id = tab.$vnode.key
      info('').then(res => {
        const timestamp = res
        // const options = {
        //     type: 1,
        //     get_plate: 0,
        //     label_id: tab.$vnode.key,
        //     timestamp: timestamp
        // }
        const options = {
          type: 1,
          get_plate: 0,
          label_id: tab.$vnode.key,
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
    newDay1() {
      info('').then(res => {
        const timestamp = res
        const options = {
          type: 1,
          source: 0,
          get_label: 1,
          timestamp: timestamp
        }
        bkv2(options).then(res => {
          if (res.code === 100) {
            this.plates = res.data.labels
            this.menulist = res.data.news.data
            this.len = this.menulist.length
            if (this.plates.length) {
              this.label_id = this.plates[0].id
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
        path: '/gkbaike/GKlist',
        query: {
          happyid: items.id
        }
      })
    },
    whatinputup() {
      // 搜索筛选
      this.$router.push({
        path: '/ziliao/searchword',
        query: {
          item: this.whatinput
        }
      })
      // info('').then(res => {
      //   const timestamp = res
      //   const options = { label_id: this.label_id, type: 1, get_plate: 0, keyword: this.whatinput, timestamp: timestamp }
      //   bkv2(options).then(res => {
      //     if (res.code === 100) {
      //       this.menulist = res.data.news.data
      //       this.len = this.menulist.length
      //     } else {
      //       this.$alert(res.message, {
      //         callback: action => {
      //           this.$router.back(-1)
      //         }
      //       })
      //     }
      //   })
      // })
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/gkbaike/index.scss";
</style>
