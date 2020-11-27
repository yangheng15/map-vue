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
// 全局注册
const YOUR_APP_KEY='WjS3NqjeiRpXVIQiWp2WiHhFyEcYz90e'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: YOUR_APP_KEY
})

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
  return Number(val).toLocaleString('zh', { minimumFractionDigits: 2, useGrouping: true });
})
Vue.filter('transform', function (val) {
  if (val) {
    return moment(val).format("YYYY-MM-DD");
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')