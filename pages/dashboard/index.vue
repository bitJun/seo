<template>
<div class="app-container">
  <div class="items_list">
    <!--app展示区-->
    <div class="itemsList" style="width: 30%">
      <div class="font-list" style="margin-left: 20px">APP</div>
      <a href="#gongkao_gomove">
        <div class="app_list">
          <img class="up_img_list" src="/images/share_icon/xngkicon.png" alt="">
          <div class="fonttitle">犀鸟公考</div>
        </div>
      </a>
      <a href="#xibanqiu_app">
        <div class="app_list" style="padding-right: 20px">
          <img class="up_img_list" src="/images/share_icon/xibanqiu.png" alt="">
          <div class="fonttitle">犀半球</div>
        </div>
      </a>
    </div>
    <!--小程序展示区-->
    <div class="itemsList" style="width: 68%">
      <div class="font-list">小程序</div>
      <div class="wxapp_list">
        <a href="#shenlunjiafen">
          <div>
            <img class="up_img_list" src="/images/share_icon/shenlun.png">
            <div class="fonttitle">申论加分项</div>
          </div>
        </a>
        <a href="#guokaolinian">
          <div>
            <img class="up_img_list" src="/images/share_icon/guokao.png">
            <div class="fonttitle">国考历年分数线</div>
          </div>
        </a>
        <a href="#tingting_gomove">
          <div>
            <img class="up_img_list" src="/images/share_icon/xntticon.png">
            <div class="fonttitle">犀听听</div>
          </div>
        </a>
        <a href="#live_gomove">
          <div>
            <img class="up_img_list" src="/images/share_icon/xnzbicon.png">
            <div class="fonttitle">犀鸟课堂</div>
          </div>
        </a>
      </div>
    </div>
  </div>
  <div class="items_list_body">
    <!-- 犀鸟公考APP -->
    <div class="studymainbox" id="gongkao_gomove">
      <div class="studymainbox_title">
        <p class="pa">犀鸟公考</p>
        <p class="pb"><span>版本：3.0.0</span>|<span>更新日期：2019.12.10</span></p>
      </div>
      <div class="studymainbox_bgloop">
        <!-- Swiper -->
        <el-carousel class="lun_imgs" ref="carousel">
          <el-carousel-item class="lun_img" v-for="(item,index) in imgsa" v-bind:key="index.url">
            <img :src="item.url" />
          </el-carousel-item>
        </el-carousel>
        <!--内容-->
        <div style="width: 50%;height: 100%;background: #ffffff;position: absolute;left: 0;top: 0;z-index: 999">
          <div class="livemain" style="left: 70px;">
            <div class="livemain_img">
              <img src="/images/move/gongkao.png" />
            </div>
            <div class="livemain_title">
              &nbsp;&nbsp;扫码下载犀鸟公考APP
            </div>
            <div class="livemain_content">
              犀鸟公考——公考上岸必备神器，公考名师实力推荐！ 公务员省考国考上岸必备神器！ 犀鸟公考app正式上线啦！ 名师免费给你直播教课，省考国考真题一网打尽 ；上万习题任你刷， 随时随地想学就学；闯关刷题玩游戏，轻松上岸很容易。一样的公考，不一样的上岸体验！
            </div>

          </div>
        </div>
      </div>
    </div>
    <!--犀半球-->
    <div class="studymainbox" id="xibanqiu_app">
      <div class="studymainbox_title">
        <p class="pa">犀半球</p>
        <p class="pb"><span>版本：1.0.0</span>|<span>更新日期：2019.11.07</span></p>
      </div>
      <div class="studymainbox_bgloop">
        <!-- Swiper -->
        <el-carousel class="lun_imgs" ref="carousel">
          <el-carousel-item class="lun_img" v-for="(item,index) in imgsb" v-bind:key="index.url">
            <img :src="item.url" />
          </el-carousel-item>
        </el-carousel>
        <!--内容-->
        <div style="width: 50%;height: 100%;background: #ffffff;position: absolute;right: 0;top: 0;z-index: 999">
          <div class="livemain">
            <div class="livemain_img" style="text-align: center;">
              <img src="/images/share_icon/xbqewm.png" />
            </div>
            <div class="livemain_title" style="text-align: center;">
              犀半球
            </div>
            <div class="livemain_content">
              现场探班、独家爆料、明星周边、限量亲签！！！
              帅、酷、萌学长在线回答，等你来问；
              名师科普学习、考试、求职一次都能上岸；
              犀半球APP 我的大学生活就要这么酷。
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- 申论加分 -->
    <div class="studymainbox" id="shenlunjiafen">
      <div class="studymainbox_title">
        <p class="pa">申论加分项</p>
        <p class="pb"><span>版本：1.0.3</span>|<span>更新日期：2019.08.20</span></p>
      </div>
      <div class="studymainbox_bgloop">
        <!-- Swiper -->
        <el-carousel class="lun_imgs" ref="carousel">
          <el-carousel-item class="lun_img" v-for="(item,index) in imgsc" v-bind:key="index.url">
            <img :src="item.url" />
          </el-carousel-item>
        </el-carousel>
        <!--内容-->
        <div style="width: 50%;height: 100%;background: #ffffff;position: absolute;left: 0;top: 0;z-index: 999">
          <div class="livemain" style="left: 70px;">
            <div class="livemain_img">
              <img src="/images/move/shenlunweixin.png" />
            </div>
            <div class="livemain_title">
              &nbsp;&nbsp;&nbsp;&nbsp;扫码关注申论加分项
            </div>
            <div class="livemain_content">
              由犀鸟公考打造，创新申论闯关模式，高效训练答题模式，名师1对1精批，申论热点分享，名师点评范文。
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- 国考申论 -->
    <div class="studymainbox" id="guokaolinian">
      <div class="studymainbox_title">
        <p class="pa">国考历年分数线</p>
        <p class="pb"><span>版本：1.4.1</span>|<span>更新日期：2019.11.01</span></p>
      </div>
      <div class="studymainbox_bgloop">
        <!-- Swiper -->
        <el-carousel class="lun_imgs" ref="carousel">
          <el-carousel-item class="lun_img" v-for="(item,index) in imgsd" v-bind:key="index.url">
            <img :src="item.url" />
          </el-carousel-item>
        </el-carousel>
        <!--内容-->
        <div style="width: 50%;height: 100%;background: #ffffff;position: absolute;right: 0;top: 0;z-index: 999">
          <div class="livemain">
            <div class="livemain_img">
              <img src="/images/move/guokaoweix.jpg" />
            </div>
            <div class="livemain_title">
              扫码关注国考历年分数线
            </div>
            <div class="livemain_content">
              由犀鸟公考打造，公务员招录，报名，考试指导，国考职位岗位查询。
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- 犀鸟听听 -->
    <div class="studymainbox" id="tingting_gomove">
      <div class="studymainbox_title">
        <p class="pa">犀鸟听听</p>
        <p class="pb"><span>版本：1.0.4</span>|<span>更新日期：2019.05.21</span></p>
      </div>
      <div class="studymainbox_bgloop">
        <!-- Swiper -->
        <!--          <el-carousel class="lun_imgs" ref="carousel" >-->
        <!--            <el-carousel-item class="lun_img" v-for="(item,index) in imgse" v-bind:key="index.url" >-->
        <!--              <img :src="item.url"/>-->
        <!--            </el-carousel-item>-->
        <!--          </el-carousel>-->
        <img src="/images/move/pic_tingting.png" alt="">
        <!--内容-->
        <div style="width: 50%;height: 100%;background: #ffffff;position: absolute;left: 0;top: 0;z-index: 999">
          <div class="livemain" style="left: 70px;">
            <div class="livemain_img">
              <img src="/images/move/xntingting.png" />
            </div>
            <div class="livemain_title">
              &nbsp;扫码关注犀鸟听听小程序
            </div>
            <div class="livemain_content">
              犀鸟听听是犀鸟公考的同类型辅助产品，犀鸟听听提供给考生热点的音频，方便考生利用碎片时间轻松的吸收关于公考的最新资讯。
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- 犀鸟课堂 -->
    <div class="studymainbox" id="live_gomove">
      <div class="studymainbox_title">
        <p class="pa">犀鸟课堂</p>
        <p class="pb"><span>版本：1.6.0</span>|<span>更新日期：2019.11.01</span></p>
      </div>
      <div class="studymainbox_bgloop">
        <!-- Swiper -->
        <el-carousel class="lun_imgs" ref="carousel">
          <el-carousel-item class="lun_img" v-for="(item,index) in imgsf" v-bind:key="index.url">
            <img :src="item.url" />
          </el-carousel-item>
        </el-carousel>
        <!--内容-->
        <div style="width: 50%;height: 100%;background: #ffffff;position: absolute;right: 0;top: 0;z-index: 999">
          <div class="livemain">
            <div class="livemain_img">
              <img src="/images/move/xnewm.jpg" />
            </div>
            <div class="livemain_title">
              扫码关注犀鸟课堂小程序
            </div>
            <div class="livemain_content">
              犀鸟课堂是犀鸟公考的高级课程看课平台。 犀鸟课堂通过比较科学的方式将众多公考名师课程设计成 易看、易懂、易测、易于学员学习的优质直播课程。内容 随时更新，考前预测，范文宝典，课后与老师互动交流巩
              固课堂知识要点。
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      imgsb: [
        {
          url: '/images/move/xibanqiu1.png',
          link: '/content1'
        },
        {
          url: '/images/move/xibanqiu2.png',
          link: '/content2'
        }
      ],
      imgsa: [
        {
          url: '/images/move/gongkao1.png',
          link: '/content1'
        },
        {
          url: '/images/move/gongkao2.png',
          link: '/content2'
        }
      ],
      imgsc: [
        {
          url: '/images/move/Shenlunjiafen1.png',
          link: '/content1'
        },
        {
          url: '/images/move/Shenlunjiafen2.png',
          link: '/content2'
        }
      ],
      imgsd: [
        {
          url: '/images/move/guokaoshenlun1.png',
          link: '/content1'
        },
        {
          url: '/images/move/guokaoshenlun2.png',
          link: '/content2'
        },
        {
          url: '/images/move/guokaoshenlun3.png',
          link: '/content2'
        }
      ],
      imgsf: [
        {
          url: '/images/move/ketang1.png',
          link: '/content1'
        },
        {
          url: '/images/move/ketang2.png',
          link: '/content2'
        }
      ]
    }
  },
  head() {
    return {
      title: '犀鸟公考-犀鸟公考 - 大学生职业教育服务平台 公考、招教、部队文职',
      meta: [
        {
          hid: "description",
          name: "description",
          content: "犀鸟公考，公考，招教，部队文职，公务员，事业单位，教师招聘，公务员考试网，国家公务员考试网，国考，省考，国家公务员考试，公务员培训"
        }, {
          hid: 'viewport',
          name: 'keywords',
          content: '犀鸟公考是大学生职业教育服务平台，通过“在线直播+督学系统+游戏化激励+AI”的方式，让考试有效也有趣！提供公务员、事业单位、教师招聘、部队文职等考试服务'
        }
      ]
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" >
@import "../../static/styles/movestufy.scss";
@import "../../static/styles/movestudy/index.scss";
</style>
