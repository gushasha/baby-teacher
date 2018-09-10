<template>
  <div class="footer-wrapper"><slot></slot></div>
</template>

<script>
export default {
  name: 'BarFooter',
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
@import "~styles/veribles.less";
.footer-wrapper {
  position: fixed;
  left: 0;
  bottom: 0;
  background: #E5E5E5;
  box-sizing: border-box;
  width: 100%;
  z-index: 99;
}
</style>
