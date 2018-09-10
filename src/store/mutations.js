import { saveChildChecked, clearChildChecked } from '@/common/cache'

export default {
  changeChildChecked (state, childId) {
    state.child.id = childId
    if (childId) {
      saveChildChecked(childId)
    } else {
      clearChildChecked()
    }
  }
}
