// http.js
import axios from 'axios'
import moment from "moment";
import {
  Toast
} from "vant";
import router from '../router/index';

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = '/api'
  // axios.defaults.baseURL = 'http://sk935668981.u1.luyouxia.net:53328/'
  // 测试
  axios.defaults.baseURL = 'http://123.56.238.192:8199'
  // axios.defaults.baseURL = 'http://192.168.0.177:8091/'
  // 正式
  // axios.defaults.baseURL = 'http://39.106.51.28:8091/'
} else if (process.env.NODE_ENV === 'production') {
  // axios.defaults.baseURL = 'http://sk935668981.u1.luyouxia.net:53328/'
  // 测试
  axios.defaults.baseURL = 'http://123.56.238.192:8199'
  // axios.defaults.baseURL = 'http://192.168.0.177:8091/'
  // 正式
  // axios.defaults.baseURL = 'http://39.106.51.28:8091/'
}
let flag = true;
// 请求拦截器
axios.interceptors.request.use(
  async (config) => {
      let token = localStorage.getItem('_token')
      if (localStorage.getItem('refresh_token')) {
        const refresh_token = localStorage.getItem('refresh_token'),
          expires_in = localStorage.getItem('expires_in'),
          aData = moment(new Date()).valueOf()
        if (flag) {
          flag = false;
          if (aData > expires_in) {
            await httpPost({
              url: "/oauth/token",
              params: {
                grant_type: "refresh_token",
                refresh_token: refresh_token,
                client_id: "test",
                client_secret: "test",
              },
            }).then((res) => {
              localStorage.setItem('_token', res.access_token)
              localStorage.setItem("refresh_token", res.refresh_token);
              token = res.access_token
              console.log(token);
              let expires_in = moment(new Date()).valueOf() + res.expires_in
              localStorage.setItem("expires_in", expires_in);
              flag = true;
            })
          }
        }
      }


      token && (config.headers.Authorization = `Bearer ${token}`)
      return config

    },
    error => {
      return Promise.error(error)
    })

axios.defaults.timeout = 10000

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 响应拦截器
axios.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data.code === 511) {
      // 未授权调取授权接口
    } else if (response.data.code === 510) {
      // 未登录跳转登录页
    } else {
      return Promise.resolve(response)
    }
  } else {
    return Promise.reject(response)
  }
}, error => {
  if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    if (error.response.status == 401) {
      // Toast.fail({
      //   message: "请重新登录",
      //   position: "middle",
      // });
      Toast({
        message: '请重新登录！',
        position: 'middle',
      });
      // android.exit(); //告诉安卓退出了
      let _username = localStorage.getItem("username");
      let password = localStorage.getItem("passWord");
      localStorage.clear();
      localStorage.setItem("username", _username);
      if (password) {
        localStorage.setItem("passWord", password);
      }
      router.push('/login')
    }
    if (error.response.status == 400) {
      Toast.fail({
        message: error.response.data.resultMsg,
        position: "middle",
      });
    }

    return Promise.reject(error.response)
  }
})

// get 请求
export function httpGet({
  url,
  params = {}
}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then((res) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// post请求
export function httpPost({
  url,
  data = {},
  params = {},
  headers = {},
}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      data,
      params,
      headers
    }).then(res => {
      resolve(res.data)
    })
  })
}

//put 
export function httpPut({
  url,
  data = {},
  params = {},
  headers = {}
}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'put',
      data,
      params,
      headers
    }).then(res => {
      resolve(res.data)
    })
  })
}
//delete 
export function httpDelete({
  url,
  data = {},
  params = {},
  headers = {}
}) {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'delete',
      data,
      params,
      headers
    }).then(res => {
      resolve(res.data)
    })
  })
}