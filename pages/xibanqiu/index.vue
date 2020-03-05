<template>
<div id="app_video" class="app-container">
  <div class="dashboard-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="item.name" v-for="item in tablists" v-bind:key="item.id">
        <!-- 横版 -->
        <div>
          <div class="title_one_bar">
            <ul>
              <li class="head_1st" style="text-align:center;">
                <img :src="tabinfo.img">
                <p>{{tabinfo.name}}</p>
              </li>
              <li class="body_1st">
                <div style="font-size: 22px;color: #333333;font-weight: bold;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 630px;">{{tabinfo.subtitle}}</div>
                <div class="smline"></div>
                <div style="line-height: 30px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">{{tabinfo.introduce}}</div>
              </li>
              <li class="footer_1st">
                <img :src="tabinfo.code" style="width:156px;height: 198px;object-fit:cover;">
              </li>
            </ul>
          </div>
          <div style="margin-top: 40px" v-if="item.plate == 2 && item.id == 2">
            <div v-if="menulist&&menulist.length > 4" class="alldisplay" style="margin-top: 40px">
              <div style="padding: 10px;display: inline-block;width: 274px;height: 206px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in menulist" v-bind:key="index.url">
                <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;" @click="openvideos(items)">
                  <!-- <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;" @click="openvideos(items)"> -->
                  <img style="width: 252px;height: 145px;margin-right: 20px;" :src="items.cover_img" alt="">
                  <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;width: 35px;height: 35px;left: 42%;top: 31%;z-index: 9999">
                  <p style="color: #333333;margin-top: 10px" class="over-lists">{{items.title}}</p>
                </div>
              </div>
              <div class="list" v-if="len % row > 0" v-for="items in (row - len % row)" v-bind:key="items.url"></div>
            </div>
            <div v-else class="alldisplays">
              <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" @click="openvideos(items)" style="padding: 10px;position: relative;display: inline-block;width: 274px;height: 206px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in menulist" v-bind:key="index.url">
                <img style="width: 252px;height: 145px;margin-right: 20px;" :src="items.cover_img" alt="">
                <img v-show="index==num" src="/images/icon/bofang.png" style="position: absolute;width: 35px;height: 35px;left: 42%;top: 31%;z-index: 9999">
                <p style="color: #333333;margin-top: 10px" class="over-lists">{{items.title}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 竖版 -->
        <div class="stbody_2rd" v-if="item.plate == 2 &&item.id != 2 ">
          <div>
            <div v-if="menulist&&menulist.length > 4" class="alldisplay" style="justify-content: space-between">
              <div style="display: inline-block;width: 274px;height: 531px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in menulist" v-bind:key="index.url">
                <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" style="position: relative;width: 274px;text-align: center" @click="openvideoauto(items)">
                  <img style="width: 247px;height: 436px;margin: 16px 0;object-fit:cover;" :src="items.cover_img" alt="">
                  <p style="margin-top: 0;font-size: 18px;color: #2B3E50;font-weight: bold;text-align: left" class="over-lists">{{items.title}}</p>
                  <p style="color: #999999;font-size: 14px;text-align: left" class="over-lists">{{items.sub_title}}</p>
                </div>
              </div>
              <div class="list" v-if="len % row > 0" v-for="items in (row - len % row)" v-bind:key="items.video"></div>
            </div>
            <div v-else class="alldisplays">
              <div :class="{active:num==index}" @mouseenter="table(index)" @mouseleave="tables" @click="openvideoauto(items)" style="text-align: center;position: relative;display: inline-block;width: 274px;height: 531px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in menulist" v-bind:key="index.url">
                <img style="width: 247px;height: 436px;margin: 16px 0;object-fit:cover;" :src="items.cover_img" alt="">
                <p style="margin-top: 0;font-size: 18px;color: #2B3E50;font-weight: bold;text-align: left" class="over-lists">{{items.title}}</p>
                <p style="color: #999999;font-size: 14px;text-align: left" class="over-lists">{{items.sub_title}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 图文 -->
        <div class="body_2rd" v-if="item.plate == 1">
          <div>
            <div v-if="menulist&&menulist.length > 5" class="alldisplay">
              <div @click="setcartoon(items.id,items.note_type,items.detail_url)" style="display: inline-block;width: 201px;height: 207px;background: #ffffff;border-radius: 10px;;margin-bottom: 2%;" v-for="(items,index) in menulist" v-bind:key="index.url">
                <div :class="{active:num==index}" style="position: relative;width: 201px">
                  <img style="width: 201px;height: 147px;object-fit:cover;border-radius: 6px" :src="items.cover_img" alt="">
                  <p style="color: #333333;margin-top: 10px" class="over-listss">{{items.title}}</p>
                </div>
              </div>
              <div class="list" v-if="len % rows > 0" v-for="items in (rows - len % rows)" v-bind:key="items.video"></div>
            </div>
            <div v-else class="alldisplay" style="justify-content: flex-start">
              <div :class="{active:num==index}" style="position: relative;display: inline-block;width: 201px;height: 207px;background: #ffffff;border-radius: 10px;margin-bottom: 2%;margin-right: 25px" v-for="(items,index) in menulist" v-bind:key="index.url" @click="setcartoon(items.id,items.note_type,items.detail_url)">
                <img style="width: 201px;height: 147px;object-fit:cover;border-radius: 6px" :src="items.cover_img" alt="">
                <p style="color: #333333;margin-top: 10px" class="over-listss">{{items.title}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 竖版 -->
      </el-tab-pane>
      <div style="width: 100%; text-align: center;padding-bottom: 50px;border-radius: 0 0 20px 20px" v-show="totalorder > per_page ">
        <div style="text-align: center">
          <div style="text-align: center">
            <div class="block">
              <el-pagination @size-change="handleSizeChangemyorder" @current-change="fyfunction" :current-page.sync="currentPage1" :page-size="per_page" layout="total, prev, pager, next" :total="totalorder">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
  <div id="indexid">
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_list">
      <video controls="controls" :src="MXcallzz.video" style="position: absolute;top: 75px;left: 4px;margin: 0 20px;width: 95%;border-radius: 20px;border: 5px solid #333333;outline: none"></video>
      <img src="/images/xibanqiu-left.png" style="height: auto;width: 100%;">
    </el-dialog>
  </div>
  <div>
    <el-dialog :visible.sync="dialogVisibleshu" :append-to-body="true" :before-close="handleClose" :close-on-click-modal="false" custom-class="dialog_list1">
      <!-- <div style="position: absolute;left: 20px;top: 15px;font-size: 12px"><img src="/images/icon/riqi.png" style="width: 12px;height: 12px;vertical-align: middle;margin-right: 6px;margin-bottom: 4px">2019.01.01 <span>来源：国家公务员局</span></div> -->
      <video controls="controls" style="height: 700px;max-width: 400px;border-radius: 20px;border: 4px solid #333333" width="100%" height="auto" :src="MXcallzz.video"></video>
    </el-dialog>
  </div>

</div>
</template>

<script>
import {
  info,
  article,
  notes,
  xbqv2,
  seov2
} from '@/api/user'
export default {
  data() {
    return {
      currentPage1: 0,
      dialogVisible: false,
      dialogVisibleshu: false,
      activeName: '',
      menulist: '',
      videolist: '',
      len: '',
      row: 4,
      rows: 5,
      index: null,
      num: null,
      MXcalllist: '',
      MXcallzz: '',
      caseindex: '',
      tablists: '',
      totalorder: 0,
      lmid: '',
      per_page: '',
      pageSize: 0
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
  async asyncData ({ params }) {
    const timestamp = await info();
    const options = {
      column_id: 0,
      source: 0,
      get_column: 1,
      timestamp: timestamp
    }
    const { data } = await xbqv2(options);
    console.log('dasdasd', data);
    return {
      tablists: data.columns,
      lmid: data.columns[0].id,
      tabinfo: data.columnInfo,
      menulist: data.notes.data,
      len: data.notes.data,
      totalorder: data.notes.total,
      per_page: data.notes.per_page,
    }
  },
  created() {
    // this.xbqcolumns();
    if (this.$route.query.id) {
      let cc = (this.$route.query.id - 1);
      this.istype = this.$route.query.id;
    } else {
      this.istype = 0
    }
  },
  methods: {
    //分页加载
    handleSizeChangemyorder(val) {},
    fyfunction(val) {
      this.menulist = ''
      info('').then(res => {
        const timestamp = res
        const options = {
          page: val,
          column_id: this.istype,
          timestamp: timestamp
        }
        xbqv2(options).then(res => {
          if (res.code === 100) {
            this.tabinfo = res.data.columnInfo;
            this.menulist = res.data.notes.data;
            this.len = this.menulist.length;
          } else {
            this.$alert(res.message, {
              callback: action => {
                this.$router.back(-1);
              }
            })
          }
        })
      })
    },
    table(index) {
      this.num = index;
    },
    tables() {
      this.num = null;
      this.index = null;
    },
    setcartoon(id, note_type, detail_url) {
      if (note_type == 1) {
        this.$router.push({
          path: '/xibanqiu/Cartoon',
          query: {
            happyid: id
          }
        })
      } else {
        if (typeof window == 'object') {
          window.open(detail_url, "_blank");
        }
      }
    },
    handleClose(done) {
      this.MXcallzz = '';
      done();
    },
    openvideos(items) {
      if (!items.video) {
        return false;
      }
      this.dialogVisible = true;
      this.MXcallzz = items;
    },
    openvideoauto(items) {
      this.dialogVisibleshu = true;
      this.MXcallzz = items;
    },
    handleClick(tab, event) {
      this.currentPage1 = 1;
      this.lmid = tab.$vnode.key;
      this.istype = tab.$vnode.key;
      this.menulist = '';
      info('').then(res => {
        const timestamp = res;
        const options = {
          source: 0,
          get_column: 0,
          column_id: tab.$vnode.key,
          timestamp: timestamp
        }
        xbqv2(options).then(res => {
          if (res.code === 100) {
            this.tabinfo = res.data.columnInfo;
            this.menulist = res.data.notes.data;
            this.totalorder = res.data.notes.total;
            this.per_page = res.data.notes.per_page;
            this.len = this.menulist.length;
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
    xbqcolumns() {
      info('').then(res => {
        const timestamp = res
        const options = {
          column_id: this.istype,
          source: 0,
          get_column: 1,
          timestamp: timestamp
        }
        xbqv2(options).then(res => {
          if (res.code === 100) {
            this.tablists = res.data.columns;
            // let cc = res.data.columns;
            const { columns } = res.data;
            this.lmid = res.data.columns[0].id;
            this.tabinfo = res.data.columnInfo;
            this.menulist = res.data.notes.data;
            this.len = this.menulist.length;
            this.totalorder = res.data.notes.total;
            this.per_page = res.data.notes.per_page;
            let that = this;
            columns.forEach(function (item, index) {
              if (item.id == that.istype) {
                let ll = index;
                that.activeName = ll.toString();
              }
            });
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
@import "../../static/styles/xibanqiu/index.scss"
</style>
