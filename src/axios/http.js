// http.js
import axios from 'axios'
import qs from "qs";
import md5 from "js-md5";
import {
  Toast
} from "vant";

// 环境的切换
if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = '/api'
  axios.defaults.baseURL = 'http://39.106.51.28:8091'
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://39.106.51.28:8091'
}

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('_token');
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
  console.log(this);//this请求不到
  // 我们可以在这里对异常状态作统一处理
  if (error.response.status) {
    // 处理请求失败的情况
    // 对不同返回码对相应处理
    if (error.response.status == 401) {
      console.log(error.response.status);
      // Toast.fail({
      //   message: error.response.data.error_description,
      //   position: "middle",
      // });
      // 如果token过期
      // console.log(this);
      // this.$router.push("/login")
      // localStorage.clear();
      console.log(localStorage.getItem("username"));
      console.log(localStorage.getItem("passWord"));
      if (localStorage.getItem("username") && localStorage.getItem("passWord")) {
        console.log(1111);
        var bcrypt = require("bcryptjs"); //引入bcryptjs库
        // var hash = bcrypt.hashSync(md5(this.password)); //把自己的密码(this.registerForm.passWord)带进去,变量hash就是加密后的密码
        // localStorage.clear();
        // 自动调用登录
        httpPost({
            url: "/oauth/token",
            data: qs.stringify({
              username: localStorage.getItem("username"),
              password: bcrypt.hashSync(md5(localStorage.getItem("passWord"))),
              grant_type: "password",
              client_id: "test",
              client_secret: "test",
              scope: "all",
            }),
          })
          .then((res) => {
            console.log(res);
            if (res.access_token) {
              console.log(res);
              localStorage.setItem("_token", res.access_token);
              localStorage.setItem("username", res.username);
              localStorage.setItem("passWord", this.password);
              // 获取字典数据
              this.$httpGet({
                url: "/dics/tree",
              }).then((res) => {
                const data = res.data.find((it) => it.type === "dic_client_grade").childs;
                localStorage.setItem("dic", JSON.stringify(data));
                const product = res.data.find((it) => it.type === "dic_product_type").childs;
                localStorage.setItem("dicProduct", JSON.stringify(product));
                const clientWill = res.data.find((it) => it.type === "dic_client_will").childs;
                localStorage.setItem("dicClientWill", JSON.stringify(clientWill));
                const gridResource = res.data.find((it) => it.type === "dic_grid_resource_type").childs;
                localStorage.setItem("dicGridResource", JSON.stringify(gridResource));
                // 学历
                const education = res.data.find((it) => it.type === "dic_education").childs;
                localStorage.setItem("dicEducation", JSON.stringify(education));
                // 家庭类型
                const familyType = res.data.find((it) => it.type === "dic_family_type").childs;
                localStorage.setItem("dicFamilyType", JSON.stringify(familyType));
              });
              this.$router.push("/home");
            }
          })
          .catch((err) => {
            // //console.log(err);
          });
      } else {
        this.$router.push("/login");
      }

    }
    if (error.response.status == 400) {
      console.log(error.response);
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