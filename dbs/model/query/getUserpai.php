<?php
    /**
     * 获取前4名学生
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $task = $obj->query("SELECT personal_information.id,personal_information.name,personal_information.praise,personal_information.head_img,personal_explain.evaluate FROM personal_information,personal_explain WHERE personal_information.type = 2 and personal_information.id = personal_explain.information_id ORDER BY personal_information.praise DESC LIMIT 4","All");
        for($i = 0;$i<count($task);$i++){
            //获取每个用户完成数
            $id = $task[$i]['id'];
            $task[$i]['zong'] = $obj->count("task_apply","result = 1 and apply_id = $id");
        }
        $format->queryEcho($task,"成功");
    }else {
        $format->error([],'请求方式错误');
    }
?>