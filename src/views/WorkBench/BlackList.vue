<template>
  <div class="BlackList">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '黑名单'">
      <van-search
        v-model="search_txt"
        placeholder="客户名称"
        @search="onSearch"
      />
      <div class="customer_list">
        <ul>
          <li v-for="(thisItem, index) in black_list" :key="index">
            <router-link
              tag="p"
              :to="{ name: 'CustomerViewPresentation', query: { title: '客户视图' } }"
              >{{ thisItem.customerName }}</router-link
            >
            <p>{{ thisItem.createdTime | transform }}</p>
            <p v-if="thisItem.have == 2" class="schedule_star">
              <van-rate
                v-model="value"
                :size="14"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "BlackList",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      value: 1,
      search_txt: "",
      black_list: [],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.getBlackList();
  },
  methods: {
    getBlackList() {
      this.$httpGet({
        url: "/api/semCustomersBlack/appQuery",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.black_list = res.data;
      });
    },
    onSearch(val) {
      this.$httpGet({
        url: "/api/semCustomersBlack/appQuery",
        params: {
          limit: 10,
          page: 1,
          custName: val,
        },
      }).then((res) => {
        this.black_list = res.data;
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
.van-search {
  width: 100%;
}
.BlackList {
  padding-top: 46px;
}
.customer_list ul {
  background: #fff;
  /* margin-top: 10px; */
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
