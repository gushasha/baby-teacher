<template>
  <div class="body-wrapper">
    <x-header
      style="width:100%;position:fixed;left:0;right:0;top:0;z-index:99;"
      :left-options="{preventGoBack: true}"
      @on-click-back="$router.push('/home')"
    >选择班级</x-header>
    <my-class-list path="/homework/list" roleType="all"></my-class-list>
  </div>
</template>

<script>
  import { XHeader, Group, Cell } from 'vux'
  import MyClassList from 'views/school/MyClassList'
  export default {
    name: 'Health',
    components: {
      XHeader,
      Group,
      Cell,
      MyClassList
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/veribles.less';

  .body-wrapper {
    margin-top: @headerHeight;
  }
</style>
