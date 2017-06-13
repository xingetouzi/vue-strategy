/**
 * Created by spider on 4/26/17.
 */
import Request from './Request'

let login = params => Request('/business/login/').data(Object.assign({}, params, {code: -2})).post()
let logout = params => Request('business/logout/').data(params).post()

// 选购页面
let getPurchaseBill = params => Request('business/purchase/bill/').data(params).get()
let addPurchaseBill = params => Request('business/purchase/bill/').data(params).post()
let deletePurchaseBill = params => Request('/business/purchase/bill/delete/').data(params).post()
let trialPurchaseBill = params => Request('/business/purchase/trial/').data(params).post()

// 控制台
let getPurchaseDeal = params => Request('business/purchase/deal/').data(params).get()
let deletePurchaseDeal = params => Request('business/purchase/deal/delete/').data(params).post()
let startPurchaseDeal = params => Request('/business/control/running/start/').data(params).post()
let stopPurchaseDeal = params => Request('/business/control/running/stop/').data(params).post()
let openAutorenew = params => Request('/business/control/autorenew/start/').data(params).post()
let closeAutorenew = params => Request('/business/control/autorenew/stop/').data(params).post()

// 账单
let getPurchaseOrder = params => Request('/business/purchase/order/').data(params).get()
let getPurchaseOrderDetail = params => Request('/business/purchase/order/' + params.orderId).data().get()

export {
  login,
  logout,
  getPurchaseBill,
  addPurchaseBill,
  deletePurchaseBill,
  trialPurchaseBill,
  getPurchaseDeal,
  deletePurchaseDeal,
  startPurchaseDeal,
  stopPurchaseDeal,
  openAutorenew,
  closeAutorenew,
  getPurchaseOrder,
  getPurchaseOrderDetail
}
