<template>
  <div>
    <group gutter="0">
      <datetime
        class="date-picker-content"
        title="根据日期搜索"
        v-model="date"
        format="YYYY-MM-DD"
        :min-year="2018"
        :max-year="currentYear"
        @on-change="changeDate"
      ></datetime>
    </group>
  </div>
</template>

<script>
  import { Datetime, Group } from 'vux'
  import { formatUnixToText } from 'common/date'
  export default {
    name: 'DateTimePicker',
    components: {
      Datetime,
      Group
    },
    data () {
      return {
        date: '',
        currentYear: formatUnixToText(0, 'yyyy') - 0
      }
    },
    methods: {
      changeDate (val) {
        this.$emit('change', val)
      }
    }
  }
</script>

<style lang="less" scoped>
  .date-picker-content {
    background: #4fce98;
    color: #ffffff;
  }
</style>
