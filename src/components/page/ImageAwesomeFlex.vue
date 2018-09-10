<template>
  <div class="box-wrapper">
    <flexbox
      :gutter="0"
      wrap="wrap"
    >
      <flexbox-item
        v-for="(item, index) of imgList"
        :key="index"
        :span="1/gridCols"
      >
        <div
          class="item"
        >
          <img
            :preview="group"
            class=" flex-img"
            :src="item"
          />
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { Flexbox, FlexboxItem } from 'vux'

  export default {
    props: {
      imgList: Array,
      group: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        showBigImg: false,
        selectedImg: ''
      }
    },
    components: {
      Flexbox,
      FlexboxItem
    },
    computed: {
      gridCols () {
        const imgCount = this.imgList.length
        if (imgCount <= 0) {
          return []
        }
        let groupCount = 0
        switch (true) {
          case imgCount === 0:
            groupCount = 0
            break
          case imgCount === 1:
            groupCount = 0
            break
          case imgCount <= 4:
            groupCount = 2
            break
          default:
            groupCount = 3
            break
        }
        return groupCount
      }
    }
  }
</script>

<style lang="less" scoped>
  .box-wrapper {
    padding: 10px 0;
  }
  .item {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
  }
  .flex-img {
    width: 100%;
    padding: 3px 3px;
    box-sizing: border-box;
  }
</style>
