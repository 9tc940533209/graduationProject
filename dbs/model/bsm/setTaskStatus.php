<?php
    /**
     * 设置任务状态
     *@param number id  任务id
     *@param number inid  发布者id
     *@param number lower 0为正常 1为禁封
     *@param String name 任务名称
     *@param String val 操作原因
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
            $format->error([],'请传入任务id');
            return;
        }
        if(!isset($_POST['lower'])){
            $format->error([],'请传入任务状态');
            return;
        }
        $id = $_POST['id'];
        $lower = $_POST['lower'];
        if($lower == 1){
            if(!isset($_POST['inid'])){
                $format->error([],'请传入发布者id');
                return;
            }
            if(!isset($_POST['val'])){
                $format->error([],'请传入操作原因');
                return;
            }
            $name = $_POST['name'];
            $inid = $_POST['inid'];
            $val = $_POST['val'];
            $meg = "您的任务- $name 已封禁，原因：".$val;



            $log = array(
                "id"=>null,
                "information_id"=>$inid,
                "task_id"=>$id,
                "content"=>$meg,
                "createTime"=>date('Y-m-d H:i:s'),
            );
            $notice = array(
                "id"=>null,
                "recipient_id"=>$inid,
                "name"=>"任务处罚",
                "createTime"=>date('Y-m-d H:i:s'),
                "content"=>$meg
            );
            $insertLog = $obj->insert("personal_log",$log);
            $insertNotice = $obj->insert("information_notice",$notice);
        }
        $data = array(
            "lower"=>$lower
        );
        $update = $obj->update("task_list",$data,"id = $id ");
        $format->zsgEcho($update);
    }else {
        $format->error([],'请求方式错误');
    }
?>