<template>
  <div>
    <x-header
      style="width:100%;position:fixed;left:0;right:0;top:0;z-index:99;"
    >
      <span>{{ date }} 周{{ week }}食谱</span>
      <div slot="right" @click="submitEdit">
        <span class="iconfont">&#xe69a;</span>
      </div>
    </x-header>
    <div class="content-wrapper">
      <div v-for="(item, index) of recipeList" class="item-wrapper vux-1px-b">
        <div class="item-title">{{ item.type }}</div>
        <group :gutter="0">
          <x-textarea
            placeholder="吃点什么？"
            :value="item.item"
            :rows="1"
            :autosize=true
            style="color: #666666"
          ></x-textarea>
        </group>
        <div>
          <upload-img
            :imgs="item.img_list"
            :ext="index"
            :max="5"
            @change="changeImgList"
          ></upload-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UploadImg from 'components/upload/UploadImg'
  import { getWeekByDate } from 'common/date'
  import { _axios } from 'common/myAxios'
  import { XTextarea, Group, XHeader } from 'vux'
  export default {
    name: 'RecipeEdit',
    components: {
      UploadImg,
      XTextarea,
      Group,
      XHeader
    },
    data () {
      return {
        date: this.$route.query.date,
        recipeList: []
      }
    },
    computed: {
      week () {
        return getWeekByDate(this.date)
      }
    },
    methods: {
      getRecipeInfo () {
        let requestData = {
          params: {
            date: this.date
          }
        }
        _axios.get('/api/wTeacher/recipe/getByDate', requestData).then(res => {
          this.recipeList = res.recipe_list
          this.$previewRefresh()
        })
      },
      changeImgList (newList, index) {
        this.recipeList[index].img_list = newList
      },
      submitEdit () {
        let requestData = {
          params: {
            date: this.date
          }
        }
        _axios.get('/api/wTeacher/recipe/edit', requestData).then(res => {
          this.$vux.toast.show({
            type: 'success',
            text: '成功'
          })
          this.$router.push('/recipe?date=' + this.date)
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getRecipeInfo()
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/veribles.less';

  .body-wrapper {
    width: 100%;
  }
  .main-title-wrapper {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #82d2ff;
    /*background: #42b983;*/
    .main-title {
      font-size: 20px;
      color: #ffffff;
      /*color: #25a4bb;*/
    }
  }
  .content-wrapper {
    margin-top: @headerHeight;
    position: relative;
  }
  .item-wrapper {
    background: #ffffff;
    margin-top: 15px;
    box-sizing: border-box;
  }
  .item-title {
    height: 40px;
    line-height: 40px;
    text-indent: 15px;
    font-size: 16px;
    color: darkorange;
  }
  .item-img-list {
    display: flex;
    justify-content: flex-start;
  }
  .img-item {
    margin: 3px;
    width: 23%;
  }
  .img {
    width: 100%;
  }
  .icon-text {
    font-size: 30px;
    font-weight: 500;
  }
</style>
