# 后台 设计

## api
- 登录 POST /login
- 注册 POST /register

- 获取用户简历列表 GET /resumes
- 获取用户简历详情 GET /resume/get?id=number
- 保存简历编辑 POST /resume/save?id=number
- 删除简历 GET /resume/delete?id=number

- 升级 vip POST vip/get

## 数据库设计
- user
 - name
 - imageUrl
 - password
 - isVip
 - isAdmin
 - creatAt
- resume
 - userId
 - name
 - data