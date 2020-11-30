<template>
  <div class="RecentContact">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '最近联系'">
      <van-search
        v-model="search_txt"
        placeholder="客户名称"
        @search="queryContact"
        show-action
      >
        <template #action>
          <div @click="queryContact">搜索</div>
        </template></van-search
      >
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoad"
        class="customer_list"
      >
        <ul>
          <li v-for="(thisItem, index) in data_customer_list1" :key="index">
            <router-link
              v-if="thisItem.custBasicType == 1"
              tag="p"
              :to="{
                name: 'CustomerViewPresentation',
                query: { title: '客户视图', id: thisItem.custId },
              }"
              >{{ thisItem.custName }}</router-link
            >
            <router-link
              v-if="thisItem.potentialType == 2"
              tag="p"
              :to="{
                name: 'EditPotentialCustomers',
                query: { title: '潜在客户详情', id: thisItem.potentialId },
              }"
              >{{ thisItem.potentialName }}</router-link
            >
            <!-- <p v-if="thisItem.custBasicType == 1">
              <a style="color: #000" :href="'tel:' + thisItem.telphone"
                >电话：{{ thisItem.telphone }}</a
              >
            </p>
            <p v-if="thisItem.potentialType == 2">
              <a style="color: #000" :href="'tel:' + thisItem.telphone"
                >电话：{{ thisItem.potentialTelphone }}</a
              >
            </p> -->
            <p v-if="thisItem.contactDays == 0">今天联系过</p>
            <p v-if="thisItem.contactDays !== 0">
              上次联系{{ thisItem.contactDays }}天前
            </p>
          </li>
        </ul>
      </van-list>
      <!-- <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider> -->
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "RecentContact",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      search_txt: "",
      date: "",
      show: false,
      tabId: 1,
      starNum: "",
      data_customer_list1: [],
      offset: 0, //滚动条与底部距离小于 offset 时触发load事件，默认300
      pageNo: 1, // 当前页码
      pageSize: 10, // 分页大小
      total: 0, // 查询总条数
      loading: false, // 滚动加载中
      finished: false, // 滚动加载完成
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    tab(ev) {
      this.tabId = ev;
    },
    queryContact() {
      return new Promise((resolve, reject) => {
        let params = {
          page: this.pageNo,
          limit: this.pageSize,
          customerName: this.search_txt,
        };
        this.$httpGet({
          url: "/api/contactByApp/query",
          params: params,
        })
          .then((res) => {
            if (res.data.length > 0) {
              let result = {
                total: res.count,
                pageIndex: 1,
                data_customer_list1: res.data,
              };
              resolve(result);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    onLoad() {
      // debugger
      this.loading = true;
      this.queryContact().then((res) => {
        this.data_customer_list1 = this.data_customer_list1.concat(
          res.data_customer_list1
        );
        if (this.data_customer_list1.length >= res.total) {
          this.finished = true;
        } else {
          this.finished = false;
          this.pageNo = this.pageNo + 1;
        }
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.van-search {
  width: 100%;
}
.RecentContact {
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
.time_frame {
  height: 3rem;
  line-height: 3rem;
  background-color: #fff;
  margin: 0.3rem;
  display: flex;
  padding: 0rem 1rem;
  justify-content: space-between;
}
.cur {
  color: #df0f0f;
  position: relative;
}
.img4 {
  position: absolute;
  right: 30%;
  top: 0.1rem;
  background: url("../../assets/home/md-phone.svg") no-repeat;
  background-size: cover;
  width: 1rem;
  height: 1rem;
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
