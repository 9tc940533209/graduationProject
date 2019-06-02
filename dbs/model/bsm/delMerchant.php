<?php
    /**
     * 删除认证
     *@param number id  认证id
     *@param number type  1商家 2学生
     *@param number inid  个人id
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
            $format->error([],'请传入个人id');
            return;
        }
        if(!isset($_POST['type'])){
            $format->error([],'请传入类型');
            return;
        }
        $id = $_POST['id'];
        $inid = $_POST['inid'];
        $type = $_POST['type'];
        $data = array(
            "type"=>0
        );
        if($type == 1){
            //商家
            $dels = $obj->delete("personal_At_merchant","AU_id = $id");
            $update = $obj->update("personal_information",$data,"id = $inid");
            $format->zsgEcho($dels);
        }else{
            //学生
            $dels = $obj->delete("personal_At_student","AU_id = $id");
            $update = $obj->update("personal_information",$data,"id = $inid");
            $format->zsgEcho($dels);
        }


    }else {
        $format->error([],'请求方式错误');
    }
?>