import un from "@uni-helper/uni-network";

export type ApiRes<Tdata = any> = {
  code: string;
  message: string;
  data: Tdata;
};

const token = useUniStorage("token", "");
const baseurl = import.meta.env.VITE_BASEURL;

const instance = un.create({
  baseUrl: baseurl,
  timeout: 5000,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
  },
});

/**
 * 响应拦截
 */
instance.interceptors.response.use(
  (response) => {
    console.log("🚀 ~ file: request.ts:24 ~ response:", response);
    // 2xx 范围内的状态码都会触发该函数
    // 对响应数据做点什么

    const data = response.data as ApiRes;
    const code = Number(data.code);

    if (code === 401) {
      uni.showModal({
        content: data.message,
      });
    }

    if (code === 403) {
      // token过期
      token.del();

      return response;
    }

    return response;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
