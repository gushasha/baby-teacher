<template>
  <div class="header-wrapper">
    <div class="image-box">
      <div class="image-wrapper">
        <img class="image-icon" :src="user.avatar" />
      </div>
      <div class="username-text" v-if="user.name">{{ user.name }}</div>
      <div class="username-text" v-if="user.mobile">{{ user.mobile }}</div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'AvatarTpl',
    props: ['user']
  }
</script>

<style lang="less" scoped>
  .header-wrapper {
    background: #ffffff;
  }
  .image-box {
    padding: 10px 0;
  }
  .image-wrapper {
    margin: 0 auto;
    border-radius: 100px;
    width: 100px;
    height: 100px;
    overflow: hidden;
    background: #42b983;
  }
  .image-icon {
    width: 100%;
    height: 100%;
  }
  .username-text {
    text-align: center;
    font-size: 14px;
  }
</style>
