<?php
    function captcha($w,$h){
        // 制作验证码
        $img = imagecreatetruecolor($w,$h);
        // 设置颜色
        $bg = imagecolorallocate($img,mt_rand(210,255),mt_rand(210,255),mt_rand(210,255));
        $color = imagecolorallocate($img,mt_rand(110,200),mt_rand(110,200),mt_rand(110,200));
        // 填充颜色
        imagefill($img,0,0,$bg);
        // 获取验证码
        $code = getcode();
        // 将验证码存储到session中
        session_start();
        $_SESSION['codes'] = $code;
        // 加入到画布中----字体更改
        for($i = 0;$i<strlen($code);$i++){
            imagettftext($img,mt_rand(22,26),mt_rand(-20,20),20*($i+1),30,$color,'./../static/font/tt0102m_.ttf',$code[$i]);
        }
        // 增加干扰线
        for($i = 0;$i<3;$i++){
            $xian = imagecolorallocate($img,mt_rand(110,200),mt_rand(110,200),mt_rand(110,200));
            imageline($img,mt_rand(0,100),mt_rand(0,30),mt_rand(0,100),mt_rand(0,30),$xian);
        }   
        header('content-type:image/jpeg');
        imagejpeg($img);
    }
    // 设置随机验证码
    function getcode(){
        $res = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM123456789';
        $code = '';
        for($i =0;$i<4;$i++){
            $code .= $res[mt_rand(0,56)];
        }
        return $code;
    }
?>