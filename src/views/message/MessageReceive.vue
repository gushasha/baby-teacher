<template>
  <div>
    <my-better-scroll
      class="better-scroll-wrapper"
      v-if="messageList.length"
      ref="scroll"
      :data="messageList"
      :pullup="true"
      @scrollToEnd="loadMore"
    >
      <div>
        <receive-panel-list
          :messageList="messageList"
          @reply="handleReply"
        ></receive-panel-list>
        <load-more :show-loading="showLoading"  :tip="loadingTip"></load-more>
      </div>
    </my-better-scroll>
    <no-data v-else></no-data>
  </div>
</template>

<script>
  import ReceivePanelList from './components/ReceivePanelList'
  import { LoadMore } from 'vux'
  import MyBetterScroll from 'components/scroll/BetterScroll'
  import NoData from 'components/page/NoData'
  import { _axios } from 'common/myAxios'

  export default {
    name: 'MessageBody',
    components: {
      LoadMore,
      MyBetterScroll,
      NoData,
      ReceivePanelList
    },
    data () {
      return {
        currentPage: 1,
        pageCount: 2,
        loadingTip: '加载中',
        messageList: [],
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
        this.messageList = []
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
        _axios.get('/api/wTeacher/message/receiveHistory', {params: requestData}).then(res => {
          this.messageList = this.messageList.concat(res.data)
          this.pageCount = res.page_count
          this.currentPage += 1
          if (this.currentPage > this.pageCount) {
            this.loadingTip = '到底了'
          }
        })
      },
      handleReply (msgId, replyRes) {
        for (let item of this.messageList) {
          if (item.id - 0 === msgId - 0) {
            item.reply_at = replyRes.reply_at
            item.reply_content = replyRes.reply_content
            item.reply_status = replyRes.reply_status
          }
        }
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
    top:44px;
    left: 0;
    bottom:0;
    right:0;
    overflow: hidden;
  }
  .icon-menu-style {
    color: darkorange;
  }
  .message-img-wrapper {
    width: 30%;
  }
  .img-wrapper {
    width: 50%;
    margin: 0 auto;
  }
  .message-desc {
    font-size: 13px;
    color: #666666;
    margin-left: 10px;
  }
</style>
