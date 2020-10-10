<template>
  <div class="ArticleViewBasic">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='任务详情'">
      <ul class="mission_details">
        <li>
          客户：北京卓越科技有限公司
          <img src="../../assets/WorkBench/location.svg" alt />
          <a href>客户信息</a>
        </li>
        <li>任务类型：上门</li>
        <li>
          营销产品：企业贷(来自产品推荐)
          <a href>产品信息</a>
        </li>
        <li>截止时间：2020-08-30日前</li>
        <li>客户地址：</li>
        <li>
          联系人及联系方式：
          <img class="telephone" src="../../assets/WorkBench/telephone.svg" alt />
        </li>
      </ul>
      <div>
        <p>营销记录</p>
        <ul
          v-for="(thisItem,index) in marketing_record"
          :key="index"
          @click="$router.push('/ContentManage/MarketingRecord/'+thisItem.id+'?title=营销记录')"
        >
          <li class="marketing_record">
            <p class="marketing_record_date">{{thisItem.date}}</p>
            <p class="marketing_record_name">{{thisItem.name}}</p>
            <!-- <img src="./arrow_right.svg" alt /> -->
            <van-icon name="arrow" />
          </li>
        </ul>
      </div>
      <div
        style="margin-left:85%;position: fixed !important;float: right;z-index: 9999;align-items: right;bottom: 50px;right:5%"
      >
        <span class="add_record" @click="$router.push('/ContentManage/PutRecord/?title=建档')">添加记录</span>
      </div>
    </div>
    <div v-if="typeCN=='营销客户详情'">
      <ul class="mission_details">
        <li>
          客户：李三
          <img src="../../assets/WorkBench/location.svg" alt />
          <a href>客户信息</a>
        </li>
        <li>
          营销产品：月生利
          <a href>产品信息</a>
        </li>
        <li>截止时间：2020-08-30日前</li>
        <li>客户地址：</li>
        <li>
          联系人及联系方式：
          <img class="telephone" src="../../assets/WorkBench/telephone.svg" alt />
        </li>
        <li>意向：强</li>
      </ul>
      <div>
        <p>营销记录</p>
        <ul
          v-for="(thisItem,index) in marketing_record"
          :key="index"
          @click="$router.push('/ContentManage/MarketingRecord/'+thisItem.id+'?title=营销记录')"
        >
          <li class="marketing_record">
            <p class="marketing_record_date">{{thisItem.date}}</p>
            <p class="marketing_record_name">{{thisItem.name}}</p>
            <!-- <img src="./arrow_right.svg" alt /> -->
            <van-icon name="arrow" />
          </li>
        </ul>
      </div>
      <div
        style="margin-left:85%;position: fixed !important;float: right;z-index: 9999;align-items: right;bottom: 50px;right:5%"
      >
        <span class="add_record" @click="$router.push('/ContentManage/PutRecord/?title=建档')">添加记录</span>
        <!-- <img class="playAudioImg" id="playAudio"
             style="height: 45px;width: 45px; margin-right: 5px;"
        @click = "audioPlay()" src="../../../static/images/pause.png"/>-->
      </div>
    </div>
    <div v-if="typeCN=='客户视图'">
      <div class="customer_view">
        <div class="sanjiaoxing">
          <p class="customer_view_name">
            张岩
            <img src="../../assets/WorkBench/sex.svg" alt />
            <router-link tag="span" :to="{ name: 'CustomerView', query: { title: '客户视图' }}">
              <img src="../../assets/WorkBench/folder.svg" alt />
            </router-link>
            <!-- <img
              src="../../assets/WorkBench/folder.svg"
              alt
              @click="$router.push('/ContentManage/CustomerView/?title=客户视图')"
            />-->
          </p>
        </div>
        <p class="customer_view_num">30</p>
        <p class="customer_view_customer">铂金客户</p>
      </div>
      <ul class="mission_details" style="padding:1rem 1rem 0rem 1rem">
        <li>
          <span class="left_title">客户星级：</span>
          <p class="schedule_star">
            <van-rate
              v-model="start_txt"
              :size="18"
              color="#0078D7"
              void-icon="star"
              void-color="#eee"
              readonly
            />
          </p>
        </li>
        <li>
          <span class="left_title">客户编号：</span>
          <span class="right_txt">0212298745</span>
        </li>
        <li>
          <span class="left_title">身份证号：</span>
          <span class="right_txt">110242199702125858</span>
        </li>
        <li>
          <span class="left_title">
            年
            <span style="display:inline-block;width:32px"></span>龄：
          </span>
          <span class="right_txt">24</span>
        </li>
        <li>
          <span class="left_title">
            手
            <span style="display:inline-block;width:8px"></span>机
            <span style="display:inline-block;width:8px"></span>号：
          </span>
          <span class="right_txt">15840991076</span>
        </li>
        <li>
          <span class="left_title">所属机构：</span>
          <span class="right_txt">110242199702125858</span>
        </li>
        <li>
          <span class="left_title">客户群体：</span>
          <!-- 持续时间 -->
          <!-- <div style="width: 60%;display: inline-block;">
            <van-field
              readonly
              clickable
              :value="value"
              placeholder="小微企业主"
              @click="showPicker = true"
              style="padding:0rem 0rem 0rem 1.5rem"
            />
            <van-popup v-model="showPicker" round position="bottom">
              <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
              />
            </van-popup>
          </div>-->
          <!-- <input class="multiple_choice" type="text" placeholder="小微企业主" :value="inpuVal" />
          <img style="vertical-align: middle;" src="../../assets/WorkBench/pencel.svg" alt @click="multiple_choice_ok()" />
          <div v-if="check_content" class="multiple_choice_contant" style>
            <von-checkbox :options="topics" v-model="chosenTopics" theme="positive"></von-checkbox>
            <div class="save">
              <button @click="multiple_choice_no()">保存</button>
            </div>
          </div>-->
          <van-field
            readonly
            clickable
            name="area"
            :value="regional_grid_txt"
            placeholder="点击选择"
            @click="regional_grid = true"
          />
          <van-popup v-model="regional_grid" position="bottom">
            <van-picker
              show-toolbar
              :columns="regional_grid_list"
              @confirm="onRegional_grid"
              @cancel="regional_grid = false"
            />
          </van-popup>
        </li>
      </ul>
      <div class="tabTitle" style="border-top:0px;padding-top:0rem">
        <ul
          class="tabList"
          style="display:flex;height:2rem;width:100%;line-height:2rem;background:#fff;border"
        >
          <li
            style="width:150px;margin-left:0px;text-align:center;"
            @click="tab(0)"
            :class="tabId==0?'cur':'ordinary'"
          >存货</li>
          <li
            style="width:150px;text-align:center;"
            @click="tab(1)"
            :class="tabId==1?'cur':'ordinary'"
          >渠道</li>
          <li
            style="width:150px;text-align:center;"
            @click="tab(2)"
            :class="tabId==2?'cur':'ordinary'"
          >产品</li>
          <li
            style="width:150px;text-align:center;"
            @click="tab(3)"
            :class="tabId==3?'cur':'ordinary'"
          >卡</li>
          <li
            style="width:150px;text-align:center;"
            @click="tab(4)"
            :class="tabId==4?'cur':'ordinary'"
          >推荐</li>
        </ul>
        <div v-show="tabId===0">
          <div class="stock" v-for="(thisItem,index) in stock" :key="index">
            <p>{{thisItem.menoy_name}}</p>
            <p>{{thisItem.menoy}}</p>
          </div>
        </div>
        <div v-show="tabId===1">
          <div class="stock" v-for="(thisItem,index) in channel" :key="index">
            <p>{{thisItem.menoy_name}}</p>
            <p>{{thisItem.menoy}}</p>
          </div>
        </div>
        <div v-show="tabId===2">
          <div class="stock" v-for="(thisItem,index) in product" :key="index">
            <p>{{thisItem.menoy_name}}</p>
            <p>{{thisItem.menoy}}</p>
          </div>
        </div>
        <div v-show="tabId===3">
          <div class="stock" v-for="(thisItem,index) in card" :key="index">
            <p>{{thisItem.menoy_name}}</p>
            <p>{{thisItem.menoy}}</p>
          </div>
        </div>
        <div v-show="tabId===4">
          <div class="stock stock_have" v-for="(thisItem,index) in recommend" :key="index">
            <p>{{thisItem.id}}</p>
            <p>{{thisItem.menoy_name}}</p>
            <p>{{thisItem.menoy}}</p>
          </div>
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
      typeCN: "",
      check_content: false,
      // chosenTopics: [],
      inpuVal: "",
      // topics: ["小微企业主", "大企业主", "个体", "农户", "工薪阶层"],
      regional_grid_txt: "",
      regional_grid_list: [
        {
          values: [" ", "小微企业主"],
          defaultIndex: 2,
        },
        {
          values: [" ", "个体"],
          defaultIndex: 3,
        },
        {
          values: [" ", "大企业主"],
          defaultIndex: 1,
        },
        {
          values: [" ", "农户"],
          defaultIndex: 4,
        },
        {
          values: [" ", "工薪阶层"],
          defaultIndex: 5,
        },
      ],
      regional_grid: false,
      value: "",
      start_txt: 1,
      showPicker: false,
      columns: [
        {
          text: "小微企业主",
          children: [
            {
              text: "微企业主",
              children: [{ text: "个人" }, { text: "融资" }],
            },
            {
              text: "小企业主",
              children: [{ text: "融资" }, { text: "个人" }],
            },
          ],
        },
        {
          text: "中大企业主",
          children: [
            {
              text: "中企业主",
              children: [{ text: "个人" }, { text: "融资" }],
            },
            {
              text: "大企业主",
              children: [{ text: "融资" }, { text: "个人" }],
            },
          ],
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
  // watch: {
  //   chosenTopics(val) {
  //     console.log(val);
  //     let inputArr=[]
  //     val.forEach(index => {
  //       inputArr.push(this.topics[index])
  //     });
  //     this.inpuVal=inputArr.join('、')
  //   },
  // },
  methods: {
    onRegional_grid(value) {
      this.regional_grid_txt = value;
      this.regional_grid = false;
    },
    multiple_choice_ok() {
      this.check_content = true;
    },
    multiple_choice_no() {
      this.check_content = false;
    },
    tab(ev) {
      this.tabId = ev;
      // localStorage.setItem("indexTabId", this.tabId);
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
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
  },
  beforeDestroy() {
    cancel();
  },
};
</script>
<style scoped>
.ArticleViewBasic {
  padding-top: 46px;
  background-color: #f5f5f5;
}
* {
  font-size: 14px;
}
.save {
  text-align: center;
  padding-bottom: 50px;
}
/* .save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 6rem;
  height: 2rem;
  border-radius: 0.3rem;
} */
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
  margin: 0rem 0rem 0rem 0.2rem;
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
/* .mission_details li span {
  margin-left: 1.5rem;
} */
.left_title {
  display: inline-block;
  width: 27%;
}
.right_txt {
  display: inline-block;
  width: 73%;
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
  background-color: #3d425e;
  color: #fff;
}
/* .customer_view {
  background: url("./background.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-bottom: 0.001rem solid #e8e8e8;
} */
.customer_view {
  background: #3d425e;
  height: 10rem;
  border-bottom: 0.001rem solid #e8e8e8 !important;
  position: relative;
}
.customer_view .sanjiaoxing {
  position: absolute;
  bottom: 0.03rem;
  left: 0rem;
  width: 0;
  height: 0;
  border: 40px solid transparent;
  border-width: 4rem 50vw;
  border-bottom-color: #fff;
}
.customer_view_num {
  font-size: 2rem;
  color: #ecd14a;
  text-align: center;
  font-weight: 600;
  padding-top: 1rem;
  margin: 0;
}
.customer_view_customer {
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
  font-weight: 600;
  margin-top: 1rem;
}
.customer_view_name {
  font-size: 1.1rem;
  text-align: center;
  font-weight: 550;
  width: 50vw;
  margin-top: 4.5rem;
  padding-bottom: 0.5rem;
  position: absolute;
  top: -2.5rem;
  left: -5.5rem;
  z-index: 4;
}
.customer_view_name img {
  width: 1.3rem;
  vertical-align: middle;
}
.mission_details .schedule_star {
  display: inline-block;
  margin: 0;
}
.mission_details .schedule_star img {
  width: 1.2rem;
  margin: 0rem;
}
.cur {
  color: #df0f0f;
  position: relative;
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
.multiple_choice {
  display: inline-block;
  border: 0.01rem solid #e8e8e8;
  margin-left: 0;
  padding-left: 0.5rem;
  width: 53%;
}
.multiple_choice_contant {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: #fff;
  top: 0rem;
  left: 0rem;
  z-index: 100000000000;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
}
</style>
