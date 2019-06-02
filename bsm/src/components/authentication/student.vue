<template>
    <div class="task">
        <!-- 查询 -->
        <div style="margin-bottom:10px;">
            <span>学生认证：</span>
            <el-radio-group v-model="radio3" size="medium" @change="getList">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="未审核"></el-radio-button>
              <el-radio-button label="已通过"></el-radio-button>
              <el-radio-button label="未通过"></el-radio-button>
            </el-radio-group>
        </div>
        <!-- 表格数据 -->
        <el-table ref="multipleTable" :header-row-style="headerrowstyle" :data="tableData3" tooltip-effect="dark" style="width: 100%" v-loading="tableLoading" @sort-change="sortchange">
          <el-table-column
              type="index"
              align="center"
              width="50">
          </el-table-column>
          <el-table-column
            prop="school"
            label="学校"
            align="center">
          </el-table-column>
          <el-table-column
            prop="major"
            label="专业"
            align="center">
          </el-table-column>
          <el-table-column
            prop="regular"
            label="专/本"
            align="center">
          </el-table-column>
          <el-table-column
            prop="identity_num"
            width="180px"
            label="身份证号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="pass"
            label="认证状态"
            align="center">
         		<template slot-scope="scope">
                     <span v-if="scope.row.pass=='-1'"><span class="warning-status"></span>未审核</span>
                    <span v-if="scope.row.pass=='0'"><span class="error-status"></span>未通过</span>
	          	    <span v-if="scope.row.pass=='1'"><span class="success-status"></span>已通过</span>    	
	          </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            sortable='custom'
            label="创建时间"
            align="center"
            width="220">
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="looksee(scope.$index)" style="font-size:14px; color: #1890FF">查看详情</el-button>
              <span style="color:#ccc;margin:0 5px;">|</span>
              <el-button type="text" size="small">
                  <el-dropdown trigger="click">
                      <span class="el-dropdown-link" style="color: #1890FF">
                         操作<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="scope.row.pass == -1"><span class="occupy" @click="setPassT(scope.$index,1)">通过</span></el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.pass == -1"><span class="occupy" @click="setPassW(scope.$index,0)">未通过</span></el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.pass == 0"><span class="occupy" @click="setPassT(scope.$index,1)">通过</span></el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.pass == 1"><span class="occupy" @click="setPassW(scope.$index,0)">未通过</span></el-dropdown-item>
                        <el-dropdown-item style="color:red"><span @click="del(scope.$index)" class="occupy">删除认证</span></el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="dibu">
            <span>共<span>{{ totalElements }}</span>条记录</span><span>第<span>{{ currentPage }}</span>/<span>{{ totalPages }}</span>页</span>
            <!-- current-page 当前页数，指的是分页第几页，当前页数蓝色高亮 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagesize"
              background
              layout=" ->, prev, pager, next, sizes, jumper"
              :total="totalElements">
            </el-pagination>
        </div>
        <!-- 查看-->
        <el-dialog
            title="查看详情"
            :visible.sync="lookVisible"
            width="600px"
            modal>
            <div class="look activity">
              <el-form ref="form" label-width="130px">
                <el-form-item label="学校名称：">{{ look.school }}</el-form-item>
                <el-form-item label="专业：">{{ look.major }}</el-form-item>
                <el-form-item label="专/本：">{{ look.regular }}</el-form-item>
                <el-form-item label="开始时间：">{{ look.beginTime }}</el-form-item>
                <el-form-item label="结束时间：">{{ look.endTime }}</el-form-item>
                <el-form-item label="认证状态：">{{ look.pass == -1?'未审核':look.pass == 1?'通过':'未通过' }}</el-form-item>
                <el-form-item label="学生证照片："><img :src="url+look.student_card" alt="" width="100%"></el-form-item>
                <el-form-item label="身份证号：">{{ look.identity_num }}</el-form-item>
                <el-form-item label="身份证正面："><img :src="url+look.identity_card_z" alt="" width="100%"></el-form-item>
                <el-form-item label="身份证反面："><img :src="url+look.identity_card_f" alt="" width="100%"></el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="lookVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {users,delusers} from './../../api/api'
import {getRenList,urlData,delAuthen,setAuthenStatus} from './../../api/authentication'

export default {
    data(){
        return {
            form:{},
            tableData3:[],
            tableLoading: false,
            currentPage: 0,
            pagesize: 10,
            totalElements: 0,
            totalPages: 0,
            page: 1,
            size: 10,
            sort: 'desc',
            field: 'createTime',
            lower: '', //任务状态0正常 1禁止 2为全部
            lookVisible: false,
            look:{},
            radio3:'全部',
            url: ''
        }
    },
    created(){
        this.getList()
        this.url = urlData
    },
    mounted(){

    },
    methods:{
        //请求数据
        async getList(){
            let le = {
                page: this.page,
                size: this.size,
                sort: this.sort,
                field: this.field,
                type: "2"
            }
            switch(this.radio3){
                case "全部":
                    le.pass = 2
                    break;
                case "未审核":
                    le.pass = -1
                    break;
                case "已通过":
                    le.pass = 1
                    break;
                case "未通过":
                    le.pass = 0
                    break;
            }
            this.tableLoading = true
            var data = await getRenList(le)
            this.tableLoading = false
            this.tableData3 = data.data
            this.totalElements = data.totalSize/1
            this.totalPages = data.totalPage/1
            if(data.totalPage == 0){
                this.currentPage = 0
            }else{
                this.currentPage = data.page/1
            }
            // console.log(data)
        },
        // 重置()
        reset() {
            this.form = {}
            this.lower = ''
            this.page = 1
            this.getList()
        },
        //查询
        query() {
          if(this.form.status == undefined && this.lower == undefined && this.form.name == undefined){
            this.$message.error('最少选择一项查询条件')
            return
          }
          this.page = 1
          this.getList()
        },
        //-------------------分页begin---------------
        // 8条/页变成10条/页
        handleSizeChange (val) {
          this.size = val
          this.getList()
          // console.log(`每页 ${val} 条`);
        },
        // 点击某一页时候
        handleCurrentChange (val) {
          // console.log(`当前页: ${val}`);
          this.currentPage = val
          this.page = val
          this.getList()
        },
        //-------------------分页end---------------

        //-------------------table begin-----------
        //设置头部样式
        headerrowstyle({row, rowIndex}){
           return {
                'font-size': '15px'
           }

        },
        // 排序
        sortchange (data){
            this.field = data.prop
            if(data.order == 'ascending'){
                this.sort = 'ASC'
            }else{
                this.sort = 'DESC'
            }
            this.page = 1
            this.getList()
        },
        // 查看详情
        async looksee(index){
            // let le = {
            //     id: this.tableData3[index].id
            // }
            // var data = await users(le)
            this.look = JSON.parse(JSON.stringify(this.tableData3[index]))
            this.lookVisible = true
        },
        // 删除任务
        del (index){
            this.$confirm('确定删除此认证?人物信息将归为未认证，此操作不可逆', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                var le = {
                    id:this.tableData3[index].AU_id,
                    type:"2",
                    inid:this.tableData3[index].information_id
                }
                this.dels(le)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
        },
        async dels(val){
            var data = await delAuthen(val)
            // console.log(data)
            this.$message({
                "message":"删除成功",
                "type":"success"
            })
            this.getList()
        },
        //未通过
        setPassW(index,type){
            var message
            message="请输入未通过原因"
            this.$prompt(message, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /\S/,
              inputErrorMessage: '原因不能为空'
            }).then(({ value }) => {
                var le = {
                    id: this.tableData3[index].AU_id,
                    inid:this.tableData3[index].information_id,
                    val:value,
                    pass:0,
                    type: 2
                }
                this.stauts(le)
            }).catch(() => {       
            });
        },
        async stauts(das){
            var data = await setAuthenStatus(das)
            this.$message({
                "message":"操作成功",
                "type":"success"
            })
            this.getList()
        },
        //通过
        setPassT(index){
            this.$confirm('确定通过认证?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                var le = {
                    id: this.tableData3[index].AU_id,
                    inid:this.tableData3[index].information_id,
                    pass:1,
                    type: 2
                }
                this.stauts(le)
            }).catch(() => {
         
            });
        }
        //-------------------table end-----------

    }
}
</script>
<style scoped lang="scss">
.task{
    background-color: #fff;
    // margin: 15px 25px;
    // padding: 25px;
    border-radius: 10px;
}
// ---------底部-------------
.dibu .el-pagination {
    float: right;
    margin-top: 20px;
}
.dibu span {
    font-family: 'PingFang SC Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: rgba(0, 0, 0, 0.427450980392157);
    line-height: 60px;
}
</style>