<template>
  <div id="app">
    <!-- 网页title取自路由配置的title -->
    <div
      v-wechat-title="$route.meta.title"
      img-set="/static/favicon.ico"
    ></div>
    <router-view></router-view>
  </div>
</template>

<style lang="less">
  @import '~vux/src/styles/close.less';
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~styles/veribles.less';
  @import '~styles/theme.less';
  html, body {
    /*height: 100%;*/
    /*overflow-y: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
    width: 100%;
    overflow-x: hidden;
    background-color: @bodyBgColor;
    color: @bodyFontColor;
    font-size: 14px;
  }
</style>
