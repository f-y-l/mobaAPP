<template>
<div class="category">
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="auto" @submit.native.prevent="save">
        <el-form-item label="子分类" >
            <el-select v-model="subValue.parent">
                <el-option v-for="item in this.parents"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                </el-option>
            </el-select>
            
        </el-form-item>
        <el-form-item label="名称" >
            <el-input v-model="subValue.name"></el-input>
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
            parents: [],

        }
    },
    methods: {
        async save() {
            let res
            if (this.id) {
                res = await this.$http.put(`rest/categories/${this.id}`, this.subValue)// eslint-disable-line no-unused-vars
            } else {
                res = await this.$http.post('rest/categories', this.subValue)// eslint-disable-line no-unused-vars
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
                this.$router.push('/categories/list')
            }
        },
        async getName() {
            const res = await this.$http.get(`rest/categories/${this.id}`)
            this.subValue = res.data
        },
        async getParents(){ 
            const res = await this.$http.get(`rest/categories`)
            this.parents = res.data
        }
    },
    created() {
        this.getParents()
        this.id && this.getName()
    }
}
</script>
