<template>
  <div>
    <x-table :cell-bordered="false" style="background-color:#fff;" cellpadding="10">
      <thead>
      <tr>
        <th>姓名</th>
        <th>理由</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item of studentList" :key="item.id">
        <td>{{ item.name }}</td>
        <td align="left">{{ item.reason }}</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>

<script>
  import { XTable } from 'vux'
  import { _axios } from 'common/myAxios'
  export default {
    name: 'AttendanceClassOff',
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
        _axios.get('/api/wTeacher/attendance/getAbsentByClass', requestData).then(res => {
          this.studentList = res.student_list
        })
      }
    },
    mounted () {
      this.getAbsentByClass()
    }
  }
</script>

<style lang="less" scoped>

</style>
