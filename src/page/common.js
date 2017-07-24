/**
 * Created by spider on 6/8/17.
 */
const trialStatusMap = {
  '1': '可试用',
  '2': '试用中',
  '3': '即将到期',
  '4': '已经到期'
};

const buyingStatusMap = {
  '0': '全部',
  '1': '从未购买',
  '2': '使用中',
  '3': '即将过期',
  '4': '已经过期'
};

const runningStatusMap = {
  '1': '启用中',
  '2': '已停止'
};

const expiringStatusMap = {
  '0': '全部',
  '1': '使用中',
  '2': '即将到期',
  '3': '已经过期'
};

function getResizeHeight() {
  let parentHeight = document.getElementById('common-body').parentNode.clientHeight;
  return (parentHeight - 150) < 600 ? 600 : parentHeight - 150;
}

export {
  trialStatusMap,
  buyingStatusMap,
  runningStatusMap,
  expiringStatusMap,
  getResizeHeight
};
