module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const {execSQL} = require('../../plugins/db')
    const Category = require('../../models/Category')

    /**
     * 添加主列表方法
     */
    router.post('/catrgories', async (req, res) => {
        const ca_model = new Category(req.body.name)
        const sql = `insert into category (category_id,category_name) value('${ca_model.id}','${ca_model.name}')`
        //....这里执行数据库操作
        const sql_result = await execSQL(sql)
        res.send(ca_model)
    })

    /**
     * 查询主列表方法
     */
    router.get('/catrgories', async (req, res) => {
        const sql = `select * from category limit 10`
        //....这里执行数据库操作
        const sql_result = await execSQL(sql)
        res.send(sql_result)
    })


    /**
     * 子路由挂载
     */
    app.use('/admin/api', router)

}