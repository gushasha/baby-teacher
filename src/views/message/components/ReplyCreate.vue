<template>
  <div>
    <group title="回复留言">
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
  import { XTextarea, Group, XButton, Toast } from 'vux'
  import { _axios } from 'common/myAxios'

  export default {
    name: 'MessageReplyCreate',
    components: {
      XTextarea,
      Group,
      XButton,
      Toast
    },
    props: ['msgId'],
    data () {
      return {
        content: ''
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
          this.content = ''
          this.$emit('on-submit', this.msgId, res)
        })
      },
      handleCancel () {
        this.$emit('on-cancel')
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
