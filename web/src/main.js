import { createApp } from 'vue'
import App from './App.vue'
import './scss/style.scss' 
import router from './router'
import './assets/font_ogna51r1m2/iconfont.css'
import http from './http'



const app = createApp(App)

//swiper
import SwiperClass, { Pagination } from 'Swiper'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css'
// import swiper module styles
import 'swiper/css/pagination'
// use swiper modules
SwiperClass.use([Pagination])


//导入全局封装组件
import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'
app.component('m-card',Card)
app.component('m-listcard',ListCard)


//全局定义
app.config.globalProperties.$http = http


app.use(router)
app.use(VueAwesomeSwiper)
app.mount('#app')
