<template>
  <div>
    <x-header
      style="width:100%;position:fixed;left:0;right:0;top:0;z-index:99;"
    >
      <span>{{ className }}</span>
      <div slot="right" @click="displayHomeworkCreate">
        <span class="iconfont" style="font-size: 22px;">&#xe670;</span>
      </div>
    </x-header>

    <div>
      <my-better-scroll
        class="better-scroll-wrapper"
        v-if="homeworkList.length"
        ref="scroll"
        :data="homeworkList"
        :pullup="true"
        @scrollToEnd="loadMore"
      >
        <div>
          <homework-panel-list :homeworkList="homeworkList"></homework-panel-list>
          <load-more :show-loading="showLoading"  :tip="loadingTip"></load-more>
        </div>
      </my-better-scroll>
      <no-data v-else></no-data>
    </div>

    <div v-transfer-dom>
      <popup v-model="showHomeworkCreate" position="right" width="100%" >
        <homework-create
          :className="className"
          :classId="classId"
          @on-submit="handleSubmitHomework"
          @on-cancel="handleCancelHomework"
        ></homework-create>
      </popup>
    </div>
  </div>
</template>
<script>
  import HomeworkPanelList from './components/PanelList'
  import MyBetterScroll from 'components/scroll/BetterScroll'
  import NoData from 'components/page/NoData'
  import { _axios } from 'common/myAxios'
  import { XHeader, Popup, LoadMore } from 'vux'
  import HeaderBack from 'views/bar/HeaderBack'
  import FloatFixed from 'views/bar/FloatFixed'
  import HomeworkCreate from './components/HomeworkCreate'

  export default {
    components: {
      HomeworkPanelList,
      MyBetterScroll,
      NoData,
      XHeader,
      Popup,
      LoadMore,
      HeaderBack,
      FloatFixed,
      HomeworkCreate
    },
    data () {
      let classId = this.$route.query.classId
      return {
        currentPage: 1,
        pageCount: 1,
        loadingTip: '加载中',
        homeworkList: [],
        showHomeworkCreate: false,
        classId,
        className: ''
      }
    },
    computed: {
      showLoading () {
        return this.loadingTip === '加载中'
      }
    },
    methods: {
      dateChanged (val) {
        this.date = val
      },
      loadMore () {
        if (this.currentPage > this.pageCount) {
          this.loadingTip = '到底了'
          return
        }
        let requestData = {
          current_page: this.currentPage,
          class_id: this.classId
        }
        _axios.get('/api/wTeacher/homework/getHistory', {params: requestData}).then(res => {
          this.className = res.data.class_name
          this.homeworkList = this.homeworkList.concat(res.data.homework_list)
          this.pageCount = res.page_count
          this.currentPage += 1
          if (this.currentPage > this.pageCount) {
            this.loadingTip = '到底了'
          }
        })
      },
      homeworkFinishToast (item) {
        return item.finish_count > 0 ? '已有' + item.finish_count + '人完成作业，看谁做得好' : '没有人交作业'
      },
      displayHomeworkCreate () {
        this.showHomeworkCreate = true
      },
      handleSubmitHomework () {
        this.showHomeworkCreate = false
        this.initData()
        this.loadMore()
      },
      handleCancelHomework () {
        this.showHomeworkCreate = false
      },
      initData () {
        this.currentPage = 1
        this.pageCount = 1
        this.loadingTip = '加载中'
        this.homeworkList = []
      }
    },
    mounted () {
      this.loadMore()
    }
  }
</script>
<style>
</style>
<style lang="less" scoped>
  .better-scroll-wrapper {
    position: fixed;
    top:46px;
    left: 0;
    bottom:0;
    right:0;
    overflow: hidden;
  }
  .icon-menu-style {
    color: darkorange;
  }
  .homework-img-wrapper {
    width: 30%;
  }
  .img-wrapper {
    width: 50%;
    margin: 0 auto;
  }
  .homework-desc {
    font-size: 13px;
    color: #666666;
    margin-left: 10px;
  }
</style>
