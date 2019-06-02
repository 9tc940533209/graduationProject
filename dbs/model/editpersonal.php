<?php
    /**
     * 修改基础资料
     * @param number id  人物id
     * @param String name  姓名
     * @param String sex 性别
     * @param number age 人物年龄
     * @param String phone 电话
     * @param String email 邮箱
     * @param String evaluate 自我简介
     */
    include_once('./sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        if(!isset($_GET['id'])){
            $format->error([],'请传入人物id');
            return;
        }
        if(!isset($_GET['name'])){
            $format->error([],'请传入姓名');
            return;
        }
        if(!isset($_GET['sex'])){
            $format->error([],'请传入性别');
            return;
        }
        if(!isset($_GET['age'])){
            $format->error([],'请传入年龄');
            return;
        }
        if(!isset($_GET['phone'])){
            $format->error([],'请传入电话');
            return;
        }
        if(!isset($_GET['email'])){
            $format->error([],'请传入邮箱');
            return;
        }
        $id = $_GET['id'];
        $data = array(
            "name" => $_GET['name'],
            "sex" => $_GET['sex'],
            "age" => $_GET['age'],
            "phone" => $_GET['phone'],
            "email" => $_GET['email']
        );
        $update = $obj->update('personal_information',$data,"id = $id");
        $query = $obj->query("select * from personal_explain where information_id = $id","All");
        if(count($query) == 0){
            $das = array(
                "id"=>null,
                "information_id"=>$id,
                "evaluate"=>$_GET['evaluate'],
                "Business_brief"=>null,
                "Business_address"=>null
            );
            $obj->insert("personal_explain",$das);
        }else{
            $das = array(
                "evaluate"=>$_GET['evaluate']
            );
            $obj->update("personal_explain",$das,"information_id = $id");
        }
        if(is_int($update)){
            $queryInfor = $obj->query("select * from personal_information where id = $id",'Row');
            $queryInforevaluate = $obj->query("select * from personal_explain where information_id = $id",'Row');
            // $queryInfor[0]['evaluate'] = $queryInforevaluate['evaluate'];
            $format->success($queryInfor,"修改成功");
        }else{
            $format->zsgEcho($update);
        }

        

    }


    
    
?>