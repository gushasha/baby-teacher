<template>
  <div class="nodata-wrapper">
    <img class="img" src="/static/img/element/nodata-bear.png"/>
    <slot name="ext">暂无数据...</slot>
  </div>
</template>

<script>
export default {
  name: 'NoData'
}
</script>

<style lang="less" scoped>
.nodata-wrapper {
  position:absolute;
  left:0;
  bottom:0;
  right: 0;
  top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.img {
  width: 70%;
  margin-bottom: 30px;
}
.ext {
  font-size: 12px;
  color: #7c7c7c;
}
</style>
