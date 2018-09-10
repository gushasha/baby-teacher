<template>
  <div class="wrapper">
    <x-header
      style="width:100%;position:fixed;left:0;right:0;top:0;z-index:99;"
    >
      <span>{{ className }} 课表编辑</span>
      <div slot="right" @click="submitEdit">
        <span class="iconfont">&#xe69a;</span>
      </div>
    </x-header>
    <div class="edit-wrapper">
      <table class="table"  cellspacing="4">
        <thead>
        <tr>
          <th>&emsp;</th>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th>周六</th>
          <th>周日</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(group, periodIndex) of timetable" :key="periodIndex">
          <td class="td-first">
            {{ periodIndex + 1 }}
            <span class="iconfont" style="color: #f95033;" @click="removePeriod(periodIndex)">&#xe628;</span>
            <br/>
            <div>
              <div
                class="clock-content"
                @click="clickToChangeClock(group.clock, 'start')"
              >{{ group.clock.start }}</div>
              <div
                class="clock-content"
                @click="clickToChangeClock(group.clock, 'end')"
              >{{ group.clock.end }}</div>
            </div>
          </td>
          <td
            class="td-text"
            v-for="(item, index) of group.detail"
            :key="index"
            @click="clickToChangeCell(item, periodIndex, index)"
          >
            <span>{{ item.course_name }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="button-wrapper">
      <x-button plain type="primary" @click.native="appendPeriod"><span class="iconfont">&#xe611;</span> 新增一节课 </x-button>
    </div>


    <!-- 选择科目 -->
    <div v-transfer-dom>
      <popup v-model="showCourseSelect">
        <group gutter="0">
          <radio
            :options="courseList"
            :selected-label-style="{'color':'#09BB07'}"
            :value="courseDefault"
            @on-change="onCourseChange"
          ></radio>
        </group>
      </popup>
    </div>

  </div>
</template>

<script>
  import { XHeader, Popup, Radio, Group, XButton, DatetimePlugin } from 'vux'
  import { _axios } from 'common/myAxios'
  import { initPeriodGroup, clockStep } from 'common/timetable'
  export default {
    components: {
      XHeader,
      Popup,
      Radio,
      Group,
      XButton,
      DatetimePlugin
    },
    data () {
      let classId = this.$route.query.classId
      return {
        classId,
        className: '',
        timetable: [],
        showCourseSelect: false,
        courseDefault: 0,
        currentPeriodIndex: 0,
        currentWeekIndex: 0,
        courseList: []
      }
    },
    methods: {
      getTimetableInfo () {
        let requestData = {
          params: {
            class_id: this.classId
          }
        }
        _axios.get('/api/wTeacher/timetable/getOne', requestData).then(res => {
          this.timetable = res.timetable
          this.className = res.class_name
        })
      },
      getCourseInfo () {
        let requestData = {}
        _axios.get('/api/wTeacher/course/get', requestData).then(res => {
          this.courseList = res.course_list
          this.courseList.push({'key': 0, 'value': '无'})
        })
      },
      submitEdit () {
        _axios.get('/api/wTeacher/timetable/edit').then(res => {
          this.$vux.toast.show({
            type: 'success',
            text: '成功'
          })
          this.$router.push('/timetable/detail?classId=' + this.classId)
        })
      },
      clickToChangeCell (cell, periodIndex, weekIndex) {
        this.currentPeriodIndex = periodIndex
        this.currentWeekIndex = weekIndex
        this.courseDefault = cell.course_id
        this.showCourseSelect = true
      },
      clickToChangeClock (clock, type) {
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'HH:mm',
          value: clock[type],
          minuteList: clockStep,
          onConfirm (val) {
            clock[type] = val
          }
        })
      },
      onCourseChange (val) {
        let newCourseName = this.searchByCourseId(val)
        this.timetable[this.currentPeriodIndex]['detail'][this.currentWeekIndex]['course_id'] = val
        this.timetable[this.currentPeriodIndex]['detail'][this.currentWeekIndex]['course_name'] = newCourseName
        this.showCourseSelect = false
      },
      searchByCourseId (id) {
        if (id === 0) {
          return ''
        }
        for (let item of this.courseList) {
          if (item.key === id) {
            return item.value
          }
        }
        return ''
      },
      appendPeriod () {
        this.timetable.push(initPeriodGroup)
      },
      removePeriod (periodIndex) {
        this.timetable.splice(periodIndex, 1)
      }
    },
    mounted () {
      this.getCourseInfo()
      this.getTimetableInfo()
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/veribles.less';

  .edit-wrapper {
    margin-top: @headerHeight;
    background: darkorange;
  }
  .table {
    color: #ffffff;
    width: 100%;
    td {
      font-size: 14px;
      border-radius: 8px;
      padding-left: 4px;
    }
    th {
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }
  .td-first {
    font-size: 20px;
    font-weight: bold;
    width: 10px;
    text-align: center;
  }
  .td-text {
    width: 20px;
    color: #7c7c7c;
    background: #ffffff;
    text-align: center;
  }
  .popover-demo-content {
    padding: 5px 10px;
  }
  .icon-text {
    font-size: 26px;
    font-weight: 500;
  }
  .button-wrapper {
    padding: 10px;
  }
  .clock-content {
    height:30px;
    line-height: 30px;
    background: #f9b833;
    border-radius: 10px;
    margin: 3px;
  }
</style>
