<template>
  <div>
    <my-better-scroll
      class="better-scroll-wrapper"
      v-if="recommendList.length"
      ref="scroll"
      :data="recommendList"
      :pullup="true"
      @scrollToEnd="loadMore"
    >
      <div>
        <router-link
          tag="div"
          v-for="(item, index) of recommendList"
          :key=index
          :to="'/recommend/detail?id=' + item.id + '&status=' + status"
          class="item-wrapper vux-1px-b"
        >
          <div>
            <span class="item-title">{{ item.name }}</span>&emsp;
            <span class="item-second">{{ item.age }}岁</span>
          </div>
          <div class="item-second">{{ item.mobile }}</div>
          <div class="item-ext">
            {{ item.recommend_by_name }} 推荐&emsp;
            {{ item.created_at | formatTime}}
          </div>
        </router-link>
        <load-more :show-loading="showLoading"  :tip="loadingTip"></load-more>
      </div>
    </my-better-scroll>
    <no-data v-else></no-data>
  </div>
</template>

<script>
  import { LoadMore } from 'vux'
  import MyBetterScroll from 'components/scroll/BetterScroll'
  import NoData from 'components/page/NoData'
  import { _axios } from 'common/myAxios'
  import { formatUnixToText } from 'common/date'

  export default {
    name: 'NoticeBody',
    components: {
      LoadMore,
      MyBetterScroll,
      NoData
    },
    props: ['status'],
    data () {
      return {
        currentPage: 1,
        pageCount: 1,
        loadingTip: '加载中',
        recommendList: []
      }
    },
    computed: {
      showLoading () {
        return this.loadingTip === '加载中'
      }
    },
    watch: {
      status () {
        this.initData()
      }
    },
    methods: {
      initData () {
        this.currentPage = 1
        this.pageCount = 1
        this.loadingTip = '加载中'
        this.recommendList = []
        this.loadMore()
      },
      loadMore () {
        if (this.currentPage > this.pageCount) {
          this.loadingTip = '到底了'
          return
        }
        let requestData = {
          current_page: this.currentPage,
          status: this.status
        }
        _axios.get('/api/wTeacher/recommend/list', {params: requestData}).then(res => {
          this.recommendList = this.recommendList.concat(res.data)
          this.pageCount = res.page_count
          this.currentPage += 1
          if (this.currentPage > this.pageCount) {
            this.loadingTip = '到底了'
          }
        })
      }
    },
    filters: {
      formatTime (timestamp) {
        return formatUnixToText(timestamp)
      }
    },
    mounted () {
      this.loadMore()
    }
  }
</script>
<style lang="less" scoped>
  .better-scroll-wrapper {
    position: fixed;
    top:90px;
    left: 0;
    bottom:0;
    right:0;
    overflow: hidden;
    background: #ffffff;
  }
  .icon-menu-style {
    color: darkorange;
  }
  .notice-img-wrapper {
    width: 30%;
  }
  .img-wrapper {
    width: 50%;
    margin: 0 auto;
  }
  .notice-desc {
    font-size: 13px;
    color: #666666;
    margin-left: 10px;
  }
  .item-wrapper {
    padding: 10px;
    .item-title {
      font-size: 16px;
    }
    .item-second {
      font-size: 13px;
    }
    .item-ext {
      color: #9B9B9B;
      font-size: 12px;
    }
  }
</style>
