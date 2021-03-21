<template>
    <div id='aside-menu'>
        <div class='save'><div  @click="save"><img src='./image/save.png'/><span >保存</span></div></div>
        <ul class='menu'>
            <li><img src="./image/mode.png" /><span @click="handleChangeSetting(0)">模块管理</span></li>
            <li><img class='small' src="./image/template.png"/><span @click="handleChangeSetting(1)">更换模板</span></li>
            <li><img src="./image/style.png"/><span @click="handleChangeSetting(2)">风格设置<img v-if='!user.isVip' class='lock' src='./image/lock.png' /></span></li>
            <li><img src='./image/download.png' /><span @click="printPDF">下载简历</span><img  v-if='!user.isVip' class='lock' src='./image/lock.png' /></li>
        </ul>
        <div class='evaluate'>
            <div class='desc'>查看简历是否有内容未完善，尽量完成到100%哦！</div>
        </div>
        <transition name='setting'>
            <div class="setting" v-show='settingShow'>
                <component :is='settingItems[settingItemIdx]' @onClose='onClose'></component>
            </div>
        </transition>
    </div>
</template>
<script>
import StyleSetting from './StyleSetting.vue'
import ModuleManage from './ModuleManage.vue'
import ChangeTemplate from './ChangeTemplate.vue'
export default {
    data() {
        return {
            settingItems: ['ModuleManage','ChangeTemplate','StyleSetting'],
            settingItemIdx: 0,
            settingShow: false
        }
    },
    methods: {
        printPDF() {
            if (this.isNoUser() || this.isNoVip()) {
                return
            }
            // 获取到页面html
            var bdhtml = window.document.body.innerHTML

            // 找到两个标签
            var sprnstr = "<object"
            var eprnstr = "</object>"

            // 切除标签以外的东西
            var begin = bdhtml.indexOf(sprnstr);
            while (true) {
                if (bdhtml[begin] === '>') {
                    break;
                }
                begin++;
            }
            var prnhtml = bdhtml.substr(begin + 1)
            prnhtml = prnhtml.substring(0,prnhtml.indexOf(eprnstr))

            // 替换body的内容
            window.document.body.innerHTML = prnhtml

            // 设置分页
            let height = window.document.body.children[0].clientHeight
            height = 1160 * parseInt(height / 1160) + (height % 1160 !== 0 ? 1160 : 0) 
            window.document.body.children[0].style.height = height + 'px'

            // 打印
            window.print()
            // 将页面重新改回原始样式
            window.document.body.innerHTML = bdhtml
            // 此处是业务需要 由于有动态生成数据 直接返回样式会乱 所以手动刷新了一下
            window.location.reload()
        },
        onClose() {
            this.settingShow = false
        },
        handleChangeSetting(index) {
            const SETSTYLE = 2
            const DOWNLOAD = 3
            if ((index === SETSTYLE || index === DOWNLOAD) && (this.isNoUser() || this.isNoVip())) {
                return
            }
            this.settingItemIdx = index
            this.settingShow = true
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
        save() {
            if (!this.isNoUser()) {
                if (this.$route.query.resumeId !== undefined) {
                    this.axios.post('/resume/saveEdit', { resumeId: this.$route.query.resumeId,data: this.$store.state.resume }).then(res => {
                        if (res.data.id !== -1) {
                            this.notify(res.data.message,'success')
                        } else {
                            this.notify(res.data.message)
                        }
                    })
                } else {
                    this.notify('请到个人中心选择简历进行编辑')
                }
            }
        },
        // 用户未登录
        isNoUser() {
            if (this.user.isLogin) {
                return false
            } else {
                this.notify('请先登录')
                return true
            }
        },
        // 不是vip用户
        isNoVip() {
            if (this.user.isVip) {
                return false
            } else {
                this.notify('请到个人中心升级权限')
                return true
            }
        }

    },
    components: {
        StyleSetting,
        ModuleManage,
        ChangeTemplate
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    }
}
</script>
<style lang="less" >
#aside-menu{
    position: relative;
    height: 100%;
    color: #303133;
    .save{
        position: relative;
        width: 100%;
        height: 120px;
        border-bottom: 1px solid #DCDFE6;
        &>div {
            cursor: pointer;
        }
        div{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%)
        }
        img{
            display: inline-block;
            margin-right: 15px;
            width: 35px;
            height: 35px;
            vertical-align: middle;
        }
        span{
            vertical-align: middle;
            display: inline-block;
            padding: 5px 12px;
            border-radius: 14px;
            border: 1px solid #606266;
            font-size: 1rem;
            cursor: pointer;
            &:hover{
                border: 1px solid #434344;
                font-weight: 700;
            }
        }
    }
    .menu{
        margin-top: 40px;
        li{
            position: relative;
            display: block;
            line-height: 55px;
            text-align: center;
            img {
                display: inline-block;
                width: 25px;
                height: 25px;
                vertical-align: middle;
                margin-right: 10px;
                &.small{
                    width: 20px;
                    height: 20px;
                }
                &.lock{
                    position: absolute;
                    top: 50%;
                    right: 12%;
                    transform: translateY(-50%);
                    width: 22px;
                    height: 22px;
                }
            }
            span {
                display: inline-block;
                vertical-align: middle;
                cursor: pointer;
                &:hover{
                    // font-weight: 700;
                    color: #000;
                }
            }
        }
    }
    .evaluate{
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        padding-top: 20px;
        border-top: 1px solid #DCDFE6;
        text-align: center;
        .el-progress{
            margin: 0 auto;
            margin-top: 20px;
            margin-bottom: 20px;
            width: 80%;
        }
    }
    .desc{
        padding: 0 20px;
        line-height: 20px;
        text-align: left;
        font-size: 0.8rem;
        color: #C0C4CC;

    }
    .setting{
        position: absolute;
        overflow-y: hidden;
        overflow-x: hidden;
        width: 90%;
        min-height: 94%;
        top: 5%;
        left: 0;
        border: 1px solid #E4E7ED;
        box-shadow: 1px 1px 3px #EBEEF5,-1px -1px  3px #EBEEF5;
        background: #fff;
    }
    .setting-enter,.setting-leave-to {
        left: -90%;
    }
    .setting-enter-to,.setting-leave {
        left: 0;
    }
    .setting-enter-active,.setting-leave-active{
        transition: 350ms left ease;
    }
}
</style>
