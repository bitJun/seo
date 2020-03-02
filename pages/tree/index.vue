<template>
<div class="app-container" id="kdd1">
  <div class="dashboard-font">
    <div class="Interlayer">
      <div style="color: #333333;padding-left: 10px;font-weight: bold;margin: 1% 0"><img src="/images/icon/address.png" style="align-items: center;vertical-align: bottom;width: 17px;height: 17px"> 分校信息</div>
      <div style="visibility: hidden">我是占位</div>
    </div>
    <div style="width: 1156px;background: #ffffff;margin: 1% auto;height: 91px;border-radius: 10px;line-height: 91px;color: #666666;margin-bottom: 40px">
      <div>
        <span style="font-weight: bold;margin-left: 28px;margin-right: 28px">湖南分校</span>
        <span style="font-size: 14px"><img src="/images/icon/dingwei.png" style="width: 13px;height: 14px;vertical-align: middle;margin-bottom: 3px"> 地址：湖南省长沙市雨花区万家丽中路一段469号 华雅财富中心1206</span>
        <span style="margin-left: 28px;font-size: 14px"><img src="/images/icon/dianhua.png" style="width: 13px;height: 14px;vertical-align: middle;margin-bottom: 3px"> 咨询热线：15388023360</span>
      </div>
    </div>
    <!--      <el-tabs v-model="activeName"  @tab-click="handleClick">-->
    <!--        <el-tab-pane :label="item.name" v-bind:key="item.id" v-for="item in tabslist">-->
    <!--        </el-tab-pane>-->
    <!--      </el-tabs>-->
    <el-tabs v-model="activeName" @tab-click="handleClicks">
      <el-tab-pane label="国考" name="first" :key="'first'">
        <div>
          <div class="Interlayer">
            <div style="color: #333333;padding-left: 10px;font-weight: bold"><img src="/images/icon/laba.png" style="align-items: center;vertical-align: bottom"> 资讯</div>
            <div style="color: #666666;font-size: 14px;cursor:pointer;margin-right: 30px" @click="topnum">查看更多 <img src="/images/gengduo.png" style="width: 14px;height: 14px;"></div>
          </div>
          <div style="display: flex;justify-content: space-between;width: 1169px;margin: 1% auto;background: #ffffff;padding: 20px;border-radius: 10px">
            <div v-for="(item,index) in Articlelist" v-bind:key="index.url" style="cursor:pointer;width: 30%" @click="setdateilss(item)">
              <img style="width: 54px;height: 54px;float: left;margin-right: 10px" :src="item.img_url" alt="">
              <div style="height: 32px" class="over-list">{{ item.title }}</div>
              <div style="display: flex;justify-content: space-between;font-size: 12px;color: #999999;margin-top: 6px">
                <div v-if="item.exam_area">{{ item.exam_area }}</div>
                <div>{{ item.sign_status }}</div>
                <div>{{ setTimedays(item.regdate) }}</div>
              </div>
            </div>
          </div>
          <div class="Interlayer">
            <div style="margin-top: 20px;color: #333333;padding-left: 10px;font-weight: bold"><img src="/images/icon/guokao.png" style="align-items: center;vertical-align: bottom"> 课程</div>
          </div>
          <div class="orderthid" v-if="courselist&&courselist.length" style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: space-between">
            <div style="display: inline-block;width: 32%;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" @click="setdetails(item)" v-for="(item,index) in courselist" v-bind:key="index.url" class="hoverlist">
              <!--线上课程-->
              <div v-if="item.type === 3" style="cursor:pointer;width: 100%;display: inline-block;padding: 30px 30px 14px 30px">
                <div style="color: #33CCD3;height: 18px">{{ item.label_str }}</div>
                <h3 style="color:#333333;margin: 10px 0" class="only-one">{{ item.coursename }}</h3>
                <p style="color: #999999">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
                <el-scrollbar style="height: 100%;margin-bottom: 20px;">
                  <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
                    <div style="margin: 0 6px">
                      <img style="width: 95px;height: 121px;vertical-align:bottom" :src="itemlist.photo_url">
                      <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">{{ itemlist.teacher_nickname }}</div>
                    </div>
                  </div>
                </el-scrollbar>
                <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 20px;align-items: center">
                  <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.order_number }}</span> 人</div>
                  <div v-if="item.price !== 0" style="color: #E6213A;font-weight: bold;font-size: 14px"><img v-if="item.is_assemble === 1 || item.is_assemble === '1'" src="/images/icon/tuan.png" style="width: 18px;height: 20px;margin-right: 4px" alt="">RMB<span style="font-size: 24px;">{{ item.price }}</span></div>
                  <div v-else style="color: #E6213A"><span style="font-size: 18px;font-weight: bold">免费</span></div>
                </div>
              </div>
              <!--课程包-->
              <div v-if="item.type === 2" style="cursor:pointer;width: 100%;display: inline-block;padding: 30px 30px 0 30px">
                <div style="color: #33CCD3">{{ item.subheading }}</div>
                <h2 style="color:#333333;" class="only-one">{{ item.coursename }}</h2>
                <img :src="item.course_image" style="width: 100%;height: 246px;">
              </div>
              <!--广告课-->
              <div v-if="item.type === 7" style="cursor:pointer;width: 100%;display: inline-block;border-radius: 10px;padding: 0">
                <img :src="item.course_image" style="width: 100%;border-radius: 10px 10px 0 0 ">
                <div style="padding: 20px">
                  <h2 style="color:#333333;" class="only-one">{{ item.coursename }}</h2>
                  <div style="color: #33CCD3">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="width: 1169px;margin: 1% auto;text-align: center;padding-bottom: 20%">
            <img src="/images/gif/wodekecheng.gif" style="width: 25%;margin-top: 6%">
            <div style="color: #999999">暂无课程</div>
          </div>
          <div v-if="this.acc > 9" style="width: 100%">
            <div style="text-align: center">
              <div class="block">
                <el-pagination @size-change="handleSizeChangemyorder" @current-change="handleCurrentChangemyorder" :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next" :total="acc">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="省考" name="second" :key="'second'">
        <div>
          <div class="Interlayer">
            <div style="color: #333333;padding-left: 10px;font-weight: bold"><img src="/images/icon/laba.png" style="align-items: center;vertical-align: bottom"> 资讯</div>
            <div style="color: #666666;font-size: 14px;cursor:pointer;margin-right: 30px" @click="topnum">查看更多 <img src="/images/gengduo.png" style="width: 14px;height: 14px;"></div>
          </div>
          <div style="display: flex;justify-content: space-between;width: 1169px;margin: 1% auto;background: #ffffff;padding: 20px;border-radius: 10px">
            <div v-for="(item,index) in Articlelist" v-bind:key="index.url" style="cursor:pointer;width: 30%" @click="setdateilss(item)">
              <img style="width: 54px;height: 54px;float: left;margin-right: 10px" :src="item.img_url" alt="">
              <div style="height: 32px" class="over-list">{{ item.title }}</div>
              <div style="display: flex;justify-content: space-between;font-size: 12px;color: #999999;margin-top: 6px">
                <div v-if="item.exam_area">{{ item.exam_area }}</div>
                <div>{{ item.sign_status }}</div>
                <div>{{ setTimedays(item.regdate) }}</div>
              </div>
            </div>
          </div>
          <div class="Interlayer">
            <div style="margin-top: 20px;color: #333333;padding-left: 10px;font-weight: bold"><img src="/images/icon/guokao.png" style="align-items: center;vertical-align: bottom"> 国考课程</div>
          </div>
          <div class="orderthid" v-if="courselist&&courselist.length" style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: space-between">
            <div style="display: inline-block;width: 32%;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" @click="setdetails(item)" v-for="(item,index) in courselist" v-bind:key="index.url" class="hoverlist">
              <!--线上课程-->
              <div v-if="item.type === 3" style="cursor:pointer;width: 100%;display: inline-block;padding: 30px 30px 14px 30px">
                <div style="color: #33CCD3">{{ item.label_str }}</div>
                <h3 style="color:#333333;margin: 10px 0" class="only-one">{{ item.coursename }}</h3>
                <p style="color: #999999">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
                <el-scrollbar style="height: 100%;margin-bottom: 20px;">
                  <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
                    <div style="margin: 0 6px">
                      <img style="width: 95px;height: 121px;vertical-align:bottom" :src="itemlist.photo_url">
                      <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">{{ itemlist.teacher_nickname }}</div>
                    </div>
                  </div>
                </el-scrollbar>
                <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 20px;align-items: center">
                  <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.order_number }}</span> 人</div>
                  <div v-if="item.price !== 0" style="color: #E6213A;font-weight: bold;font-size: 14px"><img v-if="item.is_assemble === 1 || item.is_assemble === '1'" src="/images/icon/tuan.png" style="width: 18px;height: 20px;margin-right: 4px" alt="">RMB<span style="font-size: 24px;">{{ item.price }}</span></div>
                  <div v-else style="color: #E6213A"><span style="font-size: 18px;font-weight: bold">免费</span></div>
                </div>
              </div>
              <!--课程包-->
              <div v-if="item.type === 2" style="cursor:pointer;width: 100%;display: inline-block;padding: 30px 30px 0 30px">
                <div style="color: #33CCD3">{{ item.subheading }}</div>
                <h2 style="color:#333333;" class="only-one">{{ item.coursename }}</h2>
                <img :src="item.course_image" style="width: 100%;height: 246px;">
              </div>
              <!--广告课-->
              <div v-if="item.type === 7" style="cursor:pointer;width: 100%;display: inline-block;border-radius: 10px;padding: 0">
                <img :src="item.course_image" style="width: 100%;border-radius: 10px 10px 0 0 ">
                <div style="padding: 20px">
                  <h2 style="color:#333333;" class="only-one">{{ item.coursename }}</h2>
                  <div style="color: #33CCD3">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="width: 1169px;margin: 1% auto;text-align: center;padding-bottom: 20%">
            <img src="/images/gif/wodekecheng.gif" style="width: 25%;margin-top: 6%">
            <div style="color: #999999">暂无课程</div>
          </div>
          <div v-if="this.acc > 9" style="width: 100%">
            <div style="text-align: center">
              <div class="block">
                <el-pagination @size-change="handleSizeChangemyorder" @current-change="handleCurrentChangemyorder" :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next" :total="acc">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="选调生" name="third" :key="'third'">
        <div>
          <div class="Interlayer">
            <div style="color: #333333;padding-left: 10px;font-weight: bold"><img src="/images/icon/laba.png" style="align-items: center;vertical-align: bottom"> 资讯</div>
            <div style="color: #666666;font-size: 14px;cursor:pointer;margin-right: 30px" @click="topnum">查看更多 <img src="/images/gengduo.png" style="width: 14px;height: 14px;"></div>
          </div>
          <div style="display: flex;justify-content: space-between;width: 1169px;margin: 1% auto;background: #ffffff;padding: 20px;border-radius: 10px">
            <div v-for="(item,index) in Articlelist" v-bind:key="index.url" style="cursor:pointer;width: 30%" @click="setdateilss(item)">
              <img style="width: 54px;height: 54px;float: left;margin-right: 10px" :src="item.img_url" alt="">
              <div style="height: 32px" class="over-list">{{ item.title }}</div>
              <div style="display: flex;justify-content: space-between;font-size: 12px;color: #999999;margin-top: 6px">
                <div v-if="item.exam_area">{{ item.exam_area }}</div>
                <div>{{ item.sign_status }}</div>
                <div>{{ setTimedays(item.regdate) }}</div>
              </div>
            </div>
          </div>
          <div class="Interlayer">
            <div style="margin-top: 20px;color: #333333;padding-left: 10px;font-weight: bold"><img src="/images/icon/guokao.png" style="align-items: center;vertical-align: bottom"> 国考课程</div>
          </div>
          <div class="orderthid" v-if="courselist&&courselist.length" style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: space-between">
            <div style="display: inline-block;width: 32%;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" @click="setdetails(item)" v-for="(item,index) in courselist" v-bind:key="index.url" class="hoverlist">
              <!--线上课程-->
              <div v-if="item.type === 3" style="cursor:pointer;width: 100%;display: inline-block;padding: 30px 30px 14px 30px">
                <div style="color: #33CCD3">{{ item.label_str }}</div>
                <h3 style="color:#333333;margin: 10px 0" class="only-one">{{ item.coursename }}</h3>
                <p style="color: #999999">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
                <el-scrollbar style="height: 100%;margin-bottom: 20px;">
                  <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
                    <div style="margin: 0 6px">
                      <img style="width: 95px;height: 121px;vertical-align:bottom" :src="itemlist.photo_url">
                      <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">{{ itemlist.teacher_nickname }}</div>
                    </div>
                  </div>
                </el-scrollbar>
                <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 20px;align-items: center">
                  <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.order_number }}</span> 人</div>
                  <div v-if="item.price !== 0" style="color: #E6213A;font-weight: bold;font-size: 14px"><img v-if="item.is_assemble === 1 || item.is_assemble === '1'" src="/images/icon/tuan.png" style="width: 18px;height: 20px;margin-right: 4px" alt="">RMB<span style="font-size: 24px;">{{ item.price }}</span></div>
                  <div v-else style="color: #E6213A"><span style="font-size: 18px;font-weight: bold">免费</span></div>
                </div>
              </div>
              <!--课程包-->
              <div v-if="item.type === 2" style="cursor:pointer;width: 100%;display: inline-block;padding: 30px 30px 0 30px">
                <div style="color: #33CCD3">{{ item.subheading }}</div>
                <h2 style="color:#333333;" class="only-one">{{ item.coursename }}</h2>
                <img :src="item.course_image" style="width: 100%;height: 246px;">
              </div>
              <!--广告课-->
              <div v-if="item.type === 7" style="cursor:pointer;width: 100%;display: inline-block;border-radius: 10px;padding: 0">
                <img :src="item.course_image" style="width: 100%;border-radius: 10px 10px 0 0 ">
                <div style="padding: 20px">
                  <h2 style="color:#333333;" class="only-one">{{ item.coursename }}</h2>
                  <div style="color: #33CCD3">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="width: 1169px;margin: 1% auto;text-align: center;padding-bottom: 20%">
            <img src="/images/gif/wodekecheng.gif" style="width: 25%;margin-top: 6%">
            <div style="color: #999999">暂无课程</div>
          </div>
          <div v-if="this.acc > 9" style="width: 100%">
            <div style="text-align: center">
              <div class="block">
                <el-pagination @size-change="handleSizeChangemyorder" @current-change="handleCurrentChangemyorder" :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next" :total="acc">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="遴选" name="fourth" :key="'fourth'">
        <div>
          <div class="Interlayer">
            <div style="color: #333333;padding-left: 10px;font-weight: bold"><img src="/images/icon/laba.png" style="align-items: center;vertical-align: bottom"> 资讯</div>
            <div style="color: #666666;font-size: 14px;cursor:pointer;margin-right: 30px" @click="topnum">查看更多 <img src="/images/gengduo.png" style="width: 14px;height: 14px;"></div>
          </div>
          <div style="display: flex;justify-content: space-between;width: 1169px;margin: 1% auto;background: #ffffff;padding: 20px;border-radius: 10px">
            <div v-for="(item,index) in Articlelist" v-bind:key="index.url" style="cursor:pointer;width: 30%" @click="setdateilss(item)">
              <img style="width: 54px;height: 54px;float: left;margin-right: 10px" :src="item.img_url" alt="">
              <div style="height: 32px" class="over-list">{{ item.title }}</div>
              <div style="display: flex;justify-content: space-between;font-size: 12px;color: #999999;margin-top: 6px">
                <div v-if="item.exam_area">{{ item.exam_area }}</div>
                <div>{{ item.sign_status }}</div>
                <div>{{ setTimedays(item.regdate) }}</div>
              </div>
            </div>
          </div>
          <div class="Interlayer">
            <div style="margin-top: 20px;color: #333333;padding-left: 10px;font-weight: bold"><img src="/images/icon/guokao.png" style="align-items: center;vertical-align: bottom"> 国考课程</div>
          </div>
          <div class="orderthid" v-if="courselist&&courselist.length" style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: space-between">
            <div style="display: inline-block;width: 32%;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" @click="setdetails(item)" v-for="(item,index) in courselist" v-bind:key="index.url" class="hoverlist">
              <!--线上课程-->
              <div v-if="item.type === 3" style="cursor:pointer;width: 100%;display: inline-block;padding: 30px 30px 14px 30px">
                <div style="color: #33CCD3">{{ item.label_str }}</div>
                <h3 style="color:#333333;margin: 10px 0" class="only-one">{{ item.coursename }}</h3>
                <p style="color: #999999">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
                <el-scrollbar style="height: 100%;margin-bottom: 20px;">
                  <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
                    <div style="margin: 0 6px">
                      <img style="width: 95px;height: 121px;vertical-align:bottom" :src="itemlist.photo_url">
                      <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">{{ itemlist.teacher_nickname }}</div>
                    </div>
                  </div>
                </el-scrollbar>
                <div style="display: flex;justify-content: space-between;border-top: 1px solid #E5E5E5;padding-top: 20px;align-items: center">
                  <div style="color: #999999;font-size: 14px">限售{{ item.xnumber }}人 | 已报 <span style="color: #33CCD3">{{ item.order_number }}</span> 人</div>
                  <div v-if="item.price !== 0" style="color: #E6213A;font-weight: bold;font-size: 14px"><img v-if="item.is_assemble === 1 || item.is_assemble === '1'" src="/images/icon/tuan.png" style="width: 18px;height: 20px;margin-right: 4px" alt="">RMB<span style="font-size: 24px;">{{ item.price }}</span></div>
                  <div v-else style="color: #E6213A"><span style="font-size: 18px;font-weight: bold">免费</span></div>
                </div>
              </div>
              <!--课程包-->
              <div v-if="item.type === 2" style="cursor:pointer;width: 100%;display: inline-block;padding: 30px 30px 0 30px">
                <div style="color: #33CCD3">{{ item.subheading }}</div>
                <h2 style="color:#333333;" class="only-one">{{ item.coursename }}</h2>
                <img :src="item.course_image" style="width: 100%;height: 246px;">
              </div>
              <!--广告课-->
              <div v-if="item.type === 7" style="cursor:pointer;width: 100%;display: inline-block;border-radius: 10px;padding: 0">
                <img :src="item.course_image" style="width: 100%;border-radius: 10px 10px 0 0 ">
                <div style="padding: 20px">
                  <h2 style="color:#333333;" class="only-one">{{ item.coursename }}</h2>
                  <div style="color: #33CCD3">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="width: 1169px;margin: 1% auto;text-align: center;padding-bottom: 20%">
            <img src="/images/gif/wodekecheng.gif" style="width: 25%;margin-top: 6%">
            <div style="color: #999999">暂无课程</div>
          </div>
          <div v-if="this.acc > 9" style="width: 100%">
            <div style="text-align: center">
              <div class="block">
                <el-pagination @size-change="handleSizeChangemyorder" @current-change="handleCurrentChangemyorder" :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next" :total="acc">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>

<script>
import {
  course,
  info,
  courseArticle
} from '@/api/user'
export default {
  data() {
    return {
      activeName: 'first',
      courselist: '',
      Articlelist: '',
      tabslist: [],
      acc: 0,
      currentPage1: 1 // 分页开始
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
    info('').then(res => {
      const timestamp = res
      const options = {
        type: 1,
        pagesize: 9,
        get_lable: 1,
        page: 1,
        timestamp: timestamp
      }
      course(options).then(res => {
        if (res.code === 100) {
          this.courselist = res.data.data
          this.tabslist = res.data.lables
          this.acc = res.data.total
        } else {
          this.$alert(res.message, {
            callback: action => {
              this.$router.back(-1)
            }
          })
        }
      })
      const Article = {
        pagesize: 3,
        timestamp: timestamp
      }
      courseArticle(Article).then(res => {
        if (res.code === 100) {
          this.Articlelist = res.data
          this.Articlelist.forEach(function (res) {
            var Dates = res.regdate.substring(0, 19)
            Dates = Dates.replace(/-/g, '/')
            var timestamp = new Date(Dates).getTime()
            res.regdate = timestamp
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
  },
  methods: {
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
            result = '' + parseInt(monthC) + '月前'
          } else {
            result = '' + parseInt(monthC / 12) + '年前'
          }
        } else if (weekC >= 1) {
          result = '' + parseInt(weekC) + '周前'
        } else if (dayC >= 1) {
          result = '' + parseInt(dayC) + '天前'
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
      // if (item.type !== 2) {
      //   this.$router.push({ path: '/example/details', query: { itemlist: item.id }})
      // } else {
      //   this.$router.push({ path: '/curriculumlist', query: { itemlist: item.id }})
      // }
      if (item.type === 2) {
        this.$router.push({
          path: '/curriculumlist',
          query: {
            itemlist: item.id
          }
        })
      } else if (item.type === 3) {
        this.$router.push({
          path: '/example/details',
          query: {
            itemlist: item.id
          }
        })
      } else {
        if (item.target_way === 1) {
          window.open(item.target_url, '_blank')
        } else {
          this.$router.push({
            path: '/example/details',
            query: {
              itemlist: item.target_url
            }
          })
        }
      }
    },
    // 暂时废弃
    // handleClick(tab, event) {
    //   info('').then(res => {
    //     const timestamp = res
    //     const options = { type: 1, lable_id: tab.$vnode.data.key, pagesize: 9, timestamp: timestamp }
    //     course(options).then(res => {
    //       if (res.code === 100) {
    //         this.courselist = res.data.data
    //         this.acc = res.data.total
    //       } else {
    //         this.$alert(res.message, {
    //           callback: action => {
    //             this.$router.back(-1)
    //           }
    //         })
    //       }
    //     })
    //   })
    // },
    handleClicks(tab, event) {
      console.log('+++++++++', tab.name)
      switch (tab.name) {
        case 'first':
          info('').then(res => {
            const timestamp = res
            const options = {
              type: 1,
              pagesize: 9,
              get_lable: 1,
              page: 1,
              timestamp: timestamp
            }
            course(options).then(res => {
              if (res.code === 100) {
                this.courselist = res.data.data
                this.tabslist = res.data.lables
                this.acc = res.data.total
              } else {
                this.$alert(res.message, {
                  callback: action => {
                    this.$router.back(-1)
                  }
                })
              }
            })
          })
          break
        case 'second':
          info('').then(res => {
            const timestamp = res
            const options = {
              type: 2,
              pagesize: 9,
              get_lable: 1,
              page: 1,
              timestamp: timestamp
            }
            course(options).then(res => {
              if (res.code === 100) {
                this.courselist = res.data.data
                this.tabslist = res.data.lables
                this.acc = res.data.total
              } else {
                this.$alert(res.message, {
                  callback: action => {
                    this.$router.back(-1)
                  }
                })
              }
            })
          })
          break
        case 'third':
          info('').then(res => {
            const timestamp = res
            const options = {
              type: 3,
              pagesize: 9,
              get_lable: 1,
              page: 1,
              timestamp: timestamp
            }
            course(options).then(res => {
              if (res.code === 100) {
                this.courselist = res.data.data
                this.tabslist = res.data.lables
                this.acc = res.data.total
              } else {
                this.$alert(res.message, {
                  callback: action => {
                    this.$router.back(-1)
                  }
                })
              }
            })
          })
          break
        case 'fourth':
          info('').then(res => {
            const timestamp = res
            const options = {
              type: 4,
              pagesize: 9,
              get_lable: 1,
              page: 1,
              timestamp: timestamp
            }
            course(options).then(res => {
              if (res.code === 100) {
                this.courselist = res.data.data
                this.tabslist = res.data.lables
                this.acc = res.data.total
              } else {
                this.$alert(res.message, {
                  callback: action => {
                    this.$router.back(-1)
                  }
                })
              }
            })
          })
          break
      }
      // info('').then(res => {
      //   const timestamp = res
      //   const options = { type: 1, pagesize: 9, get_lable: 1, page: 1, timestamp: timestamp }
      //   course(options).then(res => {
      //     if (res.code === 100) {
      //       this.courselist = res.data.data
      //       this.tabslist = res.data.lables
      //       this.acc = res.data.total
      //     } else {
      //       this.$alert(res.message, {
      //         callback: action => {
      //           this.$router.back(-1)
      //         }
      //       })
      //     }
      //   })
      // })
    },
    topnum() {
      this.$router.push({
        path: '/ziliao/Reference'
      })
    },
    setdateilss(item) {
      this.$router.push({
        path: '/ziliao/menulist',
        query: {
          detail: item.id
        }
      })
    },
    handleSizeChangemyorder(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChangemyorder(val) {
      // console.log(`当前页: ${val}`)
      console.log('当前页', val)
      info('').then(res => {
        this.courselist = []
        const timestamp = res
        const options = {
          type: 1,
          pagesize: 9,
          page: val,
          timestamp: timestamp
        }
        course(options).then(res => {
          if (res.code === 100) {
            this.courselist = res.data.data
            console.log('新的分页', this.courselist)
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
@import "../../static/styles/tree/index.scss"
</style>
