<template>
  <div class="api-content">
    <div class="btn-group">
      <el-button type="warning" icon="el-icon-edit" @click="doEdit">编辑API</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="doDel">删除API</el-button>
    </div>
    <div class="api-info" v-html="apiInfo.showContent"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { session } from '@/utils'

export default {
  name: 'api',
  data () {
    return {
      id: '',
      projectId: ''
    }
  },
  computed: {
    ...mapGetters(['apiInfo'])
  },
  watch: {
    $route () {
      this.id = this.$route.params.id
      this.$store.dispatch('getApi', { params: { id: this.id } })
    }
  },
  methods: {
    doEdit () {
      this.$router.push({ name: 'apiAdd', params: { id: this.id } })
    },
    doDel () {
      this.$confirm('此操作将删除该API, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        /* eslint-disable */
        this.$store.dispatch('delApi', { params: { id: this.id } })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.$store.dispatch('getMenuList', { params: { projectid: this.projectId } }).then(() => {
            this.$router.push({ name: 'projectList', params: { id: this.projectId } })
          })
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
    this.id = this.$route.params.id
    this.projectId = session.getItem('projectId')
    this.$store.dispatch('getApi', { params: { id: this.id } })
  }
}
</script>
<style lang="less" scoped>
  .api-content {
    padding: 40px 0;
    .btn-group {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }
  }
</style>
<style lang="less">
  .api-info {
    margin-top: 30px;
    text-align: left;
    width: 600px;
    table {
      width: 100%;
      font-size: 13px;
      line-height: 1.5;
      margin-bottom: 45px;
      background-color: #fff;
      border-collapse: collapse;
      color: #34495e
    }

    table th {
      padding: 8px 10px;
      text-align: left;
      font-weight: 400;
      background-color: #f5f7fa;
      border: 1px solid #eaeefb
    }

    table th:first-child {
      padding-left: 10px
    }

    table td {
      padding: 8px;
      border: 1px solid #eaeefb
    }

    table code {
      font-size: 13px;
      padding: 0 8px;
      font-family: inherit;
      word-break: keep-all
    }

    .markdown--changelog section {
      padding-bottom: 30px
    }

    .markdown--changelog section > h3 + p, .markdown--changelog section > h3 + p code {
      margin: 0
    }

    .markdown--changelog section > h3 a {
      color: inherit;
      font-size: 24px;
      -webkit-font-smoothing: auto
    }

    .markdown--changelog section > h3:not(:first-of-type) {
      margin-top: 50px
    }
    body, p {
      margin: 0
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 10px 0;
      font-size: inherit
    }

    ol, ul {
      margin: 0;
      padding: 0;
      list-style: none
    }

    a {
      text-decoration: none
    }

    .van-doc-row {
      width: 100%
    }

    @media (min-width: 1440px) {
      .van-doc-row {
        width: 1440px;
        margin: 0 auto
      }
    }

    code {
      display: block;
      font-size: 13px;
      overflow-x: auto;
      font-weight: 400;
      line-height: 22px;
      border-radius: 3px;
      margin-bottom: 25px;
      position: relative;
      word-break: break-all;
      white-space: pre-wrap;
      background-color: #f5f7fa;
      color: #455a64;
      padding: 18px 10px 18px 20px;
      font-family: Source Code Pro, Monaco, Inconsolata, monospace
    }

    code:after {
      top: 5px;
      right: 10px;
      position: absolute;
      color: #ccc;
      font-size: 12px
    }

    pre {
      margin: 0
    }

    pre + pre {
      margin-top: -10px
    }

    code.language-html:after {
      content: "HTML"
    }

    code.language-javascript:after {
      content: "JS"
    }

    code.language-css:after {
      content: "CSS"
    }
    code.language-json:after {
      content: "JSON"
    }
    code.language-wxml:after {
      content: "WXML"
    }

    .hljs {
      display: block;
      overflow-x: auto;
      padding: .5em;
      background: #fff
    }

    .hljs-subst {
      color: #455a64
    }

    .hljs-addition, .hljs-meta, .hljs-string, .hljs-symbol, .hljs-template-tag, .hljs-template-variable {
      color: #42b983
    }

    .hljs-comment, .hljs-quote {
      color: #999
    }

    .hljs-bullet, .hljs-link, .hljs-literal, .hljs-number, .hljs-regexp {
      color: #32a973
    }

    .hljs-deletion, .hljs-variable {
      color: #88f
    }

    .hljs-built_in, .hljs-doctag, .hljs-keyword, .hljs-name, .hljs-section, .hljs-selector-class, .hljs-selector-id, .hljs-selector-tag, .hljs-strong, .hljs-tag, .hljs-title, .hljs-type {
      color: #3e76f6
    }

    .hljs-emphasis {
      font-style: italic
    }

    .hljs-attribute {
      color: #e6550d
    }

    .hljs-attr{
      color: #e96900
    }
  }
</style>
