<?php
    /**
     * 后台管理系统登录页面
     *@param String username  用户名
     *@param String password  密码
     *账户密码默认admin admin
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    //获取值
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $GLOBALS['error'] = '';
        $name = $_POST['username'];
        $pass = $_POST['password'];
        if(test($obj)){
            if($name == 'admin' && $pass=="admin"){
                //设置cookie 请求ip+55555555
                $cookies = md5($_SERVER['REMOTE_ADDR'].'55555555');
                setcookie("LOGIN_SUCCESS_COOKIE", $cookies, time() + 48 * 60 * 60);
                $format->success([],'登录成功');
            }else{
                $format->error([],'账号或密码错误');
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