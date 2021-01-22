<template>
<div class="category">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="auto" @submit.native.prevent="save">
        <el-form-item label="所属分类" >
            <el-select v-model="subValue.articles" multiple>
                <el-option v-for="item in categories"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                </el-option>
            </el-select>
            
        </el-form-item>
        <el-form-item label="标题" >
            <el-input v-model="subValue.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <vue-editor v-model="subValue.context"
             useCustomImageHandler 
             @image-added="handleImageAdded" ></vue-editor>
        </el-form-item>
        <el-form-itme>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-itme>
    </el-form>
</div>
</template>
<script>
import { VueEditor } from "vue2-editor";
// import axios from "axios";

export default {
    components: {
        VueEditor
    },
    props: {
        id: {}
    },
    data() {
        return {
            subValue: {},
            categories: [],

        }
    },
    methods: {
        // editor上传自定义图片
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            // An example of using FormData
            // NOTE: Your key could be different such as:
            // formData.append('file', file)
        
            const formData = new FormData();

            // formData.append("image", file);
            formData.append("file", file);
        
            // axios({
            //     url: "https://fakeapi.yoursite.com/images",
            //     method: "POST",
            //     data: formData
            // })
            //     .then(result => {
            //     let url = result.data.url; // Get url from response
            //     Editor.insertEmbed(cursorLocation, "image", url);
            //     resetUploader();
            //     })
            //     .catch(err => {
            //     console.log(err);
            // });
            const res = await this.$http.post("upload", formData)
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
        },
        async save() {
            let res
            if (this.id) {
                res = await this.$http.put(`rest/articles/${this.id}`, this.subValue)// eslint-disable-line no-unused-vars
            } else {
                res = await this.$http.post('rest/articles', this.subValue)// eslint-disable-line no-unused-vars
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
                this.$router.push('/articles/list')
            }
        },
        async getName() {
            const res = await this.$http.get(`rest/articles/${this.id}`)
            this.subValue = res.data
        },
        async getCategories(){ 
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        }
    },
    created() {
        this.getCategories()
        this.id && this.getName()
    }
}
</script>
