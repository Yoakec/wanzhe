module.exports = (app) => {


    const router = require('express').Router()

    const mongoose = require('mongoose')
    const Category = mongoose.model('Category')
    const Article = mongoose.model('Article')


    /**
     * 批量插入数据
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


    app.use('/web/api', router)
}