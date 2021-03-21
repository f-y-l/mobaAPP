<template>
    <div id='header'>
        <el-row class="header-wrapper">
            <el-col class="logo" :span='6'><img src='../../common/image/logo.png' /><span>Resume Builder</span></el-col>
            <el-col :span='6'  :offset="12">
                <el-row class='menu'>
                    <el-col :span=6><span @click="goTo(0)">首页</span></el-col>
                    <el-col v-if='user.isLogin' :span=6><span @click="goTo(2)">个人中心</span></el-col>
                    <el-col :span=6><span @click='login'>{{user.isLogin ? '登出' : '登录'}}</span></el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    methods: {
        
        goTo(index) {
            let pathName = '';
            switch (index) {
                case 0:
                    pathName = '/';
                    break;
                case 1:
                    pathName = 'choose';
                    break;
                case 2:
                    pathName = 'usercenter';
                    break;
                default:
                    break;   
            }
            this.$router.push(pathName);
        },
        login() {
            console.log(this.user.isLogin)
            if (this.user.isLogin) {
                this.$store.commit({ type: 'resetState' })
                localStorage.clear()
            }
            this.$router.push('/login')
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    }
}
</script>

<style lang="less" scoped>
#header{
    font-size: 1.05rem;
    color: #303133;
    text-align: center;
    line-height: 60px;
    .header-wrapper{
        .logo{
            text-align: left;
            cursor: pointer;
            img{
                display: inline-block;
                margin-top: 10px;
                width: 40px;
                height: 40px;
            }
            span{
                vertical-align: top;
                margin-left: 20px;
                font-size: 1.0em;
                font-weight: 700;
            }
        }
        .menu .el-col span{
            cursor: pointer;
            &:hover{
                color: #000;
            }
        }
        .menu {
            a {
                text-decoration: none;
                color: #000;
            }
        }
    }
}
</style>
