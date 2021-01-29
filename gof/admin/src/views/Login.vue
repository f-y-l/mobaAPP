<template>
    <el-card class="login_container">
        <div slot="header">
            请先登录
        </div>
        <el-form @submit.native.prevent="login">
            <el-form-item label="账号">
                <el-input v-model="model.username"></el-input>
            </el-form-item> 
            <el-form-item label="密码">
                <el-input type="password" v-model="model.password"></el-input>
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" native-type="submit">登录</el-button>
            </el-form-item>
        </el-form>
        
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            model:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        async login(){
            const res = await this.$http.post('login', this.model)
            // console.log(res.data)
            // 报存token
            // sessionStorage.token = res.data.token
            localStorage.clear()
            localStorage.token = res.data.token
            this.$message({
                type:'success',
                message:"登陆成功"
            })
            this.$router.push('/')
        }
    },
}
</script>
<style>
.login_container{
    width: 25rem;
    margin: 10rem auto;
}
</style>