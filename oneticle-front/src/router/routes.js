export default [
  { path: '/', name: 'main', component: () => import('../pages/main') },
  { path: '/login', name: 'login', component: () => import('../pages/login') },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../pages/signup'),
  },
  { path: '/home', name: 'HOME', component: () => import('../pages/home') },
  {
    path: '/articleView',
    name: 'articleView',
    component: () => import('../pages/articleView'),
  },
  {
    path: '/history',
    name: 'HISTORY',
    component: () => import('../pages/history'),
  },
  {
    path: '/myPage',
    name: 'MY',
    component: () => import('../pages/myPage'),
  },
  { path: '*', component: { template: '<div>Not Found</div>' } },
];
