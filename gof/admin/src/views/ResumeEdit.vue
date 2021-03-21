<template>
<div class="category">
    <h1>{{id ? '编辑' : '新建'}}用户</h1>
    <el-form label-width="auto" @submit.native.prevent="save">
        <el-form-item label="邮箱" >
            <el-input v-model="subValue.email"></el-input>
        </el-form-item>
        <el-form-item label="姓名" >
            <el-input v-model="subValue.name"></el-input>
        </el-form-item>
        <el-form-item label="权限" >
            <el-switch
                v-model="subValue.isvip"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="至尊会员"
                inactive-text="普通用户">
            </el-switch>
        </el-form-item>
        
        <el-form-item label="密码" >
            <el-input type="text" v-model="subValue.password"></el-input>
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
            },
        }
    },
    methods: {
        async save() {
            let res
            if (this.id) {
                res = await this.$http.put(`rest/resume/${this.id}`, this.subValue)// eslint-disable-line no-unused-vars
            } else {
                res = await this.$http.post('rest/resume', this.subValue)// eslint-disable-line no-unused-vars
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
                this.$router.push('/resume/list')
            }
        },
        async getName() {
            const res = await this.$http.get(`rest/resume/${this.id}`)
            this.subValue = res.data
        },
    },
    created() {
        this.id && this.getName()
    }
}
</script>

