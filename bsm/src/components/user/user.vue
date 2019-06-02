<template>
    <div class="user">
        <!-- 查询 -->
        <el-form ref="form" :model="form" label-width="60px" :inline="true">
          <el-form-item label="状态：">
            <el-select v-model="form.status" placeholder="请选择" size="mini">
              <el-option label="正常" value="0"></el-option>
              <el-option label="警告" value="1"></el-option>
              <el-option label="禁封" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型：">
            <el-select v-model="form.type" placeholder="请选择" size="mini">
              <el-option label="未认证" value="0"></el-option>
              <el-option label="商家" value="1"></el-option>
              <el-option label="学生" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账号：">
              <el-input v-model="form.username" placeholder="请输入" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="query" size="mini">查询</el-button>
            <el-button @click="reset" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格数据 -->
        <el-table ref="multipleTable" :header-row-style="headerrowstyle" :data="tableData3" tooltip-effect="dark" style="width: 100%" v-loading="tableLoading" @sort-change="sortchange">
          <el-table-column
              type="index"
              align="center"
              width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名"
            align="center">
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            align="center">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            align="center">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            align="center">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            align="center">
         	<template slot-scope="scope"> 
	          	<span v-if="scope.row.type=='0'" class="fail">未认证</span>
	          	<span v-if="scope.row.type=='1'" class="warning paddingS">商家</span>
	          	<span v-if="scope.row.type=='2'" class="success paddingS">学生</span>
	        </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center">
         		<template slot-scope="scope"> 
	          	<span v-if="scope.row.status=='2'"><span class="error-status"></span>禁封</span>
	          	<span v-if="scope.row.status=='1'"><span class="warning-status"></span>警告</span>
	          	<span v-if="scope.row.status=='0'"><span class="success-status"></span>正常</span>
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
                         更多<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="scope.row.status == 0"><span class="occupy" @click="setStatus(scope.$index,1)">警告</span></el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.status == 1"><span class="occupy" @click="delStatus(scope.$index,1)">解除警告</span></el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.status == 0"><span class="occupy" @click="setStatus(scope.$index,2)">禁封</span></el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.status == 2"><span class="occupy" @click="delStatus(scope.$index,2)">解除禁封</span></el-dropdown-item>
                        <el-dropdown-item style="color:red"><span @click="del(scope.$index)" class="occupy">删除用户</span></el-dropdown-item>
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
            width="550px"
            modal>
            <div class="look activity">
              <el-form ref="form" label-width="130px">
                <el-form-item label="账户名称：">{{ look.information.name }}</el-form-item>
                <el-form-item label="性别：">{{ look.information.sex }}</el-form-item>
                <el-form-item label="年龄：">{{ look.information.age }}</el-form-item>
                <el-form-item label="类型：">{{ look.information.type == 0?'未认证':look.information.type == 1?'商家':'学生' }}</el-form-item>
                <el-form-item label="状态：">{{ look.information.status == 0?'正常':look.information.status == 1?'警告':'禁封' }}</el-form-item>
                <el-form-item label="手机号：">{{ look.information.phone }}</el-form-item>
                <el-form-item label="邮箱地址：">{{ look.information.email }}</el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" v-show="look.information.type == 0?false:true">查看认证</el-button>
                <el-button type="primary" @click="lookVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {getUserList,setUserStatus} from './../../api/user'
import {users,delusers} from './../../api/api'
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
            lookVisible: false,
            look:{
                information:{}
            }
        }
    },
    created(){
        this.getList()
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
                type: this.form.type,
                status: this.form.status,
                username: this.form.username
            }
            this.tableLoading = true
            var data = await getUserList(le)
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
            this.page = 1
            this.getList()
        },
        //查询
        query() {
          if(this.form.status == undefined && this.form.type == undefined && this.form.username == undefined){
            this.$message.error('最少选择一项查询条件')
            return
          }
          this.page = 1
          this.getList()
        },
        //暂时
        zan(){

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
                'background-color': '#ff6700',
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
            this.look.information = JSON.parse(JSON.stringify(this.tableData3[index]))
            this.lookVisible = true
        },
        // 删除用户
        del (index){
            this.$confirm('确定删除此用户?此操作不可逆', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                var le = {
                    id:this.tableData3[index].id,
                    ac_id:this.tableData3[index].ac_id
                }
                this.delUser(le)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
        },
        async delUser(val){
            var data = await delusers(val)
            this.$message({
                "message":"删除成功",
                "type":"success"
            })
            this.getList()
        },
        //禁封，警告
        setStatus(index,type){
            var message
            if(type == 1){
                message="请输入警告原因"
            }else{
                message="请输入禁封原因"
            }
            this.$prompt(message, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /\S/,
              inputErrorMessage: '原因不能为空'
            }).then(({ value }) => {
                var le = {
                    id: this.tableData3[index].id,
                    type:type,
                    val:value,
                    types:1
                }
                this.stauts(le)
            }).catch(() => {       
            });
        },
        async stauts(das){
            var data = await setUserStatus(das)
            console.log(data)
            this.$message({
                "message":"操作成功",
                "type":"success"
            })
            this.getList()
        },
        //解除禁封，警告
        delStatus(index){
            this.$confirm('确定解除其状态，恢复至正常?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                var le = {
                    id: this.tableData3[index].id,
                    types:2
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
.user{
    background-color: #fff;
    // margin: 15px 25px;
    padding: 25px;
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