<template>
    <object class = "resume">
        <div ref='resume' :style="{ fontFamily: resumeData.style.fontFamliy }"  class='resume-item'>
            <div  class='resume-head'>
              <div :style="'background: ' + baseColor" class='resume-avatar-wrapper'>
                <img v-if="resumeData.content.baseMessage.avatar" :src='resumeData.content.baseMessage.avatar' />
                <img v-else src='./avatar.jpg' />
                <div class='edit-btn'>
                    <i @click="upImage" class='fa fa-pencil'></i>
                </div>
              </div>
              <div :style="'background: ' + resumeData.style.color" class='base-msg-warpper'>
                <div class='resume-name-wrapper'>
                  <div class='resume-name'>{{resumeData.content.baseMessage.name.text}}</div>
                  <div  :style="{fontSize: resumeData.style.fontSize}" class='resume-desc'>{{resumeData.content.baseMessage.desc.text}}</div>
                  <div class='msg-body'>
                    <span v-for="(item1,index1) in resumeData.content.baseMessage.data" :key='index1'>
                      <i class='split' v-if='index1 !== 0'></i>
                      <span  :style="{fontSize: resumeData.style.fontSize}">{{item1.text}}</span>
                    </span>
                  </div>
                  <div class='edit-btn'>
                      <i @click="isBaseMessageDlgShow=true" class='fa fa-pencil'></i>
                  </div>
                </div>
              </div>
            </div>
            <div class='resume-body'>
                <div
                  @dragstart='dragStartMain($event,index,item.type)'
                  @dragover='dragover'
                  @drop='dropMain($event,index)'
                  draggable=true  
                  :style='{
                    paddingTop:resumeData.style.moduleSize,
                    paddingBottom: resumeData.style.moduleSize,
                  }'
                  class='resume-msg-item' v-for='(item,index) in resumeData.content.mainContent' :key='index'>
                  <div :style="'color: ' + resumeData.style.color" class='msg-title'><span :style="'border: 2px solid ' + resumeData.style.color ">{{item.text}}</span></div>
                  <div class='msg-body-wrapper'>
                    <div class='msg-body0' v-if='item.type === 0'>
                      <div class='msg-body0-item' v-for="(item1,index1) in item.data" :key='index1'>
                        <i :class='"fa fa-" + item1.url' />
                        <span  :style="{fontSize: resumeData.style.fontSize}">{{item1.text}}</span>
                      </div>
                    </div>
                    <div class='msg-body1' v-else-if='item.type === 1'>
                        <div class='msg-body1-item' v-for='(item1,index1) in item.data' :key="index1">
                            <div class='body-title'>
                                <div class='body-title-item'>{{item1.time}}</div>
                                <div class='body-title-item'>{{item1.organization}}</div>
                            </div>
                            <div class='body-title-item'>{{item1.position}}</div>
                            <div  :style="{fontSize: resumeData.style.fontSize,lineHeight: resumeData.style.lineHeight}"  class='body-content'>{{item1.desc}}</div>
                        </div>
                    </div>
                    <div :style="{fontSize: resumeData.style.fontSize}" class='msg-body2' v-else-if='item.type === 2'>
                        <div class='msg-body2-item' v-for='(item1,index1) in item.data' :key='index1'>
                            <span class='time'>{{item1.time}}</span>
                            <span class='name'>{{item1.name}}</span>
                            <span class='lever'>{{item1.lever}}</span>
                        </div>
                    </div>
                    <div class='msg-body3' :style="{fontSize: resumeData.style.fontSize,lineHeight: resumeData.style.lineHeight}"  v-else-if='item.type === 3'>{{item.data}}</div>
                    <div class='msg-body4' v-else-if='item.type === 4'>
                        <span class='msg-body4-item' :style="{fontSize: resumeData.style.fontSize}" v-for="(item1,index1) in item.data" :key=index1>{{item1}}
                        </span>
                    </div>
                    <ul class='msg-body5' v-else-if='item.type === 5'>
                      <li class='msg-body5-item' :style="{fontSize: resumeData.style.fontSize,lineHeight: resumeData.style.lineHeight}" v-for="(item1,index1) in item.data" :key='index1'>
                        {{item1}}
                      </li>
                    </ul>
                  </div>
                  <div class='edit-btn'>
                      <i @click="removeContent(true,index)" class='fa fa-trash-o'></i>             
                      <i class='fa fa-arrows'></i>
                      <i @click='eidtMainContent(item.type,index,true)'  class='fa fa-pencil'></i>
                  </div>
                </div>
                <div
                  @dragstart='dragStartOther($event,index,item.type)'
                  @dragover='dragover'
                  @drop='dropOther($event,index)'
                  draggable=true
                  :style='{
                    paddingTop:resumeData.style.moduleSize,
                    paddingBottom: resumeData.style.moduleSize,
                  }'
                  class='resume-msg-item' v-for='(item,index) in resumeData.content.otherContent' :key='index+100'>
                  <div :style="'color: ' + resumeData.style.color" class='msg-title'><span :style="'border: 2px solid ' + resumeData.style.color ">{{item.text}}</span></div>
                  <div class='msg-body-wrapper'>
                    <div class='msg-body3' :style="{fontSize: resumeData.style.fontSize,lineHeight: resumeData.style.lineHeight}"  v-if='item.type === 3'>{{item.data}}</div>
                    <div class='msg-body4' v-else-if='item.type === 4'>
                        <span class='msg-body4-item' :style="{fontSize: resumeData.style.fontSize}" v-for="(item1,index1) in item.data" :key=index1>{{item1}}
                        </span>
                    </div>
                    <ul class='msg-body5' v-else-if='item.type === 5'>
                      <li class='msg-body5-item' :style="{fontSize: resumeData.style.fontSize,lineHeight: resumeData.style.lineHeight}" v-for="(item1,index1) in item.data" :key='index1'>
                        {{item1}}
                      </li>
                    </ul>
                  </div>
                  <div class='edit-btn'>
                      <i @click="removeContent(false,index)" class='fa fa-trash-o'></i>             
                      <i class='fa fa-arrows'></i>
                      <i @click='eidtMainContent(item.type,index,false)'  class='fa fa-pencil'></i>
                  </div>
                </div>
            </div>
        </div>
        <div class='edit-dlgs'>
          <BaseMessageDlg @baseMessageDlgColse='baseMessageDlgClose' :isShow='isBaseMessageDlgShow' />
          <MainDlg @mainDlgColse='mainDlgColse' :isShow='isMainDlgShow' :contentIdx='mainContentIdx' />
          <AwardDlg @awardDlgColse='awardDlgColse' :isShow='isAwardDlgShow' :contentIdx='mainContentIdx' />
          <PositionDlg @positionDlgColse='positionDlgColse' :isShow='isPositionDlgShow' :contentIdx='mainContentIdx' />
          <SkillDlg @skillDlgColse='skillDlgColse' :isMainContent='isMainContent' :isShow='isSkillDlgShow' :contentIdx='mainContentIdx' />
          <OtherMessageDlg @otherMessageDlgColse='otherMessageDlgColse' :isMainContent='isMainContent' :isShow='isOtherContent' :contentIdx='mainContentIdx' />
          <TagDlg @tagDlgColse='tagDlgColse' :isMainContent='isMainContent' :isShow='isTagshow' :contentIdx='mainContentIdx' />
          <ImageDlg @ImageDlgColse='ImageDlgColse' @getImage='getImage' :isShow='isImageshow'/>
        </div>
    </object>
</template>
<script>
import BaseMessageDlg from '../../../components/dialog/BaseMessageDlg.vue'
import MainDlg from '../../../components/dialog/MainDlg.vue'
import AwardDlg from '../../../components/dialog/AwardDlg.vue'
import PositionDlg from '../../../components/dialog/PositionDlg.vue'
import SkillDlg from '../../../components/dialog/SkillDlg.vue'
import OtherMessageDlg from '../../../components/dialog/OtherMessageDlg.vue'
import TagDlg from '../../../components/dialog/TagDlg.vue'
import ImageDlg from '../../../components/dialog/ImageDlg'
import Color from 'color'
export default {
  data() {
    return {
      data: [],
      isBaseMessageDlgShow: false,
      isMainDlgShow: false,
      isAwardDlgShow: false,
      isPositionDlgShow: false,
      isSkillDlgShow: false,
      isOtherContent: false,
      isTagshow: false,
      isImageshow: false,
      mainContentIdx: 0,
      isMainContent: true
    };
  },
  methods: {
    dragStartMain(e, start,type) {
      let data = {
        start,
        isMain: true,
        type
      }
      JSON.stringify(data)
      e.dataTransfer.setData("start", JSON.stringify(data));
    },
    dropMain(e, end) {
      let payload = { end, type: "move" };
      let data = JSON.parse(e.dataTransfer.getData("start"));
      if (data.isMain) {
        payload.start = data.start
        this.$store.commit(payload);
      } else {        
        payload.type = 'addModule2'
        payload.idx = end
        payload.isMain = !data.isMain
        payload.data = this.resumeData.content.otherContent[data.start]

        this.$store.commit({ type: 'remove', isMain: data.isMain, idx: data.start })
        this.$store.commit(payload)
      }
      this.$notify({
            title: '成功',
            message: '移动成功！',
            type: 'success',
            offset: 100,
            duration: 1000
      });
    },
    dragover(e) {
      e.preventDefault();
    },
    setDrag(index) {
      this.$refs.rightContentUl.children[index].setAttribute("draggable", true);
    },
    dragStartOther(e,start,type) {
      let data = {
        start,
        isMain: false,
        type
      }
      JSON.stringify(data)
      e.dataTransfer.setData("start", JSON.stringify(data));
    },
    dropOther(e, end) {
      let payload = { end, type: "otherMove" };
      let data = JSON.parse(e.dataTransfer.getData("start"));
      if (!data.isMain) {
        payload.start = data.start
        this.$store.commit(payload);
        this.$notify({
            title: '成功',
            message: '移动成功！',
            type: 'success',
            offset: 100,
            duration: 1000
        });
      } else if (data.type === 4 || data.type === 3 || data.type === 5) {        

        payload.type = 'addModule2'
        payload.idx = end
        payload.isMain = !data.isMain
        payload.data = this.resumeData.content.mainContent[data.start]

        this.$store.commit({ type: 'remove', isMain: data.isMain, idx: data.start })
        this.$store.commit(payload)

        this.$notify({
            title: '成功',
            message: '移动成功！',
            type: 'success',
            offset: 100,
            duration: 1000
      });
      } else {
        this.$notify({
          title: '警告',
          message: '部分模块不能移动到其他区域',
          type: 'warning',
          offset: 100,
          duration: 1000
        });
      }
    },
    removeContent(isMain,idx) {
        this.$confirm('是否确定删除该模块?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let payload = { type: 'remove', isMain,idx };
            this.$store.commit(payload);
            this.$notify({
                title: '成功',
                message: '删除成功！',
                type: 'success',
                offset: 100,
                duration: 1000
            });
        })
    },
    baseMessageDlgClose() {
      this.isBaseMessageDlgShow = false
    },
    mainDlgColse() {
      this.isMainDlgShow = false
    },
    awardDlgColse() {
      this.isAwardDlgShow = false
    },
    positionDlgColse() {
      this.isPositionDlgShow = false
    },
    skillDlgColse() {
      this.isSkillDlgShow = false
    },
    otherMessageDlgColse() {
      this.isOtherContent = false
    },
    tagDlgColse() {
      this.isTagshow = false
    },
    ImageDlgColse() {
      this.isImageshow = false
    },
    getImage(val) {
      this.$store.commit({ type: 'changeBaseMessage',avatar: val })
    },
    upImage() {
      if (this.user.isLogin) {
        this.isImageshow = true
      } else {
        this.$notify({
            title: '提示',
            message: '请先登录',
            type: 'warning',
            offset: 100,
            duration: 1000
      });
      }
    },
    eidtMainContent(type,index,isMainContent) {
      console.log(index,isMainContent)
      this.mainContentIdx = index
      this.isMainContent = isMainContent
      if (type === 1) {
        this.isMainDlgShow = true
      } else if (type === 2) {
        this.isAwardDlgShow = true
      } else if (type === 0) {
        this.isPositionDlgShow = true
      } else if (type === 5) {
        this.isSkillDlgShow = true
      } else if (type === 3) {
        this.isOtherContent = true
      } else if (type === 4) {
        this.isTagshow = true
      }
    }
  },
  computed: {
    resumeData() {
      return this.$store.state.resume;
    },
    user() {
      return this.$store.state.user;
    },
    baseColor() {
      return Color(this.resumeData.style.color).alpha(0.8)
    }
  },
  components: {
    BaseMessageDlg,
    MainDlg,
    AwardDlg,
    PositionDlg,
    SkillDlg,
    OtherMessageDlg,
    TagDlg,
    ImageDlg
  }
};
</script>
<style lang="less" scoped>
  .resume-item {
    position: relative;
    width: 820px;
    min-width: 820px;
    min-height: 1160px;
    margin: 0 auto;
    border: 1px solid #e4e7ed;
    box-shadow: 2px 2px 8px #ebeef5, -2px -2px 8px #ebeef5;
    font-size: 1.3rem;
    box-sizing: border-box;
    .msg-title {
      font-size: 1.2rem;
      font-weight: 700;
      display: inline-block;
      vertical-align: top;
      width: 25%;
      &>span {
        border: 2px solid rebeccapurple;
        padding: 5px 12px;
      }
    }
    .edit-btn {
      display: none;
      position: absolute;
      top: 4px;
      right: 4px;
      font-size: 0;
      i {
        display: inline-block;
        background: #00c091;
        width: 25px;
        height: 25px;
        font-size: 0.8rem;
        cursor: pointer;
        text-align: center;
        line-height: 25px;
        border-radius: 2px;
        margin-right: 3px;
        color: #fff;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .resume-body {
      padding: 40px 30px;
      padding-top: 20px;
      .resume-msg-item {
        position: relative;
        &:hover {
          outline: 1px dashed rgb(170, 170, 170);
          .edit-btn {
            display: block;
          }
        }
        font-size: 0;
        .msg-body-wrapper {
          display: inline-block;
          vertical-align: top;
          width: 75%;
        }
        .msg-body0 {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          .msg-body0-item {
            font-size: 0;
            i {
              display: inline-block;
              vertical-align: middle;
              margin-right: 7px;
              border-radius: 50%;
              border: 1px solid #000;
              font-size: 0.7rem;
              width: 22px;
              height: 22px;
              line-height: 22px;
              text-align: center;
            }
            span {
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
        .msg-body1 {
          margin-top: -12px;
          .msg-body1-item {
            position: relative;
            margin-bottom: 15px;
            &:last-child {
              margin-bottom: 0;
            }
          }
            .body-title{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .body-title-item{
                font-size: 1.1rem;
                margin-bottom: 10px;
            }
            .body-content{
                color: rgba(0,0,0,0.75);
            }
        }
        .msg-body2 {
          margin-top: -12px;
        .msg-body2-item {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin:15px 0;
          &:first-child {
            margin-top: 0;
          }
          &:last-child {
            margin-bottom: 0;
          }
          }
          .name,.lever,.time {
            color: rgba(0,0,0,0.75);
            font-weight: 700;
          }
        }
        .msg-body3 {
          margin-top: -12px;
          color: rgba(0,0,0,0.75);
        }
        .msg-body4 {
            .msg-body4-item{
              display: inline-block;
              border: 1px solid  rgba(0,0,0,0.75);
              padding: 5px 8px;
              border-radius: 5px;
              margin-right: 10px;
              margin-bottom: 5px;
            }
        }
        .msg-body5 {
          margin-top: -12px;
          margin-left: 25px;
          .msg-body5-item {
            color: rgba(0,0,0,0.75);
            list-style-type: disc;
            margin-bottom: 10px;
          }
        }
          
      }
    }
    .resume-head {
      position: relative;
      font-size: 0;
      color: #fff;
      .base-msg-warpper {
        display: inline-block;
        visibility: top;
        width: 75%;
        padding: 40px 30px;
        box-sizing: border-box;
        padding-left: 60px;
      }
      .resume-name-wrapper {
        height: 180px;
        position: relative;
         &:hover {
          outline: 1px dashed rgb(170, 170, 170);
          .edit-btn {
            display: block;
          }
        }
        .resume-name {
          margin-bottom: 25px;
          font-size: 2.5rem;
        }
        .msg-body {
          margin-top: 20px;
          span {
            display: inline-block;
            vertical-align: middle; 
            font-size: 0;
            margin-bottom: 5px;
            i{
              display: inline-block;
              height: 15px;
              vertical-align: middle;
              border-left: 2px solid #fff;
              margin: 0 10px;
            }
            span {
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
      }
      .resume-avatar-wrapper{
        position: relative;
        background: rgba(200,24,15,1);
        display: inline-block;
        vertical-align: top;
        height: 260px;
        box-sizing: border-box;
        padding: 40px 30px;
        img {
          display: block;
          height: 170px;
          width: 140px;
        }
          &:hover{
            outline: 1px dashed rgb(207, 207, 207);
            .edit-btn {
              display: block;
            }
          }
      }
    }
  }
</style>
