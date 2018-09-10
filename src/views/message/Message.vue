<template>
  <div>
    <tab>
      <tab-item
        :selected="$route.path === '/message/receive'"
        @on-item-click="onItemClick('/message/receive')"
      >已接收</tab-item>
      <tab-item
        :selected="$route.path === '/message/send'"
        @on-item-click="onItemClick('/message/send')"
      >已发送</tab-item>
    </tab>
    <router-view></router-view>
    <header-back path="/home"></header-back>
  </div>
</template>

<script>
  import UserTitle from 'components/page/UserTitle'
  import HeaderBack from 'views/bar/HeaderBack'
  import { Tab, TabItem } from 'vux'
  export default {
    components: {
      UserTitle,
      HeaderBack,
      Tab,
      TabItem
    },
    methods: {
      onItemClick (router) {
        this.$router.push({path: router})
      }
    }
  }
</script>

<style lang="less" scoped>
.avatar-wrapper {
  width: 100%;
  background: #ffffff;
  padding: 10px;
}
</style>
