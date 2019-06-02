<?php
    /**
     * 修改头像
     *@param number id  登录id
     *@param base64 file  头像
     *@param number type  有则为上传base64格式，没有入为文件格式
     */
	include_once('./sqlEntrance.php');
    if(!$cookie->judge()){
        echo $format->error([],'请先登录！');
        return;
    }
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!isset($_POST['id'])){
            echo $format->error([],"请传入登陆者id");
		    return;
        }

        if(isset($_POST["type"])){
            $file_name = $upload->uploadImg($_FILES['file'],1);
        }else{
            if(!isset($_POST['file'])){
                echo $format->error([],"请传入头像");
                return;
            }
            $file_name = $upload->base64_img($_POST['file'],1);
        }
        $id = $_POST['id'];
        $query = $obj->query("select * from personal_information where id = $id","Row");
        $oldImg = $query['head_img'];

        
        if($file_name){
            if($oldImg !== "/upload/img/headPortrait/tou.jpg"){
                //替换头像,删除原来的头像
                unlink("./..".$oldImg);
            }
            $data = array(
                "head_img"=>$file_name
            );
            $update = $obj->update("personal_information",$data,"id = $id");
            if(is_int($update)){
                $queryInfor = $obj->query("select * from personal_information where id = $id",'All');
                $queryInforevaluate = $obj->query("select * from personal_explain where information_id = $id",'Row');
                $queryInfor[0]['evaluate'] = $queryInforevaluate['evaluate'];
                $format->success($queryInfor[0],"修改成功");
            }else{
                $format->zsgEcho($update);
            }
            
        } else {
            $format->error([],'上传失败，错误信息为：'.$upload->error());
        }

    }else{
        $format->error([],"请求方式错误");
    }
?>