import Vue from 'vue';
import App from './App.vue';
import router from './router';

// global css 파일
import './style/_global.scss';
import './style/bootstrap.css';

// img src 파일
import IMG_URLS from './common/imgUrl';

Vue.config.productionTip = false;

// img src 파일 사용
Vue.mixin({
  data: IMG_URLS,
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
