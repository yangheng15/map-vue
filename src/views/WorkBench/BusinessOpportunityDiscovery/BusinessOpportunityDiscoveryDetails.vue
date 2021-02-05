<template>
  <div class="BusinessOpportunityDiscovery">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '商机发现详情'" class="body">
      <div class="businessOpportunity">
        <div class="businessLeft">
          <img src="../../../assets/WorkBench/shangji-building.svg" alt="" />
        </div>
        <router-link
          tag="div"
          class="businessRight"
          :to="{
            name: 'MainProducts',
            query: {
              title: '主营产品',
              id: MarketingRecord.id,
            },
          }"
        >
          <van-icon class="toProducts" color="#0f0f0f" size="16" name="arrow" />
          <h2>{{ MarketingRecord.corporateName }}</h2>
          <p>
            <van-tag
              :color="MarketingRecord.corporateTagColor[0]"
              :text-color="MarketingRecord.corporateFontColor[0]"
              >{{ MarketingRecord.corporateTag[0] }}</van-tag
            >
          </p>
          <div class="companyProfile">
            <dl>
              <dt>法定代表人</dt>
              <dd>{{ MarketingRecord.men }}</dd>
            </dl>
            <dl>
              <dt>注册资本</dt>
              <dd>{{ MarketingRecord.money }}万</dd>
            </dl>
            <dl>
              <dt>商机等级</dt>
              <dd>{{ MarketingRecord.evel }}</dd>
            </dl>
          </div>
        </router-link>
      </div>
      <div class="content">
        <h2>企业行业地位</h2>
        <ul class="industryStatus">
          <li v-for="(item, index) in MarketingRecord1" :key="index">
            <h3><span>资产总额：</span> 5000万 ～ 1亿</h3>
            <p>超过68.32%商务服务页的企业</p>
            <p>超过78.32%北京市的企业</p>
            <p>超过98.32%北京市石景山的企业</p>
          </li>
        </ul>
        <h2>企业行业地位</h2>
        <ul class="industryStatus">
          <li v-for="(item, index) in MarketingRecord1" :key="index">
            <h3><span>资产总额：</span> 5000万 ～ 1亿</h3>
            <p>超过68.32%商务服务页的企业</p>
            <p>超过78.32%北京市的企业</p>
            <p>超过98.32%北京市石景山的企业</p>
          </li>
        </ul>
      </div>
      <div class="claim">
        <van-button class="claimButtom" color="#09bd5f" @click="showBack()"
          >认领</van-button
        >
      </div>
      <!-- <van-list
        v-model="loadEnd"
        :finished="finishEnd"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoadList"
      > -->
      <!-- </van-list> -->
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import { Dialog, Toast } from "vant";
export default {
  name: "BusinessOpportunityDiscovery",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      MarketingRecord: {
        id: 1,
        corporateName: "中国石油集团东方地球物理勘测中心",
        corporateFontColor: [
          "#fff",
          "#64aebc",
          "#d99369",
          "#69bd8b",
          "#f0a97f",
        ],
        corporateTagColor: [
          "#26b351",
          "#dcf8fa",
          "#ffe4d3",
          "#d9fce6",
          "#f9e8d8",
        ],
        corporateTag: [
          "规模以上服务业企业商机",
          "国有控制",
          "500强集团成员",
          "规上服务业企业",
          "潜力行业",
          "主导行业",
        ],
        men: "王红平",
        money: "3000",
        evel: "A",
      },
      MarketingRecord1: [
        {
          id: 1,
          name: "资产总额：",
          money: "5000万 ～ 1亿",
          p1: "超过68.32%商务服务页的企业",
          p2: "超过78.32%北京市的企业",
          p3: "超过98.32%北京市石景山的企业",
        },
        {
          id: 1,
          name: "营销总收入：",
          money: "5000万 ～ 1亿",
          p1: "超过68.32%商务服务页的企业",
          p2: "超过78.32%北京市的企业",
          p3: "超过98.32%北京市石景山的企业",
        },
        {
          id: 1,
          name: "主营业务收入：",
          money: "5000万 ～ 1亿",
          p1: "超过68.32%商务服务页的企业",
          p2: "超过78.32%北京市的企业",
          p3: "超过98.32%北京市石景山的企业",
        },
        {
          id: 1,
          name: "利润总额：",
          money: "5000万 ～ 1亿",
          p1: "超过68.32%商务服务页的企业",
          p2: "超过78.32%北京市的企业",
          p3: "超过98.32%北京市石景山的企业",
        },
      ],
      loadEnd: false, // 滚动加载中
      finishEnd: false, // 滚动加载完成
      offset: 5, //滚动条与底部距离小于 offset 时触发load事件，默认300
      currentPage: 1,
      pageSize1: 10,
      dataTotal: "",
      search_txt: "",
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    onLoadList() {
      this.getMyClients();
    },
    getMyClients() {
      //   this.$httpGet({
      //     url: "/api/BusinessOpportunityDiscovery/query",
      //     params: {
      //       page: this.currentPage, //页数
      //       limit: this.pageSize1, //每页个数
      //       publishStatus: 1,
      //       name: this.search_txt,
      //     },
      //   }).then((res) => {
      //     this.dataTotal = res.count;
      //     //进行判断
      //     if (this.dataTotal <= this.pageSize1) {
      //       this.MarketingRecord = res.data;
      //     } else {
      //       this.currentPage++;
      //       let arr = res.data;
      //       this.MarketingRecord = this.MarketingRecord.concat(arr);
      //     }
      //     // 加载状态结束
      //     this.loadEnd = false;
      //     // 数据全部加载完成
      //     if (this.MarketingRecord.length >= this.dataTotal) {
      //       this.finishEnd = true; //结束，显示我也是有底线的
      //     }
      //   });
    },
    showBack(code) {
      Dialog.confirm({
        title: "你确定认领吗？",
      }).then(() => {
        Toast({
          message: "认领成功",
          position: "middle",
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
p {
  margin: 7px 0px;
}
.van-search {
  width: 100%;
}
.BusinessOpportunityDiscovery {
  padding-top: 46px;
}
.businessOpportunity {
  width: 100%;
  display: flex;
  padding: 15px 10px;
  box-sizing: border-box;
}
.businessLeft {
  width: 32px;
}
.businessRight {
  width: calc(100% - 30px);
  position: relative;
}
.businessRight .toProducts {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-50%, -50%);
}
.businessRight h2 {
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #01c049;
}
.businessRight .van-tag {
  margin: 3px;
  font-size: 12px;
  padding: 2px 5px;
}
.businessRight .companyProfile {
  display: flex;
  font-size: 11px;
}
.businessRight .companyProfile dl,
.businessRight .companyProfile dd,
.businessRight .companyProfile dt {
  margin: 0;
  font-size: 11px;
  color: #727272;
}
.businessRight .companyProfile dl {
  width: 33%;
  padding: 0px 3px;
}
.businessRight .companyProfile dd {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.content {
  background: #f5f5f5;
  padding-bottom: 55px;
}
.content h2 {
  padding: 15px 0px 10px 10px;
  margin: 0;
}
.content .industryStatus {
  background: #fff;
  margin-left: 10px;
  width: calc(100% - 20px);
  border-radius: 10px;
  padding: 5px 10px;
  box-sizing: border-box;
}
.content .industryStatus li {
  border-bottom: 1px solid #efefef;
}
.content .industryStatus li:last-child {
  border-bottom: 0px solid #efefef;
}
.content .industryStatus h3 {
  font-weight: 400;
}
.content .industryStatus h3 span {
  color: #aaa;
}
.content .industryStatus p {
  font-size: 10px;
  color: #797979;
}
.claim {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.claim .claimButtom {
  height: 30px;
  width: 80px;
  border-radius: 15px;
}
@media screen and (max-width: 359px) {
  * {
    font-size: 13px;
  }
}
</style>
