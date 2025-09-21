import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios"
import { ElNotification } from 'element-plus'

const service: AxiosInstance = axios.create({
    baseURL: "https://www.demo.com/",  // 后期会换成环境变量
    timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config
}, (error: AxiosError) => {
    ElNotification({
        title: "Error",
        message: error.message,
        type: "error"
    })
    return Promise.reject(error)
})

// 相应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
    console.log(response.data)
    if (response.data.code != 200) {
        ElNotification({
            title: "Error",
            message: response.data.message,
            type: "error"
        })
    }
    return response.data
}, (error: AxiosError) => {  // 这里的error是与服务器物理层面的断联, 服务器没有返回任何数据
    ElNotification({
        title: "Error",
        message: error.message,
        type: "error"
    })
    return Promise.reject(error)
})

export default service