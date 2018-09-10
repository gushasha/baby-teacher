<template>
  <div>
    <group title="发布作业">
      <x-input title="班级" text-align="right" :value="className" disabled></x-input>
      <x-textarea title="内容" :max="2000" autosize v-model="desc" :rows="6" placeholder="添加作业吧..."></x-textarea>
    </group>
    <upload-img @change="changeImgList"></upload-img>
    <div class="button-wrapper">
      <div>
        <x-button type="default"  @click.native="handleCancel">取消</x-button>
      </div>
      <div>
        <x-button type="primary"  @click.native="handleSubmit">发布</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { XInput, XTextarea, Group, XButton, Toast } from 'vux'
  import UploadImg from 'components/upload/UploadImg'
  import { _axios } from 'common/myAxios'

  export default {
    components: {
      XInput,
      XTextarea,
      Group,
      XButton,
      Toast,
      UploadImg
    },
    props: ['classId', 'className'],
    data () {
      return {
        desc: '',
        imageList: []
      }
    },
    methods: {
      changeImgList (imageList) {
        this.imageList = imageList
      },
      handleSubmit () {
        if (this.desc.length === 0 && this.imageList.length === 0) {
          this.showError('作业内容不能为空～')
          return
        }
        let requestData = {
          params: {
            class_id: this.classId,
            desc: this.desc,
            image_list: this.imageList
          }
        }
        _axios.get('/api/wTeacher/homework/create', requestData).then(res => {
          this.$vux.toast.show({
            type: 'success',
            text: '成功～'
          })
          this.desc = ''
          this.imageList = []
          this.$emit('on-submit')
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
