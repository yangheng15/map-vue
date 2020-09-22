<template>
  <div class="ProductCatalog">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='产品目录'">
      <van-dropdown-menu>
        <van-dropdown-item v-model="product_catalog" :options="product_option" />
      </van-dropdown-menu>
      <div class="customer_list">
        <router-link tag="ul" :to="{ name: 'ProductCatalogDetail', query: { title: '产品目录详情' }}">
          <li v-for="(thisItem,index) in MarketingRecord" :key="index">
            <p style="font-size:1rem;font-weight:600;">{{thisItem.name}}</p>
            <p class="schedule_star">{{thisItem.text}}</p>
            <p class="schedule_star">{{thisItem.text1}}</p>
            <p class="schedule_star">{{thisItem.date}}</p>
          </li>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import { option } from "./gauge-option";
export default {
  name: "ProductCatalog",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      product_catalog: 0,
      product_option: [
        {
          text: "贷款",
          value: 0,
        },
        {
          text: "理财",
          value: 1,
        },
        {
          text: "支付工具",
          value: 2,
        },
        {
          text: "基金",
          value: 3,
        },
        {
          text: "保险",
          value: 4,
        },
        {
          text: "生活缴费",
          value: 5,
        },
      ],
      MarketingRecord: [
        {
          id: 1,
          name: "企业贷",
          text: "支付工具",
          date: " 2020-08-30日前",
          text1: "资料采集",
        },
        {
          id: 2,
          name: "农户家庭",
          text: "生活缴费",
          date: "  2020-08-30日前",
          text1: "产品营销",
        },
      ],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.ProductCatalog {
  padding-top: 46px;
}
.customer_list ul {
  background: #fff;
}
.customer_list ul li {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.customer_list ul li p {
  width: 60%;
  margin: 5px 0px;
}
.customer_list ul li p:nth-child(even) {
  text-align: right;
  width: 40%;
}
.customer_list .schedule_star img {
  width: 1.2rem;
  vertical-align: middle;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
  .customer_list ul li p {
    width: 57%;
  }
  .customer_list ul li p:nth-child(even) {
    width: 43%;
  }
}
</style>
