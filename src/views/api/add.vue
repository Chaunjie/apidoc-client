<style lang="less" scoped>
  .api-header {
    margin: 20px 0;
    text-align: left;
  }
</style>
<template>
  <div class="home">
    <div class="api-header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="API名称">
          <el-input v-model="formInline.name" placeholder="API名称"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="formInline.tag" placeholder="所属分类">
            <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="onSubmit">保存API</el-button>
        </el-form-item>
      </el-form>
    </div>
    <mavon-editor :toolbars="toolbars1" :ishljs = "true" v-model="value" @change="editData" style="width:100%;height:500px;z-index:899"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mavonEditor } from 'mavon-editor'
import { session } from '@/utils'
import 'mavon-editor/dist/css/index.css'

export default {
  name: 'apiAdd',
  data () {
    return {
      projectId: '',
      id: '',
      formInline: {
        name: '',
        tag: ''
      },
      htmlStr: '',
      value: '',
      toolbars1: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      templateApi: '### 请求类型： get\n' +
       '\n' +
       '### 请求路径： http://127.0.0.1/login\n' +
       '\n' +
       '### 请求参数：\n' +
       '|字段名|字段类型|备注|\n' +
       '|-|-|-|\n' +
       '|test|varchar(255)|测试|\n' +
       '|name|varchar(255)|名称|\n' +
       '|age|int|年龄|\n' +
       '\n' +
       '### 返回数据：\n' +
       '```json\n' +
       '{\n' +
       '    "code":200,\n' +
       '    "msg":"OK",\n' +
       '    "total":5,\n' +
       '    "data":[\n' +
       '        {\n' +
       '            "project_id":"1",\n' +
       '            "project_name":"测试项目",\n' +
       '            "project_state":1,\n' +
       '            "created_at":0,\n' +
       '            "updated_at":0\n' +
       '        },\n' +
       '        {\n' +
       '            "project_id":"2",\n' +
       '            "project_name":"测试项目2",\n' +
       '            "project_state":1,\n' +
       '            "created_at":0,\n' +
       '            "updated_at":0\n' +
       '        }\n' +
       '    ]\n' +
       '}\n' +
       '```'
    }
  },
  computed: {
    ...mapGetters(['tagList'])
  },
  components: {
    mavonEditor
  },
  methods: {
    onSubmit () {
      const { id, value, htmlStr, formInline, projectId } = this
      if (!formInline.name || !formInline.tag) {
        this.$message.error('信息不完全')
        return
      }
      /* eslint-disable */
      let form = new FormData()
      if (+id === 0) {
        form.append('apiname', formInline.name)
        form.append('tagid', formInline.tag)
        form.append('projectid', projectId)
        form.append('mdcontent', value)
        form.append('htmlcontent', htmlStr)
        let param = new URLSearchParams(form)
        this.$store.dispatch('addApi', param)
        .then(res => {
          this.$message({
            type: 'success',
            message: '新增成功'
          })
          this.$store.dispatch('getMenuList', { params: { projectid: this.projectId } }).then(() => {
            this.$router.push({ name: 'api', params: { id: res }})
          })
        })
        .catch(res => {
          this.$message.error('新增失败')
        })
      } else {
        form.append('apiname', formInline.name)
        form.append('tagid', formInline.tag)
        form.append('mdcontent', value)
        form.append('htmlcontent', htmlStr)
        form.append('id', id)
        let param = new URLSearchParams(form)
        this.$store.dispatch('updateApi', param)
        .then(res => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$store.dispatch('getMenuList', { params: { projectid: this.projectId } })
        })
        .catch(res => {
          this.$message.error('新增失败')
        })
      }
      /* eslint-enable */
    },
    editData (value, render) {
      this.htmlStr = render
    },
    initData () {
      const apiInfo = this.$store.state.apiInfo
      if (apiInfo.id) {
        this.formInline = {
          name: apiInfo.name,
          tag: apiInfo.tagId
        }
        this.value = apiInfo.editContent
      } else {
        this.$store.dispatch('getApi', { params: { id: this.id } }).then(() => {
          this.initData()
        })
      }
    }
  },
  mounted () {
    this.value = this.templateApi
    this.projectId = session.getItem('projectId')
    this.$store.dispatch('getTagList', { params: { projectid: this.projectId } })
    this.id = this.$route.params.id
    if (+this.id !== 0) {
      this.initData()
    }
  }
}
</script>
