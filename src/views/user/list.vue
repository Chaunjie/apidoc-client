<template>
  <div class="user-container">
    <div class="controls">
      <div class="input-content">
        <el-input
          v-model="search"
          size="small"
          placeholder="输入关键字搜索"/>
      </div>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addUser">添加管理员</el-button>
    </div>
    <el-table
      :data="userList.filter(data => !search || data.userName.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border>
      <el-table-column
        label="用户ID"
        prop="userId">
      </el-table-column>
      <el-table-column
        label="名称"
        prop="userName">
      </el-table-column>
      <el-table-column
        label="创建时间"
        sortable
        prop="date">
      </el-table-column>
      <el-table-column
        label="操作"
        align="left">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="addUser(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="getRelation(scope.$index, scope.row)">关联项目</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑用户表单 -->
    <el-dialog class="custom-dialog" title="编辑管理员" center :visible.sync="dialogFormVisible" v-if="userInfo.role === 1">
      <el-form :model="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input class="form-input" v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input class="form-input" type="password" v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 关联项目 -->
    <el-dialog class="custom-dialog" title="关联项目" center :visible.sync="dialogRelationVisible">
      <el-checkbox-group v-model="checkList" class="custom-checkbox">
        <el-checkbox v-for="(item, index) in allProjectList" :key="'checkbox-' + index" :label="item.projectId">{{item.projectName}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRelationVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRelations">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { util } from '@/utils'

export default {
  name: 'list',
  data () {
    return {
      userInfo: {},
      dialogFormVisible: false,
      dialogRelationVisible: false,
      form: {
        username: '',
        password: '',
        userid: ''
      },
      formLabelWidth: '80px',
      search: '',
      checkList: [],
      oldCheck: [],
      rowUserId: ''
    }
  },
  computed: {
    ...mapGetters(['userList', 'allProjectList'])
  },
  methods: {
    addUser (row) {
      this.dialogFormVisible = true
      this.form.userid = ''
      this.form.username = ''
      this.form.password = ''
      if (row.userId) {
        this.form = {
          username: row.userName,
          userid: row.userId
        }
      }
    },
    submitRelations () {
      const { rowUserId, checkList } = this
      /* eslint-disable */
      this.$store.dispatch('updateRelations', {userid: rowUserId, list: checkList})
      .then(() => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.dialogRelationVisible = false
      })
      .catch(() => {
        this.$message.error('更新失败')
      })
      /* eslint-enable */
    },
    handleSubmit () {
      const { userid, username, password } = this.form
      if (!username || !password) {
        this.$message.error('用户信息不完善')
        return
      }
      if (userid) {
        const { username, ...noName } = this.form
        /* eslint-disable */
        this.$store.dispatch('updateUserInfo', noName)
        .then(() => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.dialogFormVisible = false
        })
        .catch(() => {
          this.$message.error('更新失败')
        })
        /* eslint-enable */
      } else {
        const { userid, ...noId } = this.form
        const companyInfo = { companyid: this.userInfo.companyId, userid: this.userInfo.userId }
        /* eslint-disable */
        this.$store.dispatch('addUser', { ...noId, ...companyInfo })
        .then(() => {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.dialogFormVisible = false
          this.$store.dispatch('getUserList', { params: { userid: this.userInfo.userId, companyid: this.userInfo.companyId } })
        })
        .catch(() => {
          this.$message.error('新增失败')
        })
        /* eslint-enable */
      }
    },
    getRelation (index, row) {
      /* eslint-disable */
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$store.dispatch('getProjectCheck', { params: { userid: row.userId, companyid: this.userInfo.companyId } })
      .then(res => {
        loading.close()
        this.checkList = res
        this.oldCheck = res
        this.dialogRelationVisible = true
        this.rowUserId = row.userId
      }).catch(loading.close())
      /* eslint-enable */
    },
    handleDelete (index, row) {
      this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        /* eslint-disable */
        this.$store.dispatch('delUser', {params: {userid: row.userId, adminid: this.userInfo.userId}})
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.$store.dispatch('getUserList', { params: { userid: this.userInfo.userId, companyid: this.userInfo.companyId } })
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
    }
  },
  mounted () {
    this.userInfo = util.getCookie('userInfo')
    if (this.userInfo.role !== 1) {
      this.$router.back()
      return
    }
    this.$store.dispatch('getUserList', { params: { userid: this.userInfo.userId, companyid: this.userInfo.companyId } })
  }
}
</script>
<style lang="less">
  .user-container {
    .controls {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      .input-content {
        width: 200px;
      }
    }
    .custom-dialog {
      .el-dialog{
        width: 30%;
        .custom-checkbox {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          & > .el-checkbox {
            margin-right: 20px;
            margin-left: 0;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>
