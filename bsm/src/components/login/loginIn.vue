<template>
	<div class="login">
    <div id="particles-js"></div>
		<div class="logins">
      <h1 style="font-size: 30px;margin-top:30px;margin-bottom:30px;">后台管理系统</h1>
      <!-- <img src="./../../assets/img/logo.png" alt="" width="180px"> -->
      <div class="logins_content">
        <!-- <div class="content_head">
          <span @click="sp1" :class="{'sty': yang}">账号登录</span>
          <span @click="sp2" :class="{'sty': !yang}">扫码登录</span>
        </div> -->
        <div v-if="yang">
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="username">
              <el-input ref="username" v-model="form.username" placeholder="账号" prefix-icon="el-icon-mobile-phone" @keyup.enter.native="nest"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input ref="pass" v-model="form.password" placeholder="密码" prefix-icon="el-icon-setting" type="password" @keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item class="l-input" style="width:290px;display:inline-block;margin-right:20px;margin-bottom:0" v-show="yancode">
              <el-input class="yans" v-model="form.verifyCode" style="margin-right:10px;float:left;" placeholder="请输入验证码" prefix-icon="el-icon-news"></el-input>   
            </el-form-item>
            <img :src="url" height="40" style="cursor:pointer;float:right" title="看不清？点击更换" @click="verifys" v-show="yancode">
            <el-form-item>
              <div class="btn" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">登录</div>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="!yang"></div>
      </div>
    </div>
	</div>
</template>

<script>
import {login, looks,users,verify} from './../../api/api'
	export default {
		data() {
			return {
        form: {
          username: '',
          password: ''
        },
        yang: true,
        url: '',
        num: '',
        yancode:  false,
        fullscreenLoading: false,
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
			}
		},
		beforeMount() {

    },
    mounted(){
      // this.$refs.username.focus()
    },
		methods: {
      nest(){
        this.$refs.pass.focus()
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      onSubmit (){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true;
            this.log()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //登录
      async log(){
        try{
          var data = await login(this.form)
          this.fullscreenLoading = false
          this.datas(data)
        }catch(e){
          this.fullscreenLoading = false
          console.log(e)
        }
      },
      //存储信息
      async datas(data){
        var Cookies = require('cookies-js')
        Cookies.set('COOKIE_USER_TICKET_DATACRM_', "55555555") // 24小时
        // var datas  = await users()
        // window.sessionStorage.setItem('users',JSON.stringify(datas))
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          path: '/home'
        })
      },
      sp1 () {
        this.yang = true
      },
      sp2 () {
        this.yang = false
      },
      // 验证码
      verifys(){
        if(this.form.username == ''){
          this.$message.error('请输入账户名称')
          return
        }
        this.num++
        this.url = '/datacrm/user/verify?username=' + this.form.username+ '&t=' + this.num
      }
		}
	}
</script>

<style>
h1{
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
  margin-top: 30px;
}
.login{
  width: 100%;
  height: 100%;
  /* background-color: #fff; */
  background-image: url(./../../assets/img/u1.jpg);
  background-repeat: no-repeat;
  -moz-background-size: 100% 100%;  
  -o-background-size: 100% 100%;  
  -webkit-background-size: 100% 100%;  
  background-size: 100% 100%;
  overflow: hidden;
}
.logins {
  padding: 0 30px;
  padding-top: 40px;
  width: 25%;
  height: 450px;
  background-color: #F1F2F6;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 150px;
  max-width: 450px;
  min-width: 380px;
  box-sizing: border-box;
}
.logins>img{
  display: block;
  margin: 0 auto;
}
.logins_content{
  margin: 25px 20px;
  position: relative;
}
.content_head {
  display: flex;
  margin-bottom: 20px;
}
.content_head>span {
  flex:1;
  text-align: center;
  font-family: 'Microsoft Tai Le';
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  line-height: 33px;
  cursor: pointer;
}
.sty {
  border-bottom: 2px solid #409EFF;
  color: #409EFF;
}
.btn {
  height: 40px;
  background-color: rgba(24, 144, 255, 1);
  width: 100%;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
}
.l-input{
	text-align: left;
	background:rgba(49,55,103,0.7);
	border-radius: 10px;
	margin-bottom: 30px;
}
.l-input .sign{
	position: relative;
	top: 8px;
}
</style>