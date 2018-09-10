<template>
  <div class="body-wrapper">
    <!-- 顶部返回按钮 -->
    <header-back></header-back>

    <!-- 简介内容 -->
    <div v-if="intro.length">
      <div class="content" v-html="intro"></div>
    </div>
    <no-data v-else>
      <div slot="ext">暂无简介...</div>
    </no-data>
  </div>
</template>

<script>
  import HeaderBack from 'views/bar/HeaderBack'
  import NoData from 'components/page/NoData'
  import { _axios } from 'common/myAxios'

  export default {
    name: 'School',
    components: {
      NoData,
      HeaderBack
    },
    data () {
      return {
        intro: '',
        name: ''
      }
    },
    methods: {
      getSchoolInfo () {
        _axios.get('/api/wTeacher/school/intro').then(res => {
          this.intro = res.intro
          this.name = res.name
        })
      }
    },
    mounted () {
      this.getSchoolInfo()
    }
  }
</script>

<style lang="less" scoped>
.body-wrapper {
  background: #ffffff;
}
.content {
  padding: 10px;
}
</style>
