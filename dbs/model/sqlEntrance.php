<?php
    /**
     * 类的入口函
     */
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Credentials : true"); 
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie");
    spl_autoload_register(function ($classname){
        $filename = "./../class/$classname.class.php";
        if(file_exists($filename))require_once($filename);
    });
    spl_autoload_register(function ($classname){
        $filename = "./../../class/$classname.class.php";
        if(file_exists($filename))require_once($filename);
    });
    // 数据库连接信息
    $link = array(
        'db_type' => 'mysql',
        'db_host' => 'localhost',
        'db_port' => '3306',
        'db_user'  => 'root',
        'db_pass' => 'root',
        'db_database' => 'gdpj',
        'db_charset' => 'utf8'
    );
    //创建单例对象
    $obj = Db::createObject($link);
    $format = echoformat::createFormat();
    $cookie = cookie::createCookie();
    $upload = Upload::createUpload();
    
    //删除
    // $deletes = $obj->delete('teacher','id = 1');
    // //输入格式
    // // var_dump($deletes);
    // // echo "<br>";
    // $format->zsgEcho($deletes);

    //新增
    // $data = array(
    //     "id"=>null,
    //     "release_id"=> $release_id,
    //     "type"=> $type,
    // );
    // $insert = $obj->insert("task_list", $data);

    //修改
    // $data = array(
    //     'username' => 'zzz',
    //     'passworda' => 'aa'
    // );
    // $update = $obj->update('teacher',$data,'id = 1');
    // echo $update;

    //查询
    // $query = $obj->query('select * from teacher where id = 2','All');
    // // var_dump($query);
    // $data = array(
    //     'data'=>$query
    // );
    // $format->queryEcho($data);


    //分页查询
    // $query = $obj->limit('select * from teacher', 'All', 10, 1);
    // $query = $obj->limit('select * from teacher order by id desc', 'All', 10, 1);
    // print_r($query);

    //总条数查询
    // $where = "where lower = 0 and status = 0";
    // $count = $obj->count('task_list',$where);

    //平均值
    // $query = $obj->avg('select avg(id) from teacher');
    // print_r($query);

    //delete(String table 表名, String where 条件);
    //insert(String table 表名, String field 字段名, String value 值, Int type 插入类型0);
    //insert(String table 表名, String field 字段名, Array value 值, Int type 插入类型1);
    //update(String table 表名, Array value 值, String where 条件);

    // 文件上传
    // if($file_name = $upload->uploadImg($_FILES['file'],2)){
    //     $format->success([],'上传成功');
    // } else {
    //    $format->error([],'上传失败，错误信息为：'.$upload->error());
    // }
    
    // base64上传
    // if($file_name = $upload->base64_img($_POST['file'],2)){
    //     $format->success([],'上传成功');
    // } else {
    //    $format->error([],'上传失败，错误信息为：'.$upload->error());
    // }
?> 