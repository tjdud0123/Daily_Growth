export default [
  { path: '/', component: () => import('../pages/main') },
  { path: '/login', component: () => import('../pages/login') },
  { path: '/signup', component: () => import('../pages/signup') },
  { path: '/home', component: () => import('../pages/home') },
  { path: '/articleView', component: () => import('../pages/articleView') },
  { path: '/history', component: () => import('../pages/history') },
  { path: '/myPage', component: () => import('../pages/myPage') },
  { path: '*', component: { template: '<div>Not Found</div>' } },
];
