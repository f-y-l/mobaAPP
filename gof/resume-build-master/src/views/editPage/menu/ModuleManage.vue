<template>
    <div id='module-manage'>
        <div class='setting-off'>
            <div @click="onHandleClose"><i class="el-icon-arrow-left"></i>关闭</div>
        </div>
        <ul class='selected'>
            <li v-for='(item,index) in selectedModule' :key='index'><i :class='"fa fa-"+item.url'></i><span>{{item.text}}</span><i @click="removeModule(item.text)" :class="item.text==='基本信息'?'el-icon-warning':'el-icon-remove'"></i></li>
        </ul>
        <div class='no-select'>
            <div class='title'>添加其他模块</div>
            <div class='no-select-item' v-for='(item,index) in unSelectModule' :key='index'><i :class='"fa fa-"+item.url'></i><span>{{item.text}}</span><i @click="addModule(item.text)" class="el-icon-circle-plus"></i></div>
        </div>
        <CustomDlg @customDlgColse='customDlgColse'  :isShow='isCustomDlgShow' />
    </div>
</template>
<script>
import CustomDlg from '../../../components/dialog/CustomDlg'
export default {
    data() {
        return {
            modules: [
                {
                    text: '求职意向',
                    url: 'file-text-o'
                },{
                    text: '教育背景',
                    url: 'university'
                },{
                    text: '实习经历',
                    url: 'id-badge'
                },{
                    text: '荣誉奖项',
                    url: 'trophy'
                },{
                    text: '自我评价',
                    url: 'thumbs-o-up'
                },{
                    text: '个人技能',
                    url: 'star'
                },{
                    text: '工作经历',
                    url: 'briefcase'
                },{
                    text: '志愿者经历',
                    url: 'users'
                },{
                    text: '个人标签',
                    url: 'tags'
                },{
                    text: '项目经验',
                    url: 'cubes'
                }
            ],
            modulesMessage: [
                {
                    text: '工作经历',
                    url: 'briefcase ',
                    type: 1,
                    data: [
                        {
                            time: '填写时间',
                            organization: '填写公司名称',
                            position: '填写职位名称',
                            desc: '详细描述你的职责范围，工作任务及取得的成绩，工作经验的时间采取倒叙形式，最近经历写在前面，描述尽量具体简洁，工作经验的描述与目标岗位的招聘要求尽量匹配，用词精确。'
                        }
                    ]
                },{
                    text: '自我评价',
                    url: 'thumbs-o-up',
                    type: 3,
                    desc: '篇幅不要太长，注意简历整体的美观度，应该使用精确简洁的词语表达出自己的长处和优势，切勿夸大其词。'
                },{
                    text: '实习经历',
                    url: 'id-badge',
                    type: 1,
                    data: [
                        {
                            time: '填写时间',
                            organization: '填写公司名称',
                            position: '填写职位名称',
                            desc: '根据实际情况选择，实习经验的时间采取倒叙形式，最近经历写在前面，实现经验的描述与岗位的招聘要求尽量匹配，用词精确，实习成果尽量以数据来呈现，突出个人成果以及做出的贡献，描述尽量具体简洁。'
                        }
                    ]
                },{
                    text: '个人技能',
                    url: 'star',
                    type: 5,
                    data: ['简洁的填写个人技能']
                },{
                    text: '个人标签',
                    url: 'tags',
                    type: 4,
                    data: ['旅游','健身','游戏','动漫','摄影']
                },{
                    text: '求职意向',
                    url: 'file-text-o',
                    type: 0,
                    data: [
                        {
                            name: '岗位意向',
                            text: '岗位意向',
                            url: 'briefcase'
                        }, {
                            name: '意向城市',
                            text: '意向城市',
                            url: 'building'
                        }, {
                            name: '薪资要求',
                            text: '薪资要求',
                            url: 'money'
                        }, {
                            name: '入职时间',
                            text: '入职时间',
                            url: 'calendar'
                        }
                    ]
                },{
                    text: '教育背景',
                    url: 'university',
                    type: 1,
                    data: [
                        {
                            time: '填写时间',
                            organization: '填写大学名称',
                            position: '填写专业名称',
                            desc: '尽量简洁,突出重点，成绩优异的话题写上GPA及排名等信息，如GPA: 3.72/4(专业前十) GRE: 324'
                        }
                    ]
                },{
                    text: '荣誉奖项',
                    url: 'trophy',
                    type: 2,
                    data: [
                        {
                            time: '填写时间',
                            name: '填写奖项名称',
                            lever: '填写奖项等级'
                        }
                    ]
                },{
                    text: '项目经验',
                    url: 'cubes',
                    type: 1,
                    data: [
                        {
                            time: '填写时间',
                            organization: '填写项目名称',
                            position: '填写角色名称',
                            desc: '描述你参加项目负责的工作内容，内容清晰，突出重点，如项目描述、项目职责、项目业绩。'
                        }
                    ]
                },{
                    text: '志愿者经历',
                    url: 'users',
                    type: 1,
                    data: [
                        {
                            time: '填写时间',
                            organization: '填写活动名称',
                            position: '填写角色名称',
                            desc: '根据实际情况选择，如果你的工作经验略显单薄，那么自愿者经验规则能够帮助你在有限的条件下丰富你的简历，使你距离名企更进一步。'
                        }
                    ]
                } 
            ],
            isCustomDlgShow: false
        }
    },
    methods: {
        onHandleClose() {
            this.$emit('onClose')
        },
        removeModule(text) {
            // 特殊情况判断
            if (text === '基本信息') {
                return;
            }
            // confirm
            let isMain = false
            let idx = -1;
            let selctedData = this.$store.state.resume.content;

            for (var i = 0;i < selctedData.otherContent.length;i++) {
                if (selctedData.otherContent[i].text === text) {
                    idx = i
                    break
                }
            }
            if (idx === -1) {
                for (i = 0;i < selctedData.mainContent.length;i++) {
                    if (selctedData.mainContent[i].text === text) {
                        idx = i
                        isMain = true
                        break
                    }
                }
            }

            this.$confirm('是否确定删除该模块?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                let payload = { type: 'remove', isMain, idx };
                this.$store.commit(payload);
                this.$notify({
                    title: '成功',
                    message: '删除成功！',
                    type: 'success',
                    offset: 100,
                    duration: 1000
                });
            })
        },
        addModule(text) {
            if (text === '自定义模块') {
                this.isCustomDlgShow = true
                return
            }
            for (var i = 0;i < this.modulesMessage.length;i++) {
                if (text === this.modulesMessage[i].text) {
                    let payload = {
                        type: 'addModule',
                        data: this.modulesMessage[i]
                    }
                    this.$store.commit(payload);
                    this.$store.commit('changeScrollTop');
                    break
                }
            }
        },
        customDlgColse() {
            this.isCustomDlgShow = false
        }
    },
    computed: {
        selectedModule() {
            let selctedData = this.$store.state.resume.content;
            let selected = [];
            selected.push({
                    text: '基本信息',
                    url: 'user-circle-o'
            });
            for (let { text, url } of selctedData.mainContent) {
                selected.push({ text, url });
            }
            for (let { text, url } of selctedData.otherContent) {
                selected.push({ text, url });
            }
            return selected
        },
        unSelectModule() {
            let unSelect = this.modules.concat();
            for (var i = 0;i < this.selectedModule.length;i++) {
                for (var j = 0;j < unSelect.length;j++) {
                    if (this.selectedModule[i].text === unSelect[j].text) {
                        unSelect.splice(j,1);
                        break;
                    }
                }
            }
            unSelect.push({
                text: '自定义模块',
                url: 'microchip'
            })
            return unSelect;
        }
    },
    components: {
        CustomDlg
    }
}
</script>
<style lang="less">
#module-manage{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background: rgb(240, 240, 240);
    color:#303133;
    font-size: 0.8rem;
    .setting-off{
        position: relative;
        font-size: 1.1rem;
        height: 80px;
        border-bottom: 1px solid #E4E7ED;
        background: #fff;
        div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            cursor: pointer;
            color:#303133;
            i{
                margin-right: 5px;
                font-weight: 700;
            }
            &:hover {
                color: #000;
            }
        }
    }
    .selected{
        background: #fff;
        padding: 15px 0;
        li {
            position: relative;
            line-height: 32px;
            padding-left: 45px;
            padding-right: 20px;
            cursor: pointer;
            &:hover {
                background: rgba(240, 240, 240,0.5);
            }
            &:last-child{
                margin-bottom: 0;
            }
            .fa{
                transform: translate(0,0);
                position: static;
                box-sizing: border-box;
                display: inline-block;
                vertical-align: middle;
                width: 24px;
                height: 24px;
                margin-right: 15px;
                color: #409EFF;
                line-height: 24px;
                border-radius: 12px;
                border: 1px solid #409EFF;
                font-size: 0.80rem;
                text-align: center;
                &:hover{
                    color: #409EFF;
                }
            }
            span{
                display: inline-block;
                vertical-align: middle;
            }
            i {
                box-sizing: border-box;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 40px;
                cursor: pointer;
                font-size:1rem;
                color:#909399;
                &:hover {
                    color: #409EFF;
                }
            }
        }
    }
    .no-select{
        padding: 15px 0;
        .title{
            font-size: 0.75rem;
            margin-left: 15px;
            margin-bottom: 10px;
        }
        .no-select-item{
            position: relative;
            line-height: 32px;
            padding-left: 45px;
            padding-right: 20px;
            cursor: pointer;
            &:hover {
                background: #E4E7ED;
            }
            &:last-child{
                margin-bottom: 0;
            }
            .fa{
                transform: translate(0,0);
                position: static;
                box-sizing: border-box;
                display: inline-block;
                vertical-align: middle;
                width: 24px;
                height: 24px;
                margin-right: 14px;
                color: #909399;
                line-height: 24px;
                border-radius: 12px;
                border: 1px solid #909399;
                font-size: 0.80rem;
                text-align: center;
                
            }
            span{
                display: inline-block;
                vertical-align: middle;
            }
            i {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 40px;
                cursor: pointer;
                font-size:1rem;
                color:#409EFF;
            }
        }
    }
}
</style>
