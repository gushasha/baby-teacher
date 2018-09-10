<template>
  <div>
    <x-header
      :left-options="{preventGoBack: true}"
      @on-click-back="$router.push('/home')"
    >报名列表</x-header>
    <tab>
      <tab-item
        :selected="status === 'new'"
        @on-item-click="onItemClick('new')"
      >待处理</tab-item>
      <tab-item
        :selected="status === 'process'"
        @on-item-click="onItemClick('process')"
      >跟进中</tab-item>
      <tab-item
        :selected="status === 'complete'"
        @on-item-click="onItemClick('complete')"
      >已报名</tab-item>
      <tab-item
        :selected="status === 'invalid'"
        @on-item-click="onItemClick('invalid')"
      >无效</tab-item>
    </tab>
    <recommend-list-body :status="status"></recommend-list-body>
  </div>
</template>

<script>
  import { Tab, TabItem, XHeader, Sticky } from 'vux'
  import RecommendListBody from './components/Body'

  export default {
    name: 'RecommendList',
    components: {
      XHeader,
      Tab,
      TabItem,
      Sticky,
      RecommendListBody
    },
    data () {
      let queryStatus = this.$route.query.status
      let status = ''
      if (queryStatus === 'undefined' || !queryStatus) {
        status = 'new'
      } else {
        status = queryStatus
      }
      return {
        status
      }
    },
    methods: {
      onItemClick (status) {
        this.status = status
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
