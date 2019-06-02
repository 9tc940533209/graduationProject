import $http from '../assets/js/http';

// 登录
export const login = params => $http('post','/bsmLogin.php',params);
// 用户查询
export const users = params => $http('get','/query/personalData.php',params);
// 删除用户
export const delusers = params => $http('get','/bsm/delUser.php',params);
// 退出登录
export const quits = params => $http('post','/user/logout',params);
// 验证码
export const verify = params => $http('get','/user/verify',params);
//获取任务类型
export const taskTypeList = params => $http('get','/bsm/taskType.php',params);
//操作任务类型
export const taskTypeAddDel = params => $http('post','/bsm/taskType.php',params);