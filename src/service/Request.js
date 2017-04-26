/**
 * Created by spider on 4/26/17.
 */
/**
 * Created by spider on 8/5/16.
 */
/**
 * 封装了fetch,添加了超时处理,访问后台数据自带cookie,
 * 一些默认配置及get,post中无效数据的过滤.
 * */
import  'whatwg-fetch';
import  fetchJsonp from 'fetch-jsonp';

//设置超时
var setPromiseTimeout = function (promise, ms) {
  if (ms === false) {
    return promise;
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Tip.danger({children: "请求超时"});
      reject('request timeout');
    }, ms);
    promise.then(resolve, reject);
  });
};

var param = function (obj) {
  // encodeURIComponent
  let param = [];
  for (let index in obj) {
    param.push([encodeURIComponent(index), '=', encodeURIComponent(obj[index])].join(''));
  }
  return param.join('&').replace(/%20/g, "+");
};


var processResponse = function (promise, url, sucCode, config) {
  var color = 'color: #8a6d3b;';
  return setPromiseTimeout(promise, config.options.timeout).then(function (res) {
    //处理失败与成功
    if (res.ok) {
      return res.json();
    } else {
      //后台出现错误,直接报错。
      notification.error({message: '', description: "服务器忙,请稍后重试", duration: 3});
      //Tip.danger({children: "服务器忙,请稍后重试"});
      return Promise.reject('服务器错误:' + res.status + res.statusText, res);
    }
  }).then((rsp) => {
    // console.log(config);
    // debugger
    if(config.options.jsonp){
      rsp = JSON.parse(rsp);
    }
    //处理状态码
    if (rsp.code === 302) {
      return Promise.reject(rsp.message || '未知错误');
    } else if (rsp.code === 200) {
      return rsp;
    } else if(rsp.code === 250&&rsp.data&&rsp.data.conflictProductIds){//商品促销特殊处理
      return rsp;
    } else if (rsp.code === 405 || rsp.code === 404 || rsp.code === 110 || rsp.code === 525||rsp.code === 250) {
      if (rsp.message.indexOf("notify")>0) { //针对公告详情特殊删除时的情况
        rsp.message="此公告已不存在！";
      }
      return rsp;
    } else {
      return Promise.reject(rsp.message || '未知错误');
    }
  }).then((json) => {
    if (!json) {
      return false;
    }
    if (json.code > -1) { //获取数据成功
      return json;
    } else {
      console.log('%c*** Request url: %s、code: %s、message: %s', color, url, json.code, json.message);
      return Promise.reject(json.message || '未知错误');
    }
  }).catch(function (reason) {
    // reason 有点复杂，各种实现，碰到一个解决一个吧
    if (toString.call(reason) === '[object Promise]') {
      return reason.catch(rea => {
        console.error('%c*** Request catch %s', color, rea);
        // reason 是个对象。目前先给字符串。吧。后续有需要在扩展
        return Promise.reject('' + rea);
      });
    }
    else if(reason === 'request timeout'){
      console.error('%c*** Request catch %s', color, reason);
      // reason 是个对象。目前先给字符串。吧。后续有需要在扩展
      return Promise.reject('' + reason);
    }
    else {

      console.error('%c*** Request catch %s', color, reason);
      // reason 是个对象。目前先给字符串。吧。后续有需要在扩展
      return Promise.reject('' + reason);
    }
  });
};

//设置Request
var Request = function (url, options) {
  this._data = {};
  this.url = url;
  this.sucCode = [0];
  /*
   /***用extendObeject较慢(耗时多了一倍以上)，所以再有headers的时候再用。普通的还是用下面的浅拷贝***
   /---by max
   */
  if(options && options.headers){
    this.options = Public.extendObj({
      timeout: 40000, // number or false
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'same-origin' // 需要设置才能获取cookie //same-origin 相同站点
      // ,mode:"no-cors"    //据说加了这个可以跨域。。但是没什么卵用
    }, options);
  }else{
    this.options = Object.assign({
      timeout: 40000, // number or false
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'same-origin' // 需要设置才能获取cookie //same-origin 相同站点
      // ,mode:"no-cors"    //据说加了这个可以跨域。。但是没什么卵用
    }, options);
  }
};
Request.prototype = {
  code: function (codes) {
    if (Array.isArray ? Array.isArray(codes) : Object.prototype.toString.call(codes) === '[object Array]') {
      this.sucCode = this.sucCode.concat(codes);
    } else {
      this.sucCode.push(codes);
    }
    return this;
  },
  timeout: function (timeout) {
    Object.assign(this.options, {
      timeout
    });
    return this;
  },
  data: function (_data) {
    // 过滤null  undefined 只Object 类型。
    if (Object.prototype.toString.call(_data) === '[object Object]') {
      this._data = {};
      for (let index in _data) {
        if (_data[index] !== null && _data[index] !== undefined) {
          this._data[index] = _data[index];
        }
      }
    }
    return this;
  },
  json: function (_data) {
    this._data = JSON.stringify(_data);
    return this;
  },
  _getConfig: function () {
    var t = this;
    return {
      url: t.url,
      data: t._data,
      sucCode: t.sucCode,
      options: t.options
    };
  },
  _setConfig: function (d) {
    var t = this;
    t.url = d.url;
    t._data = d.data;
    t.sucCode = d.sucCode;
    t.options = d.options;
  },
  get: function () {
    var t = this;
    // 生成唯一请求
    t._data.t = new Date().getTime();
    var p = param(t._data);
    var newUrl = t.url + (t.url.indexOf('?') > -1 ? '&' : '?') + p;
    if (t.options.cors) {
      t.options["credentials"] = "include"; //fetch中的参数是这个
      newUrl = newUrl + (newUrl.indexOf('?') > -1 ? '&' : '?') + "file_token=" + window.SYSTEM.file_token;
    }

    if(t.options.jsonp){
      return processResponse(fetchJsonp(newUrl, t.options), t.url, t.sucCode, t._getConfig());
    }
    else{
      return processResponse(fetch(newUrl, t.options), t.url, t.sucCode, t._getConfig());
    }

  },
  post: function () {
    var t = this;
    var data = t._data;
    var body;
    t.options.method = 'post';
    t.options.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
    var newUrl = t.url;

    //跨域请求cors 需要带上 cookie 进行认证否则会出现会话过期提示
    if (t.options.cors) {
      t.options["credentials"] = "include"; //fetch中的参数是这个
      newUrl = newUrl + (t.url.indexOf('?') > -1 ? '&' : '?') + "file_token=" + window.SYSTEM.file_token;
    }

    // t.options.headers["Content-Type"] = "application/json";
    // 兼容传[json string] [formData] 的情况,暂时这两种. 其他的看情况
    if (Object.prototype.toString.call(data) === '[object Object]') {
      // body = new FormData();
      // for (var e in data) {
      //     body.append(e, data[e]);
      // }
      body = param(t._data);
    } else {
      //传入json string
      console.warn(data);
      // t.options.headers["Content-Type"] = "application/x-www-form-urlencoded";
      t.options.headers["Content-Type"] = "application/json";
      body = data;
    }
    t.options.body = body;
    return processResponse(fetch(newUrl, t.options), newUrl, t.sucCode, t._getConfig());
  }
};

var RequestFactory = function (url, options) {
  return new Request(url, options);
};

export default RequestFactory;
