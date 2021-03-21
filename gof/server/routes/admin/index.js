// 导出一个模型方法
module.exports = app =>{
    // 1. 初始化一个路由
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const Resume = require('../../models/Resume')
    const Auth = require('../../middleware/auth')
    const Resource = require('../../middleware/resource')

    const router = express.Router({
        mergeParams:true
    })
    // 登录校验中间件
    const authMiddleware = Auth
    // 模型中间件
    const resourceMiddleware = Resource
    // 2. 接口
    /* 增 
    新建 */
    router.post('/', async(req, res)=>{
        // 依据模型创建
        if (req.Model.modelName === 'Resume'){
            let data = {}
            let result = null
            try{
                result = await req.Model.create(req.body)
            }
            catch(error){
                console.log(error)
                data.id = -1
                data.message = "注册失败：" +error
                res.send(data)
            }
            data.message = "注册成功：" + req.body.email
            res.send(data)
            // 返回结果给前端
        }else{
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
        }
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
    资源列表 */
    router.get('/', async(req, res)=>{
        const queryOptions ={}
        if (req.Model.modelName === 'Category'){
            // 当访问分类列表接口时，需要关联查询父分类的信息
            queryOptions.populate = 'parent'
        }
        if (req.Model.modelName === 'Article'){
            // 当访问分类列表接口时，需要关联查询父分类的信息
            queryOptions.populate = 'articles'
        }
        // 依据模型查找
        const items = await req.Model.find().setOptions(queryOptions)
        res.send(items)
    })
    /* 资源详情 */
    router.get('/:id', async(req, res)=>{
        const result = await req.Model.findById(req.params.id)
        res.send(result)
    })

    // 3. 挂载路由
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    //二、 文件上传接口
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
    app.post('/admin/api/upload', authMiddleware(), upload.single('file') ,async(req, res)=>{
        console.log(req.body)
        // multer中间件，给req设置一个file
        console.log(req.file)
        req.file.url=`http://${req.headers.host}`+`/uploads/`+`${req.file.filename}`
        res.send(req.file)
    })

    //三、 login
    // resume 
    // 简历登录校验
    app.get('/admin/api/isLogin', async(req,res)=>{
        // todo
        const token = req.query.email
        assert(token, 201, "401：请登录")
        const tokenDate = jwt.verify(token ,req.app.get('secret'))
        user = await Resume.findById(tokenDate.id)
        assert(user, 201, "401：用户非法")
        res.send({
            login:true,
            vip:user.isvip
        })
    })


    app.post('/admin/api/userlogin',async (req, res) => {
        const user = await Resume.findOne({
            email:req.body.email
        })
        if (!user){
            res.send({status:"422",message:"用户不存在"})
        }
        if(user.password !== req.body.password){
            res.send({status:"422",message:"账号或密码错误"})
        }
        // 3.返回token
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({
                id:user._id,
                username: user.email
            }, app.get('secret'))
        message = "登陆成功:\n\n"+user.name
        return res.send({status:"200",message:message, token, name:user.name, isvip:user.isvip})
    })
    
    app.post('/admin/api/login', async (req, res) => {
        // 1.根据用户名找到用户信息
        const user = await AdminUser.findOne({
            username: req.body.username
        }).select('+password')
        assert (user, 422, "用户不存在")

        // 2.校验密码
        const isVaild = require('bcrypt').compareSync( req.body.password, user.password)
        assert(isVaild, 422 ,'用户名或密码不正确')
     
        // 3.返回token
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({
                id:user._id,
                username: user.username
            }, app.get('secret'))
        return res.send({token, username:user.username})
        
    } )

    // 四、函数
    // 错误处理函数
    app.use(async (err, req, res, next)=>{
        console.log(err)
        res.status(err.statusCode || '500').send({
            message: err.message
        })
    })

}