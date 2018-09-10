<template>
  <div>
    <div class='menu-title'>
      <span class='iconfont icon-menu-style'>&#xe694;</span> 近期通知
    </div>
    <notice-panel-list :noticeList="noticeList"></notice-panel-list>
    <div class="my-panel">
      <router-link to='/notice/receive' tag='div' class='my-panel-footer'>
        <span class='link'>查看更多 >>></span>
      </router-link>
    </div>
  </div>
</template>
<script>
import NoticePanelList from 'views/notice/components/ReceivePanelList'
export default {
  components: {
    NoticePanelList
  },
  props: {
    noticeList: Array
  }
}
</script>
<style lang='less' scoped>
  .menu-title {
    margin-left: 10px;
    color: #666666;
    font-size: 16px;
  }
  .icon-menu-style {
    color: darkorange;
    font-size: 20px;
  }
</style>
