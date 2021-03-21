<template>
    <div id='change-template'>
        <div class='setting-off'>
            <div @click="onHandleClose"><i class="el-icon-arrow-left"></i>关闭</div>
        </div>
        <div class='content'>
            <div class='template' v-for="(item,index) in 9" :key='index'>
                <img :src='"../../../common/image/template" + (index+1) + ".png"' />
                <div @click="changeTemplate(index)" class='cover'>
                    <i class='el-icon-edit'></i>
                    <span>替换模板</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            templates: [
            ]
        }
    },
    computed: {
      resumeType() {
          return this.$store.state.resume.resumeType;
      }
  },
    methods: {
        onHandleClose() {
            this.$emit('onClose')
        },
        changeTemplate(idx) {
            if (this.resumeType === idx) {
                return
            }

            let payload = { type: 'changeTemplate', templateId: idx }
            this.$store.commit(payload)

            this.$notify({
                title: '成功',
                message: '模板替换成功！',
                type: 'success',
                offset: 100,
                duration: 1000
            });
        }
        
    }
}
</script>
<style lang="less">
#change-template{
    max-height: 100%;
    overflow: hidden;
    .setting-off{
        position: relative;
        font-size: 1.1rem;
        height: 80px;
        border-bottom: 1px solid #E4E7ED;
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
    .content {
        position: absolute;
        top: 81px;
        left: 0;
        width: 100%;
        height: 90%;
        overflow-y: scroll;
        overflow-x: hidden;
        box-sizing: border-box;
        padding: 20px 0;
        .template{
            position: relative;
            box-sizing: border-box;
            margin: 0 auto;
            padding: 5px 3px;
            border: 1px solid #E4E7ED;
            box-shadow: 1px 1px 3px #EBEEF5,-1px -1px 3px #EBEEF5;
            margin-bottom: 15px;
            width: 126px;
            &:hover{
                .cover{
                    display: block;
                }
            }
            img {
                box-sizing: border-box;
                display: block;
                width: 120px;
            }
        }
        .cover{
            position: absolute;
            top: 0;
            left: 0;
            display: none;
            width: 100%;
            height: 100%;
            background: rgba(213,213,213,0.5);
            z-index: 1;
            i{
                cursor: pointer;
                box-sizing: border-box;
                display: block;
                margin: 0 auto;
                margin-top: 60px;
                width: 44px;
                line-height: 40px;
                border: 2px dashed #909399;
                border-radius: 22px;
                font-size: 1.5rem;
                text-align: center;
            }
            span{
                cursor: pointer;
                display: block;
                text-align: center;
                margin-top: 15px;
                font-size: 0.8rem;
            }
        }
    }
}
</style>
