<template>
  <div class="wrapper">
    <x-header
      :left-options="{preventGoBack: true}"
      @on-click-back="$router.push('/timetable')"
      style="width:100%;position:fixed;left:0;right:0;top:0;z-index:99;"
    >
      <span>{{ className }} 课表</span>
    </x-header>
    <div class="content-wrapper">
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
            {{ periodIndex + 1 }}<br>
            <div>
              <popover placement="right">
                <div slot="content" class="popover-demo-content">
                  {{ group.clock.start }} - {{ group.clock.end }}
                </div>
                <span class="iconfont">&#xe6e5;</span>
              </popover>
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
    <float-fixed><span @click="toEdit" class="iconfont icon-text">&#xea2d;</span></float-fixed>
  </div>
</template>

<script>
  import FloatFixed from 'views/bar/FloatFixed'
  import { Popover, XHeader } from 'vux'
  import { _axios } from 'common/myAxios'

  export default {
    components: {
      FloatFixed,
      Popover,
      XHeader
    },
    data () {
      let classId = this.$route.query.classId
      return {
        classId,
        className: '',
        timetable: []
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
          this.classId = res.class_id
          this.className = res.class_name
        })
      },
      toEdit () {
        this.$router.push('/timetable/edit?classId=' + this.classId)
      }
    },
    mounted () {
      this.getTimetableInfo()
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/veribles.less';

  .content-wrapper {
    margin-top: @headerHeight;
    background: rgba(80, 185, 173, 0.9);
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
</style>
