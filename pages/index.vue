<template>
<div id="fisindex" class="app-container">
  <!--    banner-->
  <div class="dashboard-container">
    <div class="dashboard-img">
      <el-carousel class="lun_imgs" ref="carousel" @click.native="linkTo">
        <el-carousel-item class="lun_img" v-for="(item,index) in banners" v-bind:key="index.url">
          <img :src="item.img_url" class="bannerImg" @click="setbanner(item)" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--      banner右边资讯-->
    <div class="dashboard-font">
      <div style="position: relative">
        <div style="color: #333333;font-size: 18px;padding-top: 18px;font-weight: 550;width: 95%;padding-bottom: 8px">犀头条
          <div style="float: right;width: 55px;cursor:pointer;font-size: 14px;color: #666666;margin-top: 2px;font-weight: normal" @click="pinpai">更多
            <img class="mustright" src="/images/gengduo.png" style="vertical-align: middle;margin-bottom: 2px">
          </div>
        </div>
        <div style="width: 92%;margin-top: 10px" class="firstched">
          <div v-for="(item,index) in news" v-bind:key="index.url" class="over-list over-list-all" style="height: 81px;width: 100%;cursor:pointer;" @click="pinpais(item)">
            <img :src="item.cover" class="firstchedlist" style="height: 71px">
            <div style="height: 54px;line-height: 28px">
              <div style="color: #333333;text-align: left;height: 49px;line-height: 24px" class="fle over-listsbanner">{{ item.title }}</div>
              <div style="display: flex;justify-content: space-between;font-size: 12px;">
                <div style="color: #999999;width: 100px" class="over-listsss">{{ item.source }}</div>
                <div style="color: #999999;width: 100px" class="over-listsss">{{ item.exam_area }}</div>
                <!--                  <div style="color: #999999;width: 65px;text-align: right">{{ setTimedays(item.regdate).replace(/\-/g,".") }}</div>-->
                <div style="color: #999999;width: 65px;text-align: right">{{ setTimedays(item.create_time).replace(/\-/g,".") }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--    banner下面资讯-->
  <div style="background: #ffffff;width: 1169px;margin: 0 auto;padding: 12px 30px;height: 360px;border-radius: 10px;margin-top: 40px">
    <div id="fontlist" style="display: flex;justify-content: space-between">
      <div class="dashboard-font">
        <div style="position: relative">
          <el-tabs v-model="activeName" @tab-click="handleClicks">
            <el-tab-pane :label="item.title" v-bind:key="item.id" v-for="item in columns">
              <div v-if="item.id === 5 || item.id === '5'" style=" display: block;width: 98%" class="firstched">
                <div v-for="(item,index) in articles" v-bind:key="index.url" style="border: none;display: flex;width: 100%;height: 30px;color: #2B3E50;justify-content: space-between;align-items: center;margin: 10px 0">
                  <div style="display: flex;align-items: center">
                    <img :src="item.img_url" style="width: 32px;height: 27px;margin-right: 10px">
                    <div style="max-width: 500px;white-space:nowrap;">{{item.plate}}</div>丨<div class="only-one" style="max-width: 500px">{{ item.title }}</div>
                  </div>
                  <div style="display: flex;justify-content: space-between;font-size: 12px">
                    <div style="color: #999999;width: 70px;text-align: right">{{ setTimedays(item.regdate).replace(/\-/g,".") }}</div>
                  </div>
                </div>
              </div>
              <div v-else style=" display: block;width: 98%;" class="firstched">
                <div v-for="(item,index) in articles" v-bind:key="index.url" class="over-list over-list-all" style="display: inline-block;width: 100%;cursor:pointer;" @click="setdetaila(item)">
                  <img v-if="item.img_url&&item.img_url!== ''" :src="item.img_url" class="firstchedlist">
                  <img v-else src="/images/zhanwei-1.png" class="firstchedlist">
                  <div class="case_twolast" style="height: 33px;line-height: 33px">
                    <div style="text-align: left;" class="fle over-lists">
                      <span style="color: #33ccd3" v-if="item.sign_code === 1 || item.sign_code === '1'" v-show="item.sign_status">·{{item.sign_status}}·</span>
                      <span style="color: #bdbdbd" v-if="item.sign_code === 2 || item.sign_code === '2'" v-show="item.sign_status">·{{item.sign_status}}·</span>
                      <span style="color: #e6213a" v-if="item.sign_code === 3 || item.sign_code === '3'" v-show="item.sign_status">·{{item.sign_status}}·</span>
                      <span style="color: #e6213a" v-if="item.sign_code === 4 || item.sign_code === '4'" v-show="item.sign_status">·{{item.sign_status}}·</span>
                      <span style="color: #bdbdbd" v-if="item.sign_code === 5 || item.sign_code === '5'" v-show="item.sign_status">·{{item.sign_status}}·</span>
                      <span style="font-weight: 600; columns: #333333;">{{item.plate}}</span> 丨{{ item.title }}</div>
                    <div v-if="index === 0" style="margin-top: 20px;color: #999999;width: 70px;text-align: right;float: right;font-size: 12px">{{ setTimedays(item.regdate).replace(/\-/g,".") }}</div>
                    <div v-if="index === 0" style="color: #A8A8A8;font-size: 14px;line-height: 23px;font-weight: normal" class="only-two">{{item.abstract}}</div>
                    <div style="display: flex;justify-content: space-between;font-size: 12px" v-else>
                      <div style="color: #999999;width: 70px;text-align: right">{{ setTimedays(item.regdate).replace(/\-/g,".") }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div style="position: absolute;right: 0;top: 5px;width: 55px;height: 40px;line-height: 40px;cursor:pointer;font-size: 14px;color: #666666;font-weight: normal" @click="movemust">更多
            <img class="mustright" src="/images/gengduo.png" alt="">
          </div>
        </div>
      </div>
      <!--        考试相关-->
      <div style="width: 370px;margin-top: 13px">
        <div style="border-bottom: 1px dashed #dedede;color: #333333;font-size: 18px;padding-bottom: 16px;font-weight: 550">考试相关</div>
        <div style="display: flex;margin-top: 19px;flex-flow: wrap;justify-content: space-between">
          <div v-for="(item,index) in bkBanners" v-bind:key="index.url" style="display: inline-block;width: 178px">
            <img :src="item.img_url" style="width: 178px;height: 115px;border-radius: 6px;margin-bottom: 11px;cursor:pointer;" @click="openyousboom(item)">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="Gktitele" v-show="labels.length">
    <div class="GK tes" style="margin-top: 40px">
      <div class="GA" style="position: absolute;left: 0;top: 0">公考百科</div>
      <el-tabs v-model="activeNames" @tab-click="handleClickBK">
        <el-tab-pane :label="item.name" v-bind:key="item.id" v-for="item in labels">
          <!--      公开课-->
          <div id="moveImg">
            <div class="lc">
              <div class="items">
                <div class="right">
                  <div class="Scroll-left">
                    <div class="bd">
                      <ul class="picList" style="display: flex;padding-left: 0;margin-top: 0;height: 215px">
                        <li style="position: relative" class="piclist_head x1-xx" v-for="(item,index) in bkArticles" v-bind:key="index.url" @click="gobaike(item)" @mouseenter="tableaQ(index)" @mouseleave="tablesa">
                          <img :src="item.cover" style="object-fit:cover;height: 121px">
                          <img v-if="assQ === true" v-show="index==num1Q" src="/images/icon/bofang.png" style="position: absolute;max-width: 35px;max-height: 35px;left: 42%;top: 25%">
                          <p class="p3 only-over-lists">{{item.title}}</p>
                          <p class="p4"><img src="/images/icon/riqi.png" style="vertical-align: middle;width: 13px;margin-bottom: 2px;height: 13px;color: #9AABB8"> {{(item.create_time).replace(/\-/g,".").substring(0,10)}}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div @click="setbaike" style="position: absolute;right: 20px;top: 0;width: 55px;height: 40px;line-height: 40px;cursor:pointer;font-size: 14px;color: #666666;font-weight: normal">更多
        <img class="mustright" src="/images/gengduo.png" style="vertical-align: middle;margin-bottom: 2px">
      </div>
    </div>
    <div class="GK" v-show="free.length" style="margin-top: 30px">
      <div class="GA">公开课</div>
      <div style="position: absolute;right: 20px;top: 0;width: 55px;height: 40px;line-height: 40px;cursor:pointer;font-size: 14px;color: #666666;margin-top: 2px;font-weight: normal" @click="GKmust">更多
        <img class="mustright" src="/images/gengduo.png" style="vertical-align: middle;margin-bottom: 2px">
      </div>
    </div>
    <div id="moveImg">
      <div class="lc">
        <div class="items">
          <div class="right">
            <div class="Scroll-left">
              <div class="bd">
                <ul class="picList" style="display: flex;padding-left: 0;margin-top: 0">
                  <li v-for="(item,index) in free" v-bind:key="index.url" style="position: relative" class="piclist_head" @click="GKlist(item)" @mouseenter="tablea(index)" @mouseleave="tablesa">
                    <img :src="item.cover" style="object-fit:cover">
                    <img v-if="ass === true" v-show="index==num1" src="/images/icon/bofang.png" style="position: absolute;max-width: 35px;max-height: 35px;left: 42%;top: 25%">
                    <p class="p3 only-over-lists">{{item.name}}</p>
                    <p class="p4"><img src="/images/icon/laoshi.png" style="vertical-align: middle;width: 16px;height: 13px;color: #9AABB8;margin-right: 5px">{{item.teacher_nickname}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--    课程-->
  <div class="Interlayer" v-show="courselist.length">
    <div style="margin-left: 20px;color: #333333;font-size: 18px"><b>热门课程</b></div>
    <div style="cursor:pointer;font-size: 14px;color: #666666;margin-right: 30px;font-weight: normal" @click="setguokao">更多 <img class="mustright" src="/images/gengduo.png" style="vertical-align: middle"></div>
  </div>
  <div class="d1 orderthid" style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: space-between">
    <div class="hoverlist d1-1" style="display: inline-block;width: 32%;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;height: 363px;overflow: hidden" v-for="(item,index) in courselist" v-bind:key="index.url">
      <!--线上课程-->
      <div v-if="item.type === 1&&item.relate_type === 3" @click="setdetails(item)" style="width: 100%;display: inline-block;padding: 30px 30px 14px 30px;cursor:pointer;">
        <div style="color: #33CCD3;height: 18px">{{ item.label_str }}</div>
        <h2 style="color: #333333;margin: 10px 0" class="only-one">{{ item.title }}</h2>
        <p style="color: #999999;margin-top: 0" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!== ''">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
        <div style="display: flex;overflow: hidden">
          <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
            <div style="margin: 0 6px">
              <img style="width: 95px;height: 121px;vertical-align:bottom" :src="itemlist.photo_url">
              <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">{{ itemlist.teacher_nickname }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 20px;align-items: center">
          <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.buys }}</span> 人</div>
          <div v-if="item.price !== 0" style="color: #E6213A;font-weight: bold;font-size: 14px">RMB<span style="font-size: 24px;">{{ item.price }}</span></div>
          <div v-else style="color: #E6213A"><span style="font-size: 24px;font-weight: bold">免费</span></div>
        </div>
      </div>
      <!--团购课-->
      <div v-if="item.type === 1&&item.relate_type === 8" @click="setdetails(item)" style="width: 100%;display: inline-block;padding: 30px 30px 14px 30px;cursor:pointer;">
        <div style="color: #33CCD3;height: 18px">{{ item.label_str }}</div>
        <h2 style="color: #333333;margin: 10px 0" class="only-one">{{ item.title }}</h2>
        <p style="color: #999999;margin-top: 0" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!== ''">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
        <div style="display: flex;overflow: hidden">
          <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
            <div style="margin: 0 6px">
              <img style="width: 95px;height: 121px;vertical-align:bottom" :src="itemlist.photo_url">
              <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">{{ itemlist.teacher_nickname }}</div>
            </div>
          </div>
        </div>
        <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 20px;align-items: center">
          <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.buys }}</span> 人</div>
          <div v-if="item.assemble_price !== 0" style="color: #E6213A;font-weight: bold;font-size: 14px"><img src="/images/icon/tuan.png" style="width: 18px;height: 20px;margin-right: 4px" alt="">RMB<span style="font-size: 24px;">{{ item.assemble_price }}</span></div>
          <div v-else style="color: #E6213A"><span style="font-size: 24px;font-weight: bold">免费</span></div>
        </div>
      </div>
      <!--课程包-->
      <div v-if="item.type === 1&&item.relate_type === 2" @click="setdetails(item)" style="width: 100%;display: inline-block;padding-top: 20px;cursor:pointer;">
        <div style="color: #33CCD3;padding: 0 20px">{{ item.label_str }}</div>
        <h2 style="color:#333333;margin: 10px 0;padding: 0 20px " class="only-one">{{ item.title }}</h2>
        <img :src="item.cover" style="width: 100%;height: 280px;object-fit:cover;border-radius: 0 0 10px 10px ">
      </div>
      <!--广告课-->
      <div v-if="item.type === 1&&item.relate_type === 7" @click="setdetails(item)" style="width: 100%;display: inline-block;border-radius: 10px;cursor:pointer;">
        <img :src="item.cover" style="width: 100%;border-radius: 10px 10px 0 0;height: 250px">
        <div style="padding: 10px 20px 20px 20px;">
          <h2 style="color:#333333;margin: 16px 0" class="only-one">{{ item.title }}</h2>
          <div style="color: #999999;font-size: 16px" v-if="item.start_time&&item.start_time!==''&&item.end_time&&item.end_time!== ''">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</div>
        </div>
      </div>
      <!--打卡营-->
      <div v-if="item.type === 2" @click="dakaying(item)" style="width: 100%;display: inline-block;border-radius: 10px;cursor:pointer;">
        <img :src="item.cover" style="width: 100%;height: 250px;border-radius: 10px 10px 0 0 ">
        <div style="padding: 10px 20px 10px 20px">
          <h2 style="color:#333333;margin: 10px 0" class="only-one">{{item.title}}</h2>
          <div style="color: #999999;font-size: 14px">
            <ul style="list-style: none;display: flex;justify-content: space-between;padding-left: 0;align-items: center">
              <li>已报 <span style="color: #33CCD3;margin-right: 8px">{{item.buys}}</span>人 主讲：{{item.lecturer}}</li>
              <!-- <li><span class="DK">学完全返</span> <span style="color: #E6213A;font-size: 10px"> RMB <span style="font-size: 23px;font-weight: bold">{{item.price}}</span></span></li> -->

              <li><span style="color: #E6213A;font-size: 10px"> RMB <span style="font-size: 23px;font-weight: bold">{{item.price}}</span></span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="Interlayer" style="margin-top: 0" v-show="callx.length">
    <div style="color: #333333;font-size: 18px"><img src="/images/icon/xi.png" alt=""><b> 犀半球</b></div>
    <div style="cursor:pointer;;font-size: 14px;color: #666666;margin-right: 30px;visibility: hidden;font-weight: normal">更多 <img class="mustright" src="/images/gengduo.png" alt=""></div>
  </div>
  <!--    犀半球-->
  <div id="video_xi" style="width: 1169px;height: 1000px;background: #ffffff;margin: 1% auto;border-radius: 10px">
    <div id="Gktitele" style="display: flex;justify-content: space-between;padding-top: 16px">
      <div class="GK tess" style="width: 740px;padding-left: 20px;display: block">
        <div style="display: flex;padding-bottom: 9px">
          <div class="GA" style="margin: 0 30px 0 10px;position: absolute;left: 20px;top: 0">明星打CALL</div>
          <el-tabs v-model="activeNamexx" @tab-click="handleClickcall">
            <el-tab-pane :label="item.title" v-bind:key="item.id" v-for="item in callx">
              <div style="margin-left: 12px;border-top: 1px dashed #dedede;padding-top: 24px;position: relative" @click="bofangthis(item)">
                <!-- <img v-if="videoioen === true" :src="item.cover_img" style="width: 707px;height: 398px;border-radius: 6px;object-fit:cover"> -->
                <!-- <img v-if="videoioen === true" src="/images/icon/bofang.png" style="position: absolute;left: 22px;bottom: 41px;width: 54px;height: 54px"> -->
                <!-- <video v-if="videoioen === false" controls="controls" autoplay="autoplay" style="width: 707px;height: auto" width="100%" height="auto" :src="casevideo"></video> -->
                <!-- <video-player
                                  ref="videoPlayer"
                                  class="video-player vjs-custom-skin"
                                  :playsinline="true"
                                  :options="playerOptions"
                                  @play="onPlayerPlay($event)"
                                  @pause="onPlayerPause($event)" style="width: 700px;" /> -->
                <video
                  controls="controls"
                  style="max-height: 600px;width: 700px"
                  width="100%"
                  height="auto"
                  :src="callx[tabIndex].video">
                </video>
                <!-- <div
                  class="video-player-box video-player vjs-custom-skin"
                  :playsinline="true"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  style="width: 700px;"
                  v-if="callx[tabIndex].video!=''"
                  v-video-player:myVideoPlayer="playerOptions">
                </div> -->
              </div>
            </el-tab-pane>
          </el-tabs>
          <div style="position: absolute;right: -10px;top: 0;width: 55px;height: 40px;line-height: 40px;cursor:pointer;font-size: 14px;color: #666666;margin-top: 2px;font-weight: normal" @click="openMX">更多
            <img class="mustright" src="/images/gengduo.png" style="vertical-align: middle;margin-bottom: 2px">
          </div>
        </div>
      </div>
      <!--        公考浆糊-->
      <div style="padding-right: 30px">
        <div style="width: 370px;margin-top: 11px">
          <div style="border-bottom: 1px dashed #dedede;color: #333333;font-size: 18px;padding-bottom: 9px;font-weight: 550">公考浆糊
            <div style="font-weight: normal;float: right;width: 55px;height: 40px;cursor:pointer;font-size: 14px;color: #666666;margin-top: 2px" @click="GKjh">更多
              <img class="mustright" src="/images/gengduo.png" style="vertical-align: middle;margin-bottom: 2px">
            </div>
          </div>
          <div style="display: flex;margin-top: 24px;flex-flow: wrap;justify-content: space-between">
            <div v-for="(item,index) in cartoon" v-bind:key="index.url" style="display: inline-block;width: 178px" @click="gongkaojianghu(item)">
              <img :src="item.cover_img" style="width: 178px;height: 130px;border-radius: 6px;margin-bottom: 17px;object-fit:cover">
              <div style="color: #3f3b3a;margin-bottom: 20px;line-height: 20px" class="only-over-lists">{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="position: relative;padding: 0 30px">
      <el-tabs v-model="activeNamex" @tab-click="handleClickxbq">
        <el-tab-pane :label="item.name" v-bind:key="item.id" v-for="item in columnsx">
          <div style=" display: flex;justify-content: space-between; flex-wrap: wrap;justify-items: center;text-align: justify">
            <div v-for="(item,index) in notesx" v-bind:key="index.url" style="cursor:pointer;position: relative" :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" @click="setdetail(item)">
              <img :src="item.cover_img" class="firstchedlistss">
              <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;max-width: 35px;max-height: 35px;left: 42%;top: 45%">
            </div>
            <div v-for="item in (row-len%row)" v-if="len%row > 0" v-bind:key="item.url" class="list"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div style="font-weight: normal;position: absolute;right: 30px;top: 5px;width: 55px;height: 45px;line-height: 35px;cursor:pointer;font-size: 14px;color: #666666" @click="videoLibrary">更多
        <img class="mustright" src="/images/gengduo.png" alt="">
      </div>
    </div>
  </div>
  <!--    关于犀鸟-->
  <div class="footer">
    <div class="titele-xiniao" style="font-size: 18px">关于犀鸟</div>
    <ul>
      <li><img src="/images/guanyuxiniao1.png" style="width: 364px;height: 240px"></li>
      <li class="homework">
        <div>
          <div style="font-size: 14px;border-bottom: 1px dashed #dedede;padding-bottom:15px;line-height: 24px;padding-top: 5px;color: #333333">
            犀鸟教育由一帮对教育始终“ 念念不忘 ”的80后联合创立，创始团队每一个人都有10年以上的行业经验，犀鸟以大学生考试为核心业务，坚持做一家不一样的教育公司。<br>
            第一：以“<span style="color: #33ccd3"> 线下授课+线上做课后辅导督学</span> ”的产品方式来最大限度的提升通过率；
            第二：超强督学的模式，逼每一个学生都能坚持下去；
            第三：老师全程跟踪，随时答疑，一直服务到考前；
            第四：游戏化产品设计，让学习不枯燥。<br>
            犀鸟旗下品牌包括：
            <span style="color: #33ccd3">犀鸟公考、 跳兔考研、花象教师、肥狐金融、学长请回答、犀半球。</span></div>
          <div style="padding-top: 17px"><a href="https://mp.weixin.qq.com/s/tIcnLUm-_frz-1ro-Qr2zA" target="_blank" class="ohho">【群星祝福】这些明星送来了2020上岸祝福，点进来看有没有你的pick？</a></div>
          <div style="margin-top: 10px"><a href="http://guoqing.china.com.cn/2019-10/11/content_75291900.htm" target="_blank" class="ohho">【品牌新闻】犀鸟公考独创个性化培训 助力大学生一次上岸</a></div>
        </div>
      </li>
    </ul>
  </div>
  <div id="indexid">
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_list">
      <video controls="controls" width="100%" height="auto" :src="openvideo"></video>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleshu" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_list1">
      <div></div>
      <video controls="controls" style="max-height: 600px;max-width: 400px" width="100%" height="auto" :src="openvideo"></video>

    </el-dialog>
  </div>
</div>
</template>

<script>
import {
  homeXbqv2,
  info,
  homev2,
  referencev2,
  homeCoursev2,
  bkv2,
  xbqv2,
  seov2
} from '~/api/user';
import dayjs from 'dayjs'
export default {
  name: 'Dashboard',
  data() {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [],
        hls: true,
        poster: 'http://pic33.nipic.com/20131007/13639685_123501617185_2.jpg', // 你的封面地址
        // width: document.documentElement.clientWidth, // 播放器宽度
        width: '800px', // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      platform: 'pc',
      activeName: '',
      activeNamex: '',
      activeNamexx: '',
      activeNames: '',
      dialogVisible: false,
      videonum: '',
      courselist: '',
      openvideo: '',
      banners: [],
      news: '',
      columns: '',
      columnsx: '',
      notesx: '',
      callx: [],
      row: 5,
      len: '',
      bkBanners: [],
      cartoon: '',
      infolist: '',
      imgstype: '',
      timeNew: false,
      dialogVisibleshu: false,
      index: null,
      num: null,
      num1Q: null,
      bkArticles: '',
      labels: '',
      articles: '',
      free: '',
      ass: false,
      assQ: false,
      videoioen: true,
      casevideo: '',
      makeit: '',
      tabIndex: 0
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
    this.homev2()
    this.homeXbqv2()
    this.kc()
  },
  methods: {
    // v2
    kc() {
      info('').then(res => {
        const timestamp = res;
        const optionsa = {
          campus_id: 0,
          project_id: 0,
          timestamp: timestamp
        }
        homeCoursev2(optionsa).then(json => {
          console.log('json', json);
          if (json.code === 100) {
            this.courselist = json.data.recommend
            this.free = json.data.free
          } else if (json.code === 201 || json.code === 202 || json.code === 203) {
            window.localStorage.clear()
            history.go(0) // 刷新
            this.$router.push({
              path: '/dashboard'
            })
          } else {
            console.log(res.data.message)
          }
        })
      })
    },
    homev2() {
      info('').then(res => {
        const timestamp = res;
        const options = {
          timestamp1: timestamp
        }
        homev2(options).then(res => {
          console.log('res', res)
          if (res.code === 100) {
            this.banners = res.data.banners
            this.news = res.data.news
            this.columns = res.data.columns
            this.bkBanners = res.data.bkBanners
            this.labels = res.data.labels
            this.bkArticles = res.data.bkArticles
            this.articles = res.data.articles
            this.infolist = res.data.info
            this.news.forEach(function (res) {
              var Dates = res.create_time.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.create_time = timestamp
            })
            this.articles.forEach(function (res) {
              var Dates = res.regdate.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.regdate = timestamp
            })
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            window.localStorage.clear()
            history.go(0) // 刷新
            this.$router.push({
              path: '/dashboard'
            })
          } else {
            console.log(res.data.message)
          }
        })
      })
    },
    homeXbqv2() {
      info('').then(res => {
        const timestamp = res;
        const options = {
          timestamp: timestamp
        }
        homeXbqv2(options).then(res => {
          if (res.code === 100) {
            console.log('homeXbqv2', res);
            this.cartoon = res.data.cartoon;
            this.columnsx = res.data.columns;
            this.len = res.data.notes.length;
            this.makeit = this.columnsx[0].id;
            this.notesx = res.data.notes;
            this.callx = res.data.call;
            let source = {
              type: 'video/mp4',
              src: res.data.call[0].video
            }
            this.playerOptions.poster = res.data.call[0].cover_img;
            this.playerOptions.sources.push(source);
            // this.playerOptions.sources[0].src = res.data.call[0].video;
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            window.localStorage.clear()
            history.go(0) // 刷新
            this.$router.push({
              path: '/dashboard'
            })
          } else {
            console.log(res.data.message)
          }
        })
      })
    },
    handleClicks(tab, event) {
      // banner下面的切换
      this.articles = []
      // console.log('banner下面切换', tab.$vnode.key)
      info('').then(res => {
        const timestamp = res.data
        const options = {
          source: 1,
          pagesize: 6,
          campus_id: 0,
          column_id: tab.$vnode.key,
          timestamp: timestamp
        }
        referencev2(options).then(res => {
          if (res.code === 100) {
            this.articles = res.data.articles.data
            this.articles.forEach(function (res) {
              var Dates = res.regdate.substring(0, 19)
              Dates = Dates.replace(/-/g, '/')
              var timestamp = new Date(Dates).getTime()
              res.regdate = timestamp
            })
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            window.localStorage.clear()
            history.go(0) // 刷新
            this.$router.push({
              path: '/dashboard'
            })
          } else {
            console.log(res.data.message)
          }
        })
      })
    },
    GKlist(item) {
      this.$router.push({
        path: '/gkbaike/GKK',
        query: {
          itemlist: item.id,
          campus_id: 0
        }
      })
    },
    tablea(index) {
      this.ass = true
      this.num1 = index
    },
    tableaQ(index) {
      this.assQ = true
      this.num1Q = index
    },
    tablesa() {
      this.ass = false
      this.assQ = false
    },
    gobaike(item) {
      this.$router.push({
        path: '/gkbaike/GKlist',
        query: {
          happyid: item.id
        }
      })
    },
    gongkaojianghu(item) {
      if (item.note_type === 1 || item.note_type === '1') {
        // 跳转详情
        this.$router.push({
          path: '/xibanqiu/Cartoon',
          query: {
            happyid: item.id
          }
        })
      } else {
        // 跳转外链
        if (item.detail_url === '') {
          return
        } else {
          window.open(item.detail_url, '_blank')
        }
      }
    },
    bofangthis(item) {
      console.log("item......", item)
      if (item.video === '') {
        return
      } else {
        this.videoioen = false
        this.casevideo = item.video
      }
    },
    // v1
    setTimedays(time) {
      if (time > 0) {
        var result
        time = parseInt(time)
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
    linkTo() {
      var activeIndex = this.$refs.carousel.activeIndex
      this.$router.push(this.imgs[activeIndex].link)
    },
    setdetails(item) {
      if (item.relate_type === 2) {
        this.$router.push({
          path: '/class/curriculumlist',
          query: {
            itemlist: item.relate_id
          }
        })
      } else if (item.relate_type === 3 || item.relate_type === 8) {

        this.$router.push({
          path: '/class/alldetails',
          query: {
            itemlist: item.relate_id
          }
        })
        // this.$router.push({ path: '/example/details', query: { itemlist: item.relate_id }})
      } else if (item.relate_type === 7) {
        if (item.target_way === 1) {
          if (item.target_url !== '') {
            window.open(item.target_url, '_blank')
          } else {
            return
          }
        } else {
          this.$router.push({
            path: '/class/alldetails',
            query: {
              itemlist: item.target_url
            }
          })
          // this.$router.push({ path: '/example/details', query: { itemlist: item.target_url }})

        }
      } else {
        if (item.target_way === 1) {
          window.open(item.target_url, '_blank')
        } else {
          this.$router.push({
            path: '/class/alldetails',
            query: {
              itemlist: item.target_url
            }
          })
          // this.$router.push({ path: '/example/details', query: { itemlist: item.target_url }})

        }
      }
    },
    setdetaila(item) {
      this.$router.push({
        path: '/ziliao/menulist',
        query: {
          detail: item.id,
          campus_id: 0
        }
      })
    },
    dakaying(item) {
      this.$router.push({
        path: '/class/allDKdetails',
        query: {
          itemlist: item.relate_id,
          campus_id: 0
        }
      })
    },
    ydays() {
      this.$router.push({
        path: '/class/allDKdetails'
      })
    },
    closeShadow() {
      this.dialogVisible = false
      this.dialogVisibleshu = false
    },
    handleClose(done) {
      this.openvideo = ''
      done()
    },
    videoLibrary() {
      this.$router.push({
        path: '/xibanqiu',
        query: {
          id: this.makeit
        }
      })
    },
    handleClick(tab, event) {
      if (tab.name === 'second') {
        this.imgstype = '2'
      } else if (tab.name === 'third') {
        this.imgstype = '3'
      } else {
        this.imgstype = '1'
      }
    },
    handleClickcall(tab, event) {
      this.tabIndex = tab.index;
      this.playerOptions.poster = this.callx[tab.index].cover_img;
      let source = {
        type: 'video/mp4',
        src: this.callx[tab.index].video
      }
      this.playerOptions.sources = [];
      this.playerOptions.sources.push(source);
    },
    openMX() {
      this.$router.push({
        path: '/xibanqiu',
        query: {
          id: 2
        }
      })
    },
    handleClickBK(tab, event) {
      this.bkArticles = []
      info('').then(res => {
        const timestamp = res.data
        const options = {
          type: 1,
          source: 1,
          label_id: tab.$vnode.key,
          pagesize: 5,
          get_label: 0,
          timestamp: timestamp
        }
        bkv2(options).then(res => {
          if (res.code === 100) {
            this.bkArticles = res.data.news.data
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            window.localStorage.clear()
            history.go(0) // 刷新
            this.$router.push({
              path: '/dashboard'
            })
          } else {
            console.log(res.data.message)
          }
        })
      })
    },
    handleClickxbq(tab, event) {
      this.notesx = []
      this.makeit = tab.$vnode.key
      info('').then(res => {
        const timestamp = res.data
        const options = {
          type: 1,
          source: 1,
          column_id: tab.$vnode.key,
          pagesize: 5,
          get_column: 0,
          timestamp: timestamp
        }
        xbqv2(options).then(res => {
          if (res.code === 100) {
            this.len = res.data.notes.data.length
            this.notesx = res.data.notes.data
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            window.localStorage.clear()
            history.go(0) // 刷新
            this.$router.push({
              path: '/dashboard'
            })
          } else {
            console.log(res.data.message)
          }
        })
      })
    },
    movemust() {
      this.$router.push({
        path: '/ziliao'
      })
    },
    setdetail(item) {
      // 当前页面看视频
      this.dialogVisibleshu = true
      this.openvideo = item.video
      // this.videotime = item.
    },
    setguokao() {
      this.$router.push({
        path: '/KClist'
      })
    },
    setbaike() {
      this.$router.push({
        path: '/gkbaike'
      })
    },
    GKmust() {
      this.$router.push({
        path: '/calist'
      })
    },
    setbanner(item) {
      if (item.redirect_url !== '') {
        window.open(item.redirect_url, '_blank')
      }
    },
    openyousboom(item) {
      if (item.type === 2 || item.type === '2') {
        window.open(item.redirect_url, '_blank')
      } else {
        return
      }
    },
    table(index) {
      this.num = index
    },
    tables() {
      this.num = null
      this.index = null
    },
    MXcall() {
      this.$router.push({
        path: '/xibanqiu'
      })
    },
    GKjh() {
      this.$router.push({
        path: '/xibanqiu',
        query: {
          id: 3
        }
      })
    },
    pinpai() {
      this.$router.push({
        path: '/xiniao'
      })
    },
    pinpais(item) {
      this.$router.push({
        path: `/xiniao/${item.id}`,
        // query: {
        //   item: item.id
        // }
      })
    },
    //播放回调
    onPlayerPlay(player) {
      console.log("play");
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    }
  }
}
</script>
<style>
.lun_imgs {
  height: 396px;
}
.lun_imgs .el-carousel__container {
  height: 396px;
}
</style>
<style lang="scss" >
@import '../static/styles/dashboard/index.scss';
</style>
