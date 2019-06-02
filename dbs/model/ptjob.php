<?php
    /**
     * 查询任务列表
     *@param number size  每页数量
     *@param number page  当前页数
     *@param String address_city  城市名字
     *@param String address_name 县级名字
     *@param String type 职位类别
     *@param String cycle  结算周期
     *@param String field 排序字段
     *@param String sort 排序方式desc asc
     *@param number status  任务状态，默认0为进行中，1为结束 2为全部 ----默认0
     *@param number lower  任务状态0正常 1禁止 2为全部 ----默认0
     *@param String name 任务名称
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $sql = "select * from task_list,task_type";
        if(!isset($_POST['size']) || $_POST['size'] == ''){
            $format->error([],'请传入每页数量');
            return;
        }
        if(!isset($_POST['page']) || $_POST['page'] == ''){
            $format->error([],'请传入当前页数');
            return;
        }
        if($_POST['page'] <1 ){
            $format->error([],'页数必须大于等于1');
            return;
        }
        // $page = $_POST['page'];
        // $size = $_POST['size'];
        foreach($_POST as $k=>$v){
            $$k = $v;
        }
        if(isset($name) && $name!=""){
            $ids = $obj->query("select * from task_list,task_type where task_list.type = task_type.typeId and task_list.name like '%$name%'","All");
            $totalPage = ceil(count($ids)/$size);
             //数据
            $data = array(
                "data"=>$ids,
                "size"=>$size,
                "page"=>$page,
                "totalSize"=>count($ids), //总条数
                "totalPage"=>$totalPage //总页数
            );
            $format->queryEcho($data);
        }else{
            if(isset($page) || isset($type) || isset($address_city) || isset($address_name) || isset($status) || isset($lower) || isset($field) || isset($sort) || isset($cycle)){
                $sql .= " where task_list.type = task_type.typeId";
                $where = "id > 0";
                if(isset($type)){
                    $sql .= " and task_list.type = ".$type;
                    $where .= " and type = ".$type;
                }
                if(isset($address_city)){
                    $sql .= " and task_list.address_city = '".$address_city."'";
                    $where .= " and address_city = '".$address_city."'";
                }
                if(isset($address_name)){
                    $sql .= " and task_list.address_name = '".$address_name."'";
                    $where .= " and address_name = '".$address_name."'";
                }
                if(isset($cycle)){
                    $sql .= " and task_list.cycle = '".$cycle."'";
                    $where .= " and cycle = '".$cycle."'";
                }
                if(isset($status)){
                    if($status == 2){
    
                    }else{
                        $sql .= " and task_list.status = ".$status;
                        $where .= " and status = ".$status;
                    }
                }else{
                    $sql .= " and task_list.status = 0";
                    $where .= " and status = 0";
                }
                if(isset($lower)){
                    if($lower == 2){
    
                    }else{
                        $sql .= " and task_list.lower = ".$lower;
                        $where .= " and lower = ".$lower;
                    }
                }else{
                    $sql .= " and task_list.lower = 0";
                    $where .= " and lower = 0";
                }
                if(isset($field) && isset($sort)){
                    $sql .= " order by task_list.$field ".$sort;
                    $where .= " order by $field ".$sort;
                }       
            }
            // $format->queryEcho($sql);
            // return
            //根据条件查询出的数据
            $query = $obj->limit($sql, 'All', $size, $page);
            //总共数据
            $count = $obj->count('task_list',$where);
            // $format->error([],$count);
            // return;
            $totalPage = ceil($count/$size);
            //数据
            $data = array(
                "data"=>$query,
                "size"=>$size,
                "page"=>$page,
                "totalSize"=>$count, //总条数
                "totalPage"=>$totalPage //总页数
            );
            $format->queryEcho($data);
        }

    }else {
        $format->error([],'请求方式错误');
    }
?>