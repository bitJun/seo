<template>
<div class="sidebar-container">
  <div class="header_left_list">
    <img src='/images/icon_login.png' class="Img-header">
  </div>
  <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <div v-for="(item, index) in routers" :key="index">
      <el-submenu :index="item.id" v-if="item.children">
        <template slot="title">
          <span><svg-icon :icon-class="item.icon"/>{{item.name}}</span>
        </template>
        <el-menu-item-group v-for="(json,key) in item.children" :key="key">
          <el-menu-item :index="json.id">
            <nuxt-link :to="json.path">{{json.name}}
            </nuxt-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :index="item.id" v-else>
        <nuxt-link :to="item.path">
          <svg-icon :icon-class="item.icon"/>
          {{item.name}}
        </nuxt-link>
      </el-menu-item>
    </div>
  </el-menu>
  <div class="left_Imgsno">
    <img src="/images/kefu1.png" class="myfirsts" style="position: absolute; width: 80px; top: -40px; left: 177px;">
    <img src="/images/kefu0.png" alt="" @click="opnekefu">
  </div>
</div>
</template>
<script>
export default {
  name: 'layout',
  data() {
    return {
      routers: [{
          id: '1-1',
          name: '首页',
          path: '/',
          icon: 'dashboard'
        },
        {
          id: '2-0',
          name: '分校',
          path: '',
          icon: 'example',
          children: [{
              id: '2-1',
              name: '湖南',
              path: '/hunan',
              icon: 'example'
            },
            {
              id: '2-2',
              name: '山东',
              path: '/shandong',
              icon: 'example'
            }
          ]
        },
        {
          id: '3-1',
          name: '课程',
          path: '/class',
          icon: 'zbkc'
        },
        {
          id: '4-1',
          name: '资料',
          path: '/ziliao',
          icon: 'nested'
        },
        {
          id: '5-1',
          name: '公考百科',
          path: '/gkbaike',
          icon: 'baidubaike'
        },
        {
          id: '6-1',
          name: '师资',
          path: '/teachers',
          icon: 'shizi'
        },
        {
          id: '7-1',
          name: '犀星球',
          path: '/xibanqiu',
          icon: 'xibanqiu'
        },
        {
          id: '8-1',
          name: '移动学习',
          path: '/dashboard',
          icon: 'link'
        },
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goLink() {

    },
    opnekefu() {
      if (typeof window == 'object') {
        console.log('ysf', ysf);
        ysf('open', {
          templateId: '6167009'
        })
      }
    },
  }
}
</script>

<style>
.el-menu-item a {
  display: block;
}
</style>
<style lang="css" scoped>
.sidebar-container {
  width: 220px;
  background: #fff;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  overflow: hidden;
}

.header_left_list {
  width: 100%;
  text-align: center;
}

.Img-header {
  width: 138px;
  cursor: pointer;
  height: auto;
  margin: 20px 0px;
}
.left_Imgsno {
  position: fixed;
  left: -5px;
  z-index: 9999;
  bottom: -15px;
  cursor: pointer;
  width: 250px;
}
.left_Imgsno img {
  width: 120%;
}
</style>
