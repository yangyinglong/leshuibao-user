<template>
  <div class="content">
    <div v-if="loginStatus === 0">
      <b class="linked" @click="dialogLoginVisible = true">{{userName}}</b>
      <el-dialog width="350px" title="登录" :visible.sync="dialogLoginVisible">
        <div>
          <el-form :model="loginform" :rules="rules" ref="loginform" class="demo-ruleForm">
            <el-form-item prop="name">
              <el-input v-model="loginform.name" placeholder="用户名或手机号码" autocomplete="off" clearable></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input type="password" v-model="loginform.password" autocomplete="off"
                        placeholder="请输入登录密码" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="width: 200px; margin:0 auto">
          <div style="float: left">
            <el-checkbox v-model="loginform.rememberPassword">记住密码</el-checkbox>
          </div>
          <router-link to="/forgetPasswd">
            <div style="float: right">忘记密码</div>
          </router-link>
        </div>
        <div style="height: 90px"></div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogLoginVisible = false">取 消</el-button>
          <el-button type="primary" @click="loginData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-else>
      <router-link to="/userCenter" style="text-decoration: none;"><b class="linked">{{userName}}</b></router-link>
    </div>
  </div>

</template>

<script>
  // eslint-disable-next-line indent
  /* eslint-disable indent,indent,space-before-function-paren,no-unused-vars */

  // import $ from '@/api/axios.js';
  // import Qs from 'qs';

  export default {
    name: 'Login',
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.loginform.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback()
        }
      }
      return {
        dialogLoginVisible: false,
        // loginLable: '登录',
        loginform: {
          name: '',
          password: '',
          rememberPassword: false,
          checkPass: ''
        },
        loading: false,
        // loginStatus: 0,
        rules: {
          name: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {min: 3, max: 15, message: '请输入正确的用户名或手机号码', trigger: 'blur'}
          ],
          pass: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      loginStatus() {
        return this.$store.state.loginStatus
      },
      userName() {
        return this.$store.state.userName
      }
    },
    methods: {
      loginData: function () {
        var loginFormData = {
          username: this.loginform.name,
          password: this.loginform.password,
          rememberPassword: this.loginform.rememberPassword
        }
        this.$http.Login(loginFormData).then((result) => {
          sessionStorage.setItem('userId', result.r.userId)
          sessionStorage.setItem('userName', result.r.userName)
          sessionStorage.setItem('phone', result.r.phone)
          sessionStorage.setItem('status', result.r.status)
          sessionStorage.setItem('createTime', result.r.createTime)
          if (result.c === 200) {
            // console.log(result.r)
            this.$store.dispatch('login', result.r).then(() => {
              this.$notify({
                type: 'success',
                message: '欢迎您，' + result.r.userName + '!',
                duration: 2000
              })
            })
            // this.loginLable = result.r.userName
            // this.loginStatus = result.r.status
            this.dialogLoginVisible = false
          } else {
            this.$message.warning("登录失败，请确认用户名和密码。")
            this.dialogLoginVisible = true // todo
          }
        }, (err) => {
          this.$message.error(err.msg)
          // this.searchLoading = false
        })
      }
    }
  }

</script>

<style scoped>

</style>
