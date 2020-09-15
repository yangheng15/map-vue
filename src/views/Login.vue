<template>
  <div class="page new_login">
    <div class="logo">
      <img src="../assets/images/login_logo.png" alt />
    </div>
    <h5 class="login_title">网络化营销</h5>
    <img class="logo_txt" src="../assets/images/login_logo_txt.png" alt />
    <van-form>
      <van-field
        v-model="username"
        name="txtUserName"
        left-icon="manager"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="txtPwd"
        left-icon="lock"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <a href style="margin:10px;display: inline-block">忘记密码</a>
      <div style="margin: 20px 16px 16px 16px">
        <van-button round block type="info" @click="$router.push('/home')">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      isSavePassword: false,
      token: "",
      shortMesCode: "",
      telNumber: "",
      tabIndex: 2,
      checkbox: true,
      numCount: 60,
      shortMes: "发送验证码",
      isClickCode: true,
      resetSign: true,
      resetTxt: "忘记密码",
      resetNum: 60,
    };
  },
  mounted() {
    if (localStorage.getItem("isCheckedBox")) {
      this.username = localStorage.getItem("username");
      this.password = localStorage.getItem("password");
      this.checkbox = false;
      this.isSavePassword = true;
    } else {
      this.checkbox = true;
      this.isSavePassword = false;
    }
  },
  created() {
    if (localStorage.getItem("isTokenTime")) {
      $dialog
        .alert({
          title: "提示",
          content: "登录已过期请重新登录",
          okText: "确定",
          okTheme: "assertive",
        })
        .then((res) => {
          localStorage.removeItem("isTokenTime");
        });
    }
    if (
      sessionStorage.getItem("newPassWord") &&
      sessionStorage.getItem("telNumber")
    ) {
      this.password = sessionStorage.getItem("newPassWord");
      this.username = sessionStorage.getItem("telNumber");
      this.submit1();
    }
    // this.getlocaluser();
  },
  methods: {
    tabCheck() {
      console.log(123);
      this.checkbox = !this.checkbox;
      if (!this.checkbox) {
        this.isSavePassword = true;
        localStorage.setItem("isCheckedBox", true);
      } else {
        this.isSavePassword = false;
        localStorage.removeItem("isCheckedBox");
      }
    },
    resetPass() {
      if (!this.resetSign) {
        return;
      }
      var __error_msg = "";
      if (this.username == "") {
        __error_msg = "手机号码不能为空";
      } else {
        var telReg = /^1[3,4,5,6,7,8,9]\d{9}$/;
        if (!telReg.test(this.username)) __error_msg = "手机号码格式错误";
      }
      if (__error_msg !== "") {
        $dialog.alert({
          title: "提示",
          content: __error_msg,
          okText: "确定",
          okTheme: "assertive",
        });
        return;
      }
      this.resetSign = false;
      if (this.resetNum == 60) {
        this.setResetTime();
      } else if (this.resetNum <= 1) {
        this.resetNum = 60;
        this.setResetTime();
      }
      let _that = this;
      this.$axios
        .get(
          "/lgbsmp/api/v1/user_info/initial_password?phoneNumber=" +
            this.username
        )
        .then((res) => {
          if (res) {
            if (res.resultCode == 200) {
              $dialog.alert({
                //短信发送成功弹出这个框
                title: "提示",
                content: "您的密码已发送到手机，请注意查收！",
                okText: "确定",
                okTheme: "assertive",
              });
            } else {
              //短信发送发送失败跳转至修改密码页面
              sessionStorage.setItem("phoneNumber", this.username);
              this.$router.push("/LGBUserCenter/ResetPassWord");
            }
          }
          this.resetSign = true;
        })
        .catch(function (msg) {
          console.log(msg);
          _that.resetSign = true;
          _that.resetTxt = "忘记密码";
          _that.resetNum = 0;
        });
    },
    clickMes() {
      if (!this.isClickCode) {
        return;
      }
      var telReg = /^1[3,4,5,6,7,8,9]\d{9}$/;
      if (telReg.test(this.telNumber)) {
        if (this.numCount == 60) {
          this.setIntTime();
        } else if (this.numCount <= 1) {
          this.numCount = 60;
          this.setIntTime();
        }
        this.getMesCode(this.telNumber);
      } else {
        var __error_msg = "";
        if (this.telNumber == "") {
          __error_msg = "手机号码不能为空";
        } else {
          __error_msg = "手机号码格式错误";
        }
        $dialog.alert({
          title: "提示",
          content: __error_msg,
          okText: "确定",
          okTheme: "assertive",
        });
      }
    },
    getMesCode(tel) {
      let _that = this;
      console.log(this);
      this.$axios
        .get("/lgbsmp/api/v1/interactive?phoneNumber=" + tel)
        .then((res) => {
          if (res) {
            console.log(res);
          }
        })
        .catch(function (msg) {
          _that.numCount = 0;
          _that.shortMes = "重新发送";
        });
    },
    setIntTime() {
      this.isClickCode = false;
      this.shortMes = "60s 后重发";
      var _that = this;
      var time = setInterval(function () {
        if (_that.numCount <= 1) {
          clearInterval(time);
          _that.shortMes = "重新发送";
          _that.isClickCode = true;
        } else {
          _that.numCount = _that.numCount - 1;
          _that.shortMes = _that.numCount + "s 后重发";
        }
      }, 1000);
    },
    setResetTime() {
      this.resetTxt = "60s 后重发";
      var _that = this;
      var timeReset = setInterval(function () {
        if (_that.resetNum <= 1) {
          clearInterval(timeReset);
          _that.resetTxt = "忘记密码";
          _that.resetSign = true;
        } else {
          _that.resetNum = _that.resetNum - 1;
          _that.resetTxt = _that.resetNum + "s 后重发";
        }
      }, 1000);
    },
    tab(v) {
      this.tabIndex = v;
    },
    getlocaluser() {
      //获取localstroage存储的用户名密码
      if (localStorage.getItem("save") == "true") {
        this.isSavePassword = true;
      } else {
        this.isSavePassword = false;
      }
      if (this.isSavePassword) {
        this.username = localStorage.getItem("user");
        this.password = localStorage.getItem("pwd");
      } else {
        this.username = "";
        this.password = "";
      }
    },
    //短信密码登录
    submit1() {
      if (
        this.username == "" ||
        this.username == null ||
        this.password == "" ||
        this.password == null
      ) {
        $dialog.alert({
          effect: "default",
          title: "提示",
          content: "请填写完整的登录信息",
          okText: "确定",
          okTheme: "assertive",
        });
      } else {
        if (this.isSavePassword) {
          localStorage.setItem("user", this.username);
          localStorage.setItem("pwd", this.password);
          localStorage.setItem("save", true);
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("pwd");
          localStorage.setItem("save", false);
        }
        this.login();
        $loading.show();
      }
    },
    // 短信验证码登录
    submit2() {
      var __error_msg = "";
      if (this.telNumber == "") __error_msg = "手机号码不能为空";
      if (this.telNumber) {
        var telReg = /^1[3,4,5,6,7,8,9]\d{9}$/;
        if (!telReg.test(this.telNumber)) __error_msg = "手机号码格式错误";
      }
      if (this.shortMesCode == "") __error_msg = "短信验证码不能为空";
      if (this.shortMesCode.length < 6) __error_msg = "短信验证码格式错误";
      if (__error_msg !== "") {
        $dialog.alert({
          title: "提示",
          content: __error_msg,
          okText: "确定",
          okTheme: "assertive",
        });
        return;
      }
      this.login1();
    },
    login() {
      // this.$axios.post(`/api/login`, 'username=admin&password=25d55ad283aa400af464c76d713c07ad&submit=Login')
      let openid = "";
      let code = "";
      try {
        let url = document.location.toString();
        let arrUrl = url.split("?");
        let para = arrUrl[1].split("&");
        let value = para[0].split("=");
        code = value[1];
      } catch (err) {}
      this.$axios
        .post(
          `/login`,
          "username=" +
            this.username +
            "&password=" +
            md5(this.password) +
            "&submit=Login&openid=" +
            openid
        ) //北京服务器登陆
        .then((res) => {
          if (res) {
            localStorage.setItem("username", this.username);
            localStorage.setItem("password", this.password);
            localStorage.setItem("authInfo", res.user.isLgbWorker);
            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.user.id);
            localStorage.setItem("organizationId", res.organization.id);
            localStorage.setItem(
              "organizationName",
              res.organization.organizationName
            );
            localStorage.setItem("organizationLevel", res.organizationLevel);
            localStorage.setItem(
              "organizationSearchId",
              res.organizationSearchId
            );
            localStorage.setItem("province", res.organization.province);
            localStorage.setItem("city", res.organization.city);
            localStorage.setItem("district", res.organization.district);
            localStorage.setItem("isOfficer", res.user.isOfficer);
            localStorage.setItem("isLgbWorker", res.user.isLgbWorker); //1表示是管理员，0表示非管理员
            localStorage.setItem("corpId", res.corpId);
            localStorage.setItem("username", res.user.username);
            localStorage.setItem("roleCode", res.user.roleCode);
            localStorage.setItem(
              "controlList",
              JSON.stringify(res.authorityList)
            );
            this.$router.push("/index/home");
            // this.$router.push({path: '/index'});
          }
          $loading.hide();
          // this.$axios.post(`/lgbsmp/api/v1/wechat/open_id?token=`+ res.token +`&code=`+code).then(res => {}).catch(function (error) {});
        })
        .catch(function (error) {
          $loading.hide();
        });
    },
    login1() {
      // this.$axios.post(`/api/login`, 'username=admin&password=25d55ad283aa400af464c76d713c07ad&submit=Login')
      let openid = "";
      let code = "";
      try {
        let url = document.location.toString();
        let arrUrl = url.split("?");
        let para = arrUrl[1].split("&");
        let value = para[0].split("=");
        code = value[1];
      } catch (err) {}
      this.$axios
        .post(
          `/login`,
          "username=" +
            this.telNumber +
            "&verificationCode=" +
            this.shortMesCode +
            "&submit=Login&openid=" +
            openid
        ) //北京服务器登陆
        .then((res) => {
          if (res) {
            // localStorage.setItem('username', this.username);
            // localStorage.setItem('password', this.password);
            localStorage.setItem("authInfo", res.user.isLgbWorker);
            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.user.id);
            localStorage.setItem("organizationId", res.organization.id);
            localStorage.setItem(
              "organizationName",
              res.organization.organizationName
            );
            localStorage.setItem("organizationLevel", res.organizationLevel);
            localStorage.setItem(
              "organizationSearchId",
              res.organizationSearchId
            );
            localStorage.setItem("province", res.organization.province);
            localStorage.setItem("city", res.organization.city);
            localStorage.setItem("district", res.organization.district);
            localStorage.setItem("isOfficer", res.user.isOfficer);
            localStorage.setItem("isLgbWorker", res.user.isLgbWorker); //1表示是管理员，0表示非管理员
            localStorage.setItem("corpId", res.corpId);
            localStorage.setItem("username", res.user.username);
            localStorage.setItem("roleCode", res.user.roleCode);
            this.$router.push("/index/home");
            // this.$router.push({path: '/index'});
          }
          $loading.hide();
          // this.$axios.post(`/lgbsmp/api/v1/wechat/open_id?token=`+ res.token +`&code=`+code).then(res => {}).catch(function (error) {});
        })
        .catch(function (error) {
          $loading.hide();
        });
    },

    reset() {
      this.$router.push({ path: "/changePassword" });
      // $dialog.alert({effect: 'default',title: '提示',content: '请联系管理员重置密码',okText: '确定',okTheme: 'assertive'})
    },

    back() {
      $router.back("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  text-align: center;
}
.logo {
  margin: 5rem auto 0 auto;
  width: 4.3rem;
  height: 4.3rem;
  background-color: #3d425e;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.new_login .logo img {
  width: 80%;
  height: 80%;
}
.login_title {
  text-align: center;
  margin-bottom: 0.2rem;
}
.logo_txt {
  width: 8rem;
  height: 3rem;
}
</style>
<style>
.van-field__left-icon {
  margin-right: 30px;
  display: flex;
  align-items: center;
}
.van-icon {
  font-size: 18px !important;
}
.van-button--info {
  background-color: #3d425e;
  border: #3d425e;
}
</style>