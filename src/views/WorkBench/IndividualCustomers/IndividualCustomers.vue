<template>
  <div class="CorporateClients">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '个人客户'">
      <div class="searchFixed">
        <van-search
          v-model="search_txt"
          show-action
          placeholder="客户名称"
          @search="selectHandle"
        >
          <template #action>
            <div @click="selectHandle">搜索</div>
          </template>
        </van-search>
        <van-button @click="popUp()" type="default">高级筛选</van-button>
      </div>

      <ul class="time_frame" style="border-bottom: 0.001rem solid #e8e8e8">
        <li @click="tab(1)" :class="tabId == 1 ? 'cur' : ''">我的客户</li>
        <li @click="tab(0)" :class="tabId == 0 ? 'cur' : ''">客户池</li>
      </ul>
      <van-list
        v-model="loading"
        :finished="finished"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoad"
        v-show="tabId == 0"
      >
        <ul
          class="corporateList"
          v-for="(thisItem, index) in publicCustomerPool"
          :key="index"
        >
          <li>
            <div class="corporateFlex">
              <router-link
                tag="li"
                :to="{
                  name: 'IndividualCustomersDetails',
                  query: { title: '客户池客户详情', id: thisItem.id },
                }"
                class="corporateManage1"
                >{{ thisItem.name }}</router-link
              >
              <p style="color: #1432e3" @click="showBack(thisItem.id)">认领</p>
            </div>
            <div class="corporateFlex">
              <p style="display: flex; align-items: center">
                {{ thisItem.address }}
              </p>
            </div>
          </li>
        </ul>
      </van-list>
      <van-list
        v-model="loadEnd"
        :finished="finishEnd"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoadList"
        v-show="tabId == 1"
      >
        <ul
          class="corporateList"
          v-for="(thisItem, index) in publicCustomerPool1"
          :key="index"
        >
          <router-link
            tag="li"
            :to="{
              name: 'EditIndividualCustomersRecord',
              query: { title: '个人客户详情', id: thisItem.id,taskUpdateFlag: true, },
            }"
          >
            <div class="corporateFlex">
              <p class="corporateManage">{{ thisItem.name }}</p>
              <van-tag
                v-if="thisItem.sourceFlag"
                plain
                color="#7232dd"
                size="medium"
                >{{ thisItem.sourceTxt }}
              </van-tag>
              <p>{{ thisItem.marketingIntervalDay }}天未营销</p>
            </div>
            <div class="corporateFlex">
              <p class="corporateManageAddress">
                {{ thisItem.address }}
              </p>
              <van-tag plain color="#000" size="medium"
                >{{ thisItem.statusMsg }}
              </van-tag>
            </div>
          </router-link>
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
              name: 'IndividualCustomersRecord',
              query: { title: '个人客户建档' },
            }"
            >+</router-link
          >
        </div>
      </van-list>
      <van-overlay :show="isPopupVisibleScreen">
        <van-form @submit="selectHandle" class="screenPopUp">
          <van-icon
            class="closeBtn"
            size="20"
            name="cross"
            @click="isPopupVisibleScreen = false"
          />
          <h1 class="popUpTitle">客户查询</h1>
          <!-- <van-field
            v-model="customerGroup"
            name="所属客户群体"
            label="所属客户群体"
            placeholder="所属客户群体"
          /> -->
          <van-field
            readonly
            clickable
            name="picker"
            :value="industry_type.text"
            label="行业类型"
            placeholder="点击选择行业类型"
            @click="showindustry_type = true"
          />
          <van-popup v-model="showindustry_type" position="bottom">
            <van-picker
              show-toolbar
              :columns="industry_typelist"
              @confirm="onindustry_type"
              @cancel="showindustry_type = false"
            />
          </van-popup>
          <van-field name="checkboxGroup" label="需求类型">
            <template #input>
              <van-checkbox-group
                v-model="potentialNeedType"
                direction="horizontal"
              >
                <van-checkbox
                  v-for="(item, index) in potential_need_type"
                  :key="index"
                  :name="item.index"
                  checked-color="rgb(61, 66, 94)"
                  >{{ item.text }}</van-checkbox
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
import { Dialog, Toast } from "vant";
export default {
  name: "CorporateClients",
  components: {
    ChildNav,
  },
  watch: {
    isPopupVisibleScreen(newVal) {
      if (!newVal) {
        this.distanceRange = "";
        this.industry_type = "";
        this.potentialNeedType = [];
      }
    },
  },
  data() {
    return {
      title: "",
      typeCN: "",
      potential_need_type: [],
      customerGroup: "",
      distanceRange: "",
      potentialNeedType: [],
      industry_type: "",
      industry_typelist: [],
      showindustry_type: false,
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
      tabId: 1,
      level: "",
      levelName: "",
      newCustomerList: [],
      newCustomerList1: [],
      publicCustomerPool: [],
      publicCustomerPool1: [],
      star: "",
      star1: "",
      offset: 5, //滚动条与底部距离小于 offset 时触发load事件，默认300
      pageNo: 1, // 当前页码
      pageSize: 10, // 分页大小
      total: 0, // 查询总条数
      loading: false, // 滚动加载中
      finished: false, // 滚动加载完成
      charityData: [],
      throttleTime: {
        nowTime: 0,
        lastTime: 0,
      },
      positionArr: "",
      currentPage: 1,
      pageSize1: 10,
      dataTotal: "",
      finishEnd: false, // 滚动加载完成
      loadEnd: false, // 滚动加载中
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.tabId = this.$store.state.tabId || 0;
  },
  methods: {
    onindustry_type(value) {
      this.industry_type = value;
      this.showindustry_type = false;
    },
    popUp() {
      this.isPopupVisibleScreen = true;
      this.getdic();
    },
    tab(ev) {
      this.tabId = ev;
      this.publicCustomerPool = [];
      this.publicCustomerPool1 = [];
      this.finished = false;
      this.pageNo = 1;
      this.onLoad();
      if (ev == 1) {
        this.currentPage = 1;
        this.onLoadList();
      }
    },
    selectHandle() {
      this.pageNo = 1;
      if (this.distanceRange) {
        var u = navigator.userAgent;
        //Android终端
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
        //iOS终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isAndroid) {
          if (window.android.getLocation() != false) {
            this.positionArr = window.android.getLocation();
            // return;
          }
        }
        if (isiOS) {
          if (window.prompt("getLocation") != false) {
            this.positionArr = window.prompt("getLocation");
            // return;
          }
        }
      }
      let params = {
        page: this.pageNo,
        limit: this.pageSize,
        type: 2,
        name: this.search_txt,
        industryType: this.industry_type.index,
        demandType: this.potentialNeedType.toString(),
        distanceRange: this.distanceRange,
        location: this.positionArr,
      };
      if (this.tabId == 0) {
        this.$httpGet({
          url: "/api/customer/queryCustmoerPool",
          params: params,
        }).then((res) => {
          if (res.data) {
            this.publicCustomerPool = res.data;
          }
          this.isPopupVisibleScreen = false;
        });
      } else if (this.tabId == 1) {
        this.$httpGet({
          url: "/api/customer/queryMyCustmoer",
          params: params,
        }).then((res) => {
          if (res.data) {
            this.publicCustomerPool1 = res.data;
          }
          this.isPopupVisibleScreen = false;
        });
      }
    },
    getFollow() {
      return new Promise((resolve, reject) => {
        let params = {
          page: this.pageNo,
          limit: this.pageSize,
          type: 2,
        };
        this.$httpGet({
          url: "/api/customer/queryCustmoerPool",
          params: params,
        })
          .then((res) => {
            if (res.data) {
              if (this.tabId == 0) {
                let result = {
                  total: res.count,
                  pageIndex: 1,
                  publicCustomerPool: res.data,
                };
                resolve(result);
              }
              // else if (this.tabId == 1) {
              //   let result = {
              //     total: res.count,
              //     pageIndex: 1,
              //     publicCustomerPool1: res.data,
              //   };
              //   resolve(result);
              // }
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 滚动加载更多
    onLoad() {
      this.loading = true;
      this.getFollow().then((res) => {
        if (this.tabId == 0) {
          this.publicCustomerPool = this.publicCustomerPool.concat(
            res.publicCustomerPool
          );
          this.loading = false;
          if (this.publicCustomerPool.length >= res.total) {
            this.finished = true;
          } else {
            this.finished = false;
            this.pageNo = this.pageNo + 1;
          }
        } else if (this.tabId == 1) {
          this.publicCustomerPool1 = this.publicCustomerPool1.concat(
            res.publicCustomerPool1
          );
          if (this.publicCustomerPool1.length >= res.total) {
            this.finished = true;
          } else {
            this.finished = false;
            this.pageNo = this.pageNo + 1;
          }
        }
        this.loading = false;
      });
      this.isPopupVisibleScreen = false;
    },
    onLoadList() {
      this.getCustomerList();
    },
    getCustomerList() {
      this.$httpGet({
        url: "/api/customer/queryMyCustmoer",
        params: {
          // customerCode: this.code,
          page: this.currentPage, //页数
          limit: this.pageSize1, //每页个数
          type: 2,
        },
      }).then((res) => {
        this.dataTotal = res.count;
        //进行判断
        if (this.dataTotal <= this.pageSize1) {
          this.publicCustomerPool1 = res.data;
        } else {
          this.currentPage++;
          let arr = res.data;
          this.publicCustomerPool1 = this.publicCustomerPool1.concat(arr);
        }
        // 加载状态结束
        this.loadEnd = false;
        // 数据全部加载完成
        if (this.publicCustomerPool1.length >= this.dataTotal) {
          this.finishEnd = true; //结束，显示我也是有底线的
        }
      });
    },
    getdic() {
      // 潜在客户需求
      this.$httpGet({
        url: "/dic/type/task_product_type",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.potential_need_type = transformDara;
      });
      // 所属行业
      this.$httpGet({
        url: "/dic/type/industry_type",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.industry_typelist = transformDara;
      });
    },
    showPopupScreen() {
      this.isPopupVisibleScreen = true;
    },
    closePopupScreen() {
      this.isPopupVisibleScreen = false;
    },
    showBack(code) {
      Dialog.confirm({
        title: "你确定认领吗？",
      })
        .then(() => {
          this.$httpPost({
            url: "/api/publicCustomers/joinCust",
            params: {
              customerId: code,
            },
          })
            .then((res) => {
              Toast({
                message: "认领成功",
                position: "middle",
              });
              this.publicCustomerPool = [];
              this.pageNo = 1;
              this.onLoad();
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
      const findWill = JSON.parse(localStorage.getItem("dic")).find(
        (it) => it.key === val
      );
      return findWill ? findWill.value : "";
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.searchFixed {
  display: flex;
  align-items: center;
  background: #fff;
  position: fixed;
  top: 46px;
  left: 0px;
  width: 100%;
  z-index: 1;
}
.van-search {
  width: 80%;
}
.van-checkbox--horizontal >>> .van-checkbox__icon {
  height: 24px !important;
}
/* 对公客户 */
.corporateList {
  padding: 10px;
  border-bottom: 1px solid #f8f8f8;
  position: relative;
}
.corporateFlex {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}
.corporateFlex p {
  margin: 5px 0px;
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
.closeBtn {
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
.CorporateClients {
  padding-top: 46px;
}
.van-button--normal {
  height: 30px;
  width: 30%;
  border: none;
  border-radius: 8px;
}
.van-checkbox--horizontal {
  margin-bottom: 6px;
}
.corporateManage {
  width: 40%;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.corporateManage1 {
  width: 70%;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.corporateManageAddress {
  width: 45%;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
/* 对公客户 */
.time_frame {
  height: 2rem;
  line-height: 1.5rem;
  background-color: #fff;
  /* margin: 0.3rem; */
  display: flex;
  padding: 54px 1rem 0rem 1rem;
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
.van-cell >>> .van-field__label {
  width: 8rem;
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
  .van-cell >>> .van-field__label {
    width: 7rem;
  }
}
</style>
