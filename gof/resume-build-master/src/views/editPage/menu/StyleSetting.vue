<template>
    <div id='style-setting'>
        <div class='setting-off'>
            <div @click="onHandleClose"><i class="el-icon-arrow-left"></i>关闭</div>
        </div>
        <div class='color-setting'>
            <div class='title'>颜色</div>
            <ul>
                <li @click="mainColor=item" :class='mainColor===item?"active":""' v-for='(item,index) in color' :key='index' :style="{'background-color': item}" ></li>
            </ul>
        </div>
        <div class='font-setting'>
            <div class='title'>{{'字体: ' + fontFamliy}}</div>
            <el-select  size='mini'  v-model="fontFamliy" placeholder="请选择">
                <el-option
                    v-for="item in fontEN"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
            </el-select>
            <div class='title title1'>{{'字体大小: ' + fontSize}}</div>
            <el-select  size='mini'  v-model="fontSize" placeholder="请选择">
                <el-option
                    v-for="(item,index) in options"
                    :key="item"
                    :label="item"
                    @change="fontChange(index)"
                    :value="item">
                </el-option>
            </el-select>
        </div>
        <div class='text-setting'>
            <div class='title'>行间距</div>
            <el-slider v-model="lineHeight" :min='15' :max='40'  :step="2"></el-slider>
            <div class='title title1' >模块间距</div>
            <el-slider v-model="moduleSize" :min='10' :max='40' :step="2"></el-slider>
        </div>
        <div class='default-setting'>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: ['12','13','14','15','16','17','18'],
            color: ['#0B70BD','#254665','#00C091','#FF7171','#37B754',
                    '#E6A23C','#EE7000','#A29177','#DA180F','#6B4B24',
                    '#648BB3','#597404','#9D57CA','#D4BA38','#69CC41'],
            font: ['微软雅黑','黑体','宋体'],
            fontEN: ['Microsoft YaHei','SimHei','SimSun']
        }
    },
    computed: {
        fontSize: {
            get() {
                return parseInt(this.$store.state.resume.style.fontSize)
            },
            set(val) {
                let payload = { type: 'changeStyle', fontSize: val + 'px' };
                this.$store.commit(payload);
            }
        },
        mainColor: {
            get() {
                return this.$store.state.resume.style.color
            },
            set(val) {
                let payload = { type: 'changeStyle', color: val };
                this.$store.commit(payload);
            }
        },
        moduleSize: {
            get() {
                return parseInt(this.$store.state.resume.style.moduleSize)
            },
            set(val) {
                let payload = { type: 'changeStyle', moduleSize: val + 'px' };
                this.$store.commit(payload);
            }
        },
        lineHeight: {
            get() {
                return parseInt(this.$store.state.resume.style.lineHeight)
            },
            set(val) {
                let payload = { type: 'changeStyle', lineHeight: val + 'px' };
                this.$store.commit(payload);
            }
        },
        fontFamliy: {
            get() {
                return this.$store.state.resume.style.fontFamliy
            },
            set(val) {
                let payload = { type: 'changeStyle', fontFamliy: val };
                this.$store.commit(payload);
            }
        }
    },
    methods: {
        onHandleClose() {
            this.$emit('onClose')
        },
        fontChange(idx) {
            this.fontSelect = idx
            let payload = { type: 'changeStyle', fontFamliy: this.fontEN[idx] };
            this.$store.commit(payload);
        }
    }
}
</script>
<style lang="less">
#style-setting{
    box-sizing: border-box;
    padding: 0 25px;
    &>div {
        border-bottom: 1px dashed #DCDFE6;
    }
    .setting-off{
        position: relative;
        font-size: 1.1rem;
        height: 80px;
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
    .el-select{
        width: 100%;
    }
    .title{
        padding-top: 18px;
        padding-bottom: 12px;
        color: #303133;
        font-size: 0.8rem;
        &.title1{
            padding: 15px 0 10px 0;
        }
    }
    .color-setting{
        ul{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            padding-bottom: 10px;
            li {
                box-sizing: border-box;
                flex: 0 0 30px;
                margin-bottom: 5px;
                height: 30px;
                cursor: pointer;
                &:hover,&.active{
                    border: 2px solid #303133;
                }
            }
        }
    }
    .font-setting,.text-setting,.default-setting{
        padding-bottom: 15px;
    }
    .el-slider{
        height: 28px;
    }
    .default-setting{
        border: none;
        .defalut-btn{
            padding-top: 18px;
            padding-bottom: 12px;
            color: #303133;
            font-size: 1rem;
            i{
                margin-left: 5px;
                // font-size: 0.9rem;
                font-weight: 700;
                color:#909399;
                &:hover{
                    color: #409EFF;
                }
            }
        }
        .desc{
            font-size: 0.7rem;
            color: #909399;
        }
    }
}
</style>
