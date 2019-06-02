<?php
    /**
     * 认证资料
     *@param number id  登陆者id
     *@param number type  认证类型，1商家 2学生
     *@param number identity_num 身份证号码
     *@param file identity_card_z 身份证照片正面
     *@param file identity_card_f 身份证照片背面
     *merchant
     *@param String name 商家名称
     *@param String address 商家地址
     *@param file Industry 工商营业执照
     *student
     *@param String school 学校
     *@param String major 专业
     *@param String regular 本科专科
     *@param String beginTime 开始时间
     *@param String endTime 结束时间
     *@param file student_card 学生证照片
     */
    //数据库入口
    include_once('./sqlEntrance.php');
    if(!$cookie->judge()){
      $format->error([],'请先登录！');
      return;
    }


    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $GLOBALS['error'] = '';
        $id = $_POST['id'];
        if(test($obj)){
            if(!$identity_card_z = $upload->uploadImg($_FILES['identity_card_z'],2)){
                $format->error([],'身份证正面上传失败，错误信息为：'.$upload->error());
                return;
            }
            if(!$identity_card_f = $upload->uploadImg($_FILES['identity_card_f'],2)){
                $format->error([],'身份证背面上传失败，错误信息为：'.$upload->error());
                unlink("./..".$identity_card_z);
                return;
            }
            if($_POST['type'] == 1){
                if(!$Industry = $upload->uploadImg($_FILES['Industry'],4)){
                    $format->error([],'营业执照上传失败，错误信息为：'.$upload->error());
                    unlink("./..".$identity_card_f);
                    unlink("./..".$identity_card_z);
                    return;
                }
                //查询是否注册
                $query = $obj->query("select * from personal_At_merchant where information_id = $id","All");
                $data = array(
                    "information_id" => $id,
                    "name" => $_POST['name'],
                    "address" => $_POST['address'],
                    "Industry" => $Industry,
                    "identity_card_z" => $identity_card_z,
                    "identity_card_f" => $identity_card_f,
                    "identity_num" => $_POST['identity_num'],
                    "pass" => -1,
                    "createTime"=> date('Y-m-d H:i:s')
                );
                if(count($query) == 0){
                    //查询身份证号码是否注册
                    $num = $_POST['identity_num'];
                    $query = $obj->query("select * from personal_At_merchant where identity_num = $num","All");
                    if(count($query) > 0){
                      $format->error([],'身份证号已注册，请确认');
                      unlink("./..".$identity_card_f);
                      unlink("./..".$identity_card_z);
                      return;
                    }
                    $data["AU_id"] = null;
                    $insert = $obj->insert("personal_At_merchant",$data);
                    if($insert == 0){
                      //删除插入数据库数据失败后照片
                      unlink("./..".$identity_card_f);
                      unlink("./..".$identity_card_z);
                      unlink("./..".$Industry);
                    }
                    $format->zsgEcho($insert,"添加认证信息失败，请重新提交");
                }else{
                    $update = $obj->update("personal_At_merchant",$data,"information_id = $id");
                    if($update == 1){
                      //删除之前上传的图片
                      unlink("./..".$query[0]['identity_card_f']);
                      unlink("./..".$query[0]['identity_card_z']);
                      unlink("./..".$query[0]['Industry']);
                    }else{
                      //删除插入失败的照片
                      unlink("./..".$identity_card_f);
                      unlink("./..".$identity_card_z);
                      unlink("./..".$Industry);
                    }
                    $format->zsgEcho($update,"添加认证信息失败，请重新提交");
                }
            }else{
                if(!$student_card = $upload->uploadImg($_FILES['student_card'],3)){
                    $format->error([],'身份证背面上传失败，错误信息为：'.$upload->error());
                    unlink("./..".$identity_card_f);
                    unlink("./..".$identity_card_z);
                    return;
                }
                //查询是否注册
                $query = $obj->query("select * from personal_At_student where information_id = $id","All");
                $data = array(
                    "information_id" => $id,
                    "school" => $_POST['school'],
                    "major" => $_POST['major'],
                    "regular" => $_POST['regular'],
                    "beginTime"=> $_POST['beginTime'],
                    "endTime"=> $_POST['endTime'],
                    "student_card"=> $student_card,
                    "identity_card_z" => $identity_card_z,
                    "identity_card_f" => $identity_card_f,
                    "identity_num" => $_POST['identity_num'],
                    "pass" => -1,
                    "createTime"=> date('Y-m-d H:i:s')
                );
                if(count($query) == 0){
                    //查询身份证号码是否注册
                    $num = $_POST['identity_num'];
                    $query = $obj->query("select * from personal_At_student where identity_num = $num","All");
                    if(count($query) > 0){
                      $format->error([],'身份证号已注册，请确认');
                      unlink("./..".$identity_card_f);
                      unlink("./..".$identity_card_z);
                      return;
                    }
                    $data["AU_id"] = null;
                    $insert = $obj->insert("personal_At_student",$data);
                    if($insert == 0){
                      //删除插入数据库数据失败后照片
                      unlink("./..".$identity_card_f);
                      unlink("./..".$identity_card_z);
                      unlink("./..".$student_card);
                    }
                    $format->zsgEcho($insert,"添加认证信息失败，请重新提交");
                }else{
                    $update = $obj->update("personal_At_student",$data,"information_id = $id");
                    if($update == 1){
                      //删除之前上传的图片
                      unlink("./..".$query[0]['identity_card_f']);
                      unlink("./..".$query[0]['identity_card_z']);
                      unlink("./..".$query[0]['student_card']);
                    }else{
                      //删除插入失败的照片
                      unlink("./..".$identity_card_f);
                      unlink("./..".$identity_card_z);
                      unlink("./..".$student_card);
                    }
                    $format->zsgEcho($update,"添加认证信息失败，请重新提交");
                }
            }
        }else{
            $format->error([],$GLOBALS['error']);
        }
    }else{
      $format->error([],'请求方式错误');
    }

    
    //y验证公共信息
    function test($obj){
        if(!isset($_POST['id']) || $_POST['id'] == ''){
            $GLOBALS['error'] = 'id不能为空';
            return false;
        }
        if(!isset($_POST['type']) || $_POST['type'] == ''){
            $GLOBALS['error'] = '认证类型不能为空';
            return false;
        }
        if(!isset($_POST['identity_num']) || $_POST['identity_num'] == ''){
          $GLOBALS['error'] = '身份证号码不能为空';
          return false;
        }
        if(!isset($_FILES['identity_card_z'])){
          $GLOBALS['error'] = '请传入身份证正面照片';
          return false;
        }
        if(!isset($_FILES['identity_card_f'])){
          $GLOBALS['error'] = '请传入身份证背面照片';
          return false;
        }
        $type = $_POST['type'];
        if($type == 1){
            if(!isset($_POST['name']) || $_POST['name'] == ''){
                $GLOBALS['error'] = '商家名称不能为空';
                return false;
            }
            if(!isset($_POST['address']) || $_POST['address'] == ''){
                $GLOBALS['error'] = '认证类型不能为空';
                return false;
            }
            if(!isset($_FILES['identity_card_z'])){
                $GLOBALS['error'] = '请传入身份证正面照片';
                return false;
            }
        }else{
            if(!isset($_POST['school']) || $_POST['school'] == ''){
                $GLOBALS['error'] = '学校不能为空';
                return false;
            }
            if(!isset($_POST['major']) || $_POST['major'] == ''){
                $GLOBALS['error'] = '专业不能为空';
                return false;
            }
            if(!isset($_POST['regular']) || $_POST['regular'] == ''){
                $GLOBALS['error'] = '是否本科不能为空';
                return false;
            }
            if(!isset($_POST['beginTime']) || $_POST['beginTime'] == ''){
                $GLOBALS['error'] = '开始时间不能为空';
                return false;
            }
            if(!isset($_POST['endTime']) || $_POST['endTime'] == ''){
                $GLOBALS['error'] = '结束时间不能为空';
                return false;
            }
            if(!isset($_FILES['student_card'])){
                $GLOBALS['error'] = '请传入学生证照片';
                return false;
            }
        }
        return true;
    }
?>
