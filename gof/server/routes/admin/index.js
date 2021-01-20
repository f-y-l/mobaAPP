// 导出一个模型方法
module.exports = app =>{
    // 1. 初始化一个路由
    const express = require('express')
    const router = express.Router({
        mergeParams:true
    })

    // 2. 接口
    /* 增 
    新建 */
    router.post('/', async(req, res)=>{
        // 依据模型创建
        let err = {}
        let result = null
        try{
            result = await req.Model.create(req.body)
        }
        catch(error){
            err=error
        }
        console.log(err)
        if(err=={}){
            res.send(result)
        }else{
            res.send(err.message)
        }
        // 返回结果给前端
    })
    /* 删 
    删除 */
    router.delete('/:id', async(req, res)=>{
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({success:true})
    })
    /* 改
    编辑 */
    router.put('/:id', async(req, res)=>{
        let err = {}
        const options = { // option选项及其默认值
            safe: true, // 安全模式
            upsert: false, //如果不存在则创建新纪录
            multi: false,  // 是否更新多个查询记录
            runValidators: true, // 如果值为true，执行Validation验证。
            setDefaultsOnInsert: null, // 如果upsert选项为true，在新建时插入文档定义的默认值。
            strict: null, // 用严格模式跟新
            overwrite: false // 禁用update-only模式，允许覆盖记录。
        }
        try {
            const result = await req.Model.findByIdAndUpdate(req.params.id,req.body,options)
        } catch (error) {
            err = error
        }
        console.log(err)
        if (err=={}){
            res.send(result)
        }else{
            res.send(err.message)
        }
    })
    /* 查
    查询列表 */
    router.get('/', async(req, res)=>{
        const queryOptions ={}
        if (req.Model.modelName === 'Category'){
            // 当访问分类列表接口时，需要关联查询父分类的信息
            queryOptions.populate = 'parent'
        }
        if (req.Model.modelName === 'Article'){
            // 当访问分类列表接口时，需要关联查询父分类的信息
            queryOptions.populate = 'parent'
        }
        // 依据模型查找
        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items)
    })
    /* ID详情获取 */
    router.get('/:id', async(req, res)=>{
        const result = await req.Model.findById(req.params.id)
        res.send(result)
    })


    // 3. 挂载路由
    app.use('/admin/api/rest/:resource',async (req, res, next) =>{
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)

    // 文件上传
    const multer = require('multer')

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${__dirname}`+'/../../uploads')
        },
        filename: function (req, file, cb) {
            console.log(file.md5)
            var singfileArray = file.originalname.split('.');
            var fileExtension = singfileArray[singfileArray.length - 1];
            cb(null,  Date.now() + "." + fileExtension);
            // console.log(file);
        }
    })
    
    var upload = multer({
        storage: storage
    })

    // const upload = multer({ dest:__dirname + '/../../uploads' })
    app.post('/admin/api/upload', upload.single('file') ,async(req, res)=>{
        console.log(req.body)
        // multer中间件，给req设置一个file
        console.log(req.file)
        req.file.url=`http://${req.headers.host}`+`/uploads/`+`${req.file.filename}`
        res.send(req.file)
    })
}