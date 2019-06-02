<?php
    /**
     * 查询发布任务
     *@param number id  个人id
     *@param number page  当前页数
     *@param number size  每页条数
     *@param number lower 任务正常否，默认0
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    if(isset($_POST['id'])){
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
        $page = $_POST['page'];
        $size = $_POST['size'];
        $id = $_POST['id'];
        //任务信息
        $sql = "select * from task_list where lower = 0 and release_id = $id";
        //根据条件查询出的数据
        $query = $obj->limit($sql, 'All', $size, $page);
        //总共数据
        $count = $obj->count('task_list',"lower = 0 and release_id = $id");
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
    }else{
        $format->error([],'请传入id');
    }
?>