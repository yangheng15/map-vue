<template>
  <div class="MissionAccomplished">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '任务完成'">
      <div>
        <ul class="ranking_list" style="border-bottom: 1px solid #e8e8e8 !important">
          <li @click="tab1(1)" :class="tabId == 1 ? 'cur' : ''">本月</li>
          <li @click="tab1(2)" :class="tabId == 2 ? 'cur' : ''">本季度</li>
          <li @click="tab1(3)" :class="tabId == 3 ? 'cur' : ''">本年度</li>
          <li @click="tab1(4)" :class="tabId == 4 ? 'cur' : ''">上半年</li>
          <li @click="tab1(5)" :class="tabId == 5 ? 'cur' : ''">下半年</li>
        </ul>
        <ul
          class="ranking_list1"
          style="
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            justify-content: space-between;
          "
        >
          <li
            v-for="(item, index) in product_option"
            :key="index"
            @click="tab2(item.value)"
            :class="tabId1 == item.value ? 'cur' : ''"
          >
            {{ item.text }}
          </li>
        </ul>
        <ul
          class="ranking_list"
          style="justify-content: start; border-bottom: 1px solid #e8e8e8 !important"
        >
          <!-- <li
            @click="tab2(11)"
            :class="tabId1 == 11 ? 'cur' : ''"
            style="margin-right: 20px"
          >
            跑动里程
          </li> -->
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
        <div class="situation">
          <div style="padding-top: 30px">
            完成情况：
            {{ text1 | NumFormat }}
            <p
              style="
                color: #df0f0f;
                font-size: 30px;
                padding-top: 15px;
                padding-bottom: 15px;
              "
            >
              {{ moneyAll ? moneyAll : 0 | NumFormat }}万元
            </p>
          </div>
          <ul>
            <li>{{ text }}目标：{{ targetAmount ? targetAmount : 0 }}万元</li>
            <!-- <li>人均：234.00</li> -->
          </ul>
          <div style="background: #fff; border-bottom: 1px solid #e8e8e8 !important">
            <div id="gaugeContainer" style="width: 100%; height: 160px"></div>
          </div>
        </div>
        <div>
          <p style="font-size: 16px; padding-top: 10px; margin: 0px 10px">
            近半年业绩趋势：
          </p>
          <div
            id="myChart"
            style="width: 100%; height: 200px; background-color: #fff"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import echarts from "echarts";
import { option, option2 } from "./gauge-option";
export default {
  name: "MissionAccomplished",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      text: "本季度",
      text1: "存款",
      tabId: 1,
      tabId1: 1,
      product_option: [],
      moneyAll: "",
      targetAmount: "",
      percentage: "",
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
        url: "/dic/type/task_product_type",
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
    subtitle: function (chars, num) {
      num = num || 28;
      if (chars && this.checksum(chars) > num) {
        var __endto = 0;
        var __sum = 0;
        for (var i = 0; i < chars.length; i++) {
          var c = chars.charCodeAt(i);
          if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            __sum++;
          } else {
            __sum += 2;
          }
          __endto++;
          if (__sum >= num) {
            break;
          }
        }
        return chars.substring(0, __endto) + "...";
      }
      return chars;
    },
    checksum(chars) {
      var sum = 0;
      for (var i = 0; i < chars.length; i++) {
        var c = chars.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          sum++;
        } else {
          sum += 2;
        }
      }
      return sum;
    },
    tab1(ev) {
      this.tabId = ev;
      if (ev === 1) {
        this.text = "本月";
      } else if (ev === 2) {
        this.text = "本季度";
      } else if (ev === 3) {
        this.text = "本年度";
      } else if (ev === 4) {
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
          productType: this.tabId1,
          dateType: ele,
        },
      }).then((res) => {
        this.text1 = res.data.FloatFinishRate;
        this.moneyAll = res.data.marketAmountByType;
        this.targetAmount = res.data.targetNum;
        this.percentage =
          parseFloat(res.data.finishRate * 100) < 100
            ? parseFloat(res.data.finishRate * 100)
            : 100;
        option["series"][0]["data"][0] = {
          value: this.percentage,
          name: "完成率",
        };
        this.myChart.setOption(option);
      });
    },
    finishCountNum() {
      // 客户数量，执行任务
      this.$httpGet({
        url: "/api/taskFinish/countNum",
        params: {
          productType: this.tabId1,
          dateType: this.tabId,
        },
      }).then((res) => {
        this.text1 = res.data.FloatFinishRate;
        this.moneyAll = res.data.marketAmountByType;
        this.targetAmount = res.data.targetNum;
        this.percentage =
          parseFloat(res.data.finishRate * 100) < 100
            ? parseFloat(res.data.finishRate * 100)
            : 100;
        option["series"][0]["data"][0] = {
          value: this.percentage,
          name: "完成率",
        };
        this.myChart.setOption(option);
      });
    },
    thisMounth() {
      // APP产品类型目标数,完成度,完成情况 1:本月 2:本季度 3:本年度 4:上半年 5:下半年
      this.$httpGet({
        url: "/api/taskFinish/thisMonth",
        params: {
          productType: this.tabId1,
          dateType: this.tabId,
        },
      }).then((res) => {
        this.text1 = res.data.FloatFinishRate;
        this.moneyAll = res.data.marketAmountByType;
        this.targetAmount = res.data.targetNum;
        this.percentage =
          parseFloat(res.data.finishRate * 100) < 100
            ? parseFloat(res.data.finishRate * 100)
            : 100;
        option["series"][0]["data"][0] = {
          value: this.percentage,
          name: "完成率",
        };
        this.myChart.setOption(option);
      });
    },
    tab2(ev) {
      this.tabId1 = ev;
      if (ev === this.tabId1) {
        if (ev == this.taskNum || ev == this.custNum) {
          // 客户数量，执行任务
          this.finishCountNum();
          // 获取最下面echarts折线图数据（客户数量，执行任务）
          this.$httpGet({
            url: "/api/taskFinish/otherMonthTrends",
            params: {
              productType: this.tabId1,
            },
          }).then((res) => {
            let mounthArr = Object.keys(res["data"]).sort((a, b) => {
              if (a < b) {
                return -1;
              }
            });
            let mounthData = [];
            mounthArr.forEach((it) => mounthData.push(res.data[it]));
            option2["xAxis"].data = mounthArr;
            option2["series"][0].data = mounthData;
            this.myChart2.setOption(option2);
          });
        } else {
          // APP产品类型目标数,完成度,完成情况 1:本月 2:本季度 3:本年度 4:上半年 5:下半年
          this.thisMounth();
          // 获取最下面echarts折线图数据
          // APP产品类型近半年业绩趋势
          this.$httpGet({
            url: "/api/taskFinish/monthTrends",
            params: {
              productType: this.tabId1,
            },
          }).then((res) => {
            let mounthArr = Object.keys(res["data"]).sort((a, b) => {
              if (a < b) {
                return -1;
              }
            });
            let mounthData = [];
            mounthArr.forEach((it) => mounthData.push(res.data[it]));
            option2["xAxis"].data = mounthArr;
            option2["series"][0].data = mounthData;
            this.myChart2.setOption(option2);
          });
        }
      }
    },
    getTask() {
      this.$httpGet({
        url: "/api/taskFinish/thisMonth",
        params: {
          productType: 1,
          dateType: 1,
        },
      }).then((res) => {
        this.text1 = res.data.FloatFinishRate;
        this.moneyAll = res.data.marketAmountByType;
        this.targetAmount = res.data.targetNum;
        this.percentage =
          parseFloat(res.data.finishRate * 100) < 100
            ? parseFloat(res.data.finishRate * 100)
            : 100;
        // this.percentage = parseFloat(res.data.finishRate);
        option["series"][0]["data"][0] = {
          value: this.percentage,
          name: "完成率",
        };
        this.myChart.setOption(option);
      });
      this.$httpGet({
        url: "/api/taskFinish/monthTrends",
        params: {
          productType: 1,
        },
      }).then((res) => {
        let mounthArr = Object.keys(res["data"]).sort((a, b) => {
          if (a < b) {
            return -1;
          }
        });
        let mounthData = [];
        mounthArr.forEach((it) => mounthData.push(res.data[it]));
        option2["xAxis"].data = mounthArr;
        option2["series"][0].data = mounthData;
        this.myChart2.setOption(option2);
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart2 = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.myChart2.setOption(option2);
    },
    draw({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(114.65, 33.37));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
  },
  mounted() {
    this.drawLine();
    // this.$nextTick(function () {
    //   this.drawPie("main");
    // });
    this.myChart = echarts.init(document.getElementById("gaugeContainer"));
    this.myChart.setOption(option);
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.MissionAccomplished {
  padding-top: 46px;
}
.cur {
  color: #df0f0f;
  position: relative;
}
.ranking_list {
  display: flex;
  height: 30px;
  width: 100%;
  line-height: 30px;
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
  padding: 10px;
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
@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
}
</style>
