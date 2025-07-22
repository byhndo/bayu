const routes = [
  { path: '/', redirect: '/bio'},
  { name: "Bio", path: "/bio", component: Bio },
  { name: "Photos", path: "/photos", component: Photos }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'smooth' });
      }, 100);
    });
  },
});
