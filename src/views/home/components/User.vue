<template>
  <div class="user-body-wrapper">
    <div class="content">
      <div class="content-left">
        <div class="image-wrapper">
          <img class="img" :src="userInfo.avatar.length ? userInfo.avatar : '/static/img/avatar/user.png'"/>
        </div>
      </div>
      <div class="content-right">
        <div class="right-main">
          <span class="right-main-title">{{ userInfo.name }} </span>
          <span v-if="userInfo.gender === 1" class="iconfont right-main-tag girl">&#xe622;</span>
          <span v-else class="iconfont right-main-tag boy">&#xe73b;</span>
        </div>
        <span class="right-ext">{{ userInfo.mobile }}</span>
      </div>
    </div>
    <div class="setting" >
      <span  class="iconfont change-baby-btn" >&#xe6ad; {{ userInfo.role_name }}</span>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  export default {
    name: 'HomeUser',
    components: {
      XButton
    },
    props: ['userInfo']
  }
</script>

<style lang="less" scoped>
.user-body-wrapper {
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border-bottom: 1px solid #E5E5E5;
  width: 100%;
}
.content {
  display: flex;
  justify-content: flex-start;
}
.content-left {
  margin: 10px;
}
.image-wrapper {
  margin: 0 auto;
  border-radius: 80px;
  width: 80px;
  height: 80px;
  overflow: hidden;
  background: #eeeeee;
}
.content-right {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.right-main {
  height: 30px;
  line-height: 30px;
}
.right-main-title {
  font-size: 20px;
}
.right-main-tag {
  color: #ffffff;
  border-radius: 12px;
  padding: 2px 4px;
  font-size: 12px;
}
.img {
  width: 100%;
}
.right-ext {
  color: #666666;
  background: #eeeeee;
  border-radius: 12px;
  padding: 1px 8px;
  font-size: 12px;
}
.girl {
  background: #d90a16;
}
.boy {
  background: #42b983;
}
.setting {
  margin: 15px 10px 0 0 ;
}
.change-baby-btn {
  display: block;
  color: #FF8C00;
  border: 1px solid #FF8C00;
  border-radius: 3px;
  padding: 2px 4px;
  font-size: 14px;
}
</style>
