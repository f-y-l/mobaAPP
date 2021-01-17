<template>
<div class="category">
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="auto" @submit.native.prevent="save">
        <el-tabs value="info" type="border-card">
            <el-tab-pane label="基础信息" name="info">
                <el-form-item label="名称" >
                    <el-input v-model="subValue.name"></el-input>
                </el-form-item>
                <el-form-item label="称号">
                    <el-input v-model="subValue.title"></el-input>
                </el-form-item>
                <el-form-item label="头像" >
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :show-file-list="false"
                        :on-success="afterUpload"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="subValue.avatar" :src="subValue.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="subValue.categories" multiple>
                        <el-option v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="难度">
                    <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="subValue.scores.difficult"></el-rate>
                </el-form-item>
                <el-form-item label="技巧">
                    <el-rate style="margin-top:0.6rem"  :max="9" show-score v-model="subValue.scores.skills"></el-rate>
                </el-form-item>
                <el-form-item label="攻击">
                    <el-rate style="margin-top:0.6rem"  :max="9" show-score v-model="subValue.scores.attack"></el-rate>
                </el-form-item>
                <el-form-item label="生存">
                    <el-rate style="margin-top:0.6rem"  :max="9" show-score v-model="subValue.scores.survive"></el-rate>
                </el-form-item>
                <el-form-item label="顺风出装">
                    <el-select v-model="subValue.items1" multiple>
                        <el-option
                            v-for="item in items"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="逆风出装">
                    <el-select v-model="subValue.items2" multiple>
                        <el-option
                            v-for="item in items"
                            :key="item._id"
                            :label="item.name"
                            :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="使用技巧">
                    <el-input type="textarea" v-model="subValue.usageTips"></el-input>
                </el-form-item>
                <el-form-item label="对抗技巧">
                    <el-input type="textarea" v-model="subValue.battleTips"></el-input>
                </el-form-item>
                <el-form-item label="团战思路">
                    <el-input type="textarea" v-model="subValue.teamTips"></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="技能" name="skill">
                <el-button size="big" type="primary" style="margin:1rem" @click="subValue.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                <el-row type="flex" style="flex-wrap:wrap">
                    <el-col :md="12" v-for="(item ,i) in subValue.skills" :key="i">
                        <el-form-item label="名称">
                            <el-input v-model="item.name"></el-input>
                        </el-form-item>
                        <el-form-item label="图标">
                             <el-upload
                                class="avatar-uploader"
                                :action="$http.defaults.baseURL + '/upload'"
                                :show-file-list="false"
                                :on-success="res => $set(item, 'icon', res.url)"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="item.icon" :src="item.icon" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input type="textarea" v-model="item.description"></el-input>
                        </el-form-item>
                        <el-form-item label="小提示">
                            <el-input type="textarea" v-model="item.tips"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="danger" icon="el-icon-delete" circle
                            @click="subValue.skills.splice(i, 1)"
                            ></el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <el-form-item style="margin-top: 1rem" >
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
    props: {
        id: {}
    },
    data() {
        return {
            subValue: {
                name:'',
                avatar:'',
                title:'',
                scores:{},
                skills:[],
                items1:[],
                items2:[],
                usageTips:'',
                battleTips:'',
                teamTips:'',
                partners:[]
            },
            categories:[],
            items:[],
        }
    },
    methods: {
        async save() {
            let res
            if (this.id) {
                res = await this.$http.put(`rest/heroes/${this.id}`, this.subValue)// eslint-disable-line no-unused-vars
            } else {
                res = await this.$http.post('rest/heroes', this.subValue)// eslint-disable-line no-unused-vars
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
                this.$router.push('/heroes/list')
            }
        },
        async getName() {
            const res = await this.$http.get(`rest/heroes/${this.id}`)
            // 合并赋值
            this.subValue = Object.assign({}, this.subValue, res.data)
            //  默认赋值（直接替换）
            // this.subValue = res.data
        },
        async getCategory(){
            const res = await this.$http.get('rest/categories')
            this.categories = res.data
        },
        async getItems(){
            const res = await this.$http.get('rest/items')
            this.items = res.data
        },
        afterUpload(res){
            console.log(res)
            this.subValue.avatar = res.url
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
        this.getCategory()
        this.getItems()
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>