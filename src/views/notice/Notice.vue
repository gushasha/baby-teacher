<template>
  <div>
    <div style="height:90px;" >
      <sticky
        :offset="0"
        :check-sticky-support="false"
        :disabled="disabled"
      >
        <x-header
          :left-options="{preventGoBack: true}"
          @on-click-back="$router.push('/home')"
        >
          <span>全部通知</span>
          <div slot="right" @click="displayNoticeCreate">
            <span class="iconfont" style="font-size: 24px;">&#xe670;</span>
          </div>
        </x-header>
        <tab>
          <tab-item
            :selected="$route.name === 'NoticeSendList'"
            @on-item-click="onItemClick('NoticeSendList')"
          >我发出的</tab-item>
          <tab-item
            :selected="$route.name === 'NoticeReceiveList'"
            @on-item-click="onItemClick('NoticeReceiveList')"
          >我收到的</tab-item>
        </tab>
      </sticky>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import { Sticky, XHeader, Tab, TabItem } from 'vux'

  export default {
    components: {
      Sticky,
      XHeader,
      Tab,
      TabItem
    },
    data () {
      return {
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent)
      }
    },
    methods: {
      onItemClick (router) {
        this.$router.push({name: router})
      },
      displayNoticeCreate () {
        this.$router.push({name: 'NoticeCreate'})
      }
    }
  }
</script>
<style>
</style>
<style lang="less" scoped>
</style>
