<template>
  <div class="RankingList">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '排行榜'">
      <div style="background: #fff">
        <ul class="ranking_list" style="border-bottom: 1px solid #e8e8e8 !important">
          <li @click="tab1(1)" :class="tabId == 1 ? 'cur' : ''">本月</li>
          <li @click="tab1(2)" :class="tabId == 2 ? 'cur' : ''">本季度</li>
          <li @click="tab1(3)" :class="tabId == 3 ? 'cur' : ''">本年度</li>
          <li @click="tab1(4)" :class="tabId == 4 ? 'cur' : ''">上半年</li>
          <li @click="tab1(5)" :class="tabId == 5 ? 'cur' : ''">下半年</li>
        </ul>
        <ul class="ranking_list1" style="border-bottom: 1px solid #e8e8e8 !important">
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
            @click="tab2(11)"
            :class="tabId1 == 11 ? 'cur' : ''"
            style="margin-right: 20px"
          >
            跑动里程
          </li>
          <li
            @click="tab2(12)"
            :class="tabId1 == 12 ? 'cur' : ''"
            style="margin-right: 20px"
          >
            拜访客户数量
          </li>
          <li
            @click="tab2(13)"
            :class="tabId1 == 13 ? 'cur' : ''"
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
              v-show="
                tabId == item.id || tabId1 == item.id 
              "
            >
              <li>
                <img :src="item.img" alt />
              </li>
              <li>{{ item.name }}</li>
              <li>{{ item.achievements }}</li>
            </ul>
          </dd>
        </dl>
        <div>
          <p style="text-align: center">前5名业绩占比分析</p>
          <div id="main" style="width: 100%; height: 200px"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import con1 from "../../assets/WorkBench/one.png";
import con2 from "../../assets/WorkBench/two.png";
import con3 from "../../assets/WorkBench/three.png";
import con4 from "../../assets/WorkBench/four.png";
import con5 from "../../assets/WorkBench/five.png";
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
      tabId: 1,
      tabId1: "活期存款",
      achievements_list: [
        {
          img: con1,
          name: "张三",
          achievements: "￥19,715.20",
          id: 1,
        },
        {
          img: con2,
          name: "李四",
          achievements: "￥19,715.20",
          id: 4,
        },
        {
          img: con3,
          name: "王五",
          achievements: "￥19,715.20",
          id: 5,
        },
        {
          img: con4,
          name: "赵六",
          achievements: "￥19,715.20",
          id: 2,
        },
        {
          img: con5,
          name: "李东",
          achievements: "￥19,715.20",
          id: 8,
        },
        {
          img: con1,
          name: "赵丽",
          achievements: "￥19,715.20",
          id: 1,
        },
        {
          img: con2,
          name: "钱付",
          achievements: "￥19,715.20",
          id: 4,
        },
        {
          img: con3,
          name: "孙武",
          achievements: "￥19,715.20",
          id: 7,
        },
        {
          img: con4,
          name: "李林",
          achievements: "￥19,715.20",
          id: 10,
        },
        {
          img: con5,
          name: "周高",
          achievements: "￥19,715.20",
          id: 13,
        },
        {
          img: con2,
          name: "吴一",
          achievements: "￥19,715.20",
          id: 4,
        },
        {
          img: con3,
          name: "郑霞",
          achievements: "￥19,715.20",
          id: 7,
        },
        {
          img: con4,
          name: "王侯",
          achievements: "￥19,715.20",
          id: 10,
        },
        {
          img: con5,
          name: "高崎",
          achievements: "￥19,715.20",
          id: 5,
        },
        {
          img: con3,
          name: "郑霞",
          achievements: "￥19,715.20",
          id: 3,
        },
        {
          img: con4,
          name: "王侯",
          achievements: "￥19,715.20",
          id: 3,
        },
        {
          img: con5,
          name: "高崎",
          achievements: "￥19,715.20",
          id: 3,
        },

        {
          img: con4,
          name: "李林",
          achievements: "￥19,715.20",
          id: 10,
        },
        {
          img: con5,
          name: "周高",
          achievements: "￥19,715.20",
          id: 13,
        },
        {
          img: con2,
          name: "吴一",
          achievements: "￥19,715.20",
          id: 3,
        },
        {
          img: con3,
          name: "郑霞",
          achievements: "￥19,715.20",
          id: 0,
        },
        {
          img: con4,
          name: "王侯",
          achievements: "￥19,715.20",
          id: 0,
        },
        {
          img: con5,
          name: "高崎",
          achievements: "￥19,715.20",
          id: 0,
        },
        {
          img: con3,
          name: "郑霞",
          achievements: "￥19,715.20",
          id: 0,
        },
      ],
      product_option:""
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
        url: "/api/taskFinish/thisMonth",
        params: {
          productType: "活期存款",
          dateType: ele,
        },
      }).then((res) => {
        console.log(res);
        this.text1 = res.data.FloatFinishRate;
        this.moneyAll = res.data.marketAmount;
        this.targetAmount = res.data.targetNum;
      });
    },
    tab2(ev) {
      console.log(ev);
      this.tabId1 = ev;
      if (ev === this.tabId1) {
        this.$httpGet({
          url: "/api/taskFinish/thisMonth",
          params: {
            productType: this.tabId1,
            dateType: this.tabId,
          },
        }).then((res) => {
          console.log(res);
          this.text1 = res.data.FloatFinishRate;
          this.moneyAll = res.data.marketAmount;
          this.targetAmount = res.data.targetNum;
        });
      }
    },
    getTask() {
      this.$httpGet({
        url: "/api/taskFinish/thisMonth",
        params: {
          productType: "活期存款",
          dateType: 1,
        },
      }).then((res) => {
        console.log(res);
        this.text1 = res.data.FloatFinishRate;
        this.moneyAll = res.data.marketAmount;
        this.targetAmount = res.data.targetNum;
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
