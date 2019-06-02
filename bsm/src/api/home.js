// 首页
import $http from '../assets/js/http';


//用户信息
export const getUser = params => $http('get','/bsm/getHomeUser.php',params);
