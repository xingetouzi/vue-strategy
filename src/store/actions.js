/**
 * Created by spider on 5/14/17.
 */
// import {login} from '../service/getData'
import {SET_USERINFO} from './mutation_type'

export default {
  async setUserInfo({commit, state}, info) {
    // let res = await login({})
    console.log(info, typeof SET_USERINFO)
    commit(SET_USERINFO, info)
  }
}
