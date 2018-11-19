<template>
  <div>
    <el-container>
      <el-header>
        <div class="navigate">
          <div class="headerLeft">
            <router-link to="/" style="text-decoration: none;"><b class="logo">乐税宝|</b></router-link>
            <b>{{msg}}</b>
          </div>
          <div class="headerRight">
            <b class="logo">&nbsp</b>
            <router-link to="/ordercenter" style="text-decoration: none;"><b class="linked">票务中心</b></router-link>
            <b style="color: #999999;">&nbsp|&nbsp</b>
            <router-link to="/usercenter" style="text-decoration: none;"><b class="linked">个人中心</b></router-link>
            <Logout></Logout>
            <b>&nbsp&nbsp&nbsp&nbsp</b>
          </div>
          <br><br>
          <hr>
        </div>
      </el-header>
      <el-main status-icon>
        <div class="main">
          <div id="professionSelection">
            所属行业：
            <el-select style="width:250px" size="small" v-model="professionValue" clearable placeholder="点选您的所属行业"
                       @change="changeProfession">
              <el-option v-for="(item, index) in options" :key="index" :label="item.label"
                         :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #1B9AF7; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
            <div style="width:100px;display: inline-block;"/>
            对应税点：
            <el-input style="width:200px" size="small" placeholder="选择行业对应生成税点值" v-model="professionValue"
                      :disabled="true"></el-input>
          </div>
          <br>
          <div class="content" style="border:1px solid #999999;">
            <div class="content" style="width: 450px;">
              <el-form ref="payerForm1" :model="payerForm1" status-icon :rules="rulesPayer" label-width="80px" size="mini"
                       class="demo-ruleForm">
                <el-form-item label="客户名称" style="margin: 0" prop="payerName">
                  <el-input v-model="payerForm1.payerName" placeholder="请输入客户开票抬头（必填）"/>
                </el-form-item>
                <el-form-item label="纳税人号" style="margin: 0" prop="payerCode">
                  <el-input v-model="payerForm1.payerCode" placeholder="请输入客户统一社会征用代码（选填）"/>
                </el-form-item>
                <el-form-item label="客户地址" style="margin: 0">
                  <el-input v-model="payerForm1.payerAddr" placeholder="请输入客户地址（选填）"/>
                </el-form-item>
                <el-form-item label="开户银行" style="margin: 0">
                  <el-input v-model="payerForm1.payerBank" placeholder="请输入客户开户银行（选填）"/>
                </el-form-item>
              </el-form>
            </div>
            <div class="content" style="width: 350px;">
              <el-form ref="payerForm2" :model="payerForm2" :rules="rulesPayer2" label-width="80px" size="mini">
                <el-form-item label="账号" style="margin: 0">
                  <el-input v-model="payerForm2.payerBankNo" placeholder="请输入客户银行账户（选填）"/>
                </el-form-item>
                <el-form-item label="电话" style="margin: 0">
                  <el-input v-model="payerForm2.payerPhone" placeholder="请输入客户电话（选填）"/>
                </el-form-item>
                <el-form-item label="备注" style="margin: 0">
                  <el-input v-model="payerForm2.payerMemo" placeholder="请填写备注（选填）"/>
                </el-form-item>
                <el-form-item label="开票人" style="margin: 0;" prof="payeeName">
                  <el-select style="width: 270px;" size="mini" v-model="operaterValue" filterable
                             placeholder="请选择开票人（必选）">
                    <el-option v-for="(item,index) in operaterOptions" :key="index" :label="item.payeeName"
                               :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <el-table :data="tableData" border height="240" size="mini">
              <el-table-column fixed prop="goodsName" label="货物或应税劳务、服务名称" width="125"></el-table-column>
              <el-table-column fixed prop="goodsType" label="规格型号（服务类型）" width="95"></el-table-column>
              <el-table-column fixed prop="measureUnit" label="计量单位" width="60"></el-table-column>
              <el-table-column fixed prop="buyedNum" label="数量" width="80"></el-table-column>
              <el-table-column fixed prop="price" label="单价" width="90"></el-table-column>
              <el-table-column fixed prop="salesVolume" label="不含税销售额" width="90"></el-table-column>
              <el-table-column fixed prop="tax" label="征收税" width="90"></el-table-column>
              <el-table-column fixed prop="taxAmount" label="税额" width="90"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <!--<el-button type="text" @click="editRow(scope.$index, scope.row)" size="small">编辑</el-button>-->
                  <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <el-form ref="form" status-icon :rules="rulesAddGoods" :model="trolleyForm" class="demo-ruleForm">
                <el-form-item style="width: 123px; margin: 0;display: inline-block" prop="goodsName">
                  <el-input v-model="trolleyForm.goodsName" placeholder="必填"/>
                </el-form-item>
                <el-form-item style="width: 91px; margin: 0;display: inline-block">
                  <el-input v-model="trolleyForm.goodsType" placeholder="选填"/>
                </el-form-item>
                <el-form-item style="width: 56px; margin: 0;display: inline-block" prop="measureUnit">
                  <el-input v-model="trolleyForm.measureUnit" placeholder="必填"/>
                </el-form-item>
                <el-form-item style="width: 76px; margin: 0;display: inline-block" prop="buyedNum">
                  <el-input v-model.number="trolleyForm.buyedNum" placeholder="必填"/>
                </el-form-item>
                <el-form-item style="width: 86px; margin: 0;display: inline-block">
                  <el-input :disabled="true" placeholder="自动计算"/>
                </el-form-item>
                <el-form-item style="width: 86px; margin: 0;display: inline-block" prop="salesVolume">
                  <el-input v-model.number="trolleyForm.salesVolume" placeholder="必填"/>
                </el-form-item>
                <el-form-item style="width: 86px; margin: 0;display: inline-block">
                  <el-input :disabled="true" placeholder="免填"/>
                </el-form-item>
                <el-form-item style="width: 80px; margin: 0;display: inline-block">
                  <el-input :disabled="true" placeholder="免填"/>
                </el-form-item>
                <el-form-item fixed="right" style="width: 104px; margin: 0;display: inline-block">
                  <template slot-scope="scope">
                    <el-button style="width: 98px;background-color: #d7d7d7;" @click="addRow">增加</el-button>
                  </template>
                </el-form-item>
              </el-form>
            </div>
            <div class="content" style="width: 25%; vertical-align: top;">
              <div style="margin: 10px">发票收件人收件信息</div>
              <el-select style="width: 150px;" size="small" v-model="expressOptionValue" filterable
                         placeholder="请选择快递（必选）" @change="changeExpress">
                <el-option v-for="item in expressOptions" :key="item.index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </div>
            <div class="content" style="width: 74%;">
              <el-input style="width: 100%;" :autosize="{ minRows: 3, maxRows: 4}" type="textarea" :rows="3"
                        placeholder="请输入收件人姓名、地址、邮编、电话号码" v-model="expressDtl"></el-input>
            </div>
            <div style="height: 42px;background-color: #f2f2f2">
              <div class="content" style="width: 33%; margin: 12px">合计税款金额<u>&nbsp{{totalTaxAmount}}&nbsp</u>元</div>
              <div class="content" style="width: 33%">快递费<u>&nbsp{{expressValue}}&nbsp</u>元</div>
              <div class="content" style="width: 33%">合计支付金额<u>&nbsp{{all_amount}}&nbsp</u>元
              </div>
            </div>
          </div>
          <br><br><br>
          <!--<router-link to="/payment">-->
          <el-button style="width:280px; float: right; background-color: #d7d7d7;" @click="submitOrder">提交订单</el-button>
          <!--</router-link>-->
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
  /* eslint-disable indent,indent,space-before-function-paren,quotes */
  import Logout from "./Logout"

  export default {
    name: 'TradingHall',
    components: {Logout},
    data() {
      return {
        msg: '零散税开票系统',
        loading: false,
        options: [{
          value: '3.4952',
          label: '商业'
        }, {
          value: '3.6893',
          label: '工业'
        }, {
          value: '4.7102',
          label: '交通运输（货运）业'
        }, {
          value: '4.1748',
          label: '陆路运输业'
        }, {
          value: '3.6893',
          label: '装卸搬运业'
        }, {
          value: '3.6222',
          label: '建筑服务业'
        }, {
          value: '4.1748',
          label: '现代服务业'
        }, {
          value: '4.1748',
          label: '租赁业'
        }],
        professionLable: '',
        professionValue: '',
        operaterOptions: [],
        operaterValue: '',
        expressOptions: [{
          index: '1', label: '韵达', value: '韵达@3.3'
        }],
        expressLable: '',
        expressOptionValue: '',
        payerForm1: {
          payerName: '',
          payerCode: '',
          payerAddr: '',
          payerBank: ''
        },
        payerForm2: {payerBankNo: '', payerPhone: '', payerMemo: ''},
        trolleyForm: {
          goodsName: '',
          goodsType: '',
          measureUnit: '',
          buyedNum: null,
          price: null,
          salesVolume: null
        },
        expressDtl: '',
        currentIndex: '',
        tableData: [],
        rulesPayer: {
          payerName: [
            {required: true, message: '请填写客户名称', trigger: 'blur'}
          ],
          payerCode: [
            {required: true, message: '请填写客户纳税人编号', trigger: 'blur'}
          ]
        },
        rulesPayer2: {
          payeeName: [
            {required: true, message: '请选择开票人', trigger: 'blur'}
          ]
        },
        rulesAddGoods: {
          goodsName: [
            {required: true, message: ' ', trigger: 'blur'}
          ],
          measureUnit: [
            {required: true, message: ' ', trigger: 'blur'}
          ],
          buyedNum: [
            {required: true, message: ' ', trigger: 'blur'},
            { type: 'number', message: ' '}
          ],
          salesVolume: [
            {required: true, message: ' ', trigger: 'blur'},
            { type: 'number', message: ' '}
          ]
        }
      }
    },
    created() {
      this.showPayee()
    },
    methods: {
      showPayee() {
        this.$http.ShowPayee(sessionStorage.getItem('userId')).then((result) => {
          if (result.c === 200) {
            this.operaterOptions = result.r
          } else {
            // this.$message.error(result.r)
            this.$message({showClose: true, message: result.r, type: 'warning', duration: 0})
          }
        }, (err) => {
          this.$message.error(err.msg)
          // this.searchLoading = false
        })
      },
      changeProfession(professionVar) {
        let professionObj = {};
        professionObj = this.options.find((item) => {
          return item.value === professionVar
        })
        this.professionLable = professionObj.label
      },
      changeExpress(expressVar) {
        let expressObj = {};
        expressObj = this.expressOptions.find((item) => {
          return item.value === expressVar;
        })
        this.expressLable = expressObj.label
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      editRow(index, row) {
        this.trolleyForm = this.tableData[index]
        this.currentIndex = index
      },
      addRow(formName) {
        console.log(typeof this.trolleyForm.salesVolume)
        if (this.trolleyForm.goodsName === '' || this.trolleyForm.measureUnit === '' || this.trolleyForm.buyedNum === null || this.trolleyForm.salesVolume === null) {
          this.$notify({
            type: 'filed',
            message: '请完善信息!',
            duration: 2000
          })
          return
        }
        var d = {
          goodsName: this.trolleyForm.goodsName,
          goodsType: this.trolleyForm.goodsType,
          measureUnit: this.trolleyForm.measureUnit,
          buyedNum: this.trolleyForm.buyedNum,
          price: Number(this.trolleyForm.salesVolume / this.trolleyForm.buyedNum).toFixed(2),
          salesVolume: this.trolleyForm.salesVolume,
          tax: null,
          taxAmount: null
        }
        this.tableData.push(d)
        this.trolleyForm.goodsName = ''
        this.trolleyForm.goodsType = ''
        this.trolleyForm.measureUnit = ''
        this.trolleyForm.buyedNum = null
        this.trolleyForm.price = null
        this.trolleyForm.salesVolume = null
      },
      submitOrder() {
        if (this.professionValue === '') {
          this.$notify({
            type: 'filed',
            message: '请点选您所属行业!',
            duration: 2000
          })
          return
        }
        if (this.payerForm1.payerName === '') {
          this.$notify({
            type: 'filed',
            message: '请填写客户名称!',
            duration: 2000
          })
          return
        }
        if (this.tableData.length === 0) {
          this.$notify({
            type: 'filed',
            message: '请增加至少一条货物信息!',
            duration: 2000
          })
          return
        }
        if (this.operaterValue === '') {
          this.$notify({
            type: 'filed',
            message: '请点选开票人!',
            duration: 2000
          })
          return
        }
        if (this.expressValue === '') {
          this.$notify({
            type: 'filed',
            message: '请点选邮寄方式!',
            duration: 2000
          })
          return
        }
        if (this.expressDtl === '') {
          this.$notify({
            type: 'filed',
            message: '请填写收件人信息!',
            duration: 2000
          })
          return
        }
        var orderFormData = {
          userId: sessionStorage.getItem('userId'),
          tradeName: this.professionLable,
          taxRate: this.professionValue,
          payerDto: {
            payerName: this.payerForm1.payerName,
            payerCode: this.payerForm1.payerCode,
            payerAddr: this.payerForm1.payerAddr,
            payerBank: this.payerForm1.payerBank,
            payerPhone: this.payerForm2.payerPhone,
            payerMemo: this.payerForm2.payerMemo,
            payerBankNo: this.payerForm2.payerBankNo
          },
          payeeId: this.operaterValue, // 前端返回
          shoppingTrolleyDtos: this.tableData, // 获取table里的值
          address: this.expressDtl,
          expressCompany: this.expressLable,
          totalAmount: this.totalAmount,
          totalTaxAmount: this.totalTaxAmount,
          expressFee: this.expressValue
        }
        // console.log(orderFormData)
        this.$http.SubmitOrder(orderFormData).then((result) => {
          if (result.c === 200) {
            sessionStorage.setItem('orderId', result.r)
            // 跳转到付款页面
            this.$router.push({path: '/payment', query: {orderId: result.r, all_amount: this.all_amount}})
          } else {
            this.$message.info('数据库执行错误，请联系管理员！谢谢！')
          }
        }, (err) => {
          this.$message.error(err.msg)
          // this.searchLoading = false
        })
      }
    },
    computed: {
      expressValue() {
        return this.expressOptionValue.split("@")[1]
      },
      totalAmount() {
        var totalAmount = 0
        for (var i = 0; i < this.tableData.length; i++) {
          totalAmount = Number(totalAmount) + Number(this.tableData[i].salesVolume)
        }
        return totalAmount
      },
      totalTaxAmount() {
        return Number(Number(this.totalAmount) * Number(this.professionValue) / 100).toFixed(2)
      },
      all_amount() {
        return Number(Number(this.totalTaxAmount) + Number(this.expressValue)).toFixed(2)
      }
    }
  }
</script>

<style scoped>

</style>
