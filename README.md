# gof



vue add element

2-1

​	npm i axious

​	前端请求接口



2-2

​	npm i express@next mongoose cors

​	引用路由技巧：
		// 导出路由模型方法

​		module.exports = app =>{} 

​		require('./routes/admin')(app)  // 调用路由模型方法
	
	链接数据库：

​		mongoose.connect('url',{ÂSpe})

​	model参数：

​		mongoose.Schema({})

​		//导出mongoose模型

​		module.export = mongoose.model('Category', schema)



2-11

​	npm i inflection ˙（处理数据，如单复数转换，类名变化，单词，下划线）


2-9 

​	npm i multer （处理上传数据，如二进制图片流等)

2-20 
	npm i vue2-editor （富文本编辑器）