<template>
  <div>
    <group title="收件人">
      <popup-radio title="选择老师" :options="teacherList" v-model="teacherId"></popup-radio>
    </group>
    <group title="留言内容">
      <x-textarea :max="500" autosize v-model="content" :rows="6"></x-textarea>
    </group>
    <div class="button-wrapper">
      <div>
        <x-button mini type="default"  @click.native="handleCancel">取消</x-button>
      </div>
      <div>
        <x-button mini type="primary"  @click.native="handleSubmit">提交</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { XTextarea, Group, XButton, Toast, PopupRadio } from 'vux'
  import { _axios } from 'common/myAxios'

  export default {
    name: 'MessageCreate',
    components: {
      XTextarea,
      Group,
      XButton,
      Toast,
      PopupRadio
    },
    props: ['msgId'],
    data () {
      return {
        content: '',
        teacherList: [
          {key: '1', value: '李香橙 18200538986'},
          {key: '2', value: '李蓝宝'},
          {key: '3', value: '李黑皮'},
          {key: '4', value: '444'}
        ],
        teacherId: ''
      }
    },
    methods: {
      handleSubmit () {
        if (this.content.length === 0) {
          this.showError('内容不能为空～')
          return
        }
        let requestData = {
          params: {
            content: this.content,
            message_id: this.msgId
          }
        }
        _axios.get('/api/wTeacher/message/replyCreate', requestData).then(res => {
          this.$vux.toast.show({
            type: 'success',
            text: '成功～'
          })
          this.$router.history.go(-1)
        })
      },
      handleCancel () {
        this.$router.history.go(-1)
      },
      showError (msg) {
        this.$vux.toast.text(msg, 'middle')
      }
    }
  }
</script>

<style lang="less" scoped>
.button-wrapper {
  background: #ffffff;
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
