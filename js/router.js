const routes = [
  { path: '/', redirect: '/bio' },
  { name: "Bio", path: "/bio", component: Bio },
  { name: "Photos", path: "/photos", component: Photos }
];

const base = location.pathname.split('/')[1]
  ? '/' + location.pathname.split('/')[1] + '/'
  : '/';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(base),
  routes
});
