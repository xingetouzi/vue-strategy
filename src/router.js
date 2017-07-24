/**
 * Created by spider on 4/16/17.
 */
import App from './App.vue';

const Login = r => require.ensure([], () => r(require('./page/login/index')), 'login');
const Home = r => require.ensure([], () => r(require('./page/home/index')), 'home');
const Bill = r => require.ensure([], () => r(require('./page/bill/index')), 'bill');
const Console = r => require.ensure([], () => r(require('./page/console/index')), 'console');
const Order = r => require.ensure([], () => r(require('./page/order/index')), 'order');
const Shop = r => require.ensure([], () => r(require('./page/shop/index')), 'shop');

const routes = [{
  path: '/',
  component: App, // 顶层路由，对应index.html
  children: [ // 二级路由。对应App.vue
    {
      path: '',
      redirect: '/shop'
    }, {
      path: '/home',
      component: Home
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/bill',
      component: Bill
    }, {
      path: '/console',
      component: Console
    }, {
      path: '/order',
      component: Order
    }, {
      path: '/shop',
      component: Shop
    }
  ]
}];

export default routes;
