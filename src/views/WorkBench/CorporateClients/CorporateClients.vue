<template>
  <div class="CorporateClients">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '对公客户'">
      <van-search
        v-model="search_txt"
        show-action
        placeholder="客户名称"
        @search="onSearch"
      >
        <template #action>
          <div @click="popUp()">筛选</div>
        </template>
      </van-search>
      <ul class="time_frame" style="border-bottom: 0.001rem solid #e8e8e8">
        <li @click="tab(0)" :class="tabId == 0 ? 'cur' : ''">我的客户</li>
        <li @click="tab(1)" :class="tabId == 1 ? 'cur' : ''">客户池</li>
      </ul>
      <div v-show="tabId == 0">
        <ul
          class="corporateList"
          v-for="(thisItem, index) in newCustomerList"
          :key="index"
        >
          <li>
            <div class="corporateFlex">
              <p>北京卓越联腾科技有限公司</p>
              <van-tag plain color="#101010" size="medium">来自分享 </van-tag>
              <p>天内营销</p>
            </div>
            <div class="corporateFlex">
              <p style="display: flex; align-items: center">
                详细地址
                <img
                  src="../../../assets/newCorporate/locationImg.svg"
                  alt=""
                />
              </p>
              <p>上次成单：2020-10-5</p>
            </div>
          </li>
        </ul>
        <div
          style="
            margin-left: 85%;
            position: fixed !important;
            float: right;
            z-index: 1;
            align-items: right;
            bottom: 50px;
            right: 5%;
          "
        >
          <router-link
            class="add_record"
            tag="span"
            :to="{
              name: 'PublicCustomerRecord',
              query: { title: '对公客户建档' },
            }"
            >+</router-link
          >
        </div>
      </div>
      <div v-show="tabId == 1">
        <ul
          class="corporateList"
          v-for="(thisItem, index) in newCustomerList1"
          :key="index"
        >
          <li>
            <div class="corporateFlex">
              <p>北京卓越联腾科技有限公司</p>
              <p style="color: #1432e3" @click="showBack(thisItem.code)">
                认领
              </p>
            </div>
            <div class="corporateFlex">
              <p style="display: flex; align-items: center">
                详细地址
                <img
                  src="../../../assets/newCorporate/locationImg.svg"
                  alt=""
                />
              </p>
            </div>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>

      <van-overlay :show="isPopupVisibleScreen">
        <van-form @submit="onSubmit" class="screenPopUp">
          <van-icon class="closeBtn" size="20" name="cross" @click="isPopupVisibleScreen=false"/>
          <h1 class="popUpTitle">客户查询</h1>
          <van-field
            v-model="customerGroup"
            name="所属客户群体"
            label="所属客户群体"
            placeholder="所属客户群体"
          />
          <van-field
            readonly
            clickable
            name="picker"
            :value="xuanzeqi"
            label="行业类型"
            placeholder="点击选择行业类型"
            @click="showxuanzeqi = true"
          />
          <van-popup v-model="showxuanzeqi" position="bottom">
            <van-picker
              show-toolbar
              :columns="xuanzeqilist"
              @confirm="onxuanzeqi"
              @cancel="showxuanzeqi = false"
            />
          </van-popup>
          <van-field name="checkboxGroup" label="需求类型">
            <template #input>
              <van-checkbox-group v-model="duanxuan" direction="horizontal">
                <van-checkbox name="1" checked-color="rgb(61, 66, 94)"
                  >存款</van-checkbox
                >
                <van-checkbox name="2" checked-color="rgb(61, 66, 94)"
                  >贷款</van-checkbox
                >
                <van-checkbox name="3" checked-color="rgb(61, 66, 94)"
                  >理财</van-checkbox
                >
                <van-checkbox name="4" checked-color="rgb(61, 66, 94)"
                  >支付工具</van-checkbox
                >
                <van-checkbox name="5" checked-color="rgb(61, 66, 94)"
                  >网银</van-checkbox
                >
                <van-checkbox name="6" checked-color="rgb(61, 66, 94)"
                  >手机银行</van-checkbox
                >
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field
            v-model="distanceRange"
            name="距离范围(公里)"
            label="距离范围（公里）"
            placeholder="距离范围（公里）"
          />
          <div style="padding: 16px; display: flex; justify-content: center">
            <van-button
              color=" rgb(61, 66, 94)"
              type="info"
              native-type="submit"
            >
              查询
            </van-button>
          </div>
        </van-form>
      </van-overlay>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import { Dialog } from "vant";
export default {
  name: "CorporateClients",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      customerGroup: "",
      distanceRange: "",
      duanxuan: [],
      xuanzeqi: "",
      xuanzeqilist: [
        "所属行业",
        "传媒",
        "电子和其他电动设备",
        "房地产",
        "服饰和纺织品",
      ],
      showxuanzeqi: false,
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
      star: "",
      star1: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(from);
      if (from.name !== "ScreenMyCustomers") {
        vm.getMyClients();
      } else {
        console.log(vm.$store.state.screenMyCustomerData);
        if (vm.$store.state.tabId == 0) {
          vm.newCustomerList = vm.$store.state.screenMyCustomerData;
        } else {
          vm.newCustomerList1 = vm.$store.state.screenMyCustomerData;
        }
      }
    });
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.tabId = this.$store.state.tabId || 0;
    // this.getMyClients();
  },
  methods: {
    onSubmit() {
      this.isPopupVisibleScreen = false;
      console.log(1);
    },
    onxuanzeqi(value) {
      this.xuanzeqi = value;
      this.showxuanzeqi = false;
    },
    popUp() {
      this.isPopupVisibleScreen = true;
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
        // console.log(res.data);
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
        // console.log(res.data);
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
          // console.log(res.data);
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
          // console.log(res.data);
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
        // console.log(res.data);
        this.newCustomerList = res.data;
        this.newCustomerList.forEach((it) => {
          this.star = it.star;
        });
        // // console.log(this.level);
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
      const findWill = JSON.parse(localStorage.getItem("dic")).find(
        (it) => it.key === val
      );
      console.log(findWill);
      return findWill ? findWill.value : "";
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.van-checkbox__icon {
  height: inherit;
}
/* 对公客户 */
.corporateList {
  padding: 10px;
  border-bottom: 1px solid #f8f8f8;
}
.corporateFlex {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.corporateFlex p {
  margin: 5px;
}
.add_record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: rgb(61, 66, 94);
  color: #fff;
  font-size: 16px;
}
.marter span {
  margin: 0px 2px;
}
.screenPopUp {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
}
.closeBtn{
  position: absolute;
  right: 10px;
  top: 10px;
}
.popUpTitle {
  padding: 10px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: rgb(77, 75, 75);
}
.van-search {
  width: 100%;
}
.CorporateClients {
  padding-top: 46px;
}
.van-button--normal {
  height: 30px;
  width: 30%;
  border-radius: 8px;
}
.van-checkbox--horizontal {
  margin-bottom: 6px;
}
/* 对公客户 */
.time_frame {
  height: 2rem;
  line-height: 1.5rem;
  background-color: #fff;
  /* margin: 0.3rem; */
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
