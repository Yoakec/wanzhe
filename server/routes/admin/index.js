module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const {execSQL} = require('../../plugins/db')
    const Category = require('../../models/Category')
    const Categoty_child = require('../../models/Categoty_child')

    /**
     * 添加主分类方法
     */
    router.post('/catrgories', async (req, res) => {
        const ca_model = new Category(req.body.category_name)
        const sql = `insert into category (category_id,category_name) value('${ca_model.id}','${ca_model.category_name}')`
        //....这里执行数据库操作
        const sql_result = await execSQL(sql)
        res.send(ca_model)
    })

    /**
     * 查询主分类方法
     */
    router.get('/catrgories', async (req, res) => {
        const sql = `select * from category`
        //....这里执行数据库操作
        const sql_result = await execSQL(sql)
        res.send(sql_result)
    })

    /**
     * 获取单个分类方法
     */
    router.get('/catrgories/:id', async (req, res) => {
        const sql = `select * from category where category_id = '${req.params.id}' `
        //....这里执行数据库操作
        const sql_result = await execSQL(sql)
        res.send(sql_result)
    })


    /**
     * 修改单个分类方法
     */
     router.put('/catrgories/:id', async (req, res) => {
         console.log(req.body);
        const sql = `update category set category_name = '${req.body.category_name}' where category_id = '${req.params.id}' `
        //....这里执行数据库操作
        const sql_result = await execSQL(sql)
        res.send()
    })

    /**
     * 删除单个分类方法
     */
    router.delete('/catrgories/:id', async (req,res) =>{
        const sql = `delete from category where category_id = '${req.params.id}' `
        //....这里执行数据库操作
        const sql_result = await execSQL(sql)
        res.send({
            success:'true'
        })
    })

    /**
     * 新增二级分类
     */
    router.post('/catrgorieschild',async(req,res) =>{
        const ca_model = new Categoty_child(req.body.category_part_id,req.body.category_name)
        const sql = `insert into categorychild (category_part_id,category_id,category_name) value('${ca_model.category_part_id}','${ca_model.category_child_id}','${ca_model.category_child_name}')`
        //....这里执行数据库操作
        const sql_result = await execSQL(sql)
        res.send(ca_model)
    })

    /**
     * 联合查询一级分类和二级分类
     */
    
    /**
     * 子路由挂载
     */
    app.use('/admin/api', router)

}