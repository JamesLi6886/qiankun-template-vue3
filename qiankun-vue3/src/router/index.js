const routes = [{
    path: "/",
    name: "index", // 首页代码
    component: () => import("../views/HomePage/index.vue"),
    meta: { breadcrumbName: '首页' },
  }];

export default routes;
