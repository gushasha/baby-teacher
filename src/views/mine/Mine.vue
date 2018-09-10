<template>
  <div class="mine-body-wrapper">
    <avatar-tpl :user="user"></avatar-tpl>
    <mine-option></mine-option>
    <div class="unbind-wrapper">
      <x-button type="warn" @click.native="unbind">解除绑定</x-button>
    </div>
    <bar-footer></bar-footer>
  </div>
</template>

<script>
  import BarFooter from 'views/bar/Footer'
  import AvatarTpl from './components/AvatarTpl'
  import MineOption from './components/Option'
  import { XButton } from 'vux'
  export default {
    name: 'Mine',
    data () {
      return {
        user: {
          id: 1,
          avatar: '/static/img/avatar/farther.png',
          mobile: '18200538986',
          name: '李蓝宝'
        }
      }
    },
    components: {
      BarFooter,
      AvatarTpl,
      MineOption,
      XButton
    },
    methods: {
      unbind () {
        this.$router.push('/bind')
      }
    }
}
</script>
<style lang="less" scoped>
  @import '~styles/veribles.less';
  .mine-body-wrapper {
    margin-bottom: @mainMenuFooterHeight;
  }
  .unbind-wrapper {
    margin: 10px;
  }
</style>
