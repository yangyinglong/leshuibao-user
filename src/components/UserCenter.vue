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
            <router-link to="/tradinghall" style="text-decoration: none;"><b class="linked">开票系统</b></router-link>
            <b style="color: #999999;">&nbsp|&nbsp</b>
            <router-link to="/ordercenter" style="text-decoration: none;"><b class="linked">票务中心</b></router-link>
            <Logout></Logout>
            <b>&nbsp&nbsp&nbsp&nbsp</b>
          </div>
          <br><br>
          <hr>
        </div>
      </el-header>
      <el-main>
        <div class="main">
          <div id="userinfo" class="content">
            <table style="width: 280px">
              <tr class="tbl-tr">用户名：&nbsp{{userName}}</tr>
              <tr class="tbl-tr">绑定手机号：&nbsp{{userPhone}}</tr>
              <tr class="tbl-tr">密码：&nbsp
                <el-tooltip content="点击修改密码" effect="light">
                  <router-link to="/forgetpasswd"><b style="font-size:14px">*****************</b></router-link>
                </el-tooltip>
              </tr>
              <tr class="tbl-tr">注册时间：&nbsp{{registerTime}}</tr>
              <tr class="tbl-tr">历史开票详情：&nbsp
                <router-link to="/ordercenter">点击查看</router-link>
              </tr>
            </table>
          </div>
          <div>
            <div id="addOperator" class="content" style="margin-top: 20px; width: 550px;">
              <el-button style="width:280px; background-color: #f2f2f2;" @click="dialoguserinfoVisible=true">添加开票人信息
              </el-button>
              <el-dialog id="dialoguserinfo" title="添加开票人信息" :visible.sync="dialoguserinfoVisible" width="420px" @open="openAddFrom">
                <el-form :model="payeeForm">
                  <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="payeeForm.name" placeholder="请输入开票人身份证姓名！" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="payeeForm.cidno" placeholder="请输入开票人身份证号！" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialoguserinfoVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogusercidVisible = true;dialoguserinfoVisible = false">下一步
                  </el-button>
                </div>
              </el-dialog>
              <el-dialog id="dialogusercid" title="上传开票人身份证件" :visible.sync="dialogusercidVisible">
                <span>正面</span>
                <div v-if="show">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="/api/suppliment/upload"
                    :data="fileForm1"
                    :limit=1
                    :on-success="change">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </div>
                <div v-else>
                  <img :src="imgPath1" width="350px" height="200px">
                </div>
                <br><br>
                <span>反面</span>
                <div v-if="show2">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="/api/suppliment/upload"
                    :data="fileForm2"
                    :limit=1
                    :on-success="change2">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </div>
                <div v-else>
                  <img :src="imgPath2" width="350px" height="200px">
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogusercidVisible = false">取 消</el-button>
                  <el-button @click="show2 = true, show = true">重 置</el-button>
                  <!--<el-button type="primary" @click="dialogusercidVisible = false">提交</el-button>-->
                  <el-button type="primary" @click="addPayee(payeeForm)">提交
                  </el-button>
                </div>
              </el-dialog>
              <div style="margin: 10px;font-size: 13px;color: #999999">（如未添加开票人信息将无法开票）</div>
              <el-table :data="tableData" style="width: 100%" border>
                <el-table-column prop="payeeName" label="名称" width="150px"></el-table-column>
                <el-table-column prop="payeeCidno" label="纳税人识别号" width="250px"></el-table-column>

                <!-- 下面的代码是修改开票人信息 -->
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <div class="board-line">
                      <div class="board-line-right">
                        <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                          <!-- 修改基本信息 -->
                        <el-dialog title="修改开票人信息" :visible.sync="dialogPayeeEditFromVisible" width="420px" @close="closeEditFrom" @open="openEditFrom">
                          <el-form :model="payeeForm">
                            <el-form-item label="名称" :label-width="formLabelWidth">
                            <el-input v-model="payeeForm.name" placeholder="请输入开票人身份证姓名！" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号" :label-width="formLabelWidth">
                            <el-input v-model="payeeForm.cidno" placeholder="请输入开票人身份证号！" autocomplete="off"></el-input>
                            </el-form-item>
                          </el-form>
                          <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogPayeeEditFromVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogPayeeEditPhotoVisible = true;dialogPayeeEditFromVisible = false">下一步
                            </el-button>
                          </div>
                        </el-dialog>
                        <!-- 修改证件照，如果要重新上传，点击重置 -->
                        <el-dialog id="dialogusercid" title="上传开票人身份证件" :visible.sync="dialogPayeeEditPhotoVisible" @close="closeEditPhoto" @open="openEditPhoto">
                          <span>正面</span>
                          <div v-if="show3">
                            <el-upload
                              class="upload-demo"
                              drag
                              action="/api/suppliment/upload"
                              :data="editPhoto1"
                              :limit=1
                              :on-success="change3">
                              <i class="el-icon-upload"></i>
                              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                          </div>
                          <div v-else>
                            <img :src="imgPath3" width="350px" height="200px">
                          </div>
                          <br><br>
                          <span>反面</span>
                          <div v-if="show4">
                            <el-upload
                              class="upload-demo"
                              drag
                              action="/api/suppliment/upload"
                              :data="editPhoto2"
                              :limit=1
                              :on-success="change4">
                              <i class="el-icon-upload"></i>
                              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                          </div>
                          <div v-else>
                            <img :src="imgPath4" width="350px" height="200px">
                          </div>
                          <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogPayeeEditPhotoVisible = false">取 消</el-button>
                            <el-button @click="show3 = true, show4 = true">重 置</el-button>
                            <!--<el-button type="primary" @click="dialogusercidVisible = false">提交</el-button>-->
                            <el-button type="primary" @click="editPayee(payeeForm)">提交
                            </el-button>
                          </div>
                        </el-dialog>

                      </div>
                      <div class="board-line-left">
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      </div>                      
                    </div>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </div>
          <div style="margin: 20px">
            <el-button style="width:280px; background-color: #d7d7d7;" @click="dialoguseraddrVisible = true">
              点击申请邮寄发票底单及税收缴款书
            </el-button>
            <el-dialog id="dialoguseraddr" title="收货地址" :visible.sync="dialoguseraddrVisible">
              <el-form :model="addrForm">
                <el-form-item label="收件地址" :label-width="formLabelWidth">
                  <el-input type="textarea" v-model="addrForm.addr" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择快递" :label-width="formLabelWidth">
                  <el-select v-model="addrForm.express" placeholder="请选择快递方式" style="width: 100%">
                    <el-option label="EMS" value="EMS"></el-option>
                    <el-option label="顺丰" value="顺丰"></el-option>
                    <el-option label="中通" value="中通"></el-option>
                    <el-option label="韵达" value="韵达"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialoguseraddrVisible = false">取 消</el-button>
                <!--<el-button type="primary" @click="dialoguseraddrVisible = false">确 定</el-button>-->
                <el-button type="primary" @click="addInvoicedelivery(addrForm)">确 定</el-button>
              </div>
            </el-dialog>
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
  // eslint-disable-next-line indent
  /* eslint-disable indent,indent,space-before-function-paren,no-unused-vars */
  import Logout from "./Logout"

  export default {
    name: 'UserCenter',
    components: {Logout},
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.passChangeForm.checkPass !== '') {
            this.$refs.passChangeForm.validateField('checkPass')
          }
          callback()
        }
      }

      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.passChangeForm.newPass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
// eslint-disable-next-line no-trailing-spaces
      return {
        msg: '个人中心',
        userName: sessionStorage.getItem('userName'),
        userPhone: sessionStorage.getItem('phone'),
        registerTime: sessionStorage.getItem('createTime'),
        dialoguserinfoVisible: false,
        dialoguseraddrVisible: false,
        dialogusercidVisible: false,
        dialogPayeeEditFromVisible: false,
        dialogPayeeEditPhotoVisible: false,
        payeeForm: {
          name: '',
          cidno: ''
        },
        addrForm: {
          addr: '',
          express: ''
        },
        formLabelWidth: '80px',
        passChangeForm: {
          pass: '',
          newPass: '',
          checkPass: ''
        },
        tableData: [],
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          newPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        },
        show: true,
        show2: true,
        show3: true,
        show4: true,
        imgPath1: null,
        imgPath2: null,
        imgPath3: null,
        imgPath4: null,
        editName: null,
        editCidno: null
      }
    },
    created() {
      this.showPayee()
    },
    methods: {
      showPayee() {
        this.$http.ShowPayee(sessionStorage.getItem('userId')).then((result) => {
          if (result.c === 200) {
            this.tableData = result.r
          } else {
            this.$message.error(result.r)
            // this.$message({showClose: true, message: result.r, type: 'warning', duration: 0})
          }
        }, (err) => {
          this.$message.error(err.msg)
          // todo
        })
      },
      addPayee(formData) {
        var payeeData = {
          userId: sessionStorage.getItem('userId'),
          payeeName: formData.name,
          cidno: formData.cidno,
          cid_url: '' // todo
        }
        this.$http.AddPayee(payeeData).then((result) => {
          if (result.c === 200) {
            this.$message.success(result.r)
            this.dialoguseraddrVisible = false
            this.dialogusercidVisible = false
            this.showPayee()
            // todo
          } else {
            this.$message.error(result.r)
          }
        }, (err) => {
          this.$message.error(err.msg)
          // todo
        })
      },
      addInvoicedelivery(formData) {
        var addrData = {
          userId: sessionStorage.getItem('userId'),
          address: formData.addr,
          expressCompany: formData.express
        }
        this.dialoguseraddrVisible = false
        this.$http.AddInvoicedelivery(addrData).then((result) => {
          if (result.c === 200) {
            this.dialoguseraddrVisible = false
            // todo
          } else {
            this.$message.error(result.r)
          }
        }, (err) => {
          this.$message.error(err.msg)
        })
      },
      openAddFrom(){
        this.payeeForm.name = null
        this.payeeForm.cidno = null
      },
      change(file, fileList){
        this.show = false
        this.imgPath1 = 'http://www.leshuibao.cn:7070/api/suppliment/printIC?payeeId=' + this.payeeForm.cidno + '&payeeName=' + this.payeeForm.name + '&isFront=1' + '&randomInt=' + Math.random()
      },
      change2(file, fileList){
        this.show2 = false
        this.imgPath2 = 'http://www.leshuibao.cn:7070/api/suppliment/printIC?payeeId=' + this.payeeForm.cidno + '&payeeName=' + this.payeeForm.name + '&isFront=2' + '&randomInt=' + Math.random()
      },
      change3(file, fileList){
        this.show3 = false
        this.imgPath3 = 'http://www.leshuibao.cn:7070/api/suppliment/printIC?payeeId=' + this.editCidno + '&payeeName=' + this.editName + '&isFront=1' + '&randomInt=' + Math.random()
      },
      change4(file, fileList){
        this.show4 = false
        this.imgPath4 = 'http://www.leshuibao.cn:7070/api/suppliment/printIC?payeeId=' + this.editCidno + '&payeeName=' + this.editName + '&isFront=2' + '&randomInt=' + Math.random()
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogPayeeEditFromVisible=true
        this.editName = row.payeeName
        this.editCidno = row.payeeCidno   
      },
      handleDelete(index, row) {
        console.log(index, row);
        var payeeDeleteData = {
          userId: sessionStorage.getItem('userId'),
          cidno: row.payeeCidno
        }
        this.$confirm('此操作将永久删除该开票人, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.DeletePayee(payeeDeleteData).then((result) => {
            if (result.c === 200) {
              this.$message.success(result.r)
              this.showPayee()
              // todo
            } else {
              this.$message.error(result.r)
            }
          }, (err) => {
            this.$message.error(err.msg)
            // todo
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      openEditFrom(){
        this.payeeForm.name = this.editName
        this.payeeForm.cidno = this.editCidno
      },
      closeEditFrom(){
        
      },
      openEditPhoto(){
        this.show3 = false
        this.show4 = false
        this.imgPath3 = 'http://www.leshuibao.cn:7070/api/suppliment/printIC?payeeId=' + this.editCidno + '&payeeName=' + this.editName + '&isFront=1' + '&randomInt=' + Math.random()
        this.imgPath4 = 'http://www.leshuibao.cn:7070/api/suppliment/printIC?payeeId=' + this.editCidno + '&payeeName=' + this.editName + '&isFront=2' + '&randomInt=' + Math.random()
      },
      closeEditPhoto(){
        this.payeeForm.name = null
        this.payeeForm.cidno = null
        this.show3 = true
        this.show4 = true
        this.imgPath3 = null
        this.imgPath4 = null
      },
      editPayee(formData) {
        var payeeEditData = {
          userId: sessionStorage.getItem('userId'),
          oldCidno: this.editCidno,
          oldName: this.editName,
          payeeName: formData.name,
          cidno: formData.cidno,
          cid_url: '' // todo
        }
        console.log(payeeEditData)
        this.$http.EditPayee(payeeEditData).then((result) => {
          if (result.c === 200) {
            this.$message.success(result.r)
            this.dialogPayeeEditPhotoVisible = false
            this.showPayee()
            // todo
          } else {
            this.$message.error(result.r)
          }
        }, (err) => {
          this.$message.error(err.msg)
          // todo
        })
      }
    },
    computed: {
      fileForm1() {
        return {fileName: this.payeeForm.name + '@' + this.payeeForm.cidno, isFront: 1}
      },
      fileForm2() {
        return {fileName: this.payeeForm.name + '@' + this.payeeForm.cidno, isFront: 2}
      },
      editPhoto1() {
        return {fileName: this.editName + '@' + this.editCidno, isFront: 1}
      },
      editPhoto2() {
        return {fileName: this.editName + '@' + this.editCidno, isFront: 2}
      }
    }
  }

</script>

<style scoped>
  .tbl-tr {
    text-align: left;
    /*width: 300px;*/
    height: 30px;
  }
  .board-line {
  clear: both;
  /*padding-bottom: 20px;*/
  text-align:center;
  }
  .board-line-left {
    display: inline;
    width: 100%;
  }
  .board-line-right {
    display: inline;
    width: 75%;
  }
</style>
