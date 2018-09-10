<template>
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page, index) of pages" :key="index">
        <router-link
           :to="item.router"
           tag="div"
           class="icon"
           v-for="item of page"
           :key="item.id"
        >
          <div class="icon-img">
            <img class="icon-img-content" :src="item.imgUrl"/>
          </div>
          <p class="icon-desc" v-text="item.desc"></p>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { homeIcons } from 'common/icon'

  export default {
    name: 'HomeIcons',
    data () {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            bulletActiveClass: 'home-icons-bullet-active'
          }
        },
        iconList: homeIcons
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      pages () {
        let pages = []
        this.iconList.forEach((item, index) => {
          let page = Math.floor(index / 8)
          if (!pages[page]) {
            pages[page] = []
          }
          pages[page].push(item)
        })
        return pages
      }
    }
  }
</script>
<style lang="less">
  .home-icons-bullet-active {
    opacity: 1;
    background: #666;
  }
</style>
<style lang="less" scoped>
  @import '~styles/veribles.less';
  .icons {
    background: #ffffff;
  }
  .icon {
    float:left;
    width: 25%;
    height: 0;
    padding-bottom: 25%;
    position: relative;
  }
  .icon-img {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    bottom: 20px;
    box-sizing: border-box;
    padding: 5px;
  }
  .icon-img-content {
    width: 60%;
    display: block;
    margin: 0 auto;
  }
  .icon-desc {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: @bodyFontColor;
    /*ellipse();*/
  }
</style>
