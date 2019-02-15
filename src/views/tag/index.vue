<template>
  <div class="user-container">
    <div class="controls">
      <div class="input-content">
        <el-input
          v-model="search"
          size="small"
          placeholder="输入关键字搜索"/>
      </div>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addTag">新增标签</el-button>
    </div>
    <el-table
      :data="tagList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      border>
      <el-table-column
        label="分类ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="名称"
        prop="name">
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
            @click="addTag(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增/编辑用户表单 -->
    <el-dialog class="custom-dialog" title="编辑目录" center :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="目录名称" :label-width="formLabelWidth">
          <el-input class="form-input" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { session } from '@/utils'

export default {
  name: 'tagList',
  data () {
    return {
      userInfo: {},
      dialogFormVisible: false,
      form: {
        name: '',
        id: ''
      },
      formLabelWidth: '80px',
      search: '',
      projectId: ''
    }
  },
  computed: {
    ...mapGetters(['tagList'])
  },
  methods: {
    addTag (row) {
      this.dialogFormVisible = true
      this.form.name = ''
      this.form.id = ''
      if (row.id) {
        this.form = {
          name: row.name,
          id: row.id
        }
      }
    },
    handleSubmit () {
      const { id, name } = this.form
      if (!name) {
        this.$message.error('标签名不能为空')
        return
      }
      if (id) {
        /* eslint-disable */
        this.$store.dispatch('updateTag', { tagid: id, tagname: name })
        .then(() => {
          this.$message({
            type: 'success',
            message: '更新成功'
          })
          this.dialogFormVisible = false
          this.$store.dispatch('getTagList', { params: { projectid: this.projectId } })
          this.$store.dispatch('getMenuList', { params: { projectid: this.projectId } })
        })
        .catch(() => {
          this.$message.error('更新失败')
        })
        /* eslint-enable */
      } else {
        /* eslint-disable */
        this.$store.dispatch('addTag', { projectid: this.projectId, tagname: name })
        .then(() => {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.dialogFormVisible = false
          this.$store.dispatch('getTagList', { params: { projectid: this.projectId } })
          this.$store.dispatch('getMenuList', { params: { projectid: this.projectId } })
        })
        .catch(() => {
          this.$message.error('新增失败')
        })
        /* eslint-enable */
      }
    },
    handleDelete (index, row) {
      this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        /* eslint-disable */
        this.$store.dispatch('delTag', {params: {id: row.id}})
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.$store.dispatch('getTagList', { params: { projectid: this.projectId } })
          this.$store.dispatch('getMenuList', { params: { projectid: this.projectId } })
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
    this.projectId = session.getItem('projectId')
    this.$store.dispatch('getTagList', { params: { projectid: this.projectId } })
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
