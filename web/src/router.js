import { createRouter, createWebHashHistory } from 'vue-router'

import Main from './components/Main.vue'
import Home from './components/Home.vue'
import Article from './components/Article.vue'
import Hero from './components/Hero.vue'



const routes = [
    {
        path:'/',
        name:'main',
        component:Main,
        children:[
            {path:'/',name:'home',component:Home},
            {path:'/articles/:id',name:'article',component:Article,props:true},
            {path:'/hero/:id',name:'hero',component:Hero,props:true}
        ]

}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;