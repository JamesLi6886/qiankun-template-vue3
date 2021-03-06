const loader = (loading) => {
  // 此处可以获取微应用是否加载成功,可以用来触发全局的 loading
  // console.log("loading", loading);
};

export const Microconfig = [
  //name: 微应用的名称,
  //entry: 微应用的入口,
  //container: 微应用的容器节点的选择器或者 Element 实例,
  //activeRule: 激活微应用的规则(可以匹配到微应用的路由),
  //loader: 加载微应用的状态 true | false
  {
    name: "vue3",
    entry: "http://localhost:8002",
    container: "#subContainer",
    activeRule: "/vue3",
    loader,
  },
];