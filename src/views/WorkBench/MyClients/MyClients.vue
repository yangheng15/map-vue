<template>
  <div class="MyClients">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '我的客户'">
      <van-search
        v-model="search_txt"
        show-action
        placeholder="客户名称"
        @search="onSearch"
      >
        <template #action>
          <div @click="jumb()">
            筛选
          </div>
        </template>
      </van-search>
      <ul class="time_frame" style="border-bottom: 0.001rem solid #e8e8e8">
        <li @click="tab(0)" :class="tabId == 0 ? 'cur' : ''">网格客户</li>
        <li @click="tab(1)" :class="tabId == 1 ? 'cur' : ''">关注客户</li>
      </ul>
      <div v-show="tabId == 0" class="customer_list">
        <ul v-for="(thisItem, index) in newCustomerList" :key="index">
          <li class="newCustomerList">
            <router-link
              tag="p"
              :to="{ name: 'CustomerViewPresentation', query: { title: '客户视图',id: thisItem.id } }"
              >{{ thisItem.name }}</router-link
            >
            <p>
              <span v-if="!thisItem.business1" class="business1"
                >{{ thisItem.business1 }}存款</span
              >
              <span v-if="!thisItem.business2" class="business2"
                >{{ thisItem.business2 }}贷款</span
              >
              <span v-if="!thisItem.business3" class="business3"
                >{{ thisItem.business3 }}理财</span
              >
            </p>
            <p class="schedule_star">
              <van-rate
                v-model="star"
                :size="14"
                color="blue"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p style="color: #df0f0f">AUM:{{ thisItem.aum }}</p>
            <p style="color: #1badf2">
              {{ thisItem.level | dic_client_grade }}客户
            </p>
            <p>上次联系{{ thisItem.date }}</p>
            <p v-if="thisItem.isPpoint" style="color: #df0f0f">
              {{ thisItem.isPpoint ? "重点客户" : "普通客户" }}
            </p>
          </li>
        </ul>
      </div>
      <div v-show="tabId == 1" class="customer_list">
        <ul v-for="(thisItem, index) in newCustomerList1" :key="index">
          <li class="newCustomerList">
            <router-link
              tag="p"
              :to="{ name: 'CustomerViewPresentation', query: { title: '客户视图',id: thisItem.id } }"
              >{{ thisItem.name }}</router-link
            >
            <p>
              <span v-if="!thisItem.business1" class="business1"
                >{{ thisItem.business1 }}存款</span
              >
              <span v-if="!thisItem.business2" class="business2"
                >{{ thisItem.business2 }}贷款</span
              >
              <span v-if="!thisItem.business3" class="business3"
                >{{ thisItem.business3 }}理财</span
              >
            </p>
            <p class="schedule_star">
              <van-rate
                v-model="star1"
                :size="14"
                color="blue"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p style="color: #df0f0f">AUM:{{ thisItem.aum }}</p>
            <p style="color: #1badf2">
              {{ thisItem.level | dic_client_grade }}客户
            </p>
            <p>上次联系{{ thisItem.date }}</p>
            <p style="color: #df0f0f">
              {{ thisItem.isPpoint ? "重点客户" : "普通客户" }}
            </p>
            <p style="color: #1432e3" @click="showBack(thisItem.code)">移除</p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      <!-- <div v-show="isPopupVisibleScreen" class="isPopupVisibleSign">
        <div class="isPopupVisibleSign_content">
          <p class="pop_title">客户查询</p>
          <div class="pop_content">
            <p style="display: flex">
              <span style="display: inline-block; width: 15%; line-height: 2rem"
                >姓名：</span
              >
              <input
                style="
                  border: 0.05rem solid #bbb;
                  width: 85%;
                  padding: 0rem 0.5rem;
                  border-radius: 0.3rem;
                "
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 15%; line-height: 2rem"
                >编号：</span
              >
              <input
                style="
                  border: 0.05rem solid #bbb;
                  width: 85%;
                  padding: 0rem 0.5rem;
                  border-radius: 0.3rem;
                "
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 20%; line-height: 2rem"
                >AUM ：</span
              >
              <input
                style="
                  border: 0.05rem solid #bbb;
                  width: 80%;
                  padding: 0rem 0.5rem;
                  border-radius: 0.3rem;
                "
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 40%; line-height: 2rem"
                >是否重点客户：</span
              >
              <select
                style="
                  border: 0.05rem solid #bbb;
                  width: 60%;
                  padding: 0.3rem 0.5rem;
                  background: #fff;
                  border-radius: 0.3rem;
                  margin-top: 0.5rem;
                "
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 35%; line-height: 2rem"
                >所属客户群体：</span
              >
              <input
                style="
                  border: 0.05rem solid #bbb;
                  width: 65%;
                  padding: 0rem 0.5rem;
                  border-radius: 0.3rem;
                "
                type="text"
                placeholder="可多选"
              />
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 25%; line-height: 2rem"
                >客户等级：</span
              >
              <select
                style="
                  border: 0.05rem solid #bbb;
                  width: 75%;
                  padding: 0.3rem 0.5rem;
                  background: #fff;
                  border-radius: 0.3rem;
                  margin-top: 0.5rem;
                "
                name
                id
              >
                <option value="铂金">铂金</option>
              </select>
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 30%; line-height: 2rem"
                >推荐产品：</span
              >
              <input
                style="
                  border: 0.05rem solid #bbb;
                  width: 70%;
                  padding: 0rem 0.5rem;
                  border-radius: 0.3rem;
                "
                type="text"
                placeholder="选产品，找匹配客户"
              />
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 25%; line-height: 2rem"
                >最高学历：</span
              >
              <select
                style="
                  border: 0.05rem solid #bbb;
                  width: 75%;
                  padding: 0.3rem 0.5rem;
                  background: #fff;
                  border-radius: 0.3rem;
                  margin-top: 0.5rem;
                "
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 35%; line-height: 2rem"
                >性别：</span
              >
              <select
                style="
                  border: 0.05rem solid #bbb;
                  width: 35%;
                  padding: 0.3rem 0.5rem;
                  background: #fff;
                  border-radius: 0.3rem;
                  margin-right: 0.5rem;
                "
                name
                id
              >
                <option value="网格类型">男</option>
                <option value="自定义">女</option>
              </select>
              <span style="display: inline-block; width: 35%; line-height: 2rem"
                >年龄：</span
              >
              <input
                style="
                  border: 0.05rem solid #bbb;
                  width: 50%;
                  padding: 0rem 0.5rem;
                  border-radius: 0.3rem;
                "
                type="text"
                placeholder="单行输入"
              />
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 25%; line-height: 2rem"
                >职业类别：</span
              >
              <select
                style="
                  border: 0.05rem solid #bbb;
                  width: 75%;
                  padding: 0.3rem 0.5rem;
                  background: #fff;
                  border-radius: 0.3rem;
                  margin-top: 0.5rem;
                "
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 25%; line-height: 2rem"
                >所属机构：</span
              >
              <select
                style="
                  border: 0.05rem solid #bbb;
                  width: 75%;
                  padding: 0.3rem 0.5rem;
                  background: #fff;
                  border-radius: 0.3rem;
                  margin-top: 0.5rem;
                "
                name
                id
              >
                <option value="网格类型">全部</option>
                <option value="自定义">是</option>
                <option value="行政区域">否</option>
              </select>
            </p>
            <p style="display: flex">
              <span style="display: inline-block; width: 30%; line-height: 2rem"
                >所属网格：</span
              >
              <input
                style="
                  border: 0.05rem solid #bbb;
                  width: 85%;
                  padding: 0rem 0.5rem;
                  border-radius: 0.3rem;
                "
                type="text"
                placeholder="选产品，找匹配客户"
              />
            </p>
            <div style="padding: 0" class="save">
              <button @click="closePopupScreen()">查询</button>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import { Dialog } from "vant";
export default {
  name: "MyClients",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      value: 1,
      search_txt: "",
      date: "",
      date1: "",
      show: false,
      active: false,
      isPopupVisible: false,
      isPopupVisibleScreen: false,
      isPopupVisibleFamily: false,
      checkAllFlag: false,
      text: "本季度",
      tabId: 0,
      level: "",
      levelName: "",
      newCustomerList: [],
      newCustomerList1: [],
      star:"",
      star1:"",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name !== "ScreenMyCustomers") {
        vm.getMyClients();
      } else {
        if(vm.$store.state.tabId == 0) {
          vm.newCustomerList = vm.$store.state.screenMyCustomerData;
        }else {
          vm.newCustomerList1 = vm.$store.state.screenMyCustomerData;
        }
      }
    });
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.tabId = this.$store.state.tabId|| 0;
    // this.getMyClients();
  },
  methods: {
    jumb() {
      this.$store.commit('SETTABID', this.tabId);
      this.$router.push(`/ScreenMyCustomers/?title=筛选`)
    },
    selectData() {},
    tab(ev) {
      this.tabId = ev;
      if (ev == 1) {
        this.getFollow();
      }
    },
    getFollow() {
      this.$httpGet({
        url: "/api/customer/appOwnerClaim",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.newCustomerList1 = res.data;
        this.newCustomerList1.forEach((it) => {
          this.star1 = it.star;
        });
      });
    },
    getdic() {
      this.$httpGet({
        url: `/dic/dic_client_grade/${this.level}`,
      }).then((res) => {
        this.levelName = res.data.codeText;
      });
    },
    onSearch(val) {
      if (this.tabId == 0) {
        this.$httpGet({
          url: "/api/customer/appOwner",
          params: {
            limit: 10,
            page: 1,
            name: val,
          },
        }).then((res) => {
          this.newCustomerList = res.data;
          this.newCustomerList.forEach((it) => {
          this.star = it.star;
        });
        });
      } else {
        this.$httpGet({
          url: "/api/customer/appOwnerClaim",
          params: {
            limit: 10,
            page: 1,
            name: val,
          },
        }).then((res) => {
          this.newCustomerList1 = res.data;
          this.newCustomerList1.forEach((it) => {
          this.star1 = it.star;
        });
        });
      }
    },
    showPopupScreen() {
      this.isPopupVisibleScreen = true;
    },
    closePopupScreen() {
      this.isPopupVisibleScreen = false;
    },
    showBack(code) {
      Dialog.confirm({
        title: "你确定移除吗",
      })
        .then(() => {
          this.$httpDelete({
            url: "/api/customers/removeCust",
            params: {
              customerCodes: code,
            },
          })
            .then((res) => {
              this.getFollow();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    getMyClients() {
      this.$httpGet({
        url: "/api/customer/appOwner",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.newCustomerList = res.data;
        this.newCustomerList.forEach((it) => {
          this.star = it.star;
        });
        // if (this.level) {
        //   this.getdic();
        // }
      });
    },
  },
  computed: {
    customer_poolshi() {
      return this.$store.state.customer_poolshi;
    },
  },
  filters: {
    dic_client_grade(val) {
          return JSON.parse(localStorage.getItem('dic')).find(it => it.key === val).value;
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.van-checkbox__icon {
  height: 20px;
}
.marter span {
  margin: 0px 2px;
}
.van-search {
  width: 100%;
}
.MyClients {
  padding-top: 46px;
}
.time_frame {
  height: 2rem;
  line-height: 1.5rem;
  background-color: #fff;
  margin: 0.3rem;
  display: flex;
  padding: 0rem 1rem;
  justify-content: space-around;
}
.cur {
  color: #df0f0f;
  position: relative;
}
/* 下面是弹窗 */
.isPopupVisibleSign {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0rem;
  width: 100%;
  height: 100vh;
  padding: 0.5rem 0.5rem;
  background: rgba(193, 185, 185, 0.7);
}
.isPopupVisibleSign_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 77%;
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
}
.pop_content {
  padding: 1rem 1rem 1rem 1rem;
}
.pop_title {
  text-align: center;
  background: rgb(61, 66, 94);
  color: #fff;
  font-size: 1rem;
  height: 2.5em;
  margin: 0rem;
  line-height: 2.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

/* 上面是弹窗 */

.line {
  text-align: center;
  width: 5rem;
  margin: 0;
  line-height: 2rem;
}
.line span {
  display: inline-block;
  width: 3rem;
  height: 0.05rem;
  background: #bbb;
  text-align: center;
}
.bm-view {
  width: 100%;
  height: 78vh;
}
.c-row-label {
  width: 70px;
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
.newCustomerList .business1 {
  display: inline-block;
  border: 0.05rem solid #0fb38f;
  color: #0fb38f;
  padding: 0.1rem 0.3rem;
}
.newCustomerList .business2 {
  display: inline-block;
  border: 0.05rem solid #1432e3;
  color: #1432e3;
  padding: 0.1rem 0.3rem;
}
.newCustomerList .business3 {
  display: inline-block;
  border: 0.05rem solid #ecd14a;
  color: #ecd14a;
  padding: 0.1rem 0.3rem;
}
.checked {
  position: absolute;
  background: rgb(61, 66, 94);
  border: 1px solid rgb(61, 66, 94);
  color: #fff;
}
.cartItem li {
  width: 90%;
}
.save {
  /* background: #fff; */
  text-align: center;
  padding-bottom: 50px;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 6rem;
  border-radius: 0.4rem;
  height: 2rem;
}
@media screen and (max-width: 359px) {
  * {
    font-size: 13px;
  }
  .customer_list ul li p {
    width: 57%;
  }
  .customer_list ul li p:nth-child(even) {
    width: 43%;
  }

  .end_line {
    font-size: 0.8rem;
  }
  .pop_title {
    font-size: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .pop_content {
    padding: 0.5rem;
  }
  .save {
    padding-bottom: 2rem;
  }
}
</style>
