<template>
  <div class="week-slider-body">
    <div class="year_str" v-if="showDate">
      <span @click="toPreviousWeek" class="iconfont to-next">&#xe720;上一周&emsp;</span>
      <span class="checked-date">{{ checked }}</span>
      <span @click="toNextWeek" class="iconfont to-next">&emsp;下一周&#xe6f8;</span>
    </div>
    <div class="week-slider" v-if="reset">
      <div
        class="sliders"
        ref="sliders"
        @touchstart="touchstartHandle"
        @touchmove="touchmoveHandle"
        @touchend="touchendHandle">
        <template v-for="(item, index) in dates">
          <div class="slider"
               :style="getTransform(index)"
               @webkit-transition-end="onTransitionEnd(index)"
               @transitionend="onTransitionEnd(index)">
            <div class="day" v-for="day in getDaies(item.date)">
              <div
                class="day-button-content"
                @click.stop="dayClickHandle(day)"
                :class="{today: day.isToday, sameDay: day.isDay && !day.isToday, checkedDay: day.date === checked}"
              >
                <span class="week-item">{{day.week}}</span><br>
                <span class="date-item">{{day.date.split('-')[2]}}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'WeekDatePicker',
    props: {
      checkedDate: {
        type: String
      },
      showDate: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        defaultDate: this.checkedDate || moment().format('YYYY-MM-DD'),
        dates: [],
        direction: null,
        activeIndex: 1,
        isAnimation: false,
        checked: this.checkedDate,
        start: {
          x: null,
          y: null
        },
        end: {
          x: null,
          y: null
        },
        distan: {
          x: 0,
          y: 0
        },
        sliderWidth: 0,
        reset: true
      }
    },
    mounted () {
      this.sliderWidth = this.$refs.sliders.offsetWidth
    },
    created () {
      let vm = this
      this.dates.push(
        {
          date: moment(vm.defaultDate).subtract(7, 'd').format('YYYY-MM-DD')
        },
        {
          date: vm.defaultDate
        },
        {
          date: moment(vm.defaultDate).add(7, 'd').format('YYYY-MM-DD')
        }
      )
    },
    methods: {
      /**
       *获取制定日期的当前周的日期数据
       */
      getDaies (date) {
        let vm = this
        let arr = []
        let weekOfDate = Number(moment(date).format('E'))
        let weeks = ['日', '一', '二', '三', '四', '五', '六']
        let today = moment()
        let defaultDay = moment(vm.defaultDate)
        if (weekOfDate === 7) {
          weekOfDate = 0
        }
        for (let i = 0; i < 7; i++) {
          let _theDate = moment(date).subtract(weekOfDate - i, 'd')
          arr.push({
            date: _theDate.format('YYYY-MM-DD'),
            week: weeks[i],
            isToday: _theDate.format('YYYY-MM-DD') === today.format('YYYY-MM-DD'),
            isDay: _theDate.format('E') === defaultDay.format('E')
          })
        }
        return arr
      },
      /**
       *根据索引计算出样式
       */
      getTransform (index) {
        let vm = this
        let style = {}
        if (index === vm.activeIndex) {
          style['transform'] = 'translateX(' + vm.distan.x + 'px)'
        }
        if (index < vm.activeIndex) {
          style['transform'] = 'translateX(-100%)'
        }
        if (index > vm.activeIndex) {
          style['transform'] = 'translateX(100%)'
        }
        style['transition'] = vm.isAnimation ? 'transform 0.5s ease-out' : 'none'
        return style
      },
      /**
       * touchstart handle
       */
      touchstartHandle (event) {
        let vm = this
        let touch = event.touches[0]
        vm.start.x = touch.pageX
        vm.start.y = touch.pageY
      },
      /**
       * touchmove handle
       */
      touchmoveHandle (event) {
        let vm = this
        let touch = event.touches[0]
        vm.isAnimation = true
        vm.end.x = touch.pageX
        vm.end.y = touch.pageY
        vm.distan.x = vm.end.x - vm.start.x
        vm.distan.y = vm.end.y - vm.start.y
        let dom = vm.distan.x < 0 ? this.$refs.sliders.children[2] : this.$refs.sliders.children[0]
        if (vm.distan.x < 0) {
          dom.style['transform'] = 'translateX(' + (vm.sliderWidth + vm.distan.x) + 'px)'
        } else {
          dom.style['transform'] = 'translateX(' + (-vm.sliderWidth + vm.distan.x) + 'px)'
        }
      },
      /**
       * touchend handle
       */
      touchendHandle (event) {
        let vm = this
        let touch = event.changedTouches[0]
        vm.isAnimation = true
        vm.end.x = touch.pageX
        vm.end.y = touch.pageY
        vm.distan.x = vm.end.x - vm.start.x
        vm.distan.y = vm.end.y - vm.start.y
        vm.getTouchDirection(vm.distan.x, vm.distan.y)
        if (vm.direction === 'left') {
          vm.activeIndex = 2
        } else if (vm.direction === 'right') {
          vm.activeIndex = 0
        } else {
          for (let i = 0; i < this.$refs.sliders.children.length; i++) {
            this.$refs.sliders.children[i].style['transform'] = 'translateX(' + (i * 100 - 100) + '%)'
          }
        }
        vm.distan.x = 0
        vm.distan.y = 0
        vm.direction = null
      },
      onTransitionEnd (index) {
        let vm = this
        vm.isAnimation = false
        if (index === 1 && this.activeIndex === 2) {
          vm.dates.push({
            date: moment(vm.dates[vm.activeIndex].date).add(7, 'd').format('YYYY-MM-DD')
          })
          vm.dates.shift()
          vm.activeIndex = 1
          this.setDateByMoveWeek(1)
        } else if (index === 1 && this.activeIndex === 0) {
          vm.dates.unshift({
            date: moment(vm.dates[vm.activeIndex].date).subtract(7, 'd').format('YYYY-MM-DD')
          })
          vm.dates.pop()
          vm.activeIndex = 1
          this.setDateByMoveWeek(-1)
        }
      },
      toPreviousWeek () {
        this.activeIndex = 0
        this.onTransitionEnd(1)
      },
      toNextWeek () {
        this.activeIndex = 2
        this.onTransitionEnd(1)
      },
      setDateByMoveWeek (status) {
        let date = new Date(this.checked)
        let newDate
        if (status < 0) {
          newDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000)
        } else {
          newDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000)
        }
        this.checked = newDate.getFullYear() + '-' + this.Appendzero((newDate.getMonth() + 1)) + '-' + this.Appendzero(newDate.getDate())
      },
      Appendzero (obj) {
        return obj < 10 ? ('0' + '' + obj) : obj
      },
      /**
       * getAngle 计算角度
       */
      getAngle (x, y) {
        return Math.atan2(y, x) * 180 / Math.PI
      },
      /**
       * getTouchDirection 获取滑动方向
       */
      getTouchDirection (x, y) {
        let vm = this
        if (Math.abs(x) > 20) {
          let angle = vm.getAngle(x, y)
          if (angle >= -45 && angle <= 45) { // 向右
            vm.direction = 'right'
          } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) { // 向左
            vm.direction = 'left'
          }
        }
      },
      dayClickHandle (day) {
        this.checked = day.date
      }
    },
    watch: {
      checked () {
        this.$emit('change', this.checked)
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "~styles/veribles.less";

  .week-slider-body {
    background: #ffffff;
    height: @weekDatePickerHeight;
  }
  .year_str {
    height: 45px;
    border-bottom: #ddd solid 1px;
    line-height: 45px;
    text-align: center;
    font-size: 16px;
    .to-next {
      color: #3c97b2;
      padding: 4px;
      font-size: 14px;
    }
    .checked-date {
      font-weight: bolder;
    }
  }
  .week-slider {
    width: 100%;
    height: 50px;
    overflow: hidden;
    .sliders {
      position: relative;
      .slider {
        height: 48px;
        width: 100%;
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        .day {
          width: 100%;
          display: flex;
          justify-content: space-around;
          .day-button-content {
            height: 38px;
            width: 45px;
            padding: 3px 0;
            margin: auto;
            text-align: center;
            line-height: 18px;
            font-size: 12px;
            color: #7c7c7c;
            &.today {
              border-radius: 50%;
              background-color: darkorange;
              color: #FFF;
            }
            &.checkedDay {
              border-radius: 50%;
              background-color: #42b983;
              color: #ffffff;
            }
            .week-item {
              font-size: 16px;
            }
            .date-item {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
