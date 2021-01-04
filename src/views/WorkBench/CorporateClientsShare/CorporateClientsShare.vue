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
          @search="selectHandle"
        >
          <template #action>
            <div @click="selectHandle">搜索</div>
          </template>
        </van-search>
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <van-radio-group
            v-model="radio"
            direction="horizontal"
            icon-size="20"
            style="padding: 10px"
          >
            <van-radio name="0" @click="notCheckAll(0)">指定客户经理</van-radio>
            <van-radio name="1" @click="checkAll(1)">全行分享</van-radio>
          </van-radio-group>
          <div class="shareBtn">
            <van-button @click="shareClick">分享</van-button>
          </div>
        </div>
        <van-list
          v-model="loading"
          :finished="finished"
          :offset="offset"
          finished-text="已加载完毕"
          @load="onLoad"
          v-if="trueOrFalse"
        >
          <van-radio-group v-model="shareList">
            <van-radio
              v-for="(thisItem, index) in publicCustomerPool"
              :key="index"
              class="corporateList"
              :name="thisItem.id"
              @click="selectManager(thisItem.id)"
            >
              <p>
                {{ thisItem.name }}
              </p>
            </van-radio>
          </van-radio-group>
        </van-list>
      </div>

      <van-list
        v-model="loadEnd"
        :finished="finishEnd"
        :offset="offset"
        finished-text="已加载完毕"
        @load="onLoadList"
        v-show="tabId == 1"
      >
        <van-row
          class="corporateList"
          v-for="(thisItem, index) in shareRecords"
          :key="index"
        >
          <p class="corporateManage">{{ thisItem.name }}</p>
          <p class="corporateManage">
            {{ thisItem.time | transform }}
          </p>
        </van-row>
      </van-list>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import { Toast, Dialog } from "vant";
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
      shareRecords: [],
      star: "",
      star1: "",
      offset: 5, //滚动条与底部距离小于 offset 时触发load事件，默认300
      pageNo: 1, // 当前页码
      pageSize: 10, // 分页大小
      total: 0, // 查询总条数
      loading: false, // 滚动加载中
      loadEnd: false, // 滚动加载中
      finished: false, // 滚动加载完成
      finishEnd: false, // 滚动加载完成
      charityData: [],
      throttleTime: {
        nowTime: 0,
        lastTime: 0,
      },
      shareList: [],
      radio: "0",
      checkType: "0",
      checkList: [],
      code: "",
      currentPage: 1,
      pageSize1: 10,
      dataTotal: "",
      dataTotal1: "",
      trueOrFalse:true
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.code = this.$route.query.code;
  },
  methods: {
    shareClick() {
      this.$httpPost({
        url: "/api/CustomersShare/save",
        data: {
          customerCode: this.code,
          shareType: this.checkType,
          departMentUserId: this.checkList,
        },
      }).then((res) => {
        Toast({
          message: "分享成功",
          position: "middle",
        });
      });
    },
    selectManager(el) {
      this.checkList=el
    },
    checkAll(name) {
      this.checkType = name;
      this.checkList = "";
      this.trueOrFalse = false
      // this.$refs.checkboxGroup.toggleAll(true);
    },
    notCheckAll(name) {
      this.trueOrFalse = true
      this.checkType = name;
      // this.$refs.checkboxGroup.toggleAll(false);
    },
    tab(ev) {
      this.tabId = ev;
      // this.publicCustomerPool = [];
      // this.pageNo = 1;
      if (ev == 1) {
        this.onLoadList()
      };
    },
    selectHandle() {
      let params = {
        page: 1,
        limit: this.dataTotal1,
        realName: this.search_txt,
      };
      this.$httpGet({
        url: "/api/shareDepartmentUser/list",
        params: params,
      }).then((res) => {
        if (res.data) {
          this.publicCustomerPool = res.data;
        }
      });
    },
    // 滚动加载更多
    onLoad() {
      this.getFollow();
    },
    getFollow() {
      this.$httpGet({
        url: "/api/shareDepartmentUser/list",
        params: {
          page: this.pageNo, //页数
          limit: this.pageSize, //每页个数
        },
      }).then((res) => {
        this.dataTotal1 = res.count;
        if (this.dataTotal1 <= this.pageSize) {
          this.publicCustomerPool = res.data;
        } else {
          this.pageNo++;
          let arr = res.data;
          this.publicCustomerPool = this.publicCustomerPool.concat(arr);
        }
        this.loading = false;
        if (this.publicCustomerPool.length >= this.dataTotal1) {
          this.finished = true; //结束，显示我也是有底线的
        }
      });
    },

    onLoadList() {
      this.getMyClients();
    },
    getMyClients() {
      this.$httpGet({
        url: "/api/customersShareRecord/queryShareRecord",
        params: {
          customerCode: this.code,
          page: this.currentPage, //页数
          limit: this.pageSize1, //每页个数
        },
      }).then((res) => {
        this.dataTotal = res.count;
        //进行判断
        if (this.dataTotal <= this.pageSize1) {
          this.shareRecords = res.data;
        } else {
          this.currentPage++;
          let arr = res.data;
          this.shareRecords = this.shareRecords.concat(arr);
        }
        // 加载状态结束
        this.loadEnd = false;
        // 数据全部加载完成
        if (this.shareRecords.length >= this.dataTotal) {
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
.corporateList .corporateManage {
  margin: 5px 0px;
}
.shareBtn {
  display: flex;
  justify-content: center;
  margin: 10px;
  /* position: absolute;
  right: 0;
  top: 21%; */
}
.shareBtn .van-button--normal {
  background: rgb(61, 66, 94);
  color: #fff;
}
.van-radio--horizontal >>> .van-radio__icon {
  height: 24px !important;
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
.corporateList p {
  margin: 0;
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
  /* width: 30%; */
  border: none;
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
