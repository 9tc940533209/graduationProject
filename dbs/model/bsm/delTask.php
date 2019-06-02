<?php
    /**
     * 删除任务
     *@param number id  任务id
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
            $format->error([],'请传入任务id');
            return;
        }
        $id = $_GET['id'];
        $del = $obj->delete('task_list',"id = $id");
        // $dels = $obj->delete('task_apply',"list_id = $id");
        $format->zsgEcho($del,"删除任务失败");
    }else {
        $format->error([],'请求方式错误');
    }
?>