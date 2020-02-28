<template>
<div id="app-list" class="app-container">
  <div class="pay_all">
    <div>订单信息</div>
    <div class="pay_information">
      <div class="pay_information_lists">
        <div>商品清单</div>
        <div style="color: #333333">{{ courselist.name }}</div>
      </div>
      <div class="pay_information_list">
        <div>课程售价</div>
        <div style="color: #333333">￥{{ courselist.oldprice }}</div>
      </div>
      <div class="pay_information_list">
        <div>活动价格</div>
        <div style="color: #333333">￥
          <span v-if="courselist.is_group === 1">{{ courselist.assemble_price }}</span>
          <span v-else>{{ courselist.price }}</span>
        </div>
      </div>
      <div class="pay_information_list">
        <div>商品总额</div>
        <div style="color: #E6213A">￥
          <span v-if="courselist.is_group === 1">{{ courselist.assemble_price }}</span>
          <span v-else>{{ courselist.price }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="pay_Coupon">
    <!--      @click="inChoiceCoupon"-->
    <div style="color: #333333">使用优惠券
      <!--        是团购课-->
      <span style="margin-left: 40px;color: #999999" v-if="selelists === '' || selelists === undefined">
        <!--          // 非团购课-->
        <span v-if="selelist&&selelist !== ''">（-{{ selelist }}元)</span>
        <span v-else>
          <span v-if="courselist.coupon_num === 0">暂无可用</span>
          <span v-else @click="inChoiceCoupon" style="cursor:pointer;">（{{ courselist.coupon_num }}张可用）</span>
        </span>
      </span>
      <span style="margin-left: 40px;color: #999999;" v-else>团购价</span>
    </div>
  </div>
  <div class="pay_to">
    <div>付款方式</div>
    <el-radio-group v-model="radio1">
      <el-radio :label="1"><img src="/images/wxpay.png" alt="" style="width: 22px;height: 22px;vertical-align: middle;margin-right: 10px">微信支付</el-radio>
      <el-radio :label="2"><img src="/images/alipay.png" alt="" style="width: 22px;height: 22px;vertical-align: middle;margin-right: 10px">支付宝支付</el-radio>
    </el-radio-group>
  </div>
  <div class="pay_in">
    <div class="pay_in_list">
      <div>
        <div style="color: #E6213A">RMB
          <span style="font-size: 28px;font-weight: bold">
            <span v-if="courselist.is_group === 1">{{ courselist.assemble_price }}</span>
            <span v-else>
              <span v-if="selelist && selelist !== 0">
                {{ (courselist.price - selelist).toFixed(2) }}
              </span>
              <span v-else>
                {{ courselist.price }}
              </span>
            </span>
          </span>
        </div>
        <div style="color:#BDBDBD;font-size: 14px">订单价格合计</div>
      </div>
      <div v-if="courselist.price !== 0" class="paytoRmb" @click="nowcheck" style="cursor:pointer">立即支付</div>
      <div v-else class="paytoRmb" @click="freecheck" style="cursor:pointer">立即领取</div>
      <!--        <div @click="zanshi">我是测试失败地址用的</div>-->
    </div>
  </div>
  <!--    微信支付-->
  <div>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_lists">
      <div style="text-align: center">
        <div style="font-size: 20px;margin-bottom: 50px;margin-top: 10px">微信支付 <span style="color:#E6213A;font-size: 16px">RMB
            <span style="font-size: 28px">
              <span v-if="courselist.is_group === 1">{{ courselist.assemble_price }}</span>
              <span v-else>
                <span v-if="selelist && selelist !== 0">
                  {{(courselist.price - selelist).toFixed(2) }}
                </span>
                <span v-else>
                  {{ courselist.price }}
                </span>
              </span>
            </span>
          </span>
        </div>
        <img style="width: 213px;height: 213px;" :src="wxpay" alt="">
        <div style="background: #F1F5F8;width: 80%;border-radius: 20px;margin: 40px auto;padding: 10px 0">说明：打开手机微信钱包，点击[扫一扫]功能继续操作完成付款</div>
      </div>
    </el-dialog>
  </div>
  <!--    支付宝支付-->
  <div>
    <el-dialog :visible.sync="dialogVisibleali" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_lists">
      <div style="text-align: center">
        <div style="font-size: 20px;margin-bottom: 50px;margin-top: 10px">支付宝支付 <span style="color:#E6213A;font-size: 16px">RMB
            <span style="font-size: 28px">
              <span v-if="courselist.is_group === 1">{{ courselist.assemble_price }}</span>
              <span v-else>
                <span v-if="selelist && selelist !== 0">
                  {{(courselist.price - selelist).toFixed(2) }}
                </span>
                <span v-else>
                  {{ courselist.price }}
                </span>
              </span>
            </span>
          </span>
        </div>
        <div class="zfb-code" v-html="alipayurl"></div>
        <div style="background: #F1F5F8;width: 80%;border-radius: 20px;margin: 40px auto;padding: 10px 0">说明：打开手机支付宝，点击[扫一扫]功能继续操作完成付款</div>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import {
  orderInfo,
  info,
  createOrder,
  wxPay,
  getOrderStatus,
  aliPay,
  orderInfov2,
  createOrderv2
} from '@/api/user'
export default {
  data() {
    return {
      radio1: 1,
      dialogVisible: false,
      dialogVisibleali: false,
      veryhappyid: '',
      courselist: '',
      addresslist: '',
      didhappy: '',
      selelist: '',
      selelists: '', // 能减少的价格
      wxpay: '',
      addid: '',
      alipayurl: '',
      tuan: 0,
      quanid: 0
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
    this.veryhappyid = this.$route.query.detail
    this.didhappy = this.$route.query.happid
    this.selelists = this.$route.query.itemlists
    this.selelist = this.$route.query.itemlist
    this.tuan = this.$route.query.tuan
    this.istype = this.$route.query.istype
    this.quanid = this.$route.query.quan
    info('').then(res => {
      const timestamp = res
      const options = {
        is_group: this.tuan,
        goods_id: this.veryhappyid || this.didhappy,
        type: this.istype,
        timestamp: timestamp
      }
      orderInfov2(options).then(res => {
        if (res.code === 100) {
          this.courselist = res.data
          // this.addresslist = res.data.address
          // this.courselist = res.data.course
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
  mounted() {
    // setTimeout(() => {
    //   this.$el.getElementsByTagName('form')['alipaysubmit'].submit()
    // }, 3000)
  },
  methods: {
    ready(callback) {
      // 如果jsbridge已经注入则直接调用
      if (window.AlipayJSBridge) {
        callback && callback()
      } else {
        // 如果没有注入则监听注入的事件
        document.addEventListener('AlipayJSBridgeReady', callback, false)
      }
    },
    agreeChange(val) {
      const that = this
      that.btnstatus = (val === '1') ? '1' : '2'
    },
    closeShadow() {
      this.dialogVisible = false
      this.dialogVisibleali = false
    },
    handleClose(done) {
      done()
    },
    freecheck() {
      // 免费领取
      info('').then(res => {
        const timestamp = res
        const options = {
          type: 1,
          goods_id: this.veryhappyid,
          timestamp: timestamp
        }
        createOrderv2(options).then(res => {
          if (res.code === 100) {
            this.$alert('免费领取成功', {
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
    },
    inChoiceCoupon() {
      this.$router.push({
        path: '/example/ChoiceCoupon',
        query: {
          itemlist: this.courselist.price,
          course_id: this.courselist.id
        }
      })
    },
    // zanshi() {
    //   this.$router.push({ path: '/example/openorder' })
    // },
    nowcheck() {
      if (this.radio1 === 1) {
        this.dialogVisible = true
        // 微信支付
        info('').then(res => {
          const timestamp = res
          const options = {
            is_group: this.courselist.is_group,
            coupon_id: this.quanid,
            goods_id: this.veryhappyid || this.didhappy,
            type: this.istype,
            timestamp: timestamp
          }
          createOrderv2(options).then(res => {
            if (res.code === 100) {
              this.addid = res.data.id
              info('').then(res => {
                const timestamp = res
                const options = {
                  id: this.addid,
                  timestamp: timestamp
                }
                wxPay(options).then(res => {
                  if (res.code === 100) {
                    console.log('我是付款', res.data)
                    this.wxpay = res.data.url
                    this.openwxpay()
                  } else {
                    this.$alert(res.message, {
                      callback: action => {
                        this.$router.back(-1)
                      }
                    })
                  }
                })
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
      } else {
        // 支付宝支付
        this.dialogVisibleali = true
        info('').then(res => {
          const timestamp = res
          const options = {
            is_group: this.courselist.is_group,
            goods_id: this.veryhappyid,
            type: this.istype,
            timestamp: timestamp
          }
          createOrderv2(options).then(res => {
            if (res.code === 100) {
              this.addid = res.data.id
              info('').then(res => {
                const timestamp = res
                const options = {
                  id: this.addid,
                  type: 1,
                  timestamp: timestamp
                }
                aliPay(options).then(res => {
                  if (res.code === 100) {
                    this.alipayurl = res.data.body
                    if (this.alipayurl !== '') {
                      var ccc = '<script>document.forms[\'alipaysubmit\'].submit()'
                      var aaa = res.data.body.replace(ccc, "<iframe style='border: 1px;' name='myFrame' width='210px' height='210px'></iframe>")
                      var mmm = 'name=\'alipaysubmit\''
                      var ccg = 'name=\'alipaysubmit\' target=\'myFrame\' '
                      aaa = aaa.replace(mmm, ccg)
                      this.alipayurl = aaa
                      setTimeout(() => {
                        document.body.getElementsByTagName('form')[0].submit()
                        this.openwxpay()
                      }, 300)
                    }
                    // const div = document.createElement('div')
                    // div.innerHTML = (this.alipayurl)
                    // document.body.appendChild(div)
                    // document.forms.alipaysubmit.submit()
                  } else {
                    this.$alert(res.message, {
                      callback: action => {
                        this.$router.back(-1)
                      }
                    })
                  }
                })
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
    },
    wxpayget() {
      info('').then(res => {
        const timestamp = res
        const options = {
          id: this.addid,
          timestamp: timestamp
        }
        getOrderStatus(options).then(res => {
          if (res.code === 100) {
            if (res.data.code === 200) {
              clearInterval(this.timer)
              if (this.courselist.is_address === 0) {
                this.$router.push({
                  path: '/example/openorder',
                  query: {
                    itemlist: this.addid
                  }
                })
              } else {
                this.$router.push({
                  path: '/example/openordered'
                })
              }
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
    openwxpay() {
      this.timer = setInterval(this.wxpayget, 5000)
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/table/buycurriculum.scss";
</style>
