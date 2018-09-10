<template>
  <footer>
    <ul >
      <router-link
         to="/home"
         tag="li"
         class="menu-content"
      >
        <span class="iconfont icon-menu-style">&#xe603;</span>
        <div class="icon-text">首页</div>
      </router-link>
      <router-link
         to="/contact"
         tag="li"
         class="menu-content"
      >
        <span class="iconfont icon-menu-style">&#xe60a;</span>
        <div class="icon-text">通讯录</div>
      </router-link>
      <router-link
         to="/mine"
         tag="li"
         class="menu-content"
      >
        <span class="iconfont icon-menu-style">&#xe601;</span>
        <div class="icon-text">我的</div>
      </router-link>
    </ul>
  </footer>
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
footer {
  position: fixed;
  height: @mainMenuFooterHeight;
  left: 0;
  bottom: 0;
  background: #fff;
  box-sizing: border-box;
  padding-top: 2px;
  border-top: 1px solid #e2e2e2;
  width: 100%;
  z-index: 99;
}

ul {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

li {
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
}

.menu-content {
  color: #666666;
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  width: 100%;
  justify-content: space-around;
  flex-direction: column;
}
.router-link-active {
  color: #42b983;
}
.icon-text {
  font-size: 12px;
}
.icon-menu-style {
  font-size: 18px;
}
</style>
