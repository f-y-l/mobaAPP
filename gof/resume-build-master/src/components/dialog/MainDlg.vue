<template>
    <div v-if='isShow' id='main-content-dlg'>
        <el-dialog width='550px' :show-close='false'  :title="'编辑'+this.form.text" :visible="isShow">
            <el-form :model="form">
                <div class='add-item'><i @click="addItem" class="el-icon-circle-plus"></i><span>添加新项目</span></div>
                <div class='form-item-wrapper' v-for='(item,index) in form.data' :key='index'>
                    <div class='form-item'>
                        <span class='label'>填写时间</span>
                        <el-input size='mini' v-model="item.time"></el-input>
                    </div>
                    <div class='form-item'>
                        <span class='label'>填写名称</span>
                        <el-input size='mini' v-model="item.organization"></el-input>
                    </div>
                    <div class='form-item'>
                        <span class='label'>填写角色</span>
                        <el-input size='mini' v-model="item.position"></el-input>
                    </div>
                    <div class='form-item-desc'>
                        <span class='label'>详细描述</span>
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" size='mini' v-model="item.desc"></el-input>
                    </div>
                    <div v-if='index!==0' @click="deleteItem(index)" class='delete-btn'><i class='fa fa-trash-o'></i></div>
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
        close() {
            this.reset()
            this.$emit('mainDlgColse')
        },
        confirm() {
            let key = false
            for (var item of this.form.data) {
                if (!item.time || !item.organization || !item.position || !item.desc) {
                    key = true
                    break;
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

        },
        reset() {
            this.form = Object.assign({},this.form,this.deepCopy(this.$store.state.resume.content.mainContent[this.contentIdx]))
        },
        addItem() {
            this.form.data.push({
                time: '',
                organization: '',
                position: '',
                desc: ""
            })
            this.form = Object.assign({},this.form)
        },
        deleteItem(index) {
            this.form.data.splice(index,1)
            this.form = Object.assign({},this.form)
        }
    },
    watch: {
        contentIdx() {
            this.reset()
        }
  },
    created() {
        this.reset();
    }
}
</script>
<style lang="less" scoped>
#main-content-dlg{
    .el-form{
        .form-item-wrapper{
            position: relative;
            padding: 20px 0;
            box-sizing: border-box;
            border: 1px dashed rgba(0,0,0,0);
            &:hover{
                border: 1px dashed #00c091;
                .delete-btn{
                    visibility: visible;
                }
            }
        }
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
        .form-item-desc{
            margin-left: 20px;
           .label{
               vertical-align: top;
               display: inline-block;
               font-size: 0.8rem;
               width: 60px;
           }
           .el-textarea {
               display: inline-block;
               width: 380px;
           }
        }
        .delete-btn{
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.2rem;
            color:  red;
            visibility: hidden;
            cursor: pointer;
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
