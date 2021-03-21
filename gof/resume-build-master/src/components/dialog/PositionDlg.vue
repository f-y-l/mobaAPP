<template>
    <div v-if='isShow' id='position-dlg'>
        <el-dialog :show-close='false' width='520px'  :title="'编辑'+this.form.text" :visible="isShow">
            <el-form :model="form">
                <div class='form-item-wrapper' v-for='(item,index) in form.data' :key='index'>
                    <div class='form-item'>
                        <span class='label'>{{item.name}}</span>
                        <el-input size='mini' v-model="item.text"></el-input>
                    </div>
                </div>
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
            type: Boolean,
            default: false
        },
        contentIdx: {
            type: Number
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
            this.form = Object.assign({},this.form,this.deepCopy(this.$store.state.resume.content.mainContent[this.contentIdx]))
        },
        close() {
            this.reset()
            this.$emit('positionDlgColse')
        },
        confirm() {
            let key = false
            for (var item of this.form.data) {
                if (!item.text) {
                    key = true
                    break
                }
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
                this.$store.commit(payload)
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
#position-dlg{
    .el-form{
        .form-item-wrapper{
            padding: 10px 0;
            display: inline-block;
            .form-item{
                display: inline-block;
                margin-left: 20px;
                margin-bottom: 20px;
                .label{
                display: inline-block;
                font-size: 0.8rem;
                width: 60px;
                }
                .el-input{
                    display: inline-block;
                    width: 150px;
                }
            }
        }
    }
}
</style>
