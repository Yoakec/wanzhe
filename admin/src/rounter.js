import { createRouter, createWebHashHistory } from 'vue-router'
// 1. 定义路由组件.
// 也可以从其他文件导入
import Main from './components/main.vue'
import CategoryEdit from './components/CategoryEdit.vue'
import CategoryList from './components/CategoryList.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path: '/',
        component: Main,
        children:[
            {path:'/categories/create',component:CategoryEdit},
            {path:'/categories/edit/:id',component:CategoryEdit,props:true},
            {path:'/categories/list',component:CategoryList}
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