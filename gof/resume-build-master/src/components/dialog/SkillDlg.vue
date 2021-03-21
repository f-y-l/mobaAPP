<template>
    <div v-if='isShow' id='skill-dlg'>
        <el-dialog  :show-close='false' width='510px'  :title="'编辑'+this.form.text" :visible="isShow">
            <el-form :model="form">
                <div class='add-item'><i @click="addItem" class="el-icon-circle-plus"></i><span>添加新项目</span></div>
                <div class='form-item-wrapper' v-for='(item,index) in form.data' :key='index'>
                    <div class='form-item'>
                        <i class='fa fa-circle-o'></i>
                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 5}" size='mini' v-model="form.data[index]"></el-input>
                        <div v-if='index!==0' @click="deleteItem(index)" class='delete-btn'><i class='fa fa-trash-o'></i></div>
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
            this.$emit('skillDlgColse')
        },
        confirm() {
            let key = false
            for (var item of this.form.data) {
                if (!item) {
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
                if (this.isMainContent) {
                    this.$store.commit(payload)
                } else {
                    payload.type = 'changeOtherContent'
                    this.$store.commit(payload)
                }
                this.close()
            }
        },
        addItem() {
            this.form.data.push('')
            this.form = Object.assign(this.form)
        },
        deleteItem(index) {
            this.form.data.splice(index,1)
            this.form = Object.assign(this.form)            
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
#skill-dlg{
    .el-form{
        .form-item-wrapper{
            position: relative;
            padding: 12px 0;
            box-sizing: border-box;
            .form-item{

                display: inline-block;
                margin-left: 20px;
                &:hover{
                .delete-btn{
                    visibility: visible;
                    }
                }
                i{
                    vertical-align: middle;
                    display: inline-block;
                    font-size: 0.8rem;
                    margin-right: 10px;
                }
                .el-textarea {
                    vertical-align: middle;
                    display: inline-block;
                    width: 380px;
                }
                .delete-btn{
                    display: inline-block;
                    vertical-align: middle;
                    color:red;
                    visibility: hidden;
                    cursor: pointer;
                    margin-left: 15px;
                    i {
                        font-size: 1.1rem;
                    }
                }
            }
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
