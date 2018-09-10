<template>
  <div>
    <div
      class="my-panel"
      v-for="(item, index) of noticeList"
      :key="index"
    >
      <div class="my-panel_body">
        <div>
          <user-title
            :img="item.teacher_avatar"
            :title="item.teacher_name + ' － 老师'"
            :desc="item.created_at | formatTime"
          >
            <div slot="ext" class="item-ext-info">
              {{ item.type | formatNoticeType }}
            </div>
          </user-title>

          <h3 v-text="item.title"></h3>
          <image-awesome-flex
            v-if="item.image_list && item.image_list.length"
            :imgList="item.image_list"
            :group="'notice-detail-' + index">
          </image-awesome-flex>
          <div v-html="item.desc"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserTitle from 'components/page/UserTitle'
  import { formatUnixToText } from 'common/date'
  import ImageAwesomeFlex from 'components/page/ImageAwesomeFlex'
  export default {
    name: 'NoticeList',
    components: {
      ImageAwesomeFlex,
      UserTitle
    },
    props: ['noticeList'],
    filters: {
      formatTime (timestamp) {
        return formatUnixToText(timestamp)
      },
      formatNoticeType (type) {
        const typeMap = {
          'class': '',
          'school': ''
        }
        return typeMap[type]
      }
    }
  }
</script>

<style lang="less" scoped>
  .item-ext-info {
    font-size: 12px;
    color: #cacaca;
    margin: 5px;
    text-align: right;
  }
  .item-ext-info span {
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
