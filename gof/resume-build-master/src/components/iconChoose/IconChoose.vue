<template>
    <el-dialog width='450px'  append-to-body id='icon-choose'  title="选择图标" :visible="iconChooseShow">
        <div class='wrapper'>
            <i @click="itemClick(index)" v-for='(item,index) in data' :key='index' :class='"fa fa-"+ item + (selected === item ? " select" : "")'></i>
        </div>
        <div class='btn-wrapper'>
            <el-button size='mini' @click="close">取 消</el-button>
            <el-button size='mini' type="primary" @click="confirm">发送</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props: {
        iconChooseShow: {
            type: Boolean,
            default: true
        },
        icon: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            data: [
                'user-o','user-circle-o','graduation-cap','location-arrow','calendar',
                'tags','star','envelope-o','phone','birthday-cake',
                'microchip','file-text-o','briefcase','building','money',
                'university','id-badge','thumbs-o-up','trophy','id-card-o',
                'gamepad','heart','map-marker','bicycle','qq',
                'github','android','weixin','apple','eye',
                'bell','female','home','subway','mars',
                'venus','steam','youtube','google','edit'
            ],
            selected: ''
        }
    },
    created() {
        this.selected = this.icon;
    },
    methods: {
        itemClick(idx) {
            this.selected = this.data[idx];
        },
        close() {
            this.$emit('iconChooseClose',this.icon);
        },
        confirm() {
            this.$emit('iconChooseClose',this.selected);
        }
    },
    watch: {
        icon() {
            this.selected = this.icon;
        } 
    }
}
</script>
<style lang="less" scoped>
#icon-choose{
    .wrapper {
        padding: 0 10px 10px 10px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        i{
            flex: 0 0 19%;
            margin-bottom: 20px;
            font-size: 1.3em;   
            text-align: center;
            &.select{
                color: #409EFF;
            }
            &:hover {
                cursor: pointer;
                color: #409EFF;
            }
            
        }
    }
    .btn-wrapper{
        position: absolute;
        bottom: 10px;
        right: 20px;
    }
}
</style>
