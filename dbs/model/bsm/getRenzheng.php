<?php
    /**
     * 查询认证信息
     *@param number size  每页数量
     *@param number page  当前页数
     *@param number type  1商家 2学生
     *@param number pass  2为全部 -1为未审核 0为未通过 1通过
     *@param String field 排序字段
     *@param String sort 排序方式desc asc
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        
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
        if(!isset($_POST['type']) || $_POST['type'] == ''){
            $format->error([],'请传入认证类型');
            return;
        }
        foreach($_POST as $k=>$v){
            $$k = $v;
        }
        if($type == 1){
            $sql = "select * from personal_At_merchant";
            $sqlName = "personal_At_merchant";
        }else{
            $sql = "select * from personal_At_student";
            $sqlName = "personal_At_student";
        }
        if(isset($page) || isset($pass) || isset($field) || isset($sort)){
            $sql .= " where AU_id > 0";
            $where = "AU_id > 0";
            if(isset($pass) && $pass != ''){
                if($pass == 2){

                }else{
                    $sql .= " and pass = ".$pass;
                    $where .= " and pass = ".$pass;
                }
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
        $count = $obj->count($sqlName,$where);
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
        $format->error([],'请求方式错误');
    }
?>