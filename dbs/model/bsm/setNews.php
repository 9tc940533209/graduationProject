<?php
    /**
     * 新闻资讯保存
     *@param String img  上传的图片，自动返回服务器地址
     *@param String name 新闻名称
     *@param String type 类型，0最新资讯，1平台公告
     *@param String imgs 封面图片
     *@param String content 内容
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(isset($_FILES['img'])){
            //图片上传
            if($file_name = $upload->uploadImg($_FILES['img'],5)){
                $format->success([],$file_name);
            } else {
               $format->error([],'上传失败，错误信息为：'.$upload->error());
            }
        }else{
            //新建资讯
            foreach($_POST as $k=>$v){
                $$k = $v;
            }
            if(!isset($name) || $name == ''){
                $format->error([],"请传入标题名称");
                return;
            }
            if(!isset($type) || $type == ''){
                $format->error([],"请传入新闻类型");
                return;
            }
            if(!isset($imgs) || $imgs == ''){
                $format->error([],"请传入标题图片");
                return;
            }
            if(!isset($content) || $content == ''){
                $format->error([],"请传入新闻内容");
                return;
            }
            $data = array(
                "id"=>null,
                "type"=>$type,
                "name"=>$name,
                "createTime"=>date('Y-m-d H:i:s'),
                "img"=>$imgs,
                "content"=>$content
            );
            $insert = $obj->insert("information_news",$data);
            $format->zsgEcho($insert);
        }

    }else {
        $format->error([],'请求方式错误');
    }
?>