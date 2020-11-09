<template>
  <div class="WorkbenchBranch">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '成员轨迹'">
      <van-search v-model="search_txt" placeholder="用户名称" />
      <ul class="time_vant">
        <li style>
          <van-cell title="选择日期区间" :value="date" @click="show = true" />
          <van-calendar v-model="show" type="range" @confirm="onConfirm" />
        </li>
        <li class="time_search">
          <button @click="showLabel">查询</button>
        </li>
      </ul>
      <div class="customer_list">
        <baidu-map
          class="bm-view"
          :center="{ lng: 114.65, lat: 33.37 }"
          :zoom="11"
          ak="vqUYjlHbtsD2ZGmYXYMuHVvve6SvtHX6"
        >
          <!-- <bm-overlay
            pane="labelPane"
            :class="{sample: true, active}"
            @draw="draw"
            @mouseover.native="active = true"
            @mouseleave.native="active = false"
          >
            <div style="width:21rem;height:22rem;border:0.07rem dashed #D33E42"></div>
          </bm-overlay>-->
          <bm-polygon
            v-if="showBdLabel"
            :path="polylinePath"
            stroke-color="#DF0F0F"
            strokeStyle="dashed"
            fillColor="transparent"
            :stroke-opacity="1"
            :stroke-weight="1"
            @lineupdate="updatePolylinePath"
          ></bm-polygon>
          <bm-label
            v-if="showBdLabel"
            content="1"
            :position="{ lng: 114.725, lat: 33.415 }"
            :labelStyle="{
              color: '#fff',
              background: '#D33E42',
              fontSize: '1rem',
              width: '1.5rem',
              height: '1.5rem',
              lineHeight: '1.5rem',
              textAlign: 'center',
              borderRadius: '100%',
            }"
            title="Hover me"
          />
          <bm-label
            v-if="showBdLabel"
            content="2"
            :position="{ lng: 114.7, lat: 33.385 }"
            :labelStyle="{
              color: '#fff',
              background: '#D33E42',
              fontSize: '1rem',
              width: '1.5rem',
              height: '1.5rem',
              lineHeight: '1.5rem',
              textAlign: 'center',
              borderRadius: '100%',
            }"
            title="Hover me"
          />
          <bm-label
            v-if="showBdLabel"
            content="3"
            :position="{ lng: 114.675, lat: 33.345 }"
            :labelStyle="{
              color: '#fff',
              background: '#D33E42',
              fontSize: '1rem',
              width: '1.5rem',
              height: '1.5rem',
              lineHeight: '1.5rem',
              textAlign: 'center',
              borderRadius: '100%',
            }"
            title="Hover me"
          />
          <bm-label
            v-if="showBdLabel"
            content="4"
            :position="{ lng: 114.49, lat: 33.38 }"
            :labelStyle="{
              color: '#fff',
              background: '#D33E42',
              fontSize: '1rem',
              width: '1.5rem',
              height: '1.5rem',
              lineHeight: '1.5rem',
              textAlign: 'center',
              borderRadius: '100%',
            }"
            title="Hover me"
          />
          <bm-label
            v-if="showBdLabel"
            content="5"
            :position="{ lng: 114.645, lat: 33.475 }"
            :labelStyle="{
              color: '#fff',
              background: '#D33E42',
              fontSize: '1rem',
              width: '1.5rem',
              height: '1.5rem',
              lineHeight: '1.5rem',
              textAlign: 'center',
              borderRadius: '100%',
            }"
            title="Hover me"
          />
          <bm-label
            v-if="showBdLabel"
            content="6"
            :position="{ lng: 114.72, lat: 33.49 }"
            :labelStyle="{
              color: '#fff',
              background: '#D33E42',
              fontSize: '1rem',
              width: '1.5rem',
              height: '1.5rem',
              lineHeight: '1.5rem',
              textAlign: 'center',
              borderRadius: '100%',
            }"
            title="Hover me"
          />
          <!-- <bm-label
            content="城关镇世纪广场"
            :position="{lng: 114.565, lat: 33.4}"
            :labelStyle="{color: 'red', fontSize : '0.9rem',width:'4rem',height:'2rem',lineHeight: '2rem',textAlign: 'center',background: 'transparent',border:'none'}"
            title="Hover me"
          />-->
        </baidu-map>
      </div>
    </div>
    <div v-if="typeCN == '客户认领审批'">
      <van-search v-model="search_txt" placeholder="客户名称" />
      <div class="customer_list">
        <ul v-for="(thisItem, index) in customer_list2" :key="index">
          <li>
            <p>{{ thisItem.name }}</p>
            <p class="approval">
              <a
                v-if="thisItem.text == 1"
                href
                style="text-decoration: none; margin-right: 0.6rem"
                >未审批</a
              >
              <span v-if="thisItem.text == 2" class="approval_Failed"
                >未通过</span
              >
              <span v-if="thisItem.text == 3" class="approval_Passed"
                >已通过</span
              >
            </p>
            <p class="schedule_star">
              <van-rate
                v-model="value"
                :size="14"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p>{{ thisItem.date }}</p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
    <div v-if="typeCN == '工作日志'">
      <van-search v-model="search_txt" placeholder="客户名称" />
      <ul class="time_frame">
        <li>
          <datepicker
            style="border: 1px solid #"
            v-model="birthday"
            label="Enter Date"
            date-format="yyyy-mm-dd"
          ></datepicker>
        </li>
        <li>
          <datepicker
            v-model="birthday"
            label="Enter Date"
            date-format="yyyy-mm-dd"
          ></datepicker>
        </li>
      </ul>
      <div class="work_log">
        <ul v-for="(thisItem, index) in work_log" :key="index">
          <li>
            <p class="work_log_date">
              <span>{{ thisItem.date }}</span>
            </p>
            <p class="work_log_name">
              <span>{{ thisItem.name }}</span>
            </p>
          </li>
        </ul>
      </div>

      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "WorkbenchBranch",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      family_type_txt: "",
      family_type_list: ["务工，务农", "经营型"],
      family_type: false,
      regional_grid_txt: "",
      regional_grid: false,
      residential_address: "",
      user_positioning: "",
      grid_theme: 0,
      grid_theme_txt: "",
      grid_theme_list: ["网格主题", "2020特色存款营销", "etc开通", "助农贷款"],
      grid_theme: false,
      grid_name: "",
      checked: true,
      value: 1,
      radio: "1",
      search_txt: "",
      showBdLabel: false,
      date: "",
      date1: "",
      show: false,
      show_back: false,
      active: false,
      circlePath: {
        center: {
          lng: 114.65,
          lat: 33.37,
        },
        radius: 5000,
      },
      polylinePath: [
        { lng: 114.75, lat: 33.41 },
        { lng: 114.72, lat: 33.38 },
        { lng: 114.69, lat: 33.32 },
        { lng: 114.5, lat: 33.365 },
        { lng: 114.65, lat: 33.47 },
        { lng: 114.75, lat: 33.5 },
      ],
      isPopupVisible: false,
      isPopupVisibleScreen: false,
      isPopupVisibleFamily: false,
      checkAllFlag: false,
      text: "本季度",
      text1: "存款",
      title: "",
      articleType: "---",
      typeCN: "",
      isLGB: true,
      styleDisplyType: "",
      isEdit: "true",
      isSearch: "true",
      isAdd: false,
      isDelete: false,
      tabId: 1,
      tabId1: 5,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      customer_list: [
        {
          name: "北京卓越联腾科技有限公司",
          text: "上次联系",
          date: "三个月前",
          id: 1,
        },
        { name: "刘莎莎", text: "上次联系", date: "三个月前", id: 2 },
      ],
      data_customer_list1: [
        {
          name: "北京卓越联腾科技有限公司",
          text: "上次联系",
          date: "一天前",
          id: 1,
        },
        { name: "吴宇迪", text: "上次联系", date: "两天前", id: 2 },
      ],
      data_customer_list2: [
        {
          name: "刘莎莎",
          text: "上次联系",
          date: "五天前",
          id: 1,
        },
      ],
      data_customer_list3: [
        {
          name: "北京卓越联腾科技有限公司",
          text: "上次联系",
          date: "一周前",
          id: 1,
        },
        { name: "刘莎莎", text: "上次联系", date: "十三天前", id: 2 },
      ],
      newCustomerList: [
        {
          name: "北京卓越联腾科技有限公司",
          date: "上次联系 三个月前",
          business1: "存款",
          business2: "贷款",
          business3: "理财",
          text: "AUM:300万",
          id: 1,
          platinum_customers: "铂金客户",
          key_customers: "重点客户 ",
          back: "移除",
        },
      ],

      customer_list2: [
        {
          name: "北京卓越联腾科技有限公司",
          text: "1",
          date: "张三丰·总行营业部",
        },
        { name: "刘莎莎", text: "2", date: "张三丰·总行营业部" },
        { name: "刘莎莎", text: "3", date: "张三丰·总行营业部" },
      ],

      work_log: [
        {
          name: "对北京卓越联腾科技有限公司进行企业贷产品上门营销",
          date: "2020-08-20",
        },
        { name: "对刘莎莎进行理财1号产品电话营销", date: "2020-08-21" },
      ],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    showLabel() {
      this.showBdLabel = true;
    },
    tab(ev) {
      this.tabId = ev;
    },
    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    showPopupScreen() {
      this.isPopupVisibleScreen = true;
    },
    showPopupFamily() {
      this.isPopupVisibleFamily = true;
    },
    closePopupScreen() {
      this.isPopupVisibleScreen = false;
    },
    closePopupFamily() {
      this.isPopupVisibleFamily = false;
    },
    showBack() {
      this.show_back = true;
    },
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.van-checkbox__icon {
  height: 20px;
}
.marter span {
  margin: 0px 2px;
}
.van-search {
  width: 100%;
}
.WorkbenchBranch {
  padding-top: 46px;
}

.right_content p {
  width: 50%;
  color: #000;
}
.right_content p:nth-child(even) {
  text-align: right;
}
.new_task {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.new_task p {
  margin: 0.5rem 0;
}
.success_failure {
  position: relative;
  border-bottom: 1px solid #e8e8e8;
}
.success_failure .sf_state {
  position: absolute;
  top: -0.5rem;
  left: 35%;
  line-height: 4.8rem;
  width: 4.5rem;
  text-align: center;
  height: 4rem;
  background: url("../../assets/WorkBench/fail.png") no-repeat;
  background-size: cover;
}
.success_failure .sf_states {
  position: absolute;
  top: 0.3rem;
  color: transparent;
  left: 35%;
  width: 4.3rem;
  height: 2.7rem;
  background: url("../../assets/WorkBench/success.png") no-repeat;
  background-size: cover;
}
/* 下面是弹窗 */
.isPopupVisibleSign {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0rem;
  width: 100%;
  height: 100vh;
  padding: 0.5rem 0.5rem;
  background: rgba(193, 185, 185, 0.7);
}
.isPopupVisibleSign_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 77%;
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
}
.pop_content {
  padding: 1rem 1rem 1rem 1rem;
}
.pop_title {
  text-align: center;
  background: rgb(61, 66, 94);
  color: #fff;
  font-size: 1rem;
  height: 2.5em;
  margin: 0rem;
  line-height: 2.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

/* 上面是弹窗 */

/* 知识库 */
.knowledge ul {
  position: relative;
  padding: 1rem;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.knowledge ul .right_cursor {
  position: absolute;
  right: 0.5rem;
  margin: 0;
  top: 32%;
}
.knowledge ul .right_cursor img {
  width: 1.5rem;
}

/*  */
.not_select {
  display: flex;
  background: #fff;
}
.not_select .divInput {
  width: 50%;
  background: #fff;
}
.not_select .divInput ul {
  width: 50%;
  position: absolute;
  background: #fff;
  z-index: 6;
}
.not_select .divInput ul li {
  display: inline-block;
  list-style: none;
  width: 7rem;
  font-size: 0.8rem;
  /* border-top: 0.05rem solid #bbb; */
  background-color: #fff;
  margin: 0.4rem 1rem 0.4rem 1rem;
}
.not_select .divInput ul li:first-child {
  border: 0px;
}
.not_select .divInput .select_sort {
  /* width: 140px; */
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  position: relative;
  background-color: #fff;
}
.not_select .divInput .select_sort input {
  border: none;
  outline: none;
  width: 100%;
  height: 30px;
  padding: 0rem 1.2rem;
  border-radius: 0.3rem;
  margin-top: 5px;
  color: #1a1818;
  border: 1px solid #bbb;
  background-color: #fff;
}
.not_select .divInput .select_sort img {
  position: absolute;
  right: 16px;
  top: 7%;
  width: 7%;
}
.time_vant {
  margin: 0.5rem !important;
  display: flex;
}
.time_vant .time_search {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}
.time_vant .time_search button {
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  background: rgb(61, 66, 94);
  color: #fff;
  border-radius: 0.3rem;
  border: none;
}
.time_vant li {
  margin: 0rem;
  border: 0.05rem solid #e8e8e8;
  width: 70%;
}
.line {
  text-align: center;
  width: 5rem;
  margin: 0;
  line-height: 2rem;
}
.line span {
  display: inline-block;
  width: 3rem;
  height: 0.05rem;
  background: #bbb;
  text-align: center;
}

.stock {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.stock p {
  margin: 0.5rem 0rem 0rem;
}
.stock:last-child {
  padding-bottom: 0.5rem;
}
.stock_have p {
  width: 33.3%;
}

.stock li {
  width: 63%;
  margin: 0.1rem 0rem;
}
.stock li:nth-child(odd) {
  width: 37%;
}
.stock li input,
.stock li select {
  border: 0.05rem solid #bbb;
  height: 2rem;
  background: #fff;
  padding-left: 0.5rem;
  width: 100%;
}
.cw_stock {
  line-height: 2rem;
}
.cw_stock li {
  position: relative;
}
.cw_stock li img {
  position: absolute;
  top: 0.6rem;
  right: 1rem;
  width: 1rem;
}
.peasant_households li {
  margin-top: 1rem;
}
.peasant_households li select,
.peasant_households li input {
  border-radius: 0.3rem;
}
.sample {
  left: 2rem !important;
  top: 10rem !important;
  position: absolute;
}
.planning_results {
  position: fixed;
  top: 13rem;
  left: 1rem;
  z-index: 50;
  font-size: 1rem;
  width: 12rem;
  padding-top: 0.5rem;
  background: rgba(250, 250, 250, 0.8);
}
.planning_results ul {
  margin: 0 !important;
  background: rgba(250, 250, 250, 0.8) !important;
}
.planning_results ul li {
  display: flex;
  margin: 0;
}
.planning_results ul li p {
  margin: 0;
  width: 70% !important;
}
.planning_results ul li .plan_num {
  width: 1.5rem !important;
  height: 1.5rem;
  text-align: center;
  line-height: 1.5rem;
  border: 0.05rem solid #bbb;
  border-radius: 100%;
  background: #fff;
}
.planning_results ul li p span {
  display: block;
}
.bm-view {
  width: 100%;
  height: 78vh;
}
.c-row-label {
  width: 70px;
}
.to_do_list {
  height: 3rem;
  line-height: 3rem;
  margin: 0rem 1rem;
  border-bottom: 0.1rem;
  font-size: 0.9rem;
}
.to_do_list .list_to_do {
  float: right;
  font-size: 0.8rem;
  color: #888;
}
.to_do_list .list_to_do i {
  margin-left: 0.3rem;
}
.to_do_list ul {
  border-top: 0.04rem dashed #000;
}
.to_do_list ul:first-child {
  border: 0;
}

.customer_list ul {
  background: #fff;
  /* margin-top: 10px; */
}
.customer_list ul li {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.customer_list ul li p {
  width: 60%;
  margin: 5px 0px;
}
.customer_list ul li p:nth-child(even) {
  text-align: right;
  width: 40%;
}
.customer_list .schedule_star img {
  width: 1.2rem;
  vertical-align: middle;
}
.work_log ul li {
  margin-top: 10px;
  height: 5rem;
  display: flex;
  flex-wrap: wrap;
}
.work_log ul {
  width: calc(99% - 0.5rem);
  margin-left: 0.4rem;
}
.work_log .work_log_date {
  background: #fff;
  width: calc(25% - 1rem);
  margin-right: 1rem;
  text-align: center;
  display: table;
  height: 5rem;
}
.work_log .work_log_date span,
.work_log .work_log_name span {
  display: table-cell;
  vertical-align: middle;
}
.work_log .work_log_name {
  background: #fff;
  width: 75%;
  padding: 0rem 1rem;
  display: table;
  height: 5rem;
}
/* .end_line {
  border-top: 0.05rem solid #bbb;
  margin: 1rem;
  padding-top: 0.5rem;
  text-align: center;
  
} */
.end_line {
  margin: 0.8rem;
  text-align: center;
  color: #c1b9b9;
  font-size: 1rem;
}
.time_frame {
  height: 3rem;
  line-height: 3rem;
  background-color: #fff;
  margin: 0.3rem;
  display: flex;
  padding: 0rem 1rem;
  justify-content: space-between;
}
.success {
  position: relative;
}
.task_management {
  position: absolute;
  line-height: 2rem;
  text-align: center;
  width: 6rem;
  height: 2rem;
  border: 1px solid #3cc8ab;
  color: #3cc8ab;
  top: 1.7rem;
  font-size: 0.8rem;
  left: 5rem;
  transform: rotate(336deg);
  -ms-transform: rotate(336deg);
  -moz-transform: rotate(336deg);
  -webkit-transform: rotate(336deg);
  -o-transform: rotate(336deg);
}
.approval {
  position: relative;
}
.approval .approval_Failed,
.approval .approval_Passed {
  position: absolute;
  line-height: 3.6rem;
  text-align: center;
  width: 3.6rem;
  height: 3.6rem;
  border: 1px solid #ff9800;
  color: #ff9800;
  border-radius: 100%;
  top: -0.7rem;
  font-size: 0.8rem;
  right: 1rem;
  transform: rotate(330deg);
  -ms-transform: rotate(330deg); /* IE 9 */
  -moz-transform: rotate(330deg); /* Firefox */
  -webkit-transform: rotate(330deg); /* Safari 和 Chrome */
  -o-transform: rotate(330deg); /* Opera */
}
.approval .approval_Passed {
  border: 1px solid #259b24;
  color: #259b24;
}
.add_record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: rgb(61, 66, 94);
  color: #fff;
  font-size: 1.5rem;
}
.progress {
  background-color: rgba(100, 100, 100, 0.2);
  position: relative;
  height: 1.3rem;
  width: 50%;
  border: 1px solid #cecece;
}
.progress-done {
  background: #3cc8ab;
  /* background: linear-gradient(to left, rgb(52, 204, 1), rgb(247, 247, 203)); */
  /* box-shadow: 0 3px 3px -5px rgb(242, 112, 156), 0 2px 5px rgb(242, 112, 156); */
  height: 1.15rem;
  width: 0;
  transition: width 1s ease 0.3s;
  text-align: right;
  color: #fff;
  padding-right: 0.3rem;
  line-height: 1.05rem;
  margin-top: 0.05rem;
}

.set_up {
  color: #1432e3;
}
.two_select {
  display: flex;
  padding: 0.5rem 0rem;
  line-height: 3rem;
  justify-content: space-around;
}
.two_select select {
  width: 40%;
  height: 2rem;
  border-radius: 0.4rem;
  border: 0.05rem solid #bbb;
  padding: 0rem 0.5rem;
}
.cur {
  color: #df0f0f;
  position: relative;
}
.ranking_list {
  display: flex;
  height: 2rem;
  width: 100%;
  line-height: 2rem;
  justify-content: space-between;
  width: calc(100% - 2rem);
  margin: 0rem 1rem;
  border-bottom: 0.01rem solid #e8e8e8 !important;
}
.ranking_list_body {
  padding: 1rem;
  margin: 0;
}
.ranking_list_body dt {
  font-weight: 600;
}
.ranking_list_body ul li {
  width: 33.3%;
  text-align: center;
}
.ranking_list_body ul {
  display: flex;
  justify-content: space-between;
}
.ranking_list_body ul li:first-child {
  text-align: left;
}
.ranking_list_body ul li:last-child {
  text-align: right;
}
.situation {
  background: #fff;
  width: 100%;
  text-align: center;
}
.situation ul {
  display: flex;
  justify-content: space-around;
}
.newCustomerList .business1 {
  display: inline-block;
  border: 0.05rem solid #0fb38f;
  color: #0fb38f;
  padding: 0.1rem 0.3rem;
}
.newCustomerList .business2 {
  display: inline-block;
  border: 0.05rem solid #1432e3;
  color: #1432e3;
  padding: 0.1rem 0.3rem;
}
.newCustomerList .business3 {
  display: inline-block;
  border: 0.05rem solid #ecd14a;
  color: #ecd14a;
  padding: 0.1rem 0.3rem;
}
.cartItem {
  display: flex;
  flex-flow: row;
  position: relative;
}
.selctBtn {
  /* width: 1.2rem;
  height: 1.2rem; */
  /* border: 1px solid #000; */
  margin: 1rem 0rem 0rem 1.2rem;
  position: absolute;
  top: -0.3rem;
  right: 1rem;
  /* cursor: pointer; */
}
/* .checked::before {
  position: absolute;
  content: "";
  font-size: 0.9rem;
  top: 50%;
  position: absolute;
  left: 50%;
  width: 1rem;
  height: 0.5rem;
  border: 0.1rem solid #fff;
  border-top: 0;
  border-right: 0rem;
  transform: rotate(-50deg) translate(0%, -125%);
} */
.checked {
  position: absolute;
  background: rgb(61, 66, 94);
  border: 1px solid rgb(61, 66, 94);
  color: #fff;
}
.cartItem li {
  width: 90%;
}
.save {
  /* background: #fff; */
  text-align: center;
  padding-bottom: 50px;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 6rem;
  border-radius: 0.4rem;
  height: 2rem;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
  .customer_list ul li p {
    width: 57%;
  }
  .customer_list ul li p:nth-child(even) {
    width: 43%;
  }

  .end_line {
    font-size: 0.8rem;
  }
  .two_select select {
    height: 1.5rem;
  }
  .pop_title {
    font-size: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .pop_content {
    padding: 0.5rem;
  }
  .save {
    padding-bottom: 2rem;
  }
  .knowledge ul {
    padding: 0.5rem;
    border-bottom: 0.001rem solid #e8e8e8;
  }
}
</style>
