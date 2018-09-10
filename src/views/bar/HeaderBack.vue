<template>
  <div class="header-abs" >
    <div
      class="iconfont back-icon"
      @click="goTo"
    >
      <span class="header-abs-info">&#xe626;</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeaderBack',
    props: ['path'],
    methods: {
      goTo () {
        if (this.path) {
          this.$router.push({ path: this.path })
        } else {
          this.$router.history.go(-1)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~styles/veribles.less";
  .header-abs {
    z-index: 99;
    position: fixed;
    top: 2px;
    left: 2px;
    width: 40px;
    height: 40px;
    border-radius: 24px;
    line-height: 40px;
    text-align: center;
    background: rgba(0, 0, 0, .5);
  }
  .header-abs-info {
    color: #fff;
    font-size: 24px;
  }
</style>
