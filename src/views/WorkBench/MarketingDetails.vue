<template>
  <div class="MarketingDetails">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='营销客户详情'">
      <p class="detail_title">客户信息</p>
      <ul class="mission_details" v-for="(thisItem,index) in tiaozhuan" :key="index">
        <li>
          <span style="font-weight:600;">客&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：</span>
          李三
          <router-link
            tag="a"
            class="img1"
            :to="{ name: 'ArticleViewBasic', query: { title: '客户视图' }}"
          ></router-link>
        </li>
        <li>
          <span style="font-weight:600;">营销产品：</span>月生利
          <router-link tag="a" class="img2" :to="{ name: 'ProductIntroduction', query: { title: '产品介绍' }}"></router-link>
        </li>
        <li>
          <span style="font-weight:600;">客户地址：</span>周口市某某区某某南路4号
          <router-link tag="a" class="img3" :to="{ name: 'PutRecord', query: { title: '地址' }}"></router-link>
        </li>
        <li>
          <span style="font-weight:600;">联系方式：</span>18611278765
          <a class="img4" :href="'tel:' + 18611278765"></a>
        </li>
        <li>
          <span style="font-weight:600;">意&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向：</span>强
        </li>
      </ul>
      <div>
        <p class="detail_title">营销记录</p>
        <router-link
          tag="ul"
          style="background:#fff;"
          :to="{ name: 'EditMarketingRecord', query: { title: '营销记录' }}"
        >
          <li v-for="(thisItem,index) in MarketingRecord" :key="index" class="marked_record">
            <p style="width:30%">{{thisItem.date}}</p>
            <p style="width:70%;display:flex" class="approval">
              <span class="approval_Passed">{{thisItem.value1}}</span>
              <span
                :class="thisItem.value2=='强'?'approval_Passed':'approval_Passed1'"
              >{{thisItem.value2}}</span>
              <span
                :class="thisItem.value3=='成功'?'approval_Passed':'approval_Passed1'"
              >{{thisItem.value3}}</span>
            </p>
            <p class="schedule_star" style="width:100%">{{thisItem.text}}</p>
          </li>
        </router-link>
        <div class="end_line">已加载完毕</div>
      </div>
      <div
        style="margin-left:85%;position: fixed !important;float: right;z-index: 9999;align-items: right;bottom: 5%;right:5%"
      >
        <router-link
          tag="span"
          class="add_record"
          :to="{ name: 'AddMarketingRecord', query: { title: '添加营销客户' }}"
        >添加记录</router-link>
        <!-- <span
          class="add_record"
          @click="$router.push('/ContentManage/AddMarketingRecord/?title=添加营销客户')"
        >添加记录</span>-->
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  data() {
    return {
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
      tabId: 0,
      token: "",
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
      tiaozhuan: [
        {
          id: 1,
        },
      ],
      stock: [
        {
          menoy_name: "存款余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "活期存款余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "定期存款余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "大额存单余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "贷款余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "历史贷款类型",
          menoy: "抵押贷",
        },
        {
          menoy_name: "最近放贷时间",
          menoy: "2020-01-01",
        },
        {
          menoy_name: "存贷比",
          menoy: "50%",
        },
      ],
      channel: [
        {
          menoy_name: "签约情况",
          menoy: "吴",
        },
        {
          menoy_name: "最近一次柜面交易时间",
          menoy: "2020-01-01",
        },
        {
          menoy_name: "最近一次柜面交易机构",
          menoy: "总行营业部",
        },
        {
          menoy_name: "手机银行使用状态",
          menoy: "近6个月无交易",
        },
        {
          menoy_name: "年累计手机银行交易额",
          menoy: "0",
        },
        {
          menoy_name: "年累计手机银行交易笔数",
          menoy: "0",
        },
        {
          menoy_name: "网上银行使用状态",
          menoy: "近6个月无交易",
        },
      ],
      product: [
        {
          menoy_name: "历史购买",
          menoy: "500,000.00",
        },
        {
          menoy_name: "理财余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "基金余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "黄金余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "年累计保险金额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "贵金属",
          menoy: "500,000.00",
        },
        {
          menoy_name: "水费年累计金额",
          menoy: "1,000.00",
        },
        {
          menoy_name: "电费年累计金额",
          menoy: "2,000.00%",
        },
        {
          menoy_name: "ETC年累计金额",
          menoy: "3,000.00",
        },
      ],
      card: [
        {
          menoy_name: "签约情况",
          menoy: "无",
        },
        {
          menoy_name: "贷记卡激活主卡数",
          menoy: "0",
        },
        {
          menoy_name: "借记卡有效卡数",
          menoy: "0",
        },
        {
          menoy_name: "市民卡激活卡数",
          menoy: "0",
        },
      ],
      recommend: [
        {
          id: 1,
          menoy_name: "存款",
          menoy: "定期存款",
        },
        {
          id: 2,
          menoy_name: "贷款",
          menoy: "企业经营贷",
        },
        {
          id: 3,
          menoy_name: "理财",
          menoy: "周周赢",
        },
        {
          id: 4,
          menoy_name: "大额存单",
          menoy: "大额存单",
        },
        {
          id: 5,
          menoy_name: "支付工具",
          menoy: "支付宝",
        },
        {
          id: 6,
          menoy_name: "手机银行",
          menoy: "手机银行",
        },
      ],
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
    // if (this.articleId == "url") {
    //   this.dataURL =
    //     this.$route.query.url +
    //     (this.$route.query.url.indexOf() == -1 ? "?_s=1" : "") +
    //     "&token=" +
    //     this.token;
    // } else {
    //   this.dataURL =
    //     "/lgbsmp/api/v1/generalContent/" +
    //     this.articleId +
    //     "?token=" +
    //     this.token;
    // }
    // this.getData();
    // if (this.allowControl("APP_/ContentManage/ArticleList4Notice/branch")) {
    //   this.isEdit = true;
    // }
  },
  updated() {
    // this.$seeks.getImgTab();
    // this.$previewRefresh();
  },
  methods: {
    // allowControl(str) {
    //   return this.$seeks.allowControl(str);
    // },
    // getData() {
    //   if (!this.articleId) {
    //     $loading.hide();
    //     return;
    //   }
    //   if (this.title == "要闻时政详情") {
    //     this.$axios
    //       .post(
    //         "/zzbgxjhpt/gxjh/default.do?method=xwxq&cipherText=3CUnPiZoBpOvavNsrGbvHQ==&guid=" +
    //           this.articleId
    //       )
    //       .then((res) => {
    //         if (res) {
    //           this.tpxw = res.xwxq;
    //           $loading.hide();
    //         }
    //       })
    //       .catch(function (msg) {
    //         $loading.hide();
    //       });
    //   } else {
    //     this.$axios
    //       .get(this.dataURL)
    //       .then((responseData) => {
    //         if (responseData) {
    //           var res =
    //             responseData.id == undefined ? responseData.data : responseData;
    //           this.deliverTime = res.deliverTime || res.gmtCreate;
    //           this.deliverTime = moment(this.deliverTime).format("YYYY-MM-DD");
    //           this.deliverDepartment = res.deliverDepartment;
    //           this.deliverPerson = res.deliverPerson;
    //           this.content = res["content"];
    //           // console.log(this.content);
    //           this.textTitle = res["subject"] || res["title"] || "--";
    //           if (res["pictureId"]) {
    //             this.pictureId =
    //               "/lgbsmp/api/v1/attachment/download?id=" + res["pictureId"];
    //           }
    //         }
    //         $loading.hide();
    //       })
    //       .catch(function (msg) {
    //         $loading.hide();
    //       });
    //   }
    // },
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
    openValue4() {
      this.show4 = !this.show4;
    },
    openValue5() {
      this.show5 = !this.show5;
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
    getvalue4(index, item) {
      this.value4 = item.name;
      this.show4 = false;
    },
    getvalue5(index, item) {
      this.value5 = item.name;
      this.show5 = false;
    },
  },
};
</script>
<style scoped>
.MarketingDetails {
  padding-top: 46px;
}
.end_line {
  margin: 1rem;
  text-align: center;
  color: #c1b9b9;
  font-size: 1rem;
}
.detail_title {
  padding: 0.3rem;
  font-size: 0.9rem;
  font-weight: 550;
  margin: 0;
  background: #f5f5f5;
}
.marked_record {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.marked_record p {
  margin: 3px 0px;
}
.approval {
  position: relative;
}
.approval .approval_Passed {
  display: inline-block;
  line-height: 2rem;
  text-align: center;
  width: 4.5rem;
  height: 2rem;
  font-size: 1rem;
  border: 1px solid #3cc8ab;
  color: #3cc8ab;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}
.approval .approval_Passed1 {
  display: inline-block;
  line-height: 2rem;
  text-align: center;
  width: 4.5rem;
  height: 2rem;
  font-size: 1rem;
  border: 1px solid #c1b9b9;
  color: #c1b9b9;
  margin-left: 0.5rem;
  font-size: 0.8rem;
}
.cell_dashed {
  border-bottom: 0.001rem dashed #e8e8e8;
  height: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
.mission_details {
  background: #fff;
  padding-top: 0.5rem;
  position: relative;
}
.mission_details li {
  margin-bottom: 0.7rem;
  padding-left: 0.5rem;
}
.mission_details li img {
  width: 1.4rem;
  vertical-align: bottom;
  margin: 0rem 0rem 0rem 2rem;
}
.mission_details li a {
  text-decoration: none;
  /* float: right; */
  position: absolute;
  right: 0rem;
  top: 0.5rem;
  background: url("../../assets/WorkBench/img1.svg") no-repeat;
  background-size: cover;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
}
.mission_details li .img2 {
  position: absolute;
  right: 0rem;
  top: 2.3rem;
  background: url("../../assets/WorkBench/img2.svg") no-repeat;
  background-size: cover;
}
.mission_details li .img3 {
  position: absolute;
  right: 0rem;
  top: 4.1rem;
  background: url("../../assets/WorkBench/img3.svg") no-repeat;
  background-size: cover;
}
.mission_details li .img4 {
  position: absolute;
  right: 0rem;
  top: 5.9rem;
  background: url("../../assets/WorkBench/img4.svg") no-repeat;
  background-size: cover;
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
.add_record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  /* font-size: 1.3rem; */
  border-radius: 100%;
  background-color: #3d425e;
  color: #fff;
}

.mission_details .schedule_star {
  display: inline-block;
  margin: 0rem 0rem 0rem 1.6rem;
}
.mission_details .schedule_star img {
  width: 1.2rem;
  margin: 0rem;
}
.cur {
  color: #df0f0f;
  position: relative;
}
.cur::after {
  position: absolute;
  top: 80%;
  content: "";
  left: 0%;
  width: 97%;
  height: 0.05rem;
  background: #df0f0f;
}
.stock {
  padding: 0rem 1rem;
  background: #fff;
  display: flex;
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
.result_list {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  flex-wrap: wrap;
}
.result_list dt {
  width: 20%;
  font-weight: 500;
  font-size: 1rem;
  line-height: 2rem;
}
.result_list dd {
  width: 80%;
}
.result_list dd select {
  width: 100%;
  height: 2rem;
  border: 0.05rem solid #bbb;
  border-radius: 0.4rem;
}
.save {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0rem;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  width: 5rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #fff;
  border-radius: 0.3rem;
}
.competitor li {
  display: flex;
}
.competitor li p {
  width: 25%;
  line-height: 2rem;
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
  .end_line {
    font-size: 0.7rem;
  }
  .add_record {
    width: 3.5rem;
    height: 3.5rem;
  }
  .mission_details li a,
  .mission_details li p {
    width: 1.3rem;
    height: 1.3rem;
  }
  .mission_details li {
    margin-bottom: 0.5rem;
  }
}
</style>
