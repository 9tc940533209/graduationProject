//校验身份证

function isIdCardNo(idCardNo) {
	var sBirthday;
	// 15位和18位身份证号码的基本校验
	var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
	if (!check)
		return false;
	// 判断长度为15位或18位
	if (idCardNo.length == 15) {
//		return idCardNoUtil.check15IdCardNo(idCardNo);
	} else if (idCardNo.length == 18) {
		var aCity = {
			11 : "北京",
			12 : "天津",
			13 : "河北",
			14 : "山西",
			15 : "内蒙古",
			21 : "辽宁",
			22 : "吉林",
			23 : "黑龙江",
			31 : "上海",
			32 : "江苏",
			33 : "浙江",
			34 : "安徽",
			35 : "福建",
			36 : "江西",
			37 : "山东",
			41 : "河南",
			42 : "湖北",
			43 : "湖南",
			44 : "广东",
			45 : "广西",
			46 : "海南",
			50 : "重庆",
			51 : "四川",
			52 : "贵州",
			53 : "云南",
			54 : "西藏",
			61 : "陕西",
			62 : "甘肃",
			63 : "青海",
			64 : "宁夏",
			65 : "新疆",
			71 : "台湾",
			81 : "香港",
			82 : "澳门",
			91 : "国外"
		};
		var iSum = 0;
		if (idCardNo == "")
			return true;
		if (!/^\d{17}(\d|x)$/i.test(idCardNo))
			return false;
		idCardNo = idCardNo.replace(/x$/i, "a");
		if (aCity[parseInt(idCardNo.substr(0, 2))] == null)
			return false;
		sBirthday = idCardNo.substr(6, 4) + "-"
				+ Number(idCardNo.substr(10, 2)) + "-"
				+ Number(idCardNo.substr(12, 2));
		var d = new Date(sBirthday.replace(/-/g, "/"));
		if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
				.getDate()))
			return false;
		for (var i = 17; i >= 0; i--)
			iSum += (Math.pow(2, i) % 11)
					* parseInt(idCardNo.charAt(17 - i), 11);
		if (iSum % 11 != 1)
			return false;
		return true;
	} else {
		return false;
	}
}
// 手机号码校验
const isMobile = (rule,value,callback)=> {
	// if (value == '' || $.trim(value) == '')
  // 	return false;
  if (value.length == 11) {
    var one = new RegExp('^13\\d{9}$');
    var two = new RegExp('^15\\d{9}$');
    var thr = new RegExp('^17\\d{9}$');
    var four = new RegExp('^18\\d{9}$');
    var five = new RegExp('^\\d{3,4}-\\d{7,8}');
    if (one.test(value) || two.test(value) || thr.test(value)|| four.test(value)|| five.test(value)) {
      callback()
      return true;
    }
    callback('只能以输入以13 15 17 18开头的手机号')
    return false;
  } else {
    callback('请输入正确手机号')
		return false;
  }
    

}
//中文英文、数字、下划线校验

const isSpec = (rule,value,callback)=>{
				if(!value){
					callback(new Error('该字段为必填项'))
				}else{
					var regSpe = /^[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9\u4e00-\u9fa5-_]+$/;
					if(regSpe.test(value)) {
					   callback()
					}else{
						callback(new Error('至少输入两位，以字母或汉字开头(只能输入字母、数字、汉字和"_")的字符串'))  
						
					}
				}
			}
//英文、数字、下划线校验
const isEng = (rule,value,callback)=>{
				if(!value){
					callback(new Error('该字段为必填项'))
				}else{
					var regSpe = /^[a-zA-Z][a-zA-Z0-9_]*$/;
					if(regSpe.test(value)) {
					   callback()
					}else{
						callback(new Error('只能以字母开头，输入包含字母、数字和"_"'))  
						
					}
				}
			}
//端口号校验
const isPort = (rule,value,callback)=>{
				if(value!=0&&!value){
					callback(new Error('该字段为必填项'))
				}else{
					var portTest = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
					if(portTest.test(value)) {
					   callback()
					}else{
						callback(new Error('请输入正确的端口号（0-65535）'))  
					}
				}
			}
//ip校验
const isIp = (rule,value,callback)=>{
				if(!value){
					callback(new Error('该字段为必填项'))
				}else{
					var pattIp=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
					if(pattIp.test(value)) {
					   callback()
					}else{
						callback(new Error('ip地址输入不正确'))  
						
					}
				}
      }
const emails = (rule,value,callback)=>{
  if(!value){

  }else{
    var pattIp=/^[a-zA-Z1-9][a-zA-Z0-9\._]+@[a-zA-Z0-9]+(\.[a-z]+)+$/;
    if(pattIp.test(value)) {
       callback()
    }else{
      callback(new Error('请输入正确邮箱'))  
      
    }
  }
}

// 上传数据转化
const dispose = (data) => {
  data = data.replace(/%5B/g, ".")
  data = data.replace(/%5D/g, "")
  return data
}
export{
	isMobile,
	isPort,
	isEng,
	isSpec,
  isIp,
  dispose,
  emails
}
