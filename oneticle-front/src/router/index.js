import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.name === 'main' && token) {
    next('/home');
    return;
  } else next();
});
export default router;
