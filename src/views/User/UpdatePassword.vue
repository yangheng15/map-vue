<template>
  <div class="MyMedal">
    <child-nav :title="typeCN"></child-nav>
<van-form @submit="onSubmit">
  <van-field
    v-model="currentPassword"
    clearable
    type="password"
    name="当前密码"
    label="当前密码"
    placeholder="当前密码"
    :rules="[{ required: true, message: '请填写当前密码' }]"
  />
  <van-field
    v-model="password1"
    type="password"
    name="新密码"
    label="新密码"
    placeholder="新密码"
    :rules="[{ required: true, message: '请填写新密码' }]"
  />
   <van-field
    v-model="password2"
    type="password"
    name="确认新密码"
    label="确认新密码"
    placeholder="确认新密码"
    :rules="[{ required: true, message: '请填写确认新密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit" color="#3D425E">
      提交
    </van-button>
  </div>
</van-form>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import { Dialog } from 'vant'
import md5 from 'js-md5';
export default {
  name: "MyMedal",
  components: {
    ChildNav,
  },
  data() {
    return {
      typeCN: "",
      title: "",
              currentPassword:'',
          password1:'',
          password2:'',
          userId:'',
          title:'修改密码',
          listData:[],
          objectData:{}
    }
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
methods: {
      onSubmit() {
        if(this.currentPassword==''){
          Dialog.alert({
            title: '提示',
            message: '请输入当前密码！',
          })
          return;
        }
          if(this.password1==''||this.password2==''){
            Dialog.alert({
              title: '提示',
              message: '请将信息填写完整，任一项都不能为空',
            })
            return;
          }
          if(this.password1!=this.password2){
            Dialog.alert({
              title: '提示',
              message: '您两次填写的密码不一致，请重新输入！',
            })
            return;
          }
        if(this.password1==this.currentPassword){
          Dialog.alert({
            title: '提示',
            message: '新密码不能与老密码一致！',
          })
          return;
        }
          if(this.password1.length<6){
            Dialog.alert({
              title: '提示',
              message: '密码不能小于6位！',
            })
            return;
          }
           Dialog.alert({
              title: '提示',
              message: '修改成功！',
            }).then(rst => {
              this.$router.push("/");
            });
        var __formData = {
          "password": md5(this.currentPassword),
          "newPassword":md5(this.password1),
          "userName": this.username
        };
        // this.$axios.post('/lgbsmp/api/v1/updatePassword?' + 'token=' + this.token,__formData).then((res) => {
        //   console.log('Updae Password Result:'+res)
          //if(res){
            // Dialog.alert({
            //   title: '提示',
            //   message: '修改成功！',
            // }).then(rst => {
            //   this.$router.push("/");
            // });
          //}

        // });

      }
    },
  mounted() {},
};
</script>

<style scoped>
.MyMedal {
  margin-top: 46px;
}

</style>
