<?php
    /**
     * 获取申请列表
     * @param number id  任务id
     * @param number init  登录者id
     * @param number type  状态值 0为关闭任务,1为删除任务
     */
    include_once('./sqlEntrance.php');
    // if(!$cookie->judge()){
    //     echo $format->error([],'请先登录！');
    //     return;
    // }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!isset($_POST['id'])){
            $format->error([],'请传入任务id');
            return;
        }
        if(!isset($_POST['init'])){
            $format->error([],'请传入登录者id');
            return;
        }
        if(!isset($_POST['type'])){
            $format->error([],'请传入操作');
            return;
        }
        $id = $_POST['id'];
        $init = $_POST['init'];
        $type = $_POST['type'];
        $querys = $obj->query("select * from task_list where id = $id",'Row');
        if($querys['release_id'] == $init){
            $names = $querys["name"];
            if($type == 0){
                $data = array(
                    "result" => 0
                );
                $datas = array(
                    "status" => 1
                );
                //将申请任务状态改为失败
                $update = $obj->update("task_apply", $data, "list_id = $id AND result = -1");
                //将任务状态关闭
                $updates = $obj->update("task_list", $datas, "id = $id");
                $format->zsgPEcho($updates,'任务关闭失败');
    
                //添加通知消息
                $query = $obj->query("select apply_id from task_apply where list_id = $id AND result = 0","All");
                foreach($query as $k => $v){
                    $err = $obj->insert("information_notice",array(
                        "id"=>null,
                        "recipient_id"=>$v['apply_id'],
                        "name"=>"申请任务失败！",
                        "createTime"=>date('Y-m-d H:i:s'),
                        "content"=>"您所申请的兼职 —— $names,雇主已选择完毕，抱歉！"
                    ));
                };
    
                $success = $obj->query("select apply_id from task_apply where list_id = $id AND result = 1","All");
                foreach($success as $k => $v){
                    $suc = $obj->insert("information_notice",array(
                        "id"=>null,
                        "recipient_id"=>$v['apply_id'],
                        "name"=>"申请任务成功！",
                        "createTime"=>date('Y-m-d H:i:s'),
                        "content"=>"恭喜你,你申请的兼职 —— $names,雇主已选中你，请等待雇主联系！"
                    ));
                };
            }else{
                if($querys['status'] == 0){
                    $del = $obj->delete('task_list',"id = $id");
                    $dels = $obj->delete('task_apply',"list_id = $id");
                    $format->zsgPEcho($del,"删除任务失败");
                }else{
                    $format->error([],'任务已经完成，不能删除，抱歉！');
                }
            }

        }else{
            $format->error([],'未查询到任务');
        }
    }


    
    
?>