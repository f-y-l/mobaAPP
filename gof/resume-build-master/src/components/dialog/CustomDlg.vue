<template>
    <div v-if='isShow' id='custom-dlg'>
        <el-dialog :show-close='false'  width='450px'  title="编辑自定义模块信息" :visible="isShow">
            <div class='title'>模块名称</div>
            <el-radio-group v-model="form.type">
                <el-radio :label="3">简单文本信息</el-radio>
                <el-radio :label="5">列表类型信息</el-radio>
                <el-radio :label="1">复杂文本信息</el-radio>
            </el-radio-group>
            <div class='form-item'>
                <span class='label'>模块名称</span>
                <el-input size='mini' v-model="form.text"></el-input>
            </div>
            <div class='form-item'>
                <span class='label'>模块图标</span>
                <el-tooltip class="item" effect="dark" content="选择字段图标" placement="top">
                    <div @click="iconChoose2Show" class="custom-icon ">
                        <i :class='"fa fa-" + form.url'></i>
                    </div>
                </el-tooltip>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
            <icon-choose :icon=' form.url' :iconChooseShow='iconChooseShow' @iconChooseClose='iconChooseClose' />
        </el-dialog>
    </div>
</template>
<script>
import IconChoose from '../iconChoose/IconChoose.vue';
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
            form: {
                type: 1,
                text: '自定义模块',
                url: 'microchip',
                data: ''
            },
            iconChooseShow: false
        }
    },
    components: {
        IconChoose
    },
    methods: {
        close() {
            this.$emit('customDlgColse')
        },
        confirm() {
            if (this.form.type === 1) {
                this.form.data = [{
                    time: '',
                    organization: '',
                    position: '',
                    desc: ''
                }]
            } else if (this.form.type === 5) {
                this.form.data = []
            }
            let payload = {
                type: 'addModule',
                data: this.form
            }
            this.$store.commit(payload)
            this.close()
        },
        iconChooseClose(val) {
            this.form.url = val;
            this.iconChooseShow = false;
        },
        iconChoose2Show() {
            this.iconChooseShow = true;
        }
    }
}
</script>
<style lang="less" scoped>
#custom-dlg{
   .title{
       font-size: 1rem;
       margin-left: 40px;
       margin-bottom: 15px;
   }
    .el-radio-group{ 
        display: block;
        margin-bottom: 20px;
        .el-radio{
            display: block;
            line-height: 20px;
            margin-left: 40px;
            margin-bottom: 10px;
            font-size: 1.1rem;
            
        }
    }
    .form-item{
        display: inline-block;
            margin-left: 40px;
            margin-bottom: 20px;
            .label{
               display: block;
               font-size: 1rem;
               margin-right: 10px;
               margin-bottom: 15px;
            }
           .el-input{
               display: block;
               width: 200px;
           }
           .item{
               display: inline-block;
                i{
                    display: inline-block;
                    padding: 7px 15px;
                    border-radius: 5px;
                    text-align: center; 
                    border: 1px solid #DCDFE6;
                    background: #409EFF;
                    color: #fff;
                }
           }
    }

}
</style>
