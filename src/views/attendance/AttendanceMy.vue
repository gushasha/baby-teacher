<template>
  <div>
    <header-back path="/home"></header-back>
    <week-date-picker
      v-if="date"
      :checkedDate="date"
      @change="dateChanged"
    ></week-date-picker>
    <div class="title-wrapper">
      <div class="content-light">{{ teacherName }}</div>
      <div class="content-big">星期{{ week }}</div>
      <div class="content-middle">{{ date }}</div>
    </div>
    <div v-if="attendanceList.length > 0">
      <panel-list :attendanceList="attendanceList"></panel-list>
    </div>
    <div v-else class="no-data">无考勤记录哦～</div>
  </div>
</template>
<script>
  import HeaderBack from 'views/bar/HeaderBack'
  import WeekDatePicker from 'components/date/WeekDatePicker'
  import { today, getWeekByDate } from 'common/date'
  import { _axios } from 'common/myAxios'
  import PanelList from './components/PanelList'

  export default {
    components: {
      HeaderBack,
      WeekDatePicker,
      PanelList
    },
    data () {
      let date = this.$route.query.date || today()
      return {
        date,
        teacherName: '',
        attendanceList: []
      }
    },
    computed: {
      week () {
        return getWeekByDate(this.date)
      }
    },
    methods: {
      dateChanged (val) {
        this.date = val
      },
      getIndexInfo () {
        let requestData = {
          params: {
            date: this.date
          }
        }
        _axios.get('/api/wTeacher/attendance/my', requestData).then(res => {
          this.teacherName = res.name
          this.attendanceList = res.attendance_list
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getIndexInfo()
      })
    }
  }
</script>
<style>
</style>
<style lang="less" scoped>
  .title-wrapper {
    padding: 10px 20px;
    background: #76d0b1;
    color: rgba(255, 255, 255, 0.9);
    .content-light {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
    }
    .content-big {
      font-size: 20px;
    }
  }
  .no-data {
    text-align: center;
    font-size: 13px;
    color: #9B9B9B;
    padding: 40px 0;
  }
</style>

