<template>
  <div class="MissionDetails">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='任务详情'" class="tabTitle">
      <ul class="tabList">
        <li @click="tab(0)" :class="tabId==0?'cur':''">任务信息</li>
        <li @click="tab(1)" :class="tabId==1?'cur':''">营销客户</li>
      </ul>
      <div v-show="tabId===0">
        <ul class="mission_details">
          <div class="task_management">产品营销</div>
          <li>
            <span style="font-weight:600">任务名称：</span>
            特色存款营销-张男
          </li>
          <li>
            <span style="font-weight:600">创建日期：</span>
            2020-07-08
          </li>
          <li>
            <span style="font-weight:600">任务网格：</span>
            城关镇世纪广场
          </li>
          <li>
            <span style="font-weight:600">营销产品：</span>月生利
          </li>
          <li>
            <span style="font-weight:600">截止日期：</span>2020-09-30
          </li>
          <li>
            <span style="font-weight:600">
              目
              <span style="display:inline-block;width:1.5rem"></span>标：
            </span>200,000.00
          </li>
          <li>
            <span style="font-weight:600">
              完
              <span style="display:inline-block;width:0.4rem"></span>成
              <span style="display:inline-block;width:0.4rem"></span>度：
            </span>
            <span style="color:#3CC8AB">160,000.00</span>
            <div class="progress">
              <div class="progress-done" data-done="80">80%</div>
            </div>
          </li>
        </ul>
        <baidu-map class="bm-view" :center="{lng:114.65, lat: 33.37}" :zoom="11" ak="YOUR_APP_KEY">
          <bm-polygon
            :path="polylinePath"
            stroke-color="#DF0F0F"
            strokeStyle="dashed"
            fillColor="transparent"
            :stroke-opacity="1"
            :stroke-weight="1"
            @lineupdate="updatePolylinePath"
          ></bm-polygon>
          <bm-label
            content="1"
            :position="{lng: 114.725, lat: 33.415}"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'1.1rem',height:'1.1rem',lineHeight: '1.1rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            content="20"
            :position="{lng: 114.67, lat: 33.385 }"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'2.3rem',height:'2.3rem',lineHeight: '2.3rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            content="3"
            :position="{lng: 114.675, lat: 33.345 }"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'1.5rem',height:'1.5rem',lineHeight: '1.5rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            content="30"
            :position="{lng: 114.51, lat: 33.39 }"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'2.5rem',height:'2.5rem',lineHeight: '2.5rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            content="5"
            :position="{lng: 114.645, lat: 33.475 }"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'1.5rem',height:'1.5rem',lineHeight: '1.5rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            content="6"
            :position="{lng: 114.72, lat: 33.49}"
            :labelStyle="{color: '#fff',background:'#D33E42', fontSize : '1rem',width:'1.5rem',height:'1.5rem',lineHeight: '1.5rem',textAlign: 'center',borderRadius:'100%'}"
            title="Hover me"
          />
          <bm-label
            content="城关镇世纪广场"
            :position="{lng: 114.565, lat: 33.4}"
            :labelStyle="{color: 'red', fontSize : '0.9rem',width:'4rem',height:'2rem',lineHeight: '2rem',textAlign: 'center',background: 'transparent',border:'none'}"
            title="Hover me"
          />
        </baidu-map>
      </div>
      <div v-show="tabId===1">
        <van-dropdown-menu>
          <van-dropdown-item v-model="marketed" :options="marketed_option" />
          <van-dropdown-item v-model="intention" :options="intention_option" />
          <van-dropdown-item v-model="marketing" :options="marketing_option" />
        </van-dropdown-menu>
        <van-search v-model="value" placeholder="客户编号，客户名称" />
        <div class="customer_list">
          <router-link tag="ul" :to="{ name: 'MarketingDetails', query: { title: '营销客户详情' }}">
            <li v-for="(thisItem,index) in MarketingRecord" :key="index">
              <p style="font-weight:600;width:30%;font-size:0.9rem">{{thisItem.name}}</p>
              <p style="width:70%;display:flex" class="approval">
                <span class="approval_Passed">{{thisItem.value1}}</span>
                <span
                  :class="thisItem.value2=='强'?'approval_Passed':'approval_Passed1'"
                >{{thisItem.value2}}</span>
                <span
                  :class="thisItem.value3=='成功'?'approval_Passed':'approval_Passed1'"
                >{{thisItem.value3}}</span>
              </p>
              <p class="schedule_star" style="width:80%">{{thisItem.text}}</p>
              <p class="schedule_star" style="width:20%">{{thisItem.date}}</p>
            </li>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
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
      token: "",
      tabId: 0,
      title: "详情",
      textTitle: "--",
      content: "",
      deliverTime: "",
      deliverDepartment: "",
      deliverPerson: "",
      articleId: "",
      isPlaying: false,
      dataURL: "",
      pictureId: undefined,
      isLGB: true,
      tpxw: {},
      isEdit: false,
      polylinePath: [
        { lng: 114.75, lat: 33.41 },
        { lng: 114.72, lat: 33.38 },
        { lng: 114.69, lat: 33.32 },
        { lng: 114.5, lat: 33.365 },
        { lng: 114.65, lat: 33.47 },
        { lng: 114.75, lat: 33.5 },
      ],
      MarketingRecord: [
        {
          id: 1,
          name: "李三",
          text: "暂时没有对该产品的需求，但需要贷款......",
          date: " 3天前",
          value1: "已营销",
          value2: "无需求",
          value3: "未成功",
        },
        {
          id: 2,
          name: "张红",
          text: "没问题，周一来行里办理",
          date: "  4天前",
          value1: "已营销",
          value2: "强",
          value3: "成功",
        },
      ],
      marketing_record: [
        {
          id: 1,

          name: "上门拜访，与负责领导洽谈一些事项",
          date: "刚刚",
        },
        {
          id: 2,
          name: "客户出差，电话沟通，等待电话沟通",
          date: "2020-08-12 9:00",
        },
        {
          id: 3,
          name: "上门拜访，初步达成意向想去上门拜访",
          date: "2020-08-10 16:00",
        },
      ],
      marketed: 0,
      intention: "a",
      marketing: "A",
      marketed_option: [
        { text: "已营销", value: 0 },
        { text: "未营销", value: 1 },
      ],
      intention_option: [
        { text: "客户意向", value: "a" },
        { text: "强", value: "b" },
        { text: "一般", value: "c" },
        { text: "无", value: "d" },
      ],
      marketing_option: [
        { text: "营销成功", value: "A" },
        { text: "尚未成功", value: "B" },
      ],
      show1: false,
      show2: false,
      show3: false,
      value1: "",
      value2: "",
      value3: "",
    };
  },
  components: {
    ChildNav,
  },
  created() {
    this.typeCN = this.$route.query.title;
    if (localStorage.getItem("indexTabId")) {
      this.tabId = Number(localStorage.getItem("indexTabId"));
      localStorage.removeItem("indexTabId");
    }
    this.token = localStorage.getItem("token");
    this.articleId = this.$route.params.id;
    this.title = this.$route.query.title;
    this.isLGB = localStorage.getItem("isLgbWorker") == "0";
    this.height = 400 * (document.documentElement.clientWidth / 750) + "";
    // $loading.show("拼命加载中..");
    if (this.articleId == "url") {
      this.dataURL =
        this.$route.query.url +
        (this.$route.query.url.indexOf() == -1 ? "?_s=1" : "") +
        "&token=" +
        this.token;
    } else {
      this.dataURL =
        "/lgbsmp/api/v1/generalContent/" +
        this.articleId +
        "?token=" +
        this.token;
    }
    this.getData();
    if (this.allowControl("APP_/ContentManage/ArticleList4Notice/branch")) {
      this.isEdit = true;
    }
  },
  updated() {
    this.$seeks.getImgTab();
    this.$previewRefresh();
  },
  methods: {
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    addPolylinePoint() {
      this.polylinePath.push({ lng: 116.404, lat: 39.915 });
    },
    allowControl(str) {
      return this.$seeks.allowControl(str);
    },
    getData() {
      if (!this.articleId) {
        $loading.hide();
        return;
      }
    },
    tab(ev) {
      this.tabId = ev;
      localStorage.setItem("indexTabId", this.tabId);
    },
    openValue1() {
      this.show1 = !this.show1;
    },
    openValue2() {
      this.show2 = !this.show2;
    },
    openValue3() {
      this.show3 = !this.show3;
    },
    getvalue1(index, item) {
      this.value1 = item.name;
      this.show1 = false;
    },
    getvalue2(index, item) {
      this.value2 = item.name;
      this.show2 = false;
    },
    getvalue3(index, item) {
      this.value3 = item.name;
      this.show3 = false;
    },
    draw({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(114.65, 33.37));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
  },
};
</script>
<style scoped>
.MissionDetails {
  padding-top: 46px;
}
.sample {
  left: 2rem !important;
  top: 2rem !important;
  position: absolute;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
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
.cell_dashed {
  border-bottom: 0.001rem dashed #e8e8e8;
  height: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
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
.marketing_record {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0.5rem 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.marketing_record .marketing_record_date {
  width: 30%;
  margin: 0rem 0rem 0rem 0rem;
}
.marketing_record .marketing_record_name {
  margin: 0rem;
  width: 50%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.marketing_record img {
  float: right;
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
.screen_content {
  display: flex;
  position: relative;
  background: #fff;
}
.screen_content input {
  width: 83%;
  height: 2.5rem;
  margin: 4px;
  line-height: 20px;
  padding: 0rem 1rem 0rem 2.3rem;
  text-align: left;
  border-radius: 2px 2px 2px 2px;
  background-color: #fafafa;
  text-align: center;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(255, 0, 0, 0);
}
.screen_content img {
  position: absolute;
  width: 14px;
  height: 14px;
  top: 40%;
  left: 5%;
  z-index: 100;
  opacity: 0.5;
}
.screen_content input::-webkit-input-placeholder {
  text-align: left;
  font-size: 14px;
}
.screen_content input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  text-align: left;
  font-size: 14px;
}
.screen_content button {
  border: none;
  background: none;
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
/* .approval .approval_Passed {
  position: absolute;
  line-height: 3.6rem;
  text-align: center;
  width: 3.6rem;
  height: 3.6rem;
  border: 1px solid #259b24;
  color: #259b24;
  border-radius: 100%;
  top: -0.7rem;
  font-size: 0.8rem;
  right: 1rem;
  transform: rotate(330deg);
  -ms-transform: rotate(330deg);
  -moz-transform: rotate(330deg);
  -webkit-transform: rotate(330deg);
  -o-transform: rotate(330deg);
} */
.not_select {
  display: flex;
  background: #fff;
}
.not_select .divInput {
  width: 33.3%;
  background: #fff;
}
.not_select .divInput ul {
  width: 33.3%;
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
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  position: relative;
  background-color: #fff;
}
.not_select .divInput .select_sort input {
  border: none;
  outline: none;
  width: 90%;
  height: 30px;
  padding: 0rem 1rem;
  border-radius: 0.3rem;
  margin-top: 5px;
  color: #1a1818;
  border: 1px solid #bbb;
  background-color: #fff;
}
.not_select .divInput .select_sort img {
  position: absolute;
  right: 13%;
  top: 18%;
  width: 13%;
}
.stock {
  padding: 0rem 1rem;
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
  width: 70%;
  text-align: right;
  margin: 0.1rem 0rem;
}
.stock li:nth-child(odd) {
  width: 22%;
  margin-right: 8%;
}
.stock li input,
.stock li select {
  border: 0.05rem solid #bbb;
  height: 2rem;
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
.save {
  display: flex;
  justify-content: center;
  background: #fff;
  padding: 0.5rem 0rem;
}
.save button {
  border: none;
  background: #5677fc;
  width: 5rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #fff;
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
  div {
    font-size: 0.8rem;
  }
  .tabList {
    height: 2.5rem !important;
    line-height: 2.5rem !important;
  }
  .latest_tasks ul li {
    font-size: 0.7rem;
  }
  .latest_tasks ul {
    margin: 0;
  }
  .end_line {
    font-size: 0.8rem;
  }
  .two_select select {
    height: 1.5rem;
  }
  .page.has-tabbar .page-content .right_content {
    padding: 0rem;
  }
  .success_failure .sf_state {
    top: -0.2rem;
    left: 36%;
    width: 4.3rem;
  }
  .success_failure .sf_states {
    width: 3.7rem;
    height: 2.3rem;
  }
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
  .screen_content input {
    height: 2rem;
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
