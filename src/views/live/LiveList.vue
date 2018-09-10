<template>
  <div class="wrapper">
    <div class="item-wrapper" v-for="item of liveList" :key="item.id">
      <div class="item-title">
        <span class="title-main"><span class="iconfont title-tag">&#xe659; </span>{{ item.name }}</span>
        <span v-if="item.status" class="iconfont title-tag"><span class="iconfont text-success">&#xe604; </span>在线</span>
        <span v-else class="iconfont title-tag"><span class="iconfont text-offline">&#xe605; </span>离线</span>
      </div>
      <div class="item-img-wrapper" @click="playVideo(item)">
        <div class="center-button-wrapper">
          <span class="iconfont button-font">&#xe6da;</span>
        </div>
        <img
          class="img"
          :src="item.img_url"
          :class="{gray: !item.status}"
        >
      </div>
    </div>
    <header-back></header-back>
  </div>
</template>

<script>
  import HeaderBack from 'views/bar/HeaderBack'
  export default {
    name: 'LiveList',
    components: {
      HeaderBack
    },
    data () {
      return {
        liveList: [
          {
            id: 1,
            name: '活动室',
            status: 1,
            img_url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3506739232,2945471821&fm=26&gp=0.jpg'
          }, {
            id: 2,
            name: '教室',
            status: 1,
            img_url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3506739232,2945471821&fm=26&gp=0.jpg'
          }, {
            id: 3,
            name: '操场',
            status: 0,
            img_url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3506739232,2945471821&fm=26&gp=0.jpg'
          }
        ]
      }
    },
    filters: {
      statusToText (status) {
        let statusMap = {
          1: '在线',
          0: '离线'
        }
        return statusMap[status]
      }
    },
    methods: {
      playVideo (video) {
        if (!video.status) {
          this.$vux.toast.text('摄像头已离线～')
          return
        }
        this.$vux.toast.text('播放视频: ' + video.name)
      }
    }
  }
</script>

<style lang="less" scoped>
  .item-wrapper {
    margin: 0 10px 20px 10px;
    background: #ffffff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    .item-title {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 46px;
      line-height: 46px;
      .title-main {
        font-size: 20px;
        text-align: left;
        .title-tag {
          font-size: 20px;
          color: #3c97b2;
        }
      }
      .title-tag {
        text-align: right;
        font-size: 12px;
        color: #7c7c7c;
      }
      .text-success {
        font-size: 12px;
        color: #42b983;
      }
      .text-offline {
        font-size: 12px;
        color: red;
      }
    }
    .item-img-wrapper {
      position: relative;
      .center-button-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        display:flex;
        justify-content:center;
        align-items:center;
        .button-font {
          color: rgba(255,255,255,0.8);
          font-size: 80px;
        }
      }
      .img {
        width: 100%;
      }
    }
  }
  .itme-tag {
    line-height: 30px;
    padding: 0 8px;
    border-radius: 8px;
    background: orange;
    color: #ffffff;
    font-size: 12px;
    z-index: 20;
  }
  .gray {
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray();
  }
  .desc {
    height: 46px;
    line-height: 46px;
    text-align: right;
    margin-right: 10px;
    color: #7c7c7c;
  }
</style>
