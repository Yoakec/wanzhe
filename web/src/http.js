import axios from "axios";
// import { ElMessage } from 'element-plus';
import  useRouter  from "./router";


const http  = axios.create({
    baseURL:'http://localhost:8089/web/api'
})


/**
 * 加入token请求头
 */
// http.interceptors.request.use((config) =>{
//     if(localStorage.token){
//         config.headers.Authorization = 'Bear ' + localStorage.token
//     }
//     return config
// })


/**
 * 拦截器
 * 统一监听http请求错误
 */
// http.interceptors.response.use((res)=>{
//     return res
// },
// err =>{
//     if(err.response.data.message){
//         ElMessage.error(err.response.data.message)
//     } 

//     if(err.response.status = 401){
//         useRouter.push('/login')
//     }
//     return Promise.reject(err)
// })


export default http