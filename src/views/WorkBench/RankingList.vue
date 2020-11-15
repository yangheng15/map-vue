<template>
  <div class="RankingList">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '排行榜'">
      <div style="background: #fff">
        <ul
          class="ranking_list"
          style="border-bottom: 1px solid #e8e8e8 !important"
        >
          <li @click="tab1(1)" :class="tabId == 1 ? 'cur' : ''">本月</li>
          <li @click="tab1(2)" :class="tabId == 2 ? 'cur' : ''">本季度</li>
          <li @click="tab1(3)" :class="tabId == 3 ? 'cur' : ''">本年度</li>
          <li @click="tab1(4)" :class="tabId == 4 ? 'cur' : ''">上半年</li>
          <li @click="tab1(5)" :class="tabId == 5 ? 'cur' : ''">下半年</li>
        </ul>
        <ul
          class="ranking_list1"
          style="border-bottom: 1px solid #e8e8e8 !important"
        >
          <li
            v-for="(item, index) in product_option"
            :key="index"
            @click="tab2(item.value)"
            :class="tabId1 == item.value ? 'cur' : ''"
          >
            {{ item.text }}
          </li>
          <!-- <li @click="tab2(5)" :class="tabId1==5?'cur':''">存款</li>
          <li @click="tab2(6)" :class="tabId1==6?'cur':''">贷款</li>
          <li @click="tab2(7)" :class="tabId1==7?'cur':''">理财</li>
          <li @click="tab2(8)" :class="tabId1==8?'cur':''">手机银行</li>
          <li @click="tab2(9)" :class="tabId1==9?'cur':''">网银</li>
          <li @click="tab2(10)" :class="tabId1==10?'cur':''">ETC</li> -->
        </ul>
        <ul
          class="ranking_list"
          style="
            justify-content: start;
            border-bottom: 1px solid #e8e8e8 !important
            margin: 0px;
          "
        >
          <li
            @click="tab2(custNum)"
            :class="tabId1 == custNum ? 'cur' : ''"
            style="margin-right: 20px"
          >
            拜访客户数
          </li>
          <li
            @click="tab2(taskNum)"
            :class="tabId1 == taskNum ? 'cur' : ''"
            style="margin-right: 20px"
          >
            执行任务数
          </li>
        </ul>
        <dl class="ranking_list_body">
          <dt>
            <ul>
              <li>排名</li>
              <li>人员</li>
              <li>成果</li>
            </ul>
          </dt>
          <dd style="margin-left: 0px">
            <ul
              v-for="(item, index) in achievements_list"
              :key="index"
              style="margin-top: 15px"
            >
              <li>
                <p
                  :class="
                    index + 1 == 1
                      ? 'imgTxt1'
                      : index + 1 == 2
                      ? 'imgTxt2'
                      : index + 1 == 3
                      ? 'imgTxt3'
                      : 'imgTxt'
                  "
                >
                  {{ index + 1 }}
                </p>
              </li>
              <li>{{ item.realName }}</li>
              <li>{{ item.marketAmount | NumFormat }}</li>
            </ul>
          </dd>
        </dl>
        <div>
          <!-- <p style="text-align: center">前5名业绩占比分析</p> -->
          <div id="main" style="width: 100%; height: 200px"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import { option } from "./gauge-option";
export default {
  name: "RankingList",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      tabId: 2,
      tabId1: "三方存管",
      achievements_list: [],
      product_option: "",
      marketAmount: "",
      custNum: "custNum",
      taskNum: "taskNum",
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.getDic();
    this.getTask();
  },
  methods: {
    getDic() {
      this.$httpGet({
        url: "/dic/type/dic_product_type",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ value: it.code, text: it.codeText });
          }
        });
        this.product_option = transformDara;
      });
    },
    tab1(ev) {
      this.tabId = ev;
      if (ev === 0) {
        this.text = "本月";
      } else if (ev === 1) {
        this.text = "本季度";
      } else if (ev === 2) {
        this.text = "本年度";
      } else if (ev === 3) {
        this.text = "上半年";
      } else {
        this.text = "下半年";
      }
      this.getTaskText(ev);
    },
    getTaskText(ele) {
      this.$httpGet({
        url: "/api/rankingList/dateType",
        params: {
          productType: this.tabId1,
          dateType: ele,
        },
      }).then((res) => {
        this.achievements_list = res.data;
        this.achievements_list.forEach((el) => {
          this.marketAmount = parseFloat(el.marketAmount);
        });
        this.achievements_list.marketAmount = this.marketAmount;
      });
    },
    tab2(ev) {
      console.log(ev);
      this.tabId1 = ev;
      if (ev === this.tabId1) {
        if (ev == this.taskNum || ev == this.custNum) {
          this.$httpGet({
            url: "/api/rankingList/otherType",
            params: {
              productType: this.tabId1,
              dateType: this.tabId,
            },
          }).then((res) => {
            this.achievements_list = res.data;
            this.achievements_list.forEach((el) => {
              this.marketAmount = parseFloat(el.marketAmount);
            });
          });
        } else {
          this.$httpGet({
            url: "/api/rankingList/dateType",
            params: {
              productType: this.tabId1,
              dateType: this.tabId,
            },
          }).then((res) => {
            this.achievements_list = res.data;
            this.achievements_list.forEach((el) => {
              this.marketAmount = parseFloat(el.marketAmount);
            });
          });
        }
      }
    },
    getTask() {
      this.$httpGet({
        url: "/api/rankingList/dateType",
        params: {
          productType: "三方存管",
          dateType: 1,
        },
      }).then((res) => {
        this.achievements_list = res.data;
        this.achievements_list.forEach((el) => {
          this.marketAmount = parseFloat(el.marketAmount);
        });
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.imgTxt {
  height: 26px;
  line-height: 22px;
  width: 30px;
  text-align: center;
  margin: 0;
}
.imgTxt1 {
  background: url("../../assets/WorkBench/one.svg") no-repeat;
  height: 26px;
  line-height: 22px;
  width: 30px;
  text-align: center;
  margin: 0;
}
.imgTxt2 {
  background: url("../../assets/WorkBench/two.svg") no-repeat;
  height: 26px;
  line-height: 22px;
  width: 30px;
  text-align: center;
  margin: 0;
}
.imgTxt3 {
  background: url("../../assets/WorkBench/three.svg") no-repeat;
  height: 26px;
  line-height: 22px;
  width: 30px;
  text-align: center;
  margin: 0;
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
.RankingList {
  padding-top: 46px;
}
.cur {
  color: #df0f0f;
  position: relative;
}
.ranking_list {
  display: flex;
  height: 40px;
  width: 100%;
  line-height: 40px;
  justify-content: space-between;
  width: calc(100% - 30px);
  margin: 0px 15px;
  border-bottom: 1px solid #e8e8e8 !important;
}
.ranking_list1 {
  display: flex;
  /* height: 30px; */
  width: 100%;
  line-height: 30px;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: calc(100% - 30px);
  /* background: #ededed; */
  margin: 0px 15px;
  border-bottom: 1px solid #e8e8e8 !important;
}
.ranking_list li {
  margin: 0px 5px;
}
.ranking_list1 li {
  margin: 0px 5px;
}
.ranking_list_body {
  padding: 15px;
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
@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
}
</style>
