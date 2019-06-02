<template>
    <div class="taskType">
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom:20px;" @click="news">新建类型</el-button>
        <!-- 表格数据 -->
        <el-table ref="multipleTable" :header-row-style="headerrowstyle" :data="tableData3" tooltip-effect="dark" style="width: 100%" v-loading="tableLoading">
          <el-table-column
              type="index"
              align="center"
              width="50">
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="类型名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="count"
            label="任务总数"
            align="center">
          </el-table-column>

          <el-table-column label="操作" width="200" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="del(scope.$index)" style="font-size:14px; color: #1890FF">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {taskTypeList,taskTypeAddDel} from './../../api/api'
export default {
    data(){
        return {
            tableData3:[],
            tableLoading: false,
        }
    },
    created(){
        this.getList()
    },
    methods:{
        //设置头部样式
        headerrowstyle({row, rowIndex}){
           return {
                'background-color': '#ff6700',
                'font-size': '15px'
           }
        },
        async getList(){
            this.tableLoading = true
            this.tableData3 = await taskTypeList()
            this.tableLoading = false
            console.log(this.tableData3)
        },
        //新建
        news(){
            this.$prompt('请输入任务类型名称', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputPattern: /\S/,
              inputErrorMessage: '任务类型名称不能为空'
            }).then(({ value }) => {
                this.newType(value)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              });       
            });
        },
        async newType(data){
            let le = {
                "typeName":data
            }
            var das = await taskTypeAddDel(le)
            this.$message({
                "message":"创建成功",
                "type":"success"
            })
            this.getList()
        },
        //删除
        del(index){
            this.$confirm('确定删除此类型，相关任务所属类型都会置空, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                this.delType(this.tableData3[index].typeId)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
        },
        async delType(data){
            let le = {
                "typeId":data
            }
            var das = await taskTypeAddDel(le)
            this.$message({
                "message":"删除",
                "type":"success"
            })
            this.getList()
        },
    }
}
</script>
<style lang="scss" scoped>
.taskType{
    background-color: #fff;
    // margin: 15px 25px;
    padding: 25px;
    border-radius: 10px;
}
</style>


