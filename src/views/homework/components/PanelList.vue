<template>
  <div>
    <router-link
      :to="'/homework/detail?id=' + item.id"
      tag="div"
      class="my-panel"
      v-for="(item, index) of homeworkList"
      :key="index"
    >
      <div class="my-panel_body">
        <div>
          <div class="tittle-wrapper vux-1px-b">
            <div class="item-main">{{ item.course_text }}</div>
            <div class="item-ext">{{ item.created_at | formatTime }}</div>
          </div>
          <image-awesome-flex
            v-if="item.image_list && item.image_list.length"
            :imgList="item.image_list"
            :group="'homework-detail-' + index">
          </image-awesome-flex>
          <div v-html="item.desc"></div>
        </div>
      </div>
      <div class="my-panel-footer link-footer">
        <div></div>
        <span class="iconfont item-ext-info link">{{ homeworkFinishToast(item) }} &#xe62d;</span>
      </div>
    </router-link>
  </div>
</template>

<script>
  import UserTitle from 'components/page/UserTitle'
  import { formatUnixToText } from 'common/date'
  import ImageAwesomeFlex from 'components/page/ImageAwesomeFlex'

  export default {
    name: 'HomeworkList',
    components: {
      ImageAwesomeFlex,
      UserTitle
    },
    props: ['homeworkList'],
    methods: {
      homeworkFinishToast (item) {
        return item.finish_count > 0 ? '已有' + item.finish_count + '人完成作业，看谁做得好' : '没有人交作业'
      }
    },
    filters: {
      formatTime (timestamp) {
        return formatUnixToText(timestamp)
      }
    }
  }
</script>

<style lang="less" scoped>
  .item-ext-info {
    font-size: 12px;
    color: #7c7c7c;
    margin: 5px;
    text-align: right;
  }
  .item-ext-info span {
    margin-left: 5px;
    margin-right: 5px;
  }
  .link-footer {
    display: flex;
    justify-content: space-between;
  }
  .link {
    color: #586C94;
  }
  .tittle-wrapper {
    padding: 0 10px;
    .item-main {
      font-size: 18px;
      color: darkorange;
    }
    .item-ext {
      font-size: 12px;
      color: #7c7c7c;
    }
  }
</style>
