<?php
    /**
     * 查询任务列表
     *@param number size  每页数量
     *@param number page  当前页数
     *@param number type 类型，0最新资讯，1平台公告
     *@param String field 排序字段
     *@param String sort 排序方式desc asc
     *@param number id
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $sql = "select * from information_news";
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
        $sql .= " where id>0";
        $where = "id > 0";
        if(isset($type)){
            $sql .= " and type = ".$type;
            $where .= " and type = ".$type;
        }

        if(isset($field) && isset($sort)){
            $sql .= " order by $field ".$sort;
            $where .= " order by $field ".$sort;
        }else{
            $sql .= " order by createTime desc";
        }       
        // $format->queryEcho($sql);
        // return
        //根据条件查询出的数据
        $query = $obj->limit($sql, 'All', $size, $page);
        //总共数据
        $count = $obj->count('information_news',$where);
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

    }else {
        if(!isset($_GET['id'])){
            $format->error([],'请传入信息id');
            return;
        }
        $id = $_GET['id'];
        $sql = "select * from information_news where id = $id";
        $query = $obj->query($sql,"Row");
        $format->success($query,"获取成功");
    }
?>