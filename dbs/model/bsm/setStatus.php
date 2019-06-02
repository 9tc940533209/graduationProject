<?php
    /**
     * 设置用户状态
     *@param number id  用户id
     *@param number type 1为警告 2为禁封
     *@param number val 操作原因
     *@param number types 1为设置状态 2为解除状态
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $sql = "select * from personal_information";
        if(!isset($_POST['id'])){
            $format->error([],'请传入用户id');
            return;
        }
        if(!isset($_POST['types'])){
            $format->error([],'请传入操作code');
            return;
        }
        $id = $_POST['id'];
        if($_POST['types'] == 1){
            if(!isset($_POST['type'])){
                $format->error([],'请传入操作类型');
                return;
            }
            if(!isset($_POST['val'])){
                $format->error([],'请传入操作原因');
                return;
            }
            $type = $_POST['type'];
            $val = $_POST['val'];
            if($type == 1){
                $meg = "您的账号已警告，原因：".$val;
            }else{
                $meg = "您的账号已禁封，原因：".$val;
            }
            $data = array(
                "status"=>$type
            );
            $log = array(
                "id"=>null,
                "information_id"=>$id,
                "content"=>$meg,
                "createTime"=>date('Y-m-d H:i:s')
            );
            $notice = array(
                "id"=>null,
                "recipient_id"=>$id,
                "name"=>"账号处罚",
                "createTime"=>date('Y-m-d H:i:s'),
                "content"=>$meg
            );
            $insertLog = $obj->insert("personal_log",$log);
            $insertNotice = $obj->insert("information_notice",$notice);
        }else{
            $data = array(
                "status"=>0
            );
        }
        $update = $obj->update("personal_information",$data,"id = $id ");
        $format->zsgEcho($update);
    }else {
        $format->error([],'请求方式错误');
    }
?>