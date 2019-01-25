<template>
  <div class="layout-page">
    <el-row class="admin-row">
      <el-col :span="4" style="background-color: #324057;">
        <el-menu class="el-menu-dark"
          ref="menuRef"
          :default-active="defaultActive"
          style="min-height: 100%;"
          background-color="#324057"
          text-color="#bfcbd9"
          active-text-color="#20a0ff"
          v-if="status"
          :router="true">
          <el-menu-item index="/project" class="logo">
            <i>ApiDoc</i>
          </el-menu-item>
          <el-submenu v-for="item in menuList" :key="item.id" :index="item.id">
            <template slot="title"><i :class="'el-icon-' + item.icon"></i>{{item.title}}</template>
            <el-menu-item v-for="it in item.list" :key="it.id" :index="it.path">
              {{it.name}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <Header :active-path="defaultActive" @change="handleChange"/>
        <keep-alive>
          <div class="padding-container">
            <router-view></router-view>
          </div>
        </keep-alive>
      </el-col>
    </el-row>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from './header.vue'
import { session } from '@/utils'

export default {
  components: {
    Header
  },
  data () {
    return {
      list: [],
      status: true
    }
  },
  computed: {
    ...mapGetters(['menuList']),
    defaultActive () {
      return this.$route.path
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleChange () {
      console.log('=========左侧导航重置===========')
      // this.status = false
      // this.$nextTick(() => {
      //   this.status = true
      // })
    }
  },
  mounted () {
    const projectId = session.getItem('projectId')
    this.$store.dispatch('getMenuList', { params: { projectid: projectId } })
  }
}
</script>
<style lang="less" scoped>
  .layout-page {
    flex: 1;
    display: flex;
  }
  .admin-row {
    flex: 1;
    display: flex;
  }
  .el-menu-item {
    text-align: left;
    &.logo{
      text-align: center;
      font-weight: bold;
      i {
        font-size: 30px;
        color: rgb(32, 160, 255) !important;
      }
      &.is-active{
        border: none;
      }
    }
    &.is-active{
      border-right: 3px solid;
    }
  }
  .el-submenu {
    text-align: left;
  }
  .el-menu-dark {
    border-right: none;
    width: 100%;
    .el-submenu {
      .el-menu {
        .el-menu-item{
           background-color: #1f2d3d !important;
           &:focus, &:hover{
            background-color: #48576a !important;
           }
        }
      }
    }
  }
  .el-submenu__title i{
    color: #bfcbd9;
    position: relative;
    top: -2px;
  }
  .padding-container {
    padding: 20px 50px;
  }
</style>
