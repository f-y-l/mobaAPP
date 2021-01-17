<template>
<div class="category">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="auto" @submit.native.prevent="save">
        <el-form-item label="名称" >
            <el-input v-model="subValue.name"></el-input>
        </el-form-item>
        <el-form-item label="图标" >
            <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="afterUpload"
                :before-upload="beforeAvatarUpload">
                <img v-if="subValue.icon" :src="subValue.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
// import SparkMD5 from 'spark-md5'
export default {
    props: {
        id: {}
    },
    data() {
        return {
            subValue: {},
        }
    },
    methods: {
        async save() {
            let res
            if (this.id) {
                res = await this.$http.put(`rest/items/${this.id}`, this.subValue)// eslint-disable-line no-unused-vars
            } else {
                res = await this.$http.post('rest/items', this.subValue)// eslint-disable-line no-unused-vars
            }
            console.log(res)
            if (typeof(res.data) === 'string' && res.data != "" ){
                this.$message({
                    type: "error",
                    message: res.data
                })  
            }else{
                this.$message({
                    type: "success",
                    message: "保存成功"
                }) 
                this.$router.push('/items/list')
            }
        },
        async getName() {
            const res = await this.$http.get(`rest/items/${this.id}`)
            this.subValue = res.data
        },
        afterUpload(res){
            console.log(res)
            // 显式赋值
            this.$set(this.subValue,'icon', res.url)
            // this.subValue.icon = res.url
        },
        beforeAvatarUpload(file) {
            // // const _this = this  
            // var fileReader = new FileReader();
            // //此处打印file可看到file下的raw为文件属性
            // var dataFile = file.raw;
            // // let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
            // var spark = new SparkMD5.ArrayBuffer();
            // //获取文件二进制数据
            // fileReader.readAsArrayBuffer(dataFile)

            // //异步执行函数
            // // fileReader.onload = function(e){
            //     // spark.append(e.target.result);
            //     var md5 = spark.end()
            //     this.$set(this.subValue, 'md5Value', md5.toString())
            //     // this.subValue.md5Value= md5.toString()
            //     console.log(this.subValue.md5Value)
            //     //此处this指向发生改变，需提前声明const _this = this
            //     // _this.imgdata.md5 = md5; //此处是将文件的md5值放入imgdata中
            //     //上传图片，如手动上传可不在此处执行
            //     // _this.upload('frontImg')
            // // }
            const isJPG = file.type === 'image/jpeg'||'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    created() {
        this.id && this.getName()
    }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>