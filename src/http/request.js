//引入axios
import axios from "axios";
import { Message } from "element-ui";

//axios基础配置
const instance = axios.create({
  baseURL: "http://localhost:3000", //基准URL
  timeout: 60000, //超时时间，单位毫秒
});

instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

//请求拦截.
instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token")
    if (token) {
      // config.headers.token = `${token}`;
    }
    return config;
  },
  (err) => {
    //请求失败时返回error
    return Promise.reject(err);
  }
);

//响应拦截
instance.interceptors.response.use(
  (res) => {
    // 如果响应对象的status是fail，代表请求失败，提示失败信息，否则返回响应对象
    const status = res.data.status;
    if (status == "fail") {
      Message.error(res.data.msg);
    } else {
      return res;
    }
  },
  (err) => {
    //请求失败时返回error
    return Promise.reject(err);
  }
);

//向外暴露出instance
export default instance;
