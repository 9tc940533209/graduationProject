<?php
    /**
     * 获取申请列表
     * @param number id  任务id
     * @param number init  登录者id
     */
    include_once('./.././sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if(!isset($_GET['id'])){
        $format->error([],'请传入任务id');
        return;
    }
    if(!isset($_GET['init'])){
        $format->error([],'请传入发布者id');
        return;
    }
    $id = $_GET['id'];
    $querys = $obj->query("select * from task_list where id = $id",'Row');
    if($querys['release_id'] == $_GET['init']){
        $query = $obj->query("select personal_information.id,personal_information.name,personal_information.age,personal_information.sex,personal_information.phone,personal_information.type,task_apply.result from personal_information,task_apply where personal_information.id = task_apply.apply_id and task_apply.list_id = $id",'All');
        $format->queryEcho($query);
    }else{
        $format->error([],'未查询到任务');
    }
    
    
?>