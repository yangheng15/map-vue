<template>
  <div class="UpdatePassword">
    <child-nav :title="typeCN"></child-nav>
    <van-form @submit="onSubmit">
      <van-field
        v-model="currentPassword"
        clearable
        name="当前密码"
        label="当前密码"
        placeholder="当前密码"
        :rules="[{ required: true, message: '请填写当前密码' }]"
      />
      <van-field
        v-model="password1"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />
      <van-field
        v-model="password2"
        name="确认新密码"
        label="确认新密码"
        placeholder="确认新密码"
        :rules="[{ required: true, message: '请填写确认新密码' }]"
      />
      <van-button
        round
        block
        type="info"
        native-type="submit"
        color="#3D425E"
        style="margin-top: 60px"
      >
        提交
      </van-button>
    </van-form>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import { Dialog, Toast } from "vant";
import md5 from "js-md5";
export default {
  name: "UpdatePassword",
  components: {
    ChildNav,
  },
  data() {
    return {
      typeCN: "",
      currentPassword: "",
      password1: "",
      password2: "",
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    tipsFail() {
      Toast({
        message: "用户名密码错误",
        position: "top",
      });
    },
    onSubmit() {
      if (this.currentPassword == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入当前密码！",
        });
        return;
      }
      if (this.password1 == "" || this.password2 == "") {
        Dialog.alert({
          title: "提示",
          message: "请将信息填写完整，任一项都不能为空",
        });
        return;
      }
      if (this.password1 != this.password2) {
        Dialog.alert({
          title: "提示",
          message: "您两次填写的密码不一致，请重新输入！",
        });
        return;
      }
      if (this.password1 == this.currentPassword) {
        Dialog.alert({
          title: "提示",
          message: "新密码不能与老密码一致！",
        });
        return;
      }
      if (this.password1.length < 6) {
        Dialog.alert({
          title: "提示",
          message: "密码不能小于6位！",
        });
        return;
      }
      let _username = localStorage.getItem("username");
      this.$httpPut({
        url: "/api/v1/sign/updatePwd",
        params: {
          oldPwd: md5(this.currentPassword),
          newPwd: md5(this.password1),
          userName: _username,
        },
      }).then((res) => {
        if (res.code == 400) {
          this.tipsFail();
          return;
        } else {
          console.log(res.code);
          console.log(res.message);
          Dialog.alert({
            title: "提示",
            message: "修改成功！",
          }).then((rst) => {
            this.$router.push("/");
          });
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.UpdatePassword {
  margin-top: 46px;
}
</style>
