<?php
    class cookie{
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
        public static function createCookie(){
            // 判断静态属性是否属于此类
            if(!self::$obj instanceof self){
                self::$obj = new self;
            }
            // 返回对象
            return self::$obj;
        }

        public function judge(){
            if(isset($_COOKIE['LOGIN_SUCCESS_COOKIE'])){
                $cookies = md5($_SERVER['REMOTE_ADDR'].'55555555');
                if($_COOKIE['LOGIN_SUCCESS_COOKIE'] == $cookies){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }

    }
?>