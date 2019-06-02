<?php
    /**
     * 评论 全部
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
    $query = $obj->query("select * from task_evaluate where list_id in (select id from task_list WHERE release_id = $id)",'All');
    $format->queryEcho($query);
?>