<template>
<div class="app-container">
  <div style="width: 1169px;background: #FFFFFF;margin: 1% auto;height: 800px">
    <div style="text-align: center;padding-top: 80px">
      <img src="/images/openorder.png" alt="">
      <div style="color: #33CCD3;margin: 10px 0;font-size: 18px">恭喜您报名成功</div>
      <div style="color: #999999;font-size: 12px;margin-bottom: 40px">十年航海，一日上岸</div>
    </div>
    <div style="color: #ffffff;background: #33CCD3;padding: 20px 40px;border-radius: 30px;width: 300px;margin: 60px auto;text-align: center" @click="openthisorderss">准备开始上课啦</div>
  </div>
</div>
</template>

<script>
import {
  info,
  bindAddress
} from '@/api/user'
export default {
  data() {
    return {}
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
  created() {},
  methods: {
    openthisorderss() {
      this.$router.push({
        path: '/Mycurriculum/Mycurriculum',
        query: {
          case: 'second'
        }
      })
    },
    setaddress() {
      this.dialogVisible = true
    },
    opsthis() {
      this.dialogVisible = true
      this.dialogVisibles = false
    },
    handleChange(event) {
      console.log(event) // 这里输出event为boolean类型的值
      if (event === true) {
        this.check = 2 // 是
      } else {
        this.check = 1 // 否
      }
    },
    onSelected(data) {
      this.province = data.province.value // 省
      this.city = data.city.value // 市
      this.area = data.area.value
    },
    setaddresslist(item, index) {
      this.indexitem = index
      this.id = item.id
      this.namevalue = item.name
      this.ruleForm.phone = item.phone
      this.province = item.province // 省
      this.city = item.city // 市
      this.area = item.area // 区
      this.address = item.address // 详细地址
    },
    setaddressed() {
      this.dialogVisible = false
      this.dialogVisibles = false
      this.myaddressThis = true
    },
    upaddresslist() {
      info('').then(res => {
        const timestamp = res
        const options = {
          order_id: this.ishappyid,
          address_id: this.address_id,
          timestamp: timestamp
        }
        bindAddress(options).then(res => {
          if (res.code === 100) {
            this.$alert('绑定成功', {
              callback: action => {
                this.$router.push({
                  path: '/Mycurriculum/Mycurriculum',
                  query: {
                    case: 'third'
                  }
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
@import "../../static/styles/class/openordered.scss";
</style>
