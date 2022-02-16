// @ts-ignore
import { createApp } from "vue";
import App from "./App.vue";
// @ts-ignore
import router from "./router/index.js";
import store from "./store";
import Instance from "@/../common/utils/request/index";
// @ts-ignore
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// @ts-ignore
import ElementPlus from "element-plus"
import { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css'
import Pagination from "@/../common/components/pagination.vue"
import TableDeleteLink from "@/../common/components/tableDeleteLink.vue"
import '@/../common/css/global.scss'
// @ts-ignore
import { registerMicroApps, start, addGlobalUncaughtErrorHandler } from 'qiankun';
const app = createApp(App)

// @ts-ignore
let loadingService = null;
// 主应用配置 ---
// @ts-ignore
const loader = (loading) => {
    // 此处可以获取微应用是否加载成功,可以用来触发全局的 loading
    // @ts-ignore
    if(loading && !loadingService) {
        loadingService = ElLoading.service({
            lock: true,
            text: '加载中...',
            spinner: 'dots-loader',
        })
    } else { // @ts-ignore
        if (!loading && loadingService) {
            // @ts-ignore
            loadingService.close()
        }
    }
};
/**
 * localUrl 本地开发端口号，
 * proUrl 生产环境端口号
 * 会根据发布的地址自动的注册地址前缀
 * */
const generateEnv = (localUrl:any , proUrl: any) => {
    return process.env.NODE_ENV === "development" ? `http://localhost:${localUrl}` : `${window.location.protocol}//${window.location.hostname}:${proUrl}`
}
const topRoute = 'TOP_ROUTE' // 当前菜单存储
// @ts-ignore
registerMicroApps([
    //name: 微应用的名称,
    //entry: 微应用的入口,
    //container: 微应用的容器节点的选择器或者 Element 实例,
    //activeRule: 激活微应用的规则(可以匹配到微应用的路由),
    //loader: 加载微应用的状态 true | false
    {
        name: 'home-page', // 首页
        entry: generateEnv('8001', '3331'),
        container: "#subContainer",
        activeRule: "/home-page",
        loader
    },
], {
    // 生命周期钩子 - 微应用加载前
    beforeLoad: (app: { name: any; }) => {
        return Promise.resolve();
    },
    // 生命周期钩子 - 微应用挂载后
    afterMount: (app: { name: any; }) => {
        localStorage.setItem(topRoute, app.name)
        return Promise.resolve();
    },
});

// 添加全局异常捕获
addGlobalUncaughtErrorHandler((handler: any) => {
    // @ts-ignore
    loadingService && loadingService.close()
    // console.log("异常捕获", handler);
})

start({
        prefetch: "all", // 开启预加载
        sandbox: {
            experimentalStyleIsolation: true, //   开启沙箱严格模式,实验性方案
            // strictStyleIsolation: true, // 开启样式隔离模式
        },
    }
);
app.config.globalProperties.$axios = Instance
app.component('pagination', Pagination) // 公共分页组件
app.component('table-delete-link', TableDeleteLink) // 公共表格内操作删除按钮组件
app.use(store).use(ElementPlus, { size: 'small', zIndex: 3000, locale: zhCn, }).use(router).mount("#app-main");
