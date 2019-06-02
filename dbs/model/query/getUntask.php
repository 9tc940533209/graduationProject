<?php
    /**
     * 查询承接任务列表
     *@param number id  个人id
     *@param number page  当前页数
     *@param number size  每页条数
     *@param number lower 任务正常否，默认0
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        //任务信息
        // $query = $obj->query("select * from task_list where id in (select list_id from task_apply WHERE apply_id = $id)",'All');
        $query = $obj->query("select task_list.id,task_list.release_id,task_list.name,task_list.begin_time,task_apply.result from task_list,task_apply where task_list.id = task_apply.list_id and task_apply.apply_id = $id",'All');
        $format->queryEcho($query);
        // $format->error("select task_list.id,task_list.name,task_list.begin_time,task_apply.result from task_list,task_apply where task_list.id = task_apply.list_id and task_apply.apply_id = $id)",'aa');
    }else{
        $format->error([],'请传入id');
    }
?>