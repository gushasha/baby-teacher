<template>
  <div class="contact-body-wrapper">
    <div style="height:44px;" >
      <sticky
        :offset="0"
        :check-sticky-support="false"
        :disabled="disabled"
      >
        <x-header>
          <span>学校通讯录</span>
        </x-header>
      </sticky>
    </div>
    <contact-teacher></contact-teacher>
  </div>
</template>
<script>
  import { XHeader, Sticky } from 'vux'
  import ContactTeacher from './components/Teacher'

  export default {
    name: 'ContactBook',
    components: {
      XHeader,
      Sticky,
      ContactTeacher
    },
    data () {
      return {
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent)
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
