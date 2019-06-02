<?php
    /**
     * 查询职位类型
     */
    include_once('./.././sqlEntrance.php');
    $query = $obj->query('select * from task_type','All');
    $format->queryEcho($query);
?>