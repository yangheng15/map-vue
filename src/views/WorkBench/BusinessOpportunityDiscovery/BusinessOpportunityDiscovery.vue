<template>
  <div class="BusinessOpportunityDiscovery">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '商机发现'">
      <van-search
        v-model="search_txt"
        placeholder="请输入企业名称"
        @search="onSearch"
        show-action
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template></van-search
      >
      <!-- <van-list
        v-model="loadEnd"
        :finished="finishEnd"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoadList"
      > -->
      <ul>
        <router-link
          tag="li"
          v-for="(item, index) in MarketingRecord"
          :key="index"
          class="businessOpportunity"
          :to="{
            name: 'BusinessOpportunityDiscoveryDetails',
            query: {
              title: '商机发现详情',
              id: item.id,
            },
          }"
        >
          <div class="businessLeft">
            <img src="../../../assets/WorkBench/shangji-building.svg" alt="" />
          </div>
          <div class="businessRight">
            <div class="businessImportant">
              <h2>{{ item.corporateName }}</h2>
              <van-tag color="#ee5656" plain>重点推荐</van-tag>
            </div>
            <p>
              <van-tag
                :color="item.corporateTagColor[0]"
                :text-color="item.corporateFontColor[0]"
                >{{ item.corporateTag[0] }}</van-tag
              >
              <van-tag
                :color="item.corporateTagColor[1]"
                :text-color="item.corporateFontColor[1]"
                >{{ item.corporateTag[1] }}</van-tag
              >
              <van-tag
                :color="item.corporateTagColor[2]"
                :text-color="item.corporateFontColor[2]"
                >{{ item.corporateTag[2] }}</van-tag
              >
              <van-tag
                :color="item.corporateTagColor[3]"
                :text-color="item.corporateFontColor[3]"
                >{{ item.corporateTag[3] }}</van-tag
              >
              <van-tag
                :color="item.corporateTagColor[4]"
                :text-color="item.corporateFontColor[4]"
                >{{ item.corporateTag[4] }}</van-tag
              >
            </p>
            <div class="companyProfile">
              <dl>
                <dt>成立日期</dt>
                <dd>{{ item.time }}</dd>
              </dl>
              <dl>
                <dt>规模</dt>
                <dd>{{ item.scale }}</dd>
              </dl>
              <dl>
                <dt>行业</dt>
                <dd>{{ item.industry }}</dd>
              </dl>
            </div>
          </div>
        </router-link>
      </ul>
      <!-- </van-list> -->
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
export default {
  name: "BusinessOpportunityDiscovery",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      MarketingRecord: [
        {
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
          time: "2020-01-22",
          scale: "大型",
          industry: "科学研究和技术",
        },
        {
          id: 2,
          corporateName: "新奥科技发展有限公司",
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
            "高新技术企业",
            "集团成员",
            "高增长行业",
            "潜力行业",
            "主导行业",
          ],
          time: "2018-12-22",
          scale: "中型",
          industry: "科学研究和技术",
        },
        {
          id: 3,
          corporateName: "河北同光晶体管有限公司",
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
            "高新技术企业商机",
            "高新技术企业",
            "集团成员",
            "高增长行业",
            "潜力行业",
            "主导行业",
          ],
          time: "2012-05-22",
          scale: "小型",
          industry: "制造业",
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
    onSearch() {
      this.currentPage = 1;
      this.pageSize1 = 10;
      this.$httpGet({
        url: "/api/BusinessOpportunityDiscovery/query",
        params: {
          page: this.currentPage, //页数
          limit: this.pageSize1, //每页个数
          publishStatus: 1,
          name: this.search_txt,
        },
      }).then((res) => {
        this.MarketingRecord = res.data;
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
  margin-left: 10px;
  width: calc(100% - 20px);
  border-radius: 10px;
  box-shadow: 0px 0px 5px 3px #e8e8e8;
  display: flex;
  padding: 15px 10px;
  box-sizing: border-box;
  margin-top: 16px;
}
.businessOpportunity:first-child {
  margin-top: 0;
}
.businessOpportunity:last-child {
  margin-bottom: 20px;
}
.businessLeft {
  width: 32px;
}
.businessRight {
  width: calc(100% - 30px);
}
.businessRight .businessImportant {
  display: flex;
  justify-content: space-between;
}
.businessRight .businessImportant .van-tag {
  margin: 0;
}
.businessRight h2 {
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 73%;
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
  border-right: 1px solid #e8e8e8;
  width: 33%;
  padding: 0px 3px;
}
.businessRight .companyProfile dl:nth-child(2) {
  width: 20%;
}
.businessRight .companyProfile dl:last-child {
  border-right: 0px solid #e8e8e8;
}
.businessRight .companyProfile dd {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
@media screen and (max-width: 359px) {
  * {
    font-size: 13px;
  }
}
</style>
