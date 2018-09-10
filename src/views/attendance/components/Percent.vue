<template>
  <div class="body-wrapper">
    <div class="wrapper">
      <div class="circle-wrapper">
        <x-circle
          :percent="calculatePercent"
          :stroke-width="6"
          :trail-width="2"
          trail-color="#6ABD9E"
          stroke-color="#ffffff">
          <div class="percent-active-text">{{ calculatePercent }}%</div>
          <div class="percent-ext-text">日出勤率</div>
        </x-circle>
      </div>
      <span class="circle-ext">{{ ext }}出勤人数：{{ onCount }} / {{ total }}</span>
    </div>
  </div>
</template>

<script>
  import { XCircle } from 'vux'
  export default {
    name: 'AttendancePercent',
    components: {
      XCircle
    },
    props: [
      'total',
      'onCount',
      'ext'
    ],
    computed: {
      calculatePercent () {
        if (this.total === 0) {
          return 0
        }
        return this.onCount / this.total * 100
      }
    }
  }
</script>

<style lang="less" scoped>
  .body-wrapper {
    background: #76d0b1;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .circle-wrapper {
      text-align: center;
      height: 120px;
      width: 120px;
      margin-top: 20px;
      .circle-title {
        font-size: 14px;
        color: #6d6d6d;
      }
      .percent-active-text {
        font-size: 22px;
        color: #ffffff;
      }
      .percent-ext-text {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    .circle-ext {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
</style>
