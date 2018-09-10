<template>
  <div>
    <div class="title">{{ date }}班级考勤列表</div>
    <div>
      <group :gutter="0">
        <cell
          v-for="item of classList"
          :key="item.class_id"
          :title="item.class_name"
          :value="concatDesc(item)"
          is-link
          :link="concatLink(item)"
        ></cell>
      </group>
    </div>
  </div>
</template>

<script>
  import { Cell, Group } from 'vux'
  export default {
    name: 'ClassList',
    components: {
      Cell,
      Group
    },
    props: ['date', 'classList'],
    methods: {
      concatDesc (item) {
        return '未到' + (item.total_count - item.on_count) + '人，已到' + item.on_count + '人'
      },
      concatLink (item) {
        return '/attendance/class?date=' + this.date + '&classId=' + item.class_id
      }
    }
  }
</script>

<style lang="less" scoped>
.title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color: #2b8595;
}
</style>
