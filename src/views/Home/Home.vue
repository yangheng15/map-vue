<template>
  <div class="home">
    <custom-nav :title="title"></custom-nav>
    <div class="page-content">
      <h4 class="task_execution">本月任务执行</h4>
      <dl class="data_img">
        <dt>
          <ul class="text_content">
            <li>
              <img
                class="img_content"
                src="../../assets/home/kehushu.svg"
                alt
              />
              <p style="margin: 0">客户数</p>
            </li>
            <li>
              <p class="total_money">
                {{ countNum.custNumMap.thisMonthCustNum }}人
              </p>
              <p :class="23 ? 'down_color' : 'up_color'">
                {{ countNum.custNumMap.custRatio }}
                <!-- <img
                  style="
                    transform: rotate(180deg);
                    -ms-transform: rotate(180deg);
                    -moz-transform: rotate(180deg);
                    -webkit-transform: rotate(180deg);
                    -o-transform: rotate(180deg);
                    width: 15px;
                    vertical-align: text-top;
                  "
                  src="../../assets/home/arrow-alt-down.svg"
                  alt
                /> -->
              </p>
            </li>
          </ul>
        </dt>
        <dt>
          <ul class="text_content">
            <li>
              <img
                class="img_content"
                src="../../assets/home/cunkuane.svg"
                alt
              />
              <p style="margin: 0">存款额</p>
            </li>
            <li>
              <p class="total_money">
                {{ countNum.depositMap.thisMonthDeposit }}万
              </p>
              <p :class="23 ? 'down_color' : 'up_color'">
                {{ countNum.depositMap.depositRatio }}
                <!-- <img
                  style="
                    transform: rotate(180deg);
                    -ms-transform: rotate(180deg);
                    -moz-transform: rotate(180deg);
                    -webkit-transform: rotate(180deg);
                    -o-transform: rotate(180deg);
                    width: 15px;
                    vertical-align: text-top;
                  "
                  src="../../assets/home/arrow-alt-up.svg"
                  alt
                /> -->
              </p>
            </li>
          </ul>
        </dt>
        <dt>
          <ul class="text_content">
            <li>
              <img
                class="img_content"
                src="../../assets/home/daikuane.svg"
                alt
              />
              <p style="margin: 0">贷款额</p>
            </li>
            <li>
              <p class="total_money">{{ countNum.loanMap.thisMonthLoan }}万</p>
              <p :class="23 ? 'down_color' : 'up_color'">
                {{ countNum.loanMap.loanRatio }}
                <!-- <img
                  style="
                    transform: rotate(180deg);
                    -ms-transform: rotate(180deg);
                    -moz-transform: rotate(180deg);
                    -webkit-transform: rotate(180deg);
                    -o-transform: rotate(180deg);
                    width: 15px;
                    vertical-align: text-top;
                  "
                  src="../../assets/home/arrow-alt-down.svg"
                  alt
                /> -->
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
              <p class="total_money">
                {{ countNum.licaiMap.thisMonthLicai }}万
              </p>
              <p :class="23 ? 'down_color' : 'up_color'">
                {{ countNum.licaiMap.licaiRatio }}
                <!-- <img
                  style="
                    transform: rotate(180deg);
                    -ms-transform: rotate(180deg);
                    -moz-transform: rotate(180deg);
                    -webkit-transform: rotate(180deg);
                    -o-transform: rotate(180deg);
                    width: 15px;
                    vertical-align: text-top;
                  "
                  src="../../assets/home/arrow-alt-up.svg"
                  alt
                /> -->
              </p>
            </li>
          </ul>
        </dt>
      </dl>
      <dl class="progress_content">
        <!-- <dt>本月任务执行</dt> -->
        <!-- <dd>
          <div class="progress">
            <div class="progress-done" data-done="68" style="width: 62%;">62%</div>
          </div>
        </dd>-->
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
        <div v-show="tabId === 0">
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
              <li style="font-weight: 600">{{ item.name }}</li>
              <li>{{ item.targetNum | NumFormat }}</li>
            </ul>
            <ul>
              <li>{{ item.productName }}</li>
              <li>{{ item.endTime | transform }}前</li>
            </ul>
          </router-link>
        </div>
        <div v-show="tabId === 1">
          <div
            v-for="(item, index) in recent_contact"
            :key="index"
            class="latest_tasks"
          >
            <ul>
              <router-link
              v-if="item.custBasicType==1"
                tag="li"
                :to="{
                  name: 'CustomerViewPresentation',
                  query: { title: '客户视图', id: item.custId },
                }"
                >{{ item.custName }}</router-link
              >
              <router-link
              v-if="item.potentialType==2"
                tag="li"
                :to="{
                  name: 'EditPotentialCustomers',
                  query: { title: '潜在客户详情', id: item.potentialId },
                }"
                >{{ item.potentialName }}</router-link
              >
              <a v-if="item.custBasicType==1" style="color: #000" :href="'tel:' + item.telphone">
                <li >
                  {{ item.telphone }}
                  <img
                    style="width: 16px"
                    src="../../assets/home/md-phone.svg"
                    alt
                  />
                </li>
                
              </a>
              <a v-if="item.potentialType==2" style="color: #000" :href="'tel:' + item.potentialTelphone">
                <li >
                  {{ item.potentialTelphone }}
                  <img
                    style="width: 16px"
                    src="../../assets/home/md-phone.svg"
                    alt
                  />
                </li>
              </a>
            </ul>
            <ul>
              <li>{{ item.productType }}</li>
              <li v-if="item.contactDays==0">今天联系过</li>
              <li v-if="item.contactDays!==0">上次联系{{ item.contactDays }}天前</li>
            </ul>
          </div>
          <!-- <div
            style="text-align: center;padding: 30px;color: #aaaaaa;padding-top:0px;"
            @click="$router.push('/ContentManage/ArticleList4Notice/wttdfczs?title=待办事项')"
          >
            加载更多
            <i class="icon ion-ios-arrow-right"></i>
          </div>-->
        </div>
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
    };
  },
  components: {
    CustomNav,
    MyTabbar,
  },
  created() {
    this.queryNewTask();
    this.getNum();
  },
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
        this.queryContact();
      }
    },
    queryNewTask() {
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/semTasks/appNewTask",
        params: {
          userName: _username,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.latest_tasks = res.data;
      });
    },
    queryContact() {
      this.$httpGet({
        url: "/api/contactByApp/query",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.recent_contact = res.data;
      });
    },
  },
};
</script>
<style scoped lang='scss'>
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
.progress_content {
  margin-left: 2%;
  color: #878787;
}
.progress_content,
.progress_content dt {
  margin-bottom: 10px;
}
.progress {
  background-color: rgba(100, 100, 100, 0.2);
  position: relative;
  height: 26px;
  width: 96%;
  border: 1px solid #cecece;
  border-radius: 5px;
}
.progress-done {
  /* background: linear-gradient(to left, rgb(52, 204, 1), rgb(247, 247, 203)); */
  background: linear-gradient(to left, rgb(242, 112, 156), rgb(245, 212, 103));
  box-shadow: 0 3px 3px -5px rgb(242, 112, 156), 0 2px 5px rgb(242, 112, 156);
  border-radius: 5px;
  height: 26px;
  width: 0;
  transition: width 1s ease 0.3s;
  text-align: right;
  color: #fff;
  padding-right: 5px;
  line-height: 26px;
}
.data_display {
  width: 96%;
  margin-left: 2%;
  display: flex;

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
  .page-content .progress_content dt {
    font-size: 13px;
  }
  .progress {
    height: 15px;
  }
  .progress-done {
    height: 15px;
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
}
</style>


