<template>
  <div class="AddMarketingRecord">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='添加营销客户'">
      <ul class="mission_details">
        <li>
          客户：北京卓越科技有限公司
          <!-- <img src="./location.svg" alt /> -->
        </li>
        <li>方式：上门</li>
        <li>营销产品：企业贷</li>
        <li>执行时间：2020-08-30 9:00</li>
      </ul>
      <div>
        <ul
          class="tabList"
          style="display:flex;justify-content: space-around;align-items: center;height:2.5rem;width:100%;line-height:2rem;font-size: 1rem;background:#f5f5f5!important"
        >
          <li @click="tab(0)" :class="tabId==0?'cur':'ordinary'">结果</li>
          <li @click="tab(1)" :class="tabId==1?'cur':'ordinary'">影像</li>
          <li @click="tab(2)" :class="tabId==2?'cur':'ordinary'">竞争对手</li>
        </ul>
        <div v-show="tabId===0" style="background:#fff;">
          <dl class="result_list">
            <dt>结果</dt>
            <dd>
              <select name id>
                <option value="成功">成功</option>
                <option value="未成功">未成功</option>
                <option value="失败">失败</option>
              </select>
            </dd>
            <dt style="margin-top:0.5rem">客户意向</dt>
            <dd style="margin-top:0.5rem">
              <select name id>
                <option value="强">强</option>
                <option value="一般">一般</option>
                <option value="无">无</option>
                <option value="已有他行产品">已有他行产品</option>
                <option value="其他需求">其他需求</option>
                <option value="直接拒绝">直接拒绝</option>
                <option value="同意采集（资料采集类任务）">同意采集（资料采集类任务）</option>
              </select>
            </dd>
          </dl>
          <div>
            <p style="margin-left:0.5rem;margin-top:0.5rem">实际需求</p>
            <div>
              <textarea
                style="width:calc(100% - 0.7rem);height:3rem;padding:0.6rem;margin: 0rem 0.3rem;border: 0.05rem solid #bbb;"
                name
                id
                cols="30"
                rows="10"
                placeholder="填写客户实际需要的产品名称"
              ></textarea>
            </div>
          </div>
          <div>
            <p style="margin-left:0.5rem;margin-top:0.5rem">备注</p>
            <div>
              <textarea
                style="width:calc(100% - 0.7rem);height:3rem;padding:0.6rem;margin: 0rem 0.3rem;border: 0.05rem solid #bbb;"
                name
                id
                cols="30"
                rows="10"
                placeholder="多行输入"
              ></textarea>
            </div>
          </div>
          <div>
            <p style="margin-left:0.5rem">客户反馈意见</p>
            <div>
              <textarea
                style="width:calc(100% - 0.7rem);height:6rem;padding:0.6rem;margin: 0rem 0.3rem;border: 0.05rem solid #bbb;"
                name
                id
                cols="30"
                rows="10"
                placeholder="多行输入"
              ></textarea>
            </div>
          </div>
        </div>
        <div v-show="tabId===1" style="background:#fff;">
          <div style="margin-top:0.5rem">
            <div>
              <div style="width:100%;height:20rem;padding:0.6rem;background:#fff;display:flex">
                <uploaderAlone
                  ref="actImgeAlone"
                  @uplodCallBack="smallImgUplodCallBack"
                  @deleteImage="deleteSmallImage"
                  isSign="true"
                  :quality="0.7"
                ></uploaderAlone>
                <uploaderAlone
                  ref="actImgeAlone"
                  @uplodCallBack="smallImgUplodCallBack"
                  @deleteImage="deleteSmallImage"
                  isSign="true"
                  :quality="0.7"
                ></uploaderAlone>
                <uploaderAlone
                  ref="actImgeAlone"
                  @uplodCallBack="smallImgUplodCallBack"
                  @deleteImage="deleteSmallImage"
                  isSign="true"
                  :quality="0.7"
                ></uploaderAlone>
              </div>
            </div>
          </div>
        </div>
        <div v-show="tabId===2" style="background:#fff;height:70vh">
          <ul class="competitor">
            <li>
              <p style="margin-left:0.5rem;margin-top:0.5rem">对手名称</p>
              <input
                style="width:calc(100% - 0.7rem);height:2rem;padding:0.6rem;margin:0.5rem 0.3rem;border: 0.05rem solid #bbb;    border-radius: 0.3rem;"
                type="text"
                placeholder="竞争对手名称"
              />
            </li>
            <li>
              <p style="margin-left:0.5rem;margin-top:0.5rem">对手产品</p>
              <input
                style="width:calc(100% - 0.7rem);height:2rem;padding:0.6rem;margin:0.5rem 0.3rem;border: 0.05rem solid #bbb;    border-radius: 0.3rem;"
                type="text"
                placeholder="对手产品"
              />
            </li>
            <li>
              <p style="margin-left:0.5rem;margin-top:0.5rem">产品利率</p>
              <input
                style="width:calc(100% - 0.7rem);height:2rem;padding:0.6rem;margin:0.5rem 0.3rem;border: 0.05rem solid #bbb;    border-radius: 0.3rem;"
                type="text"
                placeholder="产品利率"
              />
            </li>
          </ul>
        </div>
        <div class="save">
          <button @click="prev()">保存</button>
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
    prev() {
      this.$router.go(-1);
    },
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
.AddMarketingRecord {
  padding-top: 46px;
}
textarea {
  border-radius: 0.3rem;
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
.add_record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: blue;
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
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  flex-wrap: wrap;
  margin: 0rem;
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
  /*placeholder样式-开始*/
  textarea::-webkit-input-placeholder {
    font-size: 0.8rem !important;
  }
  textarea::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 0.8rem !important;
  }
  textarea:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: 0.8rem !important;
  }
  textarea:-ms-input-placeholder {
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
    height: 1.7rem;
    line-height: 1.5rem;
  }
  .approval .approval_Passed1 {
    height: 1.7rem;
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
  .result_list {
    padding: 0.5rem;
  }
  .result_list dt {
    font-size: 0.8rem;
  }
  .result_list dd select {
    height: 1.5rem;
  }
}
</style>
