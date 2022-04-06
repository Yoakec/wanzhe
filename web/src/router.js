import { createRouter, createWebHashHistory } from 'vue-router'

import Main from './components/Main.vue'
import Home from './components/Home.vue'



const routes = [
    {
        path:'/',
        name:'main',
        component:Main,
        children:[
            {path:'/',name:'home',component:Home}
        ]

}]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;