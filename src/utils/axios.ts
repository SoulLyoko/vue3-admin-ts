import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { cookie } from "@/utils/cache";
import { ElMessage } from "element-plus";
import store from "@/store";

const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  timeout: 15000, // 请求超时时间
  withCredentials: true
});

// 请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在请求发送之前做一些处理
    const token = cookie.get("token") || "";
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    const { data, code } = response.data;
    switch (code) {
      case 0:
        return data;
      default:
        return response.data;
    }
  },
  (error) => {
    const { code, message: msg } = error.response.data;
    switch (code) {
      case 401:
        ElMessage.error("token已过期，请重新登录");
        setTimeout(() => store.dispatch("logout"), 1000);
        break;
      default:
        console.error(error);
        ElMessage.error(msg || error.response.data);
        return Promise.reject(error);
    }
  }
);

export default request;
