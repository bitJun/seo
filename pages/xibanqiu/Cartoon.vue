<template>
<div class="app-container">
  <div style="width: 1169px;height: 100%;margin:auto;background: #ffffff;padding-bottom: 50px;padding-top: 50px;border-radius: 10px">
    <div v-if="abc === 0 && menulist.exam_number !== 0">
      <div style="float: right">
        <div style="width: 299px;margin-right: 20px" v-for="(item,index) in banners" v-bind:key="index.url">
          <img :src="item.img_url" alt="" @click="setdetails(item)" style="width: 100%;margin-bottom: 20px;border-radius: 6px">
        </div>
      </div>
    </div>
    <div style="display: flex;justify-content: space-between;padding: 1% 0 1% 1%">
      <div style="display: flex;margin-left: 2%;">
        <div style="line-height: 36px;width: 800px;padding: 0 2%">
          <div style="font-weight: bold;color: #333333;font-size: 24px">{{ menulist.title }}</div>
          <div style="display: flex;justify-content: space-between;color: #9AABB8">
            <div v-if="menulist.reg_date"><img src="/images/icon/riqi.png" alt="" style="width: 12px;height: 12px;margin-right: 10px;vertical-align: middle;color: #9AABB8;margin-bottom: 4px">{{ (menulist.reg_date).replace(/\-/g,".") }} <span style="margin-left: 30px">来源：{{menulist.author}}</span></div>
            <div class="share-img" style="visibility: hidden"><span style="font-size: 14px">分享到：</span>
              <img src="/images/icon/wechatshare.png" title="分享到微信">
              <img src="/images/icon/qqshare.png" title="分享到QQ" @click="shareqq">
              <img src="/images/icon/weiboshare.png" title="分享到微博" @click="shareToSinaWB(event)">
            </div>
          </div>
          <div v-html="menulist.content" class="contentimglist"></div>
          <div style="float: right;margin-right: 140px">
            <div>{{ menulist.author }}</div>
            <div>{{ menulist.regdate }}</div>
          </div>
        </div>
      </div>
      <div v-if="menulist.exam_number === 0">
        <div style="width: 299px;margin-right: 20px" v-for="(item,index) in banners" v-bind:key="index.url">
          <img :src="item.img_url" alt="" @click="setdetails(index)" style="width: 100%">
        </div>
      </div>
    </div>
    <div>
      <div style="border-bottom: 1px solid #F5F5F5;margin: 0 4%;padding: 2% 0;color: #333333" v-if="takeset.length">精选热评</div>
      <div v-for="(item,index) in takeset" v-bind:key="index.url" style="border-bottom: 1px solid #f5f5f5;padding-bottom: 25px">
        <div style="margin: 2% 4% 0 4%;display: flex;justify-content: space-between;">
          <div style="display: flex;padding-bottom: 2%;line-height: 30px">
            <img :src="item.user_avatar_url" alt="" style="width: 40px;height: 40px;margin-right: 20px">
            <div>
              <div style="color: #999999">{{ item.user_nickname }}
                <img v-if="item.user_sex === 1" src="/images/icon/comment_nan_cion.png" style="vertical-align: middle">
                <img v-else src="/images/icon/comment_nv_icon.png" alt="" style="vertical-align: middle">
                <span style="color: #33CCD3;font-size: 14px;border-radius: 20px;padding: 5px 10px" v-if="item.status ==='1' || item.status === 1">待审核</span>
              </div>
              <div style="color: #333">{{ item.comment }}</div>
            </div>
          </div>
          <div style="color: #999999">赞
            <img v-if="item.is_praise === 0 && dianzanle === null" src="/images/icon/zan.png" alt="" @click="dianzan(item)" style="cursor:pointer;">
            <img v-else src="/images/icon/zanle.png" style="cursor:pointer;">
          </div>
        </div>
        <div v-if="item.reply&&item.reply !== ''" class="comments_list_box">
          <span class="content_name">犀鸟铲屎官</span>
          <span class="content_hf">回复：</span>
          <span class="content_txt">{{ item.reply }}</span>
        </div>
      </div>
    </div>
  </div>
  <!--    底部评论栏-->
  <!--    在条漫里面是隐藏的-->
  <div style="width: 1169px;margin: 2% auto;background: #ffffff;border-radius: 10px;visibility: hidden">
    <div style="display: flex;justify-content: space-between;color: #9AABB8;height: 70px;line-height: 70px;padding: 0 40px;margin-bottom: 50px">
      <div style="display: flex;justify-content: space-between;width: 80px; color: #849191;">
        <div><img src="/images/icon/pinglun.png" alt="" style="margin-right: 10px;vertical-align: middle;width: 18px;height: 18px">{{ menulist.comment_num }}</div>
        <div style="padding-top: 4px">
          <img style="cursor:pointer;width: 18px;height: 18px" v-if="menulist.is_collect === 0 && shoucang === null" src="/images/icon/shoucang.png" alt="" @click="checkshoucang">
          <img style="cursor:pointer;width: 18px;height: 18px" v-else src="/images/icon/shoucang1.png" alt="" @click="checkedshoucang">
        </div>
      </div>
      <div style="position: relative">
        <input type="text" placeholder="为了轻松上岸，我准备发个言" style="width: 810px;border-radius: 30px;border: 1px solid #9AABB8;padding: 12px 26px;outline:none" v-model="inputup">
        <div style="cursor:pointer;background: #9AABB8;width: 100px;height: 44px;position: absolute;right: 0;top: 12px;color: #ffffff;border-radius: 0 30px 30px 0;line-height: 45px;text-align: center" @click="setinputvalue">评论</div>
      </div>
    </div>
  </div>
  <div>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_list_nav">
      <div v-if="phonenull === true">
        <img class="xiniaologo" src="/images/icon_login.png" alt="">
        <iframe :src="srccc" class="iframe_nav"></iframe>
        <div style="text-align: center;color: #33CCD3;cursor:pointer;" @click="checkphoneout">手机号登录</div>
      </div>
      <div v-else>
        <img class="xiniaologo" src="/images/icon_login.png" alt="">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" style="margin-top: 30%">
          <el-form-item prop="phone">
            <div>
              <img style="height: 40px;padding: 8px;vertical-align: middle;margin-left: 2px" src="/images/icon_input_phone.png">
              <el-input v-model.number="ruleForm.phone" style="width: 80%;outline: none" placeholder="请输入手机号" />
            </div>
            <div>
              <img style="height: 40px;padding: 8px;vertical-align: middle" src="/images/icon_input_code.png" alt="">
              <input v-model="phonefont" placeholder="请输入验证码" style="width: 46%;height: 40px;line-height: 40px;margin: 4% 0;padding-left: 16px;border-radius: 4px;border: 1px solid #DCDFE6" />
              <el-button icon="el-icon-mobile-phone" @click="send" style="width: 34%" type="success" :disabled="disabled=!show">
                <span v-show="show">获取验证码</span>
                <span v-show="!show" class="count">{{count}} s</span>
              </el-button>
              <div style="text-align: center">
                <el-checkbox style="margin-right: 0;margin-left: -50px;border-radius: 50%" @change="handleChange">登录即代表同意 </el-checkbox><span @click="setbook()" style="cursor:pointer;">《犀鸟公考用户协议》</span>
                <div style="border: transparent;width: 60%;background: #33CCD3;border-radius: 20px;color: #ffffff;margin-left: 60px;margin-top: 10px;cursor:pointer;" @click="calllogin">登录</div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div style="text-align: center;color: #33CCD3;cursor:pointer;" @click="checkphoneouts">微信登录</div>
      </div>
    </el-dialog>
  </div>
  <el-dialog :visible.sync="dialogVisibles" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_list_nav">
    <div>
      <h1 style="text-align: center;color: #000000">《犀鸟公考用户协议》</h1>
      <div style="height:400px;">
        <el-scrollbar style="height:100%">
          <div style="line-height: 30px">
            <div class="content">

              <p>一、网络信息安全</p>

              <p>（一）犀鸟向用户提供论坛/评论/分享/微博等服务。犀鸟有义务为用户提供安全、稳定的网络环境，并用户亦有义务于犀鸟内进行合法行为，以维护犀鸟安全环境。在这些区域内，犀鸟用户公开发表的任何内容都会成为公开的信息，并且可以被搜索引擎收录。因此，犀鸟用户应慎重发表信息、观点，并应遵守如下规定：不得利用犀鸟制作、复制、查阅和传播下列信息：</p>

              <p>1、煽动抗拒、破坏宪法和法律、行政法规实施的；</p>

              <p>2、煽动颠覆国家政权，推翻社会主义制度的；</p>

              <p>3、煽动分裂国家、破坏国家统一的；</p>

              <p>4、煽动民族仇恨、民族歧视，破坏民族团结的；</p>

              <p>5、捏造或者歪曲事实，散布谣言，扰乱社会秩序的；</p>

              <p>6、宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖，教唆犯罪的；</p>

              <p>7、公然侮辱他人或者捏造事实诽谤他人的；</p>

              <p>8、损害国家机关信誉的；</p>

              <p>9、其他违反宪法和法律、行政法规的。</p>

              <p>不得从事下列危害犀鸟安全的活动：</p>

              <p>1、未经允许，进入计算机信息网络或者使用计算机信息网络资源的；</p>

              <p>2、未经允许，对计算机信息网络功能进行删除、修改或者增加的；</p>

              <p>3、未经允许，对计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</p>

              <p>4、故意制作、传播计算机病毒等破坏性程序的；</p>

              <p>5、其他危害计算机信息网络安全的。</p>

              <p>（二）本网站有权对违反法律法规和侵犯他人正当权益的信息作出如下处理：</p>

              <p>1、针对违反法律法规信息，犀鸟有权直接删除该信息，并不提前通知用户；</p>

              <p>2、针对侵犯他人正当权益的信息，犀鸟经权利人书面申请且提供证明文件完整的，犀鸟有权直接删除该信息；</p>

              <p>3、以上情节严重的，犀鸟有权对该用户进行封号处理。</p>

              <p>（三）本网站中未标注"来源：犀鸟"而是标注"来源**（网站）"的作品，均转载于第三方网站，本网站转载系出于传递信息之目的，并不意味着对作品观点的正确性、合法性以及作品内容的真实性负责。</p>

              <p>二、知识产权声明</p>

              <p>（一）本网站上刊载的所有内容，包括但不限于文字报导、图片、声音、录像、图表、标志、标识、广告、商标、商号、域名、软件、程序、版面设计、专栏目录与名称、内容分类标准以及为注册用户提供的任何或所有信息，均受《中华人民共和国著作权法》、《中华人民共和国商标法》、《中华人民共和国专利法》及适用之国际公约中有关著作权、商标权、专利权及其它财产所有权法律的保护，为犀鸟或相关权利人专属所有或持有。</p>

              <p>（二）使用者对于本网站上标注不得转载、摘编的内容与服务不得以任何目的予以使用。使用者将本网站未标注不得转载、摘编的内容与服务用于非商业用途、非盈利、非广告目的时，应遵守中华人民共和国相关法律、法规和政策的规定，不得侵犯犀鸟及相关权利人的权利。并应注明使用内容出处为“犀鸟”或相关权利人。 使用者将本网站提供的内容与服务用于商业、盈利、广告性目的时，需征得犀鸟或相关权利人的书面特别授权，并注明使用内容出处为“犀鸟”或相关权利人。并按有关国际公约和中华人民共和国法律的有关规定向相关权利人支付报酬。</p>

              <p>（三）未经犀鸟明确书面特别授权，任何人不得变更、发行、播送、转载、复制、重制、改动、散布、表演、展示或利用本网站的局部或全部的内容或服务或在非本网站所属的服务器上作镜像，否则以侵权论，依法追究法律责任。</p>

              <p>（四）上海华图犀鸟文化传播有限公司对本网站上所有内容包括但不限于网站运营或本网站上的信息、内容、材料或产品，不提供明示或暗示的担保。由所适用法律许可，上海华图犀鸟文化传播有限公司否认所有明示或暗示的担保，包括但不限于为特定目的做的商务暗示担保。上海华图犀鸟文化传播有限公司对任何损失或任何由于使用本网站而引起的损失，包括但不限于直接的，间接的，偶然的、惩罚性的和引发的损失，不承担责任。</p>

              <p>三、隐私保护声明</p>

              <p>犀鸟隐私权保护声明系本网站保护用户个人隐私的承诺。鉴于网络的特性，本网站将无可避免地与您产生直接或间接的互动关系，故特此说明本网站对用户个人信息所采取的收集、使用和保护政策，请您务必仔细阅读：</p>

              <p>（一）使用者非个人化信息</p>

              <p>我们将通过您的IP地址来收集非个人化的信息，例如浏览器和服务器日志上的信息等，以优化在您计算机屏幕上显示的页面。通过收集上述信息，我们亦进行客流量统计，从而改进网站的管理和服务。</p>

              <p>（二）个人资料</p>

              <p>1、当您在犀鸟网站进行用户注册登记、参加网上或公共论坛等各种活动时，在您的同意及确认下，本网站将通过注册表格等形式要求您提供一些个人资料。这些个人资料包括：</p>

              <p>1.1 个人识别资料：如姓名、性别、年龄、出生日期、身份证号码（或护照号码）、电话、通信地址、住址、电子邮件、地址等情况。</p>

              <p>1.2 个人背景：职业、教育程度、收入状况、婚姻、家庭状况。</p>

              <p>2、请了解，在未经您同意及确认之前，本网站不会将您为参加本网站之特定活动所提供的资料利用于其它目的。惟按下列第(六)项规定应政府及法律要求披露时不在此限。</p>

              <p>（三）信息安全</p>

              <p>1、本网站将对您所提供的资料进行严格的管理及保护，本网站将使用相应的技术，防止您的个人资料丢失、被盗用或遭篡改。</p>

              <p>2、本网站得在必要时委托专业技术人员代为对该类资料进行电脑处理，以符合专业分工时代的需求。如本网站将电脑处理之通知送达予您，而您未在通知规定的时间内主动明示反对，本网站将推定您已同意。惟在其后您仍然有权如下述第4.1.4条之规定，请求停止电脑处理。</p>

              <p>（四）用户权利</p>

              <p>1、您对于自己的个人资料享有以下权利：</p>

              <p>1.1 随时查询及请求阅览；</p>

              <p>1.2 随时请求补充或更正；</p>

              <p>1.3 随时请求删除；</p>

              <p>1.4 请求停止电脑处理及利用。</p>

              <p>（五）限制利用原则</p>

              <p>本网站惟在符合下列条件之一，方对收集之个人资料进行必要范围以外之利用：</p>

              <p>1、已取得您的书面同意；</p>

              <p>2、为免除您在生命、身体或财产方面之急迫危险；</p>

              <p>3、为防止他人权益之重大危害；</p>

              <p>4、为增进公共利益，且无害于您的重大利益。</p>

              <p>（六）个人资料之披露</p>

              <p>当政府机关依照法定程序要求本网站披露个人资料时，本网站将根据执法单位之要求或为公共安全之目的提供个人资料。在此情况下之任何披露，本网站均不承担任何责任。</p>

              <p>（七）公共论坛</p>

              <p>犀鸟为您提供论坛/评论/分享/微博等服务。在这些区域内，您公布的任何信息都会成为公开的信息。因此，我们提醒并请您慎重考虑是否有必要在这些区域公开您的个人信息。</p>

              <p>（八）未成年人隐私权的保护</p>

              <p>1、本网站将建立和维持一合理的程序，以保护未成年人个人资料的保密性及安全性。本网站郑重声明：任何18岁以下的未成年人参加网上活动应事先得到家长或其法定监护人（以下统称为"监护人"）的可经查证的同意。</p>

              <p>2、监护人应承担保护未成年人在网络环境下的隐私权的首要责任。</p>

              <p>3、本网站收集未成年人的个人资料，仅为回覆未成人特定要求的目的，一经回复完毕即从记录中删除，而不会保留这些资料做进一步的利用。</p>

              <p>4、未经监护人之同意，本网站将不会使用未成年人之个人资料，亦不会向任何第三方披露或传送可识别该未成人的个人资料。本网站如收集监护人或未成年人的姓名或其它网络通讯资料之目的仅是为获得监护人同意，则在经过一段合理时间仍未获得同意时，将主动从记录中删除此类资料。</p>

              <p>5、若经未成人之监护人同意，本网站可对未成年人之个人资料进行收集，本网站将向监护人提供：</p>

              <p>5.1 审视自其子女或被监护人收集之资料的机会；</p>

              <p>5.2 拒绝其子女或被监护人的个人资料被进一步的收集或利用的机会；</p>

              <p>5.3 变更或删除其子女或被监护人个人资料的方式。</p>

              <p>6、监护人有权拒绝本网站与其子女或被监护人做进一步的联络。</p>

              <p>7、本网站收集未成年人的个人资料，这些资料只是单纯作为保护未成年人参与网络活动时的安全，而非作为其它目的之利用。本网站保证不会要求未成年人提供额外的个人资料，以作为允许其参与网上活动的条件。</p>

              <p>（九）Cookies</p>

              <p>1、Cookies是指一种技术，当使用者访问设有Cookies装置的本网站时，本网站之服务器会自动发送Cookies至阁下浏览器内，并储存到您的电脑硬盘内，此Cookies便负责唯一标示您访问本站的身份。</p>

              <p>2、运用Cookies技术，本网站能够为您提供更加周到的个性化服</p>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {
  articleInfo,
  info,
  comment,
  addComment,
  addPraise,
  referBannerv2,
  addCollect,
  freshenToken,
  phoneLogin,
  loginphone,
  xbqInfov2
} from '@/api/user'
var TIME_COUNT = 60 // 更改倒计时时间
var _title, _source, _sourceUrl, _pic,
  // _width = 600,
  // _height = 600,
  // _top = (screen.height - _height) / 2,
  // _left = (screen.width - _width) / 2,
  _url = 'www.xiniaogongkao.com'
export default {
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
      phonenull: true,
      show: true, // 初始启用按钮
      count: '', // 初始化次数
      timer: null,
      dialogVisible: false,
      onlogin: false,
      dialogVisibles: false,
      offcall: false,
      srccc: '',
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
      },
      activeName: '',
      courselist: {},
      abc: 1,
      menulist: '',
      takeset: '',
      inputup: '',
      dianzanle: null,
      shoucang: null,
      banners: '',
      comebaby: '',
      seetime: false,
      happyid: ''
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
    this.token = localStorage.getItem('token')
    this.happyid = this.$route.query.happyid
    this.comebaby = 30
    info('').then(res => {
      const timestamp = res
      const options = {
        id: this.happyid,
        timestamp: timestamp
      }
      xbqInfov2(options).then(res => {
        if (res.code === 100) {
          this.menulist = res.data
          this.abc = 0
        } else {
          this.$alert(res.message, {
            callback: action => {
              this.$router.back(-1)
            }
          })
        }
      })
      referBannerv2(options).then(res => {
        if (res.code === 100) {
          this.banners = res.data
          // this.takeset = res.data.data
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
    // 跳转视频中心
    setdetails(item) {
      if (item.type === 2 || item.type === '2') {
        window.open(item.redirect_url)
      }
    },
    setinputvalue() {
      if (this.token === '' || this.token === null) {
        this.loginweixin()
      } else {
        if (this.seetime) {
          return false
        }
        this.seetime = true
        info('').then(res => {
          const timestamp = res
          const options = {
            comment: this.inputup,
            article_id: this.comebaby,
            timestamp: timestamp
          }
          addComment(options).then(res => {
            if (res.code === 100) {
              this.$alert('发布成功', {
                callback: action => {
                  info('').then(res => {
                    const timestamp = res
                    const options = {
                      article_id: this.comebaby,
                      timestamp: timestamp
                    }
                    articleInfo(options).then(res => {
                      if (res.code === 100) {
                        this.menulist = res.data
                        this.abc = 0
                      }
                    })
                    comment(options).then(res => {
                      if (res.code === 100) {
                        this.takeset = res.data.data
                      }
                    })
                    banner(options).then(res => {
                      if (res.code === 100) {
                        this.banners = res.data
                        // this.takeset = res.data.data
                      }
                    })
                  })
                }
              })
            } else if (res.code === 201) {
              // token 刷新
              localStorage.removeItem('token')
              info('').then(res => {
                const timestamp = res
                const options = {
                  timestamp: timestamp
                }
                freshenToken(options).then(res => {
                  if (res.code === 100) {
                    localStorage.setItem('token', res.data.token)
                  } else {
                    console.log('token刷新失敗', res.message)
                  }
                })
              })
            } else if (res.code === 202) {
              // token 失效且無法刷新
              window.localStorage.clear()
              history.go(0) // 刷新
              this.$router.push({
                path: '/dashboard'
              })
            } else {
              this.buyMycurriculum()
            }
          })
        })
        this.seetime = false
      }
    },
    dianzan(item) {
      if (this.token === '' || this.token === null) {
        this.loginweixin()
      } else {
        info('').then(res => {
          const timestamp = res
          const options = {
            comment_id: item.id,
            timestamp: timestamp
          }
          addPraise(options).then(res => {
            if (res.code === 100) {
              this.$alert('感谢您的点赞', {
                callback: action => {
                  history.go(0)
                }
              })
            } else if (res.code === 201) {
              // token 刷新
              localStorage.removeItem('token')
              info('').then(res => {
                const timestamp = res
                const options = {
                  timestamp: timestamp
                }
                freshenToken(options).then(res => {
                  if (res.code === 100) {
                    localStorage.setItem('token', res.data.token)
                  } else {
                    console.log('token刷新失敗', res.message)
                  }
                })
              })
            } else if (res.code === 202) {
              // token 失效且無法刷新
              window.localStorage.clear()
              history.go(0) // 刷新
              this.$router.push({
                path: '/dashboard'
              })
            } else {
              this.buyMycurriculum()
            }
          })
        })
      }
    },
    checkshoucang() {
      // 收藏
      if (this.token === '' || this.token === null) {
        this.loginweixin()
      } else {
        info('').then(res => {
          const timestamp = res
          const options = {
            article_id: this.comebaby,
            type: 0,
            timestamp: timestamp
          }
          addCollect(options).then(res => {
            if (res.code === 100) {
              this.shoucang = 1
              this.$alert('收藏成功')
            } else if (res.code === 201) {
              // token 刷新
              localStorage.removeItem('token')
              info('').then(res => {
                const timestamp = res
                const options = {
                  timestamp: timestamp
                }
                freshenToken(options).then(res => {
                  if (res.code === 100) {
                    localStorage.setItem('token', res.data.token)
                  } else {
                    console.log('token刷新失敗', res.message)
                  }
                })
              })
            } else if (res.code === 202) {
              // token 失效且無法刷新
              window.localStorage.clear()
              history.go(0) // 刷新
              this.$router.push({
                path: '/dashboard'
              })
            } else if (res.code === 101 || res.code === '101') {
              // 处理101
              this.seetime = false
            } else {
              this.buyMycurriculum()
            }
          })
        })
      }
    },
    checkedshoucang() {
      info('').then(res => {
        const timestamp = res
        const options = {
          article_id: this.comebaby,
          type: 1,
          timestamp: timestamp
        }
        addCollect(options).then(res => {
          if (res.code === 100) {
            this.shoucang = null
            this.menulist.is_collect = 0
            this.$alert('取消成功')
          } else {
            console.log(res.message)
            // this.$alert(res.message)
          }
        })
      })
    },
    buyMycurriculum() {
      if (this.token === null || this.token === '') {
        this.loginweixin()
      } else {
        this.$router.push({
          path: '/example/buycurriculum',
          query: {
            detail: this.courselist.id
          }
        })
      }
    },
    gostuy() {
      this.$router.push({
        name: 'Mycurriculum'
      })
    },
    timeFormat(param) {
      return param < 10 ? '0' + param : param
    },
    closeShadow() {
      this.dialogVisible = false
    },
    handleClose(done) {
      done()
    },
    loginweixin() {
      this.dialogVisible = true
      this.srccc = 'https://open.weixin.qq.com/connect/qrconnect?' +
        'appid=wxd4cd10786301628d' +
        '&redirect_uri=https%3a%2f%2fwww.xiniaogongkao.com' +
        '&response_type=code' +
        '&scope=snsapi_login' +
        '#wechat_redirect'
    },
    send() {
      if (this.ruleForm.phone === '') {
        alert('请输入手机号')
        return
      } else {
        info('').then(res => {
          const timestamp = res
          const options = {
            phone: this.ruleForm.phone,
            timestamp: timestamp
          }
          loginphone(options).then(res => {
            // console.log(res)
          })
        })
      }
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer) // 清除定时器
            this.timer = null
          }
        }, 1000)
      }
    },
    handleChange(event) {
      this.offcall = event
    },
    setbook() {
      this.dialogVisibles = true
    },
    checkphoneout() {
      this.phonenull = false
    },
    checkphoneouts() {
      this.phonenull = true
    },
    setonemuver() {
      this.$router.push({
        path: '/Mycurriculum/Mycurriculum'
      })
    },
    calllogin() {
      if (this.ruleForm.phone === '') {
        alert('手机号不能为空')
        return
      } else if (this.ruleForm.phone && this.phonefont === '') {
        alert('请填写验证码')
        return
      } else if (this.offcall === false) {
        alert('请先同意《犀鸟公考用户协议》')
        return
      } else {
        info('').then(res => {
          const timestamp = res
          const options = {
            phone: this.ruleForm.phone,
            code: this.phonefont,
            timestamp: timestamp
          }
          phoneLogin(options).then(res => {
            if (res.code === 100) {
              this.onlogin = true
              this.dialogVisible = false
              this.Generaltable = res.data
              localStorage.setItem('nickname', this.Generaltable.nickname)
              localStorage.setItem('phone', this.Generaltable.phone)
              localStorage.setItem('token', this.Generaltable.token)
              localStorage.setItem('avatar_url', this.Generaltable.avatar_url)
              localStorage.setItem('userId', this.Generaltable.id)
              this.$alert('登录成功！', {
                callback: action => {
                  history.go(0) // 刷新
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
    },
    shareToSinaWB(event) {
      var _shareUrl = 'http://v.t.sina.com.cn/share/share.php?&appkey=895033136' // 真实的appkey，必选参数
      _shareUrl += '&url=' + encodeURIComponent(_url || document.location) // 参数url设置分享的内容链接|默认当前页location，可选参数
      _shareUrl += '&title=' + encodeURIComponent(_title || document.title) // 参数title设置分享的标题|默认当前页标题，可选参数
      _shareUrl += '&source=' + encodeURIComponent(_source || '')
      _shareUrl += '&sourceUrl=' + encodeURIComponent(_sourceUrl || '')
      _shareUrl += '&content=' + 'utf-8' // 参数content设置页面编码gb2312|utf-8，可选参数
      _shareUrl += '&pic=' + encodeURIComponent(_pic || '') // 参数pic设置图片链接|默认为空，可选参数
      window.open(_shareUrl, '_blank')
    },
    shareqq(title, url, pic) {
      var p = {
        url: 'https://www.xiniaogongkao.com', // /*获取URL，可加上来自分享到QQ标识，方便统计*/
        desc: '来自犀鸟铲屎官的分享', // /*分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔）*/
        title: '犀鸟公考', // /*分享标题(可选)*/
        summary: '犀鸟公考犀鸟公考', // /*分享描述(可选)*/
        pics: pic, // /*分享图片(可选)*/
        flash: '', // /*视频地址(可选)*/
        // commonClient : true, /*客户端嵌入标志*/
        site: 'QQ分享' // /*分享来源 (可选) ，如：QQ分享*/
      }
      var s = []
      for (var i in p) {
        s.push(i + '=' + encodeURIComponent(p[i] || ''))
      }
      var target_url = 'http://connect.qq.com/widget/shareqq/index.html?' + s.join('&')
      window.open(target_url, 'qq', 'height=1080, width=1920')
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/xibanqiu/Cartoon.scss"
</style>
