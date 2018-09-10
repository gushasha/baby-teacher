import Vue from 'vue'
import Router from 'vue-router'
import Bind from 'views/Bind'
import Home from 'views/home/Home'
import Recipe from 'views/recipe/Recipe'
import RecipeEdit from 'views/recipe/RecipeEdit'
import Attendance from 'views/attendance/Attendance'
import AttendanceClass from 'views/attendance/ClassDetail'
import AttendanceClassOff from 'views/attendance/AttendanceClassOff'
import AttendanceClassOn from 'views/attendance/AttendanceClassOn'
import AttendanceMy from 'views/attendance/AttendanceMy'
import LiveList from 'views/live/LiveList'
import AlbumList from 'views/album/AlbumList'
import Timetable from 'views/timetable/Timetable'
import TimetableDetail from 'views/timetable/TimetableDetail'
import TimetableEdit from 'views/timetable/TimetableEdit'
import Message from 'views/message/message'
import MessageSend from 'views/message/MessageSend'
import MessageReceive from 'views/message/MessageReceive'
import MessageCreate from 'views/message/MessageCreate'
import AdviceCreate from 'views/advice/AdviceCreate'
import School from 'views/school/School'
import Contact from 'views/contactBook/Contact'
import ContactSchool from 'views/contactBook/ContactSchool'
import ContactClass from 'views/contactBook/ContactClass'
import ContactClassTeacher from 'views/contactBook/components/Teacher'
import ContactClassGuardian from 'views/contactBook/components/guardian'
import Health from 'views/health/Health'
import HealthClassDetail from 'views/health/HealthClassDetail'
import RecommendList from 'views/recommend/RecommendList'
import RecommendDetail from 'views/recommend/RecommendDetail'
import Homework from 'views/homework/Homework'
import HomeworkList from 'views/homework/List'
import HomeworkDetail from 'views/homework/Detail'
import Notice from 'views/notice/Notice'
import NoticeSendList from 'views/notice/SendList'
import NoticeReceiveList from 'views/notice/ReceiveList'
import NoticeCreate from 'views/notice/Create'
import Mine from 'views/mine/Mine'
import UserEdit from 'views/mine/UserEdit'

Vue.use(Router)
Vue.use(require('vue-wechat-title'))

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/bind',
      name: 'Bind',
      component: Bind,
      meta: { title: '手机号绑定' }
    }, {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { title: '首页' },
      requiresAuth: true
    }, {
      path: '/recipe',
      name: 'Recipe',
      component: Recipe,
      meta: { title: '宝贝食谱' },
      requiresAuth: true
    }, {
      path: '/recipe/edit',
      name: 'RecipeEdit',
      component: RecipeEdit,
      meta: { title: '编辑食谱' },
      requiresAuth: true
    }, {
      path: '/attendance',
      name: 'Attendance',
      component: Attendance,
      meta: { title: '学生考勤统计' },
      requiresAuth: true
    }, {
      path: '/attendance/class',
      name: 'AttendanceClass',
      component: AttendanceClass,
      meta: { title: '班级考勤' },
      requiresAuth: true,
      children: [
        {
          path: 'off',
          component: AttendanceClassOff,
          name: 'AttendanceClassOff',
          meta: { title: '班级考勤' }
        }, {
          path: 'on',
          component: AttendanceClassOn,
          name: 'AttendanceClassOn',
          meta: { title: '班级考勤' }
        }
      ]
    }, {
      path: '/attendance/my',
      name: 'AttendanceMy',
      component: AttendanceMy,
      meta: { title: '个人考勤' },
      requiresAuth: true
    }, {
      path: '/live',
      name: 'LiveList',
      component: LiveList,
      meta: { title: '视频直播' },
      requiresAuth: true
    }, {
      path: '/album',
      name: 'AlbumList',
      component: AlbumList,
      meta: { title: '相册' },
      requiresAuth: true
    }, {
      path: '/timetable',
      name: 'Timetable',
      component: Timetable,
      meta: { title: '课程表' },
      requiresAuth: true
    }, {
      path: '/timetable/detail',
      name: 'TimetableDetail',
      component: TimetableDetail,
      meta: { title: '课程表详情' },
      requiresAuth: true
    }, {
      path: '/timetable/edit',
      name: 'TimetableEdit',
      component: TimetableEdit,
      meta: { title: '编辑课程表' },
      requiresAuth: true
    }, {
      path: '/message',
      name: 'Message',
      component: Message,
      meta: { title: '信箱' },
      requiresAuth: true,
      children: [
        {
          path: 'send',
          component: MessageSend,
          name: 'MessageSend',
          meta: { title: '我发送的留言' }
        }, {
          path: 'receive',
          component: MessageReceive,
          name: 'MessageReceive',
          meta: { title: '收到的留言' }
        }
      ]
    }, {
      path: '/message/create',
      name: 'MessageCreate',
      component: MessageCreate,
      meta: { title: '发送留言' },
      requiresAuth: true
    }, {
      path: '/advice/create',
      name: 'AdviceCreate',
      component: AdviceCreate,
      meta: { title: '提交意见反馈' },
      requiresAuth: true
    }, {
      path: '/school',
      name: 'School',
      component: School,
      meta: { title: '学校介绍' },
      requiresAuth: true
    }, {
      path: '/contact',
      name: 'Contact',
      component: Contact,
      meta: { title: '通讯录' },
      requiresAuth: true
    }, {
      path: '/contact/school',
      component: ContactSchool,
      name: 'ContactSchool',
      meta: { title: '学校通讯录' },
      requiresAuth: true
    }, {
      path: '/contact/class',
      component: ContactClass,
      name: 'ContactClass',
      meta: { title: '班级通讯录' },
      requiresAuth: true,
      children: [
        {
          path: 'teacher',
          component: ContactClassTeacher,
          name: 'ContactClassTeacher',
          meta: { title: '班级教师通讯录' }
        }, {
          path: 'guardian',
          component: ContactClassGuardian,
          name: 'ContactClassGuardian',
          meta: { title: '班级家长通讯录' }
        }
      ]
    }, {
      path: '/health',
      name: 'Health',
      component: Health,
      meta: { title: '宝贝健康' },
      requiresAuth: true
    }, {
      path: '/health/class',
      name: 'HealthClassDetail',
      component: HealthClassDetail,
      meta: { title: '宝贝健康' },
      requiresAuth: true
    }, {
      path: '/recommend/list',
      component: RecommendList,
      name: 'RecommendList',
      meta: { title: '报名列表' },
      requiresAuth: true
    }, {
      path: '/recommend/detail',
      component: RecommendDetail,
      name: 'RecommendDetail',
      meta: { title: '报名详情' },
      requiresAuth: true
    }, {
      path: '/homework',
      name: 'Homework',
      component: Homework,
      meta: { title: '班级作业' },
      requiresAuth: true
    }, {
      path: '/homework/list',
      name: 'HomeworkList',
      component: HomeworkList,
      meta: { title: '我发送的作业记录' },
      requiresAuth: true
    }, {
      path: '/homework/detail',
      name: 'HomeworkDetail',
      component: HomeworkDetail,
      meta: { title: '作业详情' },
      requiresAuth: true
    }, {
      path: '/notice',
      name: 'Notice',
      component: Notice,
      meta: { title: '通知' },
      requiresAuth: true,
      children: [
        {
          path: 'send',
          component: NoticeSendList,
          name: 'NoticeSendList',
          meta: { title: '我发送的通知' }
        }, {
          path: 'receive',
          component: NoticeReceiveList,
          name: 'NoticeReceiveList',
          meta: { title: '我收到的通知' }
        }
      ]
    }, {
      path: '/notice/create',
      name: 'NoticeCreate',
      component: NoticeCreate,
      meta: { title: '发布通知' },
      requiresAuth: true
    }, {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      meta: { title: '个人中心' },
      requiresAuth: true
    }, {
      path: '/user/edit',
      name: 'UserEdit',
      component: UserEdit,
      meta: { title: '个人资料' },
      requiresAuth: true
    }
  ]
})
