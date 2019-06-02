<?php
    /**
     * 获取申请列表
     * @param number id  任务id
     * @param number init  登录者id
     * @param number apply_id  申请者id
     * @param number result  状态值 0未通过 1通过 -1未审核
     */
    include_once('./sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!isset($_POST['id'])){
            $format->error([],'请传入任务id');
            return;
        }
        if(!isset($_POST['init'])){
            $format->error([],'请传入发布者id');
            return;
        }
        if(!isset($_POST['apply_id'])){
            $format->error([],'请传入申请者id');
            return;
        }
        if(!isset($_POST['result'])){
            $format->error([],'请传入状态值');
            return;
        }
        $id = $_POST['id'];
        $apply_id = $_POST['apply_id'];
        $result = $_POST['result'];
        $querys = $obj->query("select * from task_list where id = $id",'Row');
        if($querys['release_id'] == $_POST['init']){
            if($querys['status'] == 1){
                $format->error([],'当前任务已结束，不能再次选择');
                return;
            }
            $data = array(
                "result" => $result
            );
            $update = $obj->update("task_apply", $data, "apply_id = $apply_id and list_id = $id");
            $format->zsgPEcho($update,'修改状态失败');
        }else{
            $format->error([],'未查询到任务');
        }
    }


    
    
?>