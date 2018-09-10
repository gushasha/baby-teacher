<template>
  <div>
    <search
      v-model="filterKey"
      position="absolute"
      auto-scroll-to-top
      placeholder="搜索学生姓名">
    </search>
    <group :gutter="0">
      <div v-for="item of filteredTableData">
        <cell
          is-link
          :arrow-direction="item.show ? 'up' : 'down'"
          @click.native="item.show = !item.show"
        >
          <div slot="title">
            <span class="iconfont title-icon">&#xe617; </span>
            <span>{{ item.name }}</span>
          </div>
        </cell>
        <template v-if="item.show">
          <cell
            class="sub-item"
            :title="cell.name"
            :border-intent="false"
            :value="cell.family_relation"
            v-for="cell of item.guardian_list"
            :key="cell.id"
            @click.native="toShowCall(cell.mobile)"
          ></cell>
        </template>
      </div>
    </group>
    <div v-transfer-dom>
      <popup v-model="showCall">
        <group :gutter="0">
          <cell @click.native="phoneCall" title="打电话"><span class="iconfont icon-contact-mobile">&#xe6bd;</span></cell>
          <cell @click.native="phoneSms" title="发短信"><span class="iconfont icon-contact-sms">&#xe643;</span></cell>
        </group>
      </popup>
    </div>
  </div>
</template>
<script>
  import { XTable, Search, Cell, CellBox, Group, Popup } from 'vux'
  import { _axios } from 'common/myAxios'
  export default {
    name: 'ContactBook',
    components: {
      XTable,
      Search,
      Group,
      Cell,
      CellBox,
      Popup
    },
    data () {
      return {
        checkedMobile: '',
        showCall: false,
        studentList: [],
        sortKey: null,
        filterKey: '',
        sortOrders: {}
      }
    },
    computed: {
      filteredTableData: function () {
        let sortKey = this.sortKey
        let filterKey = this.filterKey && this.filterKey.toLowerCase()
        let order = this.sortOrders[sortKey] || 1
        let data = this.studentList
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },
    methods: {
      getContactInfo () {
        _axios.get('/api/wTeacher/contact/guardian').then(res => {
          for (let item of res.contact_list) {
            item.show = false
          }
          this.studentList = res.contact_list
        })
      },
      toShowCall (mobile) {
        this.showCall = true
        this.checkedMobile = mobile
      },
      phoneCall () {
        window.location.href = 'tel://' + this.checkedMobile
      },
      phoneSms () {
        window.location.href = 'sms://' + this.checkedMobile
      }
    },
    mounted () {
      this.getContactInfo()
    }
  }
</script>
<style lang="less" scoped>
  @import '~styles/veribles.less';
  .icon-contact-mobile {
    font-size: 30px;
    color: #c93763;
  }
  .icon-contact-sms {
    font-size: 30px;
    color: @colorSuccess;
  }
  .sub-item {
    color: #888;
  }
  .title-icon {
    color: @colorSuccess;
    font-size: 20px;
  }
</style>
