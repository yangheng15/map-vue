<template>
  <div class="MissionAccomplished">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='任务完成'">
      <div>
        <ul class="ranking_list" style="border-bottom: 1px solid #e8e8e8 !important;">
          <li @click="tab1(0)" :class="tabId==0?'cur':''">本月</li>
          <li @click="tab1(1)" :class="tabId==1?'cur':''">本季度</li>
          <li @click="tab1(2)" :class="tabId==2?'cur':''">本年度</li>
          <li @click="tab1(3)" :class="tabId==3?'cur':''">上半年</li>
          <li @click="tab1(4)" :class="tabId==4?'cur':''">下半年</li>
        </ul>
        <ul class="ranking_list" style="border-bottom: 0px solid #bbb;">
          <li @click="tab2(5)" :class="tabId1==5?'cur':''">存款</li>
          <li @click="tab2(6)" :class="tabId1==6?'cur':''">贷款</li>
          <li @click="tab2(7)" :class="tabId1==7?'cur':''">理财</li>
          <li @click="tab2(8)" :class="tabId1==8?'cur':''">手机银行</li>
          <li @click="tab2(9)" :class="tabId1==9?'cur':''">网银</li>
          <li @click="tab2(10)" :class="tabId1==10?'cur':''">ETC</li>
        </ul>
        <ul
          class="ranking_list"
          style="justify-content: start;border-bottom: 1px solid #e8e8e8 !important;"
        >
          <li @click="tab2(11)" :class="tabId1==11?'cur':''" style="margin-right:20px">跑动里程</li>
          <li @click="tab2(12)" :class="tabId1==12?'cur':''" style="margin-right:20px">拜访客户数量</li>
          <li @click="tab2(13)" :class="tabId1==13?'cur':''" style="margin-right:20px">执行任务数</li>
        </ul>
        <div class="situation">
          <div style="padding-top:30px">
            完成情况：{{text1}}
            <p style="color: #df0f0f;font-size:30px;padding-top:15px;padding-bottom:15px">
              <span v-show="text1=='存款'">120,000万元</span>
              <span v-show="text1=='理财'">12万元</span>
              <span v-show="text1=='网银'">1万元</span>
              <span v-show="text1=='贷款'">2,000万元</span>
              <span v-show="text1=='手机银行'">24万元</span>
              <span v-show="text1=='ETC'">22万元</span>
              <span v-show="text1=='跑动里程'">50公里</span>
              <span v-show="text1=='拜访客户数量'">12个</span>
              <span v-show="text1=='执行任务数'">3个</span>
            </p>
          </div>
          <ul>
            <li>{{text}}目标：123,222</li>
            <!-- <li>人均：234.00</li> -->
          </ul>
          <div style="background:#fff;border-bottom: 1px solid #e8e8e8 !important;">
            <div id="gaugeContainer" style="width:100%; height:160px;"></div>
          </div>
        </div>
        <div>
          <p style="font-size:16px;padding-top:10px;margin:0px 10px">近半年业绩趋势：{{text1}}</p>
          <div id="myChart" style="width: 100%;height: 200px;background-color:#fff"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import echarts from "echarts";
import { option } from "./gauge-option";
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
      tabId1: 5,
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
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
    tab(ev) {
      this.tabId = ev;
      localStorage.setItem("indexTabId", this.tabId);
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
    },
    tab2(ev) {
      this.tabId1 = ev;
      if (ev === 5) {
        this.text1 = "存款";
      } else if (ev === 6) {
        this.text1 = "贷款";
      } else if (ev === 7) {
        this.text1 = "理财";
      } else if (ev === 8) {
        this.text1 = "手机银行";
      } else if (ev === 9) {
        this.text1 = "网银";
      } else if (ev === 10) {
        this.text1 = "ETC";
      } else if (ev === 11) {
        this.text1 = "跑动里程";
      } else if (ev === 12) {
        this.text1 = "拜访客户数量";
      } else {
        this.text1 = "执行任务数";
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "",
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["4月", "5月", "6月", "7月", "8月"],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
        },
        series: [
          {
            name: "最高",
            type: "line",
            data: [1, 1, 4, 3, 2, 3, 0],
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true,
                },
                borderColor: "#22ecec", // 拐点边框颜色
                lineStyle: {
                  color: "#22ecec",
                },
              },
            },
            // markLine: {
            //   data: [{ type: "average", name: "平均值" }],
            // },
          },
        ],
      });
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
    let myChart = echarts.init(document.getElementById("gaugeContainer"));
    myChart.setOption(option);
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
  border-bottom: 1pxsolid #e8e8e8 !important;
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
