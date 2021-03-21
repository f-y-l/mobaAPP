<template>
    <object class='resume'>
        <div :style="{ fontFamily: resumeData.style.fontFamliy }"  ref='resume' class='resume-item'>
            <div class='right-content'>
                <div :style="{
                        paddingTop:resumeData.style.moduleSize,
                        paddingBottom: resumeData.style.moduleSize,
                    }" 
                class='name-wrapper'>
                    <div class='name'>{{resumeData.content.baseMessage.name.text}}</div>
                    <div :style="{fontSize: resumeData.style.fontSize,lineHeight: resumeData.style.lineHeight}" class='desc'>{{resumeData.content.baseMessage.desc.text}}</div>
                    <div class='edit-btn'>
                        <i @click="isBaseMessageDlgShow=true" class='fa fa-pencil'></i>
                    </div>
                </div>
                <ul ref='rightContentUl'>
                    <li @dragstart='dragStartMain($event,index,item.type)'
                        @dragover='dragover'
                        @drop='dropMain($event,index)'
                        draggable=true
                        :style="{
                            paddingTop:resumeData.style.moduleSize,
                            paddingBottom: resumeData.style.moduleSize,
                        }"
                        v-for='(item,index) in resumeData.content.mainContent' 
                        :key='index'
                    >
                        <div class='title'>
                            <i :style="'background-color: ' + resumeData.style.color" :class='"fa fa-"+item.url'></i>
                            <span :style="{color: resumeData.style.color,borderBottom:'1px solid '+resumeData.style.color}">{{item.text}}</span>
                        </div>
                        <div 
                            :style="{fontSize: resumeData.style.fontSize}"
                            class='position-wanted'
                            v-if='item.type===0'
                        >
                            <span v-for='(item1,index1) in item.data' :key='index1'>
                                <i :style="{color:  + resumeData.style.color}" :class='"fa fa-"+item1.url'></i>
                                <span>{{item1.text}}</span>
                            </span>
                        </div>
                        <div
                            :style="{fontSize: resumeData.style.fontSize}"
                            class='award' v-else-if='item.type===2'
                        >
                            <div v-for='(item1,index1) in item.data' :key='index1'>
                                <span class='time'>{{item1.time}}</span>
                                <span class='name'>{{item1.name}}</span>
                                <span class='lever'>{{item1.lever}}</span>
                            </div>
                        </div>
                        <div class='main-messgae' v-else-if='item.type===1'>
                            <div class='main-messgae-item' v-for='(item1,index1) in item.data' :key='index1'>
                                <div :style="{fontSize: resumeData.style.fontSize}" class='title-wrapper'><span class='time'>{{item1.time}}</span><span class="organization">{{item1.organization}}</span></div>
                                <div :style="{fontSize: resumeData.style.fontSize}"  class='position'>{{item1.position}}</div>
                                <div :style="{fontSize: resumeData.style.fontSize,lineHeight: resumeData.style.lineHeight}" class='desc'>{{item1.desc}}</div>
                            </div>
                        </div>
                        <div class='other-message' v-else-if='item.type===3'>
                            <div  :style="{fontSize: resumeData.style.fontSize,lineHeight: resumeData.style.lineHeight}"  class='desc'>{{item.data}}</div>
                        </div>
                        <ul class='skill' v-else-if ='item.type===5'>
                                <li class='skill-item' :style="{fontSize: resumeData.style.fontSize,lineHeight: resumeData.style.lineHeight}"  v-for='(item1,index1) in item.data' :key='index1'>{{item1}}</li>
                        </ul>
                        <div  :style="{fontSize: resumeData.style.fontSize}" class='tag' v-else-if='item.type===4'>
                                <span :style="{border: '1px solid'+ resumeData.style.color  }" v-for='(item1,index1) in item.data' :key='index1'>{{item1}}</span>
                        </div>
                        <div class='edit-btn'>
                            <i @click="removeContent(true,index)" class='fa fa-trash-o'></i>                
                            <i @mousedown='setDrag(index)' class='fa fa-arrows'></i>
                            <i @click='eidtMainContent(item.type,index,true)' class='fa fa-pencil'></i>
                        </div>
                    </li>
                </ul>
            </div>
            <div class='left-content' :style="'background: ' + resumeData.style.color">
                <div class='avatar'>
                    <img v-if="resumeData.content.baseMessage.avatar" :src='resumeData.content.baseMessage.avatar' />
                    <img v-else src='./avatar.jpg' />
                    <div class='edit-btn'>
                        <i @click="upImage" class='fa fa-pencil'></i>
                    </div>
                </div>
                <div
                    :style="{
                        paddingTop:resumeData.style.moduleSize,
                        paddingBottom: resumeData.style.moduleSize,
                    }"
                class='baseMessage'>
                    <div class='title'>
                        <i :style="'color: ' + resumeData.style.color" :class='"fa fa-"+resumeData.content.baseMessage.url'></i>
                        <span>{{resumeData.content.baseMessage.text}}</span>
                    </div>
                    <div :style="{fontSize: resumeData.style.fontSize}" class='baseMessage-content'>
                        <div class='baseMessage-content-item' v-for="(item,index) in resumeData.content.baseMessage.data" :key='index'>
                            <i :class='"fa fa-"+item.url'></i>
                            <span>{{item.text}}</span>
                        </div>
                        <div class='baseMessage-content-item' v-for="(item,index) in resumeData.content.baseMessage.custom" :key='index+resumeData.content.baseMessage.data.length'>
                            <i :class='"fa fa-"+item.url'></i>
                            <span>{{item.text}}</span>
                        </div>
                    </div>
                    <div class='edit-btn'>
                        <i @click="isBaseMessageDlgShow=true" class='fa fa-pencil'></i>
                    </div>
                </div>
                <ul class='other-content'>
                    <li 
                        @dragstart='dragStartOther($event,index,item.type)'
                        @dragover='dragover'
                        @drop='dropOther($event,index)'
                        draggable=true
                        :style="{
                            paddingTop:resumeData.style.moduleSize,
                            paddingBottom: resumeData.style.moduleSize,
                        }"
                        class='other-content-item'
                        v-for='(item,index) in resumeData.content.otherContent'
                        :key='index'
                    >
                        <div class='title'>
                            <i :style="'color: ' + resumeData.style.color" :class='"fa fa-"+item.url'></i>
                            <span>{{item.text}}</span>
                        </div>
                        <div :style="{fontSize: resumeData.style.fontSize}" class='content'>
                            <ul class='skill' v-if='item.type===5'>
                                <li :style="{lineHeight: resumeData.style.lineHeight}"  v-for='(item1,index1) in item.data' :key='index1'>{{item1}}</li>
                            </ul>
                            <div class='tag' v-else-if='item.type===4'>
                                <span v-for='(item1,index1) in item.data' :key='index1'>{{item1}}</span>
                            </div>
                            <div :style="{fontSize: resumeData.style.fontSize,lineHeight: resumeData.style.lineHeight}" class='tag' v-else-if='item.type===3'>
                              {{item.data}}
                            </div>
                        </div>
                        <div class='edit-btn'>
                            <i @click="removeContent(false,index)" class='fa fa-trash-o'></i>             
                            <i class='fa fa-arrows'></i>
                            <i @click='eidtMainContent(item.type,index,false)'  class='fa fa-pencil'></i>
                        </div>
                    </li>
                </ul>
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
<style lang="less" scoped >
  .resume-item {
    position: relative;
    width: 820px;
    min-width: 820px;
    min-height: 1160px;
    margin: 0 auto;
    border: 1px solid #e4e7ed;
    box-shadow: 2px 2px 8px #ebeef5, -2px -2px 8px #ebeef5;
    font-size: 1.3rem;
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
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .left-content {
      position: absolute;
      top: 0;
      right: 0;
      box-sizing: border-box;
      vertical-align: top;
      width: 33%;
      height: 100%;
      padding: 20px 30px;
      color: #fff;
       .avatar {
        margin-top: 30px;
        margin-bottom: 30px;
        position: relative;
        &:hover{
          outline: 1px dashed rgb(207, 207, 207);
          .edit-btn {
            display: block;
          }
        }
        img {
          margin: 0 auto;
          display: block;
          padding: 5px 4px;
          width: 128px;
          height: 160px;
          background-color: #c0c4cc;
        }
      }
      .title {
        margin-bottom: 15px;
        text-align: left;
        i {
          display: inline-block;
          box-sizing: border-box;
          vertical-align: middle;
          background: #fff;
          border-radius: 15px;
          width: 30px;
          height: 30px;
          font-size: 1.1rem;
          text-align: center;
          line-height: 30px;
        }
        span {
          margin-left: 5px;
          display: inline-block;
          vertical-align: middle;
          font-weight: 700;
        }
      }
      .baseMessage {
        position: relative;
        box-sizing: border-box;
        border: 1px dashed rgba(0, 0, 0, 0);
        &:hover {
          border: 1px dashed rgb(207, 207, 207);
          .edit-btn {
            display: block;
          }
        }
      }
      .baseMessage-content {
        margin-left: 5px;
        .baseMessage-content-item {
          color: #fff;
          padding: 7px 0;
          i {
            display: inline-block;
            width: 25px;
          }
        }
      }
      .other-content {
        .other-content-item {
          position: relative;
          box-sizing: border-box;
          border: 1px dashed rgba(207, 207, 0,0);
          &:hover {
            border: 1px dashed rgb(207, 207, 207);
            .edit-btn {
              display: block;
            }
          }
          .skill {
            li {
              margin-left: 20px;
              list-style-type: disc;
              margin-bottom: 10px;
              line-height: 22px;
            }
          }
          .tag {
            span {
              display: inline-block;
              padding: 7px 10px;
              border-radius: 5px;
              border: 1px solid #fff;
              margin-right: 10px;
              margin-bottom: 5px;
            }
          }
        }
      }
    } 
    .right-content {
      box-sizing: border-box;
      margin-right: 33%;
      width: 66%;
      height: 100%;
      padding: 20px 30px;
      color: #303133;
      .title {
        font-size: 1.3rem;
        text-align: left;
        position: relative;
        margin-bottom: 20px;
        i {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          display: inline-block;
          box-sizing: border-box;
          color: #fff;
          border-radius: 15px;
          width: 30px;
          height: 30px;
          font-size: 1rem;
          text-align: center;
          line-height: 30px;
        }
        span {
          margin-left: 40px;
          display: block;
          font-weight: 700;
          padding-bottom: 6px;
        }
      }
      .name-wrapper {
        position: relative;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0);
        &:hover {
          border: 1px dashed rgb(170, 170, 170);
          .edit-btn {
            color: #fff;
            display: block;
          }
        }
        .name {
          margin-bottom: 25px;
          font-size: 2.5rem;
        }
      }
      ul {
        li {
          position: relative;
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0);
          &:hover {
            border: 1px dashed rgb(170, 170, 170);
            .edit-btn {
              color: #fff;
              display: block;
            }
          }
        }
        .position-wanted {
          i {
            display: inline-block;
            vertical-align: middle;
            box-sizing: border-box;
            width: 22px;
            height: 22px;
            line-height: 22px;
            border-radius: 11px;
            text-align: center;
            border: 1px solid #606266;
            color: #606266;
            font-size: 0.7rem;
            margin-right: 7px;
          }
          &>span {
            display: inline-block;
            vertical-align: middle;
            margin-right: 25px;
            margin-bottom: 10px;
            &:last-child{
              margin-right: 0;
            }
            span{
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
        .main-messgae {
          line-height: 22px;
          .main-messgae-item{
            margin-bottom: 15px;
            &:last-child{
              margin-bottom: 0;
            }
          }
          .title-wrapper {
            position: relative;
            margin-bottom: 5px;
            .time {
              font-weight: 700;
            }
            .organization {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          .position {
            font-weight: 700;
          }
          .desc {
            margin-top: 7px;
          }
        }
        .other-message {
          font-size: 1rem;
          line-height: 22px;
        }
        .award {
          &>div {
            position: relative;
            margin: 15px 0;
          }
          .time{
            display: inline-block;
            width: 120px;
          }
          .name {
            font-weight: 700;
          }
          .lever {
            position: absolute;
            top: 0;
            right: 0;
            font-weight: 700;
          }
        }
        .skill {
          .skill-item {
            border: none;
            margin-left: 20px;
            list-style-type: disc;
            margin-bottom: 10px;
            line-height: 22px;
          }
        }
        .tag {
          span {
            display: inline-block;
            padding: 7px 10px;
            border-radius: 5px;
            margin-right: 10px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
</style>
