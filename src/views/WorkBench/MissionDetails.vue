<template>
  <div class="MissionDetails">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '任务详情'" class="tabTitle">
      <ul class="tabList">
        <li @click="tab(0)" :class="tabId == 0 ? 'cur' : ''">任务信息</li>
        <li @click="tab(1)" :class="tabId == 1 ? 'cur' : ''">营销客户</li>
      </ul>
      <div v-show="tabId === 0">
        <ul class="mission_details">
          <div class="task_management">{{ taskQuery.type }}</div>
          <li style="width: 73%">
            <span
              style="font-weight: 600; display: inline-block; line-height: 26px"
              >任务名称：</span
            >
            {{ taskQuery.name }}
          </li>
          <li>
            <span style="font-weight: 600">创建日期：</span>
            {{ taskQuery.createdTime | transform }}
          </li>
          <!-- <li>
            <span style="font-weight: 600">任务网格：</span>
            城关镇世纪广场
          </li> -->
          <li>
            <span style="font-weight: 600">产品类型：</span>{{ productName }}
          </li>
          <li>
            <span style="font-weight: 600">截止日期：</span
            >{{ taskQuery.endTime | transform }}
          </li>
          <li>
            <span style="font-weight: 600">
              目<span style="display: inline-block; width: 1.5rem"></span>标：
            </span>
            {{ taskQuery.targetNum | NumFormat }}
          </li>
          <li>
            <span style="font-weight: 600">
              完<span style="display: inline-block; width: 1.5rem"></span>成：
            </span>
            <span style="color: #3cc8ab">{{
              taskQuery.taskAmount | NumFormat
            }}</span>
            <div style="display: inline-block; width: 48%; margin-left: 10px">
              <van-progress
                :percentage="
                  taskQuery.taskCompletion >= 100
                    ? 100
                    : taskQuery.taskCompletion
                "
                stroke-width="8"
              />
            </div>
            <!-- <div class="progress">
              <div class="progress-done" :style="'width:' + parseFloat(taskQuery.taskCompletion*100)>=100?100:parseFloat(taskQuery.taskCompletion*100) + '%'" data-done="taskQuery.taskCompletion*100">{{parseFloat(taskQuery.taskCompletion*100)>=100?100:parseFloat(taskQuery.taskCompletion*100)}}%</div>
            </div> -->
          </li>
        </ul>
        <baidu-map
          class="bm-view"
          :center="{ lng: 114.654102, lat: 33.623741 }"
          :zoom="14"
          ak="WjS3NqjeiRpXVIQiWp2WiHhFyEcYz90e"
        >
          <!-- :position="{
                lng:
                  this.polymerizationLocation &&
                  this.polymerizationLocation.split(',')[0],
                lat:
                  this.polymerizationLocation &&
                  this.polymerizationLocation.split(',')[1],
              }" -->
          <bml-marker-clusterer :averageCenter="true">
            <!-- <bm-marker
              :position="{
                lng:
                  this.polymerizationLocation &&
                  this.polymerizationLocation.split(',')[0],
                lat:
                  this.polymerizationLocation &&
                  this.polymerizationLocation.split(',')[1],
              }"
              :dragging="true"
            ></bm-marker> -->
            <bm-marker
              v-for="(marker, index) in polymerizationLocation"
              :key="index"
              :position="{ lng: marker.lng, lat: marker.lat }"
            ></bm-marker>
          </bml-marker-clusterer>
        </baidu-map>
      </div>
      <div v-show="tabId === 1">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="marketed"
            :options="marketed_option"
            @change="marketChange"
          />
          <van-dropdown-item
            v-model="product_intention"
            :options="intention_option"
            @change="intentionChange"
          />
          <van-dropdown-item
            v-model="marketing"
            :options="marketing_option"
            @change="marketingChange"
          />
        </van-dropdown-menu>
        <van-search
          v-model="serchCustomer"
          show-action
          placeholder="客户编号，客户名称"
          @search="onSearch"
        >
          <template #action>
            <div @click="onSearch">搜索</div>
          </template></van-search
        >
        <ul class="tabList">
          <li @click="tab1(0)" :class="tabId1 == 0 ? 'cur' : ''">网格客户</li>
          <li @click="tab1(1)" :class="tabId1 == 1 ? 'cur' : ''">我的客户</li>
          <!-- <li @click="tab1(2)" :class="tabId1 == 2 ? 'cur' : ''">潜在客户</li> -->
        </ul>
        <van-list
          class="customer_list"
          v-model="loadEnd1"
          :finished="finishEnd1"
          :offset="offset"
          finished-text="没有更多了"
          @load="onLoadList1"
          v-show="tabId1 === 0"
        >
          <ul>
            <router-link
              tag="li"
              :to="{
                name: 'MarketingDetails',
                query: {
                  title: '营销客户详情',
                  custName: thisItem.custName,
                  telephone: thisItem.telephone,
                  intention: thisItem.intention,
                  customerCode: thisItem.customerCode,
                  gridCode: thisItem.gridCode,
                  telphone: thisItem.telphone,
                  address: thisItem.address,
                  productName: productName,
                  productCode: productCode,
                  custId: thisItem.id,
                  taskId: id,
                  id: thisItem.customerCode,
                  location: thisItem.location,
                  customersType: thisItem.customersType,
                  taskUpdateFlag: taskUpdateFlag,
                },
              }"
              v-for="(thisItem, index) in MarketingRecord"
              :key="index"
            >
              <p
                style="
                  font-weight: 600;
                  width: 25%;
                  font-size: 0.9rem;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                "
              >
                {{ thisItem.custName }}
              </p>
              <p
                style="width: 75%; display: flex; justify-content: flex-end"
                class="approval"
              >
                <span
                  :class="
                    thisItem.isSem == '1'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{ thisItem.isSem == "1" ? "已营销" : "未营销" }}</span
                >
                <span
                  v-show="thisItem.intention"
                  :class="
                    thisItem.intention == '1'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{ thisItem.intention | dic_client_will }}</span
                >
                <span
                  v-show="thisItem.isSucceed"
                  :class="
                    thisItem.isSucceed == '1'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{
                    thisItem.isSucceed == "0"
                      ? "失败"
                      : thisItem.isSucceed == "1"
                      ? "成功"
                      : thisItem.isSucceed == "2"
                      ? "未成功"
                      : ""
                  }}
                </span>
              </p>
              <p
                v-if="thisItem.remark"
                class="schedule_star"
                style="width: 80%"
              >
                {{ thisItem.remark }}
              </p>
              <p
                v-if="thisItem.lastTime"
                class="schedule_star"
                style="width: 20%"
              >
                {{ thisItem.lastTime }}
              </p>
            </router-link>
          </ul>
        </van-list>
        <van-list
          class="customer_list"
          v-model="loadEnd"
          :finished="finishEnd"
          :offset="offset"
          finished-text="没有更多了"
          @load="onLoadList"
          v-show="tabId1 === 1"
        >
          <ul>
            <router-link
              tag="li"
              :to="{
                name: 'MarketingDetails',
                query: {
                  title: '营销客户详情',
                  custName: thisItem.custName,
                  telephone: thisItem.telephone,
                  intention: thisItem.intention,
                  customerCode: thisItem.customerCode,
                  gridCode: thisItem.gridCode,
                  telphone: thisItem.telphone,
                  address: thisItem.address,
                  productName: productName,
                  productCode: productCode,
                  custId: thisItem.id,
                  taskId: id,
                  id: thisItem.customerCode,
                  location: thisItem.location,
                  customersType: thisItem.customersType,
                  taskUpdateFlag: taskUpdateFlag,
                },
              }"
              v-for="(thisItem, index) in MarketingRecordClaim"
              :key="index"
            >
              <p
                style="
                  font-weight: 600;
                  width: 25%;
                  font-size: 0.9rem;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                "
              >
                {{ thisItem.custName }}
              </p>
              <p
                style="width: 75%; display: flex; justify-content: flex-end"
                class="approval"
              >
                <span
                  :class="
                    thisItem.isSem == '1'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{ thisItem.isSem == "1" ? "已营销" : "未营销" }}</span
                >
                <span
                  v-show="thisItem.intention"
                  :class="
                    thisItem.intention == '1'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{ thisItem.intention | dic_client_will }}</span
                >
                <span
                  v-show="thisItem.isSucceed"
                  :class="
                    thisItem.isSucceed == '1'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{
                    thisItem.isSucceed == "0"
                      ? "失败"
                      : thisItem.isSucceed == "1"
                      ? "成功"
                      : thisItem.isSucceed == "2"
                      ? "未成功"
                      : ""
                  }}
                </span>
              </p>
              <p
                v-if="thisItem.remark"
                class="schedule_star"
                style="width: 80%"
              >
                {{ thisItem.remark }}
              </p>
              <p
                v-if="thisItem.lastTime"
                class="schedule_star"
                style="width: 20%"
              >
                {{ thisItem.lastTime }}
              </p>
            </router-link>
          </ul>
        </van-list>
        <!-- <div v-show="tabId1 === 2">
          <div class="customer_list">
            <ul>
              <router-link
                tag="li"
                :to="{
                  name: 'MarketingDetails',
                  query: {
                    title: '营销客户详情',
                    custName: thisItem.custName,
                    telephone: thisItem.telephone,
                    intention: thisItem.intention,
                    customerCode: thisItem.customerCode,
                    gridCode: thisItem.gridCode,
                    telphone: thisItem.telphone,
                    address: thisItem.address,
                    productName: productName,
                    productCode: productCode,
                    custId: thisItem.id,
                    taskId: id,
                    id: taskQuery.id,
                    location: thisItem.location,
                  },
                }"
                v-for="(thisItem, index) in MarketingRecordPotential"
                :key="index"
              >
                <p style="font-weight: 600; width: 25%; font-size: 0.9rem">
                  {{ thisItem.custName }}
                </p>
                <p
                  style="width: 75%; display: flex; justify-content: flex-end"
                  class="approval"
                >
                  <span
                    :class="
                      thisItem.isSem == '1'
                        ? 'approval_Passed'
                        : 'approval_Passed1'
                    "
                    >{{ thisItem.isSem == "1" ? "已营销" : "未营销" }}</span
                  >
                  <span
                    v-show="thisItem.intention"
                    :class="
                      thisItem.intention == '1'
                        ? 'approval_Passed'
                        : 'approval_Passed1'
                    "
                    >{{ thisItem.intention | dic_client_will }}</span
                  >
                  <span
                    v-show="thisItem.isSucceed"
                    :class="
                      thisItem.isSucceed == '1'
                        ? 'approval_Passed'
                        : 'approval_Passed1'
                    "
                    >{{
                      thisItem.isSucceed == "0"
                        ? "失败"
                        : thisItem.isSucceed == "1"
                        ? "成功"
                        : thisItem.isSucceed == "2"
                        ? "未成功"
                        : ""
                    }}
                  </span>
                </p>
                <p
                  v-if="thisItem.remark"
                  class="schedule_star"
                  style="width: 80%"
                >
                  {{ thisItem.remark }}
                </p>
                <p class="schedule_star" style="width: 20%">
                  {{ thisItem.lastTime }}
                </p>
              </router-link>
            </ul>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import { BmlMarkerClusterer } from "vue-baidu-map";
export default {
  data() {
    return {
      active: false,
      serchCustomer: "",
      tabId: 0,
      tabId1: 0,
      content: "",
      MarketingRecord: [],
      MarketingRecord1: [],
      MarketingRecordClaim: [],
      MarketingRecordPotential: [],
      marketed: "",

      marketing: "",
      marketed_option: [
        { text: "全部", value: "" },
        { text: "已营销", value: "1" },
        { text: "未营销", value: "0" },
      ],
      product_intention: "",
      intention_option: [],
      marketing_option: [
        { text: "营销结果", value: "" },
        { text: "营销成功", value: 1 },
        { text: "尚未成功", value: 2 },
        { text: "营销失败", value: 0 },
      ],
      taskQuery: {
        taskCompletion: 0,
      },
      id: "",
      productName: "",
      productCode: "",
      polymerizationLocation: [],
      id: "",
      taskUpdateFlag: "",
      currentPage1: 1,
      pageSize1: 10,
      dataTotal1: "",
      loadEnd1: false, // 滚动加载中
      finishEnd1: false, // 滚动加载完成
      currentPage: 1,
      pageSize: 10,
      dataTotal: "",
      loadEnd: false, // 滚动加载中
      finishEnd: false, // 滚动加载完成
      offset: 5, //滚动条与底部距离小于 offset 时触发load事件，默认300
    };
  },
  components: {
    ChildNav,
    BmlMarkerClusterer,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === "/MarketingDetails") {
        vm.tab(1);
      }
    });
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    this.productName = this.$route.query.productName;
    this.productCode = this.$route.query.productCode;
    this.getTaskQuery();
    this.getDic();
  },
  updated() {},
  methods: {
    tab(ev) {
      this.tabId = ev;
      if (ev == 1) {
        this.onLoadList1();
        // this.onLoadList();
      }
      if (ev == 0) {
        this.getTaskQuery();
      }
    },
    draw({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(114.65, 33.37));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
    getTaskQuery() {
      this.$httpGet({
        url: `/api/semTasks/get/${this.id}`,
        params: {
          id: this.id,
        },
      }).then((res) => {
        this.taskQuery = res.data;
        this.taskUpdateFlag = res.data.taskUpdateFlag;
        if (res.data.custList.length > 0) {
          this.polymerizationLocation = res.data.custList.map((it) => ({
            lng: it.location?.split(",")[0],
            lat: it.location?.split(",")[1],
          }));
        }
      });
    },
    getDic() {
      this.$httpGet({
        url: "/dic/type/dic_client_will",
      }).then((res) => {
        let transformDara = [];
        transformDara.push({ value: "", text: "全部" });
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ value: it.code, text: it.codeText });
          }
        });
        this.intention_option = transformDara;
      });
    },
    tab1(ev) {
      this.tabId1 = ev;
      if (ev == 1) {
        this.currentPage = 1;
        this.MarketingRecordClaim = [];
        this.onLoadList();
      } else if (ev == 0) {
        this.currentPage1 = 1;
        this.MarketingRecord = [];
        this.onLoadList1();
      }
    },
    // 滚动加载更多
    onLoadList1() {
      this.getMarketingCustomers();
    },
    getMarketingCustomers() {
      this.$httpGet({
        url: "/api/appMarket/custInfo",
        params: {
          page: this.currentPage1, //页数
          limit: this.pageSize1, //每页个数
          customerType: 1,
          taskId: this.id,
          isSem: this.marketed,
          intention: this.product_intention,
          isSucceed: this.marketing,
        },
      }).then((res) => {
        this.dataTotal1 = res.count;
        //进行判断
        if (this.dataTotal1 <= this.pageSize1) {
          this.MarketingRecord = res.data;
        } else {
          this.currentPage1++;
          let arr = res.data;
          this.MarketingRecord = this.MarketingRecord.concat(arr);
        }
        // 加载状态结束
        this.loadEnd1 = false;
        // 数据全部加载完成
        if (this.MarketingRecord.length >= this.dataTotal1) {
          this.finishEnd1 = true; //结束，显示我也是有底线的
        }
      });
    },
    onLoadList() {
      this.getMarketingCustomers1();
    },
    getMarketingCustomers1() {
      this.$httpGet({
        url: "/api/appMarketClaim/custInfo",
        params: {
          page: this.currentPage, //页数
          limit: this.pageSize, //每页个数
          customerType: 2,
          taskId: this.id,
          isSem: this.marketed,
          intention: this.product_intention,
          isSucceed: this.marketing,
          
        },
      }).then((res) => {
        this.dataTotal = res.count;
        //进行判断
        if (this.dataTotal <= this.pageSize) {
          this.MarketingRecordClaim = res.data;
        } else {
          this.currentPage++;
          let arr = res.data;
          this.MarketingRecordClaim = this.MarketingRecordClaim.concat(arr);
        }
        // 加载状态结束
        this.loadEnd = false;
        // 数据全部加载完成
        if (this.MarketingRecordClaim.length >= this.dataTotal) {
          this.finishEnd = true; //结束，显示我也是有底线的
        }
      });
    },
    // getMarketingCustomers2() {
    //   this.$httpGet({
    //     url: "/api/appPotentialCust/custInfo",
    //     params: {
    //       limit: 10,
    //       page: 1,
    //       customerType: 3,
    //     },
    //   }).then((res) => {
    //     this.MarketingRecordPotential = res.data;
    //     if (
    //       this.MarketingRecordPotential.customerCode &&
    //       this.MarketingRecordPotential.gridCode
    //     ) {
    //       this.$httpGet({
    //         url: "/api/appMarket/marketRecord",
    //         params: {
    //           customerCode: this.MarketingRecordPotential.customerCode,
    //           limit: 10,
    //           gridCode: this.MarketingRecordPotential.gridCode,
    //           page: 1,
    //         },
    //       }).then((res) => {
    //         this.MarketingRecord1 = res.data;
    //       });
    //     }
    //   });
    // },
    onSearch() {
      if (this.tabId1 == 0) {
        this.$httpGet({
          url: "/api/appMarket/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 1,
            custInfo: this.serchCustomer,
            taskId: this.id,
          },
        }).then((res) => {
          this.MarketingRecord = res.data;
        });
      } else if (this.tabId1 == 1) {
        this.$httpGet({
          url: "/api/appMarketClaim/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 2,
            custInfo: this.serchCustomer,
            taskId: this.id,
          },
        }).then((res) => {
          this.MarketingRecordClaim = res.data;
        });
      } else {
        this.$httpGet({
          url: "/api/appPotentialCust/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 3,
            custInfo: this.serchCustomer,
          },
        }).then((res) => {
          this.MarketingRecordPotential = res.data;
        });
      }
    },
    marketChange(val) {
      if (this.tabId1 == 0) {
        this.$httpGet({
          url: "/api/appMarket/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 1,
            isSem: this.marketed,
            taskId: this.id,
          },
        }).then((res) => {
          this.MarketingRecord = res.data;
        });
      } else if (this.tabId1 == 1) {
        this.$httpGet({
          url: "/api/appMarketClaim/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 2,
            isSem: this.marketed,
            taskId: this.id,
          },
        }).then((res) => {
          this.MarketingRecordClaim = res.data;
        });
      } else {
        this.$httpGet({
          url: "/api/appPotentialCust/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 3,
            isSem: this.marketed,
          },
        }).then((res) => {
          this.MarketingRecordPotential = res.data;
        });
      }
    },
    intentionChange(val) {
      if (this.tabId1 == 0) {
        this.$httpGet({
          url: "/api/appMarket/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 1,
            intention: this.product_intention,
            taskId: this.id,
          },
        }).then((res) => {
          this.MarketingRecord = res.data;
        });
      } else if (this.tabId1 == 1) {
        this.$httpGet({
          url: "/api/appMarketClaim/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 2,
            intention: this.product_intention,
            taskId: this.id,
          },
        }).then((res) => {
          this.MarketingRecordClaim = res.data;
        });
      } else {
        this.$httpGet({
          url: "/api/appPotentialCust/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 3,
            intention: this.product_intention,
          },
        }).then((res) => {
          this.MarketingRecordPotential = res.data;
        });
      }
    },
    marketingChange(val) {
      if (this.tabId1 == 0) {
        this.$httpGet({
          url: "/api/appMarket/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 1,
            isSucceed: this.marketing,
            taskId: this.id,
          },
        }).then((res) => {
          this.MarketingRecord = res.data;
        });
      } else if (this.tabId1 == 1) {
        this.$httpGet({
          url: "/api/appMarketClaim/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 2,
            isSucceed: this.marketing,
            taskId: this.id,
          },
        }).then((res) => {
          this.MarketingRecordClaim = res.data;
        });
      } else {
        this.$httpGet({
          url: "/api/appPotentialCust/custInfo",
          params: {
            limit: 10,
            page: 1,
            customerType: 3,
            isSucceed: this.marketing,
          },
        }).then((res) => {
          this.MarketingRecordPotential = res.data;
        });
      }
    },
  },
  filters: {
    dic_client_will(val) {
      const findWill = JSON.parse(localStorage.getItem("dicClientWill")).find(
        (it) => +it.key == val
      );
      return findWill ? findWill.value : "";
    },
  },
};
</script>
<style scoped>
.schedule_star {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.MissionDetails {
  padding-top: 46px;
}
.bm-view {
  width: calc(100% - 1rem);
  margin: auto;
  border: 0.05rem solid #bbb;
  height: 59vh;
}
.cur {
  color: #df0f0f;
  font-weight: 500;
  /* font-size: 0.9rem; */
}
.mission_details {
  background: #fff;
  padding: 0.5rem 0.5rem 0rem 0.5rem;
  position: relative;
}
.mission_details li {
  margin-bottom: 0.7rem;
  /* padding-left: 0.5rem; */
}
.mission_details li img {
  width: 1.4rem;
  vertical-align: bottom;
  margin: 0rem 0rem 0rem 2rem;
}
.mission_details li a {
  text-decoration: none;
  float: right;
  margin-right: 1rem;
}
.mission_details li .telephone {
  float: right;
  margin-right: 1rem;
}
.mission_details li:last-child {
  padding-bottom: 0.5rem;
}
.tabTitle {
  border-top: 0px;
}
.tabTitle .tabList {
  display: flex;
  justify-content: space-around;
  height: 45px;
  width: 100%;
  line-height: 45px;
  background-color: #fff;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.progress {
  display: inline-block;
  vertical-align: bottom;
  background-color: rgba(100, 100, 100, 0.2);
  position: relative;
  height: 1rem;
  border-radius: 0.5rem;
  width: 45%;
  margin-left: 1rem;
}
.progress-done {
  background: #3cc8ab;
  border-radius: 0.5rem;
  height: 1rem;
  /* width: 80%; */
  transition: width 1s ease 0.3s;
  text-align: right;
  color: #fff;
  padding-right: 0.3rem;
  line-height: 1rem;
}
.task_management {
  position: absolute;
  line-height: 2rem;
  text-align: center;
  width: 5.5rem;
  height: 2rem;
  border: 1px solid #0fb38f;
  color: #0fb38f;
  top: 0.5rem;
  font-size: 1rem;
  right: 1rem;
  /* transform: rotate(336deg);
  -ms-transform: rotate(336deg);
  -moz-transform: rotate(336deg);
  -webkit-transform: rotate(336deg);
  -o-transform: rotate(336deg); */
}
.customer_list ul li {
  display: flex;
  flex-wrap: wrap;
  padding: 0.8rem 0.8rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.customer_list ul li p {
  width: 50%;
  margin-bottom: 0.3rem;
}
.customer_list ul li p:nth-child(even) {
  text-align: right;
}
.approval {
  position: relative;
}
.approval .approval_Passed {
  display: inline-block;
  line-height: 1.6rem;
  text-align: center;
  width: 33%;
  height: 1.6rem;
  font-size: 1rem;
  border: 1px solid #3cc8ab;
  color: #3cc8ab;
  font-size: 0.8rem;
  margin-left: 2%;
}
.approval .approval_Passed1 {
  display: inline-block;
  line-height: 1.6rem;
  text-align: center;
  width: 33%;
  height: 1.6rem;
  font-size: 1rem;
  border: 1px solid #c1b9b9;
  color: #c1b9b9;
  font-size: 0.8rem;
  margin-left: 2%;
}
.van-dropdown-menu >>> .van-dropdown-menu__bar {
  box-shadow: none;
  height: 38px;
  font-size: 14px;
  border-bottom: 1px solid #e8e8e8;
}
@media screen and (max-width: 359px) {
  li,
  select,
  input,
  p,
  div,
  span {
    font-size: 0.8rem;
  }
  /*placeholder样式-开始*/
  input::-webkit-input-placeholder {
    font-size: 0.8rem !important;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 0.8rem !important;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: 0.8rem !important;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-size: 0.8rem !important;
  }
  .tabTitle .tabList {
    border-bottom: 0.001rem solid #e8e8e8 !important;
  }
  .cur {
    font-size: 0.8rem;
  }
  .task_management {
    line-height: 1.6rem;
    width: 5rem;
    height: 1.6rem;
    top: 0.5rem;
    font-size: 0.8rem;
    right: 1rem;
  }
  .customer_list ul li {
    padding: 0.3rem 0.5rem;
    font-size: 0.7rem !important;
  }
  .approval .approval_Passed {
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .approval .approval_Passed1 {
    height: 1.5rem;
    line-height: 1.5rem;
  }
}
</style>
