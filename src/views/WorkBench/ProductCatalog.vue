<template>
  <div class="ProductCatalog">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '产品目录'">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="product_catalog"
          :options="product_option"
          @change="screenChange"
        />
      </van-dropdown-menu>
      <div class="customer_list">
        <ul>
          <router-link
            tag="li"
            :to="{
              name: 'ProductCatalogDetail',
              query: { title: '产品目录详情', id: thisItem.id },
            }"
            v-for="(thisItem, index) in MarketingRecord"
            :key="index"
          >
            <p style="font-size: 1rem; font-weight: 600">{{ thisItem.name }}</p>
            <p class="schedule_star">支付工具</p>
            <p class="schedule_star">{{ thisItem.type }}</p>
            <p class="schedule_star">{{ thisItem.updatedTime | transform }}</p>
          </router-link>
        </ul>
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
      product_catalog: "活期存款",
      product_option: [],
      MarketingRecord: [],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.getProduct();
    this.dic_nation();
  },
  methods: {
    getProduct() {
      this.$httpGet({
        url: "/api/productsInfo/appQuery",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.MarketingRecord = res.data;
      });
    },
    screenChange(val) {
      this.$httpGet({
        url: "/api/productsInfo/appQuery",
        params: {
          limit: 10,
          page: 1,
          type: val,
        },
      }).then((res) => {
        this.MarketingRecord = res.data;
      });
    },
    dic_nation() {
      this.$httpGet({
        url: "/dic/type/dic_product_type",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if(it.parentId !== null) {
            transformDara.push({value: it.code, text: it.codeText})
          }
        })
        this.product_option = transformDara;
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
