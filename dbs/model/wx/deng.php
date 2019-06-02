<?php
    /**
     * 登录
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    $cookies = md5($_SERVER['REMOTE_ADDR'].'55555555');
    setcookie("LOGIN_SUCCESS_COOKIE", $cookies, time() + 1000 * 60 * 60);
    echo "恢复登录状态";
?>