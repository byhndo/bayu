const routes = [
  { path: '/', redirect: '/bio' },
  { name: "Bio", path: "/bio", component: Bio },
  { name: "Photos", path: "/photos", component: Photos },
  { path: '/:pathMatch(.*)*', redirect: '/bio' }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(/bayu/),
  routes
});
