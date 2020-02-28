<template>
<div class="app-container">
  <div>654631365165165165</div>
  <div class="curriculum">
    <el-tabs v-model="activeName" stretch>
      <el-tab-pane label="个人资料" name="first" :key="'first'">
        <div class="tabs_list">
          <div class="tabs_list_items">
            <h2>修改资料</h2>
            <div style="float: right;margin-right: 15%">
              <img src="/images/zhanwei.png" alt="">
              <div>上传图片</div>
            </div>
            <div style="display: flex">
              <div>我的昵称</div>
              <div>
                <el-input class="width100" placeholder="姓名" />
              </div>
            </div>
            <div>我的性别
              <el-radio-group v-model="radioTreaty" @change="agreeChange">
                <el-radio-button label="1" border>男</el-radio-button>
                <el-radio-button label="2" border>女</el-radio-button>
              </el-radio-group>
            </div>
            <div>出生日期
              <el-date-picker size='small' value-format="yyyy/MM/dd" v-model="date" placeholder="请选择日期" type="date">
              </el-date-picker>
            </div>
            <div style="display: flex">
              <div>我的大学</div>
              <div>
                <el-input class="width100" placeholder="学校名称" />
              </div>
            </div>
            <!--              <div>-->
            <!--                所报岗位-->
            <!--                <el-select v-model="value" multiple placeholder="请选择" @change="currentSel">-->
            <!--                  <el-option-->
            <!--                    v-for="item in options"-->
            <!--                    :key="item.value"-->
            <!--                    :label="item.label"-->
            <!--                    :value="item.label">-->
            <!--                  </el-option>-->
            <!--                </el-select>-->
            <!--              </div>-->
            <!--              <el-button type="primary"  @click="orderSubmit" style="width: 180px;">提交订单</el-button>-->
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的课程" name="second" :key="'second'">
        <div style="width: 30%;background: #ffffff;border-radius: 10px;padding: 10px 14px" @click="classBegins">
          <h2>2020年国考全程飞鸟营鸟鸟</h2>
          <p>2019.05.20 - 2019.09.22</p>
          <div style="display: flex;justify-content: space-around;margin-bottom: 16px">
            <div>
              <img style="width: 95px;height: 121px" src="/images/laoshi1.jpg" alt="">
              <div style="width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">老师·大大大</div>
            </div>
            <div>
              <img style="width: 95px;height: 121px" src="/images/laoshi2.jpg" alt="">
              <div style="width: 95px;font-size: 12px">老师：大大大</div>
            </div>
            <div>
              <img style="width: 95px;height: 121px" src="/images/laoshi3.jpg" alt="">
              <div style="width: 95px;font-size: 12px">老师：大大大</div>
            </div>
          </div>
          <div>
            <div style="float: right;margin-right: 10px;color: #999999">未开课</div>
            <el-progress :percentage="0" text-inside :stroke-width="20"></el-progress>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的订单" name="third" :key="'third'">
        <div class="tabs_list">
          <div style="width: 100%;background: #ffffff;padding: 1%">
            <h3>2020年国考封闭特训黑鸟小班课</h3>
            <div>订单时间:2010202030</div>
            <div>订单时间:2010202030</div>
            <div style="display: flex;justify-content: space-between;border-top: 1px solid #999">
              <div>rmb 1908</div>
              <div>支付成功</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的收藏" name="fourth" :key="'fourth'">
        <div class="tabs_list">
          <div @click="upreq">点我</div>
          <div style="width: 100%;background: #ffffff;height: 770px;display: table-cell;text-align: center;align-items: center">
            <img style="margin-top: 25%" src="/images/zhanwei.png" alt="">
            <div>主人没有收到您的收藏哦！</div>
          </div>
          <!--            <div style="width: 100%;background: #ffffff;line-height: 30px">-->
          <!--              <img src="/images/zhanwei.png" alt="" style="float: left;width: 118px;height: 118px">-->
          <!--              <div>行测判断圣诞节扫地家四等奖时间</div>-->
          <!--              <div>奥斯丁撒配电间撒配电间扫地机阿斯加德拍摄角度撒娇的撒旦教赛点局</div>-->
          <!--              <div style="display: flex;justify-content: space-between">-->
          <!--                <div>点击阅读全文<span style="margin-left: 30px">申论</span></div>-->
          <!--                <div style="display: flex">-->
          <!--                  <div>3321</div>-->
          <!--                  <div>313</div>-->
          <!--                  <div>21</div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--              <div>时间OK哦SAP得空时卡顿破壳</div>-->
          <!--            </div>-->
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的地址" name="fifth" :key="'fifth'">
        <!--          <div class="tabs_list">-->
        <!--            <div style="width: 100%;height: 770px;text-align: center;background: #ffffff;">-->
        <!--              <div style="margin-top: 24%;">-->
        <!--                <img src="/images/zhanwei.png" alt="">-->
        <!--                <div>还没有地址哦！</div>-->
        <!--                <div>+ 新建收货地址</div>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <div class="tabs_list">
          <div style="width: 100%;background: #ffffff;padding: 30px">
            <div style="display: flex;justify-content: space-between">
              <div style="visibility: hidden">+ 新建收货地址</div>
              <div style="border: 1px solid #999999;border-radius: 20px;padding: 10px 20px;margin: 10px 0 40px 0">+新建收货地址</div>
            </div>
            <div style="padding: 20px;border: 1px solid #999999;line-height: 30px">
              <div>&nbsp;&nbsp;&nbsp;收货人：犀鸟姐</div>
              <div>详细地址：背景安排都按商品都将三do撒娇的跑到健身跑</div>
              <div style="display: flex;justify-content: space-between">
                <div>联系方式：1321321321321</div>
                <div style="display: flex">
                  <div>设为默认地址</div>
                  <div>编辑</div>
                  <div>删除</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的优惠券" name="sixth" :key="'sixth'">
        <div class="tabs_list">
          <div style="width: 100%;height: 770px;padding: 30px 50px;background: #ffffff;line-height: 60px">
            <div>未使用（）</div>
            <div style="width: 100%;display: flex;justify-content: space-between;flex-flow: nowrap">
              <div class="Coupon">
                <div class="Coupon-list">
                  <div>
                    <div>50元</div>
                    <div>满500可用</div>
                  </div>
                  <div>
                    <div>课程购买爱搜ID解耦</div>
                    <div>有限期至：201203202010</div>
                    <div>仅限在线支付使用</div>
                  </div>
                  <div style="margin-top: 50px;color: #ffffff;border-radius: 20px;padding: 0 14px;background: #FCC80D">未使用</div>
                </div>
              </div>
              <div class="Coupon">
                <div class="Coupon-list">
                  <div>
                    <div>50元</div>
                    <div>满500可用</div>
                  </div>
                  <div>
                    <div>课程购买爱搜ID解耦</div>
                    <div>有限期至：201203202010</div>
                    <div>仅限在线支付使用</div>
                  </div>
                  <div style="margin-top: 50px;color: #ffffff;border-radius: 20px;padding: 0 14px;background: #FCC80D">未使用</div>
                </div>
              </div>
            </div>
            <div>已使用（）</div>
            <div style="display: flex;justify-content: space-between;flex-flow: nowrap;width: 100%;">
              <div class="Coupon">
                <div class="Coupon-list">
                  <div>
                    <div>50元</div>
                    <div>满500可用</div>
                  </div>
                  <div>
                    <div>课程购买爱搜ID解耦</div>
                    <div>有限期至：201203202010</div>
                    <div>仅限在线支付使用</div>
                  </div>
                  <div style="margin-top: 50px;color: #ffffff;border-radius: 20px;padding: 0 14px;background: #FCC80D">未使用</div>
                </div>
              </div>
            </div>
            <div>已过期（）</div>
            <div style="width: 100%;display: flex;justify-content: space-between;flex-flow: nowrap">
              <div class="Coupon_lost">
                <div class="Coupon-list">
                  <div>
                    <div>50元</div>
                    <div>满500可用</div>
                  </div>
                  <div>
                    <div>课程购买爱搜ID解耦</div>
                    <div>有限期至：201203202010</div>
                    <div>仅限在线支付使用</div>
                  </div>
                  <div style="margin-top: 50px;color: #ffffff;border-radius: 20px;padding: 0 14px;background: #BABABA">未使用</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账户与安全" name="seventh" :key="'seventh'">
        <div class="tabs_list">
          <div style="width: 100%;height: 760px;background: #ffffff;">
            <div>
              <div>认证身份</div>
              <div>修改手机</div>
              <div>完成</div>
            </div>
            <div>为了确认是您本人操作请先完成身份验证</div>
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
              <img src="/images/zhanwei.png" alt="">
              <div style="color: #33CCD3">兑换成功</div>
              <div style="text-align: left">
                <div style="margin-bottom: 20px">兑换记录</div>
                <div style="border: 1px solid #999999;padding: 0 20px 20px 20px">
                  <h3>湖南第三季爱倒计时大披肩</h3>
                  <div>兑换时间：<span>2018.02.01 18:10</span></div>
                  <div style="float: right">rmb<span>1980</span></div>
                  <div>兑换码：<span>2409234921984-08</span></div>
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
// import Axios from 'axios'
export default {
  data() {
    return {
      activeName: 'seventh',
      radioTreaty: '1',
      twoactiveName: '',
      date: new Date(), // 绑定的时候 直接绑定的当前时间 就好了
      btnstatus: true,
      value: '国考',
      all: '',
      routeMycurriculumid: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  watch: {
    activeName(val) {
      if (this.activeName === 'ninth') {
        this.twoactiveName = 'third'
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
    // this.$route.query.id
    this.all = this.$route.query.Mycurriculumid
    if (this.all === 9) {
      this.activeName = 'ninth'
    } else if (this.all === 3) {
      this.activeName = 'third'
    } else if (this.all === 5) {
      this.activeName = 'fifth'
    }
  },
  methods: {
    agreeChange(val) {
      const that = this
      that.btnstatus = (val === '1') ? '1' : '2'
      // console.log(that.btnstatus)
    },
    // currentSel(selVal) {
    //   this.selVal = selVal
    //   this.dialogVisible = true
    // },
    upreq() {
      // var api = 'http://www.xiniaogongkao.com/v1/order/create'
      // Axios.get(api).then(res => {
      //   console.log(res)
      // }).catch(error => {
      //   console.log(error)
      // })
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
    classBegins() {
      this.$router.push({
        path: '/Mycurriculum/myClass'
      })
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/Mycurriculum/Idphone.scss";
</style>
