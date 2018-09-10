<template>
  <div>
    <group title="您的联系方式">
      <x-input title="姓&emsp;名" required v-model="contacter.name"></x-input>
      <x-input title="手机号" :max="13" is-type="china-mobile" v-model="contacter.mobile"></x-input>
      <x-input title="邮&emsp;箱" is-type="email" v-model="contacter.email"></x-input>
    </group>
    <group title="选择类型">
      <popup-radio title="意见类型" :options="adviceTypeMap" v-model="type"></popup-radio>
    </group>
    <group title="您的意见与建议">
      <x-textarea
        :min="1"
        :max="500"
        :rows="5"
        :autosize="true"
        v-model="desc"
      ></x-textarea>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="submitAdvice" type="primary">提&emsp;交</x-button>
    </div>
    <header-back></header-back>
  </div>
</template>
<script>
  import HeaderBack from 'views/bar/HeaderBack'
  import { XTextarea, Group, XInput, XButton, PopupRadio } from 'vux'
  import { _axios } from 'common/myAxios'
  import { adviceTypeMap } from 'common/map'
  export default {
    components: {
      HeaderBack,
      XTextarea,
      Group,
      XInput,
      XButton,
      PopupRadio
    },
    data () {
      return {
        adviceTypeMap,
        type: '1',
        contacter: {
          name: '',
          mobile: '',
          email: ''
        },
        desc: ''
      }
    },
    methods: {
      submitAdvice () {
        let requestData = {
          contacter: this.contacter,
          type: this.type,
          desc: this.desc
        }
        _axios.get('/api/wTeacher/advice/create', {param: requestData}).then(res => {
          this.$vux.toast.show({
            type: 'success',
            text: '成功'
          })
        })
      }
    }
  }
</script>
<style>
</style>
<style lang="less" scoped>
</style>
