module.exports = option => {
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const AdminUser = require('../models/AdminUser')

    return async(req, res, next)=>{
        const modelName = require('inflection').classify(req.params.resource)
        if (!modelName === 'Resume'){
            const token = String(req.headers.authorization || '').split(' ').pop()
            assert(token, 401, '请先登录')
            const tokenDate = jwt.verify(token, req.app.get('secret'))
            assert(token, 401, 'token非法')
            req.user = await AdminUser.findById(tokenDate.id)
            assert(req.user, 401, '用户非法')
        }
        await next()
    }
}