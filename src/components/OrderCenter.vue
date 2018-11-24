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
            <el-button type="info" plain size="small" style="font-size: 14px" @click="refresh">点击刷新状态</el-button>
            &nbsp&nbsp
            <router-link to="/tradinghall" style="text-decoration: none;"><b class="linked">开票系统</b></router-link>
            <b style="color: #999999;">&nbsp|&nbsp</b>
            <router-link to="/usercenter" style="text-decoration: none;"><b class="linked">个人中心</b></router-link>
            <Logout></Logout>
            <b>&nbsp&nbsp&nbsp&nbsp</b>
          </div>
          <br><br>
          <hr>
        </div>
      </el-header>
      <el-main>
        <div class="main" disable="isDisAble">
          <div class="content">
            <div class="content">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" :disabled="isDisAble">全部订单
              </el-checkbox>
            </div>
            <div class="content" style="width: 200px"/>
            <div class="content">
              <el-checkbox-group v-model="checkedIterms" @change="handleCheckedItermsChange" :disabled="isDisAble">
                <el-checkbox v-for="iterm in iterms" :label="iterm" :key="iterm">{{iterm}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div style="margin-top: 30px;">
              <el-table :data="tableData" v-loading="loading">
                <el-table-column prop="createdTime" label="开票日期" width="100"></el-table-column>
                <el-table-column prop="payeeName" label="抬头" width="220"></el-table-column>
                <el-table-column prop="totalAmount" label="开票金额" width="100"></el-table-column>
                <el-table-column prop="auditStatus" label="状态" width="80"></el-table-column>
                <el-table-column prop="expressCompany" label="快递公司" width="100"></el-table-column>
                <el-table-column prop="expressTrackingCode" label="快递单号或驳回原因" width="220"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleShow(scope.$index, scope.row)">查看</el-button>
                    <el-button v-if="tableData.auditStatus === '已发货'" type="text" disabled size="small">编辑</el-button>
                    <el-button v-else type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <br>
            <div class="block">
              <!-- <span class="demonstration"></span> -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10]"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="total"
                :disabled="isDisAble">
              </el-pagination>
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
  /* eslint-disable indent,quotes */
  import Logout from "./Logout"
  import OrderShow from "./OrderShow"

  const itermOptions = ['待审核', '已发货', '已驳回']
  export default {
    name: "OrderCenter",
    components: {Logout, OrderShow},
    data() {
      return {
        msg: '票务中心',
        checkAll: false,
        checkedIterms: ['待审核'],
        iterms: itermOptions,
        isIndeterminate: true,
        tableData: [],
        loading: true,
        isDisAble: true,
        currentPage4: 1,
        total: 70
      }
    },
    created() {
      this.showOrders(1, 10)
      this.getAllOrdersCount()
    },
    methods: {
      refresh(){
        this.showOrders(1, 10)
        this.getAllOrdersCount()
        this.currentPage4 = '1'
      },
      handleCheckAllChange(val) {
        this.checkedIterms = val ? itermOptions : []
        this.isIndeterminate = false
        this.showOrders(1, 10)
        this.getAllOrdersCount()        
        this.currentPage4 = '1'
      },
      handleCheckedItermsChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.iterms.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.iterms.length
        this.showOrders(1, 10)
        this.getAllOrdersCount()     
        this.currentPage4 = '1'
      },
      getAllOrdersCount(){
        var showOrdersReqData = {
          userId: sessionStorage.getItem('userId'),
          auditStatus: this.checkedIterms,
          startPageNum: 1,
          pageRange: 10000000
        }
        if (this.checkedIterms.length == 0) {
          this.tableData = []
          this.currentPage4 = 1
          this.total = 0
          return
        }
        this.$http.ShowOrders(showOrdersReqData).then((result) => {
          this.loading = false
          this.isDisAble = false
          if (result.c === 200) {
            this.total = result.r.length
            this.currentPage4 = 1
          } else {
       
           this.currentPage4 = 1
            this.total = 0
          }
        }, (err) => {
          this.$message.error(err.msg)
          // this.searchLoading = false
        })        
        this.loading = true
        this.isDisAble = true
      },
      showOrders(startPageNum, pageRange) {
        var showOrdersReqData = {
          userId: sessionStorage.getItem('userId'),
          auditStatus: this.checkedIterms,
          startPageNum: startPageNum,
          pageRange: pageRange
        }
        if (this.checkedIterms.length == 0) {
          this.tableData = []
          return
        }
        this.$http.ShowOrders(showOrdersReqData).then((result) => {
          this.loading = false
          this.isDisAble = false
          if (result.c === 200) {
            this.tableData = result.r
          } else {
            this.$message.error(result.r)
            this.tableData = []
          }
        }, (err) => {
          this.$message.error(err.msg)
          // this.searchLoading = false
        })        
        this.loading = true
        this.isDisAble = true
      },
      handleShow(index, row) {
        sessionStorage.setItem('orderId', row.orderId),
        this.$router.push({name: 'OrderShow', params: {orderId: row.orderId}})
      },
      handleEdit(index, row) {
        sessionStorage.setItem('orderId', row.orderId),
        this.$router.push({name: 'OrderEdit', params: {orderId: row.orderId}})
      },
      handleSizeChange(val) {
        
      },
      handleCurrentChange(val) {
        this.showOrders(val, 10)
      }
    }
  }
</script>

<style scoped>
</style>
