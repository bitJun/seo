<template>
<div id="mycoupon" class="app-container">
  <div style="width: 1169px;background: #ffffff;margin: 1% auto;">
    <div style="color: #2B3E50;padding: 40px 40px 0;font-size: 18px">选择优惠券</div>
    <div class="tabs_list" style="width: 100%">
      <div v-if="mycoupinimg.length" style="margin-left: 40px;margin-top: 20px;color: #333333">可用( {{mycoupinimg.length}} )</div>
      <div v-if="mycoupinimg.length" style="width: 100%;background: #ffffff;color: #ffffff;padding: 20px 40px;display: flex;justify-content: space-between;flex-wrap: wrap;">
        <div class="Coupona" v-for="(item,index) in mycoupinimg" v-bind:key="index.url" @click="thisself(item)" style="cursor:pointer">
          <div class="Coupon-list">
            <div style="margin-top: 15px">
              <div><span style="font-size: 44px">{{ item.deduct_amount }}</span>元</div>
              <div style="font-size: 12px">满{{ item.goal_amount }}可用</div>
            </div>
            <div style="line-height: 23px">
              <div style="font-size: 18px;font-weight: bold">{{ item.name }}</div>
              <div style="font-size: 12px;opacity: .5">有限期至：{{ item.end_time }}</div>
              <div style="font-size: 12px;opacity: .5">仅限在线支付使用</div>
            </div>
            <div style="margin-top: 50px;color: #33CCD3;border-radius: 20px;padding: 0 14px;background: #ffffff">{{ item.status }}</div>
          </div>
        </div>
      </div>
      <div class="tabs_list" style="width: 100%">
        <div v-if="mycoupin.length" style="margin-left: 40px;margin-top: 20px;color: #333333">不可用( {{mycoupin.length}} )</div>
        <div v-if="mycoupin.length" style="width: 100%;background: #ffffff;color: #ffffff;padding: 20px 40px;display: flex;justify-content: space-between;flex-wrap: wrap;padding-bottom: 200px">
          <div class="Couponab" v-for="(item,index) in mycoupin" v-bind:key="index.url">
            <div class="Coupon-list">
              <div style="margin-top: 15px">
                <div><span style="font-size: 44px">{{ item.deduct_amount }}</span>元</div>
                <div style="font-size: 12px">满{{ item.goal_amount }}可用</div>
              </div>
              <div style="line-height: 23px">
                <div style="font-size: 18px;font-weight: bold">{{ item.name }}</div>
                <div style="font-size: 12px;opacity: .5">有限期至：{{ item.end_time }}</div>
                <div style="font-size: 12px;opacity: .5">仅限在线支付使用</div>
              </div>
              <div style="margin-top: 50px;color: #33CCD3;border-radius: 20px;padding: 0 14px;background: #ffffff">{{ item.status }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  info,
  orderCoupon,
  orderCouponv2
} from '@/api/user'
export default {
  name: 'ChoiceCoupon',
  data() {
    return {
      mycoupin: [],
      ishappy: '',
      mycoupinimg: [],
      happid: ''
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
    this.ishappy = this.$route.query.itemlist
    this.happid = this.$route.query.course_id
    console.log('seesee', this.$route.query.itemlist)
    info('').then(res => {
      const timestamp = res
      const options = {
        amount: this.ishappy,
        timestamp: timestamp
      }
      orderCouponv2(options).then(res => {
        if (res.code === 100) {
          // 不可用
          this.mycoupin = res.data.cannot_use
          // 可用
          this.mycoupinimg = res.data.can_use
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
    thisself(item) {
      this.$router.push({
        path: '/class/buycurriculum',
        query: {
          itemlist: item.deduct_amount,
          happid: this.happid,
          quan: item.id
        }
      })
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/class/ChoiceCoupon.scss";
</style>
