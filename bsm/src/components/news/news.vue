<template>
    <div class="news">
        <h2>新闻资讯>新建</h2>
        <el-form ref="form" :model="form" label-width="100px" :rules="rules" hide-required-asterisk>
            <el-form-item label="新闻标题：" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="新闻类型：" prop="type">
              <el-select v-model="form.type" placeholder="请选择新闻类型">
                <el-option label="最新资讯" value="0"></el-option>
                <el-option label="平台公告" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="新闻封面：">
                <el-upload
                  class="upload-demo"
                  :action="url"
                  name="img"
                  :limit="1"
                  accept=".png,.jpg,.jpeg"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="successUp"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件</div> -->
                </el-upload>
            </el-form-item>
            <el-form-item label="内容编辑：">
                <editor ref="child" @datas="datas"></editor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">立即创建</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
      </el-form>
    </div>
</template>
<script>
import {setNews} from './../../api/news'
import editor from './editor.vue'
import { throws } from 'assert';
import {urlData} from './../../api/authentication'
export default {
    data(){
        return {
            form:{
                name: '',
                type:'',
                img:''
            },
            rules: {
              name: [
                { required: true, message: '请输入新闻名称', trigger: 'blur' },
              ],
              type: [
                { required: true, message: '请选择新闻类型', trigger: 'change' }
              ],
            },
            fullscreenLoading: false,
            url: ''
        }
    },
    created(){
        this.url = urlData+"model/bsm/setNews.php"
        console.log(this.url)
    },
    mounted(){

    },
    components:{
      editor
    },
    methods:{
        onSubmit() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    if(this.form.img == ''){
                        this.$message.error('请上传新闻封面')
                    }else{
                        this.$refs.child.submit()
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //获取富文本传来数据
        datas(data){
            if(data == undefined){
                this.$message.error("请输入内容");
                return
            }
            var das = JSON.parse(JSON.stringify(data))
            this.tijiao(das)
        },
        async tijiao(das){
            this.fullscreenLoading = true
            let le = {
                name: this.form.name,
                type: this.form.type,
                imgs: this.form.img,
                content: das
            }
            var data = await setNews(le)
            this.fullscreenLoading = false
            this.$message({
                "message":"创建成功",
                "type":"success"
            })
            console.log(data)
        },
        //取消
        resetForm(){
            this.$refs["form"].resetFields();
            this.$refs.child.del()
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        successUp(response, file, fileList){
            if(response.code == 1){
                this.$alert(response.message, '上传图片失败', {
                  confirmButtonText: '确定',
                });
                return
            }else{
                this.form.img = response.message
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.news{
    background-color: #fff;
    // margin: 15px 25px;
    padding: 25px;
    border-radius: 10px;
}
h2{
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
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
<style>
.news .el-form-item__content{
    line-height: 0px;
}
</style>



