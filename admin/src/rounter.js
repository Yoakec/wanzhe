import { createRouter, createWebHashHistory } from 'vue-router'
// 1. 定义路由组件.
// 也可以从其他文件导入
import Main from './components/main.vue'
import CategoryEdit from './components/CategoryEdit.vue'
import CategoryList from './components/CategoryList.vue'

import ItemEdit from './components/ItemEdit.vue'
import ItemList from './components/ItemList.vue'


import HeroEdit from './components/HeroEdit.vue'
import HeroList from './components/HeroList.vue'

import ArticleEdit from './components/ArticleEdit.vue'
import ArticleList from './components/ArticleList.vue'


import AdEdit from './components/AdEdit.vue'
import AdList from './components/AdList.vue'

import AdminUserEdit from './components/AdminUserEdit.vue'
import AdminUserList from './components/AdminUserList.vue'
import Login from './components/Login.vue'
// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path:'/login',
        component:Login
    },
    {
        path: '/',
        component: Main,
        children:[
            {path:'/categories/create',component:CategoryEdit},
            {path:'/categories/edit/:id',component:CategoryEdit,props:true},
            {path:'/categories/list',component:CategoryList},

            {path:'/items/create',component:ItemEdit},
            {path:'/items/edit/:id',component:ItemEdit,props:true},
            {path:'/items/list',component:ItemList},

            {path:'/heros/create',component:HeroEdit},
            {path:'/heros/edit/:id',component:HeroEdit,props:true},
            {path:'/heros/list',component:HeroList},

            {path:'/articles/create',component:ArticleEdit},
            {path:'/articles/edit/:id',component:ArticleEdit,props:true},
            {path:'/articles/list',component:ArticleList},
            
            {path:'/ads/create',component:AdEdit},
            {path:'/ads/edit/:id',component:AdEdit,props:true},
            {path:'/ads/list',component:AdList},

            {path:'/admin_user/create',component:AdminUserEdit},
            {path:'/admin_user/edit/:id',component:AdminUserEdit,props:true},
            {path:'/admin_user/list',component:AdminUserList}
        ]
    }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router;