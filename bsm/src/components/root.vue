<template>
  	<div class="root">
		<el-container>
		  <el-aside :width="width">
				<!-- <p class="title">后台管理</p> -->
				<div class="img">
					<img src="./../assets/img/tou1.png" width="50%" alt="">
				</div>
		  	
				<p style="color:#fff;text-align:center;margin-bottom:20px;margin-top:7px;"><span v-if="!isCollapse">你好，</span>admin</p>
		  	<el-menu
		  		class="el-menu-vertical-demo"
		  		:collapse="isCollapse"
		  		background-color="#252a2f"
      		text-color="#fff"
      		active-text-color="#ffd04b"
          :default-active="index"
					router
					@select="hui"
          mode="vertical"
		  		 >
           <!-- #ffd04b -->
					<el-menu-item index="1" route="home">
            <i class="el-icon-menu"></i>
				    <span slot="title">系统首页</span>
				  </el-menu-item>
					<el-menu-item index="2" route="user">
            <i class="el-icon-tickets"></i>
				    <span slot="title">用户管理</span>
				  </el-menu-item>
					<el-menu-item index="3" route="task">
            <i class="el-icon-date"></i>
				    <span slot="title">任务管理</span>
				  </el-menu-item>
					<el-menu-item index="4" route="authentication">
            <i class="el-icon-edit-outline"></i>
				    <span slot="title">认证管理</span>
				  </el-menu-item>
					<el-menu-item index="5" route="news">
            <i class="el-icon-document"></i>
				    <span slot="title">资讯信息</span>
				  </el-menu-item>
					<el-menu-item index="6" route="taskType">
            <i class="el-icon-document"></i>
				    <span slot="title">任务类型</span>
				  </el-menu-item>
					<!-- <el-menu-item index="7" route="client">
            <i class="el-icon-picture"></i>
				    <span slot="title">图片管理</span>
				  </el-menu-item> -->
          <!-- <el-menu-item index="7" route="client">
            <i class="el-icon-message"></i>
				    <span slot="title">客户线索</span>
				  </el-menu-item> -->
				</el-menu>
		  </el-aside>
		  <el-container>
		    <el-header>
		    	<div class="left">
		    		<i style="cursor: pointer;" class="el-icon-menu" @click="collapse"></i>
		    	</div>
		    	<div class="right">
		    		<span>{{ user }}</span>
		    		<span class="back" @click="dialogVisible = true">退出</span>
		    	</div>
		    </el-header>
		    <el-main>
		    	<router-view></router-view>
		    </el-main>
		  </el-container>
		</el-container>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>是否退出登录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="quit">确 定</el-button>
      </span>
    </el-dialog>	
	</div>
</template>
<script>
import router from "../router/router"
import { mapState, mapGetters, mapActions } from 'vuex'
import {quits} from './../api/api'
export default {
  data(){
    return {
			width:'230px',
			isShow:false,
			isCollapse:false,
			styleObj:{
				height:'600px'
			},
			username:'',
			menuData:[],
      canvas:null,
      user: '大学生兼职平台管理系统 |',
			dialogVisible: false,
			index: "1"
    }
	},
  created() {
		if(sessionStorage.getItem("index")){
			this.index = sessionStorage.getItem("index")
		}
  },
  methods: {
		collapse(){
			this.isCollapse = !this.isCollapse
			if(this.isCollapse){
				this.width = "63px"
			}else{
				this.width = "200px"
			}
		},
		hui (ind) {
      sessionStorage.setItem('index',ind)
    },
		login(){
			router.push({path:'/login'})
		},
		overShow(){
			this.isShow = true
		},
		outHide(){
			this.isShow = false
		},
		setWidth(){
			var obj = {
      	height:document.documentElement.clientHeight-145,
      	width:(document.documentElement.clientWidth-200)*0.83
      }
			this.canvas = obj
    },
    // 退出登录
    quit (){
      this.$router.push({
        path: '/login'
      })
      this.dialogVisible = false
      var Cookies = require('cookies-js')
			Cookies.expire('COOKIE_USER_TICKET_DATACRM_')
			sessionStorage.removeItem("index","1")
			this.index = "1"
    }
	
  },
	beforeMount (){
		const that = this;
		this.setWidth()
  	window.onresize = function temp() {
  		that.setWidth()
  	}
	}
}
</script>
<style>
.el-header{
	box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
}
.root{
	width: 100%;
	height: 100%;
}
.el-container{
	width: 100%;
	height: 100%;
}
aside{
	background: #252a2f;
}
.el-submenu .el-menu-item{
	min-width: 100px;
}
.header{
	background: #00284d;
	line-height:60px;
	color: #fff;
  padding-left: 24px;
}
header{
	background: #fff;
	height: 59px;
	line-height:59px;
	border-bottom: 1px solid #e9e9e9;
}
.router-link-active{
	color: #ffd04b;
}
.back{
	cursor: pointer;
}
.back:hover{
	color: #ff6700;
}
.img{
	display: flex;
  justify-content: center;
	align-items: center;
	margin-top: 30px;
}
.title{
	color: #fff;
	text-align: center;
	font-size: 20px;
	line-height: 50px;
	font-weight: 700;
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 201px;
  min-height: 400px;
} */
</style>
