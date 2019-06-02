
<?php
	class Upload{
		private static $obj = NULL;
		private $path="./../upload/img";   //文件上传目录
		private $sqlPath="/upload/img";
		private $max_size; //上传文件大小限制
		private $errno;  //错误信息号
		private $mime = array('image/jpeg','image/jpg','image/png','image/gif');//允许上传的文件类型
	
		/**
		 * 构造函数
		 * @param $path string 上传图片的路径
		 */
		private function __construct(){
			$this->max_size = 1000000;
		}

		/**
	     * 私有的克隆方法：阻止类外clone对象
	     */
	    private function __clone(){
		}

		/**
	     * 定义公共创建对象入口
	     */
	    public static function createUpload(){
	        // 判断静态属性是否属于此类
	        if(!self::$obj instanceof self){
	            self::$obj = new self;
	        }
	        // 返回对象
	        return self::$obj;
	    }
	
		/**
		 * uploadImg
		 * 上传图片
		 * @access public
		 * @param $file array 包含上传文件信息的数组
		 * @param number type 图片类型 1头像 2身份证 3学生证 4营业执照
		 * @return mixed 成功返回上传的文件名，失败返回false
		 */
		public function uploadImg($file,$type){
			//判断是否从浏览器端成功上传到服务器端
			if ($file['error'] == 0) {
				# 上传到临时文件夹成功,对临时文件进行处理
				//上传类型判断
				if (!in_array($file['type'], $this->mime)) {
					# 类型不对
					$this->errno = -1; 
					return false;
				}

				//判断文件大小
				if ($file['size'] > $this->max_size) {
					# 大小超出配置文件的中的上传限制
					$this->errno = -2;
					return false;
				}

				//判断图片位置
				switch($type){
					case '1':
						$path = $this->path."/headPortrait";
						$sqlPath = $this->sqlPath."/headPortrait";
						$name = 'headPortrait_';
						break;
					case '2':
						$path = $this->path."/identity";
						$sqlPath = $this->sqlPath."/identity";
						$name = 'identity_';
						break;
					case '3':
						$path = $this->path."/studentCard";
						$sqlPath = $this->sqlPath."/studentCard";
						$name = 'studentCard_';
						break;
					case '4':
						$path = $this->path."/industry";
						$sqlPath = $this->sqlPath."/industry";
						$name = 'industry_';
						break;
					case '5':
						$path = "./../../upload/img"."/messageImg";
						$sqlPath = $this->sqlPath."/messageImg";
						$name = 'messageImg_';
						break;	
				}
				
				//文件重命名,由当前日期 + 随机数 + 后缀名
        		$file_name = $name.date('YmdHis').uniqid().strrchr($file['name'], '.');
					
        		//数据库存储路径
				$sql_file = $sqlPath.'/' . $file_name;
				
				//准备就绪了，开始上传
				if (move_uploaded_file($file['tmp_name'], $path.'/' . $file_name)) {
					# 移动成功
					return $sql_file;
				} else {
					# 移动失败
					$this->errno = -3;
					return false;
				}
			
			} else {
				# 上传到临时文件夹失败，根据其错误号设置错误号
				$this->errno = $file['error'];
				return false;
			}

		}

		 /**
    	 * [将Base64图片转换为本地图片并保存]
    	 * @param $base64_img [要保存的Base64]
    	 * @param $path [要保存的路径]
    	 * @return bool|string
    	 */
    	public function base64_img($base64_image_content,$paths){
			//匹配出图片的格式
			if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image_content, $result)){
				//获取后缀名
				$type = $result[2];

				//判断图片位置
				switch($paths){
					case 1:
						$path = $this->path."/headPortrait";
						$sqlPath = $this->sqlPath."/headPortrait";
						$name = 'headPortrait_';
						break;
					case 2:
						$path = $this->path."/identity";
						$sqlPath = $this->sqlPath."/identity";
						$name = 'identity_';
						break;
					case 3:
						$path = $this->path."/studentCard";
						$sqlPath = $this->sqlPath."/studentCard";
						$name = 'studentCard_';
						break;
					case 4:
						$path = $this->path."/industry";
						$sqlPath = $this->sqlPath."/industry";
						$name = 'industry_';
						break;;
				}

				//文件重命名,由当前日期 + 随机数 + 后缀名
				$file_name = $name.date('YmdHis').uniqid().".{$type}";

				//路径
				$new_file = $path.'/' . $file_name;
				//数据库存储路径
				$sql_file = $sqlPath.'/' . $file_name;

				if (file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_image_content)))){
					return $sql_file;
				}else{
					return false;
				}
			}
		}

		/**
		 * 多文件上传方法
	 	 * @access public
		 * @param $file array 包含上传文件信息的数组，是一个二维数组
		 * @return array 成功返回上传的文件名构成的数组, ?如果有失败的则不太好处理了
		 */
		public function multiUp($files){
			//在多文件上传时，上传文件信息 又是一个多维数组，如$_FILES['userfile']['name'][0]，$_FILES['userfile']['name'][1]
			//我们只需要遍历该数组，得到每个上传文件的信息，依次调用up方法即可
			foreach ($files['name'] as $key => $value) {
				# code...
				$file['name'] = $files['name'][$key];
				$file['type'] = $files['type'][$key];
				$file['tmp_name'] = $files['tmp_name'][$key];
				$file['error'] = $files['error'][$key];
				$file['size'] = $files['size'][$key];
				//调用up方法，完成上传
				$filename[] = $this->up($file);
			}
			return $filename;
		}
	
		/**
		 * 获取错误信息,根据错误号获取相应的错误提示
		 * @access public
		 * @return string 返回错误信息
		 */
		public function error(){
			switch ($this->errno) {
				case -1:
					return '请检查你的文件类型，目前支持的类型有'.implode(',', $this->mime);
					break;
				case -2:
					return '文件超出系统规定的大小，最大不能超过'. $this->max_size;
					break;
				case -3:
					return '文件移动失败';
					break;
				case 1:
					return '上传的文件超过了 php.ini 中 upload_max_filesize 选项限制的值,其大小为'.ini_get('upload_max_filesize');
					break;
				case 2:
					return '上传文件的大小超过了 HTML 表单中 MAX_FILE_SIZE 选项指定的值,其大小为' . $_POST['MAX_FILE_SIZE'];
					break;
				case 3:
					return '文件只有部分被上传';
					break;
				case 4:
					return '没有文件被上传';
					break;
				case 5:
					return '非法上传';
					break;
				case 6:
					return '找不到临时文件夹';
					break;
				case 7:
					return '文件写入临时文件夹失败';
					break;
				default:
					return '未知错误,灵异事件';
					break;
			}
	}
}