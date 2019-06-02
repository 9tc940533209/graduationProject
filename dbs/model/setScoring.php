<?php
    /**
     * 打分系统
     * 当打分时候，将task_score表中总分取出，加上打分数，将打分次数加一再存入数据库中
     * 总分/次数=现在分数
     *@param number list_id  任务id
     *@param number infor_id  被评价人id
     *@param number person_id  评价人个人id
     *@param String person_name 评价人名称（后台随机）
     *@param number branch  分数
     *@param String content 评价内容
     *@param date createTime 创建时间 （后台创建）
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!isset($_POST['list_id'])){
            $format->error([],'请传入任务id');
            return;
        }
        if(!isset($_POST['infor_id'])){
            $format->error([],'请传入被评价人id');
            return;
        }
        if(!isset($_POST['person_id'])){
            $format->error([],'请传入登录者id');
            return;
        }
        if(!isset($_POST['branch'])){
            $format->error([],'请传入分数');
            return;
        }
        if(!isset($_POST['content'])){
            $format->error([],'请传入评价内容');
            return;
        }
        foreach($_POST as $k => $v){
            $$k = $v;
        }
        $query = $obj->query("select * from task_evaluate where list_id = $list_id and person_id = $person_id","All");
        if(count($query)>0){
            $format->error([],"该人员已评价过");
            return;
        }
        $person_name = "用户***".mt_rand(100,999);
        $score = $obj->query("select * from task_score where information_id = $person_id",'Row');
        // $task_list = $obj->query("select * from task_list where id = $list_id",'Row');
        // $task_list_id = $task_list['release_id'];
        //总分数
        $totalScore = $score['totalScore']+$branch;
        $number = $score['number']+1;
        //分数
        $newScore = ceil($totalScore/$number);

        //更新数据
        $updateScore = $obj->update("task_score",array(
            "totalScore"=>$totalScore,
            "number"=>$number
        ),"information_id = $infor_id");
        $updateInformation = $obj->update("personal_information",array(
            "praise"=>$newScore
        ),"id = $infor_id");
        $insertevaluate = $obj->insert("task_evaluate",array(
            "id"=>null,
            "list_id"=>$list_id,
            "person_id"=>$person_id,
            "person_name"=>$person_name,
            "branch"=>$branch,
            "content"=>$content,
            "createtime"=>date('Y-m-d H:i:s')
        ));
        $format->zsgEcho($updateInformation);

    }else{
        $format->error([],'请求方式错误');
    }

?>