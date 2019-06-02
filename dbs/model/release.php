<?php
    /**
     * 发布任务
     *@param String release_id  发布者id
     *@param String type 职位类别
     *@param String address_city  城市名字
     *@param String address_name 县级名字
     *@param String name  任务名称
     *@param String number 需要人数
     *@param String money  工资
     *@param String cycle  结算周期
     *@param String begin_time  开始时间
     *@param String end_time 结束时间
     *@param String describe 职位描述
     *@param String requirement 职位要求
     *@param String Specific_address 工作地址
     *status  任务状态，0为进行中，1为结束
     *lower  默认0正常，-1禁止
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    if(!$cookie->judge()){
        $format->error([],'请先登录！');
        return;
    }
    //获取值
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $GLOBALS['error'] = '';
        if(test($obj)){
            foreach($_POST as $k=>$v){
                $$k = $v;
            }
            $data = array(
                "id"=>null,
                "release_id"=> $release_id,
                "type"=> $type,
                "address_city"=> $address_city,
                "address_name"=> $address_name,
                "name"=> $name,
                "number"=> $number,
                "money"=> $money,
                "cycle"=> $cycle,
                "begin_time"=> $begin_time,
                "end_time"=> $end_time,
                "describe"=> $describe,
                "requirement"=> $requirement,
                "Specific_address"=> $Specific_address,
                "status"=>0,
                "lower"=>0,
                "createTime"=> date('Y-m-d H:i:s')
            );
            $insert = $obj->insert("task_list", $data);
            $results = $format->zsgEcho($insert,'发布失败');
        }else{
            $format->error([],$GLOBALS['error']);
        }
    }else {
        $format->error([],'请求方式错误');
    }
    function test($obj){
        if(!isset($_POST['release_id']) || $_POST['release_id'] == ''){
            $GLOBALS['error'] = '未传发布者信息';
            return false;
        }
        $id = $_POST['release_id'];
        $query = $obj->query("select * from personal_information where id = $id",'Row');
        if($query['type'] == 0){
            $GLOBALS['error'] = '抱歉，该账户未认证不能发布任务';
            return false;
        }
        if(!isset($_POST['type']) || $_POST['type'] == ''){
            $GLOBALS['error'] = '职位类型不能为空';
            return false;
        }
        if(!isset($_POST['address_city']) || $_POST['address_city'] == ''){
            $GLOBALS['error'] = '城市不能为空';
            return false;
        }
        if(!isset($_POST['address_name']) || $_POST['address_name'] == ''){
            $GLOBALS['error'] = '县级不能为空';
            return false;
        }
        if(!isset($_POST['name']) || $_POST['name'] == ''){
            $GLOBALS['error'] = '任务名称不能为空';
            return false;
        }
        if(!isset($_POST['number']) || $_POST['number'] == ''){
            $GLOBALS['error'] = '人数不能为空';
            return false;
        }
        if(!isset($_POST['money']) || $_POST['money'] == ''){
            $GLOBALS['error'] = '薪资不能为空';
            return false;
        }
        if(!isset($_POST['cycle']) || $_POST['cycle'] == ''){
            $GLOBALS['error'] = '结算周期不能为空';
            return false;
        }
        if(!isset($_POST['begin_time']) || $_POST['begin_time'] == ''){
            $GLOBALS['error'] = '任务开始时间不能为空';
            return false;
        }
        if(!isset($_POST['end_time']) || $_POST['end_time'] == ''){
            $GLOBALS['error'] = '任务结束时间不能为空';
            return false;
        }
        if(!isset($_POST['describe']) || $_POST['describe'] == ''){
            $GLOBALS['error'] = '职位描述不能为空';
            return false;
        }
        if(!isset($_POST['requirement']) || $_POST['requirement'] == ''){
            $GLOBALS['error'] = '职位要求不能为空';
            return false;
        }
        if(!isset($_POST['Specific_address']) || $_POST['Specific_address'] == ''){
            $GLOBALS['error'] = '详情地址不能为空';
            return false;
        }
        return true;
    }
?>