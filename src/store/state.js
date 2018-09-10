import { getChildChecked } from 'common/cache'

const state = {
  user: {
    token: 'I am a user token!'
  },
  child: {
    id: getChildChecked()
  }
}
export default state
