<?php
    /**
     * 查询任务详情
     *@param number id  任务id
     *@param number inId  登录着id，0则是没登录
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    if(isset($_GET['id'])){
        $id = $_GET['id'];
        //任务信息
        $query = $obj->query("select * from task_list where id = $id","Row");

        //发布者信息
        $releaseId = $query['release_id'];
        $information = $obj->query("select * from personal_information where id = $releaseId","Row");
        $type = $information['type'];

        if($type == 1){
            //商家
            $explain = $obj->query("select * from personal_explain where information_id = $releaseId",'Row');
            $query['address'] = $explain['Business_address'];
        }else{
            $at = $obj->query("select * from personal_at_student where information_id = $releaseId","Row");
            $query['address'] = $at['school'];
        }
        
        //收藏
        if(isset($_GET['inId']) && $_GET['inId'] !== 0 ){
            $inId = $_GET['inId'];
            $collection = $obj->query("select * from personal_collection where shou_id = $id and information_id = $inId","Row");
            $query['collection'] = $collection;
        }
        $query['release_name'] = $information['name'];
        $query['release_type'] = $information['type'];
        $query['release_head_img'] = $information['head_img'];
        $query['release_praise'] = $information['praise'];
        
        $format->queryEcho($query);
    }
?>