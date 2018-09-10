<template>
  <div>
    <div
      class="my-panel"
      v-for="(item, index) of messageList"
      :key="index"
    >
      <div class="my-panel_body">
        <div class="main-wrapper">
          <div class="list-item-wrapper">
            <h4>接 收 人: </h4>
            <span>{{ item.receiver.name }} - 老师</span>
          </div >
          <div class="list-item-wrapper">
            <h4>留言时间: </h4>
            <span>{{ item.created_at | formatTime }}</span>
          </div>
          <div >
            <h4>留言内容: </h4>
            <span>{{ item.content }}</span>
          </div>
        </div>
        <!-- 回复 START -->
        <div
          v-if="item.reply_status"
          class="reply-wrapper vux-1px-t"
        >
          <user-title
            :img="item.receiver.avatar"
            :title="item.receiver.name + ' － 老师'"
            :desc="item.reply_at | formatTime"
          >
          </user-title>
          <div class="">
            <h4>回复内容: </h4>
            <span>{{ item.reply_content }}</span>
          </div>
        </div>
        <!-- 回复 END -->
      </div>
    </div>

    <!-- 回复消息表单弹框 -->
    <div v-transfer-dom>
      <popup v-model="showReply">
        <reply-create
          :msgId="currentMessageId"
          @on-submit="handleSubmitReply"
          @on-cancel="handleCancelReply"
        ></reply-create>
      </popup>
    </div>

  </div>
</template>

<script>
  import { Popup } from 'vux'
  import UserTitle from 'components/page/UserTitle'
  import ReplyCreate from './ReplyCreate'
  import { formatUnixToText } from 'common/date'
  export default {
    name: 'MessageList',
    components: {
      Popup,
      UserTitle,
      ReplyCreate
    },
    data () {
      return {
        showReply: false,
        currentMessageId: 0
      }
    },
    props: ['messageList'],
    filters: {
      formatTime (timestamp) {
        return formatUnixToText(timestamp)
      }
    },
    methods: {
      handleReply (msgId) {
        this.showReply = true
        this.currentMessageId = msgId
      },
      handleSubmitReply (msgId, replyRes) {
        this.showReply = false
        this.$emit('reply', msgId, replyRes)
      },
      handleCancelReply () {
        this.showReply = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .item-ext-info {
    font-size: 12px;
  }
  .link-footer {
    text-align: right;
    height: 40px;
    line-height: 40px;
  }
  .footer-opt-button {
    display: block;
    color: #ffffff;
    border-radius: 4px;
    height: 18px;
    padding: 2px;
    line-height: 18px;
    font-size: 12px;
  }
  .link {
    color: #586C94;
  }
  .main-wrapper {
    margin-bottom: 10px;
  }
  .reply-wrapper {
    background: #fcfcfc;
    padding: 10px 0 0 0;
    color: #7c7c7c;
    font-size: 13px;
    .reply-ext {
      text-align: right;
    }
  }
  .list-item-wrapper {
    display: flex;
    justify-content: space-between;
    height: 26px;
    line-height: 26px;
  }
</style>
