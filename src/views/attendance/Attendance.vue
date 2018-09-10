<template>
  <div>
    <header-back path="/home"></header-back>
    <week-date-picker
      v-if="date"
      :checkedDate="date"
      @change="dateChanged"
    ></week-date-picker>
    <attendance-percent
      :total="totalCount"
      :onCount="onCount"
      ext="全园"
    ></attendance-percent>
    <attendance-class-list
      :date="date"
      :classList="classList"
    ></attendance-class-list>
  </div>
</template>
<script>
  import HeaderBack from 'views/bar/HeaderBack'
  import WeekDatePicker from 'components/date/WeekDatePicker'
  import AttendancePercent from './components/Percent'
  import AttendanceClassList from './components/ClassList'
  import { today } from 'common/date'
  import { _axios } from 'common/myAxios'

  export default {
    components: {
      HeaderBack,
      AttendancePercent,
      AttendanceClassList,
      WeekDatePicker
    },
    data () {
      let date = this.$route.query.date || today()
      return {
        date,
        totalCount: 0,
        onCount: 0,
        classList: []
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
        _axios.get('/api/wTeacher/attendance/index', requestData).then(res => {
          this.totalCount = res.total_count
          this.onCount = res.on_count
          this.classList = res.class_list
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
</style>

