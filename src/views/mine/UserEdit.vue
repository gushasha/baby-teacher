<template>
  <div>
    <div class="header-wrapper">
      <div class="image-wrapper" @click="onClick('avatar')">
        <img class="img" src="http://img1.qunarzz.com/sight/p0/1712/16/165c7022105c4bb4a3.img.jpg">
      </div>
    </div>
    <group label-width="5em">
      <x-input title="姓名" value="李粑粑" text-align="right"></x-input>
      <x-textarea :max="200" :autosize="true" title="个性签名" placeholder="这就是我.."></x-textarea>
      <x-textarea :max="200" :autosize="true" title="家庭住址" value="成都市高新区香年广场T3成都市高新区香年广场T3成都市高新区香年广场T3成都市高新区香年广场T3"></x-textarea>
    </group>
    <div class="btn-wrapper">
      <x-button type="primary" @click.native="submitEdit">提交修改</x-button>
    </div>
    <header-back></header-back>
  </div>
</template>

<script>
  import HeaderBack from 'views/bar/HeaderBack'
  import { Group, XButton, XInput, XTextarea } from 'vux'
  export default {
    name: 'UserEdit',
    components: {
      HeaderBack,
      Group,
      XButton,
      XInput,
      XTextarea
    },
    methods: {
      onClick (type) {
        this.$vux.toast.text(type)
      },
      submitEdit () {
        this.$vux.toast.show({
          type: 'success',
          text: '成功'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .header-wrapper {
    background: #ffffff;
    padding: 15px 0;
  }
  .image-wrapper {
    margin: 0 auto;
    border-radius: 100px;
    width: 100px;
    height: 100px;
    background: #cccccc;
    .img {
      border-radius: 200px;
      width: 100%;
      height: 100%;
    }
  }
  .btn-wrapper {
    padding: 10px;
  }
  .weui-btn_primary {
    background-color: orange;
  }
</style>
