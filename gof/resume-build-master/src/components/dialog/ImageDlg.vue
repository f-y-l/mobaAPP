<template>
    <div v-if='isShow' id='award-dlg'>
        <el-dialog width='500px' :show-close='false'  title="编辑图片" :visible="isShow">
              <el-upload
                class="upload-demo"
                action="resume/photo"
                :on-success = 'uploadAfter'
                :file-list="fileList2"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload>
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
            form: {},
            imageUrl: '',
            fileList2: []
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
            this.$emit('ImageDlgColse')
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
          this.$emit('getImage',this.imageUrl)
          this.$emit('ImageDlgColse')
        },
        uploadAfter(res) {
          console.log(res)
          if (res.id !== -1) {
            this.imageUrl = res.imageUrl
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
