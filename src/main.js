import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAMap from 'vue-amap';
import store from './store/index';
import Vant from 'vant';
import 'vant/lib/index.css';
// import preventReClick from './store/preventReClick.js'; //防多次点击，重复提交
// Vue.use(preventReClick);
// import moment from 'moment'; 
import BaiduMap from 'vue-baidu-map'
import {
  httpPost,
  httpGet,
  httpPut,
  httpDelete
} from '@/axios/http';
import _ from 'lodash'

// 全局注册
const YOUR_APP_KEY = 'WjS3NqjeiRpXVIQiWp2WiHhFyEcYz90e'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: YOUR_APP_KEY
})

Vue.prototype._ = _

Vue.use(Vant);
import {
  Dialog
} from 'vant';
Vue.use(Dialog);
Vue.use(VueAMap);
Vue.prototype.$httpGet = httpGet;
Vue.prototype.$httpPost = httpPost;
Vue.prototype.$httpPut = httpPut;
Vue.prototype.$httpDelete = httpDelete;
// //引入地图
// VueAMap.initAMapApiLoader({
//   key: 'your amap key',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'MarkerClusterer'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4'
// });
// 引入echarts画饼状图
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
import moment from "moment";
Vue.config.productionTip = false
Vue.filter('NumFormat', function (val = 0) {
  // val = val.toLocaleString(); // 3,000
  // // console.log(val);
  // debugger
  // // console.log(val);
  // if (val.indexOf(".") == -1) {
  //   val = val + ".00"; //3,000.00
  // } else if (val.charAt(val.indexOf(".") == val.length - 2)) {
  //   val = val + "0";
  // }
  return Number(val).toLocaleString('zh', {
    minimumFractionDigits: 2,
    useGrouping: true
  });
})
Vue.filter('transform', function (val) {
  if (val) {
    return moment(val).format("YYYY-MM-DD");
  }
})
//压缩图片方法
Vue.prototype.compressImg = function (file, callback) {
  var src;
  var fileSize = parseFloat(parseInt(file["size"]) / 1024 / 1024).toFixed(
    2
  );
  var read = new FileReader();
  read.readAsDataURL(file);
  read.onload = function (e) {
    var img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      //默认按比例压缩
      var w = this.width,
        h = this.height;
      //生成canvas
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      var base64;
      // 创建属性节点
      canvas.setAttribute("width", w);
      canvas.setAttribute("height", h);
      ctx.drawImage(this, 0, 0, w, h);
      if (fileSize < 1) {
        //如果图片小于一兆 那么不执行压缩操作
        base64 = canvas.toDataURL(file['type'], 1);
      } else if (fileSize > 1 && fileSize < 2) {
        //如果图片大于1M并且小于2M 那么压缩0.5
        base64 = canvas.toDataURL(file['type'], 0.5);
      } else {
        //如果图片超过2m 那么压缩0.2
        base64 = canvas.toDataURL(file["type"], 0.2);
      }
      // 回调函数返回file的值
      callback(base64);
    };
  };
}
/*这里转blob*/
Vue.prototype.base64UrlToBlob = function (urlData, filename) {
    let arr = urlData.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), // 处理异常,将ascii码小于0的转换为大于0
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    // return new Blob([u8arr], {type:mime});
    //转file
    return new File([u8arr], filename, {
      type: mime
    });
  }
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')