<?php
    /**
     * 获取申请列表
     * @param number id  登录者id
     * @param String Business_brief  商家简介
     * @param String Business_address  商家地址
     */
    include_once('./.././sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if(!isset($_POST['id'])){
        $format->error([],'请传入任务id');
        return;
    }
    if(!isset($_POST['Business_brief']) || $_POST['Business_brief'] == ''){
        $format->error([],'商家简介不能为空');
        return false;
    }
    if(!isset($_POST['Business_address']) || $_POST['Business_address'] == ''){
        $format->error([],'商家地址不能为空');
        return false;
    }
    $id = $_POST['id'];
    $query = $obj->query("select * from personal_explain where information_id = $id",'All');
    $data = array(
        "information_id"=> $id,
        "Business_address"=>$_POST['Business_address'],
        "Business_brief"=>$_POST['Business_brief']
    );
    if(count($query) == 0){
        $data['id'] = null;
        $insert = $obj->insert('personal_explain',$data);
        $format->zsgPEcho($insert,"新增简介失败");
    }else{
        $update = $obj->update('personal_explain',$data,"information_id = $id");
        $format->zsgPEcho($update,"修改简介失败");
    }
    
    
?>