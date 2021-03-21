<template>
    <div id='edit-page'>
        <el-container>
            <el-aside width='250px'><Menu/></el-aside>
            <el-main ref='mainContent'>
                <component v-bind:is="resumes[resumeType]"></component>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import Menu from './menu/Index.vue' 
import Resume from './resume/Resume.vue'
import Resume1 from './resume/Resume1.vue'
import Resume2 from './resume/Resume2.vue'
import Resume3 from './resume/Resume3.vue'
import Resume4 from './resume/Resume4.vue'
import Resume5 from './resume/Resume5.vue'
import Resume6 from './resume/Resume6.vue'
import Resume7 from './resume/Resume7.vue'
import Resume8 from './resume/Resume8.vue'
export default {
  computed: {
      scrollTop() {
          return this.$store.state.resume.scrollTop;
      },
      resumeType() {
          return this.$store.state.resume.resumeType;
      }
  },
  watch: {
      scrollTop() {
          let line = 15;
          let scrollTop = this.$refs.mainContent.$el.scrollTop;
          let timer = setInterval(() => {
                scrollTop += line;
                this.$refs.mainContent.$el.scrollTo(0,scrollTop);
          },8);

          setTimeout(() => {
              clearInterval(timer);
          },800);
      }
  },
  components: {
    Menu,
    Resume,
    Resume1,
    Resume2,
    Resume3,
    Resume4,
    Resume5,
    Resume6,
    Resume7,
    Resume8
  },
  data() {
      return {
          resumes: ['Resume','Resume1','Resume2','Resume3','Resume4','Resume5','Resume6','Resume7','Resume8']
      }
  }
}
</script>

<style lang="less" scoped>
#edit-page{
    height: 100%;
    &>.el-container{
        height: 100%;
        &>.el-aside{
            overflow: hidden;
            border-right: 1px solid #E4E7ED;
        }
        &>.el-main{
            width: 100%;
        }
    }
}
</style>
