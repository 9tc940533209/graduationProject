import $http from '../assets/js/http';
// 分页查询
export const getUserList = params => $http('post','/bsm/getUserlist.php',params);
// 用户状态操作
export const setUserStatus = params => $http('post','/bsm/setStatus.php',params);
// 查看发布者
export const queryPersonal = params => $http('get','/query/personalData.php',params);