import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL : 'http://localhost:3000/admin/api'
})

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
    // 允诺.拒绝（不返回console.log等响应）
    return Promise.reject(err)
})

export default http