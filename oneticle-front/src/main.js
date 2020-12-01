import Vue from 'vue';
import App from './App.vue';
import router from './router';

// global css 파일
import './style/_global.scss';
import './style/bootstrap.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
