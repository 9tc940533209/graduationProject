<?php
    class echoformat{
        // 私有静态的保存对象的属性，设计成私有的就不能调
        private static $obj = NULL;

        /**
         * 私有的构造方法：阻止类外new对象
         */
        private function __construct(){

        }

        /**
         * 私有的克隆方法：阻止类外clone对象
         */
        private function __clone(){

        }

        /**
         * 定义公共创建对象入口
         */
        public static function createFormat(){
            // 判断静态属性是否属于此类
            if(!self::$obj instanceof self){
                self::$obj = new self;
            }
            // 返回对象
            return self::$obj;
        }

        /**
         * 面向开发人员
         */
        public function zsgEcho($data){
            //增删改成功返回为受影响行数，如果大于等于1，则成功。0则没有此条件的值
            if(is_int($data)){
                if($data == 0){
                    echo json_encode(array(
                        'code' => '1',
                        'data' => [],
                        'message' => '受影响行数为0'
                    ));
                }else{
                    echo json_encode(array(
                        'code' => '0',
                        'data' => [],
                        'message' => '执行成功'
                    ));
                }
            }else{
                echo json_encode(array(
                    'code' => '1',
                    'data' => [],
                    'message' => $data
                ));
            }
        }

        /**
         * 面向客户
         */
        public function zsgPEcho($data,$error){
            //增删改成功返回为受影响行数，如果大于等于1，则成功。0则没有此条件的值
            if(is_int($data)){
                if($data == 0){
                    echo json_encode(array(
                        'code' => '1',
                        'data' => [],
                        'message' => $error
                    ));
                }else{
                    echo json_encode(array(
                        'code' => '0',
                        'data' => [],
                        'message' => '成功'
                    ));
                }
            }else{
                echo json_encode(array(
                    'code' => '1',
                    'data' => [],
                    'message' => '错误！请联系客服'
                ));
            }
        }

        public function queryEcho($data){
            if(is_array($data)){
                echo json_encode(array(
                    'code' => '0',
                    'data' => $data,
                    'message' => '查询成功'
                ));
            }else{
                echo json_encode(array(
                    'code' => '1',
                    'data' => [],
                    'message' => $data
                ));
            }
        }

        /**
        * error
        *@param Array data
        *@param String mag 信息
        */
        public function error($data,$mag){
            echo json_encode(array(
                'code'=>'1',
                'data'=>$data,
                'message'=> $mag
            ));
        }

        /**
        * success
        *@param Array data
        *@param String mag 信息
        */
        public function success($data,$mag){
            echo json_encode(array(
                'code'=>'0',
                'data'=>$data,
                'message'=> $mag
            ));
        }

        /**
        * echo
        *@param Array data
        *@param String mag 信息
        */
        public function echoP($code,$data,$mag){
            echo json_encode(array(
                'code'=>$code,
                'data'=>$data,
                'message'=> $mag
            ));
        }
    }
?>