<template>
  <div class="EditMarketingRecord">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='营销记录'">
      <ul class="mission_details">
        <li>
          客户：北京卓越科技有限公司
          <img src="../../assets/WorkBench/location.svg" alt />
        </li>
        <li>方式：上门</li>
        <li>营销产品：企业贷</li>
        <li>执行时间：2020-08-30 9:00</li>
      </ul>
      <div>
        <ul class="tabList">
          <li @click="tab(0)" :class="tabId==0?'cur':'ordinary'">结果</li>
          <li @click="tab(1)" :class="tabId==1?'cur':'ordinary'">影像</li>
          <li @click="tab(2)" :class="tabId==2?'cur':'ordinary'">竞争对手</li>
        </ul>
        <div v-show="tabId===0" style="background:#fff;">
          <van-field
            readonly
            clickable
            name="picker"
            :value="result_txt"
            label="结果"
            placeholder="点击选择结果"
            @click="showResult = true"
          />
          <van-popup v-model="showResult" position="bottom">
            <van-picker
              show-toolbar
              :columns="columnsResult"
              @confirm="onResult"
              @cancel="showResult = false"
            />
          </van-popup>
          <van-field
            readonly
            clickable
            name="picker"
            :value="Customer_intention_txt"
            label="客户意向"
            placeholder="点击选择客户意向"
            @click="showCustomer_intention = true"
          />
          <van-popup v-model="showCustomer_intention" position="bottom">
            <van-picker
              show-toolbar
              :columns="columnsCustomer_intention"
              @confirm="onCustomer_intention"
              @cancel="showCustomer_intention = false"
            />
          </van-popup>
          <van-field
            v-model="actual_demand"
            rows="2"
            autosize
            label="实际需求"
            type="textarea"
            maxlength="50"
            placeholder="请填写客户实际需要的产品名称"
            show-word-limit
          />
          <van-field
            v-model="remarks"
            rows="2"
            autosize
            label="备注"
            type="textarea"
            maxlength="50"
            placeholder="多行输入"
            show-word-limit
          />
          <van-field
            v-model="customer_feedback"
            rows="2"
            autosize
            label="客户反馈意见"
            type="textarea"
            maxlength="50"
            placeholder="请输入客户反馈意见"
            show-word-limit
          />
          <div class="save">
            <van-button type="primary" block @click="prev()">保存</van-button>
          </div>
        </div>
        <div v-show="tabId===1" style="background:#fff;">
          <div style="padding:10px;background:#fff;display: flex;flex-wrap: wrap;">
            <van-image width="80px" height="80px" fit="contain" :src="picture" />
            <van-image width="80px" height="80px" fit="contain" :src="picture" />
            <van-uploader :after-read="afterRead" />
          </div>
          <div class="save" style="margin-top:20px">
            <van-button type="primary" block @click="prev()">保存</van-button>
          </div>
        </div>
        <div v-show="tabId===2" style="background:#fff;height:70vh">
          <van-field
            v-model="competitor"
            name="对手名称："
            label="对手名称："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写对手名称' }]"
          />
          <van-field
            v-model="competitive_products"
            name="对手产品："
            label="对手产品："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写对手产品' }]"
          />
          <van-field
            v-model="product_rate"
            name="产品利率："
            label="产品利率："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写产品利率' }]"
          />
          <div class="save" style="margin-top:20px">
            <van-button type="primary" block @click="prev()">保存</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import img from "../../assets/WorkBench/qiyedai.jpg";
export default {
  data() {
    return {
      tabId: 0,
      token: "",
      content: "",
      show1: false,
      show2: false,
      show3: false,
      value1: "",
      value2: "",
      value3: "",
      result_txt: "成功",
      columnsResult: ["成功", "未成功", "失败"],
      showResult: false,
      Customer_intention_txt: "强",
      columnsCustomer_intention: [
        "强",
        "一般",
        "无",
        "已有他行产品",
        "其他需求",
        "直接拒绝",
        "同意采集（资料采集类任务）",
      ],
      showCustomer_intention: false,
      actual_demand: "希望获得利益最大化",
      remarks: "希望获得利益最大化",
      customer_feedback: "希望更加着重为客户考虑",
      competitor: "微利贷",
      competitive_products: "微利贷",
      product_rate: "0.23%",
      picture: img,
    };
  },
  components: {
    ChildNav,
  },
  created() {
    this.typeCN = this.$route.query.title;
    if (localStorage.getItem("indexTabId")) {
      this.tabId = Number(localStorage.getItem("indexTabId"));
      localStorage.removeItem("indexTabId");
    }
    this.token = localStorage.getItem("token");
    this.title = this.$route.query.title;
    this.height = 400 * (document.documentElement.clientWidth / 750) + "";
  },
  updated() {},
  methods: {
    prev() {
      this.$router.go(-1);
    },
    tab(ev) {
      this.tabId = ev;
      // localStorage.setItem("indexTabId", this.tabId);
    },
    openValue1() {
      this.show1 = !this.show1;
    },
    openValue2() {
      this.show2 = !this.show2;
    },
    openValue3() {
      this.show3 = !this.show3;
    },
    onResult(value) {
      this.result_txt = value;
      this.showResult = false;
    },
    onCustomer_intention(value) {
      this.Customer_intention_txt = value;
      this.showCustomer_intention = false;
    },
    afterRead(file) {
      console.log(file);
    },
  },
};
</script>
<style scoped>
.EditMarketingRecord {
  padding-top: 46px;
}
.mission_details {
  background: #fff;
  padding-top: 10px;
  position: relative;
}
.mission_details li {
  margin-bottom: 10px;
  padding-left: 10px;
}
.mission_details li img {
  width: 20px;
  vertical-align: bottom;
  margin: 0px 0px 0px 20px;
}
.mission_details li:last-child {
  padding-bottom: 10px;
}
.tabList {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  width: 100%;
  line-height: 40px;
  font-size: 14px;
  background: #f5f5f5 !important;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.cur {
  color: #df0f0f;
  position: relative;
}
.cur::after {
  position: absolute;
  top: 80%;
  content: "";
  left: 0%;
  width: 97%;
  height: 1px;
  background: #df0f0f;
}
.save {
  display: flex;
  justify-content: center;
  padding: 10px 0px;
}
.save button {
  border: 1px solid #bbb;
  background: rgb(61, 66, 94);
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  border-radius: 6px;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  li,
  select,
  input,
  p,
  div,
  span {
    font-size: 13px;
  }
  .cur {
    font-size: 13px;
  }
}
</style>
