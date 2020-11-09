<template>
  <div class="RecentContact">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '最近联系'">
      <van-search v-model="search_txt" placeholder="客户名称" @search="onSearch" />
      <div class="customer_list">
        <ul>
          <li v-for="(thisItem, index) in data_customer_list1" :key="index">
            <router-link
            v-if="thisItem.custBasicType==1"
              tag="p"
              :to="{ name: 'CustomerViewPresentation', query: { title: '客户视图',id:thisItem.custId } }"
              >{{ thisItem.custName }}</router-link
            >
            <router-link
            v-if="thisItem.potentialType==2"
              tag="p"
              :to="{ name: 'EditPotentialCustomers', query: { title: '潜在客户详情',id:thisItem.potentialId } }"
              >{{ thisItem.potentialName }}</router-link
            >
            <p v-if="thisItem.custBasicType==1"><a style="color:#000" :href="'tel:' + thisItem.telphone">电话：{{thisItem.telphone}}</a></p>
            <p v-if="thisItem.potentialType==2"><a style="color:#000" :href="'tel:' + thisItem.telphone">电话：{{thisItem.potentialTelphone}}</a></p>
            <p class="schedule_star">
              <van-rate
                v-model="thisItem.star"
                :size="14"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p v-if="thisItem.contactDays==0">今天联系过</p>
            <p v-if="thisItem.contactDays!==0">上次联系{{ thisItem.contactDays }}天前</p>
          </li>
        </ul>
      </div>
      <!-- <ul class="time_frame" style="border-bottom: 0.001rem solid #e8e8e8">
        <li @click="tab(0)" :class="tabId == 0 ? 'cur' : ''">三天内</li>
        <li @click="tab(1)" :class="tabId == 1 ? 'cur' : ''">一周内</li>
        <li @click="tab(2)" :class="tabId == 2 ? 'cur' : ''">两周内</li>
      </ul>
      <div v-show="tabId === 0" class="customer_list">
        <ul>
          <li v-for="(thisItem, index) in data_customer_list1" :key="index">
            <router-link
              tag="p"
              :to="{ name: 'ArticleViewBasic', query: { title: '客户视图' } }"
              >{{ thisItem.name }}</router-link
            >
            <p>{{ thisItem.text }}</p>
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
            <p>{{ thisItem.date }}</p>
          </li>
        </ul>
      </div>
      <div v-show="tabId === 1" class="customer_list">
        <ul>
          <li v-for="(thisItem, index) in data_customer_list2" :key="index">
            <router-link
              tag="p"
              :to="{ name: 'ArticleViewBasic', query: { title: '客户视图' } }"
              >{{ thisItem.name }}</router-link
            >
            <p>{{ thisItem.text }}</p>
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
            <p>{{ thisItem.date }}</p>
          </li>
        </ul>
      </div>
      <div v-show="tabId === 2" class="customer_list">
        <ul>
          <li v-for="(thisItem, index) in data_customer_list3" :key="index">
            <router-link
              tag="p"
              :to="{ name: 'ArticleViewBasic', query: { title: '客户视图' } }"
              >{{ thisItem.name }}</router-link
            >
            <p>{{ thisItem.text }}</p>
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
            <p>{{ thisItem.date }}</p>
          </li>
        </ul>
      </div> -->
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
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
      starNum:"",
      data_customer_list1: [],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.queryContact()
  },
  methods: {
    tab(ev) {
      this.tabId = ev;
    },
    queryContact() {
      this.$httpGet({
        url: "/api/contactByApp/query",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        console.log(res.data);
        this.data_customer_list1 = res.data;
//         this.data_customer_list1.forEach((el)=>{
//           console.log(el.star);
//           if(el.star){
// this.starNum = parseInt(el.star)
//           }
          
//         })
      });
    },
    onSearch(val){
       this.$httpGet({
        url: "/api/contactByApp/query",
        params: {
          limit: 10,
          page: 1,
          customerName:val
        },
      }).then((res) => {
        this.data_customer_list1 = res.data;
        this.data_customer_list1.forEach((el)=>{
          this.star = parseInt(el.star)
        })
      });
    }
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
.customer_list .schedule_star img {
  width: 1.2rem;
  vertical-align: middle;
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
