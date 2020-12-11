<template>
  <div class="RecentContact">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '最近联系'">
      <van-search
        v-model="search_txt"
        placeholder="客户名称"
        @search="onSearch"
        show-action
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template></van-search
      >
      <van-list
        v-model="loadEnd"
        :finished="finishEnd"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoadList"
        class="customer_list"
      >
        <ul>
          <li v-for="(thisItem, index) in data_customer_list1" :key="index">
            <router-link
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              v-if="thisItem.customersType == 1"
              tag="p"
              :to="{
                name: 'EditPublicCustomerRecord',
                query: { title: '对公客户详情', id: thisItem.customerCode },
              }"
              >{{ thisItem.custName }}</router-link
            >
            <router-link
            style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
              v-if="thisItem.customersType == 2"
              tag="p"
              :to="{
                name: 'EditIndividualCustomersRecord',
                query: { title: '个人客户详情', id: thisItem.customerCode },
              }"
              >{{ thisItem.custName }}</router-link
            >
            <p v-if="thisItem.contactDays == 0">今天联系过</p>
            <p v-if="thisItem.contactDays !== 0">
              上次联系 <span style="color:#E34645;">{{ thisItem.contactDays }}</span>天前
            </p>
            <p v-if="thisItem.telphone">
              <a style="color: #000" :href="'tel:' + thisItem.telphone"
                >手机号：{{ thisItem.telphone }}</a
              >
            </p>
            <!-- <p v-if="thisItem.potentialType == 2">
              <a style="color: #000" :href="'tel:' + thisItem.telphone"
                >电话：{{ thisItem.potentialTelphone }}</a
              >
            </p> -->
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
      offset: 5, //滚动条与底部距离小于 offset 时触发load事件，默认300
      currentPage: 1,
      pageSize1: 10,
      dataTotal: "",
      loadEnd: false, // 滚动加载中
      finishEnd: false, // 滚动加载完成
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  methods: {
    tab(ev) {
      this.tabId = ev;
    },
    onSearch() {
      this.$httpGet({
        url: "/api/contactByApp/query",
        params: {
          page: 1, //页数
          limit: 10, //每页个数
          customerName: this.search_txt,
        },
      }).then((res) => {
        this.data_customer_list1 = res.data;
      });
    },
    onLoadList() {
      this.getMyClients();
    },
    getMyClients() {
      this.$httpGet({
        url: "/api/contactByApp/query",
        params: {
          page: this.currentPage, //页数
          limit: this.pageSize1, //每页个数
          customerName: this.search_txt,
        },
      }).then((res) => {
        console.log(res);
        this.dataTotal = res.count;
        //进行判断
        if (this.dataTotal <= this.pageSize1) {
          this.data_customer_list1 = res.data;
          console.log(this.data_customer_list1);
        } else {
          this.currentPage++;
          let arr = res.data;
          console.log(arr);
          this.data_customer_list1 = this.data_customer_list1.concat(arr);
        }
        // 加载状态结束
        this.loadEnd = false;
        // 数据全部加载完成
        if (this.data_customer_list1.length >= this.dataTotal) {
          this.finishEnd = true; //结束，显示我也是有底线的
        }
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
