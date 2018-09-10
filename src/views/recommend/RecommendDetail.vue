<template>
  <div>
    <header-back :path="'/recommend/list?status=' + status"></header-back>
    <group title="推荐详情">
      <cell title="宝贝姓名" :value="recommendInfo.name"></cell>
      <cell title="性别" :value="recommendInfo.gender | formatGender"></cell>
      <cell title="年龄" :value="recommendInfo.age + '岁'"></cell>
      <cell title="家长姓名" :value="recommendInfo.guardian_name"></cell>
      <cell title="家长电话" :value="recommendInfo.mobile"></cell>
    </group>
    <group  label-width="5em" >
      <cell title="推荐人" :value="recommendInfo.recommend_by_name"></cell>
      <cell title="推荐日期" :value="recommendInfo.created_at | formatTime"></cell>
      <cell title="推荐语" :value="recommendInfo.desc"  value-align="left"></cell>
    </group>
    <div class="content-wrapper">
      <div class="main-title" @click="displayVisit">
        <span>回访记录</span>
        <span class="iconfont">&#xe611;</span>
      </div>
      <div class="list-wrapper">
        <div class="list-item vux-1px-t" v-for="(item,index) of recommendInfo.visit_list" :key="index">
          <div class="item-ext">{{ item.teacher_name }}&emsp;{{ item.visit_at | formatTime }}</div>
          <div class="item-desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
    <div class="button-list-wrapper" v-if="statusTextButton.length">
      <div v-for="item of statusTextButton" :key="item.tag">
        <x-button mini plain type="primary" @click.native="changeStatus(item.tag)">{{ item.text }}</x-button>
      </div>
    </div>
    <!-- 填写回访记录 -->
    <div v-transfer-dom>
      <popup v-model="showVisitEdit" >
        <group title="回访记录">
          <x-textarea :max="500" placeholder="请填写回访内容" :rows="6" autosize v-model="visitDesc"></x-textarea>
        </group>
        <x-button type="primary" @click.native="submitVisit">提交</x-button>
      </popup>
    </div>
  </div>
</template>

<script>
  import HeaderBack from 'views/bar/HeaderBack'
  import { formatUnixToText } from 'common/date'
  import { genderToText } from 'common/map'
  import { _axios } from 'common/myAxios'
  import { Group, Cell, Popup, XTextarea, XButton } from 'vux'
  export default {
    name: 'RecommendDetail',
    components: {
      HeaderBack,
      Group,
      Cell,
      Popup,
      XTextarea,
      XButton
    },
    data () {
      return {
        recommendInfo: {},
        showVisitEdit: false,
        visitDesc: '',
        status: this.$route.query.status
      }
    },
    computed: {
      statusTextButton () {
        let status = this.recommendInfo.status
        if (status === 'new') {
          return [
            {text: '跟进中', tag: 'process'},
            {text: '已报名', tag: 'complete'},
            {text: '无效', tag: 'invalid'}
          ]
        }
        if (status === 'process') {
          return [
            {text: '已报名', tag: 'complete'},
            {text: '无效', tag: 'invalid'}
          ]
        }
        return []
      }
    },
    methods: {
      getRecommendInfo () {
        let requestData = {
          id: this.$route.query.id
        }
        _axios.get('/api/wTeacher/recommend/detail', {params: requestData}).then(res => {
          this.recommendInfo = res
        })
      },
      displayVisit () {
        this.showVisitEdit = true
      },
      submitVisit () {
        this.showVisitEdit = false
        this.visitDesc = ''
        this.$vux.toast.show({
          type: 'success',
          text: '添加成功'
        })
        this.getRecommendInfo()
      },
      changeStatus (to) {
        this.recommendInfo.status = to
        // TODO: axios
        this.$vux.toast.show({
          type: 'success',
          text: '标记成功'
        })
      }
    },
    filters: {
      formatTime (timestamp) {
        return formatUnixToText(timestamp)
      },
      formatGender (gender) {
        return genderToText(gender)
      }
    },
    mounted () {
      this.getRecommendInfo()
    }
  }
</script>

<style lang="less" scoped>
@import '~styles/veribles.less';

.content-wrapper {
  margin-top: 20px;
  background: #ffffff;
  .main-title {
    margin: 0 10px;
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 500;
    color: @colorWarning;
  }
  .list-wrapper {
  }
  .list-item {
    padding: 10px;
    .item-ext {
      font-size: 12px;
      color: @placeholderColor;
    }
  }
}
  .button-list-wrapper {
    margin-top: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    background: #ffffff;
  }
</style>
