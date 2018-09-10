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
          @on-click-back="back"
        >
          <span>苹果🍎一班</span>
        </x-header>
        <tab>
          <tab-item
            :selected="$route.name === 'ContactClassTeacher'"
            @on-item-click="onItemClick('teacher')"
          >教师</tab-item>
          <tab-item
            :selected="$route.name === 'ContactClassGuardian'"
            @on-item-click="onItemClick('guardian')"
          >家长</tab-item>
        </tab>
      </sticky>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import { Tab, TabItem, XHeader, Sticky } from 'vux'

  export default {
    name: 'ContactBook',
    components: {
      XHeader,
      Tab,
      TabItem,
      Sticky
    },
    data () {
      return {
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent)
      }
    },
    methods: {
      onItemClick (router) {
        this.$router.push({path: router})
      },
      back () {
        this.$router.push('/contact')
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
