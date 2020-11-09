<template>
  <div class="PotentialCustomers">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '潜在客户'">
      <van-search
        v-model="search_txt"
        placeholder="客户名称"
        @search="onSearch"
      />
      <div class="customer_list">
        <ul>
          <li v-for="(thisItem, index) in customer_list"
            :key="index">
            <router-link tag="p" :to="{
              name: 'EditPotentialCustomers',
              query: { title: '潜在客户详情', id: thisItem.id },
            }">{{ thisItem.name }}</router-link>
            <p>
              <van-button
                type="primary"
                color="rgb(61, 66, 94)"
                size="mini"
                @click="deleteCustomer(thisItem.id)"
                >删除</van-button
              >
            </p>
            <p class="schedule_star">
              <van-rate
                v-model="thisItem.starRating"
                :size="14"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p v-if="thisItem.updatedTime">
              上次联系{{ thisItem.updatedTime | transform }}
            </p>
            <p v-if="!thisItem.updatedTime">最近暂无联系</p>
            <!-- <p></p> -->
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      <div
        style="
          margin-left: 85%;
          position: fixed !important;
          float: right;
          z-index: 9999;
          align-items: right;
          bottom: 50px;
          right: 5%;
        "
      >
        <router-link
          class="add_record"
          tag="span"
          :to="{
            name: 'AddPotentialCustomers',
            query: { title: '潜在客户添加' },
          }"
          >+</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import { Dialog } from "vant";
export default {
  name: "PotentialCustomers",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      value: 1,
      search_txt: "",
      customer_list: [],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.getPotentialCustomers();
  },
  methods: {
    getPotentialCustomers() {
      this.$httpGet({
        url: "/api/customersPotential/app",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        // console.log(res.data);
        this.customer_list = res.data;
      });
    },
    deleteCustomer(val) {
      Dialog.confirm({
        title: "你确定移除吗",
      })
        .then(() => {
          this.$httpDelete({
            url: "/api/customersPotential/delete",
            params: {
              ids: val,
            },
          })
            .then((res) => {
              this.getPotentialCustomers();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    onSearch(val) {
      // console.log(val);
      this.$httpGet({
        url: "/api/customersPotential/app",
        params: {
          limit: 10,
          page: 1,
          name: val,
        },
      }).then((res) => {
        this.customer_list = res.data;
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
.PotentialCustomers {
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
.add_record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: rgb(61, 66, 94);
  color: #fff;
  font-size: 1.5rem;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
}
</style>
