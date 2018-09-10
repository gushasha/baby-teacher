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
        <send-panel-list
          :messageList="messageList"
          @reply="handleReply"
        ></send-panel-list>
        <load-more :show-loading="showLoading"  :tip="loadingTip"></load-more>
      </div>
    </my-better-scroll>
    <no-data v-else></no-data>

    <!-- 显示发送消息按钮 -->
    <float-fixed>
      <router-link
        to="/message/create"
        tag="div"
      ><span class="iconfont">&#xea2d;</span> 留言</router-link>
    </float-fixed>

  </div>
</template>

<script>
  import FloatFixed from 'views/bar/FloatFixed'
  import SendPanelList from './components/SendPanelList'
  import { LoadMore, Popup } from 'vux'
  import MyBetterScroll from 'components/scroll/BetterScroll'
  import NoData from 'components/page/NoData'
  import { _axios } from 'common/myAxios'

  export default {
    name: 'MessageBody',
    components: {
      FloatFixed,
      LoadMore,
      Popup,
      MyBetterScroll,
      NoData,
      SendPanelList
    },
    data () {
      return {
        currentPage: 1,
        pageCount: 1,
        loadingTip: '加载中',
        messageList: []
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
        _axios.get('/api/wTeacher/message/sendHistory', {params: requestData}).then(res => {
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
