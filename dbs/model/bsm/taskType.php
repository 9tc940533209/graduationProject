<?php
    /**
     * 任务类型管理
     *@param number typeId  类型id
     *@param number typeName  类型名称
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        $query = $obj->query("select * from task_type","All");
        foreach($query as $k=>$v){
            $typeids = $v['typeId'];
            $v['count'] = $obj->count("task_list","type = $typeids");
            $das[] = $v;
            
        }
        $format->queryEcho($das);
    }else {
        if(isset($_POST['typeId'])){
            //删除
            $typeId = $_POST['typeId'];
            $del = $obj->delete("task_type","typeId = $typeId");
            $format->zsgEcho($del,"删除0行");
        }else{
            //新增
            if(!isset($_POST['typeName'])){
                $format->error("请传入类型名称");
                return;
            }
            $typeName = $_POST['typeName'];
            $data = array(
                "typeId"=> null,
                "typeName"=> $typeName
            );
            $insert = $obj->insert("task_type",$data);
            $format->zsgEcho($insert,"插入数据失败");
        }
    }
?>