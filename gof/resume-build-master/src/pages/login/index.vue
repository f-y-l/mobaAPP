<template>
  <div id="login">
    <div class='wrapper'>
        <div class="title">
            <div class="logo-wrapper">
                <img src="../../common/image/logo.png">
                <span>Resume Builder</span>
            </div>
            <div class="desc">Enjoy a simple editorial resume process</div>
        </div>
        <div class="login-wrapper">
            <el-input placeholder="请输入账号(邮箱)" type='text' v-model="loginData.email"></el-input>
            <el-input placeholder="请输入秘密" type="password" v-model="loginData.password"></el-input>
            <div class='button-wrapper'>
                <span @click="findIsShow = true" class='forget'>忘记密码</span>
                <div class='right'>
                    <el-button @click="funLogin" type="primary">登录</el-button>
                    <el-button @click='registerIsShow=true' type="primary">注册</el-button>
                </div>
            </div>
        </div>
    </div> 
    <el-dialog width='500px' :show-close='false' title="注册" :visible="registerIsShow">
            <el-form :model="userData">
                <div class='form-item'>
                    <span class='label'>填写名称</span>
                    <el-input size='mini' v-model="userData.name"></el-input>
                    <i :class="mailFilter"></i>
                </div>
                <div class='form-item'>
                    <span class='label'>填写邮箱</span>
                    <el-input size='mini' v-model="userData.email"></el-input>
                    <i :class="mailFilter"></i>
                </div>
                <div class='form-item'>
                    <span class='label'>填写密码</span>
                    <el-input size='mini' type="password" v-model="userData.password"></el-input>
                    <i :class="userData.password !== '' ? 'el-icon-success' : 'el-icon-error'"></i>
                </div>
                <div class='form-item more'>
                    <span class='label'>确认密码</span>
                    <el-input size='mini' type="password" v-model="userData.confirm"></el-input>
                    <i :class="(userData.password === userData.confirm && userData.confirm !== '') ? 'el-icon-success' : 'el-icon-error'"></i>
                </div>
            </el-form> 
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
    </el-dialog>
    <el-dialog width='500px' :show-close='false' title="找回密码" :visible="findIsShow">
            <el-form>
                <div class='form-item'>
                    <span class='label'>填写邮箱</span>
                    <el-input size='mini' class='find-password-input' v-model='findPassword'></el-input>
                    <el-button size='mini' type="text" @click="post">发送</el-button>
                </div>
                <div class='form-item'>
                    <span class='label'>填验证码</span>
                    <el-input size='mini' class='find-password-input' v-model='passwordCode'></el-input>
                </div>
            </el-form> 
            <div slot="footer" class="dialog-footer">
                <el-button size='mini' @click="closeFind">取 消</el-button>
                <el-button size='mini' type="primary" @click="postCode">发送</el-button>
            </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
    data() {
        return {
            loginData: {
                email: '',
                password: ''
            },
            userData: {
                name: '',
                email: '',
                password: '',
                confirm: ''
            },
            findPassword: '',
            passwordCode: '',
            timer: 60,
            timers: {},
            timerIsShow: false,
            findIsShow: false,
            registerIsShow: false
        }
    },
    methods: {
        funLogin() {
            let { email, password } = this.loginData
            let type = 'warning'
                this.axios.post('http://localhost:3000/admin/api/userlogin',{ email,password }).then((res) => {
                    if (res.data.status === "200") {
                        type = 'success'
                        localStorage.clear()
                        localStorage.token = res.data.token
                        localStorage.name = res.data.name
                        if (res.data.isvip === true) {
                            this.$store.commit({ type: 'isvip' })
                        }
                        this.$router.push('/')
                        this.$store.commit({ type: 'toggleLogin' })
                    }
                    this.notify(res.data.message,type)
                })
        },
        close() {
            this.registerIsShow = false;
        },
        closeFind() {
            this.findPassword = '';
            this.findIsShow = false
        },
        confirm() {
            let { name, email,password } = this.userData
            let type = 'warning'
            // if (this.userData.password == this.userData.confirm && this.userData.name != unll){
                this.axios.post('http://localhost:3000/admin/api/rest/resume',{ email,password, name }).then((res) => {
                    console.log(res.data)
                    if (res.data.id !== -1) {
                        type = 'success'
                    }
                    this.notify(res.data.message,type)
                    this.registerIsShow = false
                })
            // }
        },
        post() {
            this.axios.get(`/resume/getcode?email=${this.findPassword}`).then((res) => {
                if (res.data.id !== -1) {
                    this.notify('密码发送至邮箱，请注意查收','success')
                } else {
                    this.notify(res.data.message)
                }
            })
        },
        notify(message,type = 'warning') {
            this.$notify({
                title: '提示',
                message,
                type,
                offset: 100,
                duration: 1500
            });
        },
        postCode() {
            this.axios.post(`/resume/postcode`,{ code: this.passwordCode }).then((res) => {
                if (res.data.id !== -1) {
                    this.notify(res.data.message,'success')
                } else {
                    this.notify(res.data.message)
                }
            })
        }
    },
    computed: {
        mailFilter() {
            let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
            return reg.test(this.userData.email) ? 'el-icon-success' : 'el-icon-error'
        }
    },
    created() {
        this.axios.get('http://localhost:3000/admin/api/isLogin',{
            params:{
                email : localStorage.token
            } 
        }).then(res => {
            if(res.data.login){
                this.$store.commit({ type: 'islogin' })
                if(res.data.vip){
                this.$store.commit({ type: 'isvip' })
                this.$router.push('/')
                }
            }else{
                localStorage.clear()
                this.$store.commit({ type: 'resetState' })
                this.$store.commit({ type: 'changeState', ...res.data.user })
            }
        })
    }
};
</script>
<style lang="less" scoped>
#login {
    position: relative;
    width: 100%;
    height: 100%;
    .wrapper{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .title{
        margin-top: -150px;
        .logo-wrapper{
            margin-bottom: 20px;
            font-size: 0;
            img{
                display: inline-block;
                vertical-align: middle;
                width: 100px;
                height: 100px;
            }
            span{
                vertical-align: middle;
                display: inline-block;
                margin-left: 30px;
                font-size: 2rem;
                font-weight: 700;
            }
        }
        .desc{
            margin-bottom: 50px;
            text-indent: 10px;
            font-size: 1.3rem;
        }
    }
    .login-wrapper{
        .el-input{
            display: block;
            width: 400px;
            margin-bottom: 35px;
        }
        
        .button-wrapper{
            position: relative;
            .forget{
                margin-left: 5px;
                line-height: 40px;
                cursor: pointer;
                color: #409EFF;
            }
            .right{
                position: absolute;
                bottom: 0;  
                right: 0;
            }
        }
    }
    .el-form {
        padding: 0 20px;
        font-size: 1.1em;
    }
    .form-item {
        margin-bottom: 30px;
        &:last-child {
            margin: 0;
        }
        .el-input{
            display: inline-block;
            vertical-align: middle;
            width: 70%;
            margin-left: 20px;
            &.find-password-input {
                width: 65%;
                margin-right: 10px;
            }
        }
        i {
            display: inline-block;
            vertical-align: middle;
            margin-left: 10px;
            font-size: 1.2em;
            &.el-icon-error{
                color: #F56C6C;
            }
            &.el-icon-success {
                color: #409EFF;
            }
        }
    }
    .timer {
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        font-size: 0.9em;
        border-radius: 3px;
        border: 1px solid #F56C6C;
        padding: 5px 10px;
        color: #F56C6C;
    }
}
</style>
