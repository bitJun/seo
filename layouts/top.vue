<template>
  <div class="top_view clearfix" id="nav_list">
    <div class="top_view_left">首页</div>
    <div class="top_view_right">
      <img src="/images/ewm.png" @click="loginweixin" style="cursor:pointer;width: 40px;height: 40px;margin-top: 4px">
    </div>
  </div>
</template>
<script>
  export default {
    name: 'top',
    data () {
      let checkPhone = (rule, value, callback) => {
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
        usercode: '',
        userbind: false,
        islogin: 0,
        phonenull: true,
        show: true, // 初始启用按钮
        count: '', // 初始化次数
        timer: null,
        dialogVisible: false,
        onlogin: false,
        dialogVisibles: false,
        offcall: false,
        src: '',
        token: '',
        avatar_urls: '',
        phonefont: '',
        Generaltable: '',
        ruleForm: {
          phone: ''
        },
        accountSettingsForm: {
          verificationCode: ''
        },
        rules: {
          phone: [{
            validator: checkPhone,
            trigger: 'blur'
          }]
        }
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      loginweixin() {
        this.dialogVisible = true
        this.src = 'https://open.weixin.qq.com/connect/qrconnect?' +
          'appid=wxd4cd10786301628d' +
          '&redirect_uri=https%3a%2f%2fwww.xiniaogongkao.com/' +
          // '&redirect_uri=https%3a%2f%2fwww.xiniaogongkao.com/test/' +
          '&response_type=code' +
          '&scope=snsapi_login' +
          '#wechat_redirect'
      },
    }
  }
</script>


