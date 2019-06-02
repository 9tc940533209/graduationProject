<?php
    /**
     * 查询消息
     * @param number id  登录者id
     * @param number collectionId  消息id
     */
    include_once('./.././sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        if(!isset($_GET['id'])){
            $format->error([],'请传入登录者id');
            return;
        }
        $id = $_GET['id'];
        $query = $obj->query("select * from task_list where id in (select shou_id from personal_collection where information_id = $id)","All");
        $format->queryEcho($query);
    }else{
        if(!isset($_POST['collectionId'])){
            $format->error([],'请传入收藏id');
            return;
        }
        $id = $_POST['id'];
        $collectionId = $_POST['collectionId'];
        $del = $obj->delete("personal_collection","information_id = $id and shou_id = $collectionId");
        $format->zsgPEcho($del,"删除失败");
    }   
?>