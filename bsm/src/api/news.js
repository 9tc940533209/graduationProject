// 任务管理
import $http from '../assets/js/http';


//保存新闻资讯
export const setNews = params => $http('post','/bsm/setNews.php',params);
