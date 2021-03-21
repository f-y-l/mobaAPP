<template>
    <div id='user-center'>
        <div class='wrapper'>
            <div class='left'>
                <div class='title'>个人信息</div>
                <div class='msg-wrapper'>
                    <div class='name lever msg-item'>
                        <span>{{'账号名：' + user.name}}</span>
                        <span @click="toggleBaseEdit" class='lever-up'>编辑</span>
                    </div>
                    <div class='date msg-item'>{{'简历数量：' + resumeNum}}</div>
                    <div class='lever msg-item'>
                        <span>{{'等级：'+ (user.isVip ? '尊贵会员' : '普通会员')}}</span>
                        <span @click="leverUp" class='lever-up' v-if='!user.isVip'>升级</span>
                    </div>
                </div>
            </div>
            <div class='right'>
                <div class='title-wrapper'>
                    <div class='title'>简历管理中心</div>
                    <div @click="toggleCreate" class='add'>
                        <i class='fa fa-plus'></i>
                        <span>新建简历</span>
                    </div>
                </div>
                <div class='line'></div>
                <div class='content' ref='content' >
                    <div v-if="false" class='none-content'>
                        <i class='fa-folder-open-o fa'></i>
                        <div class='desc'>no file</div>
                    </div>
                    <div v-else class='content-wrapper'>
                        <div class='resume-item1' v-for="(item,index) in resumeData" :key="index">
                            <img class="resume-item-img" :src='"../../common/image/template" + (item.resumeType+1) + ".png"' />
                            <div class='resume-item-body'>
                                <div class='resume-item-name'>{{item.name}}</div>
                                <div class='resume-item-edit'>
                                    <i @click="deleteResume(item._id)" class='fa fa-trash-o'/>
                                    <i @click="editResume(item._id)" class='fa fa-edit'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='pager' v-show='pagelen > 1'>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="1000">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog width='500px' :show-close='false' title="修改用户名称" :visible="isBaseEditShow">
            <el-form :model="userData">
                <div class='form-item'>
                    <span class='label'>填写名称</span>
                    <el-input size='mini' v-model="userName"></el-input>
                </div>
            </el-form> 
            <div slot="footer" class="dialog-footer">
                <el-button @click="toggleBaseEdit">取 消</el-button>
                <el-button type="primary" @click="confirmBase">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog width='500px' :show-close='false' title="填写简历名称" :visible="iscreatResumeShow">
            <el-form>
                <div class='form-item'>
                    <span class='label'>填写名称</span>
                    <el-input size='mini' v-model="resumeName"></el-input>
                </div>
            </el-form> 
            <div slot="footer" class="dialog-footer">
                <el-button @click="toggleCreate">取 消</el-button>
                <el-button type="primary" @click="confirmResume">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userData: {},
            resumeData: [],
            isBaseEditShow: false,
            iscreatResumeShow: false,
            userName: '',
            resumeName: '',
            resumeNum: 0,
            pagelen: 0
        }
    },
    mounted() {
        var height = document.body.clientHeight - 310;
        this.$refs.content.setAttribute('style', 'min-height:' + height + 'px');
    },
    methods: {
        // 删除简历
        deleteResume(resumeId) {
            this.$confirm('是否确定删除该简历?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.axios.get('/resume/deleteResume?resumeId=' + resumeId).then(res => {
                    if (res.data.id !== -1) {
                        this.init()
                        this.notify(res.data.message,'success')
                    } else {
                        this.notify(res.data.message)
                    }
                })
            },() => {
            })
        },
        // 跳转编辑简历页面
        editResume(resumeId) {
            this.axios.get('/resume/resumeDetail?resumeId=' + resumeId).then(res => {
                if (res.data.id !== -1) {
                    this.$store.commit({ type: 'changeAllData',...res.data.data })
                    this.$router.push({ name: 'edit',query: { resumeId } })
                }
            })
        },
        leverUp() {
            this.axios.get('resume/leverUp').then(res => {
                let type = 'warning'
                if (res.data.id !== -1) {
                    this.$store.commit({ type: 'changeState', isVip: true })
                    type = 'success'
                }
                this.notify(res.data.message,type)
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
        toggleBaseEdit() {
            this.isBaseEditShow = !this.isBaseEditShow
        },
        confirmBase() {
            let type = 'warning'
            this.axios.post('resume/editUser',{ name: this.userName }).then(res => {
                if (res.data.id !== -1) {
                    this.$store.commit({ type: 'changeState', name: this.userName })
                    type = 'success'
                }
                this.toggleBaseEdit()
                this.notify(res.data.message,type)
            })
        },
        toggleCreate() {
            this.iscreatResumeShow = !this.iscreatResumeShow
        },
        confirmResume() {
            if (this.resumeName !== '') {
                 this.axios.post('resume/createResume',{ name: this.resumeName }).then(res => {
                     if (res.data.id !== -1) {
                         this.init()
                         this.notify(res.data.message,'success')
                     } else {
                         this.notify(res.data.message)
                     }
                     this.toggleCreate()
                 })
            }
        },
        init() {
            this.axios.get('/resume/getResumes').then(res => {
                if (res.data.id !== -1) {
                    this.resumeData = res.data.data.resumes
                    this.pagelen = res.data.data.pageLen
                    this.resumeNum = res.data.data.resumeNum
                }
            })
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    created() {
        if (!this.user.isLogin) {
            this.$router.push('edit')
        }
        this.init()
    }
}
</script>
<style lang="less" scoped>
#user-center{
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
    .left,.right {
        display: inline-block;
        vertical-align: top;
    }
    .left {
        box-sizing: border-box;
        padding: 50px 20px 50px 40px;
        width: 280px;
        margin-right: 20px;
        box-shadow: 1px 1px 3px #EBEEF5,-1px -1px 3px #EBEEF5;
        border: 1px solid #E4E7ED;
        border-radius: 2px;
        .title{
            display: inline-block;  
            font-size: 1.7rem;
            padding: 15px 0;
            border-bottom: 1px solid #303133;
            margin-bottom: 20px;
        }
        .msg-item {
            font-size: 1.1rem;
            line-height:60px;
        }
        .lever {
            span{
                display: inline-block;
                vertical-align: middle;
                &.lever-up {
                    cursor: pointer;
                    line-height: 20px;
                    margin-left: 10px;
                    font-size: 0.9rem;
                    border: 1px solid #303133;
                    padding: 2px 5px;
                    border-radius: 3px;
                    &:hover {
                        font-weight: 700;
                        border: 2px solid #303133;
                    }
                }
            }

        }
    }
    .right {
        box-sizing: border-box; 
        width: calc(100% - 300px);
        box-shadow: 1px 1px 3px #EBEEF5,-1px -1px 3px #EBEEF5;
        border: 1px solid #E4E7ED;
        border-radius: 2px;
        padding: 50px 40px 50px 40px;
        .title-wrapper{
            font-size: 1.7rem;
            position: relative;
            .add {
                cursor: pointer;
                line-height: 40px;
                position: absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%);
                font-size: 1rem;
                padding: 0 10px;
                height: 40px;
                box-sizing: border-box;
                border: 1px solid #303133;
                box-shadow: 1px 1px 10px #E4E7ED,-1px -1px 10px #E4E7ED;
                border-radius: 20px;
                &:hover{
                    box-shadow: 2px 2px 10px rgb(214, 214, 214),-2px -2px 10px rgb(213, 213, 214);
                }
                i {
                    font-size: 0.9rem;
                    margin-right: 5px;
                }
            }
        }
        .line {
            width: 100%;
            height: 1px;
            margin-top: 20px;
            background: #303133;
        }
        .content {
            position: relative;
            .none-content {
                position: absolute;
                top: 45%;
                left: 50%;
                transform: translate(-50%,-50%);
                color: rgba(228, 226, 226, 1);
                user-select:none;
                i {
                    font-size: 5rem;
                }
                .desc {
                    font-size: 1.8rem;
                }
            }
            .content-wrapper {
                font-size: 0;
                margin-top: 20px;
                .resume-item1 {
                    display: inline-block;
                    width: 25%;
                    box-sizing: border-box;
                    padding: 2%;
                    position: relative;
                    margin-bottom: 20px;
                    &:hover {
                       .resume-item-body {
                           visibility: visible;
                       }
                    }
                    img{
                        display: block;
                        width: 100%;
                    }
                    .resume-item-body {
                        position: absolute;
                        width: 96%;
                        height: 96%;
                        top: 2%;
                        left: 2%;
                        background-color: rgba(0, 0, 0, 0.3);
                         visibility: hidden;
                         .resume-item-name {
                            font-size: 25px;
                            color: #fff;
                            font-weight: 700;
                            border-bottom: 2px solid #fff;
                            padding: 10px 10px;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                         }
                        .resume-item-edit {
                            position: absolute;
                            top: 5px;
                            right: 5px;
                            font-size: 20px;
                            color: #fff;
                            i{
                                margin-left: 10px;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
        .pager {
            text-align: right; 
            .el-pagination {
                display: inline-block;
            }
        }
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
}
</style>
