<template>
  <div class="body-wrapper">
    <header-back></header-back>
    <!-- 作业内容 -->
    <div class="my-panel">
      <div class="my-panel_body">
        <div>
          <user-title
            :img="homeworkInfo.teacher_avatar"
            :title="homeworkInfo.teacher_name + ' － 老师'"
            :desc="homeworkInfo.created_at | formatTime"
          >
            <div slot="ext" class="item-ext-info">
              {{ homeworkInfo.course_text }}
            </div>
          </user-title>
          <image-awesome-flex
            v-if="homeworkInfo.image_list && homeworkInfo.image_list.length"
            :imgList="homeworkInfo.image_list"
            :group="'homework-detail-' + homeworkInfo.id">
          </image-awesome-flex>
          <div v-html="homeworkInfo.desc"></div>
        </div>
      </div>
      <div class="my-panel-footer">
        <span class="iconfont item-ext-info">已交作业 {{ homeworkInfo.finish_count }} 人</span>
      </div>
    </div>
    <!-- 提交作业情况 -->
    <div v-if="replyList.length > 0">
      <divider style="color: darkorange">作业完成情况</divider>
      <div>
        <div class="my-panel" v-for="item of replyList">
          <div class="my-panel_body">
            <div>
              <user-title
                :img="item.guardian_info.avatar"
                :title="guardianNameAlias(item)"
                :desc="item.created_at | formatTime"
              ></user-title>
              <image-awesome-flex
                v-if="item.image_list && item.image_list.length"
                :imgList="item.image_list"
                :group="'homework-reply-' + item.id">
              </image-awesome-flex>
              <div v-html="item.desc"></div>
            </div>
          </div>
          <!-- <div class="my-panel-footer"> -->
            <!-- <span class="iconfont item-ext-info">删除</span> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Divider, XButton, Popup } from 'vux'
  import HeaderBack from 'views/bar/HeaderBack'
  import UserTitle from 'components/page/UserTitle'
  import { formatUnixToText } from 'common/date'
  import ImageAwesomeFlex from 'components/page/ImageAwesomeFlex'
  import { _axios } from 'common/myAxios'

  export default {
    name: 'HomeworkDetail',
    components: {
      Divider,
      XButton,
      Popup,
      HeaderBack,
      ImageAwesomeFlex,
      UserTitle
    },
    data () {
      return {
        homeworkInfo: {},
        replyList: [],
        showHomeworkSubmit: false
      }
    },
    computed: {
      floatFixedBackColor () {
        this.homeworkInfo.i_finished = false
        return this.homeworkInfo.i_finished ? 'success' : 'warning'
      }
    },
    methods: {
      guardianNameAlias (item) {
        return item.guardian_info.name + ' (' + item.student_info.name + '的' + item.family_relation + ')'
      },
      getDetail () {
        let homeworkId = this.$route.params.id
        let requestData = {
          homework_id: homeworkId
        }
        _axios.get('/api/wTeacher/homework/getDetail', {params: requestData}).then(res => {
          this.homeworkInfo = res.homework_info
          this.replyList = res.reply_list
        })
      },
      displayDoHomework () {
        this.showHomeworkSubmit = true
      },
      handleSubmitHomework () {
        this.showHomeworkSubmit = false
        this.getDetail()
      },
      handleCancelHomework () {
        this.showHomeworkSubmit = false
      }
    },
    filters: {
      formatTime (timestamp) {
        return formatUnixToText(timestamp)
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>

<style lang="less" scoped>
  .item-ext-info {
    font-size: 12px;
    color: #7c7c7c;
    margin: 5px;
    text-align: right;
  }
  .item-ext-info span {
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
