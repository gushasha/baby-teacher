<template>
  <div>
    <header-back></header-back>
    <my-better-scroll
      class="better-scroll-wrapper"
      v-if="pictureLIst.length"
      ref="scroll"
      :data="pictureLIst"
      :pullup="true"
      @scrollToEnd="loadMore"
    >
      <div>
        <panel-list :pictureLIst="pictureLIst"></panel-list>
        <load-more :show-loading="showLoading"  :tip="loadingTip"></load-more>
      </div>
    </my-better-scroll>
    <no-data v-else></no-data>
  </div>
</template>

<script>
  import HeaderBack from 'views/bar/HeaderBack'
  import PanelList from './components/PanelList'
  import { LoadMore } from 'vux'
  import MyBetterScroll from 'components/scroll/BetterScroll'
  import NoData from 'components/page/NoData'
  import { _axios } from 'common/myAxios'

  export default {
    name: 'AlbumList',
    components: {
      HeaderBack,
      LoadMore,
      MyBetterScroll,
      NoData,
      PanelList
    },
    data () {
      return {
        currentPage: 1,
        pageCount: 1,
        loadingTip: '加载中',
        pictureLIst: [],
        date: ''
      }
    },
    computed: {
      showLoading () {
        return this.loadingTip === '加载中'
      }
    },
    watch: {
      date () {
        this.currentPage = 1
        this.pageCount = 1
        this.loadingTip = '加载中'
        this.pictureLIst = []
        this.loadMore()
      }
    },
    methods: {
      dateChanged (val) {
        this.date = val
      },
      loadMore () {
        if (this.currentPage > this.pageCount) {
          this.loadingTip = '到底了'
          return
        }
        let requestData = {
          current_page: this.currentPage,
          date: this.date
        }
        _axios.get('/api/wTeacher/album/getList', {params: requestData}).then(res => {
          this.pictureLIst = this.pictureLIst.concat(res.data)
          this.pageCount = res.page_count
          this.currentPage += 1
          if (this.currentPage > this.pageCount) {
            this.loadingTip = '到底了'
          }
        })
      }
    },
    mounted () {
      this.loadMore()
    }
  }
</script>
<style lang="less" scoped>
  .better-scroll-wrapper {
    position: fixed;
    top:0;
    left: 0;
    bottom:0;
    right:0;
    overflow: hidden;
  }
  .icon-menu-style {
    color: darkorange;
  }
  .homework-img-wrapper {
    width: 30%;
  }
  .img-wrapper {
    width: 50%;
    margin: 0 auto;
  }
  .homework-desc {
    font-size: 13px;
    color: #666666;
    margin-left: 10px;
  }
</style>
