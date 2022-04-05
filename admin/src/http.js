import axios from "axios";
import { ElMessage } from 'element-plus';

const http  = axios.create({
    baseURL:'http://localhost:8089/admin/api'
})


/**
 * 拦截器
 * 统一监听http请求错误
 */
http.interceptors.response.use((res)=>{
    return res
},
err =>{
    if(err.response.data.message){
        ElMessage.error(err.response.data.message)
    }
    return Promise.reject(err)
})


export default http