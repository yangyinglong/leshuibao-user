<template>
  <div class="payment">
    <el-container>
      <el-header>
        <div class="navigate">
          <div class="headerLeft">
            <router-link to="/" style="text-decoration: none;"><b class="logo">乐税宝|</b></router-link>
            <b>{{msg}}</b>
          </div>
          <div class="headerRight">
            <b class="logo">&nbsp</b>
            <router-link to="/usercenter" style="text-decoration: none;"><b class="linked">个人中心</b></router-link>
            <Logout></Logout>
            <b>&nbsp&nbsp&nbsp&nbsp</b>
          </div>
          <br><br>
          <hr>
        </div>
      </el-header>
      <el-main>
        <div class="main">
          <div>
            <div class="content" style="margin: 10px" @click="alipay"><img src="static/image/alipay.png" height="200px"></div>
            <div class="content" style="margin: 10px" @click="wxpay"><img :src="wxPayImg" height="200px"></div>
            <!--<div class="content" style="margin: 10px"><img src="static/image/wechartPay.jpeg" height="200px"></div>-->
          </div>
          <div class="content" style="margin: 20px">
            <div style="background-color: #d7d7d7;height: 48px; width: 500px; display: table;">
              <div class="content" style="display: table-cell">请点击支付宝或微信图标 支付金额： <u style="color: red">{{all_amount}}</u> 元</div>
            </div>
            <div style="height: 20px"/>
            <div style="margin-top: 40px">
              <!--<router-link to="/usercenter">-->
              <!--<el-button style="width:280px; float: right; background-color: #d7d7d7;" @click="alipay">-->
                <!--支付宝支付-->
              <!--</el-button>-->
              <!--</router-link>-->
              <router-link to="/tradinghall">
                <el-button type="primary">暂不支付&nbsp&nbsp&nbsp&nbsp继续开票</el-button>
              </router-link>
            </div>
          </div>
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
  /* eslint-disable indent,indent,space-before-function-paren */
  import Logout from "./Logout"

  export default {
    name: 'Payment',
    components: {Logout},
    data() {
      return {
        wxPayImg: 'static/image/weixinzhifu.png',
        msg: '支付',
        amount: 0,
        payTraceCode: '',
        orderId: this.$route.query.orderId,
        all_amount: this.$route.query.all_amount,
        htmls: ''
      }
    },
    methods: {
      alipay() {
        var payData = {
          orderId: this.orderId,
          allAmount: this.all_amount
        }
        this.$http.AliPay(payData).then((result) => {
          if (result.c === 200) {
            let routerData = this.$router.resolve({path:"subpayment", query:{htmls: result.r}})
            this.htmls = result.r
            // 打开新页面
            window.open(routerData.href, '_blank')
            const div = document.createElement('div')
            div.innerHTML = result.r  //此处form就是后台返回接收到的数据
            document.body.appendChild(div)
            document.forms[0].submit()
            // this.$message.info('付款成功！请等待管理员审核。')
            // this.$router.push({name: 'UserCenter'})
            // this.$message.success(result.r)
          } else {
            this.$message.warning(result.r)
          }
        }, (err) => {
          this.$message.error(err.msg)
          // this.searchLoading = false
        })
      },
      wxpay() {
        var payData = {
          orderId: this.orderId,
          allAmount: this.all_amount
        }
        this.$http.WxPay(payData).then((result) => {
          if (result.c === 200) {
            this.wxPayImg = 'http://leshuibao.cn:7070/api/suppliment/printQrImg?orderId=' + this.orderId
            // 返回一个二维码的地址 todo
          } else {
            this.$message.warning(result.r)
          }
        }, (err) => {
          this.$message.error(err.msg)
        })
      }
    }
  }
</script>

<style scoped>
</style>
