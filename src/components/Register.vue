<template>
  <div class="register">
    <el-container>
      <el-header>
        <div id="navigate">
          <div class="headerLeft">
            <router-link to="/" style="text-decoration:none; color: #2c3e50;"><b class="logo">乐税宝|</b></router-link>
            <b>{{msg}}</b>
          </div>
          <div class="headerRight">
            <b class="logo">&nbsp</b>
            <b style="color: #bbbbbb; font-size: 13px">已有账号&nbsp&nbsp现在&nbsp</b>
            <!--<button class="button button-rounded button-tiny"-->
            <!--style="font-size: 16px;color: #2c3e50; font-family: 'Microsoft YaHei'">-->
            <Login></Login>
            <!--</button>-->
            &nbsp&nbsp&nbsp&nbsp
          </div>
          <br><br>
          <hr>
        </div>
      </el-header>
      <el-main>
        <div class="main" style="width: 400px">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="ruleForm.username" placeholder="请设置用户名"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="phone">
              <el-input v-model="ruleForm.phone" placeholder="用户登录和找回密码"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请设置登录密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"
                        placeholder="请确认登录密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码：" prop="validatecode">
              <el-input v-model.number="ruleForm.validatecode" autocomplete="off" placeholder="请输入验证码">
                <div slot="append" @click="getSms(ruleForm.phone)">获取短信验证码</div>
              </el-input>
              <br>
              <el-checkbox v-model="checked">阅读并接受<u>《乐税宝用户协议》</u></el-checkbox>
              <br><br>
              <el-button style="width:310px; float: right; background-color: #d7d7d7;" @click="register('ruleForm')">
                注册
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
      <el-footer>
        <div class="content" style="width: 800px">
          <h3>乐税宝信息科技有限公司
            <hr>
          </h3>
        </div>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  /* eslint-disable indent,indent,space-before-function-paren,no-unused-vars,semi */

  import Login from "./Login";

  export default {
    name: 'Register',
    components: {Login},
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        msg: '注册乐税宝账号',
        ruleForm: {
          username: '',
          phone: '',
          pass: '',
          checkPass: '',
          validatecode: ''
        },
        checked: true,
        smsId: '',
        rules: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '手机号码不能为空', trigger: 'blur'},
            {min: 11, max: 11, message: '手机号码长度为11位数字值', trigger: 'blur'}
          ],
          pass: [
            {required: true, validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur'}
          ],
          validatecode: [
            {required: true, message: '短信验证码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      getSms(phone) {
        if (phone.length === 11) {
          this.$http.SmsSend(phone).then((result) => {
            if (result.c === 200) {
              this.smsId = result.r
              this.$message.success('已发送验证码！请查看手机。')
            } else {
              this.$message.error(result.r)
            }
          }, (err) => {
            this.$message.error(err.msg)
            // this.searchLoading = false
          })
        } else {
          this.$message.error('请填写正确的手机号码')
        }
      },
      register(ruleForm) {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            var registerData = {
              username: this.ruleForm.username,
              phone: this.ruleForm.phone,
              password: this.ruleForm.pass,
              smsCode: this.ruleForm.validatecode,
              smsId: this.smsId
            }
            this.$http.Register(registerData).then((result) => {
              if (result.c === 200) {
                // 跳转到Enter
                this.$router.push({name:'Enter'})
                this.$message.success('注册成功，请登录！')
              } else {
                this.$message.error(result.r)
              }
            }, (err) => {
              this.$message.error(err.msg)
              // this.searchLoading = false
            })
          } else {
            this.$message.error('请正确填写注册信息！')
          }
        })
      }
    }
  }
</script>

<style scoped>
  div #navigate {
    width: 800px;
    display: inline-block;
  }

  .headerLeft {
    overflow: auto;
    float: left;
  }

  .headerRight {
    overflow: auto;
    float: right;
  }

  .logo {
    font-size: 28px;
  }

  h3 {
    float: bottom;
    font-size: 20px;
    color: #666666;
  }

</style>
