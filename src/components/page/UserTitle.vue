<template>
  <div class="user-title-body-wrapper">
    <div class="left">
      <div class="avatar">
        <div class="img-wrapper">
          <img style="width: 100%" :src="img">
        </div>
      </div>
      <div class="content">
        <div class="title">{{ title }}</div>
        <div class="desc">{{ desc }}</div>
      </div>
    </div>
    <div class="right">
      <slot name="ext"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserTitle',
    props: ['img', 'title', 'desc']
  }
</script>

<style lang="less" scoped>
.user-title-body-wrapper {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
}
.left {
  display: flex;
  justify-content: flex-start;
}
.avatar {
  margin-right: 10px;
}
.img-wrapper {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50px;
  overflow: hidden;
  background: #eeeeee;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  font-size: 14px;
  font-weight: bold;
}
.desc {
  font-size: 12px;
  color: #7c7c7c;
}
</style>
