import axios from 'axios'
import Vue from 'vue'
import store from '../store'

const _axios = axios.create({
  baseURL: process.env.API_BASE_URL
})
const CODE_SUCCESS = 200
const CODE_ERROR_SYSTEM = 500

_axios.interceptors.request.use(
  config => {
    let user = store.state.user
    let child = store.state.child
    if (user.token !== '' || user.token !== null || user.token !== undefined) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers['axbaby-wguardian-authorization'] = user.token
    }
    if (child.id !== '' || child.id !== null || child.id !== undefined) {
      config.headers['axbaby-wguardian-child'] = child.id
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

_axios.interceptors.response.use(function (response) {
  let resCode = response.data.code
  if (resCode === CODE_SUCCESS) {
    return response.data.res // 返回响应时做一些处理
  }
  if (resCode === CODE_ERROR_SYSTEM) {
    _toastError('系统繁忙～')
  } else {
    _toastError(response.data.msg)
  }
  return Promise.reject(response.data.msg)
}, function (error) {
  if (!error.response) {
    _toastError('网络出小差了,请稍后再试')
  } else if (error.response.status === 404) {
    _toastError('请求走丢了,稍后再试')
  }
  return Promise.reject(error)
})

function _toastError (msg) {
  Vue.$vux.toast.show({
    type: 'warn',
    text: msg,
    width: '10em'
  })
}

export { _axios }
