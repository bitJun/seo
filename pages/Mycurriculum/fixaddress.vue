<template>
<div id="indd1" class="app-container">
  <div class="curriculum">
    <el-tabs v-model="activeName" stretch @tab-click="handleClick">
      <el-tab-pane label="个人资料" name="first" :key="'first'">
        <div class="tabs_list">
          <div class="tabs_list_items" style="height: 600px">
            <h2>修改资料</h2>
            <div style="float: right;margin-right: 15%">
              <img :src="myIdcall.avatar_url" style="width: 190px;height: 190px">
              <div style="text-align: center;border: 1px solid #999999;width: 140px;height: 30px;line-height: 30px;border-radius: 10px;margin: 0 auto">上传图片</div>
            </div>
            <div style="display: flex">
              <div class="marginleft">我的昵称</div>
              <div>
                <el-input class="width100" placeholder="姓名" v-model="myIdcall.nickname" />
              </div>
            </div>
            <div><span class="marginleft">我的性别</span>
              <el-radio-group v-model="radioTreaty" @change="agreeChange">
                <el-radio-button label="1" border>男</el-radio-button>
                <el-radio-button label="2" border>女</el-radio-button>
              </el-radio-group>
            </div>
            <div><span class="marginleft">出生日期</span>
              <el-date-picker size='small' value-format="yyyy/MM/dd" v-model="date" placeholder="请选择日期" type="date">
              </el-date-picker>
            </div>
            <div style="display: flex">
              <div class="marginleft">我的大学</div>
              <div>
                <el-input class="width100" placeholder="学校名称" v-model="myIdcall.school_name" />
              </div>
            </div>
            <div style="width: 100%;text-align: center">
              <el-button type="primary" style="width: 180px;margin-top: 5%" @click="setIdcall">确认修改</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的课程" name="second" :key="'second'">
        <div style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: space-between">
          <div style="width: 32%;background: #ffffff;border-radius: 10px;padding: 10px 14px;display: inline-block;margin-bottom: 20px" @click="classBegins(item)" v-for="(item,index) in courselist" v-bind:key="index.url">
            <h2>{{ item.coursename }}</h2>
            <p>{{ item.status_name }} - {{ item.end_time }}</p>
            <div style="display: flex;margin-bottom: 16px">
              <el-scrollbar style="height: 100%;margin-bottom: 20px;">
                <div style="display: inline-block;" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
                  <div>
                    <img style="width: 95px;height: 121px" :src="itemlist.photo_url">
                    <div style="width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">老师：{{ itemlist.teacher_name }}</div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
            <div>
              <div style="float: right;margin-right: 10px;color: #999999">{{ item.status_name }}</div>
              <el-progress :percentage="item.plan" text-inside :stroke-width="20"></el-progress>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的订单" name="third" :key="'third'">
        <div class="tabs_list">
          <div style="width: 100%;padding: 1%">
            <div style="margin-bottom: 10px;background: #ffffff;padding: 20px;border-radius: 10px" v-for="(item,index) in infolist" v-bind:key="index.url">
              <div style="font-size: 18px;font-weight: bold;margin: 14px 0">{{ item.coursename }}</div>
              <div style="color: #999999;margin-bottom: 10px">订单时间:{{ item.order_time }}</div>
              <div style="margin-bottom: 10px;color: #999999">订单编号:{{ item.order_id }}</div>
              <div style="display: flex;justify-content: space-between;border-top: 1px solid #999;padding-top: 16px">
                <div>RMB <span style="font-size: 22px;">{{ item.price }}</span></div>
                <div><span style="margin-right: 50px;color: #FCC80D" v-if="item.is_address === 0"><img src="/images/icon/tanhao.png" style="vertical-align: middle;margin-right: 10px;">未完善资料</span>{{ item.status }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的收藏" name="fourth" :key="'fourth'">
        <div class="tabs_list">
          <div v-if="infolist.length === 0" style="width: 100%;background: #ffffff;height: 770px;display: table-cell;text-align: center;align-items: center">
            <img style="margin-top: 25%" src="/images/zhanwei.png" alt="">
            <div>主人没有收到您的收藏哦！</div>
          </div>
          <div style="padding-bottom: 200px;background: #ffffff;width: 100%">
            <div v-for="(item,index) in infolist" v-bind:key="index.url" style="width: 100%;background: #ffffff;line-height: 30px;padding: 20px;border-radius: 10px" @click="setdetail(item)">
              <img :src="item.img_url" alt="" style="float: left;width: 118px;height: 118px;margin-right: 20px">
              <div style="font-weight: bold;font-size: 18px">{{ item.title }}</div>
              <div v-html="item.content" class="over-list"></div>
              <div style="display: flex;justify-content: space-between;color: #849191;padding-right: 50px">
                <div>点击阅读全文<span style="margin-left: 30px">申论</span></div>
                <div style="display: flex;justify-content: space-between;width: 140px; color: #849191;">
                  <div><img src="/images/icon/kan.png" alt="" style="margin-right: 10px;vertical-align: middle">{{ item.view_num }}</div>
                  <div><img @click="disCollection(item)" src="/images/icon/shoucang1.png" alt=""></div>
                  <div><img src="/images/icon/pinglun.png" alt="" style="margin-right: 10px;vertical-align: middle">{{ item.comment_num }}</div>
                </div>
              </div>
              <div style="color: #849191">时间{{ item.regdate }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的地址" name="fifth" :key="'fifth'">
        <div class="tabs_list">
          <div style="width: 100%;background: #ffffff;padding: 50px 30px">
            <ul style="list-style: none;line-height: 70px" class="addresslist">
              <li>
                <span style="color: #666666">&nbsp;&nbsp;&nbsp;收件人</span>
                <input type="text" v-model="namevalue" style="width: 80%;border: 1px solid #DCDFE6;height: 40px;padding: 0 15px;font-size: 14px" placeholder="请输入姓名">
              </li>
              <li>
                <span style="color: #666666">手机号码</span>
                <el-input v-model.number="ruleForm.phone" style="width: 80%;" placeholder="请输入手机号" οnfοcus="this.style.color='#999999'" />
              </li>
              <li style="display: flex;">
                <span style="margin-right: 4px;color: #666666">省市地区</span>
                <v-distpicker :placeholders="placeholders" @selected="onSelected"></v-distpicker>
              </li>
              <li>
                <span style="color: #666666">详细地址</span>
                <input type="text" style="width: 80%;height: 40px;border: 1px solid #DCDFE6;padding: 0 15px;font-size: 14px" placeholder="请输入详细地址">
              </li>
              <li style="display: flex;justify-content: space-between;margin-top: 50px">
                <el-checkbox @change="handleChange" v-model="checkcall">设为默认地址</el-checkbox>
                <div style="display: flex;margin-right: 40px">
                  <div style="cursor:pointer;line-height: 50px;border: 1px solid #33CCD3;color: #33CCD3;width: 172px;height: 49px;text-align: center;border-radius: 25px;margin-right: 20px" @click="opsthis">取消</div>
                  <div style="cursor:pointer;line-height: 50px;background-color: #33CCD3;color: #ffffff;width: 172px;height: 49px;text-align: center;border-radius: 25px" @click="updatathis">保存</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的优惠券" name="sixth" :key="'sixth'">
        <div class="tabs_list" style="width: 100%;display: flex;justify-content: center">
          <el-tabs v-model="paperactiveName" stretch style="width: 100%;padding: 0" @tab-click="cookbook">
            <el-tab-pane label="未使用" name="nopaper" :key="'nopaper'">
              <div class="tabs_list" style="width: 100%;">
                <div style="width: 100%;background: #ffffff;color: #ffffff;padding: 40px;display: flex;justify-content: space-between;flex-wrap: wrap;padding-bottom: 200px">
                  <div class="Coupona" v-for="(item,index) in infolist" v-bind:key="index.url">
                    <div class="Coupon-list">
                      <div style="margin-top: 15px">
                        <div><span style="font-size: 44px">{{ item.deduct_amount }}</span>元</div>
                        <div style="font-size: 12px">满{{ item.goal_amount }}可用</div>
                      </div>
                      <div>
                        <div style="font-size: 18px">{{ item.name }}</div>
                        <div style="font-size: 12px">有限期至：{{ item.end_time }}</div>
                        <div style="font-size: 12px">仅限在线支付使用</div>
                      </div>
                      <div style="margin-top: 50px;color: #33CCD3;border-radius: 20px;padding: 0 14px;background: #ffffff">{{ item.status }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="使用记录" name="inpaper" :key="'inpaper'">
              <div class="tabs_list" style="width: 100%">
                <div style="width: 100%;background: #ffffff;color: #ffffff;padding: 40px;display: flex;justify-content: space-between;flex-wrap: wrap;padding-bottom: 200px">
                  <div class="Couponb" v-for="(item,index) in infolist" v-bind:key="index.url">
                    <div class="Coupon-list">
                      <div style="margin-top: 15px">
                        <div><span style="font-size: 44px">{{ item.deduct_amount }}</span>元</div>
                        <div style="font-size: 12px">满{{ item.goal_amount }}可用</div>
                      </div>
                      <div>
                        <div style="font-size: 18px">{{ item.name }}</div>
                        <div style="font-size: 12px">有限期至：{{ item.end_time }}</div>
                        <div style="font-size: 12px">仅限在线支付使用</div>
                      </div>
                      <div style="margin-top: 50px;color: #33CCD3;border-radius: 20px;padding: 0 14px;background: #ffffff">{{ item.status }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已过期" name="diepaper" :key="'diepaper'">
              <div class="tabs_list" style="width: 100%">
                <div style="width: 100%;background: #ffffff;color: #ffffff;padding: 40px;display: flex;justify-content: space-between;flex-wrap: wrap;padding-bottom: 200px">
                  <div class="Couponc" v-for="(item,index) in infolist" v-bind:key="index.url">
                    <div class="Coupon-list">
                      <div style="margin-top: 15px">
                        <div><span style="font-size: 44px">{{ item.deduct_amount }}</span>元</div>
                        <div style="font-size: 12px">满{{ item.goal_amount }}可用</div>
                      </div>
                      <div>
                        <div style="font-size: 18px">{{ item.name }}</div>
                        <div style="font-size: 12px">有限期至：{{ item.end_time }}</div>
                        <div style="font-size: 12px">仅限在线支付使用</div>
                      </div>
                      <div style="margin-top: 50px;color: #33CCD3;border-radius: 20px;padding: 0 14px;background: #ffffff">{{ item.status }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账户与安全" name="seventh" :key="'seventh'">
        <div class="tabs_list">
          <div style="width: 100%;height: 200px;background: #ffffff;padding: 54px 77px;line-height: 50px">
            <div>实名认证 <span style="margin-left: 80px;cursor:pointer;" @click="caseIdphone">未认证</span></div>
            <div>绑定手机号 <span style="margin-left: 65px">1135135131</span><span style="margin-left: 20px;cursor:pointer;" @click="Idphone">修改</span></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的兑换" name="eighth" :key="'eighth'">
        <div class="tabs_list">
          <div style="background: #ffffff;width: 100%;height: 770px;text-align: center;padding-top: 44px">
            <el-input class="width100" placeholder="请输入您的课程兑换码" style="width: 510px;height: 50px" />
            <div>帮助说明：使用正确的犀鸟官方发布的兑换码可兑换相应的犀鸟产品。</div>
            <div style="border-radius: 20px;background: #CFCFCF;width: 254px;height: 48px;margin: 60px auto;line-height: 48px;color: #ffffff">兑换</div>
            <div style="padding: 50px">
              <div>
                <img src="/images/zhanwei.png" alt="">
                <div style="color: #33CCD3">兑换成功</div>
              </div>
              <div style="text-align: left">
                <div style="margin-bottom: 20px">兑换记录</div>
                <div style="border: 1px solid #999999;padding: 0 20px 20px 20px;margin-bottom: 20px" v-for="(item,index) in infolist" v-bind:key="index.url">
                  <h3>{{ item.name }}</h3>
                  <div>兑换时间：<span>{{ item.usetime }}</span></div>
                  <div style="float: right">rmb<span>{{ item.price }}</span></div>
                  <div>兑换码：<span>{{ item.cdkey }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消息中心" name="ninth" :key="'ninth'">
        <div class="tabs_list" style="width: 100%;display: flex;justify-content: center;background: #ffffff">
          <div style="display: block">
            <el-tabs v-model="twoactiveName" stretch>
              <el-tab-pane label="系统" name="first" :key="'first'">
                <div>
                  <img src="/images/zhanwei.png" alt="" style="width: 40px;height: 40px">
                  <div></div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="课程" name="second" :key="'second'">
                <div>234234</div>
              </el-tab-pane>
              <el-tab-pane label="订单" name="third" :key="'third'">
                <div>56564</div>
              </el-tab-pane>
            </el-tabs>
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
  mycourse,
  personal,
  myorder,
  mycollect,
  myaddress,
  mycoupon,
  myexchange,
  mymessage,
  editPersonal,
  addCollect,
  editAddress
} from '@/api/user'
import VDistpicker from 'v-distpicker'
export default {
  name: 'Mycurriculum',
  components: {
    VDistpicker
  },
  data() {
    return {
      activeName: 'fifth',
      paperactiveName: '',
      radioTreaty: '',
      twoactiveName: '',
      courselist: '',
      myIdcall: '',
      teacher: '',
      infolist: '',
      date: new Date(), // 绑定的时候 直接绑定的当前时间 就好了
      btnstatus: true,
      value: '国考',
      all: '',
      routeMycurriculumid: '',
      ismyaddress: '',
      typecall: '', // 存优惠券状态，
      ruleForm: {
        phone: ''
      },
      placeholders: {
        province: '------- 省 --------',
        city: '--- 市 ---',
        area: '--- 区 ---',
      },
      namevalue: '',
      detailaddress: '',
      check: 1,
      province: '', // 省
      city: '', // 市
      area: '', // 区,
      is_check: '',
      setaddressall: [],
      loop: '',
      checkcall: false
    }
  },
  watch: {
    activeName(val) {
      if (this.activeName === 'ninth') {
        this.twoactiveName = 'third'
      } else if (this.activeName === 'sixth') {
        this.paperactiveName = 'nopaper'
      }
    },
    $route: 'routerlist'
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
    // this.$route.query
    console.log('asdasd', this.$route.query)
    this.placeholders.province = this.$route.query.province
    this.placeholders.city = this.$route.query.city
    this.placeholders.area = this.$route.query.area
    this.namevalue = this.$route.query.name
    this.detailaddress = this.$route.query.address
    this.id = this.$route.query.id
    this.check = this.$route.query.is_check // 是否為默認地址
    this.ruleForm.phone = this.$route.query.phone
    this.user_id = this.$route.query.user_id
    if (this.check === '2') {
      this.checkcall = true
    } else {
      this.checkcall = false
    }
    // info('').then(res => {
    //   const timestamp = res
    //   const options = { page: 1, pagesize: 10, timestamp: timestamp }
    //   editAddress(options).then(res => {
    //     if (res.code === 100) {
    //       this.courselist = res.data.data
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
  methods: {
    agreeChange(val) {
      const that = this
      that.btnstatus = (val === '1') ? '1' : '2'
    },
    routerlist() {
      if (this.$route.query.Mycurriculumid === 9) {
        this.activeName = 'ninth'
      } else if (this.$route.query.Mycurriculumid === 3) {
        this.activeName = 'third'
      } else if (this.$route.query.Mycurriculumid === 5) {
        this.activeName = 'fifth'
      }
    },
    classBegins(item) {
      this.$router.push({
        path: '/Mycurriculum/myClass',
        query: {
          form: item
        }
      })
    },
    caseIdphone() {
      this.$router.push({
        path: '/Mycurriculum/caseIdphone'
      })
    },
    Idphone() {
      this.$router.push({
        path: '/Mycurriculum/Idphone'
      })
    },
    setaddress() {
      // new新增收货地址
    },
    handleClick(tab, event) {
      this.$router.push({
        path: '/Mycurriculum/Mycurriculum',
        query: {
          case: tab.name
        }
      })
    },
    setIdcall() {
      // 提交按钮
      info('').then(res => {
        const timestamp = res
        const options = {
          nickname: this.myIdcall.nickname,
          sex: this.radioTreaty,
          birthday: this.date,
          school_name: this.myIdcall.school_name,
          timestamp: timestamp
        }
        editPersonal(options).then(res => {
          if (res.code === 100) {
            this.$alert('更新成功')
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
    cookbook(tabs) {
      console.log('9999', tabs.name)
      if (tabs.name === 'inpaper') {
        this.typecall = 2
      } else if (tabs.name === 'diepaper') {
        this.typecall = 3
      } else {
        this.typecall = 1
      }
      info('').then(res => {
        const timestamp = res
        const options = {
          type: this.typecall,
          timestamp: timestamp
        }
        mycoupon(options).then(res => {
          if (res.code === 100) {
            this.infolist = res.data.data
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
    disCollection(item) {
      console.log('(()(&', item.id)
      info('').then(res => {
        const timestamp = res
        const options = {
          article_id: item.id,
          type: 1,
          timestamp: timestamp
        }
        addCollect(options).then(res => {
          if (res.code === 100) {
            this.shoucang = null
            this.$alert('取消成功')
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
    setdetail(item) {
      this.$router.push({
        path: '/ziliao/menulist',
        query: {
          detail: item
        }
      })
    },
    onSelected(data) {
      this.province = data.province.value // 省
      this.city = data.city.value // 市
      this.area = data.area.value
    },
    handleChange(event) {
      console.log(event) // 这里输出event为boolean类型的值
      this.loop = event
      if (event === true) {
        this.check = 2 // 是
      } else {
        this.check = 1 // 否
      }
    },
    opsthis() {
      this.$router.push({
        path: '/Mycurriculum/Mycurriculum'
      })
    },
    updatathis() {
      // 上传地址
      info('').then(res => {
        const timestamp = res
        const options = {
          name: this.namevalue,
          phone: this.ruleForm.phone,
          province: this.province || this.placeholders.province, // 省
          city: this.city || this.placeholders.city, // 市
          area: this.area || this.placeholders.area, // 区
          address: this.detailaddress, // 详细地址
          is_check: this.check, // 默认地址 1为否 2为是
          address_id: this.id,
          timestamp: timestamp
        }
        editAddress(options).then(res => {
          if (res.code === 100) {
            this.$alert('修改成功', {
              callback: action => {
                this.$router.push({
                  path: '/Mycurriculum/Mycurriculum'
                })
              }
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
@import "../../static/styles/Mycurriculum/fixaddress.scss";
</style>
