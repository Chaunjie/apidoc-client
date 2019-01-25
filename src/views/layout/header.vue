<template>
  <ul role="menubar" class="el-menu-demo el-menu--horizontal el-menu">
    <li :class="['el-menu-item', activePath === '/tag/list' ? 'is-active' : '']" @click="handleSelect('list')">标签列表</li>
    <li :class="['el-menu-item', isActive ? 'is-active' : '']" @click="handleSelect('add')">新增API</li>
    <li class="right-menu">
      <el-dropdown @command="handleCommand" class="user-dropdown">
        <span class="el-dropdown-link">
          {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="project">项目列表</el-dropdown-item>
          <el-dropdown-item command="userList">用户列表</el-dropdown-item>
          <el-dropdown-item command="login" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </li>
  </ul>
</template>
<script>
import Cookies from 'js-cookie'

export default {
  name: 'k-header',
  props: {
    'activePath': {
      type: String,
      required: true
    }
  },
  data () {
    return {
      userInfo: {},
      activeIndex: ''
    }
  },
  computed: {
    isActive () {
      return this.activePath.indexOf('/api/add') === 0
    }
  },
  methods: {
    handleSelect (path) {
      // this.activePath = path
      this.$emit('change')
      if (path === 'list') {
        this.$router.push({ name: 'tagList' })
      } else if (path === 'add') {
        this.$router.push({ name: 'apiAdd', params: { id: 0 } })
      }
    },
    handleCommand (command) {
      this.$emit('change')
      if (command === 'logout') {
        Cookies.remove('userInfo', { path: '' })
      }
      this.$router.push({ name: command })
    }
  },
  created () {},
  mounted () {
    const userStr = Cookies.get('userInfo')
    if (userStr) {
      this.userInfo = JSON.parse(userStr)
    }
  }
}
</script>
<style lang="less">
  .header_container{
    background-color: #EFF2F7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
  }
  .right-content {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-group{
      margin-right: 40px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .right-menu {
    float: right;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .user-dropdown{
    margin-right: 20px;
    .el-dropdown-link{
      cursor: pointer;
    }
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
