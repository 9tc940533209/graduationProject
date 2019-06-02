<?php
    /**
     * 退出登录
     */
    include_once('./sqlEntrance.php');
    setcookie("LOGIN_SUCCESS_COOKIE",false);
    $format->success([],'退出登录成功');
?>