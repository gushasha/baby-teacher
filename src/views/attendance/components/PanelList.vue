<template>
  <div>
    <div
      class="my-panel"
      v-for="(item, index) of attendanceList"
      :key="index"
    >
      <div
        class="my-panel_body "
      >
        <div class="attendance-content-wrapper">
          <div class="attendance-img-wrapper">
            <img
              :src="item.img_url"
              preview="attendance-history"
              :preview-text="formatPreviewText(item)"
            >
          </div>
          <div class="attendance-desc">
            <p><strong>时&emsp;间：</strong> {{ formatTime(item.card_time) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatUnixToText } from 'common/date'
  export default {
    name: 'PanelList',
    components: {},
    props: ['attendanceList'],
    methods: {
      formatPreviewText (item) {
        return item.name + ' 于 ' + this.formatTime(item.card_time) + ' 刷卡'
      },
      formatTime (timestamp) {
        return formatUnixToText(timestamp, 'yyyy-MM-dd h:m')
      }
    }
  }
</script>

<style lang="less" scoped>
  .attendance-content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .attendance-img-wrapper {
    width: 200px;
    height: 200px;
    overflow: hidden;
  }
  .attendance-img-wrapper img {
    width: 100%;
  }
  .attendance-desc {
    font-size: 13px;
    color: #666666;
    margin-left: 10px;
  }
</style>
