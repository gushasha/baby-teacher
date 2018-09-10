<template>
  <div class="body-wrapper">
    <div v-for="(groupItem, date) in picGroupList" :key="date">
      <divider>{{ date }}</divider>
      <flexbox :gutter="0" wrap="wrap" class="item-wrapper">
        <flexbox-item
          :span="1/4"
          v-for="item of groupItem"
          :key="item.id"
        >
          <div class="img-wrapper">
            <img
              :preview="date"
              :preview-text="date"
              class="img"
              :src="item.img_url"
            >
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem, Divider } from 'vux'
  import { formatUnixToText } from 'common/date'
  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Divider
    },
    props: ['pictureLIst'],
    data () {
      return {
        showBigImg: false
      }
    },
    computed: {
      picGroupList () {
        let picGroup = {}
        for (let item of this.pictureLIst) {
          let currentDate = item.date
          if (typeof picGroup[currentDate] === 'undefined') {
            picGroup[currentDate] = []
          }
          picGroup[currentDate].push(item)
        }
        return picGroup
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
  .body-wrapper {
  }
  .item-wrapper {
    margin: 10px auto;
    background: #ffffff;
  }
  .img-wrapper {
    padding: 5px;
  }
  .img {
    width: 100%;
  }
</style>
