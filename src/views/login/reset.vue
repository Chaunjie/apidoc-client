<template>
  <div class="reset-container">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="reset-form">
      <el-form-item label="原始密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="设置密码" prop="newPass">
        <el-input type="password" v-model="ruleForm2.newPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="custom-btn" @click="submitForm('ruleForm2')">重置密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { util } from '@/utils'

export default {
  name: 'reset',
  data () {
    const validateNewPass = (rule, value, callback) => {
      if (value.length < 6 || value.length > 16) {
        callback(new Error('请输入6~16新密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value.length < 6 || value.length > 16) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userInfo: {},
      ruleForm2: {
        pass: '',
        checkPass: '',
        newPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        newPass: [
          { validator: validateNewPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { ruleForm2 } = this
          const noCheck = {
            oldpassword: ruleForm2.pass,
            newpassword: ruleForm2.newPass,
            userid: this.userInfo.userId
          }
          this.$store.dispatch('updatePwd', noCheck).then(() => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$refs[formName].resetFields()
            setTimeout(() => {
              this.$router.back()
            }, 2000)
          }).catch(res => {
            this.$message.error(res.message)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.userInfo = util.getCookie('userInfo')
  }
}
</script>
<style lang="less" scoped>
  .reset-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 100px;
    .reset-form {
      width: 400px;
    }
    .custom-btn {
      width: 300px;
    }
  }
</style>
