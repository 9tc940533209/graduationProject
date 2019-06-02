<template>
    <div class="home">
        <div class="bg-f">
            <p>用户总览：</p>
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content el-yellow">
                        <div class="iconfont heads-font">&#xe60c;</div>
                        <div class="heads-p">
                            <p>总用户</p>
                            <span>{{userData.zong}}</span>
                            <span>人</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content el-green">
                        <div class="iconfont heads-font" style="font-size:50px;">&#xe63a;</div>
                        <div class="heads-p">
                            <p>学生</p>
                            <span>{{userData.student}}</span>
                            <span>人</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content el-blue">
                        <div class="iconfont heads-font">&#xe622;</div>
                        <div class="heads-p">
                            <p>商家</p>
                            <span>{{userData.merchant}}</span>
                            <span>人</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content el-file">
                        <div class="iconfont heads-font" style="font-size:50px;">&#xe642;</div>
                        <div class="heads-p">
                            <p>未认证</p>
                            <span>{{userData.wei}}</span>
                            <span>人</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="bg-s">
            <div class="other"><div id="zhe"></div></div>
            <div class="yuan"><div id="main"></div></div>
            
        </div>
    </div>
</template>
<script>
import {getUser} from './../../api/home'
import { users } from '../../api/api';
export default {
    data(){
        return {
            userData: {},
            taskType: []
        }
    },
    created(){
        this.users()
    },
    mounted(){
        document.getElementById('main').style.height = document.querySelector('.yuan').offsetHeight+'px'
        document.getElementById('zhe').style.height = document.querySelector('.other').offsetHeight+'px'
        this.chartZhe()
    },
    methods:{
        async users(){
            this.userData = await getUser()
            this.taskType = this.userData.task
            this.chartYuan()
            console.log(this.userData)
        },
        chartYuan () {
            var data = this.taskType
            var names = []
            data.forEach(element => {
                names.push(element.name)
            });
            var echarts = require('echarts')
            // 绘制图表
            var dom = document.getElementById("main");
            var myChart = echarts.init(dom);

            var option = {
                title : {
                    text: '已发布任务排行概览',
                    subtext: '前五名任务类型数据',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data: names
                },
                calculable : true,
                series : [
                    {
                        name:'任务类型',
                        type:'pie',
                        radius : [30, 110],
                        roseType : 'area',
                        data:data
                    }
                ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () { 
            myChart.resize(); 
          })
        },
        chartZhe () {
            var echarts = require('echarts')
            // 绘制图表
            var dom = document.getElementById("zhe");
            var myChart = echarts.init(dom);

            var option = {
            title: {
                text: '网站访问来源统计'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
            };
            myChart.setOption(option)
            window.addEventListener('resize', function () { 
            myChart.resize(); 
          })
        },
    }
}
</script>
<style lang="scss" scoped>
.home{
    widows: 100%;
    height: 100%;
    display: flex;
    border-radius: 10px;
    flex-direction: column;
}
.bg-f{
    height: 210px;
    // flex: 1;
    background-color: #fff;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
    &>p{
        color: #000;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }
}
.bg-s{
    flex: 1;
    margin-top: 20px;
    display: flex;
    .yuan{
        flex: 1;
        box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
        background-color: #fff;
        border-radius: 10px;
        margin-left: 20px;
    }
    .other{
        flex: 2;
        box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
        background-color: #fff;
        border-radius: 10px;

    }
}
.el-green{
    background-color: #67C23A;
}
.el-yellow{
    background-color: #E6A23C;
}
.el-file{
    background-color: #909399;
}
.el-blue{
    background-color: #409EFF;
}
.grid-content {
    border-radius: 10px;
    min-height: 120px;
    display: flex;
}
.grid-content div{
    flex: 1;
}
.heads-font{
    color: #fff;
    font-size: 60px;
    line-height: 120px;
    text-align: center;
}
.heads-p{
    text-align: center;
    
}
.heads-p p{
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    margin-top: 30px;
}
.heads-p span:nth-child(2){
    color: #fff;
    font-size: 25px;
    font-weight: 700;
    margin-right: 5px;
}
.heads-p span:nth-child(3){
    color: #fff;
    font-size: 14px;
    font-weight: 700;
}
.row-bg{
    height: 100%;
}
.echarts{
    height: 100%;
}
</style>


