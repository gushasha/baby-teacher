<template>
  <div class="body-wrapper">
    <x-header
      style="width:100%;position:fixed;left:0;right:0;top:0;z-index:99;"
    >{{ className }} 今日体温</x-header>
    <x-table>
      <thead>
      <tr>
        <th>姓&emsp;名</th>
        <th>体&emsp;温</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item of studentList" :key="item.id">
        <td>{{ item.name }}</td>
        <td style="line-height: 30px;">
          <div v-for="(bbtItem, bbtIndex) of item.bbt" :key="bbtIndex"  >
            <span :style="bbtStyle(bbtItem.value)">
              {{ bbtItem.value }}
              <span class="iconfont" style="font-size: 12px"> &#xe61e;</span>
            </span>
            <span style="color: #9B9B9B;font-size: 12px;">【{{ bbtItem.time | formatTime }}】</span>
          </div>
        </td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
  import { formatUnixToText } from 'common/date'
  import { XHeader, XTable } from 'vux'
  export default {
    name: 'HealthClassDetail',
    components: {
      XHeader,
      XTable
    },
    data () {
      let classId = this.$route.query.classId
      return {
        classId,
        className: '',
        studentList: []
      }
    },
    methods: {
      getDetail () {
        this.className = '🍎苹果一班'
        this.studentList = [
          {id: 1, name: 'Bobby', bbt: [{time: 1500090909, value: 36.7}, {time: 1500010909, value: 39.7}]},
          {id: 2, name: '蓝宝', bbt: [{time: 1500090909, value: 35.7}, {time: 1500080909, value: 37.7}, {time: 1500070909, value: 39.0}, {time: 1500080910, value: 39.0}]},
          {id: 21, name: '蓝宝', bbt: [{time: 1500090909, value: 36.7}, {time: 1500080909, value: 36.8}, {time: 1500070909, value: 37.0}, {time: 1500080910, value: 37.2}]},
          {id: 22, name: '小鱼儿', bbt: [{time: 1500090909, value: 36.7}, {time: 1500080909, value: 36.8}, {time: 1500070909, value: 37.0}, {time: 1500080910, value: 37.2}]},
          {id: 23, name: 'Catty', bbt: [{time: 1500090909, value: 36.7}, {time: 1500080909, value: 36.8}, {time: 1500070909, value: 37.0}, {time: 1500080910, value: 37.2}]},
          {id: 24, name: '小羽', bbt: [{time: 1500090909, value: 36.7}, {time: 1500080909, value: 36.8}, {time: 1500070909, value: 37.0}, {time: 1500080910, value: 37.2}]},
          {id: 25, name: '墨鱼仔', bbt: [{time: 1500090909, value: 36.7}, {time: 1500080909, value: 36.8}, {time: 1500070909, value: 37.0}, {time: 1500080910, value: 37.2}]},
          {id: 26, name: '蓝田玉暖', bbt: [{time: 1500090909, value: 36.7}, {time: 1500080909, value: 36.8}, {time: 1500070909, value: 37.0}, {time: 1500080910, value: 37.2}]},
          {id: 3, name: '皮皮', bbt: [{time: 1500070909, value: 36.7}]},
          {id: 4, name: '柠檬', bbt: [{time: 1500090900, value: 37.0}, {time: 1500060909, value: 39.0}]}
        ]
      },
      bbtStyle (value) {
        let textColor
        if (value >= 36.5 && value <= 37.5) {
          textColor = '#4FCE98'
        } else if (value > 35.5 && value < 38.5) {
          textColor = '#FFA500'
        } else {
          textColor = '#FF0000'
        }
        return {color: textColor, 'font-size': '20px'}
      }
    },
    filters: {
      formatTime (timestamp) {
        return formatUnixToText(timestamp, 'hh:mm')
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/veribles.less';

  .body-wrapper {
    background: #ffffff;
    margin-top: @headerHeight;
  }
</style>
