<template>
<div class="app-container">
  <div class="alllist">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item.name" v-bind:key="item.id" v-for="item in plates">
        <div style="width: 1169px;margin: 14px auto;height: auto;border-radius: 10px;overflow: hidden">
          <div id="twolist">
            <el-tabs v-model="activeName2" @tab-click="handleClick2">
              <el-tab-pane :label="item.cl_name" v-bind:key="item.cl_id" v-for="item in taglists">
                <div v-if="item.cl_id === 0|| item.cl_id === '0'">
                  <div v-if="menulist&&menulist.length > 5" class="alldisplay">
                    <div style="display: inline-block;width: 214px;height: 225px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in menulist" v-bind:key="index.url" @click="GKlist(items)">
                      <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;">
                        <img style="width: 214px;height: 134px;margin-right: 20px;border-radius: 10px 10px 0 0 " :src="items.cover" alt="">
                        <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;width: 35px;height: 35px;left: 42%;top: 25%;z-index: 9999">
                        <p style="color: #333333;font-size: 14px;padding: 0 10px">{{items.name}}</p>
                        <p style="color: #9AABB8;font-size: 14px;padding: 0 10px"><img src="/images/icon/laoshi.png" style="width: 16px;height: 13px;vertical-align: middle;margin-bottom: 2px">主讲：{{items.teacher_name}}
                        </p>
                      </div>
                    </div>
                    <div class="list" v-if="len % row > 0" v-for="item in (row - len % row)" v-bind:key="item.url"></div>
                  </div>
                  <div v-else class="alldisplays">
                    <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;display: inline-block;width: 214px;height: 225px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in menulist" v-bind:key="index.url" @click="GKlist(items)">
                      <img style="width: 214px;height: 134px;margin-right: 20px;border-radius: 10px 10px 0 0" :src="items.cover" alt="">
                      <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;width: 35px;height: 35px;left: 42%;top: 25%;z-index: 9999">
                      <p style="color: #333333;font-size: 14px;padding: 0 10px">{{items.name}}</p>
                      <p style="color: #9AABB8;font-size: 14px;padding: 0 10px"><img src="/images/icon/laoshi.png" style="width: 16px;height: 13px">主讲：{{items.teacher_name}}
                      </p>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="orderthid" style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: space-between;margin-bottom: 100px">
                    <div class="hoverlist d1-1" style="height: 363px;display: inline-block;width: 32%;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(item,index) in menulist" v-bind:key="index.url">
                      <!--线上课程-->
                      <div v-if="item.recommend_type === 1&&item.type === 3" @click="setdetails(item)" style="width: 100%;display: inline-block;padding: 30px 30px 14px 30px;cursor:pointer;">
                        <div style="color: #33CCD3;height: 18px">{{ item.label_str }}</div>
                        <h2 style="color: #333333;margin: 10px 0" class="over-listsss">{{ item.coursename }}</h2>
                        <p style="color: #999999;margin-top: 0" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!== ''">{{(item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
                        <div style="display: flex;overflow: hidden">
                          <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
                            <div style="margin: 0 6px">
                              <img style="width: 95px;height: 121px;vertical-align:bottom;object-fit:cover" :src="itemlist.photo_url">
                              <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">
                                {{ itemlist.teacher_nickname }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 20px;align-items: center">
                          <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.order_number }}</span> 人
                          </div>
                          <div v-if="item.price !== 0" style="color: #E6213A;font-weight: bold;font-size: 14px">RMB<span style="font-size: 24px;">{{ item.price }}</span></div>
                          <div v-else style="color: #E6213A"><span style="font-size: 24px;font-weight: bold">免费</span>
                          </div>
                        </div>
                      </div>
                      <!--团购课-->
                      <div v-if="item.recommend_type === 1&&item.type === 8" @click="setdetails(item)" style="width: 100%;display: inline-block;padding: 30px 30px 14px 30px;cursor:pointer;">
                        <div style="color: #33CCD3;height: 18px">{{ item.label_str }}</div>
                        <h2 style="color: #333333;margin: 10px 0" class="over-listsss">{{ item.coursename }}</h2>
                        <p style="color: #999999;margin-top: 0" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!== ''">{{(item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
                        <el-scrollbar style="height: 100%;">
                          <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
                            <div style="margin: 0 6px">
                              <img style="width: 95px;height: 121px;vertical-align:bottom;object-fit:cover" :src="itemlist.photo_url">
                              <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">
                                {{ itemlist.teacher_nickname }}
                              </div>
                            </div>
                          </div>
                        </el-scrollbar>
                        <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 20px;align-items: center">
                          <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.order_number }}</span> 人
                          </div>
                          <div v-if="item.price !== 0" style="color: #E6213A;font-weight: bold;font-size: 14px"><img src="/images/icon/tuan.png" style="width: 18px;height: 20px;margin-right: 4px" alt="">RMB<span style="font-size: 24px;">{{ item.assemble_price }}</span></div>
                          <div v-else style="color: #E6213A"><span style="font-size: 24px;font-weight: bold">免费</span>
                          </div>
                        </div>
                      </div>
                      <!--课程包-->
                      <div v-if="item.recommend_type === 1&&item.type === 2" @click="setdetails(item)" style="width: 100%;display: inline-block;padding-top: 30px ;cursor:pointer;">
                        <div style="color: #33CCD3;padding: 0 20px ">{{ item.label_str }}</div>
                        <!-- <div style="color: #33CCD3;padding: 0 20px ">{{ item.label_str }}</div> -->

                        <h2 style="color:#333333;margin-top: 10px ;padding: 0 20px;margin-bottom: 0" class="only-one over-listsss">{{ item.coursename }}</h2>
                        <img :src="item.course_image" style="width: 100%;height: 280px;object-fit:cover;border-radius: 0 0 10px 10px">
                      </div>
                      <!--广告课-->
                      <div v-if="item.recommend_type === 1&&item.type === 7" @click="setdetails(item)" style="width: 100%;display: inline-block;border-radius: 10px;cursor:pointer;">
                        <img :src="item.course_image" style="width: 100%;border-radius: 10px 10px 0 0;height: 250px;object-fit:cover">
                        <div style="padding: 10px 20px 20px 20px">
                          <h2 style="color:#333333;margin: 16px 0" class="only-one over-listsss">{{ item.coursename }}</h2>
                          <div style="color: #999999;font-size: 14px" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!== ''">{{
                              (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{
                              (item.end_time).substring(0,10).replace(/\-/g,".") }}
                          </div>
                        </div>
                      </div>
                      <!--打卡营-->
                      <div v-if="item.recommend_type === 2" @click="dakaying(item)" style="width: 100%;display: inline-block;border-radius: 10px;cursor:pointer;">
                        <img :src="item.web_cover" style="width: 100%;height: 250px;border-radius: 10px 10px 0 0 ;object-fit:cover">
                        <div style="padding: 10px 20px 10px 20px">
                          <h2 style="color:#333333;margin: 10px 0" class="over-listsss">{{item.name}}</h2>
                          <div style="color: #999999;font-size: 14px">
                            <ul style="list-style: none;display: flex;justify-content: space-between;padding-left: 0;align-items: center">
                              <li>已报 <span style="color: #33CCD3;margin-right: 8px">{{item.totalBuys}}</span>
                                主讲：{{item.lecturer_name}}
                              </li>
                              <!-- <span class="DK">学完全返</span> -->
                              <li> <span style="color: #E6213A;font-size: 10px"> RMB <span style="font-size: 23px;font-weight: bold">{{item.price}}</span></span></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div style="width: 100%;background: #ffffff" v-show="len > 18">
          <div style="width: 800px;text-align: center">
            <div style="text-align: center">
              <div class="block">
                <el-pagination @size-change="handleSizeChangemyorder" @current-change="handleCurrentChangemyorder" :current-page.sync="currentPage1" :page-size="30" layout="total, prev, pager, next" :total="len">
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
  info,
  article,
  branchFreev2,
  lablev2,
  branchRecommendv2,
  seov2
} from '@/api/user'

export default {
  data() {
    return {
      activeName: '',
      activeName2: '',
      taglists: '',
      menulist: '',
      plates: '',
      len: '',
      row: 5,
      index: null,
      num: null,
      campus_id: 0,
      tab1: '0',
      tab2: '0',
      currentPage1: 1, // 分页开始
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
    this.newDay1();
    this.seoInfo();
  },
  methods: {
    seoInfo() {
      let params = {
        type: 1,
        id: ''
      }
      seov2(params)
        .then(res => {
          console.log('res', res);
        })
    },
    handleClick(tab, event) {
      this.menulist = ''
      var tabid = tab.$vnode.key
      this.tab1 = tab.$vnode.key
      this.activeName2 = '0'
      info('').then(res => {
        const timestamp = res
        const options = {
          campus_id: this.campus_id,
          project_id: tabid,
          lable_id: 0,
          get_lable: 1,
          timestamp: timestamp
        }
        branchRecommendv2(options).then(res => {
          if (res.code === 100) {
            this.taglists = res.data.lables
            const optionsa = {
              campus_id: this.campus_id,
              project_id: tabid,
              lable_id: res.data.lables[0].cl_id,
              get_lable: 0,
              timestamp: timestamp
            }
            branchRecommendv2(optionsa).then(res => {
              if (res.code === 100) {
                this.menulist = res.data.data.data
                this.len = this.menulist.length
              }
            })
          } else {
            this.$alert(res.message)
          }
        })
      })
    },
    handleClick2(tab, event) {
      this.menulist = ''
      var tabid = tab.$vnode.key
      this.tab2 = tabid
      info('').then(res => {
        const timestamp = res
        const options = {
          campus_id: this.campus_id,
          project_id: this.tab1,
          lable_id: tabid,
          timestamp: timestamp
        }
        branchRecommendv2(options).then(res => {
          if (res.code === 100) {
            this.menulist = res.data.data.data
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
        const timestamp = res;
        const options = {
          campus_id: this.campus_id,
          project_id: this.tab1,
          lable_id: this.tab2,
          get_lable: 1,
          timestamp: timestamp
        }
        branchRecommendv2(options).then(res => {
          if (res.code === 100) {
            this.taglists = res.data.lables;
            if (this.taglists.length > 1) {
              if (this.taglists[0].cl_id === 0) {
                this.lable_id = this.taglists[1].cl_id
                this.activeName2 = '1'
              } else {
                this.lable_id = this.taglists[0].cl_id
                this.activeName2 = '0'
              }
              const optionss = {
                campus_id: this.campus_id,
                project_id: this.tab1,
                lable_id: this.lable_id,
                get_lable: 1,
                pagesize: 18,
                timestamp: timestamp
              }
              branchRecommendv2(optionss).then(res => {
                if (res.code === 100) {
                  this.taglists = res.data.lables
                  this.menulist = res.data.data.data
                  this.plates = res.data.project
                  this.len = this.menulist.length
                } else {
                  this.$alert(res.message, {
                    callback: action => {
                      this.$router.back(-1)
                    }
                  })
                }
              })
            } else if (this.taglists.length === 1) {
              this.lable_id = this.taglists[0].cl_id
              const optionss = {
                campus_id: this.campus_id,
                project_id: this.tab1,
                lable_id: this.lable_id,
                get_lable: 1,
                timestamp: timestamp
              }
              this.activeName2 = '0'
              branchRecommendv2(optionss).then(res => {
                if (res.code === 100) {
                  this.taglists = res.data.lables
                  this.menulist = res.data.data.data
                  this.plates = res.data.project
                  this.len = this.menulist.length
                } else {
                  this.$alert(res.message, {
                    callback: action => {
                      this.$router.back(-1)
                    }
                  })
                }
              })
            } else {
              this.lable_id = 0
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
    handleSizeChangemyorder(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChangemyorder(val) {
      // console.log(`当前页: ${val}`)
      info('').then(res => {
        const timestamp = res
        // const options = { label_id: this.handleClickstr, page: val, type: 2, pagesize: 9, timestamp: timestamp }
        const options = {
          campus_id: this.campus_id,
          lable_id: this.handleClickstr,
          get_lable: 1,
          pagesize: 30,
          type: 2,
          page: val,
          timestamp: timestamp
        }
        branchRecommendv2(options).then(res => {
          if (res.code === 100) {
            this.taglists = res.data.lables
            this.menulist = res.data.data.data
            this.plates = res.data.project
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
    tables() {
      this.num = null
      this.index = null
    },
    GKlist(item) {
      this.$router.push({
        path: '/gkbaike/GKK',
        query: {
          itemlist: item.id,
          campus_id: this.campus_id
        }
      })
    },
    setdetails(item) {
      if (item.type === 2) {
        this.$router.push({
          path: '/curriculumlist',
          query: {
            itemlist: item.id,
            campus_id: this.campus_id
          }
        })
      } else if (item.type === 3 || item.type === 8) {
        this.$router.push({
          path: '/example/details',
          query: {
            itemlist: item.id,
            campus_id: this.campus_id
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
    },
    dakaying(item) {
      // this.$router.push({ path: '/example/DKdetails', query: { itemlist: item.id, campus_id: this.campus_id }})
      this.$router.push({
        path: 'dashboard/allDKdetails',
        query: {
          itemlist: item.id,
          campus_id: this.campus_id
        }
      })

    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/tec/index.scss";
</style>
