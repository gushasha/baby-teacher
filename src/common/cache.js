import storage from 'good-storage'

// 搜索
const SEARCH_KEY = '__CIRCLE_SEARCH__'
const SEARCH_MAX_LEN = 15
// 用户登录后的TOKEN
const TOKEN_KEY = '__CIRCLE_TOKEN__'
// 当前选中的孩子
const CHILD_CHECKED_KEY = '__CHILD_CHECKED_KEY__'

export function saveChildChecked (childInfo) {
  storage.set(CHILD_CHECKED_KEY, childInfo)
}
export function clearChildChecked () {
  storage.remove(CHILD_CHECKED_KEY)
  return null
}
export function getChildChecked () {
  return storage.get(CHILD_CHECKED_KEY)
}

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

// 搜索历史记录相关
export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

// 存储用户token相关
export function saveToken (token) {
  storage.set(TOKEN_KEY, token)
  return token
}

export function clearToken () {
  storage.remove(TOKEN_KEY)
  return null
}

export function getToken () {
  return storage.get(TOKEN_KEY)
}
