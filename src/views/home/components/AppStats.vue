<template>
  <div class="body-wrapper">
    <div class="main-title">公众号绑定</div>
    <div class="wrapper">
      <div class="circle-wrapper">
        <x-circle
          :percent="calculateBindPercent(student)"
          :stroke-width="6"
          :trail-width="6"
          trail-color="#EFEFEF"
          stroke-color="#ff6d3c">
          <div class="percent-active-text">{{ calculateBindPercent(student) }}%</div>
          <div class="percent-ext-text">学生</div>
        </x-circle>
      </div>
      <div class="list-wrapper">
        <div class="list-item">
          <span class="iconfont active">&#xe607;</span>
          <span class="list-title ">绑定人数</span>
          <span class="list-text">{{ student.bind_count }}人</span>
        </div>
        <div class="list-item">
          <span class="iconfont silent">&#xe607;</span>
          <span class="list-title">未绑定人数</span>
          <span class="list-text">{{ student.unbind_count }}人</span>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="circle-wrapper">
        <x-circle
          :percent="calculateBindPercent(teacher)"
          :stroke-width="6"
          :trail-width="6"
          trail-color="#EFEFEF"
          stroke-color="#71c6ff">
          <div class="percent-active-light-text">{{ calculateBindPercent(teacher) }}%</div>
          <div class="percent-ext-text">教师</div>
        </x-circle>
      </div>
      <div class="list-wrapper">
        <div class="list-item">
          <span class="iconfont active-light">&#xe607;</span>
          <span class="list-title ">绑定人数</span>
          <span class="list-text">{{ teacher.bind_count }}人</span>
        </div>
        <div class="list-item">
          <span class="iconfont silent">&#xe607;</span>
          <span class="list-title">未绑定人数</span>
          <span class="list-text">{{ teacher.unbind_count }}人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XCircle } from 'vux'
  export default {
    name: 'HomeAppStats',
    components: {
      XCircle
    },
    props: ['appStats'],
    computed: {
      teacher () {
        return this.appStats.teacher || {
          bind_count: 0,
          unbind_count: 0
        }
      },
      student () {
        return this.appStats.student || {
          bind_count: 0,
          unbind_count: 0
        }
      }
    },
    methods: {
      calculateBindPercent (item) {
        let total = item.bind_count + item.unbind_count
        if (total <= 0) {
          return 0
        }
        return (item.bind_count / total * 100).toFixed(2) - 0
      }
    }
  }
</script>

<style lang="less" scoped>
.body-wrapper {
  margin-top: 10px;
  background: #ffffff;
}
.main-title {
  text-indent: 10px;
  font-weight: 500;
  font-size: 15px;
  line-height: 40px;
  height: 40px;
  color: #4d4d4d;
}
.wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .circle-wrapper {
    text-align: center;
    padding: 10px;
    height: 120px;
    width: 120px;
    .circle-title {
      font-size: 14px;
      color: #6d6d6d;
    }
    .percent-active-text {
      font-size: 22px;
      color: #ff6d3c;
    }
    .percent-active-light-text {
      font-size: 22px;
      color: #71c6ff;
    }
    .percent-ext-text {
      font-size: 14px;
      color: #666666;
    }
  }
}
  .list-wrapper {
    .list-item {
      height: 24px;
      line-height: 24px;
    }
    .active {
      color: #ff6d3c;
    }
    .silent {
      color: #cccccc;
    }
    .active-light {
      color: #71c6ff;
    }
    .silent {
      color: #cccccc;
    }
    .list-title {
      font-size: 12px;
      color: #858585;
      margin: 0 8px 0 2px;
    }
    .list-text {
      font-size: 14px;
      color: #666666;
    }
  }
</style>
