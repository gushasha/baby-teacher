<template>
  <div class="body-wrapper">
    <!-- 顶部返回按钮 -->
    <header-back path="/home"></header-back>
    <!-- 日期选择器 -->
    <week-date-picker
      v-if="date"
      :checkedDate="date"
      @change="dateChanged"
    ></week-date-picker>
    <!-- 内容 -->
    <no-data v-if="recipeList.length === 0">
      <div slot="ext">尚未添加食谱...</div>
    </no-data>
    <div class="content-wrapper">
      <div v-for="item of recipeList" class="item-wrapper vux-1px-b">
        <div class="item-title">{{ item.type }}</div>
        <div class="item-content">{{ item.item }}</div>
        <div class="item-img-list">
          <div class="img-item" v-for="img of item.img_list">
            <img
              class="img"
              :src="img"
              :preview="item.type"
              :preview-text="item.type"
            />
          </div>
        </div>
      </div>
    </div>
    <float-fixed><span @click="toEdit" class="iconfont icon-text">&#xea2d;</span></float-fixed>
  </div>
</template>

<script>
  import HeaderBack from 'views/bar/HeaderBack'
  import NoData from 'components/page/NoData'
  import WeekDatePicker from 'components/date/WeekDatePicker'
  import { _axios } from 'common/myAxios'
  import FloatFixed from 'views/bar/FloatFixed'
  import { today } from 'common/date'

  export default {
    name: 'Recipe',
    components: {
      NoData,
      HeaderBack,
      WeekDatePicker,
      FloatFixed
    },
    data () {
      return {
        recipeList: '',
        date: ''
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
      dateChanged (val) {
        this.date = val
        this.getRecipeInfo()
      },
      toEdit () {
        this.$router.push('/recipe/edit?date=' + this.date)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.date = this.$route.query.date || today()
        this.getRecipeInfo()
      })
    }
  }
</script>

<style lang="less" scoped>
  .body-wrapper {
    width: 100%;
  }
  .content-wrapper {
    position: relative;
  }
  .item-wrapper {
    background: #ffffff;
    margin: 15px auto;
    padding: 10px;
    box-sizing: border-box;
  }
  .item-title {
    font-size: 14px;
    color: darkorange;
  }
  .item-content {
    font-size: 16px;
    color: #7c7c7c;
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
