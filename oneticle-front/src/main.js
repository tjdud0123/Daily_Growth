import Vue from 'vue';
import App from './App.vue';

// global css 파일
import './style/_global.scss';
import './style/bootstrap.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
