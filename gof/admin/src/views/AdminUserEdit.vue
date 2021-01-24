<template>
<div class="category">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="auto" @submit.native.prevent="save">
        <el-form-item label="用户名" >
            <el-input v-model="subValue.username"></el-input>
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
            subValue: {},
        }
    },
    methods: {
        async save() {
            let res
            if (this.id) {
                res = await this.$http.put(`rest/admin_users/${this.id}`, this.subValue)// eslint-disable-line no-unused-vars
            } else {
                res = await this.$http.post('rest/admin_users', this.subValue)// eslint-disable-line no-unused-vars
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
                this.$router.push('/admin_users/list')
            }
        },
        async getName() {
            const res = await this.$http.get(`rest/admin_users/${this.id}`)
            this.subValue = res.data
        },
    },
    created() {
        this.id && this.getName()
    }
}
</script>

