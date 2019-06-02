<?php
    /**
     * 忘记密码，验证码
     * 0为查询 1为修改密码
     */
    include_once('./sqlEntrance.php');
    include_once('./../class/code.class.php');
    include_once('./email.php');
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        if($_POST['type'] == 0){
            $email = $_POST['email'];
            $data = $obj->query("select * from personal_information where email = '".$email."'","All");
            if(count($data) > 0){
                // $format->success([],'账号存在');
                //设置验证码
                $res = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM123456789';
                $code = '';
                for($i =0;$i<6;$i++){
                    $code .= $res[mt_rand(0,56)];
                }
                // 将验证码存储到session中
                session_start();
                $_SESSION['codes'] = $code;
                $ema = sendMail($email,'修改密码',"<p>你好:</p><p>你正在进行修改账户密码操作，本次验证码为：</p><h2>$code</h2><p>若非本人操作，请忽略。</p><br><p>谢谢！</p><p>大学生兼职平台</p>");
                if($ema == 1){
                    $format->success([],'邮件发送成功');
                }else{
                    $format->error([],'邮件发送失败');
                }
            }else{
                $format->error([],'未有账号绑定此邮箱');
            }
        }else{
            if(!isset($_POST['email']) || $_POST['email'] == ''){
                $format->error([],'请输入邮箱');
                return;
            }
            if(!isset($_POST['code']) || $_POST['email'] == ''){
                $format->error([],'请输入验证码');
                return;
            }
            if(!isset($_POST['password']) || $_POST['email'] == ''){
                $format->error([],'请输入密码');
                return;
            }
            $email = $_POST['email'];
            $code = $_POST['code'];
            $password = $_POST['password'];
            $data = $obj->query("select * from personal_information where email = '".$email."'","Row");
            if(!isset($data['ac_id'])){
                $format->error([],'未有账号绑定此邮箱');
                return;
            }

            session_start();
            $codes = $_SESSION['codes'];
            if(strtolower($codes) != strtolower($code)){
                $format->error([],'验证码错误');
                return;
            }

            $id = $data['ac_id'];
            $update = $obj->update("personal_account",array(
                "password"=>$password
            ),"id = $id");
            $_SESSION['codes'] = '';
            $format->zsgPEcho($update,"更改密码失败，请重试");
        }
    }else{
        captcha(100,50);
    }
    
    
?>