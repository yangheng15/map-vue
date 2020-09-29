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
          <li>
            <span style="font-weight: 600">任务名称：</span>
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
            <span style="font-weight: 600">营销产品：</span
            >{{ taskQuery.productCode }}
          </li>
          <li>
            <span style="font-weight: 600">截止日期：</span
            >{{ taskQuery.endTime | transform }}
          </li>
          <li>
            <span style="font-weight: 600">
              目
              <span style="display: inline-block; width: 1.5rem"></span
              >标： </span
            >{{ taskQuery.targetNum }}万元
          </li>
          <li>
            <span style="font-weight: 600">
              完
              <span style="display: inline-block; width: 0.4rem"></span>成
              <span style="display: inline-block; width: 0.4rem"></span>度：
            </span>
            <span style="color: #3cc8ab">160,000.00</span>
            <div class="progress">
              <div class="progress-done" data-done="80">80%</div>
            </div>
          </li>
        </ul>
        <baidu-map
          class="bm-view"
          :center="{ lng: 114.654102, lat: 33.623741 }"
          :zoom="11"
          ak="YOUR_APP_KEY"
        >
          <bm-marker
            :position="{ lng: 114.654102, lat: 33.623741 }"
            :dragging="true"
          ></bm-marker>
        </baidu-map>
      </div>
      <div v-show="tabId === 1">
        <van-dropdown-menu>
          <van-dropdown-item v-model="marketed" :options="marketed_option" />
          <van-dropdown-item v-model="intention" :options="intention_option" />
          <van-dropdown-item v-model="marketing" :options="marketing_option" />
        </van-dropdown-menu>
        <van-search
          v-model="serchCustomer"
          placeholder="客户编号，客户名称"
          @search="onSearch"
        />
        <div class="customer_list">
          <ul>
            <router-link tag="li" :to="{ name: 'MarketingDetails', query: { title: '营销客户详情',custName:thisItem.custName,telephone:thisItem.telephone,intention:thisItem.intention,customerCode:thisItem.customerCode,gridCode:thisItem.gridCode,productCode:taskQuery.productCode,id:taskQuery.id } }" v-for="(thisItem, index) in MarketingRecord" :key="index">
              <p style="font-weight: 600; width: 30%; font-size: 0.9rem">
                {{ thisItem.custName }}
              </p>
              <p style="width: 70%; display: flex" class="approval">
                <span
                  :class="
                    thisItem.isSem == '1'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{ thisItem.isSem == "1" ? "已营销" : "未营销" }}</span
                >
                <span
                  :class="
                    thisItem.intention == '0'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{ thisItem.intention == "0" ? "强" : (thisItem.intention == "1"? "一般":(thisItem.intention == "2"?"无":(thisItem.intention == "3"?"已有产品":(thisItem.intention == "4"?"直接拒绝":"同意采集"))))}}</span
                >
                <span
                  :class="
                    thisItem.isSucceed == '1'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{ thisItem.isSucceed == "1" ? "成功" : "失败" }}
                </span>
              </p>
              <p v-if="thisItem.text" class="schedule_star" style="width: 80%">
                {{ thisItem.text }}
              </p>
              <p v-if="thisItem.date" class="schedule_star" style="width: 20%">
                {{ thisItem.date }}
              </p>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import moment from "moment";
export default {
  data() {
    return {
      active: false,
      circlePath: {
        center: {
          lng: 114.65,
          lat: 33.37,
        },
        radius: 5000,
      },
      serchCustomer: "",
      tabId: 0,
      content: "",
      polylinePath: [
        { lng: 114.75, lat: 33.41 },
        { lng: 114.72, lat: 33.38 },
        { lng: 114.69, lat: 33.32 },
        { lng: 114.5, lat: 33.365 },
        { lng: 114.65, lat: 33.47 },
        { lng: 114.75, lat: 33.5 },
      ],
      MarketingRecord: [],
      MarketingRecord1: [],
      marketed: 0,
      intention: "",
      marketing: 0,
      marketed_option: [
        { text: "已营销", value: 1 },
        { text: "未营销", value: 0 },
      ],
      intention_option: [
        { text: "客户意向", value: "" },
        { text: "强", value: 0 },
        { text: "一般", value: 1 },
        { text: "无", value: 2 },
        { text: "已有他行产品", value: 3 },
        { text: "直接拒绝", value: 4 },
        { text: "同意采集", value: 5 },
      ],
      marketing_option: [
        { text: "营销成功", value: 1 },
        { text: "尚未成功", value: 0 },
      ],
      taskQuery: {},
      id: "",
    };
  },
  components: {
    ChildNav,
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(from);
      if(from.path === '/MarketingDetails') {
        vm.tab(1)
      }
    })
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getTaskQuery();
    // $loading.show("拼命加载中..");
  },
  updated() {},
  methods: {
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    addPolylinePoint() {
      this.polylinePath.push({ lng: 116.404, lat: 39.915 });
    },
    tab(ev) {
      this.tabId = ev;
      // localStorage.setItem("indexTabId", this.tabId);
      if (ev == 1) {
        this.getMarketingCustomers();
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
        console.log(res.data);
        this.taskQuery = res.data;
      });
    },
    getMarketingCustomers() {
      this.$httpGet({
        url: "/api/appMarket/custInfo",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        console.log(res.data);
        this.MarketingRecord = res.data;
        if (
          this.MarketingRecord.customerCode &&
          this.MarketingRecord.gridCode
        ) {
          this.$httpGet({
            url: "/api/appMarket/marketRecord",
            params: {
              customerCode: this.MarketingRecord.customerCode,
              limit: 10,
              gridCode: this.MarketingRecord.gridCode,
              page: 1,
            },
          }).then((res) => {
            console.log(res.data);
            this.MarketingRecord1 = res.data;
          });
        }
      });
    },
    onSearch(val) {
      console.log(val);
      this.$httpGet({
        url: "/api/appMarket/custInfo",
        params: {
          limit: 10,
          page: 1,
          userName: val,
        },
      }).then((res) => {
        console.log(res.data);
        this.MarketingRecord = res.data;
      });
    },
  },
  filters: {
    transform(val) {
      if (val) {
        return moment(val).format("YYYY-MM-DD");
      }
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
  font-size: 0.9rem;
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
  width: 80%;
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
  line-height: 2rem;
  text-align: center;
  width: 33%;
  height: 2rem;
  font-size: 1rem;
  border: 1px solid #3cc8ab;
  color: #3cc8ab;
  font-size: 0.8rem;
  margin-left: 2%;
}
.approval .approval_Passed1 {
  display: inline-block;
  line-height: 2rem;
  text-align: center;
  width: 33%;
  height: 2rem;
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
@media screen and (min-width: 320px) and (max-width: 374px) {
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
