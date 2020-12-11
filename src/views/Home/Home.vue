<template>
  <div class="home">
    <div class="public_nav">
      <van-nav-bar :title="title">
        <template #right>
          <router-link :to="{ name: 'Remind', query: { title: '提醒' } }">
            <van-icon name="bell" color="#fff" />
          </router-link>
        </template>
      </van-nav-bar>
    </div>
    <div class="page-content">
      <h4 class="task_execution">本月任务执行</h4>
      <dl class="data_img">
        <dt>
          <ul class="text_content">
            <li>
              <img class="img_content" src="../../assets/home/kehushu.svg" alt />
              <p style="margin: 0">客户数</p>
            </li>
            <li>
              <p class="total_money">{{ countNum.custNumMap.thisMonthCustNum }}人</p>
              <p :class="23 ? 'down_color' : 'up_color'">
                {{ countNum.custNumMap.custRatio }}
                <img
                  class="growthFalling"
                  :src="
                    this.countNum.custNumMap.custIncrease == -1
                      ? growthPicture
                      : this.countNum.custNumMap.custIncrease == 1
                      ? fallingPicture
                      : ''
                  "
                  alt
                />
              </p>
            </li>
          </ul>
        </dt>
        <dt>
          <ul class="text_content">
            <li>
              <img class="img_content" src="../../assets/home/cunkuane.svg" alt />
              <p style="margin: 0">存款额</p>
            </li>
            <li>
              <p class="total_money">{{ countNum.depositMap.thisMonthDeposit }}万</p>
              <p :class="23 ? 'down_color' : 'up_color'">
                {{ countNum.depositMap.depositRatio }}
                <img
                  class="growthFalling"
                  :src="
                    this.countNum.depositMap.depositIncrease == -1
                      ? growthPicture
                      : this.countNum.depositMap.depositIncrease == 1
                      ? fallingPicture
                      : ''
                  "
                  alt
                />
              </p>
            </li>
          </ul>
        </dt>
        <dt>
          <ul class="text_content">
            <li>
              <img class="img_content" src="../../assets/home/daikuane.svg" alt />
              <p style="margin: 0">贷款额</p>
            </li>
            <li>
              <p class="total_money">{{ countNum.loanMap.thisMonthLoan }}万</p>
              <p :class="23 ? 'down_color' : 'up_color'">
                {{ countNum.loanMap.loanRatio }}
                <img
                  class="growthFalling"
                  :src="
                    this.countNum.loanMap.loanIncrease == -1
                      ? growthPicture
                      : this.countNum.loanMap.loanIncrease == 1
                      ? fallingPicture
                      : ''
                  "
                  alt
                />
              </p>
            </li>
          </ul>
        </dt>
        <dt>
          <ul class="text_content">
            <li>
              <img class="img_content" src="../../assets/home/licaie.svg" alt />
              <p style="margin: 0">理财额</p>
            </li>
            <li>
              <p class="total_money">{{ countNum.licaiMap.thisMonthLicai }}万</p>
              <p :class="23 ? 'down_color' : 'up_color'">
                {{ countNum.licaiMap.licaiRatio }}
                <img
                  class="growthFalling"
                  :src="
                    this.countNum.licaiMap.licaiIncrease == -1
                      ? growthPicture
                      : this.countNum.licaiMap.licaiIncrease == 1
                      ? fallingPicture
                      : ''
                  "
                  alt
                />
              </p>
            </li>
          </ul>
        </dt>
      </dl>
      <ul class="data_display">
        <li>
          <p>执行中</p>
          <p class="data_num">{{ taskNum.executNum }}</p>
        </li>
        <li>
          <p>即将过期</p>
          <p class="data_num">{{ taskNum.aboutExpireNum }}</p>
        </li>
        <li>
          <p>已经过期</p>
          <p class="data_num">{{ taskNum.expiredNum }}</p>
        </li>
        <li>
          <p>成功完成</p>
          <p class="data_num">{{ taskNum.succNum }}</p>
        </li>
        <li>
          <p>失败</p>
          <p class="data_num">{{ taskNum.failNum }}</p>
        </li>
      </ul>
      <div class="tabTitle">
        <ul class="tabList">
          <li @click="tab(0)" :class="tabId == 0 ? 'cur' : ''">最新任务</li>
          <li @click="tab(1)" :class="tabId == 1 ? 'cur' : ''">最近联系客户</li>
        </ul>
        <van-list
          v-model="loadEnd1"
          :finished="finishEnd1"
          :offset="offset"
          finished-text="已加载完毕"
          @load="onLoading"
          v-show="tabId == 0"
        >
          <router-link
            v-for="(item, index) in latest_tasks"
            :key="index"
            class="latest_tasks"
            tag="div"
            :to="{
              name: 'MissionDetails',
              query: {
                title: '任务详情',
                id: item.id,
                productName: item.productName,
                productCode: item.productCode,
              },
            }"
          >
            <ul>
              <li
                style="
                  font-weight: 600;
                  width: 100%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ item.name }}
              </li>
            </ul>
            <ul>
              <!-- <li>{{ item.productName }}</li> -->
              <li style="color: #0fb38f">目标：{{ item.targetNum | NumFormat }}</li>
              <li style="color: #0fb38f">{{ item.endTime | transform }}前</li>
            </ul>
          </router-link>
        </van-list>
        <van-list
          v-model="loadEnd"
          :finished="finishEnd"
          :offset="offset"
          finished-text="已加载完毕"
          @load="onLoadList"
          v-show="tabId == 1"
        >
          <div v-for="(item, index) in recent_contact" :key="index" class="latest_tasks">
            <ul>
              <router-link
                style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                v-if="item.customersType == 1"
                tag="li"
                :to="{
                  name: 'EditPublicCustomerRecord',
                  query: { title: '对公客户详情', id: item.customerCode },
                }"
                >{{ item.custName }}</router-link
              >
              <router-link
                style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
                v-if="item.customersType == 2"
                tag="li"
                :to="{
                  name: 'EditIndividualCustomersRecord',
                  query: { title: '个人客户详情', id: item.customerCode },
                }"
                >{{ item.custName }}</router-link
              >
              <li v-if="item.contactDays == 0">今天联系过</li>
              <li v-if="item.contactDays !== 0">
                上次联系 <span style="color:#E34645;">{{ item.contactDays }}</span>天前
              </li>
              <!-- <a
                v-if="item.potentialType == 2"
                style="color: #000"
                :href="'tel:' + item.potentialTelphone"
              >
                <li>
                  {{ item.potentialTelphone }}
                  <img
                    style="width: 16px"
                    src="../../assets/home/md-phone.svg"
                    alt
                  />
                </li>
              </a> -->
            </ul>
            <ul>
              <!-- <li v-if="item.productType">{{ item.productType }}</li> -->

              <a v-if="item.telphone" style="color: #000" :href="'tel:' + item.telphone">
                <li>
                  {{ item.telphone }}
                  <img style="width: 16px" src="../../assets/home/md-phone.svg" alt />
                </li>
              </a>
            </ul>
          </div>
        </van-list>
      </div>
    </div>
    <my-tabbar></my-tabbar>
  </div>
</template>

<script>
import CustomNav from "../../components/Public/CustomNav";
import MyTabbar from "../../components/Public/MyTabbar";
import kehushu from "../../assets/home/kehushu.svg";
import cunkuane from "../../assets/home/cunkuane.svg";
import daikuane from "../../assets/home/daikuane.svg";
import licaie from "../../assets/home/licaie.svg";
import up from "../../assets/home/arrow-alt-up.svg";
import down from "../../assets/home/arrow-alt-down.svg";
export default {
  name: "Home",
  data() {
    return {
      title: "首页",
      tabId: 0,
      latest_tasks: [],
      recent_contact: [],
      taskNum: "",
      countNum: {
        custNumMap: { thisMonthCustNum: "" },
        depositMap: { thisMonthDeposit: "" },
        loanMap: { thisMonthLoan: "" },
        licaiMap: { thisMonthLicai: "" },
      },
      growthPicture: up,
      fallingPicture: down,
      socket: "",
      positionArr: "",
      IntervalTime: "",
      timer: "",
      loadEnd: false, // 滚动加载中
      finishEnd: false, // 滚动加载完成
      currentPage: 1,
      pageSize1: 10,
      dataTotal: "",
      loadEnd1: false, // 滚动加载中
      finishEnd1: false, // 滚动加载完成
      currentPage1: 1,
      pageSize2: 10,
      dataTotal1: "",
      offset: 5, //滚动条与底部距离小于 offset 时触发load事件，默认300
    };
  },
  components: {
    CustomNav,
    MyTabbar,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        from.path === "/EditIndividualCustomersRecord" ||
        from.path === "/EditPublicCustomerRecord"
      ) {
        vm.tab(1);
      }
    });
  },
  created() {
    this.onLoading();
    this.getNum();
  },
  mounted() {},
  methods: {
    getNum() {
      this.$httpGet({
        url: "/api/homePage/taskNum",
      }).then((res) => {
        this.taskNum = res.data;
      });
      this.$httpGet({
        url: "/api/homePage/countNum",
      }).then((res) => {
        this.countNum = res.data;
      });
    },
    tab(ev) {
      this.tabId = ev;
      if (ev == 1) {
        this.onLoadList();
      }
    },
    onLoading() {
      this.queryNewTask();
    },
    queryNewTask() {
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/semTasks/appNewTask",
        params: {
          userName: _username,
          page: this.currentPage1, //页数
          limit: this.pageSize2, //每页个数
        },
      }).then((res) => {
        console.log(res);
        this.dataTotal1 = res.count;
        //进行判断
        if (this.dataTotal1 <= this.pageSize2) {
          this.latest_tasks = res.data;
          console.log(this.latest_tasks);
        } else {
          this.currentPage1++;
          let arr = res.data;
          console.log(arr);
          this.latest_tasks = this.latest_tasks.concat(arr);
        }
        // 加载状态结束
        this.loadEnd1 = false;
        // 数据全部加载完成
        if (this.latest_tasks.length >= this.dataTotal1) {
          this.finishEnd1 = true; //结束，显示我也是有底线的
        }
      });
    },
    onLoadList() {
      this.getMyClients();
    },
    getMyClients() {
      this.$httpGet({
        url: "/api/contactByApp/query",
        params: {
          page: this.currentPage, //页数
          limit: this.pageSize1, //每页个数
        },
      }).then((res) => {
        console.log(res);
        this.dataTotal = res.count;
        //进行判断
        if (this.dataTotal <= this.pageSize1) {
          this.recent_contact = res.data;
          console.log(this.recent_contact);
        } else {
          this.currentPage++;
          let arr = res.data;
          console.log(arr);
          this.recent_contact = this.recent_contact.concat(arr);
        }
        // 加载状态结束
        this.loadEnd = false;
        // 数据全部加载完成
        if (this.recent_contact.length >= this.dataTotal) {
          this.finishEnd = true; //结束，显示我也是有底线的
        }
      });
    },
    // initWebSocket() {
    //   //初始化weosocket
    //   if (typeof WebSocket === "undefined") {
    //     alert("您的浏览器不支持socket");
    //   } else {
    //     console.log("zouzouzou");
    //     console.log(new Date().getTime());
    //     // ws://192.168.1.116:12345
    //     // wss://echo.websocket.org
    //     // const wsuri = "ws://112.125.27.140:12345/ws";
    //     // const wsuri = "ws://123.56.238.192:12345/ws";
    //     const wsuri = "ws://39.106.51.28:12345/ws";
    //     // 实例化socket
    //     this.socket = new WebSocket(wsuri);
    //     // 监听socket连接
    //     this.socket.onopen = this.open;
    //     // this.socket.onopen = function() {
    //     //   console.log('连接成功');
    //     //   console.log(this.send);
    //     //   // setInterval(() => {
    //     //   //   this.send(JSON.stringify({
    //     //   //   messageText: '123',
    //     //   //   messageType: "MAPLOCUS",
    //     //   //   sender: '123',
    //     //   //   time: 123,
    //     //   // }))
    //     //   }, 1000);
    //     // }
    //     // 监听socket错误信息
    //     this.socket.onerror = this.error;
    //     // 监听socket消息
    //     this.socket.onmessage = this.getMessage;
    //     console.log(this.socket.readyState);
    //   }
    // },
    // appMessage() {
    //   var u = navigator.userAgent;
    //   //Android终端
    //   var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    //   //iOS终端
    //   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    //   if (isAndroid) {
    //     this.positionArr = window.android.getLocation();
    //   }
    //   if (isiOS) {
    //     this.positionArr = window.prompt("getLocation");
    //   }
    // },
    // open() {
    //   console.log("socket连接成功");
    //   console.log(this.positionArr);
    //   alert(this.positionArr)
    //   setTimeout(() => {
    //     this.appMessage();
    //     let time = new Date().getTime();
    //     let username = localStorage.getItem("username");
    //     let messageText = this.positionArr;
    //     let actions = {
    //       messageText: messageText,
    //       messageType: "MAPLOCUS",
    //       sender: username,
    //       time: time,
    //     };
    //     console.log(JSON.stringify(actions));
    //     this.socket.send(JSON.stringify(actions));
    //   }, 300);

    //   console.log(this.IntervalTime);
    //   // debugger
    //   window.clearInterval(this.timer);
    //   this.timer = setInterval(() => {
    //     this.appMessage();
    //     let time = new Date().getTime();
    //     let username = localStorage.getItem("username");
    //     let messageText = this.positionArr;
    //     let actions = {
    //       messageText: messageText,
    //       messageType: "MAPLOCUS",
    //       sender: username,
    //       time: time,
    //     };
    //     console.log(JSON.stringify(actions));
    //     this.socket.send(JSON.stringify(actions));
    //   }, this.IntervalTime);
    //   // setInterval(function(){ alert("Hello"); }, 3000);
    // },
    // error() {
    //   this.initWebSocket();
    //   console.log("socket连接失败重连");
    // },
    // getMessage(msg) {
    //   // 数据接收
    //   console.log(msg);
    // },
    // close() {
    //   console.log("socket已经关闭");
    // },
  },
  destroyed() {
    // this.socket.onclose = this.close; //离开路由之后断开websocket连接
  },
};
</script>
<style scoped lang="scss">
.task_execution {
  margin: 5px 5px;
}
.home {
  padding-top: 46px;
}
.cur {
  color: #df0f0f;
  font-weight: 500;
  font-size: 14px;
  position: relative;
}
.cur::after {
  position: absolute;
  content: "";
  top: 65%;
  left: 3%;
  width: 92%;
  height: 1px;
  background: #df0f0f;
}
.growthFalling {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  width: 15px;
  vertical-align: text-top;
}
.page-content {
  padding-top: 0px;
}

.data_img {
  display: flex;
  flex-wrap: wrap;
  margin: 0px;

  dt {
    width: 45%;
    margin: 2%;
    border: 1px solid #e1e1e1;
    background-color: #f2f2f2;
    display: flex;
    border-radius: 5px;

    .img_content {
      width: 45px;
      border-radius: 5px;
    }
    .text_content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 5px;

      li {
        width: 50%;
        text-align: center;
        color: #000;
        .up_color {
          color: #3cc8ab;
          margin: 0;
        }
        .down_color {
          color: #df0f0f;
          margin: 0;
        }
      }
    }
    .total_money {
      font-size: 20px;
      margin-top: 4px;
      margin-bottom: 15px;
      color: #000;
    }
  }
}
.data_display {
  width: 96%;
  margin-left: 2%;
  display: flex;
  margin-top: 10px;

  li:first-child {
    margin-left: 0;
  }
  li {
    width: 18.6%;
    height: 60px;
    border-radius: 6px;
    background-color: #f2f2f2;
    margin-left: 7px;
    font-size: 14px;

    p {
      margin: 0;
      line-height: 30px;
      text-align: center;
    }
  }
}
.data_num {
  color: #fa9049;
  font-size: 16px;
}
.tabTitle {
  border-top: 0px;
  margin-top: 20px;
}
.tabList {
  display: flex;
  height: 50px;
  width: 100%;
  line-height: 50px;
  background-color: #f2f2f2;
  justify-content: space-around;
  font-size: 14px;
}
.latest_tasks {
  margin: 10px;
  font-size: 16px;
  border-bottom: 1px solid #e8e8e8 !important;
}
.latest_tasks ul {
  display: flex;
  justify-content: space-between;
  margin: 5px;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  .page-content .data_img dt .img_content {
    width: 40px;
  }
  .page-content .data_img dt .text_content li {
    font-size: 12px;
  }
  .data_display li p {
    font-size: 13px;
  }
  .tabTitle {
    margin-top: 20px;
  }
  .tabList {
    height: 40px;
    font-size: 13px;
    line-height: 40px;
  }
  .cur {
    font-size: 13px;
  }
  .cur::after {
    top: 70%;
  }
  .latest_tasks {
    font-size: 13px;
  }
  .latest_tasks ul li {
    font-size: 13px;
  }
}
</style>
<style scoped>
.public_nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000000;
}
.van-icon {
  font-size: 20px;
}
.van-nav-bar {
  background-color: rgb(61, 66, 94);
}
.van-nav-bar >>> .van-nav-bar__title {
  color: #ffffff !important;
  font-size: 16px;
  font-weight: 600;
}
.van-nav-bar__right img {
  width: 20px;
}
</style>
