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
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="txtPwd"
        left-icon="lock"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <!-- <van-checkbox v-model="remember" checked-color="#3d425e">记住密码</van-checkbox -->
      <!-- > -->
      <a href style="margin: 10px; display: inline-block">忘记密码</a>
      <div style="margin: 20px 16px 16px 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import qs from "qs";
import md5 from "js-md5";
import moment from "moment";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      remember: false,
      expires_in:null,
      aData:null
    };
  },
  created() {
    if (localStorage.getItem("passWord")) {
      this.remember=true
      this.username = localStorage.getItem("username");
      this.password = localStorage.getItem("passWord");
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //如果token存在跳转首页
      const token = localStorage.getItem("_token"),
        username = localStorage.getItem("username"),
        password = localStorage.getItem("passWord");
      if (token && username && password) {
        vm.getDic();
        vm.$router.push("/home");
      }
    });
  },
  methods: {
    onFailed(errorInfo) {
      // //console.log("failed", errorInfo);
    },
    getDic() {
      this.$httpGet({
        url: "/dics/tree",
      }).then((res) => {
        //console.log(res.data);
        const data = res.data.find((it) => it.type === "dic_client_grade")
          .childs;
        //console.log(data);
        localStorage.setItem("dic", JSON.stringify(data));
        const product = res.data.find((it) => it.type === "dic_product_type")
          .childs;
        //console.log(product);
        localStorage.setItem("dicProduct", JSON.stringify(product));
        const clientWill = res.data.find((it) => it.type === "dic_client_will")
          .childs;
        //console.log(clientWill);
        localStorage.setItem("dicClientWill", JSON.stringify(clientWill));
        const gridResource = res.data.find(
          (it) => it.type === "dic_grid_resource_type"
        ).childs;
        //console.log(gridResource);
        localStorage.setItem("dicGridResource", JSON.stringify(gridResource));
        // 学历
        const education = res.data.find((it) => it.type === "dic_education")
          .childs;
        console.log(education);
        localStorage.setItem("dicEducation", JSON.stringify(education));
        // 家庭类型
        const familyType = res.data.find((it) => it.type === "dic_family_type")
          .childs;
        console.log(familyType);
        localStorage.setItem("dicFamilyType", JSON.stringify(familyType));
      });
    },
    async onSubmit(values) {
      var bcrypt = require("bcryptjs"); //引入bcryptjs库
      var hash = bcrypt.hashSync(md5(this.password)); //把自己的密码(this.registerForm.passWord)带进去,变量hash就是加密后的密码
      localStorage.clear();
      this.$httpPost({
        url: "/oauth/token",
        data: qs.stringify({
          username: this.username,
          password: bcrypt.hashSync(md5(this.password)),
          grant_type: "password",
          client_id: "test",
          client_secret: "test",
          scope: "all",
        }),
      })
        .then((res) => {
          console.log(res);
          if (res.access_token) {
            
            console.log(moment(new Date()).valueOf());
            let expires_in=moment(new Date()).valueOf()+res.expires_in

            this.aData = new Date();
            localStorage.setItem("_token", res.access_token);
            localStorage.setItem("refresh_token", res.refresh_token);
            localStorage.setItem("expires_in", expires_in);
            localStorage.setItem("username", res.username);
            localStorage.setItem("passWord", this.password);
            if (this.remember) {
              localStorage.setItem("passWord", this.password);
            }
            this.getDic();
            this.$router.push("/home");
          }
        })
        .catch((err) => {
          // //console.log(err);
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
.van-checkbox {
  padding: 10px 16px;
  font-size: 14px;
}
.van-checkbox__icon >>> .van-icon {
  width: 1rem;
  height: 1rem;
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