<template>
  <div class="project-list">
    <ul class="header-menu el-menu-demo el-menu--horizontal el-menu">
      <li class="logo">
        <i>ApiDoc</i>
      </li>
      <li class="right-menu">
        <el-dropdown @command="handleCommand" class="user-dropdown">
          <span class="el-dropdown-link">
            {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
    <el-container class="card-container">
      <div class="card-body">
        <div class="card" v-for="(item, index) in projectList" :key="'project' + index">
          <div class="name">{{item.projectName}}</div>
          <div class="overflow">
            <div class="overflow-body">
              <i class="icon el-icon-view" @click="toProject(item.projectId)"></i>
              <i class="icon el-icon-delete" @click="deleteProject(item.projectId)"></i>
            </div>
          </div>
        </div>
        <div class="card card-add" @click="addProject">
          <i class="el-icon-plus plus-icon"></i>
        </div>
      </div>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { util } from '@/utils'

export default {
  name: 'project',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters(['projectList'])
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        util.removeCookie('userInfo')
        this.$router.push({ name: 'login' })
      }
    },
    addProject () {
      this.$prompt('请输入项目名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S/,
        inputErrorMessage: '项目名不能为空'
      }).then(({ value }) => {
        /* eslint-disable */
        this.$store.dispatch('addProject', {projectname: value, userid: this.userInfo.userId, companyid: this.userInfo.companyId})
        .then(() => {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.$store.dispatch('getProjectList', {params: {userid: this.userInfo.userId}})
        })
        .catch(() => {
          this.$message.error('新增失败')
        })
        /* eslint-enable */
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    deleteProject (id) {
      this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        /* eslint-disable */
        this.$store.dispatch('delProject', {params: {projectid: id}})
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.$store.dispatch('getProjectList', {params: {userid: this.userInfo.userId}})
        })
        .catch(() => {
          this.$message.error('删除失败')
        })
        /* eslint-enable */
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    toProject (id) {
      this.$router.push({ name: 'projectList', params: { id: id } })
    }
  },
  mounted () {
    this.userInfo = util.getCookie('userInfo')
    this.$store.dispatch('getProjectList', { params: { userid: this.userInfo.userId } })
  }
}
</script>
<style lang="less" scoped>
  .project-list{
    width: 100%;
    min-height: 100%;
    background-color: #f5f7f9;
    // padding: 0 20px;
    .header-menu{
      .logo{
        float: left;
        height: 60px;
        margin-left: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        i {
          font-size: 30px;
          color: rgb(32, 160, 255) !important;
        }
      }
      .user-dropdown{
        margin-right: 50px;
      }
    }
    .card-container{
      display: flex;
      flex-direction: row;
      justify-content: center;
      .card-body {
        padding: 50px 100px 0 100px;
        width: 1000px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .card {
          float: left;
          width: 180px;
          height: 180px;
          background-color: #fff;
          margin-right: 15px;
          margin-bottom: 15px;
          border-radius: 5px;
          border: 1px solid #eee;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          .plus-icon {
            font-size: 48px;
          }
          .overflow {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,.5);
            border-radius: 5px;
            display: none;
            .overflow-body {
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0,0,0,.5);
              border-radius: 5px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              .icon {
                font-size: 30px;
                color: #fff;
                &.el-icon-view {
                  margin-right: 20px;
                }
              }
            }
          }
          .name {
            padding: 0 20px;
          }
          &:hover{
            .overflow {
              display: block;
            }
          }
        }
      }
    }
    .card {
      // -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
  }
</style>
