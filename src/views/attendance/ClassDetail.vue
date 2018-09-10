<template>
  <div class="body-wrapper">
    <x-header
      style="width:100%;position:fixed;left:0;right:0;top:0;z-index:99;"
      :left-options="{preventGoBack: true}"
      @on-click-back="back"
    >
      <span>{{ className }} {{ date }}</span>
    </x-header>
    <div class="content-wrapper">
      <attendance-percent
        :total="totalCount"
        :onCount="onCount"
        ext="班级"
      ></attendance-percent>
    </div>
    <div>
    </div>
    <div style="height:44px;" >
      <sticky
        :offset="46"
        :check-sticky-support="false"
        :disabled="disabled"
      >
        <tab :line-width="2">
          <tab-item
            :selected="$route.name === 'AttendanceClassOff'"
            @on-item-click="onItemClick('off')"
          >未到校宝贝({{ totalCount - onCount }}人)</tab-item>
          <tab-item
            :selected="$route.path === 'AttendanceClassOn'"
            @on-item-click="onItemClick('on')"
          >已到校宝贝({{ onCount }}人)</tab-item>
        </tab>
      </sticky>
    </div>
    <div class="title">学生详情</div>
    <router-view></router-view>
  </div>
</template>

<script>
  import { XHeader, Tab, TabItem, Sticky } from 'vux'
  import { _axios } from 'common/myAxios'
  import AttendancePercent from './components/Percent'
  export default {
    name: 'ClassDetail',
    components: {
      XHeader,
      Tab,
      TabItem,
      AttendancePercent,
      Sticky
    },
    data () {
      return {
        date: this.$route.query.date,
        classId: this.$route.query.classId,
        className: '',
        totalCount: 0,
        onCount: 0,
        studentList: [],
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent)
      }
    },
    methods: {
      back () {
        this.$router.push('/attendance?date=' + this.date)
      },
      getAttendanceSummary () {
        let requestData = {
          params: {
            date: this.date,
            class_id: this.classId
          }
        }
        _axios.get('/api/wTeacher/attendance/getSummaryByClass', requestData).then(res => {
          this.className = res.class_name
          this.totalCount = res.total_count
          this.onCount = res.on_count
          this.studentList = res.student_list
        })
      },
      onItemClick (type) {
        this.$router.push({path: '/attendance/class/' + type, query: {classId: this.classId, date: this.date}})
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getAttendanceSummary()
        this.onItemClick('off')
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/veribles.less';

  .body-wrapper {
    position: relative;
  }
  .content-wrapper {
    margin-top: @headerHeight;
  }
  .space-btn {
    padding: 5px 0;
    margin: 10px;
    text-align: center;
    border: 1px red solid;
  }
  .space {
    padding: 30px 0;
    margin: 10px;
    text-align: center;
    border: 1px green solid;
  }
  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #2b8595;
  }
</style>
