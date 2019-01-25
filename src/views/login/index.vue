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
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ login.logIn }}</el-button>
    </el-form>

    <el-dialog :title="login.thirdparty" :visible.sync="showDialog">
      {{ login.thirdpartyTips }}
      <br>
      <br>
      <br>
    </el-dialog>

  </div>
</template>
<script>

export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      login: {
        title: '登录',
        username: '用户名',
        password: '密码',
        logIn: '登录',
        any: '123456',
        thirdparty: '三方登录',
        thirdpartyTips: '三方登录提示'
      },
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
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
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed () {
    // window.removeEventListener('hashchange', this.afterQRScan)
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
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
            this.$message.error('登录失败了哦, 请检查下账号密码!')
          })
        } else {
          console.log('error submit!!')
          return false
        }
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
</style>
