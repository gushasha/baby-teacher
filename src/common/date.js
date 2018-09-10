function formatTimeToAwesomeText (dateTimeStamp) {
  dateTimeStamp = dateTimeStamp * 1000
  let date = new Date(dateTimeStamp)
  let dateText = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()

  let minute = 1000 * 60
  let hour = minute * 60
  let day = hour * 24

  let now = new Date().getTime()
  let diffValue = now - dateTimeStamp
  if (diffValue < 0) {
    return dateText
  }
  let weekC = diffValue / (7 * day)
  let dayC = diffValue / day
  let hourC = diffValue / hour
  let minC = diffValue / minute

  let result = ''
  if (weekC >= 1) {
    result = dateText
  } else if (dayC >= 1) {
    result = parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    result = parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    result = parseInt(minC) + '分钟前'
  } else {
    result = '刚刚'
  }
  return result
}

/**
 * @param dateTimeStamp
 * @param format yyyy-MM-dd hh:mm:ss
 * @returns {*}
 */
function formatUnixToText (dateTimeStamp = 0, format = 'yyyy-MM-dd hh:mm') {
  let dateObj = {}
  if (dateTimeStamp === 0) {
    dateObj = new Date()
  } else {
    dateTimeStamp = dateTimeStamp * 1000
    dateObj = new Date(dateTimeStamp)
  }
  let date = {
    'M+': dateObj.getMonth() + 1,
    'd+': dateObj.getDate(),
    'h+': dateObj.getHours(),
    'm+': dateObj.getMinutes(),
    's+': dateObj.getSeconds(),
    'q+': Math.floor((dateObj.getMonth() + 3) / 3),
    'S+': dateObj.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
  // //
  // let date = new Date(dateTimeStamp)
  // return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
}

function today (format = 'yyyy-MM-dd') {
  let timestamp = new Date().getTime() / 1000
  return formatUnixToText(timestamp, format)
}

/**
 * 根据人日期获取星期几.
 * @param dateStr eg:2008-08-08
 * @returns {string}
 */
function getWeekByDate (dateStr) {
  let weekDay = ['日', '一', '二', '三', '四', '五', '六']
  let myDate = new Date(Date.parse(dateStr.replace(/-/g, '/')))
  return weekDay[myDate.getDay()]
}

export { formatTimeToAwesomeText, formatUnixToText, today, getWeekByDate }
