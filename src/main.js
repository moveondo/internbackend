import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
//import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import i18n from './i18n/i18n';

import http from './utils/http'

import store from './store'

Vue.use(ElementUI);
Vue.prototype.$axios = http;

// axios.defaults.headers['Accept-Language'] = gg;
axios.defaults.withCredentials = true;


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
