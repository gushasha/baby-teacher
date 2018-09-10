<template>
  <div>
    <group title="班级列表" style="padding-top: 1px;">
      <cell
        v-for="item of classList"
        :key="item.id"
        :title="item.name"
        :value="'学生' + item.student_count + '人'"
        is-link
        :link="concatLink(item.id)"
      ></cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'
  export default {
    name: 'MyClassList',
    components: {
      Group,
      Cell
    },
    /**
     * roleType - 教师角色类型，逗号分隔。
     * eg: 角色为班主任和任课老师：传'adviser,course'
     * 可选值如下
     * all: 全部角色
     * principal: 校长
     * adviser: 班主任
     * course: 任课老师
     *
     */
    props: ['path', 'roleType'],
    data () {
      return {
        classList: []
      }
    },
    methods: {
      getClasses () {
        this.classList = [
          {id: 11, name: '🍍菠萝一班', student_count: 92},
          {id: 12, name: '🍍菠萝二班', student_count: 75},
          {id: 21, name: '🍎苹果一班', student_count: 34},
          {id: 22, name: '🍎苹果二班', student_count: 12},
          {id: 23, name: '🍎苹果三班', student_count: 88}
        ]
      },
      concatLink (classId) {
        return this.path + '?classId=' + classId
      }
    },
    mounted () {
      this.getClasses()
    }
  }
</script>

<style lang="less" scoped>

</style>
