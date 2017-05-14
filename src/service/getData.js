/**
 * Created by spider on 4/26/17.
 */
import Request from './Request'

let login = params => Request('/business/login').data(params).post()
let logout = params => Request('business/logout').data(params).post()
let purchaseBill = params => Request('business/purchase/bill/').data(params).get()

export {login, logout, purchaseBill}
