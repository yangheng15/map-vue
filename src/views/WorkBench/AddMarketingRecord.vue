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
          <li @click="tab(2)" :class="tabId == 2 ? 'cur' : 'ordinary'">竞争对手</li>
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
            v-if="!taskId"
            readonly
            clickable
            v-model="productTypeArr"
            label="产品类型"
            placeholder="点击选择营销产品类型"
            @click="showPopup = true"
          />
          <van-popup
            v-model="showPopup"
            position="middle"
            round
            :closeable="true"
            :style="{
              width: '50%',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '30px 20px',
              borderRadius: '10px',
            }"
          >
            <van-checkbox-group v-model="resultArr" direction="horizontal">
              <van-checkbox
                v-for="(item, index) in potential_need_type"
                :key="index"
                :name="item.index"
                checked-color="rgb(61, 66, 94)"
                >{{ item.text }}</van-checkbox
              >
            </van-checkbox-group>
            <div class="resultArrClick">
              <van-button @click="resultListClick" color="rgb(61, 66, 94)"
                >确认</van-button
              >
            </div>
          </van-popup>
          <van-field
            v-if="taskId"
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
            v-if="timeOut"
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
            <van-button type="primary" block @click="addResult()">保存</van-button>
          </div>
        </div>
        <div v-show="tabId === 1" style="background: #fff">
          <div style="padding: 10px; background: #fff">
            <van-uploader :after-read="afterRead" v-model="fileList" multiple />
          </div>
          <div class="save" style="margin-top: 20px">
            <van-button type="primary" block @click="addPicture()">保存</van-button>
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
            <van-button type="primary" block @click="addCompetitor()">保存</van-button>
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
      result_txt: {
        index: 2,
        text: "未成功",
      },
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
      timeOut: false,
      potential_need_type: [],
      showPopup: false,
      resultArr: [],
      productTypeArr: "",
      taskId: "",
      modifyId: "",
      idCompetitor: "",
      idImage: "",
      modifyResultFlag: true,
    };
  },
  components: {
    ChildNav,
  },
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
    task_product_type(val) {
      const findWill = JSON.parse(localStorage.getItem("dicTaskProductType")).find(
        (it) => +it.key == val
      );
      return findWill ? findWill.value : "";
    },
    resultListClick() {
      this.resultArr.forEach((it) => {
        console.log(this.task_product_type(it));
        this.productTypeArr += this.task_product_type(it) + ",";
      });
      if (this.productTypeArr.length > 0) {
        this.productTypeArr = this.productTypeArr.substr(
          0,
          this.productTypeArr.length - 1
        );
      }
      this.showPopup = false;
      console.log(this.resultArr.toString());
    },
    onConfirm(time) {
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
      // 客户需求
      this.$httpGet({
        url: "/dic/type/task_product_type",
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
      if (!this.modifyResultFlag) return;
      this.modifyResultFlag = false;
      setTimeout(() => {
        this.modifyResultFlag = true;
      }, 2000);
      if (!this.modifyId && !this.resultCode) {
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
            productType: this.resultArr.toString(),
          },
        }).then((res) => {
          this.resultCode = res.data.code;
          this.modifyId = res.data.id;
          Toast({
            message: "保存成功",
            position: "middle",
          });
        });
      } else {
        this.$httpPut({
          url: "/api/semCustomersRecords/updateRecord",
          data: {
            customerCode: this.customerCode,
            griddingCode: this.gridCode,
            products: this.productCode,
            id: this.modifyId,
            code: this.resultCode,
            isSucc: this.result_txt.index,
            intention: this.Customer_intention_txt.index,
            semType: this.Marketing_methods_txt.index,
            actualDemand: this.actual_demand,
            marketAmount: this.market_amount,
            remark: this.remarks,
            feedback: this.customer_feedback,
            dueTime: this.currentDate1,
            productType: this.resultArr.toString(),
          },
        }).then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
        });
      }
    },
    async addCompetitor() {
      var reg = /^\d*\.{0,1}\d*$/;
      if (!reg.test(this.product_rate)) {
        Dialog.alert({
          title: "提示",
          message: "产品利率必须为数字",
        });
        return;
      }
      if (!this.modifyResultFlag) return;
      this.modifyResultFlag = false;
      setTimeout(() => {
        this.modifyResultFlag = true;
      }, 2000);
      if (!this.idCompetitor) {
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
          this.idCompetitor = res.data.id;
          Toast({
            message: "保存成功",
            position: "middle",
          });
        });
      } else {
        this.$httpPut({
          url: "/api/semCustomersRecords/updateCompetitor",
          data: {
            customerCode: this.customerCode,
            semCode: this.resultCode,
            rivalName: this.competitor,
            rivalProduct: this.competitive_products,
            interestRate: this.product_rate,
            id: this.idCompetitor,
          },
        }).then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
        });
      }
    },
    onResult(value) {
      console.log(value);
      this.result_txt = value;
      this.showResult = false;
      if (value.index == 1) {
        this.timeOut = true;
      } else {
        this.timeOut = false;
      }
    },
    onCustomer_intention(value) {
      this.Customer_intention_txt = value;
      this.showCustomer_intention = false;
    },
    onMarketing_methods(value) {
      this.Marketing_methods_txt = value;
      this.showMarketing_methods = false;
    },
    // afterRead(file) {
    //   let formData = new FormData();
    //   formData.append("file", file.file);
    //   this.$httpPost({
    //     url: "/api/upload/attachment",
    //     headers: { "Content-Type": "multipart/form-data" },
    //     data: formData,
    //   }).then((res) => {
    //     // console.log(res.data.pid);
    //     this.pictureId.push(res.data.pid);
    //   });
    // },
    afterRead(file) {
      let formData = new FormData();
      file.status = "uploading";
      file.message = "上传中...";
      // console.log(file, "filefile");
      // if (file.size / 1024 > 1025) {
      //文件大于1M（根据需求更改），进行压缩上传
      this.compressImg(file.file, (base64Codes) => {
        // console.log(base64Codes, "base64Codes");
        let bl = this.base64UrlToBlob(base64Codes, file.file.name);
        console.log(bl, "blblbl");
        formData.append("file", bl); // 文件对象
        this.$httpPost({
          url: "/api/upload/attachment",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        }).then((res) => {
          file.status = "done";
          file.message = "上传成功";
          this.pictureId.push(res.data.pid);
        });
      });
      // } else {
      //   formData.append("file", file.file);
      //   this.$httpPost({
      //     url: "/api/upload/attachment",
      //     headers: { "Content-Type": "multipart/form-data" },
      //     data: formData,
      //   }).then((res) => {
      //     // console.log(res.data.pid);
      //     this.pictureId.push(res.data.pid);
      //   });
      // }
    },
    async addPicture() {
      if (this.pictureId == "") {
        Dialog.alert({
          title: "提示",
          message: "请添加客户照片！",
        });
        return;
      }
      if (!this.modifyResultFlag) return;
      this.modifyResultFlag = false;
      setTimeout(() => {
        this.modifyResultFlag = true;
      }, 2000);
      if (!this.idImage) {
        this.$httpPost({
          url: "/api/customersRecords/appAddImage",
          data: {
            imageInfo: this.pictureId.join(","),
            customerCode: this.customerCode,
            semCode: this.resultCode,
          },
        }).then((res) => {
          this.idImage = res.data.id;
          Toast({
            message: "保存成功",
            position: "middle",
          });
        });
      } else {
        this.$httpPut({
          url: "/api/semCustomersRecords/updateScreenage",
          data: {
            customerCode: this.customerCode,
            semCode: this.resultCode,
            id: this.idImage,
            imageInfo: this.pictureId.join(","),
          },
        }).then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
        });
      }
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
.van-checkbox--horizontal {
  margin: 8px 10px;
}
.van-checkbox--horizontal >>> .van-checkbox__icon {
  height: 24px;
}
.resultArrClick {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 20px;
}
.resultArrClick >>> .van-button {
  height: 30px;
}
.van-field__value >>> .van-field__control {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
