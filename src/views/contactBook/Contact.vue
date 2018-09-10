<template>
  <div class="contact-body-wrapper">
    <x-header
      style="width:100%;position:fixed;left:0;right:0;top:0;z-index:99;"
      :left-options="{preventGoBack: true}"
      @on-click-back="back"
    >
      <span>通讯录</span>
    </x-header>
    <div style="padding-top: 1px;">
      <group title="学校教职工">
        <cell title="学校" value="教师31人" is-link link="/contact/school"></cell>
      </group>
    </div>
    <my-class-list path="/contact/class/teacher"></my-class-list>
    <bar-footer></bar-footer>
  </div>
</template>
<script>
  import { Tab, TabItem, Group, Cell, XHeader } from 'vux'
  import MyClassList from 'views/school/MyClassList'
  import BarFooter from 'views/bar/Footer.vue'

  export default {
    name: 'ContactBook',
    components: {
      Tab,
      TabItem,
      Group,
      Cell,
      XHeader,
      MyClassList,
      BarFooter
    },
    methods: {
      back () {
        this.$router.push('/home')
      }
    }
  }
</script>
<style lang="less" scoped>
@import '~styles/veribles.less';

.contact-body-wrapper {
  margin-top: @headerHeight;
  margin-bottom: @mainMenuFooterHeight;
}
</style>
