// 任务管理
import $http from '../assets/js/http';
// 分页查询
export const getTaskList = params => $http('post','/ptjob.php',params);
// 删除任务
export const delTask = params => $http('get','/bsm/delTask.php',params);
// 用户状态操作
export const setTaskStatus = params => $http('post','/bsm/setTaskStatus.php',params);