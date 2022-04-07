module.exports = (app) => {


    const router = require('express').Router()

    const mongoose = require('mongoose')
    const Category = mongoose.model('Category')
    const Article = mongoose.model('Article')
    const Hero = mongoose.model('Hero')


    /**
     * 批量插入新闻数据
     */
    router.get('/news/init', async (req, res) => {

        const parent = await Category.findOne({ name: '新闻分类' })

        const cats = await Category.find().where({
            parent: parent
        }).lean()
        const rawtxt = ['姚懿玲：热爱是最好的天赋 I 《营地·人物》', '元歌皮肤设计大赛最佳创意奖公布', '狄某有话说 | 瑶：队友的苦难与我无关', '吕布特效升级过程沟通&amp;赵云百木心枪优化【老亚瑟的答疑时间】', '蔡小姬探班手记：公孙离玉兔公主皮肤海报设计故事', '4月5日体验服不停机更新公告', '4月2日体验服停机更新公告', '4月2日全服不停机更新公告', '4月2日英雄平衡调整丨兰陵王、小乔增强，花木兰、暃优化', '4月1日体验服不停机更新公告', '【兑换好礼】无限连月历活动公告', '【赏金猎手的礼物】活动开启公告', '澜-赏金猎手登场！收集无限币兑好礼！', '元歌皮肤设计大赛最佳创意奖公布', '消耗钻石有好礼！零号·赤焰限时返场！', 'KPL今日预报丨久诚、爱思首发归来，广州TTG再战重庆狼队', '今日预报丨常规赛第三轮开战，武汉ES与西安WE谁能拿捏对方', '今日预报丨“浴室”大战再演，北京WB战广州TTG谁能取胜？', '今日预报丨南京Hero对决济南RW侠，佛山GK能否重回S组', 'KPL今日预报丨第二轮收官，成都AG、北京WB谁能进入卡位赛']
        const newlist = rawtxt.map(title => {
            const radomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: radomCats.slice(0, 2),
                title: title
            }
        })

        await Article.deleteMany({})
        await Article.insertMany(newlist)
        res.send(newlist)

    })

    /**
     * 导入英雄数据
     */
    router.get('/heros/init',async(req,res) =>{
        const rwaData =  [{"name":"热门","heros":[{"name":"鲁班七号","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"孙尚香","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"甄姬","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"铠","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"安琪拉","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"亚瑟","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"妲己","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"马可波罗","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"},{"name":"瑶","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"},{"name":"吕布","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"}]},{"name":"战士","heros":[{"name":"赵云","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"墨子","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"钟无艳","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"吕布","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"夏侯惇","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},{"name":"曹操","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"},{"name":"典韦","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},{"name":"宫本武藏","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"},{"name":"达摩","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"老夫子","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"},{"name":"关羽","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"},{"name":"程咬金","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},{"name":"露娜","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"花木兰","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"橘右京","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},{"name":"亚瑟","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"孙悟空","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"刘备","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"},{"name":"杨戬","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"},{"name":"雅典娜","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"},{"name":"哪吒","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"},{"name":"铠","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"苏烈","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},{"name":"梦奇","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"},{"name":"裴擒虎","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},{"name":"狂铁","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"},{"name":"孙策","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},{"name":"李信","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"},{"name":"盘古","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"},{"name":"云中君","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"},{"name":"曜","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"},{"name":"马超","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"},{"name":"蒙恬","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg"},{"name":"夏洛特","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/536/536.jpg"},{"name":"司空震","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg"},{"name":"云缨","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg"}]},{"name":"法师","heros":[{"name":"小乔","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"},{"name":"墨子","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},{"name":"妲己","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},{"name":"嬴政","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"},{"name":"高渐离","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"},{"name":"孙膑","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},{"name":"扁鹊","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"},{"name":"芈月","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},{"name":"周瑜","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"},{"name":"甄姬","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},{"name":"武则天","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"},{"name":"貂蝉","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},{"name":"安琪拉","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},{"name":"露娜","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},{"name":"姜子牙","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"},{"name":"王昭君","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"},{"name":"张良","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"},{"name":"不知火舞","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},{"name":"钟馗","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"诸葛亮","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"},{"name":"干将莫邪","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"},{"name":"女娲","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"},{"name":"杨玉环","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"},{"name":"弈星","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"},{"name":"米莱狄","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"},{"name":"司马懿","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"沈梦溪","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"},{"name":"上官婉儿","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"嫦娥","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"},{"name":"西施","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"},{"name":"司空震","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg"},{"name":"金蝉","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg"}]},{"name":"坦克","heros":[{"name":"廉颇","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"},{"name":"庄周","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"刘禅","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},{"name":"钟无艳","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},{"name":"白起","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"},{"name":"芈月","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},{"name":"吕布","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},{"name":"夏侯惇","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},{"name":"达摩","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},{"name":"项羽","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"},{"name":"程咬金","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},{"name":"刘邦","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"},{"name":"亚瑟","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},{"name":"牛魔","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},{"name":"张飞","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},{"name":"太乙真人","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},{"name":"东皇太一","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"},{"name":"铠","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},{"name":"苏烈","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},{"name":"梦奇","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"},{"name":"孙策","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},{"name":"盾山","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},{"name":"嫦娥","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"},{"name":"猪八戒","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"},{"name":"蒙恬","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg"},{"name":"阿古朵","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"}]},{"name":"刺客","heros":[{"name":"赵云","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},{"name":"阿轲","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"},{"name":"李白","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"},{"name":"貂蝉","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},{"name":"韩信","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},{"name":"兰陵王","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"},{"name":"花木兰","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},{"name":"不知火舞","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},{"name":"娜可露露","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"},{"name":"橘右京","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},{"name":"孙悟空","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},{"name":"百里守约","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},{"name":"百里玄策","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"},{"name":"裴擒虎","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},{"name":"元歌","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"},{"name":"司马懿","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},{"name":"上官婉儿","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},{"name":"云中君","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"},{"name":"马超","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"},{"name":"镜","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg"},{"name":"澜","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg"},{"name":"云缨","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg"},{"name":"暃","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/542/542.jpg"}]},{"name":"射手","heros":[{"name":"孙尚香","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},{"name":"鲁班七号","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},{"name":"马可波罗","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"},{"name":"狄仁杰","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"},{"name":"后羿","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},{"name":"李元芳","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"},{"name":"虞姬","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"},{"name":"成吉思汗","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"},{"name":"黄忠","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"},{"name":"百里守约","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},{"name":"公孙离","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"},{"name":"伽罗","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"},{"name":"蒙犽","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg"},{"name":"艾琳","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/155/155.jpg"}]},{"name":"辅助","heros":[{"name":"庄周","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},{"name":"刘禅","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},{"name":"孙膑","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},{"name":"牛魔","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},{"name":"张飞","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},{"name":"钟馗","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},{"name":"蔡文姬","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"},{"name":"太乙真人","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},{"name":"大乔","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"},{"name":"东皇太一","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"},{"name":"鬼谷子","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"},{"name":"明世隐","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"},{"name":"盾山","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},{"name":"瑶","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"},{"name":"鲁班大师","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg"},{"name":"阿古朵","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"},{"name":"金蝉","awatar":"https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg"}]}]
        await Hero.deleteMany({})
        for(let cat of rwaData){
            if(cat.name ==='热门'){
                continue
            }

            //录入英雄

            //找到英雄分类
            const category = await Category.findOne({
                name:cat.name
            })

            //写入分类
            cat.heros.map(hero =>{
                hero.categories = [category]
                return hero
            })

            await Hero.insertMany(cat.heros)

        }
        res.send( await Hero.find())
    
    })


    /**
     * 查询新闻分类
     */
    router.get('/news/list', async (req, res) => {

        //聚合查询
        const parents = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.aggregate([
            { $match: { parent: parents._id } },
            {
                //聚合查询
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                }
            },
            {
            $addFields:{
                //分片   限制查5条
                newsList:{$slice:['$newsList',5]}
            }
            }
        ])

        const subCats = cats.map( v => v._id)

        cats.unshift({
            name:'热门',
            newsList: await Article.find().where({
                categories:{
                    $in:subCats
                }
            }).populate('categories').limit(5).lean()
        })

        cats.map(v =>{
            v.newsList.map(news =>{
                news.categoryName = (v.name==='热门') ? news.categories[0].name :v.name
                return news
            })
            return v
        })

        res.send(cats)
    })



    //英雄数据接口
    router.get('/heroes/list', async (req, res) => {

        //聚合查询
        const parents = await Category.findOne({
            name: '英雄'
        })
        const cats = await Category.aggregate([
            { $match: { parent: parents._id } },
            {
                //聚合查询
                $lookup: {
                    //找的表 
                    from: 'heroes',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'heroesList'
                }
            }
        ])

        const subCats = cats.map( v => v._id)

        cats.unshift({
            name:'热门',
            heroesList: await Hero.find().where({
                categories:{
                    $in:subCats
                }
            }).limit(10).lean()
        })


        res.send(cats)
    })

    router.get('/articles/:id',async(req,res)=>{

        const data = await Article.findById(req.params.id).lean()
        data.related = await Article.find().where({
            categories:{$in:data.categories}
        }).limit(2)
        res.send(data)

    })

    router.get('/hero/:id',async(req,res)=>{

        const data = await Hero.findById(req.params.id).lean()
        res.send(data)

    })

    app.use('/web/api', router)
}

