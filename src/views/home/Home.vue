<template>
  <div class="home-body-wrapper">
    <home-user
      v-if="Object.keys(userInfo).length"
      @change="getIndexInfo"
      :userInfo="userInfo"
    ></home-user>
    <home-icons></home-icons>
    <home-app-stats :appStats="appStats"></home-app-stats>
    <home-notice v-if="noticeList.length > 0" :noticeList="noticeList" class="home-attendance-wrapper"></home-notice>
    <bar-footer></bar-footer>
  </div>
</template>

<script>
  import HomeUser from './components/User'
  import HomeAppStats from './components/AppStats'
  import HomeNotice from './components/Notice'
  import BarFooter from 'views/bar/Footer.vue'
  import HomeIcons from './components/Icons'
  import { _axios } from 'common/myAxios'
  import { mapState } from 'vuex'

  export default {
    name: 'home',
    data () {
      return {
        userInfo: {},
        noticeList: [],
        appStats: {}
      }
    },
    computed: {
      ...mapState(['user'])
    },
    components: {
      HomeNotice,
      HomeUser,
      HomeAppStats,
      BarFooter,
      HomeIcons
    },
    methods: {
      getIndexInfo () {
        _axios.get('/api/wTeacher/home/index').then(res => {
          this.userInfo = res.user_info
          this.noticeList = res.notice_list
          this.appStats = res.app_stats
          this.noticeList = res.notice_list
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getIndexInfo()
      })
    }
  }
</script>
<style lang="less" scoped>
  @import '~styles/veribles.less';

  .home-body-wrapper {
    margin-bottom: @mainMenuFooterHeight;
  }
  .home-attendance-wrapper {
    margin: 10px auto;
  }
</style>
