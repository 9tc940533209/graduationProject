// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import router from "./router/router";
import ElementUI from 'element-ui'
import store from "./store/store.js"
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import "./assets/common/common.css";
import "./assets/reset.css";
import "./assets/font/iconfont.css";

import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(md5)
//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
//引入axios
window.axios = axios;
//引入filter
import filters from './assets/js/filter.js';
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
