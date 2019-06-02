<?php
    /**
     * 微信小程序登录
     * @param String code login获取值
     * @param String appid 小程序appid  wx5a892b0d5d0c5c73
     * @param String secret 小程序 appSecret b80764f7d7876161b4fc3b68e2e82d5b 保密
     * @param String grant_type 授权类型，此处只需填写 authorization_code
     * 
     * @param String name 名称
     * @param String sex 性别
     * @param String headimg 头像
     */
    //数据库入口
    include_once('./.././sqlEntrance.php');
    //获取值
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if(!isset($_POST['code']) || $_POST['code'] == ""){
            $format->error([],"请传入code值");
            return;
        }
        $code = $_POST['code'];
        $appid = "wx5a892b0d5d0c5c73";
        $secret =  "b80764f7d7876161b4fc3b68e2e82d5b";
        //向微信服务器发送请求
        $deng = file_get_contents("https://api.weixin.qq.com/sns/jscode2session?appid=$appid&secret=$secret&js_code=$code&grant_type=authorization_code");
        //获取用户相对于小程序唯一标识openid,错误则有errcode和errmsg
        $deng = json_decode($deng);
        if(isset($deng->openid)){
            $names = $deng->openid;
            $query = $obj->query("select * from personal_account where username = '".$names."'","All");
            // $format->error([],$query[0]['id']);
            // return;
            if(count($query)==0){
                //未注册，先登录再注册
                $data = array(
                    "id"=>null,
                    "username"=>$deng->openid,
                    "password"=>"11111111",
                    "createTime"=>date('Y-m-d H:i:s')
                );
                $insert = $obj->insert("personal_account", $data);
                if(is_int($insert) && $insert == 1){
                    // 注册成功
                    $querys = $obj->query("select * from personal_account where username = '".$names."'","Row");
                    $ac_id = $querys['id'];
                    $name = $_POST['name'];
                    $sex = $_POST['sex'];
                    $headimg = $_POST['headimg'];
                    $data = array(
                        "name"=>$name,
                        "sex"=>$sex,
                        "head_img"=>$headimg,
                    );
                    //修改默认资料
                    $update = $obj->update("personal_information",$data,"ac_id = $ac_id");
                    if(is_int($update) && $update == 1){
                        $quers = $obj->query("select * from personal_information where ac_id = '".$ac_id."'","Row");
                        //登录成功,设置cookie
                        if(isset($quers["id"])){
                            $cookies = md5($_SERVER['REMOTE_ADDR'].'55555555');
                            setcookie("LOGIN_SUCCESS_COOKIE", $cookies, time() + 1000 * 60 * 60);
                        }
                        $format->queryEcho($quers);
                    }else{
                        $format->error([],"注册成功但修改默认资料失败");
                    }
                }else{
                    $format->error([],"注册失败");
                }
            }else{
                //已注册，直接登录
                $ac_id= $query[0]['id'];
                $quers = $obj->query("select * from personal_information where ac_id = '".$ac_id."'","Row");
                //登录成功,设置cookie
                if(isset($quers["id"])){
                    $cookies = md5($_SERVER['REMOTE_ADDR'].'55555555');
                    setcookie("LOGIN_SUCCESS_COOKIE", $cookies, time() + 1000 * 60 * 60);
                }
                $format->queryEcho($quers);
            }

        }else{
            $format->error($deng,"信息错误，登录失败");
        }
    }
?>