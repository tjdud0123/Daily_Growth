const Home = { template: '<div>Home</div>' };
const NotFound = { template: '<div>Not Found</div>' };
export default [
  { path: '/', component: Home },
  {
    path: '/posts',
    component: {
      template: '<div>Posts <br/><router-view></router-view></div>',
    },
    // 중첩된 라우트는 children 속성으로 하위 라우트를 정의할 수 있다.
    children: [
      {
        path: 'new',
        component: () => import('../components/HelloWorld.vue'),
      },
      { path: ':id', component: { template: '<div>Post Detail</div>' } },
    ],
  },
  { path: '*', component: NotFound },
];
