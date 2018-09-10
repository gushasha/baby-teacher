<template>
  <div>
    <group>
      <cell is-link link="/user/edit">
        <span slot="title">
          <span class="iconfont my-iconfont">&#xe606; </span>
          <span>个人资料</span>
        </span>
      </cell>
      <cell is-link link="/advice/create">
        <span slot="title">
          <span class="iconfont my-iconfont">&#xe67c; </span>
          <span>意见反馈</span>
        </span>
      </cell>
    </group>
  </div>
</template>

<script>
  import { Cell, Group } from 'vux'
  export default {
    name: 'MineOption',
    components: {
      Group,
      Cell
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/veribles.less';
  .my-iconfont {
    color: @colorSuccess;
    font-size: 20px;
  }
</style>
