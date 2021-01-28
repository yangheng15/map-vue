<template>
  <div class="UpdatePassword">
    <child-nav :title="typeCN"></child-nav>
    <van-form @submit="onSubmit">
      <van-field
        v-model="currentPassword"
        clearable
        :type="flag == true ? 'password' : 'text'"
        name="当前密码"
        label="当前密码"
        placeholder="请填写当前密码"
      >
        <template #button>
          <van-icon v-show="flag" name="closed-eye" @click="changeType()" />
          <van-icon v-show="!flag" name="eye-o" @click="changeType()" />
        </template>
      </van-field>
      <van-field
        v-model="password1"
        :type="flag1 == true ? 'password' : 'text'"
        name="新密码"
        label="新密码"
        placeholder="请填写新密码"
      >
        <template #button>
          <van-icon v-show="flag1" name="closed-eye" @click="changeType1()" />
          <van-icon v-show="!flag1" name="eye-o" @click="changeType1()" />
        </template>
      </van-field>
      <van-field
        v-model="password2"
        :type="flag2 == true ? 'password' : 'text'"
        name="确认新密码"
        label="确认新密码"
        placeholder="请确认新密码"
      >
        <template #button>
          <van-icon v-show="flag2" name="closed-eye" @click="changeType2()" />
          <van-icon v-show="!flag2" name="eye-o" @click="changeType2()" />
        </template>
      </van-field>
      <van-button
        round
        block
        type="info"
        native-type="submit"
        color="#3D425E"
        style=" width: 40%; height: 38px;transform: translate(-50%, 30px);margin-left: 50%;"
      >
        提&nbsp;&nbsp;&nbsp;&nbsp;交
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
      flag: true,
      flag1: true,
      flag2: true,
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    changeType() {
      this.flag = !this.flag;
    },
    changeType1() {
      this.flag1 = !this.flag1;
    },
    changeType2() {
      this.flag2 = !this.flag2;
    },
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
