<template>
  <div>
    <group title="发布一条通知">
      <cell title="发布范围" :value="rangeText" is-link @click.native="showUserSelect=true"></cell>
      <x-textarea v-model="title" title="标题" :max="50" :min="1" :show-counter="false" :rows="1" autosize></x-textarea>
      <x-textarea v-model="desc" title="内容" :max="2000" placeholder="输入通知内容..." :rows="5" autosize></x-textarea>
    </group>
    <upload-img @change="changeImgList"></upload-img>
    <div class="button-wrapper">
      <div>
        <x-button type="default" mini @click.native="handleCancel">取消</x-button>
      </div>
      <div>
        <x-button type="primary" mini @click.native="handleSubmit">发布</x-button>
      </div>
    </div>

    <div v-transfer-dom>
      <popup v-model="showUserSelect" height="100%">
        <user-select @selected="onUserSelected" @cancel="onSelectCancel"></user-select>
      </popup>
    </div>
  </div>
</template>

<script>
  import { Group, XTextarea, Cell, XButton, Popup } from 'vux'
  import UploadImg from 'components/upload/UploadImg'
  import { _axios } from 'common/myAxios'
  import UserSelect from 'views/school/components/UserSelect'

  export default {
    components: {
      Group,
      XTextarea,
      Cell,
      XButton,
      Popup,
      UploadImg,
      UserSelect
    },
    data () {
      return {
        showUserSelect: false,
        rangeText: '请选择',
        title: '',
        desc: '',
        imageList: []
      }
    },
    methods: {
      changeImgList (imageList) {
        this.imageList = imageList
      },
      handleSubmit () {
        if (this.title.length === 0) {
          this.showError('标题不能为空～')
          return
        }
        if (this.desc.length === 0 && this.imageList.length === 0) {
          this.showError('内容不能为空～')
          return
        }
        let requestData = {
          params: {
            class_id: this.classId,
            desc: this.desc,
            image_list: this.imageList
          }
        }
        _axios.get('/api/wTeacher/notice/create', requestData).then(res => {
          this.$vux.toast.show({
            type: 'success',
            text: '成功～'
          })
          this.desc = ''
          this.imageList = []
          this.$router.push({name: 'NoticeSendList'})
        })
      },
      handleCancel () {
        this.$router.go(-1)
      },
      showError (msg) {
        this.$vux.toast.text(msg, 'middle')
      },
      onUserSelected (type) {
        this.rangeText = type === 'all' ? '全体人员' : '部分人员'
        this.showUserSelect = false
      },
      onSelectCancel () {
        this.showUserSelect = false
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
