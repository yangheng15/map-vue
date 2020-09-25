// http.js
import axios from 'axios'

const token = localStorage.getItem('_token');
// 环境的切换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://39.106.51.28:8091'
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
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
  // 我们可以在这里对异常状态作统一处理
  if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
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