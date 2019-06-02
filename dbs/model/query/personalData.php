<?php
    /**
     * 个人信息全部
     */
    include_once('./.././sqlEntrance.php');
    // if(!$cookie->judge()){
    //     echo $format->error([],'请先登录！');
    //     return;
    // }
    if(!isset($_GET['id'])){
        $format->error([],'请传入个人id');
        return;
    }
    $id = $_GET['id'];
    $experience = [];
    $query = $obj->query("select * from personal_information where id = $id",'Row');

    $explain = $obj->query("select * from personal_explain where information_id = $id",'Row');

    $type = $query['type'];
    $zong = $obj->query("select * from task_apply where apply_id = $id and result = 1","All");
    $query['zong'] = $zong;

    if($type == 1){
        //商家
        $at = $obj->query("select * from personal_at_merchant where information_id = $id","Row");
    }else if($type == 2){
        //个人
        $at = $obj->query("select * from personal_at_student where information_id = $id","Row");
        //工作经验
        $experience = $obj->query("select * from personal_experience where information_id = $id","All");
        //完成总单数
        
    }else{
        $at = [];
    }
    $data = array(
        'information'=>$query,
        'explain'=>$explain,
        'at'=>$at,
        'experience'=>$experience
    );
    $format->queryEcho($data);
?>