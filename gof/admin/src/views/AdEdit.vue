<template>
<div class="category">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="auto" @submit.native.prevent="save">
        <el-form-item label="名称" >
            <el-input v-model="subValue.name"></el-input>
        </el-form-item>
        <el-form-item label="">
            <el-button size="big" plain @click="subValue.items.push({})">
                <i class="el-icon-plus"></i>添加广告
            </el-button>
            <el-row type="flex" style="flex-wrap:wrap">
                <el-col  :md="11"  v-for="(item, i) in subValue.items" :key="i" style="margin:0.5rem">
                    <el-form-item label="标题">
                        <el-input v-model="item.title"></el-input>
                    </el-form-item>
                    <el-form-item label="链接">
                        <el-input v-model="item.url"></el-input>
                    </el-form-item>
                    <el-form-item label="图片">
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/upload'"
                            :show-file-list="false"
                            :on-success="res => $set(item, 'image', res.url)"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="item.image" :src="item.image" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="danger" icon="el-icon-delete" circle
                        @click="subValue.items.splice(i, 1)"
                        ></el-button>
                    </el-form-item>
                </el-col>
            </el-row>
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
            subValue: {
                items:[]
            },
        }
    },
    methods: {
        async save() {
            let res
            if (this.id) {
                res = await this.$http.put(`rest/ads/${this.id}`, this.subValue)// eslint-disable-line no-unused-vars
            } else {
                res = await this.$http.post('rest/ads', this.subValue)// eslint-disable-line no-unused-vars
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
                this.$router.push('/ads/list')
            }
        },
        async getName() {
            const res = await this.$http.get(`rest/ads/${this.id}`)
            this.subValue = Object.assign({}, this.subValue, res.data)
        },
        afterUpload(res){
            console.log(res)
            this.subValue.items.url = res.url
            // 显式赋值
            // this.$set(this.subValue,'avatar', res.url)
        },
        beforeAvatarUpload(file) {
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

