<template>
  <div class="User" style="background-color: rgb(245, 245, 245); height: 100vh">
    <div>
      <div class="head_portrait">
        <!-- <img
          style="width: 60px; border-radius: 50%"
          :src="userNameSex == 2 ? women : men"
        /> -->
        <img style="width: 64px; border-radius: 50%" :src="men_heard" />
        <div style="font-size: 18px; color: #fff; margin: 4px 0px">
          {{ userNameTxt.realName }}
        </div>
        <div class="have_star">
          <van-rate
            v-model="userNameTxt.level"
            color="#fff"
            void-color="#fff"
            readonly
          />
        </div>
        <div v-show="MedalOwner != 0" class="personal_introduction">
          <div v-for="(item, index) in MedalOwner" :key="index">
            <img src="../../assets/User/medal.png" alt />
            <p>{{ item.medalName ? item.medalName : "荣誉勋章(0)" }}</p>
          </div>
          <router-link
            tag="div"
            class="see_more"
            :to="{ name: 'MyMedal', query: { title: '我的勋章' } }"
            >查看更多></router-link
          >
        </div>
        <van-empty
          v-show="MedalOwner.length == 0"
          class="personal_introduction"
          image="https://img.yzcdn.cn/vant/custom-empty-image.png"
          description="荣誉勋章(0)"
        />
      </div>
    </div>
    <div class="new_item_body">
      <!--
        <p>
          <img src="../../assets/User/calendar.svg" alt />
          我的日历
        </p>
        <van-icon name="arrow" />
      </div> -->
      <router-link
        tag="div"
        class="calendar"
        :to="{ name: 'MyMedal', query: { title: '上门拜访记录' } }"
      >
        <p>
          <img src="../../assets/User/footprint.svg" alt />
          上门拜访记录
        </p>
        <van-icon name="arrow" />
      </router-link>
      <router-link
        tag="div"
        class="calendar"
        :to="{ name: 'UpdatePassword', query: { title: '密码修改' } }"
      >
        <p>
          <img src="../../assets/User/password.svg" alt />
          密码修改
        </p>
        <van-icon name="arrow" />
      </router-link>
      <div class="calendar">
        <p>
          <img src="../../assets/User/versionNo.svg" alt />
          版本号
        </p>
        <p style="color: #234243">{{ versionNo }}</p>
      </div>
    </div>

    <div style="padding: 16px 16px 40px 16px">
      <van-button
        type="primary"
        block
        size="normal"
        class="button button-assertive button-block"
        @click.native="endLogin()"
        color="#3D425E"
        >退出</van-button
      >
    </div>
    <my-tabbar></my-tabbar>
  </div>
</template>
<script>
import MyNav from "../../components/Public/MyNav";
import MyTabbar from "../../components/Public/MyTabbar";
import icon1 from "../../assets/User/men.png";
import icon2 from "../../assets/User/men1.jpg";
import men_heard from "../../assets/User/men_heard.svg";
import { Dialog } from "vant";
export default {
  name: "WorkBench",
  components: {
    MyNav,
    MyTabbar,
  },
  data() {
    return {
      userNameTxt: [],
      MedalOwner: [],
      userNameSex: "",
      women: icon1,
      men_heard: men_heard,
      men: icon2,
      versionNo: "",
      level: 5,
    };
  },
  created() {
    this.getRealName();
    this.getMedalOwner();
    this.getversion();
  },
  methods: {
    getversion() {
      var u = navigator.userAgent;
      //Android终端
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      //iOS终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        this.$httpGet({
          url: `/api/version/get/android`,
        }).then((res) => {
          this.versionNo = res.data.versionNo;
        });
      }
      if (isiOS) {
        this.$httpGet({
          url: `/api/version/get/ios`,
        }).then((res) => {
          this.versionNo = res.data.versionNo;
        });
      }
    },
    cancelLocationUpload() {
      var u = navigator.userAgent;
      //Android终端
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      //iOS终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        window.android.cancelLocationUpload();
      }
      if (isiOS) {
        // window.webkit.messageHandlers.cancelLocationUpload.postMessage();
        window.prompt("cancelLocationUpload");
      }
    },
    endLogin() {
      Dialog.confirm({
        title: "确定是否退出",
      })
        .then((res) => {
          if (res) {
            this.cancelLocationUpload();
            this.$router.push("/");
            // android.exit(); //告诉安卓退出了
            let _username = localStorage.getItem("username");
            let password = localStorage.getItem("passWord");
            localStorage.clear();
            localStorage.setItem("username", _username);
            if (password) {
              localStorage.setItem("passWord", password);
            }
          }
        })
        .catch(() => {});
    },
    getRealName() {
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: `/api/v1/user/byname/${_username}`,
      }).then((res) => {
        this.userNameTxt = res.row;
        this.userNameTxt.level = parseInt(res.row.level);
        this.userNameSex = res.row.sex;
      });
    },
    getMedalOwner() {
      this.$httpGet({
        url: "/api/medalOwner/query",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        if (res.data.length > 3) {
          this.MedalOwner = res.data.slice(0, 3);
        } else {
          this.MedalOwner = res.data;
        }
      });
    },
  },
};
</script>
<style scoped>
.van-empty {
  padding: 26px 0;
}
.personal_introduction >>> .van-empty__image {
  width: 90px;
  height: 78px;
}
.personal_introduction >>> .van-empty__description {
  margin: 0;
}
.c-row {
  border-bottom: #e8e8e8 solid 1px;
  padding-left: 0px;
  line-height: 40px;
}
.c-label {
  width: 90px;
  text-align: right;
  color: #666666;
}
.new_item_body {
  margin-top: 102px;
  width: 96%;
  margin-left: 2%;
}
.head_portrait {
  font-size: 100px;
  text-align: center;
  color: #244887;
  background-color: #3d425e;
  position: relative;
}
.head_portrait .have_star {
  padding: 0px 0px 56px 0px;
  font-size: 10px;
}
.head_portrait .personal_introduction {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: 176px;
  z-index: 12;
  background-color: #fff;
  width: 96%;
  border: 1px solid #ededed;
  border-radius: 10px;
  left: 1.8%;
}
.head_portrait .personal_introduction div {
  width: 26%;
  margin: 7px 0px 0px;
}
.head_portrait .personal_introduction div img {
  width: 80%;
}
.head_portrait .personal_introduction div p {
  font-size: 14px;
  color: #2a2a2a;
  margin-top: -10px;
}
.head_portrait .see_more {
  font-size: 14px;
  color: #464444;
  position: absolute;
  right: 0;
  bottom: 13px;
  font-weight: 600;
}
.calendar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
}
.calendar:first-child {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.calendar:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.calendar p {
  display: flex;
  line-height: 27px;
  font-size: 14px;
}
.calendar p img {
  margin-right: 8px;
}
.van-button {
  height: 40px;
}

@media screen and (max-width: 359px) {
  * {
    font-size: 13px;
  }
  .van-empty {
    padding: 13px 0;
  }
  .personal_introduction >>> .van-empty__image {
    width: 90px;
    height: 48px;
  }
  .head_portrait .personal_introduction div,
  .head_portrait .personal_introduction div p {
    font-size: 13px;
  }
  .head_portrait .personal_introduction div img {
    width: 48px;
  }
  .new_item_body {
    margin-top: 48px;
  }
  .new_item_body {
    /* margin-top: 120px; */
  }
  .van-button {
    height: 36px;
  }
  .head_portrait .personal_introduction div p {
    margin-top: 5px;
  }
}
</style>
