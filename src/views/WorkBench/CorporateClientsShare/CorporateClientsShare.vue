<template>
  <div class="CorporateClientsShare">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '线索分享'">
      <ul class="time_frame" style="border-bottom: 0.001rem solid #e8e8e8">
        <li @click="tab(0)" :class="tabId == 0 ? 'cur' : ''">创建分享</li>
        <li @click="tab(1)" :class="tabId == 1 ? 'cur' : ''">分享记录</li>
      </ul>
      <div v-show="tabId == 0">
        <van-search
          v-model="search_txt"
          show-action
          placeholder="客户经理名称或编号"
          @search="getFollow"
        >
          <template #action>
            <div @click="getFollow">搜索</div>
          </template>
        </van-search>
        <van-list
          v-model="loading"
          :finished="finished"
          :offset="offset"
          finished-text="已加载完毕"
          @load="onLoad"
        >
          <!-- <van-button @click="checkAll">全行分享</van-button> -->
          <van-radio-group
            v-model="radio"
            direction="horizontal"
            icon-size="24"
            style="padding: 10px"
          >
            <van-radio name="1" @click="notCheckAll">指定客户经理</van-radio>
            <van-radio name="2" @click="checkAll">全行分享</van-radio>
          </van-radio-group>
          <van-checkbox-group v-model="shareList" ref="checkboxGroup">
            <van-checkbox
              v-for="(thisItem, index) in publicCustomerPool"
              :key="index"
              class="corporateList"
              :name="thisItem.id"
            >
              <p class="corporateManage">{{ thisItem.name }}</p></van-checkbox
            >
          </van-checkbox-group>
        </van-list>
        <div class="shareBtn">
          <van-button>分享</van-button>
        </div>
      </div>

      <van-list
        v-model="loading"
        :finished="finished"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoad"
        v-show="tabId == 1"
      >
        <ul
          class="corporateList"
          v-for="(thisItem, index) in publicCustomerPool1"
          :key="index"
        >
          <li>
            <p class="corporateManage">{{ thisItem.name }}</p>
            <p class="corporateManage">
              {{ thisItem.address }}
            </p>
          </li>
        </ul>
      </van-list>
      <van-overlay :show="isPopupVisibleScreen">
        <van-form @submit="getFollow" class="screenPopUp">
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
import { Dialog } from "vant";
export default {
  name: "CorporateClientsShare",
  components: {
    ChildNav,
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
      tabId: 0,
      level: "",
      levelName: "",
      newCustomerList: [],
      newCustomerList1: [],
      publicCustomerPool: [],
      publicCustomerPool1: [],
      star: "",
      star1: "",
      offset: 0, //滚动条与底部距离小于 offset 时触发load事件，默认300
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
      shareList: [],
      radio: "1",
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.tabId = this.$store.state.tabId || 0;
  },
  methods: {
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
      console.log(this.shareList);
    },
    notCheckAll() {
      this.$refs.checkboxGroup.toggleAll(false);
    },
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
      this.onLoad();
    },
    getFollow(type) {
      return new Promise((resolve, reject) => {
        let params = {
          page: this.pageNo,
          limit: this.pageSize,
          type: this.tabId,
          name: this.search_txt,
          industryType: this.industry_type.text,
          demandType: this.potentialNeedType,
          distanceRange: this.distanceRange,
        };
        this.$httpGet({
          url: "/api/publicCustomerPool/query",
          params: params,
        })
          .then((res) => {
            if (res.data.length > 0) {
              if (this.tabId == 0) {
                let result = {
                  total: res.count,
                  pageIndex: 1,
                  publicCustomerPool: res.data,
                };
                resolve(result);
              } else if (this.tabId == 1) {
                let result = {
                  total: res.count,
                  pageIndex: 1,
                  publicCustomerPool1: res.data,
                };
                resolve(result);
              }
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 滚动加载更多
    onLoad() {
      // debugger
      this.publicCustomerPool = [];
      this.loading = true;
      this.getFollow().then((res) => {
        if (this.tabId == 0) {
          this.publicCustomerPool = this.publicCustomerPool.concat(
            res.publicCustomerPool
          );
          if (this.publicCustomerPool.length >= res.total) {
            this.finished = true;
          } else {
            this.finished = false;
            this.pageNo = this.pageNo + 1;
          }
          // this.loading = false;
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
      });
      this.isPopupVisibleScreen = false;
    },
    getdic() {
      // 潜在客户需求
      this.$httpGet({
        url: "/dic/type/potential_need_type",
      }).then((res) => {
        // console.log(res.data);
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        console.log(transformDara);
        this.potential_need_type = transformDara;
      });
      // 所属行业
      this.$httpGet({
        url: "/dic/type/industry_type",
      }).then((res) => {
        // console.log(res.data);
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        console.log(transformDara);
        this.industry_typelist = transformDara;
      });
    },
    onSearch(val) {
      return new Promise((resolve, reject) => {
        console.log(val);
        let params = {
          page: this.pageNo,
          limit: this.pageSize,
          type: this.tabId,
          name: val,
        };
        this.$httpGet({
          url: "/api/publicCustomerPool/query",
          params: params,
        })
          .then((res) => {
            if (res.data.length > 0) {
              if (this.tabId == 0) {
                let result = {
                  total: res.count,
                  pageIndex: 1,
                  publicCustomerPool: res.data,
                };
                resolve(result);
              } else if (this.tabId == 1) {
                let result = {
                  total: res.count,
                  pageIndex: 1,
                  publicCustomerPool1: res.data,
                };
                resolve(result);
              }
            }
          })
          .catch((err) => {
            reject(err);
          });
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
        title: "你确定认领吗",
      })
        .then(() => {
          this.$httpPost({
            url: "/api/publicCustomers/joinCust",
            params: {
              customerId: code,
            },
          })
            .then((res) => {
              this.publicCustomerPool1 = [];
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
.shareBtn {
  display: flex;
  justify-content: center;
  margin: 10px;
}
.shareBtn .van-button--normal {
  background: rgb(61, 66, 94);
  color: #fff;
}
.van-radio--horizontal >>> .van-radio__icon{
  height: 24px!important;
}
.van-search {
  width: 100%;
}
.van-checkbox__icon {
  height: inherit;
}
/* 对公客户 */
.corporateList {
  padding: 10px;
  border-bottom: 1px solid #f8f8f8;
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
.CorporateClientsShare {
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
  margin: 5px 0px;
  width: 85%;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.corporateManage1 {
  width: 90%;
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
  padding: 1rem 1rem 0rem 1rem;
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
