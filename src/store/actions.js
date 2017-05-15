/**
 * Created by spider on 5/14/17.
 */
import {getUser} from '../service/getData'
import {GET_USERINFO} from './mutations'

export default {

  async getUserInfo ({commit, state}) {
    let res = await getUser()
    commit(GET_USERINFO, res)
  }
}
