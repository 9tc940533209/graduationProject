<?php
    /**
     * 查询任务列表
     *@param number type  类型 1为删除 2为增加
     *@param number taskId  任务id
     *@param String inforId  收藏者id
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    if(!$cookie->judge()){
        $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if($_POST['type'] == 1){
            //删除
            $information_id = $_POST['inforId'];
            $shou_id = $_POST['taskId'];
            $deletes = $obj->delete('personal_collection',"information_id = $information_id and shou_id = $shou_id");
            $format->zsgPEcho($deletes,'删除失败');
        }else{
            //新增
            $data = array(
                'id'=>null,
                'information_id'=>$_POST['inforId'],
                'shou_id'=>$_POST['taskId'],
            );
            $insert = $obj->insert("personal_collection",$data);
            $format->zsgPEcho($insert,'收藏失败');
        }
    }
?>