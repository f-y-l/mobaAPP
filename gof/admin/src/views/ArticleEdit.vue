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
            <el-input type="textarea" v-model="subValue.context"></el-input>
        </el-form-item>
        <el-form-itme>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-itme>
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
            subValue: {},
            categories: [],

        }
    },
    methods: {
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
