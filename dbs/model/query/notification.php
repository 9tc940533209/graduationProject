<?php
    /**
     * 查询消息
     * @param number id  登录者id
     * @param number messgaeId  消息id
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
        $query = $obj->query("select * from information_notice where recipient_id = $id","All");
        $format->queryEcho($query);
    }else{
        if(!isset($_POST['messgaeId'])){
            $format->error([],'请传入信息id');
            return;
        }
        $messgaeId = $_POST['messgaeId'];
        $del = $obj->delete("information_notice","id = $messgaeId");
        $format->zsgPEcho($del,"删除失败");
    }   
?>