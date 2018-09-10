<template>
  <div>
    <my-better-scroll
      class="better-scroll-wrapper"
      v-if="noticeList.length"
      ref="scroll"
      :data="noticeList"
      :pullup="true"
      @scrollToEnd="loadMore"
    >
      <div>
        <notice-panel-list :noticeList="noticeList"></notice-panel-list>
        <load-more :show-loading="showLoading"  :tip="loadingTip"></load-more>
      </div>
    </my-better-scroll>
    <no-data v-else></no-data>
  </div>
</template>

<script>
  import NoticePanelList from './components/ReceivePanelList'
  import { LoadMore } from 'vux'
  import MyBetterScroll from 'components/scroll/BetterScroll'
  import NoData from 'components/page/NoData'
  import { _axios } from 'common/myAxios'

  export default {
    components: {
      LoadMore,
      MyBetterScroll,
      NoData,
      NoticePanelList
    },
    data () {
      return {
        currentPage: 1,
        pageCount: 1,
        loadingTip: '加载中',
        noticeList: []
      }
    },
    computed: {
      showLoading () {
        return this.loadingTip === '加载中'
      }
    },
    methods: {
      loadMore () {
        if (this.currentPage > this.pageCount) {
          this.loadingTip = '到底了'
          return
        }
        let requestData = {
          current_page: this.currentPage
        }
        _axios.get('/api/wTeacher/notice/receiveHistory', {params: requestData}).then(res => {
          this.noticeList = this.noticeList.concat(res.data)
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
    top:90px;
    left: 0;
    bottom:0;
    right:0;
    overflow: hidden;
  }
  .icon-menu-style {
    color: darkorange;
  }
  .notice-img-wrapper {
    width: 30%;
  }
  .img-wrapper {
    width: 50%;
    margin: 0 auto;
  }
  .notice-desc {
    font-size: 13px;
    color: #666666;
    margin-left: 10px;
  }
</style>
