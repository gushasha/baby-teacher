<template>
  <div>
    <x-table :cell-bordered="false" style="background-color:#fff;">
      <thead>
      <tr>
        <th>姓名</th>
        <th>刷卡详情</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item of studentList" :key="item.id">
        <td>{{ item.name }}</td>
        <td>
          <div v-for="cell of item.detail" :key="cell.id" class="td-cell-wrapper">
            <span>{{ cell.card_time | formatTime}}</span>
            <div class="img-wrapper">
              <img
                class="img"
                :src="cell.img_url"
                :preview="'attendance-detail' + item.id"
                :preview-text="formatPreviewText(item.name, cell.card_time)"
              >
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
  import { XTable } from 'vux'
  import { _axios } from 'common/myAxios'
  import { formatUnixToText } from 'common/date'
  export default {
    name: 'AttendanceClassOn',
    components: {
      XTable
    },
    data () {
      return {
        studentList: []
      }
    },
    methods: {
      getAbsentByClass () {
        let requestData = {
          params: {
            date: this.$route.query.date,
            class_id: this.$route.query.classId
          }
        }
        _axios.get('/api/wTeacher/attendance/getArrivedByClass', requestData).then(res => {
          this.studentList = res.student_list
          this.$previewRefresh()
        })
      },
      formatPreviewText (studentName, cardTime) {
        return studentName + '于' + formatUnixToText(cardTime) + '刷卡'
      }
    },
    filters: {
      formatTime (timestamp) {
        return formatUnixToText(timestamp, 'hh:mm')
      }
    },
    mounted () {
      this.getAbsentByClass()
    }
  }
</script>

<style lang="less" scoped>
  .td-cell-wrapper {
    display: flex;
    justify-content: space-around;
    padding: 0 30px;
  }

  .img-wrapper {
    width: 50px;
    height: 50px;
    .img {
      width: 100%;
    }
  }
</style>
