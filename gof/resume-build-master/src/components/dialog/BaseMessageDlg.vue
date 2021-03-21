<template>
    <div v-if='isShow' id='base-message-dlg'>
        <el-dialog  width='550px' :show-close='false'  title="编辑基本信息" :visible="isShow">
            <el-form :model="form">
                <div class='form-item'>
                    <span class='label'>{{form.name.name}}</span>
                    <el-input size='mini' v-model="form.name.text"></el-input>
                </div>
                <div class='form-item' v-for='(item,index) in form.data' :key=index >
                    <span class='label'>{{item.name}}</span>
                    <el-input size='mini' v-model="item.text"></el-input>
                </div>
                <div class='form-item-desc'>
                    <span class='label'>{{form.desc.name}}</span>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" size='mini' v-model="form.desc.text"></el-input>
                </div>
                <div class='form-item-custom'>
                    <div class='add-button'><i @click="addCustomItem" class='el-icon-circle-plus'></i>自定义模块</div>
                    <div class='add-item' v-for='(item,index) in form.custom' :key='index'>
                        <el-input placeholder="字段名称" class='add-item-name' size='mini' v-model="item.name"></el-input>
                        <el-input placeholder="请输入字段内容" class='add-item-text' size='mini' v-model="item.text"></el-input>
                        <el-tooltip class="item" effect="dark" content="选择字段图标" placement="top">
                            <div @click="iconChoose2Show(index)" class="custom-icon ">
                                <i :class='"fa fa-" + item.url'></i>
                            </div>
                        </el-tooltip>
                        <i  @click="removeCustomItem" class='el-icon-remove'></i>
                    </div>
                </div>
            </el-form> 
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
            <icon-choose :icon='this.form.custom[chooseIndex].url' :iconChooseShow='iconChooseShow' @iconChooseClose='iconChooseClose' />
        </el-dialog>
    </div>
</template>
<script>
import IconChoose from '../iconChoose/IconChoose'
export default {
    props: {
        isShow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            form: {},
            iconChooseShow: false,
            chooseIndex: 0
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
        addCustomItem() {
            this.form.custom.push({
                name: '',
                text: '',
                url: 'edit'
            })

            this.form = Object.assign({},this.form)
        },
        removeCustomItem(index) {
            this.form.custom.splice(index,1)
            this.form = Object.assign({},this.form)
        },
        close() {
            let newObj = this.deepCopy(this.$store.state.resume.content.baseMessage);
            this.form = Object.assign(this.form, newObj);
            this.$emit('baseMessageDlgColse')
        },
        confirm() {
            let isEmpt = false
            if (this.form.name.text === '' || this.form.desc.text === '') {
                isEmpt = true
            } else {
                for (var item of this.form.data) {
                   if (item.text === '') {
                       isEmpt = true
                       break
                   }
                }
                for (item of this.form.custom) {
                   if (item.text === '') {
                       isEmpt = true
                       break
                   }
                }
            }
            if (!isEmpt) {
                this.$store.commit('changeBaseMessage', this.form)
                this.close()
            } else {
                 this.$notify({
                    title: '警告',
                    message: '部分信息未完善，请完善后再确认',
                    type: 'warning',
                    offset: 100,
                    duration: 1000
                });
            }
        },
        iconChooseClose(choose) {
            this.iconChooseShow = false;
            this.form.custom[this.chooseIndex].url = choose;
        },
        iconChoose2Show(index) {
            this.chooseIndex = index;
            this.iconChooseShow = true;
            console.log(1232);
        }
    },
    created() {
        let newObj = this.deepCopy(this.$store.state.resume.content.baseMessage);
        this.form = Object.assign(this.form, newObj);
    },
    components: {
        IconChoose
    }
}
</script>
<style lang="less" scoped>
#base-message-dlg{

    .el-form{ 
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
            margin-bottom: 20px;
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
        .form-item-custom{
            margin-left: 20px;
            margin-right: 17px;
            .add-button{
                margin-bottom: 15px;
                i{
                    color: #409EFF;
                    margin-right: 10px;
                    cursor: pointer;
                    font-size:1.1rem;
                    vertical-align: middle;
                }
            }
            .add-item{
                position: relative;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                padding-right: 40px;
                margin-bottom: 10px;
                &:last-child{
                    margin-bottom: 0;
                }
                &:hover{
                    .el-icon-remove{
                        visibility: visible;
                    }
                }
                .add-item-name{
                    flex: 0 0 120px;
                    margin-right: 5px;
                }
                .add-item-text{
                    flex: 1;
                    margin-right: 5px;
                }
                .el-button{
                    flex: 0 0 40px;
                }
                .el-icon-remove{
                    visibility: hidden;
                    font-size: 1.1rem;
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    transform: translate(0,-50%);
                    cursor: pointer;
                    color: #F56C6C;
                }
                .custom-icon{
                    position: relative;
                    display: block;
                    flex: 0 0 50px;
                    border: 2px solid #409EFF;
                    border-radius: 4px;
                    cursor: pointer;
                    i{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                        color: #409EFF;
                    }
                }
            }
        }
    }
}
</style>
