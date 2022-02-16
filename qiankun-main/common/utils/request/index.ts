import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 90000,
  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  // validateStatus: function (status) {
  //   return status === 200;
  // },
  // headers: { "Content-Type": "application/json;charset=UTF-8" },
});
// 请求拦截
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 响应拦截
instance.interceptors.response.use(
  (response) => {
    // if (response.status === 200) {
    //   return response.data;
    // } else {
    //   return Promise.reject();
    // }
    return response;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error.response);
  }
);
export default instance
