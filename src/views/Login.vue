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
        type="text"
        name="txtUserName"
        left-icon="manager"
        placeholder="请输入账号"
      />
      <van-field
        v-model="password"
        :type="flag == true ? 'password' : 'text'"
        name="txtPwd"
        :mask="false"
        left-icon="lock"
        placeholder="请输入密码"
      >
        <template #button>
          <van-icon v-show="flag" name="closed-eye" @click="changeType()" />
          <van-icon v-show="!flag" name="eye-o" @click="changeType()" />
        </template>
      </van-field>
      <van-checkbox v-model="remember" checked-color="#3d425e">记住密码</van-checkbox>
      <div style="margin: 40px 30px 16px 30px">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import qs from "qs";
import md5 from "js-md5";
import moment from "moment";
import { Dialog } from "vant";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      remember: false,
      expires_in: null,
      aData: null,
      flag: true,
    };
  },
  created() {
    const token = localStorage.getItem("_token"),
      username = localStorage.getItem("username"),
      password = localStorage.getItem("passWord");
    // if (token && username && password) {
    //   this.getDic();
    //   this.locationUpload();
    //   this.$router.push("/home");
    // }
    if (localStorage.getItem("passWord") != null) {
      this.remember = true;
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
        this.locationUpload();
        vm.$router.push("/home");
      }
    });
  },
  methods: {
    onFailed(errorInfo) {},
    changeType() {
      this.flag = !this.flag;
    },
    getDic() {
      this.$httpGet({
        url: "/dics/tree",
      }).then((res) => {
        //客户等级
        const data = res.data.find((it) => it.type === "dic_client_grade").childs;
        localStorage.setItem("dic", JSON.stringify(data));
        const product = res.data.find((it) => it.type === "dic_product_type").childs;
        //客户意向
        localStorage.setItem("dicProduct", JSON.stringify(product));
        const clientWill = res.data.find((it) => it.type === "dic_client_will").childs;
        localStorage.setItem("dicClientWill", JSON.stringify(clientWill));
        const gridResource = res.data.find((it) => it.type === "dic_grid_resource_type")
          .childs;
        localStorage.setItem("dicGridResource", JSON.stringify(gridResource));
        // 学历
        const education = res.data.find((it) => it.type === "dic_education").childs;
        localStorage.setItem("dicEducation", JSON.stringify(education));
        // 家庭类型
        const familyType = res.data.find((it) => it.type === "dic_family_type").childs;
        localStorage.setItem("dicFamilyType", JSON.stringify(familyType));
        // 任务产品类型
        const taskProductType = res.data.find((it) => it.type === "task_product_type")
          .childs;
        localStorage.setItem("dicTaskProductType", JSON.stringify(taskProductType));
        // 潜在客户需求
        const potentialNeedType = res.data.find((it) => it.type === "potential_need_type")
          .childs;
        localStorage.setItem("dicPotentialNeedType", JSON.stringify(potentialNeedType));
        // 资产负债类型
        const customersAssetsType = res.data.find(
          (it) => it.type === "customers_assets_type"
        ).childs;
        localStorage.setItem(
          "dicCustomersAssetsType",
          JSON.stringify(customersAssetsType)
        );
        // 客户资产类型
        const assetsTypeInfo = res.data.find(
          (it) => it.type === "customers_assets_type_info"
        ).childs;
        localStorage.setItem("dicAssetsTypeInfo", JSON.stringify(assetsTypeInfo));
        // 客户负债类型
        const liabilitiesTypeInfo = res.data.find(
          (it) => it.type === "customers_liabilities_type_info"
        ).childs;
        localStorage.setItem(
          "dicLiabilitiesTypeInfo",
          JSON.stringify(liabilitiesTypeInfo)
        );
      });
    },
    locationUpload() {
      var u = navigator.userAgent;
      //Android终端
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      //iOS终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        let username = localStorage.getItem("username");
        window.android.locationUpload(username);
      }
      if (isiOS) {
        let username = localStorage.getItem("username");
        window.webkit.messageHandlers.locationUpload.postMessage(username);
      }
    },
    whetherPermission() {
      var u = navigator.userAgent;
      //Android终端
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      //iOS终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        let permission = window.android.checkPermission();
        if (permission == false) {
          Dialog.alert({
            title: "提示",
            message: "没有定位权限，请在设置中授权",
          });
          return;
        } else if (window.android.checkIsLocServiceEnable() == false) {
          Dialog.alert({
            title: "提示",
            message: "无法定位，请打开定位服务",
          });
          return;
        } else {
          return permission;
        }
      }
      if (isiOS) {
        let permission = window.prompt("checkPermission");
        if (permission == false) {
          Dialog.alert({
            title: "提示",
            message: "没有定位权限，请在设置中授权",
          });
          return;
        } else {
          return permission;
        }
      }
    },
    async onSubmit(values) {
      if (this.username == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入用户名！",
        });
        return;
      }
      if (this.password == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入密码！",
        });
        return;
      }

      if (this.whetherPermission() != true) {
        return this.whetherPermission();
      } else {
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
          if (res.access_token) {
            let expires_in = moment(new Date()).valueOf() + res.expires_in;

            this.aData = new Date();
            localStorage.setItem("_token", res.access_token);
            localStorage.setItem("refresh_token", res.refresh_token);
            localStorage.setItem("expires_in", expires_in);
            localStorage.setItem("username", res.username);
            // localStorage.setItem("passWord", this.password);
            if (this.remember) {
              localStorage.setItem("passWord", this.password);
            }
            this.getDic();
            this.$router.push("/home");
            this.locationUpload();
          }
        })
        .catch((err) => {});
    }
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
.van-field__body >>> .van-field__button {
  display: flex;
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
