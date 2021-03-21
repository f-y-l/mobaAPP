<template>
    <div v-if='isShow' id='award-dlg'>
        <el-dialog width='550px' :show-close='false'  :title="'编辑'+this.form.text" :visible="isShow">
            <el-form :model="form">
                <div class='add-item'><i @click="addItem" class="el-icon-circle-plus"></i><span>添加新项目</span></div>
                <div class='form-item-wrapper' v-for='(item,index) in form.data' :key='index'>
                    <div class='form-item'>
                        <span class='label'>填写时间</span>
                        <el-input size='mini' v-model="item.time"></el-input>
                    </div>
                    <div class='form-item'>
                        <span class='label'>填写级别</span>
                        <el-input size='mini' v-model="item.lever"></el-input>
                    </div>
                    <div class='form-item more'>
                        <span class='label'>填写名称</span>
                        <el-input size='mini' v-model="item.name"></el-input>
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
            type: Boolean
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
            this.$emit('awardDlgColse')
        },
        addItem() {
            this.form.data.push({
                time: '',
                name: '',
                lever: ''
            })
            this.form = Object.assign(this.form)
        },
        deleteItem(idx) {
            this.form.data.splice(idx,1)
            this.form = Object.assign(this.form)
        },
        confirm() {
            let key = false
            for (var item of this.form.data) {
                if (!item.time || !item.name || !item.lever) {
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
#award-dlg{
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
           &.more{
               margin-bottom: 0;
               .el-input {
                   width: 220px;
               }
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
