<template>
  <div class="PotentialCustomers">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '潜在客户'">
      <div class="screen_content">
        <van-search v-model="search_txt" placeholder="客户名称" />
      </div>
      <div class="customer_list">
        <ul>
          <li v-for="(thisItem, index) in customer_list" :key="index">
            <router-link
              tag="p"
              :to="{ name: 'PutRecord', query: { title: '潜在客户详情' } }"
              >{{ thisItem.name }}</router-link
            >
            <p>上次联系</p>
            <p class="schedule_star">
              <van-rate
                v-model="value"
                :size="14"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p>{{ thisItem.updatedTime | transform }}</p>
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
          :to="{ name: 'PutRecord', query: { title: '潜在客户添加' } }"
          >+</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import moment from "moment";
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
      customer_list: [
      ],
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
        console.log(res.data);
        this.customer_list=res.data
      });
    },
  },
    filters: {
    transform(val) {
      if (val) {
        return moment(val).format("YYYY-MM-DD");
      }
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
.screen_content {
  display: flex;
  position: relative;
}
.screen_content input {
  width: 83%;
  height: 44px;
  margin: 4px;
  line-height: 20px;
  padding: 0rem 1rem 0rem 2.3rem;
  text-align: left;
  border-radius: 2px 2px 2px 2px;
  background-color: #fafafa;
  text-align: center;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(255, 0, 0, 0);
}
.screen_content img {
  position: absolute;
  width: 14px;
  height: 14px;
  top: 40%;
  left: 5%;
  z-index: 100;
  opacity: 0.5;
}
.screen_content input::-webkit-input-placeholder {
  text-align: left;
  font-size: 14px;
}
.screen_content input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  text-align: left;
  font-size: 14px;
}
.screen_content button {
  border: none;
  background: none;
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
