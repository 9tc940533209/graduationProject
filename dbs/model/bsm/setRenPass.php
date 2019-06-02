<?php
    /**
     * 设置身份认证状态
     *@param number id  认证id
     *@param number inid  认证者id
     *@param number type 1为商家 2为学生
     *@param String pass 0未通过 1通过
     *@param String val 未通过原因
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
            $format->error([],'请传入认证id');
            return;
        }
        if(!isset($_POST['inid'])){
            $format->error([],'请传入认证者id');
            return;
        }
        $id = $_POST['id'];
        $inid = $_POST['inid'];
        $type = $_POST['type'];
        $pass = $_POST['pass'];
        //判断商家学生
        if($type == 1){
            $sqlName = "personal_At_merchant";
        }else{
            $sqlName = "personal_At_student";
        }

        if($pass == 0){
            if(!isset($_POST['val'])){
                $format->error([],'请传入未通过原因');
                return;
            }
            $val = $_POST['val'];
            $meg = "您的信息认证未通过，原因：".$val;
            $typeInfor = "0";
        }else{
            $meg = "恭喜您，您的认证信息已通过！";
            $typeInfor = $type;
        }
        $das = array(
            "type"=> $typeInfor
        );
        $updateInfo = $obj->update("personal_information",$das,"id = $inid");

        $log = array(
            "id"=>null,
            "information_id"=>$inid,
            "content"=>$meg,
            "createTime"=>date('Y-m-d H:i:s'),
        );
        $notice = array(
            "id"=>null,
            "recipient_id"=>$inid,
            "name"=>"认证信息",
            "createTime"=>date('Y-m-d H:i:s'),
            "content"=>$meg
        );
        $insertLog = $obj->insert("personal_log",$log);
        $insertNotice = $obj->insert("information_notice",$notice);

        $data = array(
            "pass"=>$pass
        );
        $update = $obj->update($sqlName,$data,"AU_id = $id");
        $format->zsgEcho($update);
    }else {
        $format->error([],'请求方式错误');
    }
?>