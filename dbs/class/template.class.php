<?php
    class template{
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
        public static function create(){
            // 判断静态属性是否属于此类
            if(!self::$obj instanceof self){
                self::$obj = new self;
            }
            // 返回对象
            return self::$obj;
        }

    }
?>