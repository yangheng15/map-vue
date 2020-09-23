<template>
  <div class="page new_login">
    <div class="logo">
      <img src="../assets/images/login_logo.png" alt />
    </div>
    <h5 class="login_title">网络化营销</h5>
    <img class="logo_txt" src="../assets/images/login_logo_txt.png" alt />
    <van-form @failed="onFailed" @submit="onSubmit">
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
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import qs from "qs";
import md5 from "js-md5";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    async onSubmit(values) {
      console.log("submit", values);
      var bcrypt = require("bcryptjs"); //引入bcryptjs库
      // var salt = bcrypt.genSaltSync(12); //定义密码加密的计算强度,默认10
      var hash = bcrypt.hashSync(md5(this.password)); //把自己的密码(this.registerForm.passWord)带进去,变量hash就是加密后的密码
      console.log(md5(this.password));
      console.log(bcrypt.hashSync(md5(this.password)));
      this.$httpPost({
        url: "/oauth/token",
        data: qs.stringify({
          username: "yangliu",
          password:"$2a$10$p2AmGWEMjWlnavWg3NcgNeFerudpM/iunRWMWdrwdbrULDfKzaisS",
          // username: this.username,
          // password: bcrypt.hashSync(md5(this.password)),
          grant_type: "password",
          client_id: "test",
          client_secret: "test",
          scope: "all",
        }),
      }).then((res) => {
        if (res.access_token) {
          localStorage.setItem("_token", res.access_token);
          this.$router.push("/home");
        }
      });
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