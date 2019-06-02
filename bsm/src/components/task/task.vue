<template>
    <div class="task">
        <!-- 查询 -->
        <el-form ref="form" :model="form" label-width="90px" :inline="true">
          <el-form-item label="进行状态：">
            <el-select v-model="form.status" placeholder="请选择" size="mini">
              <el-option label="进行中" value="0"></el-option>
              <el-option label="已结束" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务状态：">
            <el-select v-model="lower" placeholder="请选择" size="mini">
              <el-option label="正常" value="0"></el-option>
              <el-option label="封禁" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务名称：">
              <el-input v-model="form.name" placeholder="请输入" size="mini"></el-input>
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
            label="任务名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="address_name"
            label="地址"
            align="center">
            <template slot-scope="scope"> 
	          	<span>{{scope.row.address_city}} - {{scope.row.address_name}}</span>
	        </template>
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="职位类型"
            align="center">
          </el-table-column>
          <el-table-column
            prop="lower"
            label="任务状态"
            align="center">
         	<template slot-scope="scope"> 
	          	<span v-if="scope.row.lower=='0'" class="success paddingS">正常</span>
	          	<span v-if="scope.row.lower=='1'" class="warning paddingS">封禁</span>
	        </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="进行状态"
            align="center">
         		<template slot-scope="scope"> 
                    <span v-if="scope.row.status=='0'"><span class="success-status"></span>进行中</span>
	          	    <span v-if="scope.row.status=='1'"><span class="file-status"></span>已结束</span>    	
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
                        <el-dropdown-item v-if="scope.row.lower == 0"><span class="occupy" @click="setStatus(scope.$index,2)">禁封</span></el-dropdown-item>
                        <el-dropdown-item v-if="scope.row.lower == 1"><span class="occupy" @click="delStatus(scope.$index,2)">解除禁封</span></el-dropdown-item>
                        <el-dropdown-item style="color:red"><span @click="del(scope.$index)" class="occupy">删除任务</span></el-dropdown-item>
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
                <el-form-item label="任务名称：">{{ look.name }}</el-form-item>
                <el-form-item label="职位类型：">{{ look.typeName }}</el-form-item>
                <el-form-item label="城市：">{{ look.address_city }}</el-form-item>
                <el-form-item label="区县：">{{ look.address_name }}</el-form-item>
                <el-form-item label="所需人数：">{{ look.number }}人</el-form-item>
                <el-form-item label="价钱：">{{ look.money }}</el-form-item>
                <el-form-item label="结算周期：">{{ look.cycle }}</el-form-item>
                <el-form-item label="开始时间：">{{ look.begin_time }}</el-form-item>
                <el-form-item label="结束时间：">{{ look.end_time }}</el-form-item>
                <el-form-item label="创建时间：">{{ look.createTime }}</el-form-item>
                <el-form-item label="职位描述：">{{ look.describe }}</el-form-item>
                <el-form-item label="职位要求：">{{ look.requirement }}</el-form-item>
                <el-form-item label="详细地址：">{{ look.Specific_address }}</el-form-item>
                <el-form-item label="进行状态：">{{ look.status == 0?'进行中':'结束' }}</el-form-item>
                <el-form-item label="任务状态：">{{ look.lower == 0?'正常':'禁封' }}</el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="lookPublisher">查看发布者</el-button>
                <el-button type="primary" @click="lookVisible = false">确 定</el-button>
            </span>
        </el-dialog>
         <!-- 查看发布者-->
        <el-dialog
            title="查看发布者详情"
            :visible.sync="publisherVisible"
            width="600px"
            modal>
            <div class="look activity">
              <el-form ref="form" label-width="130px">
                <el-form-item label="用户名：">{{ personal.name }}</el-form-item>
                <el-form-item label="创建时间：">{{ personal.createTime }}</el-form-item>
                <el-form-item label="性别：">{{ personal.sex }}</el-form-item>
                <el-form-item label="年龄：">{{ personal.age }}</el-form-item>
                <el-form-item label="电话：">{{ personal.phone }}</el-form-item>
                <el-form-item label="邮箱：">{{ personal.email}}</el-form-item>
                <el-form-item label="好评率：">{{ personal.praise}}%</el-form-item>
                <el-form-item label="类型：">{{ personal.type == 0?'暂未认证':personal.type == 1?'商家':'学生'}}</el-form-item>
                <el-form-item label="类型：">{{ personal.status == 0?'正常':personal.status == 1?'警告':'禁封'}}</el-form-item>
              </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="publisherVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {getTaskList,delTask,setTaskStatus} from './../../api/task'
import {users,delusers} from './../../api/api'
import {queryPersonal} from './../../api/user'
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
            publisherVisible: false,
            look:{},
            personal:{}
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
                name: this.form.name
            }
            if(this.form.status == undefined){
                le.status = 2
            }else{
                le.status = this.form.status
            }
            if(this.lower == ''){
                le.lower = 2
            }else{
                le.lower = this.lower
            }
            this.tableLoading = true
            var data = await getTaskList(le)
            this.tableLoading = false
            this.tableData3 = data.data
            this.totalElements = data.totalSize/1
            this.totalPages = data.totalPage/1
            if(data.totalPage == 0){
                this.currentPage = 0
            }else{
                this.currentPage = data.page/1
            }
            console.log(data)
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
            this.look = JSON.parse(JSON.stringify(this.tableData3[index]))
            this.lookVisible = true
        },
        //查看发布者
        async lookPublisher(){
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            try{
                let le = {
                    id : this.look.id
                }
                var data = await queryPersonal(le)
                this.publisherVisible = true
                this.personal = data.information
                loading.close();
            }catch(e){
                loading.close();
            }
        },
        // 删除任务
        del (index){
            this.$confirm('确定删除此任务?此操作不可逆', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                var le = {
                    id:this.tableData3[index].id,
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
            var data = await delTask(val)
            this.$message({
                "message":"删除成功",
                "type":"success"
            })
            this.getList()
        },
        //禁封，警告
        setStatus(index,type){
            var message
            message="请输入禁封原因"
            this.$prompt(message, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /\S/,
              inputErrorMessage: '原因不能为空'
            }).then(({ value }) => {
                var le = {
                    id: this.tableData3[index].id,
                    inid:this.tableData3[index].release_id,
                    val:value,
                    lower:1,
                    name:this.tableData3[index].name
                }
                this.stauts(le)
            }).catch(() => {       
            });
        },
        async stauts(das){
            var data = await setTaskStatus(das)
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
                    lower:0,
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




