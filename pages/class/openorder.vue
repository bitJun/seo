<template>
<div class="app-container">
  <div style="width: 1169px;background: #FFFFFF;margin: 1% auto;height: 800px">
    <div style="text-align: center;padding-top: 80px">
      <img src="/images/openorder.png" alt="">
      <div style="color: #33CCD3;margin: 10px 0;font-size: 18px">恭喜您报名成功</div>
      <div style="color: #999999;font-size: 12px;margin-bottom: 40px">十年航海，一日上岸</div>
    </div>
    <div style="background: #F1F5F8;width: 794px;height: 383px;margin: 10px auto">
      <div style="text-align: center;margin: 40px auto;padding-top: 50px">
        <div style="color: #484D62;font-size: 20px">本课程将寄送资料</div>
        <div style="color: #999999;margin-top: 6px" v-if="myaddressThis === false">您还没有添加地址</div>
        <div style="color: #999999;margin-top: 6px" v-else>请核对收货地址是否正确</div>
      </div>
      <div v-if="myaddressThis === false" style="text-align: center;padding-top: 20px">
        <div style="color: #999999;font-size: 14px">完善地址，才能享受资料寄送服务</div>
        <div style="color: #33CCD3;margin-top: 6px;font-size: 14px">添加地址：个人中心>>我的地址</div>
      </div>
      <div v-else style="border: 1px solid #dedede;margin: 0 140px;padding: 30px">
        <div style="color: #666666">&nbsp;&nbsp;&nbsp;收货人：<span style="color: #3E3A39">{{ namevalue }}</span></div>
        <div style="color: #666666">详细地址：<span style="color: #3E3A39">{{ province }}{{ city }}{{ area }}{{ address }}</span></div>
        <div style="display: flex;justify-content: space-between">
          <div style="color: #666666">联系方式：<span style="color: #3E3A39">{{ ruleForm.phone }}</span></div>
        </div>
      </div>
      <div v-if="myaddressThis === false">
        <div style="display: flex;justify-content: space-around;margin-top: 50px">
          <div @click="openthisorderss" style="cursor:pointer;color: #33CCD3;border: 1px solid #33CCD3;border-radius: 20px;width: 125px;height: 40px;text-align: center;line-height: 40px">
            <img src="/images/openorder1.png" alt="" style="width: 13px;height: 13px">
            不要资料
          </div>
          <div @click="setaddress" style="cursor:pointer;background: #33CCD3;color: #FFFFFF;border: 1px solid #33CCD3;border-radius: 20px;width: 125px;height: 40px;text-align: center;line-height: 40px">
            <img src="/images/openorder2.png" alt="" style="width: 13px;height: 13px">
            去完善
          </div>
        </div>
      </div>
      <div v-else>
        <div style="display: flex;justify-content: space-around;margin-top: 50px">
          <div @click="setaddress" style="cursor:pointer;color: #33CCD3;border: 1px solid #33CCD3;border-radius: 20px;width: 125px;height: 40px;text-align: center;line-height: 40px">
            修改默认地址
          </div>
          <div @click="upaddresslist" style="cursor:pointer;background: #33CCD3;color: #FFFFFF;border: 1px solid #33CCD3;border-radius: 20px;width: 125px;height: 40px;text-align: center;line-height: 40px">
            确定
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_lists">
        <div style="height:525px;">
          <el-scrollbar style="height:100%">
            <div style="line-height: 30px">
              <div style="display: flex;align-items: center">
                <div style="width: 4px;height: 17px;background: #dedede;margin-right: 10px"></div>
                <div>选择或新增您的地址</div>
              </div>
              <div style="display: flex;justify-content: space-between" v-if="ismyaddress.length !== 0">
                <div style="visibility: hidden">我是占位</div>
                <div style="border-radius: 30px;padding: 10px 20px;margin: 10px 0 40px 0;background: #33CCD3;color: #ffffff;cursor:pointer;margin-right: 20px" @click="newadd">+ 新建收货地址</div>
              </div>
              <div v-if="ismyaddress.length === 0" class="tabs_list">
                <div style="text-align: center;background: #ffffff;">
                  <div style="margin-top: 2%;">
                    <img src="/images/none.png" alt="">
                    <div style="color:#A8A8A8;margin-top: 20px">还没有地址哦！</div>
                    <div style="background: #33CCD3;color: #ffffff;width: 200px;margin: 3% auto;padding: 10px 30px;border-radius: 20px;cursor:pointer" @click="newadd">+ 新建收货地址</div>
                  </div>
                </div>
              </div>
              <div v-else style="padding: 20px;line-height: 30px">
                <div v-for="(item,index) in ismyaddress" v-bind:key="index.url" class="hoverisname" v-bind:class="{ hoverisnameed: index == indexitem }" v-on:click="setaddresslist(item,index)">
                  <div v-if="item.is_check === 1" style="position: relative;border-radius: 10px;padding: 20px 30px;">
                    <div style="color: #666666">&nbsp;&nbsp;&nbsp;收货人：<span style="color: #3E3A39">{{ item.name }}</span></div>
                    <div style="color: #666666">详细地址：<span style="color: #3E3A39">{{ item.province }}{{ item.city }}{{ item.area }}{{ item.address }}</span></div>
                    <div style="display: flex;justify-content: space-between">
                      <div style="color: #666666">联系方式：<span style="color: #3E3A39">{{ item.phone }}</span></div>
                    </div>
                    <div style="color: #999999;width: 100px;height: 40px;text-align: center;border-radius: 20px;line-height: 40px;position: absolute;right: 50px;top: 25px" v-if="item.is_check === 2">默认地址</div>
                  </div>
                  <div v-else style="background: #F0F6FB;position: relative;border-radius: 10px;padding: 20px 30px;">
                    <div style="color: #666666">&nbsp;&nbsp;&nbsp;收货人：<span style="color: #3E3A39">{{ item.name }}</span></div>
                    <div style="color: #666666">详细地址：<span style="color: #3E3A39">{{ item.province }}{{ item.city }}{{ item.area }}{{ item.address }}</span></div>
                    <div style="display: flex;justify-content: space-between">
                      <div style="color: #666666">联系方式：<span style="color: #3E3A39">{{ item.phone }}</span></div>
                    </div>
                    <div style="color: #999999;width: 100px;height: 40px;text-align: center;border-radius: 20px;line-height: 40px;position: absolute;right: 50px;top: 25px" v-if="item.is_check === 2">默认地址</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="width: 100%;height: 60px">
              <div style="display: flex;justify-content: space-around;margin-top: 50px;position: absolute;bottom: 0;background: #ffffff;width: 100%">
                <div @click="openthisorders" style="cursor:pointer;color: #33CCD3;border: 1px solid #33CCD3;border-radius: 20px;width: 125px;height: 40px;text-align: center;line-height: 40px">
                  取消
                </div>
                <div @click="setaddressed" style="cursor:pointer;background: #33CCD3;color: #FFFFFF;border: 1px solid #33CCD3;border-radius: 20px;width: 125px;height: 40px;text-align: center;line-height: 40px">
                  确定
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog :visible.sync="dialogVisibles" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_listss">
        <div style="height:525px">
          <div style="background: #ffffff;padding: 50px 30px">
            <ul style="list-style: none;line-height: 70px" class="addresslist">
              <li>
                <span style="color: #666666">&nbsp;&nbsp;&nbsp;收件人</span>
                <input type="text" v-model="namevalue" style="width: 80%;border: 1px solid #DCDFE6;height: 40px;padding: 0 15px;font-size: 14px" placeholder="请输入姓名">
              </li>
              <li>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" style="width: 100%">
                  <el-form-item prop="phone">
                    <span style="color: #666666">手机号码</span>
                    <el-input v-model.number="ruleForm.phone" style="width: 80%;font-size: 14px" placeholder="请输入手机号" οnfοcus="this.style.color='#999999'" />
                  </el-form-item>
                </el-form>
              </li>
              <li style="display: flex;">
                <span style="margin-right: 4px;color: #666666">省市地区</span>
                <v-distpicker :placeholders="placeholders" @selected="onSelected"></v-distpicker>
              </li>
              <li>
                <span style="color:#666666;">详细地址</span>
                <input type="text" style="width: 80%;height: 40px;border: 1px solid #DCDFE6;padding: 0 15px;font-size: 14px" v-model="detailaddress" placeholder="请输入详细地址">
              </li>
              <li style="display: flex;justify-content: space-between;margin-top: 50px">
                <el-checkbox @change="handleChange">设为默认地址</el-checkbox>
                <div style="display: flex;margin-right: 40px">
                  <div style="cursor:pointer;line-height: 50px;border: 1px solid #33CCD3;color: #33CCD3;width: 172px;height: 49px;text-align: center;border-radius: 25px;margin-right: 20px" @click="opsthis">取消</div>
                  <div style="cursor:pointer;line-height: 50px;background-color: #33CCD3;color: #ffffff;width: 172px;height: 49px;text-align: center;border-radius: 25px" @click="updatathis">确定</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</div>
</template>

<script>
import {
  info,
  myaddress,
  editAddress,
  bindAddress
} from '@/api/user'
import VDistpicker from 'v-distpicker'
export default {
  components: {
    VDistpicker
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      dialogVisible: false,
      ismyaddress: '',
      dialogVisibles: false,
      placeholders: {
        province: '------- 省 --------',
        city: '--- 市 ---',
        area: '--- 区 ---',
      },
      ruleForm: {
        phone: ''
      },
      namevalue: '',
      detailaddress: '',
      myaddressThis: false,
      indexitem: 0,
      id: '',
      ishappyid: '',
      address_id: '',
      xuanzele: false,
      rules: {
        phone: [{
          validator: checkPhone,
          trigger: 'blur'
        }]
      }
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
    this.ishappyid = this.$route.query.itemlist
    info('').then(res => {
      const timestamp = res
      const options = {
        timestamp: timestamp
      }
      myaddress(options).then(res => {
        if (res.code === 100) {
          this.ismyaddress = res.data.data
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
    openthisorderss() {
      this.$router.push({
        path: '/Mycurriculum/Mycurriculum',
        query: {
          case: 'second'
        }
      })
    },
    openthisorders() {
      this.dialogVisible = false
    },
    handleClose(done) {
      done()
    },
    newadd() {
      this.dialogVisible = false
      this.dialogVisibles = true
    },
    updatathis() {
      // 上传地址
      if (this.namevalue === '') {
        this.$message('请填写姓名')
        return
      } else if (this.ruleForm.phone === '') {
        this.$message('请填写手机号码')
        return
      } else if (this.province === '' || this.city === '' || this.area === '') {
        this.$message('请完善地址')
        return
      } else if (this.detailaddress === '') {
        this.$message('请填写完整地址')
        return
      } else {
        info('').then(res => {
          const timestamp = res
          const options = {
            name: this.namevalue,
            phone: this.ruleForm.phone,
            province: this.province, // 省
            city: this.city, // 市
            area: this.area, // 区
            address: this.detailaddress, // 详细地址
            is_check: this.check, // 默认地址 1为否 2为是
            timestamp: timestamp
          }
          editAddress(options).then(res => {
            if (res.code === 100) {
              this.$alert('新增成功')
              this.dialogVisible = false
              this.dialogVisibles = false
              this.myaddressThis = true
              this.address = this.detailaddress
              this.address_id = res.data.id
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
      this.xuanzele = true
      this.indexitem = index
      this.address_id = item.id
      this.namevalue = item.name
      this.ruleForm.phone = item.phone
      this.province = item.province // 省
      this.city = item.city // 市
      this.area = item.area // 区
      this.address = item.address // 详细地址
    },
    setaddressed() {
      if (this.xuanzele === false) {
        this.province = this.ismyaddress[0].province
        this.city = this.ismyaddress[0].city
        this.area = this.ismyaddress[0].area
        this.address_id = this.ismyaddress[0].id
        this.address = this.ismyaddress[0].address
        this.namevalue = this.ismyaddress[0].name
        this.ruleForm.phone = this.ismyaddress[0].phone
      }
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
@import "../../static/styles/class/openorder.scss";
</style>
