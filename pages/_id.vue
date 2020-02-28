<template>
<div class="app-container" id="school">
  <!--    banner-->
  <div class="dashboard-img" v-show="banners.length">
    <el-carousel class="lun_imgs" ref="carousel" @click.native="linkTo">
      <el-carousel-item class="lun_img" v-for="(item,index) in banners" v-bind:key="index.url">
        <img :src="item.img_url" class="bannerImg" @click="setbanner(item)" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <!--    地区切换-->
  <div id="tabs_first" v-show="campus_data.length">
    <ul>
      <li v-for="(items,index) in campus_data" :class="{active:num==index}" @mouseenter="table(index)" v-bind:key="index.url">
        {{items.name}}
      </li>
    </ul>
    <div class="tabContent">
      <div v-for="(items,index) in campus_data" v-show="index==num" v-bind:key="index.url" style="position: relative;display: flex;width: 1169px;flex-wrap: wrap">
        <div style="width: 44%;line-height: 30px;padding-left: 40px;display: inline-block;margin-bottom: 10px" v-for="item in items.learn_center_data">
          <div style="font-size: 16px;color: #333333;font-weight: 550">{{item.name}}</div>
          <div style="font-size: 14px;color: #666666;line-height: 20px" class="over-lists">地址：{{item.address}}</div>
          <div style="font-size: 14px;color: #666666">电话：{{item.phone}}</div>
        </div>
        <div style="position: absolute;right: 40px;top: -50px;text-align: center;height: 103px;cursor:pointer;margin-bottom: 35px" class="masImg">
          <img src="/images/icon/fenxiao-erweima.png" style="width: 72px;height: 45px">
          <div style="width: 72px;text-align: center;margin-bottom: 4px;" class="masImgs">
            <img :src="items.code_path" class="tutu" style="width: 100%">
          </div>
          <div style="font-size: 12px;color: #484d62">领取备考资料</div>
        </div>
      </div>
    </div>
  </div>
  <!--    岗位类型-->
  <div id="tabs_two">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item.name" v-bind:key="item.id" v-for="item in project_data">
        <div style="width: 1169px;margin: 14px auto;background: #ffffff;height: 349px;border-radius: 10px;overflow: hidden" v-show="ifarticle.length">
          <ul style="display: flex;list-style: none;padding-left: 0">
            <li style="width: 50%;padding: 0 20px" v-for="(items,index) in ifarticle" v-bind:key="index.url">
              <div class="Interlayers">
                <div style="color: #333333;font-size: 18px;">
                  <img v-if="ifarticle.length&&index === 0" src="/images/icon/fenxiao-zuo.png" style="margin-right: 2px;vertical-align: middle;width: 19px;height: 19px;margin-bottom: 3px">
                  <img v-if="ifarticle.length&&index === 1" src="/images/icon/fenxiao-you.png" style="margin-right: 2px;vertical-align: middle;width: 19px;height: 19px;margin-bottom: 3px">
                  <span style="font-weight: 550"> {{items.name}}</span>
                </div>
                <div style="cursor:pointer;;font-size: 14px;color: #666666;" @click="zhaokao(items)">更多 <img class="mustright" src="/images/gengduo.png" alt=""></div>
              </div>
              <div>
                <div v-if="index === 0">
                  <div style="display: flex;justify-content: space-between;cursor:pointer; " @click="setdetail(item)" v-for="(item,index) in items.data" v-bind:key="index.url">
                    <div v-if="index === 0" style="display: flex;margin-top: 10px;cursor:pointer;width: 100%">
                      <img v-if="item.ra_img_url&&item.ra_img_url!== ''" :src="item.ra_img_url" style="width: 150px;height: 80px;">
                      <img v-else src="/images/zhanwei-1.png" style="width: 150px;height: 80px;">
                      <div style="height: 54px;line-height: 28px;margin-left: 10px;width: 83%">
                        <div style="color: #333333;text-align: left;font-weight: 550;line-height: 23px;margin-bottom: 6px;height: 46px" class="fle over-lists">
                          <span style="color: #33ccd3" v-if="item.ra_sign_type === 1 || item.ra_sign_type === '1'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          <span style="color: #bdbdbd" v-if="item.ra_sign_type === 2 || item.ra_sign_type === '2'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          <span style="color: #e6213a" v-if="item.ra_sign_type === 3 || item.ra_sign_type === '3'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          <span style="color: #e6213a" v-if="item.ra_sign_type === 4 || item.ra_sign_type === '4'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          <span style="color: #bdbdbd" v-if="item.ra_sign_type === 5 || item.ra_sign_type === '5'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          {{item.rp_title}} | {{item.ra_title}}
                        </div>
                        <div style="display: flex;justify-content: space-between;font-size: 14px;color: #A8A8A8">
                          <div class="over-list" style="width: 303px">{{item.ra_abstract}}</div>
                          <div style="color: #999999;width: 70px;text-align: right">{{setTimedays(item.ra_release_date)}}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else style="display: flex;justify-content: space-between;white-space: nowrap;width: 100%;">
                      <div style="display: flex;font-size: 16px;margin-top: 10px;white-space:nowrap;width: 100%;overflow: hidden;max-width: 470px">
                        <div style="color: #333333">
                          <span style="font-weight: bold">
                            <span style="color: #33ccd3" v-if="item.ra_sign_type === 1 || item.ra_sign_type === '1'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                            <span style="color: #bdbdbd" v-if="item.ra_sign_type === 2 || item.ra_sign_type === '2'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                            <span style="color: #e6213a" v-if="item.ra_sign_type === 3 || item.ra_sign_type === '3'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                            <span style="color: #e6213a" v-if="item.ra_sign_type === 4 || item.ra_sign_type === '4'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                            <span style="color: #bdbdbd" v-if="item.ra_sign_type === 5 || item.ra_sign_type === '5'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          </span>
                          <span style="font-weight: bold;margin-right: 5px" v-show="item.rp_title">{{item.rp_title}}</span>
                        </div> |
                        <div class="over-list" style="margin-left: 5px;color: #666666">{{item.ra_title}} </div>
                      </div>
                      <div style="color:#A8A8A8;font-size: 14px;line-height: 37px">{{setTimedays(item.ra_release_date)}}</div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div style="display: flex;justify-content: space-between;cursor:pointer; " @click="setdetail(item)" v-for="(item,index) in items.data" v-bind:key="index.url">
                    <div v-if="index === 0" style="display: flex;margin-top: 10px;cursor:pointer;width: 100%">
                      <img v-if="item.ra_img_url&&item.ra_img_url!== ''" :src="item.ra_img_url" style="width: 150px;height: 80px;">
                      <img v-else src="/images/zhanwei-2.png" style="width: 150px;height: 80px;">
                      <div style="height: 54px;line-height: 28px;margin-left: 10px;width: 83%">
                        <div style="color: #333333;text-align: left;font-weight: 550;line-height: 23px;margin-bottom: 6px;height: 46px" class="fle over-lists">
                          <span style="color: #33ccd3" v-if="item.ra_sign_type === 1 || item.ra_sign_type === '1'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          <span style="color: #bdbdbd" v-if="item.ra_sign_type === 2 || item.ra_sign_type === '2'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          <span style="color: #e6213a" v-if="item.ra_sign_type === 3 || item.ra_sign_type === '3'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          <span style="color: #e6213a" v-if="item.ra_sign_type === 4 || item.ra_sign_type === '4'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          <span style="color: #bdbdbd" v-if="item.ra_sign_type === 5 || item.ra_sign_type === '5'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          {{item.rp_title}} | {{item.ra_title}}
                        </div>
                        <div style="display: flex;justify-content: space-between;font-size: 14px;color: #A8A8A8">
                          <div class="over-list" style="width: 303px">{{item.ra_abstract}}</div>
                          <div style="color: #999999;width: 70px;text-align: right">{{setTimedays(item.ra_release_date)}}</div>
                        </div>
                      </div>
                    </div>
                    <div v-else style="display: flex;justify-content: space-between;white-space: nowrap;width: 100%;">
                      <div style="display: flex;font-size: 16px;margin-top: 10px;white-space:nowrap;width: 100%;overflow: hidden;max-width: 470px">
                        <div style="color: #333333">
                          <span style="font-weight: bold">
                            <span style="color: #33ccd3" v-if="item.ra_sign_type === 1 || item.ra_sign_type === '1'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                            <span style="color: #bdbdbd" v-if="item.ra_sign_type === 2 || item.ra_sign_type === '2'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                            <span style="color: #e6213a" v-if="item.ra_sign_type === 3 || item.ra_sign_type === '3'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                            <span style="color: #e6213a" v-if="item.ra_sign_type === 4 || item.ra_sign_type === '4'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                            <span style="color: #bdbdbd" v-if="item.ra_sign_type === 5 || item.ra_sign_type === '5'" v-show="item.ra_sign_status">·{{item.ra_sign_status}}·</span>
                          </span>
                          <span style="font-weight: bold;margin-right: 5px" v-show="item.rp_title">{{item.rp_title}}</span>
                        </div> |
                        <div class="over-list" style="margin-left: 5px;color: #666666">{{item.ra_title}} </div>
                      </div>
                      <div style="color:#A8A8A8;font-size: 14px;line-height: 37px">{{setTimedays(item.ra_release_date)}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!--    公开课-->
  <div class="Interlayer" style="margin-bottom: 5px" v-show="free.length">
    <div style="color: #333333"><b> 公开课</b></div>
    <div @click="openmove" style="cursor:pointer;;font-size: 14px;color: #666666;margin-right: 20px">更多 <img class="mustright" src="/images/gengduo.png" alt=""></div>
  </div>
  <div id="moveImg">
    <div class="lc">
      <div class="items">
        <div class="right">
          <div class="Scroll-left">
            <!--              <div class="hd" style="display: none;"> <a class="next">&lt;</a><a class="prev">&gt;</a></div>-->
            <div class="bd">
              <ul class="picList" style="display: flex;padding-left: 0;margin-top: 0">
                <li v-for="(item,index) in free" v-bind:key="index.url" style="position: relative" class="piclist_head" @click="GKlist(item)" @mouseenter="tablea(index)" @mouseleave="tablesa">
                  <img :src="item.cover" style="object-fit:cover">
                  <img v-if="ass === true" v-show="index==num1" src="/images/icon/bofang.png" style="position: absolute;max-width: 35px;max-height: 35px;left: 42%;top: 25%">
                  <p class="p3 over-lists" style="height: 40px;">{{item.name}}</p>
                  <p class="p4"><img src="/images/icon/laoshi.png" style="vertical-align: middle;width: 16px;height: 13px;color: #9AABB8">{{item.teacher_name}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="Interlayer" v-show="courselist.length">
    <div style="color: #333333;margin-top: 10px"><b> 推荐课程</b></div>
    <div style="margin-top: 10px;cursor:pointer;;font-size: 14px;color: #666666;margin-right: 20px" @click="opencurriculums">更多 <img class="mustright" src="/images/gengduo.png" alt=""></div>
  </div>
  <div class="orderthid" style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: space-between;margin-bottom: 100px">
    <div class="hoverlist d1-1" style="height: 363px;display: inline-block;width: 32%;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(item,index) in courselist" v-bind:key="index.url">
      <!--线上课程-->
      <div v-if="item.recommend_type === 1&&item.type === 3" @click="setdetails(item)" style="width: 100%;display: inline-block;padding: 30px 30px 14px 30px;cursor:pointer;">
        <div style="color: #33CCD3;height: 18px">{{ item.label_str }}</div>
        <h2 style="color: #333333;margin: 10px 0" class="only-one">{{ item.coursename }}</h2>
        <p style="color: #999999;margin-top: 0" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!== ''">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
        <div style="display: flex;overflow: hidden">
          <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
            <div style="margin: 0 6px">
              <img style="width: 95px;height: 121px;vertical-align:bottom;object-fit:cover" :src="itemlist.photo_url">
              <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">{{ itemlist.teacher_nickname }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 26px;align-items: center;height: 40px;line-height: 40px">
          <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.order_number }}</span> 人</div>
          <div v-if="item.price !== 0" style="color: #E6213A;font-weight: bold;font-size: 14px">RMB<span style="font-size: 24px;">{{ item.price }}</span></div>
          <div v-else style="color: #E6213A"><span style="font-size: 24px;font-weight: bold">免费</span></div>
        </div>
      </div>
      <!--团购课-->
      <div v-if="item.recommend_type === 1&&item.type === 8" @click="setdetails(item)" style="width: 100%;display: inline-block;padding: 30px 30px 14px 30px;cursor:pointer;">
        <div style="color: #33CCD3;height: 18px">{{ item.label_str }}</div>
        <h2 style="color: #333333;margin: 10px 0" class="only-one">{{ item.coursename }}</h2>
        <p style="color: #999999;margin-top: 0" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!== ''">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
        <div style="display: flex;overflow: hidden">
          <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
            <div style="margin: 0 6px">
              <img style="width: 95px;height: 121px;vertical-align:bottom;object-fit:cover" :src="itemlist.photo_url">
              <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">{{ itemlist.teacher_nickname }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 20px;align-items: center">
          <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.assemble_num }}</span> 人</div>
          <div v-if="item.price !== 0" style="color: #E6213A;font-weight: bold;font-size: 14px"><img src="/images/icon/tuan.png" style="width: 18px;height: 20px;margin-right: 4px" alt="">RMB<span style="font-size: 24px;">{{ item.assemble_price }}</span></div>
          <div v-else style="color: #E6213A"><span style="font-size: 24px;font-weight: bold">免费</span></div>
        </div>
      </div>
      <!--课程包-->
      <div v-if="item.recommend_type === 1&&item.type === 2" @click="setdetails(item)" style="width: 100%;display: inline-block;padding-top: 24px;cursor:pointer;">
        <div style="color: #33CCD3;padding: 0 20px">{{ item.label_str }}</div>
        <h2 style="color:#333333;margin: 14px 0 0;margin-bottom: 0;padding: 0 20px" class="only-one">{{ item.coursename }}</h2>
        <img :src="item.course_image" style="width: 100%;height: 280px;object-fit:cover;border-radius:  0 0 10px 10px ">
      </div>
      <!--广告课-->
      <div v-if="item.recommend_type === 1&&item.type === 7" @click="setdetails(item)" style="width: 100%;display: inline-block;border-radius: 10px;cursor:pointer;">
        <img :src="item.course_image" style="width: 100%;border-radius: 10px 10px 0 0;height: 250px;object-fit:cover">
        <div style="padding: 10px 20px 20px 20px">
          <h2 style="color:#333333;margin: 16px 0" class="only-one">{{ item.coursename }}</h2>
          <div style="color: #999999;font-size: 14px" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!== ''">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</div>
        </div>
      </div>
      <!--打卡营-->
      <div v-if="item.recommend_type === 2" @click="dakaying(item)" style="width: 100%;display: inline-block;border-radius: 10px;cursor:pointer;">
        <img :src="item.cover" style="width: 100%;height: 250px;border-radius: 10px 10px 0 0;object-fit:cover ">
        <div style="padding: 10px 20px 10px 20px">
          <h2 style="color:#333333;margin: 10px 0" class="only-one">{{item.name}}</h2>
          <div style="color: #999999;font-size: 14px">
            <ul style="list-style: none;display: flex;justify-content: space-between;padding-left: 0;align-items: center">
              <li>已报 <span style="color: #33CCD3;margin-right: 8px">{{item.totalBuys}}</span>人 {{item.lecturer_name}}</li>
              <!-- <li><span class="DK">学完全返</span> <span style="color: #E6213A;font-size: 10px"> RMB <span style="font-size: 23px;font-weight: bold">{{item.price}}</span></span></li> -->

              <li><span style="color: #E6213A;font-size: 10px"> RMB <span style="font-size: 23px;font-weight: bold">{{item.price}}</span></span></li>
            </ul>
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
  branchDetailsv2,
  branchIndexv2
} from '@/api/user'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      campus_id: 1,
      banners: '',
      activeName: '',
      plates: '',
      menulist: '',
      index: 0,
      num: 0,
      num1: 0,
      courselist: '',
      campus_data: '',
      project_data: '',
      free: '',
      article0: '',
      article1: '',
      ass: false,
      ifarticle: ''
    }
  },
  created() {
    console.log(this.$route)
    const { id } = this.$route.params;
    console.log('id', id);
    switch (id) {
      case 'hunan':
        this.campus_id = 1;
        break;
      case 'shandong':
        this.campus_id = 2;
        break;
      default:
        this.campus_id = 1;
        break;
    }
    this.newDay()
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
  mounted() {
    $(document).ready(function () {
      $('.piclist_head').hover(function () {
        $(this).find('.play_mp4').removeClass('play_mp4ed').toggle()
      })
    })
  },
  methods: {
    table(index) {
      this.num = index
    },
    tablea(index) {
      this.ass = true
      this.num1 = index
    },
    tablesa() {
      this.ass = false
    },
    handleClick(tab, event) {
      this.courselist = ''
      this.free = ''
      this.ifarticle = ''
      this.article0 = ''
      this.article1 = ''
      info('').then(res => {
        const timestamp = res
        const optionsa = {
          campus_id: this.campus_id,
          project_id: tab.$vnode.key,
          timestamp: timestamp
        }
        branchIndexv2(optionsa).then(res => {
          if (res.code === 100) {
            this.courselist = res.data.recommend_course
            this.free = res.data.free
            this.ifarticle = res.data.article
            this.article0 = res.data.article[0]
            this.article1 = res.data.article[1]
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
    newDay() {
      info('').then(res => {
        const timestamp = res
        const options = {
          campus_id: this.campus_id,
          timestamp: timestamp
        }
        branchDetailsv2(options).then(res => {
          if (res.code === 100) {
            this.banners = res.data.banners
            this.campus_data = res.data.campus_data
            this.project_data = res.data.project_data
          } else {
            this.$alert(res.message, {
              callback: action => {
                this.$router.back(-1)
              }
            })
          }
        })
        const optionsa = {
          campus_id: this.campus_id,
          project_id: 0,
          timestamp: timestamp
        }
        branchIndexv2(optionsa).then(res => {
          if (res.code === 100) {
            this.courselist = res.data.recommend_course
            this.free = res.data.free
            this.ifarticle = res.data.article
            this.article0 = res.data.article[0]
            this.article1 = res.data.article[1]
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
    linkTo() {
      var activeIndex = this.$refs.carousel.activeIndex
      this.$router.push(this.imgs[activeIndex].link)
    },
    setbanner(item) {
      if (item.redirect_url !== '') {
        window.open(item.redirect_url, '_blank')
      }
    },
    setTimedays(time) {
      if (time > 0) {
        var result
        time = parseInt(time * 1000)
        var minute = 1000 * 60
        var hour = minute * 60
        var day = hour * 24
        var month = day * 30
        var now = new Date().getTime()
        var diffValue = now - time
        if (diffValue < 0) {
          return
        }
        var monthC = diffValue / month
        var weekC = diffValue / (7 * day)
        var dayC = diffValue / day
        var hourC = diffValue / hour
        var minC = diffValue / minute
        if (monthC >= 1) {
          if (monthC <= 12) {
            result = dayjs(time).format('MM-DD')
          } else {
            result = dayjs(time).format('MM-DD')
          }
        } else if (weekC >= 1) {
          result = dayjs(time).format('MM-DD')
        } else if (dayC >= 1) {
          result = dayjs(time).format('MM-DD')
        } else if (hourC >= 1) {
          result = '' + parseInt(hourC) + '小时前'
        } else if (minC >= 1) {
          result = '' + parseInt(minC) + '分钟前'
        } else {
          result = '刚刚'
        }
        return result
      } else {
        return ''
      }
    },
    setdetails(item) {
      if (item.type === 2) {
        this.$router.push({
          path: '/curriculumlist',
          query: {
            itemlist: item.id,
            campus_id: this.campus_id
          }
        })
      } else if (item.type === 3 || item.type === 8) {
        this.$router.push({
          path: '/example/details',
          query: {
            itemlist: item.id,
            campus_id: this.campus_id
          }
        })
      } else if (item.relate_type === 7) {
        if (item.target_way === 1) {
          if (item.target_url !== '') {
            window.open(item.target_url, '_blank')
          } else {
            return
          }
        } else {
          this.$router.push({
            path: '/example/details',
            query: {
              itemlist: item.target_url
            }
          })
        }
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
    openmove() {
      this.$router.push({
        path: '/example/openress',
        query: {
          campus_id: this.campus_id
        }
      })
    },
    opencurriculums() {
      this.$router.push({
        path: '/example/opencurriculums',
        query: {
          campus_id: this.campus_id
        }
      })
    },
    setdetail(item) {
      this.$router.push({
        path: '/ziliao/menulist',
        query: {
          detail: item.ra_id,
          campus_id: this.campus_id
        }
      })
    },
    zhaokao(items) {
      console.log('1111', items)
      this.$router.push({
        path: '/nested/menu',
        query: {
          campus_id: this.campus_id,
          tabs: items.id
        }
      })
    },
    // zanshi
    dakaying(item) {
      this.$router.push({
        path: '/example/DKdetails',
        query: {
          itemlist: item.id,
          campus_id: this.campus_id
        }
      })
    },
    GKlist(item) {
      this.$router.push({
        path: '/GKword/GKK',
        query: {
          itemlist: item.id,
          campus_id: this.campus_id
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "../static/styles/table/index.scss";
</style>
