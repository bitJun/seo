<template>
<div class="sidebar-container">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <div v-for="(item, index) in routers" :key="index">
          <el-submenu :index="item.id" v-if="item.children">
              <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.name}}</span>
              </template>
              <el-menu-item-group v-for="(json,key) in item.children" :key="key">
                  <el-menu-item :index="json.id">
                    <nuxt-link :to="json.path">{{json.name}}</nuxt-link>
                    <!-- <a :href="item.path">
                      {{json.name}}
                    </a> -->
                  </el-menu-item>
              </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="item.id" v-else>
              <nuxt-link :to="item.path">{{item.name}}</nuxt-link>
              <!-- <a :href="item.path">
                  <span>{{item.name}}</span>
              </a> -->
          </el-menu-item>
        </div>
    </el-menu>
</div>
</template>

<script>
export default {
    name: 'layout',
    data () {
      return {
        routers: [
          {
            id: '1-1',
            name: '首页',
            path: '/'
          },
          {
            id: '2-0',
            name: '分校',
            path: '',
            children: [
              {
                id: '2-1',
                name: '湖南',
                path: '/hunan'
              },
              {
                id: '2-2',
                name: '山东',
                path: '/shandong'
              }
            ]
          },
          {
            id: '3-1',
            name: '课程',
            path: '/class'
          },
          {
            id: '4-1',
            name: '资料',
            path: '/ziliao'
          },
          {
            id: '5-1',
            name: '公考百科',
            path: '/GKword/GKword'
          },
          {
            id: '6-1',
            name: '师资',
            path: '/form'
          },
          {
            id: '7-1',
            name: '犀星球',
            path: '/videoLibrary/videoLibrary'
          },
          {
            id: '8-1',
            name: '移动学习',
            path: '/movestudy'
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

        }
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
</style>
