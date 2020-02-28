<template>
<div class="app-container" id="mydetails">
  <div class="banner_list">
    <img src="/images/guajian.png">
  </div>
  <div style="width: 1200px;background: #ffffff;height: auto;margin: 0 auto;border-radius: 10px">
    <div style="display: flex;">
      <div style="height: 275px;width: 491px;margin: 50px">
        <video v-if="courselist.course_video !== ''" controls="controls" id="video" width="100%" height="100%" :src="courselist.course_video"></video>
        <img v-else :src="courselist.desc_image" style="width: 100%;height: 100%">
      </div>
      <div style="margin: 50px 0 50px 0">
        <div style="font-size: 28px;color: #333333;font-weight: bold;margin-bottom: 10px" v-if="courselist.coursename !== ''">{{ courselist.coursename }}</div>
        <div style="color: #999999;margin-bottom: 20px"><span style="margin-right: 20px">{{ courselist.label_str }}</span><span style="margin-right: 20px" v-if="courselist.start_time&&courselist.start_time !== ''">开课时间：{{ courselist.start_time.substring(0,10).replace(/\-/g,".") }} - {{ courselist.end_time.substring(0,10).replace(/\-/g,".") }}</span><span style="margin-right: 20px">{{ courselist.period}}课时</span></div>
        <div style="color: #FCC80D;font-weight: bold">距离结束：{{countDownList}}</div>
        <div style="display: flex;margin-top: 120px;align-items: center">
          <div>
            <div style="color: red;font-weight: bold"><img v-if="courselist.is_assemble === 1" src="/images/icon/tuan.png" style="width: 18px;height: 20px;margin-right: 10px">
              RMB <span v-if="courselist.type !== 8" style="font-size: 36px">{{ courselist.price }}</span>
              <span v-else style="font-size: 36px">{{ courselist.assemble_price }}</span></div>
            <div style="color: #999999;font-size: 14px"><span>限售{{ courselist.xnumber }}人</span> | <span v-if="courselist.type !== 8">已报{{ courselist.order_number }}人</span><span v-else>已报{{ courselist.order_number }}人</span></div>
          </div>
          <div>
            <div style="display: flex;justify-content: flex-end;margin-left: 60px;width: 312px">
              <div v-if="courselist.is_pay === 1">
                <div class="button_lists" style="background: #33CCD3;cursor:pointer" @click="gostuy">
                  <span>进入课堂</span>
                </div>
              </div>
              <div v-else style="display: flex;justify-content: flex-end;width: 312px">
                <div v-if="courselist.close_time && courselist.close_time <= date">
                  <div class="button_lists" style="background: #F5F5F5;color: #99a9bf">
                    <span>已停售</span>
                  </div>
                </div>
                <div v-else-if="courselist.xnumber + courselist.init_order_number <= courselist.order_number">
                  <div class="button_lists" style="background: #F5F5F5;color: #99a9bf">
                    <span>已售罄</span>
                  </div>
                </div>
                <div v-else-if="courselist.price === 0 || courselist.price === '0'">
                  <div class="button_lists" @click="buyMycurriculum" style="cursor:pointer">
                    <span>免费领取</span>
                  </div>
                </div>
                <div v-else>
                  <div v-if="courselist.type === 8" style="display: flex">
                    <div class="button_list" @click="buyMycurriculum" style="cursor:pointer">
                      <span>RMB<span style="font-size: 24px">{{ courselist.price }}</span></span>
                      <span style="font-size: 14px">直接购买</span>
                    </div>
                    <div class="button_lists" @click="buyMycurriculums" style="cursor:pointer">
                      <span style="font-size: 12px">RMB<span style="font-size: 20px">{{ courselist.assemble_price }}</span></span>
                      <span style="font-size: 14px">{{ courselist.assemble_num }}人拼团</span>
                    </div>
                  </div>
                  <div v-else>
                    <div class="button_lists" @click="buyMycurriculum" style="cursor:pointer">
                      <span>立即购买</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 1200px;background: #ffffff;height: auto;margin: 1% auto;display: flex;border-radius: 10px">
    <div style="margin: 50px">
      <div style="margin: 0 0 20px 0;display: flex;font-size: 14px;color: #333333;width: 270px">
        <div style="width: 4px;background: #33CCD3;height: 16px;margin-right: 6px"></div>推荐课程
      </div>
      <div style="display: flex;width: 270px;margin-bottom: 20px" v-for="(item,index) in newadd" v-bind:key="index.url" @click="setdetails(item)">
        <div>
          <img style="float: left;width: 118px;height: 66px;border-radius: 6px;margin-right: 10px" :src="item.desc_image" alt="">
          <div style="display: flex;flex-flow: column;height: 66px;padding-top: 5px">
            <div style="color: #333333;height: 37px" class="over-lists">{{item.coursename}}</div>
            <div style="font-size: 12px;color: #999999;margin-top: 10px">{{ (item.start_time).replace(/\-/g,".").substring(0,10)}}-{{ (item.end_time).replace(/\-/g,".").substring(0,10)}}</div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin: 50px 50px 50px 0;width: 100%">
      <el-tabs v-model="activeName">
        <el-tab-pane label="课程简介" name="first" :key="'first'">
          <div style="width: 100%">
            <div v-for="(item,index) in courselist.desc" v-bind:key="index.url">
              <div><img style="width: 750px;border-radius: 40px" :src="item.image_url" alt=""></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="课程大纲" name="second" :key="'second'">
          <div>
            <div style="border-bottom: 1px solid #E9E9E9;display: flex;justify-content: space-between;align-items: center;margin-left: 40px;position: relative;padding: 20px 0" v-for="(item,index) in courselist.courseware" v-bind:key="index.url">
              <div>
                <div style="background: #E4E4E4;color: #333333;padding: 0 8px;border-radius: 6px;position: absolute;left: -40px">{{ index+1 }}</div>
                <div>{{ item.name }}</div>
                <div style="color: #A8A8A8;margin-top: 10px">{{ item.teacher_nickname }} <span>{{ item.start_time.substring(0,16).replace(/\-/g,".") }}</span>-<span>{{ item.end_time.substring(10,16).replace(/\-/g,".") }}</span></div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <div v-if="movetitle === true" style="width: 850px;background: #ffffff;position: fixed;top: 0;height: 70px;margin-left: 22%;z-index: 99;display: flex;justify-content: space-between;align-items: center">
    <div style="display: flex;margin-left: 40px" class="tab_title">
      <div v-if="twotitle === 1" style="background: #33CCD3;color: #ffffff;border-radius: 20px;padding: 0 20px;font-size: 14px;height: 40px;text-align: center;line-height: 40px">课程简介</div>
      <div v-if="twotitle === 0" style="background: #f5f5f5;color: #666666;border-radius: 20px;padding: 0 20px;font-size: 14px;height: 40px;text-align: center;line-height: 40px;" @click="moveone">课程简介</div>
      <div v-if="titetwo === 1" style="background: #f5f5f5;color: #666666;border-radius: 20px;padding: 0 20px;font-size: 14px;height: 40px;text-align: center;line-height: 40px;margin-left: 20px" @click="movetwo">课程大纲</div>
      <div v-if="titetwo === 0" style="background: #33CCD3;color: #ffffff;border-radius: 20px;padding: 0 20px;font-size: 14px;height: 40px;text-align: center;line-height: 40px;margin-left: 20px">课程大纲</div>
    </div>
    <!--      <div style="visibility: hidden;background: #E6213A;color: #ffffff;border-radius: 30px;width: 176px;height: 49px;text-align: center;line-height: 49px;margin-right: 30px">-->
    <!--        立即购买-->
    <!--      </div>-->
    <div style="display: flex;justify-content: flex-end;margin-left: 60px;width: 312px">
      <div v-if="courselist.is_pay === 1">
        <div class="button_lists" style="background: #33CCD3;cursor:pointer" @click="gostuy">
          <span>进入课堂</span>
        </div>
      </div>
      <div v-else style="display: flex;justify-content: flex-end;width: 312px">
        <div v-if="courselist.close_time && courselist.close_time <= date">
          <div class="button_lists" style="background: #F5F5F5;color: #99a9bf">
            <span>已停售</span>
          </div>
        </div>
        <div v-else-if="courselist.xnumber + courselist.init_order_number <= courselist.order_number">
          <div class="button_lists" style="background: #F5F5F5;color: #99a9bf">
            <span>已售罄</span>
          </div>
        </div>
        <div v-else-if="courselist.price === 0 || courselist.price === '0'">
          <div class="button_lists" @click="buyMycurriculum" style="cursor:pointer">
            <span>免费领取</span>
          </div>
        </div>
        <div v-else>
          <div v-if="courselist.type === 8" style="display: flex">
            <div class="button_list" @click="buyMycurriculum" style="cursor:pointer">
              <span>RMB<span style="font-size: 24px">{{ courselist.price }}</span></span>
              <span style="font-size: 14px">直接购买</span>
            </div>
            <div class="button_lists" @click="buyMycurriculums" style="cursor:pointer">
              <span>RMB<span style="font-size: 24px">{{ courselist.assemble_price }}</span></span>
              <span style="font-size: 14px">{{ courselist.assemble_num }}人拼团</span>
            </div>
          </div>
          <div v-else>
            <div class="button_lists" @click="buyMycurriculum" style="cursor:pointer">
              <span>立即购买</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--    // 登录模块-->
  <div>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_list_nav">
      <div v-if="phonenull === true">
        <img class="xiniaologo" src="/images/icon_login.png" alt="">
        <iframe :src="src" class="iframe_nav"></iframe>
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
  courseInfo,
  info,
  phoneLogin,
  courseRecommendv2
} from '@/api/user'
import {
  loginphone
} from '@/api/user'
var TIME_COUNT = 60 // 更改倒计时时间
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
      date: new Date().getTime(), // 绑定的时候 直接绑定的当前时间 就好了
      phonenull: true,
      twotitle: 1,
      titetwo: 1,
      activeName: 'first',
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
      },
      courselist: {},
      happyid: '',
      countDownList: '00天00时00分00秒',
      actEndTime: '',
      flag: false,
      movetitle: false,
      newadd: '',
      campus_id: ''
    }
  },
  watch: {
    activeName(val) {
      if (val === 'second') {
        this.twotitle = 0
        this.titetwo = 0
      } else {
        this.twotitle = 1
        this.titetwo = 1
      }
    },
    $route(to, from) {
      window.location.reload()
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
    this.happyid = this.$route.query.itemlist
    this.campus_id = this.$route.query.campus_id
    info('').then(res => {
      const timestamp = res
      const options = {
        course_id: this.happyid,
        timestamp: timestamp
      }
      courseInfo(options).then(res => {
        if (res.code === 100) {
          this.courselist = res.data
          this.actEndTime = res.data.close_time
          var Dates = this.courselist.close_time.substring(0, 19)
          Dates = Dates.replace(/-/g, '/')
          var timestamp = new Date(Dates).getTime()
          this.courselist.close_time = timestamp
        } else if (res.code === 201 || res.code === 202 || res.code === 203) {
          window.localStorage.clear()
          history.go(0) // 刷新
          this.$router.push({
            path: '/dashboard'
          })
        } else {
          console.log(res.message)
        }
      })
    })
    this.countDown()
    this.newmust()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 监听
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= 650) {
        this.flag = true
        this.movetitle = true
      } else {
        this.movetitle = false
      }
    },
    newmust() {
      info('').then(res => {
        const timestamp = res
        const options = {
          course_id: this.happyid,
          campus_id: this.campus_id,
          timestamp: timestamp
        }
        courseRecommendv2(options).then(res => {
          if (res.code === 100) {
            this.newadd = res.data
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            window.localStorage.clear()
            history.go(0) // 刷新
            this.$router.push({
              path: '/dashboard'
            })
          } else {
            console.log(res.message)
          }
        })
      })
    },
    movetwo() {
      this.activeName = 'second'
    },
    moveone() {
      this.activeName = 'first'
    },
    setdetails(item) {
      console.log("cccc:", item)
      if (item.type === 2) {
        this.$router.push({
          path: '/curriculumlist',
          query: {
            itemlist: item.id,
            campus_id: this.campus_id
          }
        })
      } else if (item.type === 3) {
        this.$router.push({
          path: '/example/details',
          query: {
            itemlist: item.id,
            campus_id: this.campus_id
          }
        })
      } else if (item.type === 8) {
        this.$router.push({
          path: '/example/details',
          query: {
            itemlist: item.id,
            campus_id: this.campus_id
          }
        })
      } else {
        if (item.target_way === 1) {
          window.open(item.target_url, '_blank')
        } else {
          this.$router.push({
            path: '/example/details',
            query: {
              itemlist: item.target_url,
              campus_id: this.campus_id
            }
          })
        }
      }
    },
    buyMycurriculum() {
      if (this.token === null || this.token === '') {
        this.loginweixin()
      } else {
        this.$router.push({
          path: '/example/buycurriculum',
          query: {
            detail: this.courselist.id,
            istype: 1
          }
        })
      }
    },
    buyMycurriculums() {
      // courselist.assemble_price
      if (this.token === null || this.token === '') {
        this.loginweixin()
      } else {
        this.$router.push({
          path: '/example/buycurriculum',
          query: {
            detail: this.courselist.id,
            itemlists: this.courselist.assemble_price,
            tuan: 1,
            istype: 1
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
    countDown(it) {
      var interval = setInterval(() => {
        // 获取当前时间，同时得到活动结束时间数组
        let newTime = new Date().getTime()
        // 对结束时间进行处理渲染到页面
        let endTime = new Date(this.actEndTime).getTime()
        let obj = null
        // 如果活动未结束，对时间进行处理
        if (endTime - newTime > 0) {
          let time = (endTime - newTime) / 1000
          // 获取天、时、分、秒
          let day = parseInt(time / (60 * 60 * 24))
          let hou = parseInt(time % (60 * 60 * 24) / 3600)
          let min = parseInt(time % (60 * 60 * 24) % 3600 / 60)
          let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60)
          obj = {
            day: this.timeFormat(day),
            hou: this.timeFormat(hou),
            min: this.timeFormat(min),
            sec: this.timeFormat(sec)
          }
        } else { // 活动已结束，全部设置为'00'
          obj = {
            day: '00',
            hou: '00',
            min: '00',
            sec: '00'
          }
          clearInterval(interval)
          // this.$router.push({ path: '/dashboard' })
        }
        this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒'
      }, 1000)
    },
    closeShadow() {
      this.dialogVisible = false
    },
    handleClose(done) {
      this.ruleForm.phone = ''
      this.phonefont = ''
      done()
    },
    loginweixin() {
      this.dialogVisible = true
      this.src = 'https://open.weixin.qq.com/connect/qrconnect?' +
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
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              window.localStorage.clear()
              history.go(0) // 刷新
              this.$router.push({
                path: '/dashboard'
              })
            } else if (res.code === 101) {
              this.$alert('请输入正确的手机号或验证码')
            } else {
              console.log(res.message)
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/table/details.scss";
</style>
