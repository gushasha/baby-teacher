<template>
  <div class="body-wrapper">
    <x-header
      :left-options="{backText: '取消', preventGoBack: true}"
      @on-click-back="selectCancel"
    >
      <span>请选择</span>
      <div slot="right" @click="selectSubmit">
        <span class="iconfont">&#xe69a;</span>
      </div>
    </x-header>
    <div class="left">
      <check-icon :value="isChecked('all')" @click.native="checkGroup('all')" :class="checkedGroupClass('all')" class="tab">全体人员</check-icon>
      <check-icon :value="isChecked('teacher')" @click.native="checkGroup('teacher')" :class="checkedGroupClass('teacher')" class="tab">仅教职工</check-icon>
      <check-icon :value="isChecked('guardian')" @click.native="checkGroup('guardian')" :class="checkedGroupClass('guardian')" class="tab">仅家长</check-icon>
    </div>
    <div class="right">
      <group :gutter="0" v-for="(department, index) in departments" :key="index">
        <cell
          is-link
          :border-intent="false"
          :arrow-direction="department.expand ? 'up' : 'down'"
          @click.native="department.expand = !department.expand"
        >
          <check-icon slot="title" :value="department.check" @click.native.stop @click.native="clickCheck(department)">{{ department.name }}</check-icon>
        </cell>
        <template v-if="department.expand">
          <div class="inner-wrapper">
            <div class="item" v-for="child in department.children">
              <check-icon :value="child.check" type="plain" @click.native="clickCheck(child, department)">{{ child.name }}</check-icon>
            </div>
          </div>
        </template>
      </group>
    </div>
  </div>
</template>

<script>
  import { XHeader, Group, Cell, CheckIcon } from 'vux'
  export default {
    name: 'UserSelect',
    components: {
      XHeader,
      Group,
      Cell,
      CheckIcon
    },
    data () {
      return {
        type: 'all',
        allUser: [],
        departments: [
          {
            name: '🍎苹果一班',
            children: [
              {
                name: '李玉',
                value: '1',
                check: true
              }, {
                name: '郢政',
                value: '2',
                check: true
              }, {
                name: '林玉墨',
                value: '3',
                check: true
              }
            ],
            children_selected_count: 3,
            check: true,
            expand: false
          },
          {
            name: '🍎苹果二班',
            children: [
              {
                name: '林晓',
                value: '1',
                check: true
              }, {
                name: '王明涵',
                value: '2',
                check: true
              }, {
                name: '刘小铺',
                value: '3',
                check: true
              }
            ],
            children_selected_count: 3,
            check: true,
            expand: false
          },
          {
            name: '🍍菠萝一班',
            children: [
              {
                name: '李语文',
                value: '1',
                check: true
              }, {
                name: '王珀',
                value: '2',
                check: true
              }, {
                name: '王珀钱',
                value: '3',
                check: true
              }, {
                name: '朝兴',
                value: '11',
                check: true
              }, {
                name: '欧阳哦小',
                value: '12',
                check: true
              }, {
                name: '欧阳信',
                value: '13',
                check: true
              }, {
                name: '朝兴',
                value: '21',
                check: true
              }, {
                name: '朝兴',
                value: '22',
                check: true
              }, {
                name: '朝兴',
                value: '23',
                check: true
              }, {
                name: '朝兴',
                value: '31',
                check: true
              }, {
                name: '朝兴',
                value: '32',
                check: true
              }, {
                name: '朝兴',
                value: '33',
                check: true
              }, {
                name: '朝兴',
                value: '41',
                check: true
              }, {
                name: '朝兴',
                value: '42',
                check: true
              }, {
                name: '朝兴',
                value: '43',
                check: true
              }
            ],
            children_selected_count: 15,
            check: true,
            expand: false
          }
        ],
        selectedDepartment: '高中',
        selectedTeacherList: [],
        selectedGuardianList: []
      }
    },
    methods: {
      isChecked (tag) {
        return tag === this.type
      },
      checkGroup (tag) {
        this.type = tag
      },
      checkedGroupClass (tag) {
        return {
          'checked-tab': tag === this.type
        }
      },
      clickCheck (item, parent = null) {
        let newCheck = !item.check
        // 修改自己的选中状态
        item.check = newCheck
        // 修改子元素选中状态
        if (item.children) {
          for (let child of item.children) {
            child.check = newCheck
          }
          item.children_selected_count = newCheck ? item.children.length : 0
        }
        // 修改父元素选中状态
        if (!parent) {
          return
        }
        if (newCheck) {
          parent.children_selected_count ++
        } else {
          parent.children_selected_count --
        }
        parent.check = parent.children_selected_count === parent.children.length
      },
      selectSubmit () {
        this.$emit('selected', this.type)
      },
      selectCancel () {
        this.$emit('cancel')
      }
    },
    computed: {
      children () {
        let children = []
        let selectedDepart = this.selectedDepartment
        for (let item of this.departments) {
          if (item.name === selectedDepart) {
            children = item.children
          }
        }
        return children
      }
    }
  }
</script>

<style lang="less" scoped>
.body-wrapper {
  height: 100%;
  background: #ffffff;
}
.left {
  position: fixed;
  top: 46px;
  left: 0;
  bottom: 0;
  width: 120px;
  background: #f0f0f0;
  .tab {
    width: 100%;
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
  }
  .checked-tab {
    background: #ffffff;
  }
}
.right {
  margin-left: 120px;
  .out-wrapper {
  }
  .inner-wrapper {
    margin-left: 30px;
    .item {
      padding: 5px 0;
    }
  }
}
</style>
