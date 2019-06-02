<?php
    /**
     * 申请任务
     *@param number taskId  任务id
     *@param String inforId  申请者id
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    if(!$cookie->judge()){
        $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        
        $list_id = $_POST['taskId'];
        $apply_id = $_POST['inforId'];
        if(!isset($list_id)){
            $format->error([],'请传入任务id！');
            return;
        }
        if(!isset($apply_id)){
            $format->error([],'请传入申请者id！');
            return;
        }
        $infor = $obj->query("select * from personal_information where id = $apply_id","Row");
        if($infor['type'] == 0){
            $format->error([],'未认证不能申请兼职哦，请先去认证个人信息');
            return;
        }
        if($infor['type'] == 1){
          $format->error([],'商家不能申请任务哦');
          return;
      }
        //新增
        $data = array(
            'id'=>null,
            'apply_id'=>$apply_id,
            'list_id'=>$list_id,
            'result'=>-1
        );
        $query = $obj->query("select * from task_apply where list_id = $list_id and apply_id = $apply_id","Row");
        if($query){
            $format->error([],'你已申请过该任务，请等待雇主联系');
        }else{
            $insert = $obj->insert("task_apply",$data);
            $format->zsgPEcho($insert,'添加失败，请重新申请');
        }
        
    }
?>