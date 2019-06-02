<?php
    /**
     * 获取任务每个类型总数
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $sql = "select * from personal_information";
        $zong = $obj->count('personal_information',null);
        $student = $obj->count('personal_information',"type = 2");
        $merchant = $obj->count('personal_information',"type = 1");
        $wei = $obj->count('personal_information',"type = 0");
        $task = $obj->query("SELECT count(*) as value,typeName as name from task_list LEFT JOIN task_type on task_list.type = task_type.typeId GROUP BY type order by count(*) desc limit 5","All");
        $data = array(
            "zong"=>$zong,
            "student"=>$student,
            "merchant"=>$merchant,
            "wei"=>$wei,
            "task"=>$task
        );
        $format->success($data,"成功");
    }else {
        $format->error([],'请求方式错误');
    }
?>