import {createRouter, createWebHistory} from 'vue-router';

const routes = [
  // 登录模块
  {
    path: "/login",
    name: "login", // 登录界面 后续登录界面会拆分成一个项目进行搭建
    component: () => import(/* webpackChunkName: "about" */ "@/views/Login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, from , next) => {
  if (to.name !== 'login') {
    // 判断是否token过期
    let userInfo = localStorage.getItem('userInfo')
    let tokenVisibleTime = 12; // 单位是小时 token 过期时间
    if (userInfo && Number(new Date().getTime()) - Number(JSON.parse(userInfo).loginTime) < tokenVisibleTime*60*60*1000) {
      next()
    } else {
      localStorage.removeItem('userInfo')
      next({
        name: 'login',
        redirect: to.fullPath
      })
      router.push({name: 'login'})
    }
  } else {
    next()
  }
})

export default router;
