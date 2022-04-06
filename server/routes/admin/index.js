module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')

    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        //合并url参数，就是相当于最下面app.use()中的:resource可以在后面的router中使用
        mergeParams: true

    })
    // const { execSQL } = require('../../plugins/db')
    // const Category = require('../../models/Category')
    // const Categoty_child = require('../../models/Categoty_child')

    // const Category = require('../../models/Category')

    /**
     * 添加一级分类方法
     */
    router.post('/',async (req, res) => {
        // // const ca_model = new Category(req.body.category_name)
        // // const sql = `insert into category (category_id,category_name) value('${ca_model.id}','${ca_model.category_name}')`
        // // //....这里执行数据库操作
        // const sql_result = await execSQL(sql)
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    /**
     * 查询分类
     * 加入路由守卫
     */
    router.get('/',async (req, res) => {
        let model;
        switch (req.Model.modelName) {
            case 'Category':
                model = await req.Model.find().populate('parent').limit(30)
                break
            default:
                model = await req.Model.find().limit(10)
                break
        }
        res.send(model)
    })

    /**
     * 查询单个分类
     */
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    /**
     * 修改单个分类
     */
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    /**
     * 删除方法
     */

    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true,
        })
    })

    /**
     * 登录校验中间件
     */
    const author = require('../../middleware/auth')()

    /**
     * 模型导入中间件
     */
    const resource = require('../../middleware/resource')()
    /**
     * 子路由挂载
     */
    app.use('/admin/api/rest/:resource',author,resource, router)


    /**
     * 上传图片
     */
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '../../../uploads' })
    app.post('/admin/api/upload',author,upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:8089/uploads/${req.file.filename}`
        res.send(file)
    })

    /**登录 */
    app.post('/admin/api/login',async (req,res) =>{
        const {username,password} = req.body
        //找用户
        const user = await AdminUser.findOne({name:username}).select('+password')
        assert(user, 422, '用户不存在！')
        // if(!user){
        //     return res.status(422).send({
        //         message:'用户不存在！'
        //     }) 
        // }
        //校验密码
        const valid = require('bcrypt').compareSync(password,user.password)
        assert(valid, 422, '密码错误！')
        //返回token
        const token = jwt.sign({
            id:user._id
        },app.get('secret'))

        res.send({token})
    })
    
    /**
     * 错误处理
     */
    app.use(async (err,req,res,next) =>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })








    /**
     * 多文件上传
     */
    //  const Uploads = multer({ dest: __dirname + '../../../uploads' }).array("file",5);
    //  app.post('/admin/api/uploades',Uploads,(req,res) =>{
    //      let file;
    //      if(req.files.length === 0){
    //          res.render('error',{message:'上传文件不能为空！'});
    //      }else{
    //          for(var i in req.files){
    //              file = req.files[i];
    //              file.url = `http://localhost:8089/uploads/${file.filename}`
    //          }
    //          res.send(file)
    //      }
    //  })
    /**---------mysql写法，我放弃了--------------------- */
    // /**
    //  * 查询主分类方法
    //  */
    // router.get('/catrgories', async (req, res) => {
    //     const sql = `select * from category`
    //     //....这里执行数据库操作
    //     // const sql_result = await execSQL(sql)
    //     res.send(sql_result)
    // })

    // /**
    //  * 获取单个分类方法
    //  */
    // router.get('/catrgories/:id', async (req, res) => {
    //     const sql = `select * from category where category_id = '${req.params.id}' `
    //     //....这里执行数据库操作
    //     // const sql_result = await execSQL(sql)
    //     res.send(sql_result)
    // })


    // /**
    //  * 修改单个分类方法
    //  */
    // router.put('/catrgories/:id', async (req, res) => {
    //     const sql = `update category set category_name = '${req.body.category_name}' where category_id = '${req.params.id}' `
    //     //....这里执行数据库操作
    //     // const sql_result = await execSQL(sql)
    //     res.send()
    // })

    // /**
    //  * 删除单个分类方法
    //  */
    // router.delete('/catrgories/:id', async (req, res) => {
    //     const sql = `delete from category where category_id = '${req.params.id}' `
    //     //....这里执行数据库操作
    //     // const sql_result = await execSQL(sql)
    //     res.send({
    //         success: 'true'
    //     })
    // })

    // /**----------------二级分类--------------------------- */

    // /**
    //  * 新增二级分类
    //  */
    // router.post('/catrgorieschild', async (req, res) => {
    //     const ca_model = new Categoty_child(req.body.category_part_id, req.body.category_name)
    //     const sql = `insert into categorychild (category_part_id,category_child_id,category_child_name) value('${ca_model.category_part_id}','${ca_model.category_child_id}','${ca_model.category_child_name}')`
    //     //....这里执行数据库操作
    //     // const sql_result = await execSQL(sql)
    //     res.send(ca_model)
    // })

    // /**
    //  * 查询二级分类
    //  */
    // router.get('/catrgorieschild/:id', async (req, res) => {
    //     const sql = `select * from categorychild where category_child_id = '${req.params.id}'`
    //     //....这里执行数据库操作
    //     // const sql_result = await execSQL(sql)
    //     res.send(sql_result)
    // })

    // /**
    //  * 联合查询二级分类
    //  */
    // router.get('/catrgorieschild', async (req, res) => {
    //     const sql = `select * from categorychild ch left join category pa on pa.category_id = ch.category_part_id;`
    //     //....这里执行数据库操作
    //     // const sql_result = await execSQL(sql)
    //     res.send(sql_result)
    // })

    // /**
    //  * 删除二级分类
    //  */
    // router.delete('/catrgorieschild/:id', async (req, res) => {
    //     const sql = `delete from categorychild where category_child_id = '${req.params.id}' `
    //     //....这里执行数据库操作
    //     // const sql_result = await execSQL(sql)
    //     res.send({
    //         success: 'true'
    //     })
    // })

    // /**
    //  * 修改二级分类
    //  */
    // router.put('/catrgorieschild/:id', async (req, res) => {
    //     // const sql = `update categorychild set category_child_name = '${req.body.category_name}' where category_child_id = '${req.params.id}' `
    //     // // const sql_result = await execSQL(sql)
    //     // res.send({
    //     //     success: 'true'
    //     // })
    // })
}