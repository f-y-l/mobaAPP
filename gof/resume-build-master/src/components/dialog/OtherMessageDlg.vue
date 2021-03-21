<template>
    <div v-if='isShow' id='other-message-dlg'>
        <el-dialog  :show-close='false' width='450px'  :title="'编辑'+form.text" :visible="isShow">
            <el-form :model="form">
                <el-input type="textarea" :autosize="{ minRows: 6}" size='mini' v-model="form.data"></el-input>
            </el-form> 
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
            type: Boolean
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
            form: {}
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
            this.$emit('otherMessageDlgColse')
        },
        confirm() {
            let key = false
            if (!this.form.data) {
                key = true
            }
            if (key) {
                this.$notify({
                    title: '警告',
                    message: '部分信息未完善，请完善后再确认',
                    type: 'warning',
                    offset: 100,
                    duration: 1000
                });
            } else {
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
#other-message-dlg{
    .el-form{
        .form-item-wrapper{
            position: relative;
            padding: 20px 0;
            box-sizing: border-box;
        }
    }
    .add-item{
        margin-bottom: 10px;
        font-size: 1rem;
        i{
            margin-right: 5px;
            cursor: pointer;
            color: #00c091;
        }
    }
}
</style>
