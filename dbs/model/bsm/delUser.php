<?php
    /**
     * 删除用户
     *@param number id  信息id
     *@param number ac_id 账户id
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $sql = "select * from personal_information";
        if(!isset($_GET['id'])){
            $format->error([],'请传入用户id');
            return;
        }
        if(!isset($_GET['ac_id'])){
            $format->error([],'请传入账户id');
            return;
        }
        $id = $_GET['id'];
        $ac_id = $_GET['ac_id'];
        $dels = $obj->delete("personal_account","id = $ac_id");
        if($dels == 1){
            $del = $obj->delete("personal_information","id = $id");
            $format->zsgEcho($del);
        }else{
            $format->zsgEcho($dels);
        }


    }else {
        $format->error([],'请求方式错误');
    }
?>