<template>
    <div class="authentication">
        <!-- <div class="heads"> -->
            <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                <!-- ........................在线  数据源模块................................. -->
                <el-tab-pane label="学生认证" name="first">
                    <student></student>
                </el-tab-pane>
                <!-- ........................离线  数据源模块................................. -->               
                <el-tab-pane label="商家认证" name="second">
                    <merchant></merchant>
                </el-tab-pane>
            </el-tabs>
        <!-- </div> -->
    </div>
</template>
<script>
import {getTaskList,delTask,setTaskStatus} from './../../api/task'
import {users,delusers} from './../../api/api'
import student from './student.vue'
import merchant from './merchant.vue'
export default {
    data () {
        return {
          activeName: 'first'
        }
    },
    components: {
        student,
        merchant
    },
    methods: {
        // 点击导航
        handleClick (tab, event) {
          // console.log(tab.label)
        }
    },
    created () {
    }
}
</script>
<style scoped lang="scss">
.authentication{
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

.index {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.head {
    height: 54px;
    min-height: 54px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    line-height: 54px;
    padding-left: 40px;
    border-bottom: 1px solid #ccc;
    font-size: 13px;
}
.heads {
    height: 46px;
    min-height: 46px;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    line-height: 46px;
    margin-bottom: 15px;
}
</style>




