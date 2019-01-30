<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">{{ login.title }}</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          :placeholder="login.username"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="login.password"
          name="password"
          auto-complete="on" />
      </el-form-item>
      <el-form-item prop="comfirmPwd">
        <el-input
          :type="passwordType"
          v-model="loginForm.comfirmPwd"
          :placeholder="login.comfirmPwd"
          name="comfirmPwd"
          auto-complete="on"/>
      </el-form-item>
      <el-form-item prop="companyname">
        <el-input
          type="text"
          v-model="loginForm.companyname"
          :placeholder="login.companyName"
          name="companyname"
          auto-complete="on"/>
      </el-form-item>
      <el-form-item prop="code" class="code-item">
        <el-input
          class="code-input"
          type="text"
          v-model="loginForm.code"
          :placeholder="login.validateTip"
          name="code"
          auto-complete="on" />
        <div v-html="checkInfo.img" class="code-view"></div>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ login.logIn }}</el-button>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入有效的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码必须是6-16位'))
      } else {
        callback()
      }
    }
    const validatePwdConfirm = (rule, value, callback) => {
      if (value.length < 6 || value !== this.loginForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    const validateCompanyName = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入有效的公司名称'))
      } else {
        callback()
      }
    }
    const doValCode = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('请输入有效的验证码'))
      } else {
        callback()
      }
    }
    return {
      login: {
        title: '注册',
        username: '用户名(6-16位英文、数字、符号)',
        password: '密码',
        comfirmPwd: '确认密码',
        companyName: '公司名称',
        validateTip: '验证码',
        logIn: '注册'
      },
      loginForm: {
        username: '',
        password: '',
        comfirmPwd: '',
        companyname: '',
        code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        comfirmPwd: [{ required: true, trigger: 'blur', validator: validatePwdConfirm }],
        companyname: [{ required: true, trigger: 'blur', validator: validateCompanyName }],
        code: [{ required: true, trigger: 'blur', validator: doValCode }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  computed: {
    ...mapGetters(['checkInfo'])
  },
  watch: {
    $route: {
      handler (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {
    this.$store.dispatch('getCheck').then(() => {}).catch(() => {})
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        const { comfirmPwd, ...submitData } = this.loginForm
        this.$store.dispatch('registerUser', submitData).then(() => {
          console.log('succcess')
          this.$router.push({ path: '/login' })
        }).catch(() => {
          console.log('error')
        })
      })
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less">
  @bg:#283443;
  @light_gray:#eee;
  @cursor: #fff;
  @supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
    .login-container .el-input input{
      color: @cursor;
      &::first-line {
        color: @light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    background-color: #fff;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 100%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: @light_gray;
        height: 47px;
        caret-color: @cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px @bg inset !important;
          -webkit-text-fill-color: @cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>
<style rel="stylesheet/less" lang="less" scoped>
 @bg:#2d3a4b;
 @dark_gray:#889aa4;
 @light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
.code-input .el-form-item__content {
  flex: 1;
}
.code-view {
  display: inline-block;
  width: 150px;
  height: 44px;
  background-color: #fff;
}
</style>
<style lang="less">
  .code-item > .el-form-item__content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
