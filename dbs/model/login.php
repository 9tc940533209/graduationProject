<?php
    /**
     * 登录页面
     *@param String username  用户名
     *@param String password  密码
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    //获取值
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $GLOBALS['error'] = '';
        $name = $_POST['username'];
        $pass = $_POST['password'];
        if(test($obj)){
            $query = $obj->query("select * from personal_account where username = '".$name."' and password = '".$pass."'",'All');
            if(is_array($query)){
                if(count($query) == 1){
                    //设置cookie 请求ip+55555555
                    $cookies = md5($_SERVER['REMOTE_ADDR'].'55555555');
                    setcookie("LOGIN_SUCCESS_COOKIE", $cookies, time() + 48 * 60 * 60);
                    $ids = $query[0]['id'];
                    $queryInfor = $obj->query("select * from personal_information where ac_id = $ids",'All');
                    $queryInforevaluate = $obj->query("select * from personal_explain where information_id = $ids",'Row');
                    $queryInfor[0]['evaluate'] = $queryInforevaluate['evaluate'];
                    $querycount = $obj->count("task_apply","apply_id = $ids and result = 1");
                    $queryInfor[0]['zong'] = $querycount;
                    if($queryInfor[0]['status'] == 2){
                        $format->error([],"该账号已被封禁,请联系客服进行申诉");
                        return;
                    }
                    $format->success($queryInfor[0],"登录成功");
                }else{
                    $format->error([],"账号或密码错误") ;
                }
                
            }else{
                $format->error([],'登录失败，请联系客服');
            }
        }else{
            $format->error([],$GLOBALS['error']);
        }
    }else {
        $format->error([],'请求方式错误');
    }
    //检测输入账号是否正确
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
        return true;
    }
?>