<?php
    /**
     * 注册账号
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    //获取值
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $GLOBALS['error'] = '';
        if(test($obj)){
            $data = array(
                "id"=>null,
                "username"=>$_POST['username'],
                "password"=>$_POST['password'],
                "createTime"=>date('Y-m-d H:i:s')
            );
            $insert = $obj->insert("personal_account", $data);
            $results = $format->zsgPEcho($insert,'未注册成功');
        }else{
            $format->error([],$GLOBALS['error']);
        }
    }else {
        $format->error([],'请求方式错误');
    }
    function test($obj){
        if(!isset($_POST['username']) || $_POST['username'] == ''){
            $GLOBALS['error'] = '用户名不能为空';
            return false;
        }
        if(!isset($_POST['password']) || $_POST['password'] == ''){
            $GLOBALS['error'] = '密码不能为空';
            return false;
        }
        if (!preg_match("/^[A-Za-z0-9@.]+$/",$_POST['username'])){
            $GLOBALS['error'] = '用户名格式不正确';
            return false;
        }
        $name = $_POST['username'];
        $data = $obj->query("select * from personal_account where username = '".$name."'","All");
        if(count($data) > 0){
            $GLOBALS['error'] = '账户已存在,请登录!';
            return false;
        }
        return true;
    }
?>