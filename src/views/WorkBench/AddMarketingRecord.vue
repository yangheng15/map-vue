<template>
  <div class="AddMarketingRecord">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '添加营销记录'">
      <ul class="mission_details">
        <li>
          客户：{{ custName }}
          <!-- <img src="../../assets/WorkBench/location.svg" alt /> -->
        </li>
        <!-- <li>方式：上门</li> -->
        <li v-if="productName">营销产品：{{ productName }}</li>
        <li v-if="productName">执行时间：2020-08-30 9:00</li>
      </ul>
      <div>
        <ul class="tabList">
          <li @click="tab(0)" :class="tabId == 0 ? 'cur' : 'ordinary'">结果</li>
          <li @click="tab(1)" :class="tabId == 1 ? 'cur' : 'ordinary'">影像</li>
          <li @click="tab(2)" :class="tabId == 2 ? 'cur' : 'ordinary'">
            竞争对手
          </li>
        </ul>
        <div v-show="tabId === 0" style="background: #fff">
          <van-field
            readonly
            clickable
            required
            name="picker"
            :value="result_txt.text"
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
            required
            name="picker"
            :value="Customer_intention_txt.text"
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
            readonly
            clickable
            required
            name="picker"
            :value="Marketing_methods_txt.text"
            label="方式"
            placeholder="点击选择方式"
            @click="showMarketing_methods = true"
          />
          <van-popup v-model="showMarketing_methods" position="bottom">
            <van-picker
              show-toolbar
              :columns="columnsMarketing_methods"
              @confirm="onMarketing_methods"
              @cancel="showMarketing_methods = false"
            />
          </van-popup>
          <van-field
            v-model="market_amount"
            rows="2"
            autosize
            required
            label="金额（万元）"
            type="number"
            placeholder="请填写营销金额"
            show-word-limit
          />
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
          <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="currentDate | transform"
            label="到期日期"
            placeholder="点击选择时间"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
              type="date"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
          <div class="save">
            <van-button type="primary" block @click="addResult()"
              >保存</van-button
            >
          </div>
        </div>
        <div v-show="tabId === 1" style="background: #fff">
          <div style="padding: 10px; background: #fff">
            <van-uploader :after-read="afterRead" v-model="fileList" multiple />
          </div>
          <div class="save" style="margin-top: 20px">
            <van-button type="primary" block @click="addPicture()"
              >保存</van-button
            >
          </div>
        </div>
        <div v-show="tabId === 2" style="background: #fff; height: 70vh">
          <van-field
            v-model="competitor"
            required
            name="对手名称："
            label="对手名称："
            placeholder="请填写对手名称"
          />
          <van-field
            v-model="competitive_products"
            required
            name="对手产品："
            label="对手产品："
            placeholder="请填写对手产品"
          />
          <van-field
            v-model="product_rate"
            required
            name="产品利率："
            label="产品利率："
            placeholder="请填写产品利率（数字）"
          />
          <div class="save" style="margin-top: 20px">
            <van-button type="primary" block @click="addCompetitor()"
              >保存</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import { Toast, Dialog } from "vant";
import qs from "qs";
export default {
  data() {
    return {
      tabId: 0,
      result_txt: "",
      columnsResult: [
        { index: 0, text: "失败" },
        { index: 1, text: "成功" },
        { index: 2, text: "未成功" },
      ],
      showResult: false,
      Customer_intention_txt: "",
      columnsCustomer_intention: [],
      showCustomer_intention: false,
      Marketing_methods_txt: "",
      columnsMarketing_methods: [
        { index: 0, text: "上门" },
        { index: 1, text: "电话" },
        { index: 2, text: "网络" },
      ],
      showMarketing_methods: false,
      actual_demand: "",
      market_amount: "",
      remarks: "",
      customer_feedback: "",
      competitor: "",
      competitive_products: "",
      product_rate: "",
      customerCode: "",
      gridCode: "",
      productCode: "",
      productName: "",
      custName: "",
      id: "",
      resultCode: "",
      fileList: [],
      pictureId: [],
      currentDate: "",
      showPicker: false,
      currentDate1: "",
    };
  },
  components: {
    ChildNav,
  },
  // beforeRouteLeave(to, from, next) {
  //   // console.log(to);
  //   // console.log(from);
  //   // console.log(next);
  //   // console.log(this);
  //   // if (this.productCode == "" && this.gridCode == "") {
  //   //   console.log(111111111111111111111111111111111111);
  //   //     this.$router.push("/EditPublicCustomerRecord");
  //   //   }
  // },
  created() {
    this.typeCN = this.$route.query.title;
    this.customerCode = this.$route.query.customerCode;
    this.gridCode = this.$route.query.gridCode;
    this.productCode = this.$route.query.productCode;
    this.productName = this.$route.query.productName;
    this.custName = this.$route.query.custName;
    this.id = this.$route.query.id;
    this.taskId = this.$route.query.taskId;
    this.dic_nation();
  },
  updated() {},
  methods: {
    onConfirm(time) {
      // this.currentDate = `${time.getFullYear()}-${
      //   time.getMonth() + 1
      // }-${time.getDate()}`;
      this.currentDate = time;
      this.currentDate1 = time;
      this.showPicker = false;
    },
    dic_nation() {
      // 客户意向
      this.$httpGet({
        url: "/dic/type/dic_client_will",
      }).then((res) => {
        // console.log(res.data);
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        console.log(transformDara);
        this.columnsCustomer_intention = transformDara;
      });
    },
    prev() {
      this.$router.go(-1);
    },
    tab(ev) {
      if (ev != 0) {
        if (!this.resultCode) {
          Toast({
            message: "请先添加结果",
            position: "middle",
          });
          return;
        }
      }
      this.tabId = ev;
    },
    addResult() {
      this.$httpPost({
        url: "/api/customersRecords/appAddResult",
        data: {
          customerCode: this.customerCode,
          griddingCode: this.gridCode,
          products: this.productCode,
          taskId: this.taskId,
          isSucc: this.result_txt.index,
          intention: this.Customer_intention_txt.index,
          semType: this.Marketing_methods_txt.index,
          actualDemand: this.actual_demand,
          marketAmount: this.market_amount,
          remark: this.remarks,
          feedback: this.customer_feedback,
          dueTime: this.currentDate1,
        },
      }).then((res) => {
        this.resultCode = res.data.code;
        Toast({
          message: "保存成功",
          position: "middle",
        });
      });
    },
    async addCompetitor() {
      var reg=/^\d*\.{0,1}\d*$/
      if (!reg.test(this.product_rate)) {
        Dialog.alert({
          title: "提示",
          message: "产品利率必须为数字",
        });
        return;
      }
      this.$httpPost({
        url: "/api/customersRecords/appAddCompetitor",
        data: {
          customerCode: this.customerCode,
          semCode: this.resultCode,
          rivalName: this.competitor,
          rivalProduct: this.competitive_products,
          interestRate: this.product_rate,
        },
      }).then((res) => {
        Toast({
          message: "保存成功",
          position: "middle",
        });
      });
    },
    onResult(value) {
      this.result_txt = value;
      this.showResult = false;
    },
    onCustomer_intention(value) {
      this.Customer_intention_txt = value;
      this.showCustomer_intention = false;
    },
    onMarketing_methods(value) {
      this.Marketing_methods_txt = value;
      this.showMarketing_methods = false;
    },
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      this.$httpPost({
        url: "/api/upload/attachment",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((res) => {
        // console.log(res.data.pid);
        this.pictureId.push(res.data.pid);
      });
    },
    async addPicture() {
      this.$httpPost({
        url: "/api/customersRecords/appAddImage",
        data: {
          imageInfo: this.pictureId.join(","),
          customerCode: this.customerCode,
          semCode: this.resultCode,
        },
      }).then((res) => {
        Toast({
          message: "保存成功",
          position: "middle",
        });
      });
    },
  },
};
</script>
<style scoped>
.AddMarketingRecord {
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
/* .mission_details li:last-child {
  padding-bottom: 10px;
} */
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
