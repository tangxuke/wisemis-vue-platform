//全局axios，含全局拦截
import axios from 'axios'
import router from '@/router'

axios.defaults.timeout=5000
axios.defaults.baseURL='http://localhost:3000/'

axios.defaults.withCredentials=true

//axios拦截响应
axios.interceptors.response.use(response=>{
    if(response.data.want_login){
        router.replace({
            path:'login'
        })
    }
    return response
},err=>{
    return Promise.reject(err)
})


export default axios