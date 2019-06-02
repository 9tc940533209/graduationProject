<?php
    final class Db{
        // 私有静态的保存对象的属性，设计成私有的就不能调
        private static $obj = NULL;
        private static $db_type;
        private static $db_host;
        private static $db_port;
        private static $db_user;
        private static $db_pass;
        private static $db_database;
        private static $db_charset;
        private $dbh;

        /**
         * 私有的构造方法：阻止类外new对象
         */
        private function __construct($link){
            // 将获取到属性赋值到类的静态常量中
            self::$db_type = $link['db_type'];
            self::$db_host = $link['db_host'];
            self::$db_port = $link['db_port'];
            self::$db_user = $link['db_user'];
            self::$db_pass = $link['db_pass'];
            self::$db_database = $link['db_database'];
            self::$db_charset = $link['db_charset'];
            
            $this->linkDatabase();
        }

        /**
         * 私有的克隆方法：阻止类外clone对象
         */
        private function __clone(){

        }

        /**
         * 定义公共创建对象入口
         */
        public static function createObject($link){
            // 判断静态属性是否属于此类
            if(!self::$obj instanceof self){
                self::$obj = new self($link);
            }
            // 返回对象
            return self::$obj;
        }
        
        /**
         * 连接数据库
         */
        private function linkDatabase(){
            try{
                $dsn= self::$db_type.":host=".self::$db_host.";post=".self::$db_port.";dbname=".self::$db_database.";charset=".self::$db_charset.";";
                //初始化一个PDO对象
                $this->dbh = new PDO($dsn, 'root', 'root');
                $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }catch(PDOException $e){
                die("数据库连接失败".$e->getMessage());
            }
        }
        /**
         * getPDOError 捕获PDO错误信息
         */
        private function getPDOError()
        {
            if ($this->dbh->errorCode() != '00000') {
                $arrayError = $this->dbh->errorInfo();
            }
        }

        /**
         * delete 删除
         * @param String $table 表名
         * @param String $where 条件
         */
        public function delete( $table, $where){
            $sql = "DELETE FROM ".$table." WHERE ".$where;
            try{
                $result = $this->dbh->exec($sql);
                return $result; 
            } catch(PDOException $e){
                return $e->getMessage();
            }
        }

        /**
         * insert 增加
         * @param String $table 表名
         * @param Array $arrayDataValue 字段 插入值
         */
        public function insert($table, $arrayDataValue){
            $sql= "INSERT INTO `$table` (`".implode('`,`', array_keys($arrayDataValue))."`) VALUES ('".implode("','", $arrayDataValue)."')";
            try{
                $result = $this->dbh->exec($sql);
                return $result; 
            } catch(PDOException $e){
                return $e->getMessage();
            }
        }

        /**
         * Update 更新
         *
         * @param String $table 表名
         * @param Array $value 修改值
         * @param String $where 条件
         * update users set name = '麻子', gender = 0 where id = 3
         */
        public function update($table,$value, $where){
            $sql = '';
            foreach ($value as $key => $value) {
                $sql .= ", `$key`='$value'";
            }
            $sql = substr($sql, 1);
            $sql = "UPDATE `$table` SET $sql WHERE $where";
            try{
                $result = $this->dbh->exec($sql);
                return $result; 
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }

        /**
         * Query 查询
         *
         * @param String $strSql SQL语句
         * @param String $queryMode 查询方式(All or Row)所有或者一行
         * @return Array
         */
        public function query($strSql, $queryMode)
        {   
            try{
                $recordset = $this->dbh->query($strSql);
            }catch(PDOException $e){
                return $e->getMessage();
            }
            if ($recordset) {
                $recordset->setFetchMode(PDO::FETCH_ASSOC);
                if ($queryMode == 'All') {
                    $result = $recordset->fetchAll();
                } elseif ($queryMode == 'Row') {
                    $result = $recordset->fetch();
                }
            } else {
                $result = null;
            }
            return $result;
        }

        /**
         * limit 排序
         *
         * @param String $strSql SQL语句
         * @param String $queryMode 查询方式(All or Row)所有或者一行
         * @param String $size 一页数据>0
         * @param String $page 第几页 >0
         * @return Array
         */
        public function limit($strSql, $queryMode, $size, $page){
            $page = ($page-1)*$size;
            $sql  = $strSql." LIMIT ".$size." offset ".$page;
            return $this->query($sql, $queryMode);
        }

        /**
         * count 总条数
         * @param String table 表名
         * @param String where 条件 null为没有
         */
        public function count($table,$where){
            $sql = "select count(*) from ".$table;
            if($where !== null){
                $sql .= " where ".$where;
            }
            try{
                $all = $this->dbh->query($sql);
                $result = $all->fetchColumn();
            }catch(PDOException $e){
                return $e->getMessage();
            }
            return $result;
        }

        /**
         * avg 平均值
         * @param String field 字段
         * select avg(field1) from table
         */
        public function avg($sql){
            try{
                $all = $this->dbh->query($sql);
                $result = $all->fetchColumn();
            }catch(PDOException $e){
                return $e->getMessage();
            }
            return $result;
        }

        //预处理执行
        public function prepareSql($sql=''){
            return $this->dbh->prepare($sql);
        }
        
        //执行预处理
        public function execute($presql){
            return $this->dbh->execute($presql);
        }

        /**
         * destruct 关闭数据库连接
         */
        public function destruct()
        {
            $this->dbh = null;
        }

        /**
         * 快捷赋值
         */
        private function kuaijie(){
            try{
                $all = $this->dbh->query($sql);
            }catch(PDOException $e){
                return $e->getMessage();
            }
        }
    }
?>