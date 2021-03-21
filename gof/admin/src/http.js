import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL : 'http://localhost:3000/admin/api'
})

// 拦截器，用于接口访问限制
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 行业规范 类型+值
    if (localStorage.token){
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 拦截器.响应，用于报错提示
http.interceptors.response.use(res => {
    return res
}, err => {
// 非200状态
    // console.log(err.response)
    if (err.response.data.message){
        // 引入Vue弹窗用于报错提示 原型.信息方法
        Vue.prototype.$message({
            type:'error',
            message: err.response.data.message
        })
    }
    // console.log(err.response)
    if(err.response.status===401){
        router.push('/login')
    }
    // 允诺.拒绝（不返回console.log等响应）
    return Promise.reject(err)
})

export default http