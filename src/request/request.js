import axios from 'axios'

//创建实例
const instance = axios.create({
    timeout: 5000
});

//请求拦截
instance.interceptors.request.use(config => {
    if (localStorage.getItem("token"))
        config.headers["X-Nideshop-Token"] = localStorage.getItem("token")
    return config;
}, err => {
    return Promise.reject(err);
})

//响应拦截
instance.interceptors.response.use(result => {
    return result.data;
}, err => {
    return Promise.reject(err);
})

export default instance