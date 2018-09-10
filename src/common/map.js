const genderMap = [
  {key: '1', value: '男'},
  {key: '2', value: '女'},
  {key: '0', value: '其他'}
]
const familyRelationMap = [
  {key: '1', value: '爸爸'},
  {key: '2', value: '妈妈'},
  {key: '3', value: '爷爷'},
  {key: '4', value: '奶奶'},
  {key: '5', value: '外公'},
  {key: '6', value: '外婆'},
  {key: '7', value: '其他'}
]
const adviceTypeMap = [
  {key: '1', value: '系统功能'},
  {key: '2', value: '刷卡设备'},
  {key: '3', value: '客服服务'},
  {key: '4', value: '其它'}
]

function genderToText (gender) {
  for (let item of genderMap) {
    if (item.key - 0 === gender - 0) {
      return item.value
    }
    return '其他'
  }
}

export { genderMap, familyRelationMap, adviceTypeMap, genderToText }
