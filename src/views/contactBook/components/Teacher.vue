<template>
  <div>
    <search
      v-model="filterKey"
      position="absolute"
      auto-scroll-to-top
      placeholder="搜索教师姓名">
    </search>
    <group :gutter="0">
      <cell
        v-for="cell of filteredTableData"
        :key="cell.id"
        :title="cell.name"
        :value="cell.role"
        @click.native="toShowCall(cell.mobile)"
        is-link></cell>
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
import { XTable, Search, Group, Cell, Popup } from 'vux'
import { _axios } from 'common/myAxios'
export default {
  name: 'ContactBook',
  components: {
    XTable,
    Search,
    Group,
    Cell,
    Popup
  },
  data () {
    return {
      checkedMobile: '',
      showCall: false,
      teacherList: [],
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
      let data = this.teacherList
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
      _axios.get('/api/wTeacher/contact/teacher').then(res => {
        this.teacherList = res.contact_list
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
</style>
