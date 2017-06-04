/**
 * Created by spider on 4/26/17.
 */
import Request from './Request'

let login = params => Request('/business/login/').data(Object.assign({}, params, {code: -2})).post()
let logout = params => Request('business/logout/').data(params).post()
let getPurchaseBill = params => Request('business/purchase/bill/').data(params).get()
let addPurchaseBill = params => Request('business/purchase/bill/').data(params).post()

export {login, logout, getPurchaseBill, addPurchaseBill}
