<?php
    /**
     * 修改基础资料
     * @param number id  人物id
     * @param String name  公司名称
     * @param String begin_time 开始时间
     * @param String end_time 结束时间
     * @param String content 内容
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
            $format->error([],'请传入公司名称');
            return;
        }
        if(!isset($_GET['begin_time'])){
            $format->error([],'请传入开始时间');
            return;
        }
        if(!isset($_GET['end_time'])){
            $format->error([],'请传入结束时间');
            return;
        }
        if(!isset($_GET['content'])){
            $format->error([],'请传入工作内容');
            return;
        }
        $id = $_GET['id'];
        $data = array(
            "EP_id"=>null,
            "information_id" => $_GET['id'],
            "name" => $_GET['name'],
            "begin_time" => $_GET['begin_time'],
            "end_time" => $_GET['end_time'],
            "content" => $_GET['content']
        );
        $insert = $obj->insert("personal_experience",$data);
        $format->zsgEcho($insert);



    }


    
    
?>