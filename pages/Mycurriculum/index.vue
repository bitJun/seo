<template>
<div id="indd1" class="app-container">
  <div class="curriculum">
    <el-tabs v-model="activeName" stretch @tab-click="handleClick">
      <el-tab-pane label="个人资料" name="first" :key="'first'">
        <div class="tabs_list">
          <div class="tabs_list_items" style="height: 600px;border-radius: 10px">
            <h2 style="color: #333;font-size: 16px">修改资料</h2>
            <div style="float: right;margin-right: 15%">
              <!--                <img :src="myIdcall.avatar_url" style="width: 190px;height: 190px">-->
              <!--                <div style="text-align: center;border: 1px solid #999999;width: 140px;height: 30px;line-height: 30px;border-radius: 10px;margin: 0 auto">上传图片</div>-->
              <div id="demo">
                <!-- 遮罩层 -->
                <div class="container" v-show="panel">
                  <div>
                    <img id="image" :src="url" alt="Picture">
                  </div>
                  <button type="button" id="button" @click="crop">确定</button>
                </div>
                <div style="padding:20px;">
                  <div class="show">
                    <div class="picture" :style="'backgroundImage:url('+myIdcall.avatar_url+')'">
                    </div>
                  </div>
                  <div style="margin-top:20px;text-align: center">
                    <input type="file" id="change" accept="image" @change="change" title="" style="width: 80px;display: none">
                    <label for="change" style="padding: 10px 40px;border: 1px solid #b7b7b7;border-radius: 20px;color: #333; cursor:pointer;">上传图片</label>
                  </div>
                </div>
              </div>
            </div>
            <div style="display: flex">
              <div class="marginleft">我的昵称</div>
              <div>
                <el-input class="width100" placeholder="姓名" v-model="myIdcall.nickname" />
              </div>
            </div>
            <div><span class="marginleft">我的性别</span>
              <el-radio-group v-model="radioTreaty" @change="agreeChange">
                <el-radio-button label="1" border>男</el-radio-button>
                <el-radio-button label="2" border>女</el-radio-button>
              </el-radio-group>
            </div>
            <div><span class="marginleft">出生日期</span>
              <el-date-picker size='small' value-format="yyyy/MM/dd" v-model="date" placeholder="请选择日期" :picker-options="pickerDisabled" type="date">
              </el-date-picker>
            </div>
            <div style="display: flex">
              <div class="marginleft">我的大学</div>
              <div>
                <el-input class="width100" placeholder="学校名称" v-model="myIdcall.school_name" />
              </div>
            </div>
            <div style="width: 100%;text-align: center">
              <el-button type="primary" style="width: 180px;margin-top: 5%" @click="setIdcall">确认修改</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的课程" name="second" :key="'second'">
        <div v-if="courselist && courselist.length" class="opsilstthis" style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: space-between">
          <div style="width: 32%;background: #ffffff;border-radius: 10px;padding: 10px 14px;display: inline-block;margin-bottom: 20px;cursor:pointer;padding-top: 10px;" @click="classBegins(item)" v-for="(item,index) in courselist" v-bind:key="index.url">
            <div>
              <h2 style="color: #333;font-size: 20px;margin-bottom: 10px" class="only-one">{{ item.coursename }}</h2>
              <p style="color: #999999;font-size: 14px;margin-top: 0">{{ (item.start_time).substring(0,10).replace(/\-/g,".") }} - {{ (item.end_time).substring(0,10).replace(/\-/g,".") }}</p>
              <div style="display: flex;">
                <el-scrollbar style="height: 100%;margin-bottom: 20px;">
                  <div style="display: inline-block" v-for="(itemlist,index) in item.teacher" v-bind:key="index.url">
                    <div style="margin: 0 10px">
                      <img style="width: 95px;height: 121px;vertical-align:bottom" :src="itemlist.photo_url">
                      <div style="margin-bottom: 20px;width: 95px;font-size: 12px;background: #33CCD3;color: #ffffff;border-radius: 20px;text-align: center;padding: 4px 4px">{{ itemlist.teacher_name }}</div>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
              <div>
                <div style="float: right;margin-right: 10px;color: #999999">{{ item.status_name }}</div>
                <div v-if="item.plan === 100 || item.plan === '100'">
                  <el-progress :percentage="100" text-inside :stroke-width="20" color="#D4D4D4"></el-progress>
                </div>
                <div v-else>
                  <el-progress :percentage="item.plan" text-inside :stroke-width="20" color="#33CCD3"></el-progress>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="opsilstthis" style="width: 1169px;margin: 1% auto;display: flex;flex-wrap: wrap;justify-content: space-between">
          <div style="width: 100%;text-align: center">
            <img src="/images/gif/wodekecheng.gif" style="width: 25%">
          </div>
        </div>
        <div v-if="this.total > 9" style="width: 100%">
          <div style="text-align: center">
            <div class="block">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next" :total="this.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的订单" name="third" :key="'third'">
        <div class="tabs_list">
          <div style="width: 100%;border-radius: 10px">
            <div style="margin-bottom: 10px;background: #ffffff;padding: 20px 30px;border-radius: 10px" v-for="(item,index) in infolist" v-bind:key="index.url">
              <div style="font-size: 18px;font-weight: bold;margin: 14px 0;color: #333333">{{ item.coursename }} <img src="/images/icon/del.png" style="float: right;cursor:pointer;" @click="delthisorder(item.id)"> </div>
              <div style="color: #999999;margin-bottom: 10px">订单时间：{{ item.order_time }}</div>
              <div style="margin-bottom: 10px;color: #999999">订单编号：{{ item.order_id }}</div>
              <div style="display: flex;justify-content: space-between;border-top: 1px solid #dedede;padding-top: 16px">
                <div style="font-size: 12px">RMB <span style="font-size: 22px;font-weight: bold;color: #333333">{{ item.price }}</span></div>
                <div>
                  <span @click="setaddressup(item)" style="margin-right: 50px;color: #FCC80D;cursor:pointer" v-if="item.type === 1&&item.status ===3 && item.is_address === 0 && item.address_id === 0">
                    <img src="/images/icon/tanhao.png" style="vertical-align: middle;margin-right: 10px;">未完善资料
                  </span>
                  <span v-if="item.status_code === 1" style="cursor:pointer;background: #E6213A;color: #ffffff;border-radius: 20px;border: 1px solid #E6213A;padding: 8px 20px" @click="setwhatpay(item)">立即支付</span>
                  <span v-else>{{ item.status_desc }}</span>
                </div>
              </div>
            </div>
            <div v-if="this.totalorder > 10" style="width: 100%">
              <div style="text-align: center">
                <div class="block">
                  <el-pagination @size-change="handleSizeChangemyorder" @current-change="handleCurrentChangemyorder" :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next" :total="this.totalorder">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的收藏" name="fourth" :key="'fourth'">
        <div class="tabs_list">
          <div v-if="infolistshou.length" style="padding-bottom: 50px;padding-top:30px;background: #ffffff;width: 100%;border-radius: 10px;">
            <div v-for="(item,index) in infolistshou" v-bind:key="index.url" style="width: 95%;background: #ffffff;line-height: 30px;padding: 20px;border-bottom: 1px solid #eeeeee;margin: 0 auto;" @click="setdetail(item)">
              <img :src="item.img_url" alt="" style="float: left;width: 161px;height: 81px; border-radius: 6px; margin-right: 20px" v-if="item.img_url">
              <div style="font-weight: bold;font-size: 18px;color: #333333">{{ item.title }}</div>
              <div class="over-list" style="color: #999999">{{ item.sub_title }}</div>
              <div style="display: flex;justify-content: space-between;color: #849191;padding-right: 50px">
                <!-- <div>点击阅读全文<span style="margin-left: 30px">申论</span></div> -->
                <div style="color: #849191;font-size: 14px;">{{ (item.regdate).replace(/\-/g,".") }}</div>
                <div style="display: flex;justify-content: space-between;width: 140px; color: #849191;align-items: center">
                </div>
              </div>

            </div>

            <div v-if="this.total > 10" style="width: 100%">
              <div style="text-align: center">
                <div class="block">
                  <el-pagination @size-change="handleSizeChangea" @current-change="handleCurrentChangea" :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next" :total="this.total">
                  </el-pagination>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="width: 100%;background: #ffffff;height: 770px;display: table-cell;text-align: center;align-items: center">
            <img style="margin-top: 6%;width: 25%" src="/images/gif/404.gif">
            <div style="color: #A8A8A8;margin-top: 20px">主人没有收到您的收藏哦！</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的地址" name="fifth" :key="'fifth'">
        <div class="tabs_list">
          <div style="width: 100%;background: #ffffff;padding: 30px;padding-bottom: 200px;border-radius: 10px;">
            <div style="display: flex;justify-content: space-between" v-if="ismyaddress.length !== 0">
              <div style="visibility: hidden">我是占位</div>
              <div style="border-radius: 20px;padding: 10px 20px;margin: 10px 0 40px 0;background: #33CCD3;color: #ffffff;cursor:pointer;margin-right: 20px" @click="newAddress">+ 新建收货地址</div>
            </div>
            <div v-if="ismyaddress.length === 0" class="tabs_list">
              <div style="width: 100%;height: auto;text-align: center;background: #ffffff;border-radius: 10px;">
                <div style="margin-top: 6%;">
                  <img src="/images/gif/wodedizhi.gif" style="width: 25%">
                  <div style="color:#A8A8A8;margin-top: 20px">还没有地址哦！</div>
                  <div style="background: #33CCD3;color: #ffffff;width: 200px;margin: 3% auto;padding: 10px 30px;border-radius: 20px;cursor:pointer" @click="newAddress">+ 新建收货地址</div>
                </div>
              </div>
            </div>
            <div v-else style="padding: 20px;line-height: 30px">
              <div v-for="(item,index) in ismyaddress" v-bind:key="index.url">
                <div @click="setaddresslist(item)" v-if="item.is_check === 1" style="position: relative;border: 1px solid #DEDEDE;border-radius: 10px;padding: 30px;margin-bottom: 20px">
                  <div style="color: #666666">&nbsp;&nbsp;&nbsp;收货人：<span style="color: #3E3A39">{{ item.name }}</span></div>
                  <div style="color: #666666">详细地址：<span style="color: #3E3A39">{{ item.province }}{{ item.city }}{{ item.area }}{{ item.address }}</span></div>
                  <div style="display: flex;justify-content: space-between">
                    <div style="color: #666666">联系方式：<span style="color: #3E3A39">{{ item.phone }}</span></div>
                    <div style="display: flex;" class="addressadd">
                      <!--                      <div v-if="item.is_check === 1">设为默认地址</div>-->
                      <!--                      <div v-else>取消默认地址</div>-->
                      <div style="cursor:pointer" @click="fixaddress(item)">编辑</div>
                      <div style="cursor:pointer" @click="deladdresst(item)">删除</div>
                    </div>
                  </div>
                  <div style="color: #999999;width: 100px;height: 40px;text-align: center;border-radius: 20px;line-height: 40px;position: absolute;right: 50px;top: 25px" v-if="item.is_check === 2">默认地址</div>
                </div>
                <div @click="setaddresslist(item)" v-else style="background: #F0F6FB;position: relative;border: 1px solid #DEDEDE;border-radius: 10px;padding: 30px;margin-bottom: 20px">
                  <div style="color: #666666">&nbsp;&nbsp;&nbsp;收货人：<span style="color: #3E3A39">{{ item.name }}</span></div>
                  <div style="color: #666666">详细地址：<span style="color: #3E3A39">{{ item.province }}{{ item.city }}{{ item.area }}{{ item.address }}</span></div>
                  <div style="display: flex;justify-content: space-between">
                    <div style="color: #666666">联系方式：<span style="color: #3E3A39">{{ item.phone }}</span></div>
                    <div style="display: flex;" class="addressadd">
                      <!--                      <div v-if="item.is_check === 1">设为默认地址</div>-->
                      <!--                      <div v-else>取消默认地址</div>-->
                      <div style="cursor:pointer" @click="fixaddress(item)">编辑</div>
                      <div style="cursor:pointer" @click="deladdresst(item)">删除</div>
                    </div>
                  </div>
                  <div style="color: #999999;width: 100px;height: 40px;text-align: center;border-radius: 20px;line-height: 40px;position: absolute;right: 50px;top: 25px" v-if="item.is_check === 2">默认地址</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="this.totala >10" style="width: 100%;background: #ffffff;padding-bottom: 20px">
          <div style="text-align: center">
            <div class="block">
              <el-pagination @size-change="handleSizeChangeab" @current-change="handleCurrentChangeab" :current-page.sync="currentPage1" :page-size="9" layout="total, prev, pager, next" :total="totala">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的优惠券" name="sixth" :key="'sixth'">
        <div class="tabs_list" style="width: 100%;display: flex;justify-content: center;border-radius: 10px;">
          <el-tabs v-model="paperactiveName" stretch style="width: 100%;padding: 0" @tab-click="cookbook">
            <el-tab-pane label="未使用" name="nopaper" :key="'nopaper'">
              <div class="tabs_list" style="width: 100%">
                <div v-if="infolist && infolist.length" style="width: 100%;background: #ffffff;color: #ffffff;padding: 40px;display: flex;justify-content: space-between;flex-wrap: wrap;padding-bottom: 200px;border-radius: 10px;">
                  <div class="Coupona" v-for="(item,index) in infolist" v-bind:key="index.url">
                    <div class="Coupon-list">
                      <div style="margin-top: 15px">
                        <div><span style="font-size: 44px">{{ parseInt(item.deduct_amount) }}</span>元</div>
                        <div style="font-size: 12px">满{{ item.goal_amount }}可用</div>
                      </div>
                      <div style="line-height: 23px">
                        <div style="font-size: 18px;font-weight: bold">{{ item.name }}</div>
                        <div style="font-size: 12px;opacity: .5" v-if="item.end_time&&item.end_time !== ''">有限期至：{{ (item.end_time).replace(/\-/g,".") }}</div>
                        <div style="font-size: 12px;opacity: .5">仅限在线支付使用</div>
                      </div>
                      <div style="margin-top: 50px;color: #33CCD3;border-radius: 20px;padding: 0 14px;background: #ffffff">{{ item.status }}</div>
                    </div>
                  </div>
                </div>
                <div v-else style="width: 100%;background: #ffffff;height: 770px;display: table-cell;text-align: center;align-items: center;border-radius: 10px;">
                  <img style="margin-top: 6%;width: 25%" src="/images/gif/wodeyouhuiquan.gif" alt="">
                  <div style="color: #A8A8A8;margin-top: 20px">主人，您现在没有可用的优惠券哦！</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="使用记录" name="inpaper" :key="'inpaper'">
              <div class="tabs_list" style="width: 100%">
                <div v-if="infolist&&infolist.length" style="width: 100%;background: #ffffff;color: #ffffff;padding: 40px;display: flex;justify-content: space-between;flex-wrap: wrap;padding-bottom: 200px">
                  <div class="Couponb" v-for="(item,index) in infolist" v-bind:key="index.url">
                    <div class="Coupon-list">
                      <div style="margin-top: 15px;margin-left: 10px">
                        <div><span style="font-size: 44px">{{ parseInt(item.deduct_amount) }}</span>元</div>
                        <div style="font-size: 12px;opacity: .5">满{{ item.goal_amount }}可用</div>
                      </div>
                      <div style="border-left: 1px dashed #ffffff;padding-left: 40px;line-height: 23px">
                        <div style="font-size: 18px;font-weight: bold">{{ item.name }}</div>
                        <div style="font-size: 12px;opacity: .5" v-if="item.end_time&&item.end_time !== ''">有限期至：{{ (item.end_time).replace(/\-/g,".") }}</div>
                        <div style="font-size: 12px;opacity: .5">仅限在线支付使用</div>
                      </div>
                      <div style="margin-top: 20px;color: #9AABB8;border-radius: 20px;padding: 0 14px;background: #ffffff">{{ item.status }}</div>
                    </div>
                    <div style="float: right;color: #ffffff;opacity: .5;font-size: 12px;margin-top: -20px;margin-right: 20px">{{ item.use_time }}</div>
                  </div>
                </div>
                <div v-else style="width: 100%;background: #ffffff;height: 770px;display: table-cell;text-align: center;align-items: center">
                  <img style="margin-top: 6%;width: 25%" src="/images/gif/wodeyouhuiquan.gif" alt="">
                  <div style="color: #A8A8A8;margin-top: 20px">主人，您现在没有使用过优惠券的记录哦！</div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已过期" name="diepaper" :key="'diepaper'">
              <div class="tabs_list" style="width: 100%">
                <div v-if="infolist && infolist.length" style="width: 100%;background: #ffffff;color: #ffffff;padding: 40px;display: flex;justify-content: space-between;flex-wrap: wrap;padding-bottom: 200px">
                  <div class="Couponc" v-for="(item,index) in infolist" v-bind:key="index.url">
                    <div class="Coupon-list">
                      <div style="margin-top: 15px">
                        <div><span style="font-size: 44px">{{ parseInt(item.deduct_amount) }}</span>元</div>
                        <div style="font-size: 12px">满{{ item.goal_amount }}可用</div>
                      </div>
                      <div style="border-left: 1px dashed #ffffff;padding-left: 40px;line-height: 23px">
                        <div style="font-size: 18px;font-weight: bold">{{ item.name }}</div>
                        <div style="font-size: 12px;opacity: .5" v-if="item.end_time&&item.end_time !== ''">有限期至：{{ (item.end_time).replace(/\-/g,".") }}</div>
                        <div style="font-size: 12px;opacity: .5">仅限在线支付使用</div>
                      </div>
                      <div style="margin-top: 50px;color: #33CCD3;border-radius: 20px;padding: 0 14px;background: #ffffff">{{ item.status }}</div>
                    </div>
                  </div>
                </div>
                <div v-else style="width: 100%;background: #ffffff;height: 770px;display: table-cell;text-align: center;align-items: center">
                  <img style="margin-top: 6%;width: 25%" src="/images/gif/wodeyouhuiquan.gif" alt="">
                  <div style="color: #A8A8A8;margin-top: 20px">主人，您现在没有已经过期的优惠券哦！</div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账户与安全" name="seventh" :key="'seventh'">
        <div class="tabs_list">
          <div style="width: 100%;height:550px;background: #ffffff;padding: 54px 77px;line-height: 50px;text-align: center;border-radius: 10px;">
            <!--              <div>实名认证 <span style="margin-left: 80px;color: #EDBC0B">未认证</span></div>-->
            <!--&lt;!&ndash;              @click="caseIdphone"&ndash;&gt;-->
            <!--&lt;!&ndash;              @click="Idphone"&ndash;&gt;-->
            <!--              <div>绑定手机号 <span style="margin-left: 65px">1135135131</span><span style="margin-left: 20px;"></span></div>-->
            <img src="/images/gif/zhanghuyuanquan.gif" style="width: 25%;margin-top: 6%">
            <div style="color: #999999">功能开发中，敬请期待！</div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的兑换" name="eighth" :key="'eighth'">
        <div class="tabs_list">
          <div style="background: #ffffff;width: 100%;text-align: center;padding-top: 44px;border-radius: 10px;">
            <el-input class="width100" v-model="setcode" placeholder="请输入您的课程兑换码" style="width: 510px;height: 50px" />
            <div style="font-size: 14px;color: #6d6d6d"><img src="/images/liicon/yuantanhao.png" style="width: 16px;height: 16px;margin-right: 10px;vertical-align: middle">帮助说明：使用正确的犀鸟官方发布的兑换码可兑换相应的犀鸟产品。</div>
            <div style="border-radius: 24px;background: #CFCFCF;width: 254px;height: 48px;margin: 60px auto;line-height: 48px;color: #ffffff" v-if="setcode === ''">兑换</div>
            <div style="border-radius: 24px;background: #33CCD3;width: 254px;height: 48px;margin: 60px auto;line-height: 48px;color: #ffffff" v-else @click="setAbook">兑换</div>
            <div style="padding: 50px">
              <!--                <div>-->
              <!--                  <img src="/images/zhanwei.png" alt="">-->
              <!--                  <div style="color: #33CCD3">兑换成功</div>-->
              <!--                </div>-->
              <div style="text-align: left">
                <div v-if="infolist&&infolist.length" style="margin-bottom: 20px;color: #3E3A39">兑换记录</div>
                <div style="border: 1px solid #f4f4f4;padding: 0 20px 20px 20px;margin-bottom: 20px;border-radius: 10px;color: #3eea39" v-for="(item,index) in infolist" v-bind:key="index.url">
                  <h3 style="color: #303030">{{ item.name }}</h3>
                  <div style="color: #303030;opacity: .8;margin-bottom: 10px">兑换时间：<span>{{ item.usetime }}</span></div>
                  <div style="float: right;color: #303030;opacity: .8">RMB<span style="font-size: 22px"> {{ item.price }}</span></div>
                  <div style="color: #303030;opacity: .8">兑换码：<span>{{ item.cdkey }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="消息中心" name="ninth" :key="'ninth'">
        <div class="tabs_list" style="width: 100%;display: flex;justify-content: center;border-radius: 10px;">
          <div style="width: 100%">
            <el-tabs v-model="twoactiveName" stretch>
              <el-tab-pane label="系统" name="firsts" :key="'firsts'">
                <div style="width: 100%;background: #ffffff;height: 570px;text-align: center;align-items: center;border-radius: 10px;">
                  <img style="margin-top: 6%;width: 25%" src="/images/gif/wodexiaoxi.gif" alt="">
                  <div style="color: #A8A8A8;margin-top: 20px">主人，您现在没有系统消息哦！</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="课程" name="seconds" :key="'seconds'">
                <div style="width: 100%;background: #ffffff;height: 570px;text-align: center;align-items: center;border-radius: 10px;">
                  <img style="margin-top: 6%;width: 25%" src="/images/gif/wodexiaoxi.gif" alt="">
                  <div style="color: #A8A8A8;margin-top: 20px">主人，您现在没有购买的课程哦！</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="订单" name="thirds" :key="'thirds'">
                <div style="width: 100%;background: #ffffff;height: 570px;text-align: center;align-items: center;border-radius: 10px;">
                  <img style="margin-top: 6%;width: 25%" src="/images/gif/wodexiaoxi.gif" alt="">
                  <div style="color: #A8A8A8;margin-top: 20px">主人，您现在没有订单哦！</div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!--    // 微信出二维码-->
  <div id="indexid">
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_listss">
      <div style="text-align: center">
        <div style="font-size: 20px;margin-bottom: 50px;margin-top: 10px">微信支付 <span style="color:#E6213A;font-size: 16px">RMB <span style="font-size: 28px">{{ setwxpayonline }}</span></span></div>
        <img style="width: 213px;height: 213px;" :src="wxpay" alt="">
        <div style="background: #F1F5F8;width: 80%;border-radius: 20px;margin: 40px auto;padding: 10px 0">说明：打开手机微信钱包，点击[扫一扫]功能继续操作完成付款</div>
      </div>
    </el-dialog>
  </div>
  <!--    收货地址-->
  <div id="addressid">
    <el-dialog :visible.sync="dialog_listadd" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_lists">
      <div style="height:525px;">
        <el-scrollbar style="height:100%">
          <div style="line-height: 30px">
            <div style="display: flex;align-items: center">
              <div style="width: 4px;height: 17px;background: #dedede;margin-right: 10px"></div>
              <div>选择或新增您的地址</div>
            </div>
            <div style="display: flex;justify-content: space-between" v-if="ismyaddress.length !== 0">
              <div style="visibility: hidden">我是占位</div>
              <div style="border-radius: 30px;padding: 10px 20px;margin: 10px 0 40px 0;background: #33CCD3;color: #ffffff;cursor:pointer;margin-right: 20px" @click="newAddress">+ 新建收货地址</div>
            </div>
            <div v-if="ismyaddress.length === 0" class="tabs_list">
              <div style="text-align: center;background: #ffffff;">
                <div style="margin-top: 2%;">
                  <img src="/images/none.png" alt="">
                  <div style="color:#A8A8A8;margin-top: 20px">还没有地址哦！</div>
                  <div style="background: #33CCD3;color: #ffffff;width: 200px;margin: 3% auto;padding: 10px 30px;border-radius: 20px;cursor:pointer" @click="newAddress">+ 新建收货地址</div>
                </div>
              </div>
            </div>
            <div v-else style="padding: 20px;line-height: 30px">
              <div v-for="(item,index) in ismyaddress" v-bind:key="index.url" class="hoverisname" v-bind:class="{ hoverisnameed: index == indexitem }" v-on:click="setaddresslists(item,index)">
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
              <div @click="closethis" style="cursor:pointer;color: #33CCD3;border: 1px solid #33CCD3;border-radius: 20px;width: 125px;height: 40px;text-align: center;line-height: 40px">
                取消
              </div>
              <div @click="tureaddress" style="cursor:pointer;background: #33CCD3;color: #FFFFFF;border: 1px solid #33CCD3;border-radius: 20px;width: 125px;height: 40px;text-align: center;line-height: 40px">
                确定
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
  <!--    选择支付-->
  <div id="whatpay">
    <el-dialog :visible.sync="dialogVisiblewhat" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_listss">
      <div style="text-align: center">
        <div style="font-size: 18px;margin-bottom: 50px;margin-top: 10px;color: #3E3A39">选择支付方式</div>
        <div style="padding-bottom: 80px;border-bottom: 1px solid #E5E5E5">
          <el-radio-group v-model="radio1">
            <el-radio :label="1"><img src="/images/wxpay2.png" alt="" style="width: 109px;height: 109px;margin-right: 10px">
              <div style="margin-top: 20px;margin-left: 20px">微信支付</div>
            </el-radio>
            <el-radio :label="2"><img src="/images/alipay2.png" alt="" style="width: 109px;height: 109px;margin-right: 10px">
              <div style="margin-top: 20px;margin-left: 30px">支付宝支付</div>
            </el-radio>
          </el-radio-group>
        </div>
        <div style="display: flex;justify-content: space-between;align-items: center;margin-top: 20px">
          <div>
            <ul style="list-style: none;color: #E6213A;font-size: 14px">
              <li>RMB <span style="font-size: 32px">{{ setwxpayonline }}</span></li>
              <li style="color: #BDBDBD">订单价格合计</li>
            </ul>
          </div>
          <div style="width: 166px;height: 50px;border-radius: 30px;background: #E6213A;color: #ffffff;line-height: 50px;margin-right: 40px;cursor:pointer;" @click="choespay">立即支付</div>
        </div>
      </div>
    </el-dialog>
  </div>
  <!--    支付宝支付-->
  <div>
    <el-dialog :visible.sync="dialogVisibleali" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_listss">
      <div style="text-align: center">
        <div style="font-size: 20px;margin-bottom: 50px;margin-top: 10px">支付宝支付 <span style="color:#E6213A;font-size: 16px">RMB{{ setwxpayonline }}
          </span>
        </div>
        <div class="zfb-code" v-html="alipayurl"></div>
        <div style="background: #F1F5F8;width: 80%;border-radius: 20px;margin: 40px auto;padding: 10px 0">说明：打开手机支付宝，点击[扫一扫]功能继续操作完成付款</div>
      </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import {
  info,
  mycourse,
  personal,
  myorder,
  mycollect,
  myaddress,
  mycoupon,
  myexchange,
  mymessage,
  editPersonal,
  addCollect,
  exchange,
  delAddress,
  delMyorder,
  freshenToken,
  bindAddressv2,
  getOrderStatus,
  wxPay,
  aliPay
} from '@/api/user'
import Cropper from 'cropperjs'
export default {
  name: 'Mycurriculum',
  data() {
    return {
      radio1: 1,
      addid: '',
      setwxpayonline: '',
      dialogVisible: false,
      dialogVisibleali: false,
      dialog_listss: false,
      dialog_listadd: false,
      dialogVisiblewhat: false,
      alipayurl: '',
      activeName: 'second',
      paperactiveName: '',
      radioTreaty: '',
      twoactiveName: '',
      courselist: '',
      wxpay: '',
      myIdcall: '',
      teacher: '',
      infolist: [],
      infolistshou: '',
      date: new Date(), // 绑定的时候 直接绑定的当前时间 就好了
      btnstatus: true,
      value: '国考',
      all: '',
      routeMycurriculumid: '',
      ismyaddress: '',
      typecall: '', // 存优惠券状态
      setcode: '',
      statatimess: '',
      // headerImage: '',
      picValue: '',
      cropper: '',
      croppable: false,
      panel: false,
      url: '',
      currentPage1: 1, // 分页开始
      total: 0,
      totala: 0,
      totalorder: 0,
      upsetidaddress: '',
      caseindex: '',
      callmefirst: false,
      indexitem: 0,
      ishappyid: '',
      is_addressed: '',
      pickerDisabled: {
        disabledDate: (time) => {
          return time.getTime() > new Date(new Date().toLocaleDateString()).getTime()
        }
      }
    }
  },
  watch: {
    activeName(val) {
      if (this.activeName === 'ninth') {
        this.twoactiveName = 'firsts'
      } else if (this.activeName === 'sixth') {
        this.paperactiveName = 'nopaper'
      }
      if (this.callmefirst === true) {
        this.activeName = 'first'
      }
    },
    $route: 'routerlist'
  },
  mounted() {
    // 初始化这个裁剪框
    var self = this
    var image = document.getElementById('image')
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: false,
      ready: function () {
        self.croppable = true
      }
    })
  },
  beforeCreate: function () {
    // var myDate = new Date()
    // myDate.toLocaleString()
    // var timess = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds()
    // 做时间对比的现在的时间戳
    // var opentime = new Date().getTime()
    // console.log('现在', opentime)
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
    this.caseindex = this.$route.query.case
    switch (this.caseindex) {
      case 'first':
        this.activeName = 'first'
        info('').then(res => {
          const timestamp = res
          const options = {
            type: this.imgstype,
            flag: 1,
            timestamp: timestamp
          }
          personal(options).then(res => {
            if (res.code === 100) {
              this.myIdcall = res.data
              this.radioTreaty = this.myIdcall.sex // 1男 2女
              this.date = this.myIdcall.birthday
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
        break
      case 'second':
        this.activeName = 'second'
        info('').then(res => {
          const timestamp = res
          const options = {
            page: 1,
            pagesize: 10,
            timestamp: timestamp
          }
          mycourse(options).then(res => {
            if (res.code === 100) {
              this.infolist = res.data.info
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
        break
      case 'third':
        this.activeName = 'third'
        info('').then(res => {
          const timestamp = res
          const options = {
            type: this.imgstype,
            flag: 1,
            timestamp: timestamp
          }
          myorder(options).then(res => {
            if (res.code === 100) {
              this.infolist = res.data.data
              this.totalorder = res.data.total
              this.infolist.forEach(function (res) {
                var datalist = res.order_time.replace(/\-/g, '.')
                res.order_time = datalist
              })
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
        break
      case 'fourth':
        this.activeName = 'fourth'
        info('').then(res => {
          const timestamp = res
          const options = {
            type: this.imgstype,
            flag: 1,
            timestamp: timestamp
          }
          mycollect(options).then(res => {
            if (res.code === 100) {
              this.infolistshou = res.data.data
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
        break
      case 'fifth':
        this.activeName = 'fifth'
        info('').then(res => {
          const timestamp = res
          const options = {
            page: 1,
            pagesize: 9,
            timestamp: timestamp
          }
          myaddress(options).then(res => {
            if (res.code === 100) {
              this.ismyaddress = res.data.data
              this.totala = res.data.total
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
        break
      case 'sixth':
        this.activeName = 'sixth'
        info('').then(res => {
          const timestamp = res
          const options = {
            type: 1,
            timestamp: timestamp
          }
          mycoupon(options).then(res => {
            if (res.code === 100) {
              this.infolist = res.data.data
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
        break
      case 'seventh':
        this.activeName = 'seventh'
        break
      case 'eighth':
        this.activeName = 'eighth'
        info('').then(res => {
          const timestamp = res
          const options = {
            type: this.imgstype,
            flag: 1,
            timestamp: timestamp
          }
          myexchange(options).then(res => {
            if (res.code === 100) {
              this.infolist = res.data.data
              this.infolist.forEach(function (res) {
                var datalist = res.usetime.replace(/\-/g, '.')
                res.usetime = datalist
              })
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
        break
      case 'ninth':
        this.activeName = 'ninth'
        info('').then(res => {
          const timestamp = res
          const options = {
            type: this.imgstype,
            flag: 1,
            timestamp: timestamp
          }
          mymessage(options).then(res => {
            if (res.code === 100) {
              this.infolist = res.data.data
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
    }
    let token = null;
    if (typeof window == 'object') {
      token = window.localStorage.getItem('token')
    }
    console.log('***********', token)
    this.all = this.$route.query.Mycurriculumid
    if (this.all && this.all !== '') {
      if (this.all === '9' || this.all === 9) {
        this.activeName = 'ninth'
        // 跳转过来的9
        info('').then(res => {
          const timestamp = res
          const options = {
            type: this.imgstype,
            flag: 1,
            timestamp: timestamp
          }
          mymessage(options).then(res => {
            if (res.code === 100) {
              this.infolist = res.data.data
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
      } else if (this.all === 3 || this.all === '3') {
        this.activeName = 'third'
        // 跳转过来的3
        info('').then(res => {
          const timestamp = res
          const options = {
            type: this.imgstype,
            flag: 1,
            timestamp: timestamp
          }
          myorder(options).then(res => {
            if (res.code === 100) {
              this.infolist = res.data.data
              this.infolist.forEach(function (res) {
                var datalist = res.order_time.replace(/\-/g, '.')
                res.order_time = datalist
              })
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
      } else if (this.all === 5 || this.all === '5') {
        this.activeName = 'fifth'
        // 跳转过来的5
        info('').then(res => {
          const timestamp = res
          const options = {
            timestamp: timestamp
          }
          myaddress(options).then(res => {
            if (res.code === 100) {
              this.ismyaddress = res.data.data
              this.totala = res.data.total
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
      }
    } else {
      info('').then(res => {
        const timestamp = res
        const options = {
          page: 1,
          pagesize: 9,
          timestamp: timestamp
        }
        mycourse(options).then(res => {
          if (res.code === 100) {
            this.courselist = res.data.data
            this.total = res.data.total
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    }
  },
  methods: {
    // pickerDisabled: {
    //   disabledDate: (time) => {
    //     return time.getTime() > new Date() * 1 + 600 * 1000
    //   }
    // },
    gohome () {
      // if (typeof window == 'object') {
      //   window.localStorage.clear()
      // }
      // history.go(0) // 刷新
      // this.$router.push({
      //   path: '/'
      // })
    },
    delthisorder(item) {
      info('').then(res => {
        const timestamp = res
        const options = {
          id: item,
          timestamp: timestamp
        }
        delMyorder(options).then(res => {
          if (res.code === 100) {
            this.$alert('删除成功', {
              callback: action => {
                info('').then(res => {
                  const timestamp = res
                  const options = {
                    type: this.imgstype,
                    flag: 1,
                    timestamp: timestamp
                  }
                  myorder(options).then(res => {
                    if (res.code === 100) {
                      this.infolist = res.data.data
                      this.totalorder = res.data.total
                      this.infolist.forEach(function (res) {
                        var datalist = res.order_time.replace(/\-/g, '.')
                        res.order_time = datalist
                      })
                    } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                      this.gohome();
                    } else {
                      console.log(res.message)
                    }
                  })
                })
              }
            })
          } else {
            console.log(res.message)
          }
        })
      })
    },
    agreeChange(val) {
      const that = this
      that.btnstatus = (val === '1') ? '1' : '2'
    },
    routerlist() {
      if (this.$route.query.Mycurriculumid === 9) {
        this.activeName = 'ninth'
      } else if (this.$route.query.Mycurriculumid === 3) {
        this.activeName = 'third'
      } else if (this.$route.query.Mycurriculumid === 5) {
        this.activeName = 'fifth'
      }
    },
    classBegins(item) {
      if (item.is_valid === 0) {
        this.$alert('来晚啦，课程已过期')
        return
      } else {
        this.$router.push({
          path: '/Mycurriculum/myClass',
          query: {
            form: item.course_id
          }
        })
      }
    },
    caseIdphone() {
      this.$router.push({
        path: '/Mycurriculum/caseIdphone'
      })
    },
    Idphone() {
      this.$router.push({
        path: '/Mycurriculum/Idphone'
      })
    },
    fixaddress(item) {
      this.$router.push({
        path: '/Mycurriculum/fixaddress',
        query: item
      })
    },
    closethis() {
      this.dialog_listadd = false
    },
    handleClick(tab, event) {
      switch (tab.name) {
        case 'first':
          // 个人资料
          info('').then(res => {
            const timestamp = res
            const options = {
              type: this.imgstype,
              flag: 1,
              timestamp: timestamp
            }
            personal(options).then(res => {
              if (res.code === 100) {
                this.myIdcall = res.data
                this.radioTreaty = this.myIdcall.sex // 1男 2女
                this.date = this.myIdcall.birthday
              } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                this.gohome();
              } else {
                console.log(res.message)
              }
            })
          })
          break
        case 'second':
          // 我的课程
          info('').then(res => {
            const timestamp = res
            const options = {
              page: 1,
              pagesize: 10,
              timestamp: timestamp
            }
            mycourse(options).then(res => {
              if (res.code === 100) {
                this.infolist = res.data.info
              } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                this.gohome();
              } else {
                console.log(res.message)
              }
            })
          })
          break
        case 'third':
          // 我的订单
          info('').then(res => {
            const timestamp = res
            const options = {
              type: this.imgstype,
              flag: 1,
              timestamp: timestamp
            }
            myorder(options).then(res => {
              if (res.code === 100) {
                this.infolist = res.data.data
                this.totalorder = res.data.total
                this.infolist.forEach(function (res) {
                  var datalist = res.order_time.replace(/\-/g, '.')
                  res.order_time = datalist
                })
              } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                this.gohome();
              } else {
                console.log(res.message)
              }
            })
          })
          break
        case 'fourth':
          // 我的收藏
          info('').then(res => {
            const timestamp = res
            const options = {
              page: 1,
              pagesize: 10,
              type: this.imgstype,
              flag: 1,
              timestamp: timestamp
            }
            mycollect(options).then(res => {
              if (res.code === 100) {
                this.infolistshou = res.data.data
                this.total = res.data.total
              } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                this.gohome();
              } else {
                console.log(res.message)
              }
            })
          })
          break
        case 'fifth':
          // 我的地址
          info('').then(res => {
            const timestamp = res
            const options = {
              page: 1,
              pagesize: 9,
              timestamp: timestamp
            }
            myaddress(options).then(res => {
              if (res.code === 100) {
                this.ismyaddress = res.data.data
                this.totala = res.data.total
              } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                this.gohome();
              } else {
                console.log(res.message)
              }
            })
          })
          break
        case 'sixth':
          this.infolist = ''
          // 我的优惠券
          info('').then(res => {
            const timestamp = res
            const options = {
              type: 1,
              timestamp: timestamp
            }
            mycoupon(options).then(res => {
              if (res.code === 100) {
                this.infolist = res.data.data
              } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                this.gohome();
              } else {
                console.log(res.message)
              }
            })
          })
          break
        case 'seventh':
          // 账户与安全
          break
        case 'eighth':
          // 我的兑换
          info('').then(res => {
            const timestamp = res
            const options = {
              type: this.imgstype,
              flag: 1,
              timestamp: timestamp
            }
            myexchange(options).then(res => {
              if (res.code === 100) {
                this.infolist = res.data.data
                this.infolist.forEach(function (res) {
                  var datalist = res.usetime.replace(/\-/g, '.')
                  res.usetime = datalist
                })
              } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                this.gohome();
              } else {
                console.log(res.message)
              }
            })
          })
          break
        case 'ninth':
          // 消息中心
          info('').then(res => {
            const timestamp = res
            const options = {
              type: this.imgstype,
              flag: 1,
              timestamp: timestamp
            }
            mymessage(options).then(res => {
              if (res.code === 100) {
                this.infolist = res.data.data
              } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                this.gohome();
              } else {
                console.log(res.message)
              }
            })
          })
          break
      }
    },
    setIdcall() {
      // 提交按钮
      info('').then(res => {
        const timestamp = res
        const options = {
          nickname: this.myIdcall.nickname,
          sex: this.radioTreaty,
          birthday: this.date,
          school_name: this.myIdcall.school_name,
          timestamp: timestamp
        }
        editPersonal(options).then(res => {
          if (res.code === 100) {
            this.$alert('更新成功')
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    cookbook(tabs) {
      if (tabs.name === 'inpaper') {
        this.typecall = 2
      } else if (tabs.name === 'diepaper') {
        this.typecall = 3
      } else {
        this.typecall = 1
      }
      info('').then(res => {
        const timestamp = res
        const options = {
          type: this.typecall,
          timestamp: timestamp
        }
        mycoupon(options).then(res => {
          if (res.code === 100) {
            this.infolist = res.data.data
            // 優惠券時間切割
            this.infolist.forEach(function (res) {
              if (res.use_time) {
                var Dates = res.use_time.substring(0, 16).replace(/\-/g, '.')
                res.use_time = Dates
              }
            })
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    disCollection(item) {
      info('').then(res => {
        const timestamp = res
        const options = {
          article_id: item.id,
          type: 1,
          timestamp: timestamp
        }
        addCollect(options).then(res => {
          if (res.code === 100) {
            this.shoucang = null
            this.$alert('取消成功')
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    setdetail(item) {
      this.$router.push({
        path: '/nested/menulist',
        query: {
          detail: item.article_id
        }
      })
    },
    newAddress() {
      this.$router.push({
        path: '/Mycurriculum/newaddress'
      })
    },
    deladdresst(item) {
      info('').then(res => {
        const timestamp = res
        const options = {
          address_id: item.id,
          timestamp: timestamp
        }
        delAddress(options).then(res => {
          if (res.code === 100) {
            this.$alert('删除成功', {
              callback: action => {
                myaddress(options).then(res => {
                  if (res.code === 100) {
                    this.ismyaddress = res.data.data
                  } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                    this.gohome();
                  } else {
                    console.log(res.message)
                  }
                })
              }
            })
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    setAbook() {
      info('').then(res => {
        const timestamp = res
        const options = {
          cdkey: this.setcode,
          timestamp: timestamp
        }
        exchange(options).then(res => {
          if (res.code === 100) {
            this.$alert('兑换成功')
            // history.go(0)
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            this.$message(res.message)
          }
        })
      })
    },
    getObjectURL(file) {
      var url = null;
      if (typeof window == 'object') {
        if (window.createObjectURL !== undefined) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL !== undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file)
        }
      }
      return url
    },
    change(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.panel = true
      this.picValue = files[0]
      this.url = this.getObjectURL(this.picValue)
      // 每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url)
      }
      this.panel = true
    },
    crop() {
      this.panel = false
      var croppedCanvas
      var roundedCanvas
      if (!this.croppable) {
        return
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas()
      console.log(this.cropper)
      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas)
      this.myIdcall.avatar_url = roundedCanvas.toDataURL()
      this.postImg()
    },
    getRoundedCanvas(sourceCanvas) {
      let canvas;
      if (typeof window == 'object') {
        canvas = document.createElement('canvas')
        var context = canvas.getContext('2d')
        var width = sourceCanvas.width
        var height = sourceCanvas.height
        canvas.width = width
        canvas.height = height
        context.imageSmoothingEnabled = true
        context.drawImage(sourceCanvas, 0, 0, width, height)
        context.globalCompositeOperation = 'destination-in'
        context.beginPath()
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
        context.fill()
      }
      return canvas
    },
    postImg() {
      console.log('上传', this.myIdcall.avatar_url)
      // 这边写图片的上传
      info('').then(res => {
        const timestamp = res
        const options = {
          nickname: this.myIdcall.nickname,
          sex: this.radioTreaty,
          birthday: this.date,
          school_name: this.myIdcall.school_name,
          is_change_img: 1,
          avatar_url: this.myIdcall.avatar_url,
          timestamp: timestamp
        }
        editPersonal(options).then(res => {
          if (res.code === 100) {
            if (typeof window == 'object') {
              window.localStorage.removeItem('avatar_url')
              window.localStorage.setItem('avatar_url', this.myIdcall.avatar_url)
            }

            this.callmefirst = true
            this.$alert('上传成功', {
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
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleSizeChangea(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleSizeChangeab(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleSizeChangemyorder(val) {
      // console.log(`每页 ${val} 条`)
    },
    handleClose(done) {
      done()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      info('').then(res => {
        this.courselist = []
        const timestamp = res
        const options = {
          pagesize: 9,
          page: val,
          timestamp: timestamp
        }
        mycourse(options).then(res => {
          if (res.code === 100) {
            this.courselist = res.data.data
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    // 收藏123
    handleCurrentChangea(val) {
      // console.log(`当前页: ${val}`)
      info('').then(res => {
        const timestamp = res
        const options = {
          page: val,
          pagesize: 10,
          type: this.imgstype,
          flag: 1,
          timestamp: timestamp
        }
        mycollect(options).then(res => {
          if (res.code === 100) {
            this.infolistshou = res.data.data
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    handleCurrentChangeab(val) {
      // console.log(`当前页: ${val}`)
      info('').then(res => {
        const timestamp = res
        const options = {
          page: val,
          pagesize: 9,
          timestamp: timestamp
        }
        myaddress(options).then(res => {
          if (res.code === 100) {
            this.ismyaddress = res.data.data
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    handleCurrentChangemyorder(val) {
      // console.log(`当前页: ${val}`)
      info('').then(res => {
        this.infolist = []
        const timestamp = res
        const options = {
          pagesize: 9,
          page: val,
          timestamp: timestamp
        }
        myorder(options).then(res => {
          if (res.code === 100) {
            this.infolist = res.data.data
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    setaddressup(item) {
      this.dialog_listadd = true
      console.log('地址id', item.id)
      this.ishappyid = item.id
      info('').then(res => {
        const timestamp = res
        const options = {
          timestamp: timestamp
        }
        myaddress(options).then(res => {
          if (res.code === 100) {
            this.ismyaddress = res.data.data
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    setaddresslist(item) {
      if (this.upsetidaddress === '') {
        return
      } else {
        info('').then(res => {
          const timestamp = res
          const options = {
            address_id: item.id,
            order_id: this.upsetidaddress,
            timestamp: timestamp
          }
          bindAddressv2(options).then(res => {
            if (res.code === 100) {
              this.$alert('填写地址成功')
              this.upsetidaddress = ''
            } else if (res.code === 201 || res.code === 202 || res.code === 203) {
              this.gohome();
            } else {
              console.log(res.message)
            }
          })
        })
      }
    },
    // 发起支付
    setwhatpay(item) {
      this.setwxpayonline = item.price
      this.addid = item.id
      this.is_addressed = item.is_address
      this.dialogVisiblewhat = true
    },
    // 选择支付
    choespay() {
      // 1为选择微信支付
      if (this.radio1 === 1) {
        this.dialogVisiblewhat = false
        this.setwxpay()
      } else {
        this.dialogVisibleali = true
        this.dialogVisiblewhat = false
        this.alipay()
      }
    },
    // 微信支付
    setwxpay() {
      this.dialogVisible = true
      info('').then(res => {
        const timestamp = res
        const options = {
          id: this.addid,
          timestamp: timestamp
        }
        wxPay(options).then(res => {
          if (res.code === 100) {
            this.wxpay = res.data.url
            this.openwxpay()
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    // 微信定时器
    openwxpay() {
      this.timer = setInterval(this.wxpayget, 5000)
    },
    // 定时器调用
    wxpayget() {
      info('').then(res => {
        const timestamp = res
        const options = {
          id: this.addid,
          timestamp: timestamp
        }
        getOrderStatus(options).then(res => {
          if (res.code === 100) {
            if (res.data.code === 200) {
              clearInterval(this.timer)
              if (this.is_addressed === 0) {
                // 0要
                this.$router.push({
                  path: '/example/openorder',
                  query: {
                    itemlist: this.addid
                  }
                })
              } else {
                // 1不要
                this.$router.push({
                  path: '/example/openordered'
                })
              }
            }
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    // 支付宝支付
    alipay() {
      info('').then(res => {
        const timestamp = res
        const options = {
          id: this.addid,
          type: 1,
          timestamp: timestamp
        }
        aliPay(options).then(res => {
          if (res.code === 100) {
            this.alipayurl = res.data.body
            if (this.alipayurl !== '') {
              var ccc = '<script>document.forms[\'alipaysubmit\'].submit()'
              var aaa = res.data.body.replace(ccc, "<iframe style='border: 1px;' name='myFrame' width='210px' height='210px'></iframe>")
              var mmm = 'name=\'alipaysubmit\''
              var ccg = 'name=\'alipaysubmit\' target=\'myFrame\' '
              aaa = aaa.replace(mmm, ccg)
              this.alipayurl = aaa;
              if (typeof window == 'object') {
                setTimeout(() => {
                document.body.getElementsByTagName('form')[0].submit()
                  this.openwxpay()
                }, 300)
              }

            }
            // const div = document.createElement('div')
            // div.innerHTML = (this.alipayurl)
            // document.body.appendChild(div)
            // document.forms.alipaysubmit.submit()
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    },
    setaddresslists(item, index) {
      this.indexitem = index
      this.address_id = item.id
    },
    tureaddress() {
      info('').then(res => {
        const timestamp = res
        const options = {
          order_id: this.ishappyid,
          address_id: this.address_id,
          timestamp: timestamp
        }
        bindAddressv2(options).then(res => {
          if (res.code === 100) {
            this.dialog_listadd = false
            this.$alert('绑定成功')
            // 绑定成功以后的刷新
            info('').then(res => {
              const timestamp = res
              const options = {
                type: this.imgstype,
                flag: 1,
                timestamp: timestamp
              }
              myorder(options).then(res => {
                if (res.code === 100) {
                  this.infolist = res.data.data
                  this.totalorder = res.data.total
                  this.infolist.forEach(function (res) {
                    var datalist = res.order_time.replace(/\-/g, '.')
                    res.order_time = datalist
                  })
                } else if (res.code === 201 || res.code === 202 || res.code === 203) {
                  this.gohome();
                } else {
                  console.log(res.message)
                }
              })
            })
          } else if (res.code === 201 || res.code === 202 || res.code === 203) {
            this.gohome();
          } else {
            console.log(res.message)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" >
@import "../../static/styles/Mycurriculum/index.scss";
</style>
