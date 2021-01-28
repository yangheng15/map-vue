productCode<template>
  <div class="MyMedal">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '我的勋章'">
      <div class="customer_list">
        <ul v-for="(thisItem, index) in peasant_household" :key="index">
          <li>
            <img src="../../assets/User/medal.png" alt class="li_img" />
            <p>{{ thisItem.medalName }}</p>
            <p>{{ thisItem.createdTime | transform }}</p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
    <div v-if="typeCN == '上门拜访记录'">
      <!-- <ul class="time_vant">
        <li>
          <van-cell title="选择日期区间" :value="date" @click="show = true" />
          <van-calendar v-model="show" type="range" @confirm="onConfirm" />
        </li>
        <li class="time_search">
          <button>查询</button>
        </li>
      </ul> -->
      <router-link
        tag="div"
        :to="{
          name: 'MapAddressDisplay',
          query: {
            title: '地址',
            location: thisItem.location,
            custName: thisItem.realName,
          },
        }"
        class="Footprint_list"
        style="padding-top: 10px"
        v-for="(thisItem, index) in Footprintlist"
        :key="index"
      >
        <ul>
          <li>{{ thisItem.realName }}</li>
          <li>{{ thisItem.semTime | transform }}</li>
        </ul>
        <ul>
          <li>{{ thisItem.address }}</li>
          <li>
            <img style="width: 19px" src="../../assets/User/zuji.svg" alt />
          </li>
        </ul>
      </router-link>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import con1 from "../../assets/User/medal.png";
export default {
  name: "MyMedal",
  components: {
    ChildNav,
  },
  data() {
    return {
      typeCN: "",
      title: "",
      peasant_household: [],
      Footprintlist: [],
      show: false,
      show1: false,
      date: " ",
      type: "Wholeheartedly",
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    if (this.typeCN == "我的勋章") {
      this.getMedalOwner();
    } else if (this.typeCN == "上门拜访记录") {
      this.getCustomersRecords();
    }
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    onConfirm1(date1) {
      this.show1 = false;
      this.date1 = this.formatDate(date1);
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
    getMedalOwner() {
      this.$httpGet({
        url: "/api/medalOwner/query",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.peasant_household = res.data;
      });
    },
    getCustomersRecords() {
      this.$httpGet({
        url: "/api/semCustomersRecords/myTracks",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.Footprintlist = res.data;
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
*{
  font-size: 14px;
}
.MyMedal {
  margin-top: 46px;
}
.c-row-label {
  width: 40px;
}
.c-badge {
  color: #fff;
}

.triangle-up {
  width: 0;
  height: 0;
  border-top: 30px solid rgb(180, 180, 180);
  border-right: 30px solid transparent;
}
.customer_list ul {
  background: #fff;
  /* padding-top: 10px; */
  border-bottom: 1px solid #e8e8e8 !important;
}
.customer_list ul li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 48px;
  padding: 0px;
  padding-left: 10px;
}
.customer_list ul li p {
  width: 40%;
  margin: 0;
}

.customer_list ul li p:nth-child(even) {
  text-align: left;
  margin-left: 13px;
}
.customer_list ul li p:last-child {
  text-align: right;
  margin-left: 13px;
}
.customer_list .schedule_star img {
  width: 30px;
  vertical-align: middle;
}
.customer_list ul .li_img {
  width: 30px;
  /* margin-top: -10px; */
}
.time_vant {
  padding: 10px;
  display: flex;
}

.time_vant .time_search {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}
.time_vant .time_search button {
  width: 64px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: rgb(61, 66, 94);
  color: #fff;
  border-radius: 6px;
  border: none;
}
.time_vant li {
  margin: 0;
  border: 1px solid #e8e8e8;
  width: 70%;
}
.Footprint_list {
  margin: 8px;
  border-bottom: 1px solid #e8e8e8 !important;
}
.Footprint_list ul {
  display: flex;
  justify-content: space-between;
  margin: 8px;
}
@media screen and (max-width: 359px) {
  li,
  select,
  input,
  p,
  div {
    font-size: 13px;
  }
  .customer_list ul li {
    padding: 0px;
    height: 40px;
    padding-left: 10px;
  }
  .latest_tasks ul li {
    font-size: 13px;
  }
  .latest_tasks ul {
    margin: 0;
  }
  .customer_list ul .li_img {
    width: 24px;
  }
}
</style>
