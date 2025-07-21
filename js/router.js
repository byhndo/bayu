const routes = [
  { path: '/', redirect: '/bio'},
  { name: "Bio", path: "/bio", component: Bio },
  { name: "Photos", path: "/photos", component: Photos }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

router.afterEach(() => {
    Vue.nextTick(() => {
      $('main').imagesLoaded(() => {
        console.log('Semua gambar di halaman ini telah dimuat');
      });
    });
  });

