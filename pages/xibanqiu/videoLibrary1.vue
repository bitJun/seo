<template>
<div id="app_video" class="app-container">
  <div class="dashboard-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="明星打CALL" name="1st" :key="'1st'">
        <div>
          <div class="title_one_bar">
            <ul>
              <li class="head_1st">
                <img src="/images/icon/zanshi.png">
                <p>明星打CALL</p>
              </li>
              <li class="body_1st">
                <span>敢想·敢说·敢问·敢答</span>
                <div class="smline"></div>
                <div style="line-height: 30px">我们会讨论大学生活、讨论亲情友情、讨论社会热点…让大学生表达自己的观点和态度，更多元的展示自己、了解自己，希望给大学生展现积极向上、热爱生活的心态，透露遇到挫折、伤心、失败仍然面朝阳光的正能量。</div>
              </li>
              <li class="footer_1st">
                <img src="/images/gongkaojianghu.png" style="width: 156px;height: 198px">
              </li>
            </ul>
          </div>
          <div style="margin-top: 40px">
            <div v-if="MXcalllist&&MXcalllist.length > 4" class="alldisplay" style="margin-top: 40px">
              <div style="padding: 10px;display: inline-block;width: 274px;height: 206px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in MXcalllist" v-bind:key="index.url">
                <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;" @click="openvideos(items)">
                  <img style="width: 252px;height: 145px;margin-right: 20px;" :src="items.cover_img" alt="">
                  <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;width: 35px;height: 35px;left: 42%;top: 31%;z-index: 9999">
                  <p style="color: #333333;margin-top: 10px" class="over-lists">{{items.title}}</p>
                </div>
              </div>
              <div class="list" v-if="len % row > 0" v-for="item in (row - len % row)" v-bind:key="item.url"></div>
            </div>
            <div v-else class="alldisplays">
              <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" @click="openvideos(items)" style="padding: 10px;position: relative;display: inline-block;width: 274px;height: 206px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in MXcalllist" v-bind:key="index.url">
                <img style="width: 252px;height: 145px;margin-right: 20px;" :src="items.cover_img" alt="">
                <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;width: 35px;height: 35px;left: 42%;top: 31%;z-index: 9999">
                <p style="color: #333333;margin-top: 10px" class="over-lists">{{items.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公考浆糊" name="2nd" :key="'2nd'">
        <div class="title_one_bar">
          <ul>
            <li class="head_1st">
              <img src="/images/icon/zanshi.png">
              <p>公考浆糊</p>
            </li>
            <li class="body_1st">
              <span>敢想·敢说·敢问·敢答</span>
              <div class="smline"></div>
              <div style="line-height: 30px">我们会讨论大学生活、讨论亲情友情、讨论社会热点…让大学生表达自己的观点和态度，更多元的展示自己、了解自己，希望给大学生展现积极向上、热爱生活的心态，透露遇到挫折、伤心、失败仍然面朝阳光的正能量。</div>
            </li>
            <li class="footer_1st">
              <img src="/images/gongkaojianghu.png" style="width: 156px;height: 198px">
            </li>
          </ul>
        </div>
        <div class="body_2rd">
          <div>
            <div v-if="menulist&&menulist.length > 5" class="alldisplay">
              <div @click="setcartoon" style="display: inline-block;width: 201px;height: 207px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in menulist" v-bind:key="index.url">
                <div :class="{active:num==index}" style="position: relative;width: 201px">
                  <img style="width: 201px;height: 147px;" :src="items.img_url" alt="">
                  <p style="color: #333333;margin-top: 10px" class="over-listss">1文章些写作课程叫你独门法，助你上岸使点劲搜低价偶记偶记偶记偶记偶记偶记</p>
                </div>
              </div>
              <div class="list" v-if="len % rows > 0" v-for="item in (rows - len % rows)" v-bind:key="item.url"></div>
            </div>
            <div v-else class="alldisplay">
              <div :class="{active:num==index}" style="position: relative;display: inline-block;width: 201px;height: 207px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in menulist" v-bind:key="index.url">
                <img style="width: 201px;height: 147px" :src="items.img_url" alt="">
                <p style="color: #333333;margin-top: 10px" class="over-listss">文章些写作课程叫你独门法，助你上岸</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="犀鸟公考" name="3rd" :key="'3rd'">
        <div class="title_one_bar">
          <ul>
            <li class="head_1st">
              <img src="/images/icon/zanshi.png">
              <p>犀鸟公考</p>
            </li>
            <li class="body_1st">
              <span>敢想·敢说·敢问·敢答</span>
              <div class="smline"></div>
              <div style="line-height: 30px">我们会讨论大学生活、讨论亲情友情、讨论社会热点…让大学生表达自己的观点和态度，更多元的展示自己、了解自己，希望给大学生展现积极向上、热爱生活的心态，透露遇到挫折、伤心、失败仍然面朝阳光的正能量。</div>
            </li>
            <li class="footer_1st">
              <img src="/images/gongkaojianghu.png" style="width: 156px;height: 198px">
            </li>
          </ul>
        </div>
        <div class="stbody_2rd">
          <div>
            <div v-if="videolist&&videolist.length > 4" class="alldisplay">
              <div style="display: inline-block;width: 274px;height: 531px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in videolist" v-bind:key="index.url">
                <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;width: 274px;text-align: center" @click="openvideoauto(items)">
                  <img style="width: 247px;height: 436px;margin: 16px 0" :src="items.cover_img" alt="">
                  <p style="margin-top: 0;font-size: 18px;color: #2B3E50;font-weight: bold" class="over-lists">1文章些写作课程叫你独门法，助你上岸使点劲搜低价偶记偶记偶记偶记偶记偶记</p>
                  <p style="color: #999999;font-size: 14px" class="over-lists">视频的扫接口的POS阿昆达跑肯定是阿破洞裤SAP都快扫地公司肯定破上课的</p>
                </div>
              </div>
              <div class="list" v-if="len % row > 0" v-for="item in (row - len % row)" v-bind:key="item.url"></div>
            </div>
            <div v-else class="alldisplays">
              <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" @click="openvideoauto(items)" style="text-align: center;position: relative;display: inline-block;width: 274px;height: 531px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in videolist" v-bind:key="index.url">
                <img style="width: 247px;height: 436px;margin: 16px 0" :src="items.cover_img" alt="">
                <p style="margin-top: 0;font-size: 18px;color: #2B3E50;font-weight: bold" class="over-lists">1文章些写作课程叫你独门法，助你上岸使点劲搜低价偶记偶记偶记偶记偶记偶记</p>
                <p style="color: #999999;font-size: 14px" class="over-lists">视频的扫接口的POS阿昆达跑肯定是阿破洞裤SAP都快扫地公司肯定破上课的</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="学长请回答" name="4th" :key="'4th'">
        <div class="title_one_bar">
          <ul>
            <li class="head_1st">
              <img src="/images/icon/zanshi.png">
              <p>学长请回答</p>
            </li>
            <li class="body_1st">
              <span>敢想·敢说·敢问·敢答</span>
              <div class="smline"></div>
              <div style="line-height: 30px">我们会讨论大学生活、讨论亲情友情、讨论社会热点…让大学生表达自己的观点和态度，更多元的展示自己、了解自己，希望给大学生展现积极向上、热爱生活的心态，透露遇到挫折、伤心、失败仍然面朝阳光的正能量。</div>
            </li>
            <li class="footer_1st">
              <img src="/images/gongkaojianghu.png" style="width: 156px;height: 198px">
            </li>
          </ul>
        </div>
        <div class="stbody_2rd">
          <div>
            <div v-if="videolist&&videolist.length > 4" class="alldisplay">
              <div style="display: inline-block;width: 274px;height: 531px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in videolist" v-bind:key="index.url">
                <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" @click="openvideoauto(items)" style="position: relative;width: 274px;text-align: center">
                  <img style="width: 247px;height: 436px;margin: 16px 0" :src="items.cover_img" alt="">
                  <p style="margin-top: 0;font-size: 18px;color: #2B3E50;font-weight: bold" class="over-lists">1文章些写作课程叫你独门法，助你上岸使点劲搜低价偶记偶记偶记偶记偶记偶记</p>
                  <p style="color: #999999;font-size: 14px" class="over-lists">视频的扫接口的POS阿昆达跑肯定是阿破洞裤SAP都快扫地公司肯定破上课的</p>
                </div>
              </div>
              <div class="list" v-if="len % row > 0" v-for="item in (row - len % row)" v-bind:key="item.url"></div>
            </div>
            <div v-else class="alldisplays">
              <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" @click="openvideoauto(items)" style="text-align: center;position: relative;display: inline-block;width: 274px;height: 531px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in videolist" v-bind:key="index.url">
                <img style="width: 247px;height: 436px;margin: 16px 0" :src="items.cover_img" alt="">
                <p style="margin-top: 0;font-size: 18px;color: #2B3E50;font-weight: bold" class="over-lists">1文章些写作课程叫你独门法，助你上岸使点劲搜低价偶记偶记偶记偶记偶记偶记</p>
                <p style="color: #999999;font-size: 14px" class="over-lists">视频的扫接口的POS阿昆达跑肯定是阿破洞裤SAP都快扫地公司肯定破上课的</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="张发财假说" name="5th" :key="'5th'">
        <div class="title_one_bar">
          <ul>
            <li class="head_1st">
              <img src="/images/icon/zanshi.png">
              <p>张发财假说</p>
            </li>
            <li class="body_1st">
              <span>敢想·敢说·敢问·敢答</span>
              <div class="smline"></div>
              <div style="line-height: 30px">我们会讨论大学生活、讨论亲情友情、讨论社会热点…让大学生表达自己的观点和态度，更多元的展示自己、了解自己，希望给大学生展现积极向上、热爱生活的心态，透露遇到挫折、伤心、失败仍然面朝阳光的正能量。</div>
            </li>
            <li class="footer_1st">
              <img src="/images/gongkaojianghu.png" style="width: 156px;height: 198px">
            </li>
          </ul>
        </div>
        <div class="stbody_2rd">
          <div>
            <div v-if="videolist&&videolist.length > 4" class="alldisplay">
              <div style="display: inline-block;width: 274px;height: 531px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in videolist" v-bind:key="index.url">
                <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;width: 274px;text-align: center">
                  <img style="width: 247px;height: 436px;margin: 16px 0" :src="items.cover_img" alt="">
                  <p style="margin-top: 0;font-size: 18px;color: #2B3E50;font-weight: bold" class="over-lists">1文章些写作课程叫你独门法，助你上岸使点劲搜低价偶记偶记偶记偶记偶记偶记</p>
                  <p style="color: #999999;font-size: 14px" class="over-lists">视频的扫接口的POS阿昆达跑肯定是阿破洞裤SAP都快扫地公司肯定破上课的</p>
                </div>
              </div>
              <div class="list" v-if="len % row > 0" v-for="item in (row - len % row)" v-bind:key="item.url"></div>
            </div>
            <div v-else class="alldisplays">
              <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="text-align: center;position: relative;display: inline-block;width: 274px;height: 531px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in videolist" v-bind:key="index.url">
                <img style="width: 247px;height: 436px;margin: 16px 0" :src="items.cover_img" alt="">
                <p style="margin-top: 0;font-size: 18px;color: #2B3E50;font-weight: bold" class="over-lists">1文章些写作课程叫你独门法，助你上岸使点劲搜低价偶记偶记偶记偶记偶记偶记</p>
                <p style="color: #999999;font-size: 14px" class="over-lists">视频的扫接口的POS阿昆达跑肯定是阿破洞裤SAP都快扫地公司肯定破上课的</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公考郭能进" name="6th" :key="'6th'">
        <div class="title_one_bar">
          <ul>
            <li class="head_1st">
              <img src="/images/icon/zanshi.png">
              <p>公考郭能进</p>
            </li>
            <li class="body_1st">
              <span>敢想·敢说·敢问·敢答</span>
              <div class="smline"></div>
              <div style="line-height: 30px">我们会讨论大学生活、讨论亲情友情、讨论社会热点…让大学生表达自己的观点和态度，更多元的展示自己、了解自己，希望给大学生展现积极向上、热爱生活的心态，透露遇到挫折、伤心、失败仍然面朝阳光的正能量。</div>
            </li>
            <li class="footer_1st">
              <img src="/images/gongkaojianghu.png" style="width: 156px;height: 198px">
            </li>
          </ul>
        </div>
        <div class="stbody_2rd">
          <div>
            <div v-if="videolist&&videolist.length > 4" class="alldisplay">
              <div style="display: inline-block;width: 274px;height: 531px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in videolist" v-bind:key="index.url">
                <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" @click="openvideoauto(items)" style="position: relative;width: 274px;text-align: center">
                  <img style="width: 247px;height: 436px;margin: 16px 0" :src="items.cover_img" alt="">
                  <p style="margin-top: 0;font-size: 18px;color: #2B3E50;font-weight: bold" class="over-lists">1文章些写作课程叫你独门法，助你上岸使点劲搜低价偶记偶记偶记偶记偶记偶记</p>
                  <p style="color: #999999;font-size: 14px" class="over-lists">视频的扫接口的POS阿昆达跑肯定是阿破洞裤SAP都快扫地公司肯定破上课的</p>
                </div>
              </div>
              <div class="list" v-if="len % row > 0" v-for="item in (row - len % row)" v-bind:key="item.url"></div>
            </div>
            <div v-else class="alldisplays">
              <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" @click="openvideoauto(items)" style="text-align: center;position: relative;display: inline-block;width: 274px;height: 531px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in videolist" v-bind:key="index.url">
                <img style="width: 247px;height: 436px;margin: 16px 0" :src="items.cover_img" alt="">
                <p style="margin-top: 0;font-size: 18px;color: #2B3E50;font-weight: bold" class="over-lists">1文章些写作课程叫你独门法，助你上岸使点劲搜低价偶记偶记偶记偶记偶记偶记</p>
                <p style="color: #999999;font-size: 14px" class="over-lists">视频的扫接口的POS阿昆达跑肯定是阿破洞裤SAP都快扫地公司肯定破上课的</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div id="indexid">
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_list">
      <video controls="controls" :src="MXcallzz.video" style="position: absolute;top: 75px;left: 4px;margin: 0 20px;width: 95%;border-radius: 20px;border: 5px solid #333333;outline: none"></video>
      <img src="/images/xibanqiu-left.png" style="height: auto;width: 100%;">
    </el-dialog>
  </div>
  <div>
    <el-dialog :visible.sync="dialogVisibleshu" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_list1">
      <!-- <div style="position: absolute;left: 20px;top: 15px;font-size: 12px"><img src="/images/icon/riqi.png" style="width: 12px;height: 12px;vertical-align: middle;margin-right: 6px;margin-bottom: 4px">2019.01.01 <span>来源：国家公务员局</span></div> -->
      <video controls="controls" style="height: 700px;max-width: 400px;border-radius: 20px;border: 4px solid #333333" width="100%" height="auto" :src="MXcallzz.video"></video>
    </el-dialog>
  </div>
</div>
</template>

<script>
import {
  info,
  article,
  notes
} from '@/api/user'
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisibleshu: false,
      activeName: '1st',
      menulist: '',
      videolist: '',
      len: '',
      row: 4,
      rows: 5,
      index: null,
      num: null,
      MXcalllist: '',
      MXcallzz: '',
      caseindex: ''
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
    this.caseindex = this.$route.query.item
    if (this.caseindex && this.caseindex === '2nd') {
      this.activeName = '2nd'
    }
    this.newDay1()
  },
  methods: {
    newDay1() {
      info('').then(res => {
        const timestamp = res
        const options = {
          pagesize: 9,
          type: 1,
          get_plate: 1,
          timestamp: timestamp
        }
        article(options).then(res => {
          if (res.code === 100) {
            this.menulist = res.data.data
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
      // 明星打call
      info('').then(res => {
        const timestamp = res
        const options = {
          get_column: 0,
          pagesize: 8,
          column_id: 2,
          timestamp: timestamp
        }
        notes(options).then(res => {
          if (res.code === 100) {
            this.MXcalllist = res.data.data
            this.len = this.MXcalllist.length
          } else {
            this.$alert(res.message, {
              callback: action => {
                this.$router.back(-1)
              }
            })
          }
        })
      })
      // 学长请回答
      info('').then(res => {
        const timestamp = res
        const options = {
          get_column: 0,
          pagesize: 8,
          column_id: 4,
          timestamp: timestamp
        }
        notes(options).then(res => {
          if (res.code === 100) {
            this.videolist = res.data.data
            this.len = this.videolist.length
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
    setcartoon() {
      this.$router.push({
        path: '/xibanqiu/Cartoon'
      })
    },
    handleClose(done) {
      this.MXcallzz = ''
      done()
    },
    openvideos(items) {
      this.dialogVisible = true
      this.MXcallzz = items
    },
    openvideoauto(items) {
      this.dialogVisibleshu = true
      this.MXcallzz = items
    },
    handleClick(tab, event) {
      console.log('1212', tab.name)
    }
  }
}
</script>

<style lang="scss">
@import "../../static/styles/xibanqiu/videoLibrary1.scss";
</style>
