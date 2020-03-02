<template>
  <section class="footermain">
    <el-container>
      <el-footer>
        <ul class="conter_body">
          <li class="setbutton">
            <span @click="setsource">关于犀鸟</span>|
            <span @click="setstatement">法律声明</span>|
            <span @click="sethtml">沪ICP备14001217号-4</span>
          </li>
          <li>
            <span>犀鸟客服：400-0559-789</span>
          </li>
          <li class="setbutton">
            <span @click="setInmg">犀鸟表情包下载</span>|
            <span id="weiboEwm" style="position: relative">犀鸟微博
              <div class="webPublic_footer_ewm weiboEwm">
                <img src="/images/pic_code_weibo.png"/>
              </div>
            </span>|
            <span id="weixinEwm" style="position: relative">犀鸟公众号
              <div class="webPublic_footer_ewms weixinEwm">
                <img src="/images/pic_code_weixin.png"/>
              </div>
            </span>|
            <span @click="settudou">图豆教育-幼小衔接</span>
          </li>
        </ul>
      </el-footer>
    </el-container>
  </section>
</template>

<script>
export default {
  methods: {
    setsource() {
      this.$router.push({ path: '/external-link/source' })
    },
    setstatement() {
      this.$router.push({ path: '/external-link/statement' })
    },
    sethtml() {
      if (typeof window == 'object') {
        window.location.href = 'http://www.beian.miit.gov.cn/state/outPortal/loginPortal.action'
      }
    },
    setInmg() {
      if (typeof window == 'object') {
        window.location.href = 'https://gk-pc.oss-cn-beijing.aliyuncs.com/handout/cf4bb40e9e7b0368d1df38fff3cb346d111.zip'
      }
    },
    settudou() {
      if (typeof window == 'object') {
        window.location.href = 'https://www.imtudo.com/'
      }
    }
  }
}
</script>

<style lang="scss">
.el-footer {
  border-top: 1px solid #DEDEDE;
  color: #999999;
  background-color: #F1F5F8;
  text-align: center;
  line-height: 60px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
.conter_body{
  display: flex;
  width: 1180px;
  margin: 0 auto;
  justify-content: space-between;
  font-size: 12px;
  list-style: none;
  padding-left: 0;
}
.conter_body span{
  margin: 0 6px;
}
.setbutton span{
  cursor:pointer;
}
.webPublic_footer_ewm {
  width: 120px;
  height: 134px;
  position: absolute;
  left: 70.5%;
  margin-left: -80px;
  bottom: 25px;
  z-index: 180;
  display: none;
}
.webPublic_footer_ewms {
  width: 120px;
  height: 134px;
  position: absolute;
  left: 69%;
  margin-left: -80px;
  bottom: 25px;
  z-index: 180;
  display: none;
}
#weiboEwm:hover .weiboEwm {
  z-index: 9999999;
  display: block !important;
}

#weixinEwm:hover .weixinEwm {
  display: block !important;
  z-index: 9999999;
}
</style>
