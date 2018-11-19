<template>
  <div class="table-content">
    <div class="table-table">
      <table cellspacing="0" border="1">
        <tr class="trd">
          <th>代开增值税发票缴纳税款申请表</th>
        </tr>
        <tr>
          <td class="trd-left">
            <span>代开人声明：</span>
            <p>
              <span>&emsp;&emsp;本次缴纳税款申请单提供的开票信息真实、完整、准确，符合有关法律法规，现申请代开增值税普通发票。</span>
            </p>
            <br>
            <div>
              <input type="text" style="border: none; width: 300px">
              <span>代开人（盖章）：<input type="text" style="border: none; width: 150px"></span>
              <span><input type="text" style="border: none; width: 35px; text-align: center;">年</span>
              <span><input type="text" style="border: none; width: 35px; text-align: center;">月</span>
              <span><input type="text" style="border: none; width: 35px; text-align: center;">日</span>
            </div>
          </td>
        </tr>
        <div style="width: 100%">
          <tr class="trd" :model="payer">
            <td class="trd" rowspan="3">购买方<br>信息</td>
            <td class="t-l">名称</td>
            <td class="trd" colspan="2">{{payer.payerName}}</td>
            <td class="t-l">纳税人识别</td>
            <td class="trd" colspan="3">{{payer.payerCode}}</td>
          </tr>
          <tr class="trd">
            <td class="t-l">地址</td>
            <td class="trd" colspan="2">{{payer.payerAddr}}</td>
            <td class="t-l">开户银行</td>
            <td class="trd" colspan="3">{{payer.payerBank}}</td>
          </tr>
          <tr class="trd">
            <td class="t-l">电话</td>
            <td class="trd" colspan="2">{{payer.payerPhone}}</td>
            <td class="t-l">银行账号</td>
            <td class="trd" colspan="3">{{payer.payerBankNo}}</td>
          </tr>
          <tr :model="payee">
            <td class="trd" rowspan="3">销售方<br>信息</td>
            <td class="t-l">名称</td>
            <td class="trd" colspan="2">{{payee.payeeName}}</td>
            <td class="t-l">纳税人识别</td>
            <td class="trd" colspan="3">{{payee.payeeCidno}}</td>
          </tr>
          <tr class="trd">
            <td class="t-l">地址</td>
            <td class="trd" colspan="2"></td>
            <td class="t-l">开户银行</td>
            <td class="trd" colspan="3">
            </td>
          </tr>
          <tr class="trd">
            <td class="t-l">电话</td>
            <td class="trd" colspan="2"></td>
            <td class="t-l">银行账号</td>
            <td class="trd" colspan="3"></td>
          </tr>
          <tr class="trd">
            <td class="trd" colspan="2">代开人类型</td>
            <td class="trd" colspan="6">
              <label>自然人<input type="checkbox" style="vertical-align: text-top;display: inline-block;"></label>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <label>其他纳税人<input type="checkbox" style="vertical-align: text-top;display: inline-block;"></label>
            </td>
          </tr>
          <tr class="trd">
            <td class="trd" colspan="2">减免税标识（代开普通<br/>发票，符合条件填写）</td>
            <td class="trd" colspan="6">
              <label>是<input type="checkbox" style="vertical-align: text-top;display: inline-block;"/></label>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <label>否<input type="checkbox" style="vertical-align: text-top;display: inline-block;"/></label>
            </td>
          </tr>
          <tr class="trd">
            <td class="trd" colspan="2">减免税种</td>
            <td class="trd" colspan="3">减免税类型</td>
            <td class="trd" colspan="3">减免原因</td>
          </tr class="trd">
          <tr class="trd" style="height: 25px;">
            <td class="trd" colspan="2"><input class="ipt" type="text"/></td>
            <td class="trd" colspan="3"><input class="ipt" type="text"/></td>
            <td class="trd" colspan="3"><input class="ipt" type="text"/></td>
          </tr>
          <tr>
            <td class="trd" width="120px;">货物或应税<br/>劳务、服务名称</td>
            <td class="trd" width="120px;">规格型号<br/>（服务类型）</td>
            <td class="trd" width="60px;">计量<br/>单位</td>
            <td class="trd" width="80px;">数量</td>
            <td class="trd" width="140px;">单价</td>
            <td class="trd" width="100px;">不含税<br/>销售额</td>
            <td class="trd" width="100px;">征收税</td>
            <td class="trd" width="100px;">税额</td>
          </tr>
          <!--可循环这个tr-->
          <tr class="trd" v-for="goods in goodsList">
            <td class="trd">{{goods.goodsName}}</td>
            <td class="trd">{{goods.goodsType}}</td>
            <td class="trd">{{goods.measureUnit}}</td>
            <td class="trd">{{goods.buyedNum}}</td>
            <td class="trd">{{goods.price}}</td>
            <td class="trd">{{goods.salesVolume}}</td>
            <td class="trd"></td>
            <td class="trd"></td>
          </tr>
          <tr class="trd">
            <td class="trd">价税合计（大写）</td>
            <td class="t-l" colspan="3"></td>
            <td class="trd">价税合计（小写）</td>
            <td class="t-l" colspan="3"></td>
          </tr>

          <tr class="trd">
            <td class="trd">受理税务机关</td>
            <td class="t-l" colspan="7">
              <div>
                <span>税收完税凭证号：</span><span><input style="border: none;text-align: left;width:260px;"
                                                  type="text"/></span>
              </div>
              <div>
                <span>发票代码：</span><span><input style="border: none;text-align: left;width:308px;"
                                               type="text"/></span>
              </div>
              <div>
                <span>发票号码：</span><span><input style="border: none;text-align: left;width:308px;"
                                               type="text"/></span>
              </div>
              <div style="padding-left:250px;">
                <span>经办人（签字）</span>
                <input style="border: none;text-align: left;width:100px;" type="text"/>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input style="border: none;text-align: center;width:50px;" type="text"/><span>年</span>
                <input style="border: none;text-align: center;width:50px;"
                       type="text"/><span></span><span>月</span>
                <input style="border: none;text-align: center;width:50px;" type="text"/><span></span><span>日</span>
              </div>

            </td>
          </tr>

          <tr class="trd">
            <td class="trd">收件地址</td>
            <td class="trd" colspan="7">{{address}}
            </td>
          </tr>
        </div>
      </table>
    </div>

    <br>
    <div>
      <router-link to="/OrderCenter">
        <el-button type="info">回到票务中心</el-button>
      </router-link>
      <!-- <span class="btn">确认修改并提交</span> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderShow",
    data() {
      return {
        orderId: sessionStorage.getItem('orderId'),
        // orderId: '67a06157adf5',
        payer: {},
        payee: {},
        address: '',
        goodsList: []
      }
    },
    mounted() {
      this.showOrderDtl()
    },
    methods: {
      showOrderDtl() {
        this.$http.ShowOrderDtl(this.orderId).then((result) => {
          if (result.c === 200) {
            this.payer = result.r.payerEntity
            this.payee = result.r.payeeEntity
            this.goodsList = result.r.shoppingTrolleyEntities
            this.address = result.r.addressEntity.address
          } else {
            this.$message.error(result.r)
          }
        }, (err) => {
          this.$message.error(err.msg)
        })
      }
    }
  }
  computed: {
    // todo 金额汇总
    // todo 大写金额
  }
</script>

<style>
  .table-content {
  /*  width: 100%;
    margin: 0 auto;
    font-size: 14px;
    color: #222222;*/
    margin:0 auto;
    width:861.6px;
    height:100%;
    font-family: "Microsoft YaHei";
  }
  .table-table {
   width: 861.6px;
   display: inline;
  }

  .trd {
    /*border: 1px solid #151515;*/
    min-height: 25px;
    line-height: 25px;
    text-align: center;
    vertical-align: middle;
  }
  .trd-left {
    /*border: 1px solid #151515;*/
    min-height: 25px;
    line-height: 25px;
    text-align: left;
    vertical-align: middle;
  }
  .t-l {
    /*border: 0px solid #151515;*/
    min-height: 25px;
    line-height: 25px;
    text-align: left;
    vertical-align: middle;
  }

  .ipt {
    border: 0px;
    text-align: left;
    width: 98%;
    height: 25px;
    text-align: center;
  }

  .btn {
    display: block;
    margin: 15px auto;
    width: 260px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #cccccc;
  }

  /*input {*/
  /*height: 18px;*/
  /*}*/
</style>
