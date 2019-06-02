// 认证管理
import $http from '../assets/js/http';
// 分页查询
export const getRenList = params => $http('post','/bsm/getRenzheng.php',params);
// 删除认证
export const delAuthen = params => $http('post','/bsm/delMerchant.php',params);
// 认证是否通过
export const setAuthenStatus = params => $http('post','/bsm/setRenPass.php',params);
// 图片url
// export const urlData = "./she/dbs/"
export const urlData = "/she/dbs/"