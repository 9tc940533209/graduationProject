<?php
    /**
     * 查询用户信息
     *@param number size  每页数量
     *@param number page  当前页数
     *@param number type  0未认证 1商家 2学生
     *@param number status 0为正常，1为警告，2为禁封
     *@param String field 排序字段
     *@param String sort 排序方式desc asc
     *@param String username 账号
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $sql = "select * from personal_information";
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
        foreach($_POST as $k=>$v){
            $$k = $v;
        }
        if(isset($username)){
            $ids = $obj->query("select * from personal_information where ac_id in (select id from personal_account where username = '$username')","All");
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
            if(isset($page) || isset($type) || isset($status) || isset($field) || isset($sort)){
                $sql .= " where id > 0";
                $where = "id > 0";
                if(isset($type) && $type != ''){
                    $sql .= " and type = ".$type;
                    $where .= " and type = ".$type;
                }
                if(isset($status) && $status != ''){
                    $sql .= " and status = ".$status;
                    $where .= " and status = ".$status;
                }
                if(isset($field) && isset($sort)){
                    $sql .= " order by $field ".$sort;
                    $where .= " order by $field ".$sort;
                }else{
                    $sql .= " order by createTime desc";
                    $where .= " order by createTime desc";
                }       
            }
            // $format->queryEcho($sql);
            // return
            //根据条件查询出的数据
            $query = $obj->limit($sql, 'All', $size, $page);
            //总共数据
            $count = $obj->count('personal_information',$where);
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