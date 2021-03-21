<template>
    <div v-if='isShow' id='tag-dlg'>
        <el-dialog :show-close='false' width='480px'  :title="'编辑'+this.form.text" :visible="isShow">
            <div class='add-item'>
                <el-input size='mini' v-model="inputData"></el-input>
                <el-button @click="addItem" size='mini' type="primary">添加</el-button>
            </div>
            <div class='common'>
                <div class='title'>常用标签推荐</div>
                <div class='common-wrapper'>
                    <div @click="addCommonItem(index)" :class='"tag-item " + isSelected(item)' v-for='(item,index) in tagData' :key='index'>
                        <i class="el-icon-plus  "></i>
                        <span>{{tagData[index]}}</span>
                    </div>
                </div>
            </div>
            <div class='tags'>
                <div class='title'>已添加的标签</div>
                <div class='tag-item' v-for='(item,index) in form.data' :key='index'>
                    <span>{{form.data[index]}}</span>
                    <i @click="deleteItem(index)" class="el-icon-remove"></i>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        contentIdx: {
            type: Number
        },
        isMainContent: {
            type: Boolean
        }
    },
    data() {
        return {
            form: {},
            inputData: '',
            tagData: [
                '音乐','电影','阅读','旅游','户外运动',
                '健身','游戏','篮球','羽毛球','摄影',
                '烹饪','爬山','骑行','桌球','英雄联盟',
                '乒乓球','写作','绘画','瑜伽','唱歌',
                '收藏','摇滚','拳击','网球','钓鱼'
            ]
        }
    },
    methods: {
        deepCopy(obj) {
            let newObj = Array.isArray(obj) ? [] : {};
            for (var item in obj) {
                if ((typeof obj[item] === 'function' || typeof obj[item] === 'object') && obj[item] !== null) {
                    newObj[item] = this.deepCopy(obj[item])
                } else {
                    newObj[item] = obj[item];
                }
            }
            return newObj
        },
        reset() {
            if (this.isMainContent) {
                this.form = Object.assign({},this.form,this.deepCopy(this.$store.state.resume.content.mainContent[this.contentIdx]))
            } else {
                this.form = Object.assign({},this.form,this.deepCopy(this.$store.state.resume.content.otherContent[this.contentIdx]))
            }
        },
        close() {
            this.reset()
            this.$emit('tagDlgColse')
        },
        confirm() {
            let payload = {
                    type: 'changeMainContent',
                    data: this.form,
                    idx: this.contentIdx
                }
            if (this.isMainContent) {
                this.$store.commit(payload)
            } else {
                payload.type = 'changeOtherContent'
                this.$store.commit(payload)
            }
            this.close()
        },
        isSelected(value) {
            for (var item of this.form.data) {
                if (value === item) {
                    return 'selected'
                }
            }
            return ''
        },
        addItem() {
            if (!this.inputData) {
                return
            }
            this.form.data.push(this.inputData)
            this.form = Object.assign(this.form)
            this.inputData = ''
        },
        deleteItem(index) {
            this.form.data.splice(index,1)
            this.form = Object.assign(this.form)
        },
        addCommonItem(index) {
            if (!this.isSelected(this.tagData[index])) {
                this.form.data.push(this.tagData[index])
                this.form = Object.assign(this.form)
            }
        }
    },
    created() {
        this.reset()
    },
    watch: {
        isShow() {
            this.reset()
        }
    }
}
</script>
<style lang="less" scoped>
#tag-dlg{
    .title{
        font-size: 0.8rem;
        margin-bottom: 15px;
    }
    .tags{
        padding: 0 20px;
        .tag-item{
            display: inline-block;
            margin-right: 12px;
            margin-bottom: 10px;
            span{
                display: inline-block;
                vertical-align: middle;
                padding: 7px 10px;
                background: #409EFF;
                border-radius: 12px;
                border: 1px solid #F2F6FC;
                font-size: 0.65rem;
                color: #fff;
            }
            i{
                display: inline-block;
                vertical-align: middle;
                margin-left: 5px;
                cursor: pointer;
                color: #F56C6C;
            }
        }
    }
    .add-item{
        padding: 0 20px;
        margin-bottom: 20px;
        .el-input{
            display: inline-block;
            width: 330px;
            margin-right: 10px;
        }
        .el-button{
            display: inline-block;
        }
    }
    .common{
        padding: 0 20px;
        margin-bottom: 15px;
        .common-wrapper{
            padding: 10px 10px 0 10px;
            border: 1px solid #DCDFE6;
        }
        .tag-item{
            display: inline-block;
            margin-right: 15px;
            font-size: 0.65rem;
            margin-bottom: 10px;
            padding: 7px 10px;
            border-radius: 12px;
            border: 1px solid #E4E7ED;
            cursor: pointer;
            &.selected{
                background-color: #409EFF;
                color: #fff;
            }
            i{
                margin-right: 2px;
            }
        }
    }
}
</style>
