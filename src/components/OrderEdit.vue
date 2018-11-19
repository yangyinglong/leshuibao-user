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
            <el-select style="width:250px" size="small" v-model="professionOptionValue" clearable
                       placeholder="点选您的所属行业" @change="changeProfession">
              <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #1B9AF7; font-size: 13px">{{ item.value.split("@")[1] }}</span>
              </el-option>
            </el-select>
            <div style="width:100px;display: inline-block;"/>
            对应税点：
            <el-button style="width:200px" size="small">{{professionValue}}</el-button>
          </div>
          <br>
          <div class="content" style="border:1px solid #999999;">
            <div class="content" style="width: 450px;">
              <el-form ref="form" :model="payerForm" status-icon :rules="rulesPayer" label-width="80px" size="mini"
                       class="demo-ruleForm">
                <el-form-item label="客户名称" style="margin: 0" prop="payerName">
                  <el-input v-model="payerForm.payerName" placeholder="请输入客户开票抬头（必填）"/>
                </el-form-item>
                <el-form-item label="纳税人号" style="margin: 0" prop="payerCode">
                  <el-input v-model="payerForm.payerCode" placeholder="请输入客户统一社会征用代码（选填）"/>
                </el-form-item>
                <el-form-item label="客户地址" style="margin: 0">
                  <el-input v-model="payerForm.payerAddr" placeholder="请输入客户地址（选填）"/>
                </el-form-item>
                <el-form-item label="开户银行" style="margin: 0">
                  <el-input v-model="payerForm.payerBank" placeholder="请输入客户开户银行（选填）"/>
                </el-form-item>
              </el-form>
            </div>
            <div class="content" style="width: 350px;">
              <el-form ref="form" :model="payerForm" label-width="80px" size="mini">
                <el-form-item label="账号" style="margin: 0">
                  <el-input v-model="payerForm.payerBankNo" placeholder="请输入客户银行账户（选填）"/>
                </el-form-item>
                <el-form-item label="电话" style="margin: 0">
                  <el-input v-model="payerForm.payerPhone" placeholder="请输入客户电话（选填）"/>
                </el-form-item>
                <el-form-item label="备注" style="margin: 0">
                  <el-input v-model="payerForm.payerMemo" placeholder="请填写备注（选填）"/>
                </el-form-item>
                <el-form-item label="开票人" style="margin: 0;">
                  <el-select style="width: 270px;" size="mini" v-model="operaterValue" filterable
                             placeholder="请选择开票人（必选）">
                    <el-option v-for="(item,index) in operaterOptions" :key="index" :label="item.payeeName"
                               :value="item.id" prof="payeeName"></el-option>
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
              <el-table-column fixed prop="" label="征收税" width="90"></el-table-column>
              <el-table-column fixed prop="" label="税额" width="90"></el-table-column>
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
                  <el-input v-model="trolleyForm.buyedNum" placeholder="必填"/>
                </el-form-item>
                <el-form-item style="width: 86px; margin: 0;display: inline-block">
                  <el-input :disabled="true" placeholder="自动计算"/>
                </el-form-item>
                <el-form-item style="width: 86px; margin: 0;display: inline-block" prop="salesVolume">
                  <el-input v-model="trolleyForm.salesVolume" placeholder="必填"/>
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
                        placeholder="请输入收件人姓名、地址、邮编、电话号码" v-model="addressData.address"></el-input>
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
          <el-button style="width:280px; float: right; background-color: #d7d7d7;" @click="editOrder">提交修改</el-button>
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
    name: 'OrderEdit',
    components: {Logout},
    data() {
      return {
        msg: '订单修改',
        orderId: sessionStorage.getItem('orderId'),
        // orderId: '67a06157adf5',
        loading: false,
        options: [{
          value: '商业@3.4952',
          label: '商业'
        }, {
          value: '工业@3.6893',
          label: '工业'
        }, {
          value: '交通运输（货运）业@4.7102',
          label: '交通运输（货运）业'
        }, {
          value: '陆路运输业@4.1748',
          label: '陆路运输业'
        }, {
          value: '装卸搬运业@3.6893',
          label: '装卸搬运业'
        }, {
          value: '建筑服务业@3.6222',
          label: '建筑服务业'
        }, {
          value: '现代服务业@4.1748',
          label: '现代服务业'
        }, {
          value: '租赁业@4.1748',
          label: '租赁业'
        },{
          value: '其他@3',
          label: '其他'
        }],
        professionLable: '',
        professionOptionValue: '',
        operaterOptions: [],
        operaterValue: '',
        expressOptions: [{
          index: '1', label: '韵达', value: '韵达@3.3'
        }],
        expressLable: '',
        expressOptionValue: '',
        payerForm: {},
        trolleyForm: {
          goodsName: '',
          goodsType: '',
          measureUnit: '',
          buyedNum: null,
          price: null,
          salesVolume: null
        },
        addressData: '',
        currentIndex: '',
        tableData: [],
        rulesPayer: {
          payerName: [
            {required: true, message: ' ', trigger: 'blur'}
          ],
          payerCode: [
            {required: true, message: '请填写客户纳税人编号', trigger: 'blur'}
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
      this.showOrderDtl()
      this.showPayee()
    },
    methods: {
      showOrderDtl() {
        this.$http.ShowOrderDtl(this.orderId).then((result) => {
          if (result.c === 200) {
            // sessionStorage.setItem("orderId", result.r.orderEntity.id)
            this.professionLable = result.r.orderEntity.tradeName
            this.professionOptionValue = result.r.orderEntity.tradeName + "@" + result.r.orderEntity.taxRate
            this.operaterValue = result.r.payeeEntity.id
            this.expressLable = result.r.orderEntity.expressCompany
            this.expressOptionValue = result.r.orderEntity.expressCompany + "@" + result.r.orderEntity.expressFee
            this.payerForm = result.r.payerEntity
            this.tableData = result.r.shoppingTrolleyEntities
            this.addressData = result.r.addressEntity
          } else {
            this.$message.error(result.r)
          }
        }, (err) => {
          this.$message.error(err.msg)
        })
      },
      showPayee() {
        this.$http.ShowPayee(sessionStorage.getItem('userId')).then((result) => {
          if (result.c === 200) {
            this.operaterOptions = result.r
          } else {
            this.$message.error(result.r)
          }
        }, (err) => {
          this.$message.error(err.msg)
          // this.searchLoading = false
        })
      },
      changeProfession(professionVar) {
        let professionObj = {}
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
      addRow() {
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
      editOrder() {
        if (this.professionValue === '') {
          this.$notify({
            type: 'filed',
            message: '请点选您所属行业!',
            duration: 2000
          })
          return
        }
        if (this.payerForm.payerName === '') {
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
          orderId: this.orderId,
          tradeName: this.professionLable,
          taxRate: this.professionValue,
          payerEntity: this.payerForm,
          payeeId: this.operaterValue, // 前端返回
          shoppingTrolleyEntitys: this.tableData, // 获取table里的值
          addressEntity: this.addressData,
          expressCompany: this.expressLable,
          totalAmount: this.totalAmount,
          totalTaxAmount: this.totalTaxAmount,
          expressFee: this.expressValue
        }
        // console.log(orderFormData)
        // todo 比较金额再判断是否需要增加付款，或退钱申请
        this.$http.EditOrder(orderFormData).then((result) => {
          if (result.c === 200) {
            this.$message.success(result.r)
            this.$router.push({name: 'OrderCenter'})
            // 跳转到付款页面
            // this.$router.push({path: '/payment', query: {orderId: result.r, all_amount: this.all_amount}})
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
      professionValue() {
        return this.professionOptionValue.split("@")[1]
      },
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
