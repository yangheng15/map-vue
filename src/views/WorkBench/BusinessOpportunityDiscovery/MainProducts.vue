<template>
  <div class="BusinessOpportunityDiscovery">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '主营产品'">
      <!-- <van-list
        v-model="loadEnd"
        :finished="finishEnd"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoadList"
      > -->
      <ul>
        <li
          v-for="(item, index) in MarketingRecord"
          :key="index"
          class="businessOpportunity"
        >
          <h3 class="productType">{{ item.productType }}</h3>
          <p class="introduce">{{ item.introduce }}</p>
          <ul>
            <li
              v-for="(item1, index1) in item.productDetail"
              :key="index1"
              class="flexContent"
            >
              <div class="leftContent">
                <div>
                  <img src="../../../assets/WorkBench/logo.jpeg" alt="" />
                </div>
                <div>
                  <p>{{ item1.name }}</p>
                  <p class="introduce_p">{{ item1.introduce_p }}</p>
                </div>
              </div>
              <router-link
                tag="div"
                :to="{
                  name: 'ProductCatalogDetail',
                  query: { title: '产品详情', id: item1.pid },
                }"
                class="rightContent"
              >
                <van-button class="claimButtom">详情</van-button>
              </router-link>
            </li>
          </ul>
        </li>
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
          productType: "公司存款",
          introduce: "您身边的银行",
          productDetail: [
            {
              pid: "21",
              name: "银财宝",
              introduce_p: "收益高，安全高，灵活性",
            },
            {
              pid: "22",
              name: "单位定期存款",
              introduce_p: "利率高，灵活",
            },
            {
              pid: "20",
              name: "单位活期存款",
              introduce_p: "利率高，处理灵活",
            },
          ],
        },
        {
          id: 1,
          productType: "公司借款",
          introduce: "您身边的银行",
          productDetail: [
            {
              pid: "19",
              name: "借贷宝",
              introduce_p: "利息低，安全性高",
            },
            {
              pid: "18",
              name: "单位放贷",
              introduce_p: "利率低",
            },
            {
              pid: "21",
              name: "合作贷款",
              introduce_p: "利息极低",
            },
          ],
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
  /* display: flex; */
  padding: 15px;
  box-sizing: border-box;
  margin-top: 16px;
}
.businessOpportunity:last-child {
  margin-bottom: 20px;
}
.productType {
  font-weight: 400;
  color: #b6b5b5;
  margin: 0;
}
.introduce {
  font-size: 18px;
  /* margin: 0; */
}
.flexContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.leftContent {
  display: flex;
}
.leftContent img {
  width: 45px;
  border-radius: 8px;
}
.leftContent p {
  margin: 0;
  margin-left: 10px;
}
.leftContent .introduce_p {
  font-size: 10px;
  color: #b5b3b5;
}
.claimButtom {
  color: #4b8ad0;
  height: 25px;
  background: #f6f8fc;
  border: 0;
}
@media screen and (max-width: 359px) {
  * {
    font-size: 13px;
  }
}
</style>
