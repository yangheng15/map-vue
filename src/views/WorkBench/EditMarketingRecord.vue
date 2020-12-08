<template>
  <div class="EditMarketingRecord">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '营销记录'">
      <ul class="mission_details">
        <li>
          客户：{{ custName }}
          <!-- <img src="../../assets/WorkBench/location.svg" alt /> -->
        </li>
        <li v-if="productName">营销产品：{{ productName }}</li>
        <li v-if="productName">
          执行时间：{{ editRecords.semTime | transform }}
        </li>
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
            :value="
              editRecords.isSucc == 0
                ? '失败'
                : editRecords.isSucc == 1
                ? '成功'
                : editRecords.isSucc == 2
                ? '未成功'
                : ''
            "
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
            :value="editRecords.intention"
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
            :value="
              editRecords.semType == 0
                ? '上门'
                : editRecords.semType == 1
                ? '电话'
                : editRecords.semType == 2
                ? '网络'
                : '无'
            "
            label="营销方式"
            placeholder="点击选择营销方式"
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
              width: '55%',
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
            v-model="editRecords.marketAmount"
            required
            rows="2"
            autosize
            label="金额（万元）"
            type="number"
            placeholder="请填写金额"
            show-word-limit
          />
          <van-field
            v-model="editRecords.actualDemand"
            rows="2"
            autosize
            label="实际需求"
            type="textarea"
            maxlength="50"
            placeholder="请填写客户实际需要的产品名称"
            show-word-limit
          />
          <van-field
            v-model="editRecords.remark"
            rows="2"
            autosize
            label="备注"
            type="textarea"
            maxlength="50"
            placeholder="多行输入"
            show-word-limit
          />
          <van-field
            v-model="editRecords.feedback"
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
            :value="currentDate1 | transform"
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
          <div v-if="taskUpdateFlag" class="save">
            <van-button type="primary" block @click="modifyResult()"
              >保存</van-button
            >
          </div>
        </div>
        <div v-show="tabId === 1" style="background: #fff">
          <div
            style="
              padding: 10px;
              background: #fff;
              display: flex;
              flex-wrap: wrap;
            "
          >
            <van-uploader
              result-type="dataUrl"
              :after-read="afterRead"
              v-model="fileList"
              multiple
              @delete="deleteImage"
              ref="uploadImg"
            />
            <!-- <span
              style="
                display: inline-block;
                height: 80px;
                width: 80px;
                z-index: 1;
                background: red;
              "
              @click="handleClick"
            ></span>  -->
            <van-action-sheet
              v-model="isconfirm"
              :actions="actions"
              @select="onSelect"
              cancel-text="取消"
              close-on-click-action
              @cancel="onCancel"
            />
            <!-- <input type="file" accept="image/*" capture="camera"> -->
          </div>
          <div v-if="taskUpdateFlag" class="save" style="margin-top: 20px">
            <van-button type="primary" block @click="modifyPicture()"
              >保存</van-button
            >
          </div>
        </div>
        <div v-show="tabId === 2" style="background: #fff; height: 70vh">
          <van-field
            v-model="editRecords.rivalName"
            name="对手名称："
            label="对手名称："
            required
            placeholder="请填写对手名称"
          />
          <van-field
            v-model="editRecords.rivalProduct"
            required
            name="对手产品："
            label="对手产品："
            placeholder="请填写对手产品"
          />
          <van-field
            v-model="editRecords.interestRate"
            required
            name="产品利率："
            label="产品利率："
            placeholder="请填写产品利率（数字）"
          />
          <div v-if="taskUpdateFlag" class="save" style="margin-top: 20px">
            <van-button type="primary" block @click="modifyCompetitor()"
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
export default {
  data() {
    return {
      tabId: 0,
      editRecords: [],
      columnsResult: [
        { index: 0, text: "失败" },
        { index: 1, text: "成功" },
        { index: 2, text: "未成功" },
      ],
      columnsCustomer_intention: [],
      showCustomer_intention: false,
      columnsMarketing_methods: [
        { index: 0, text: "上门" },
        { index: 1, text: "电话" },
        { index: 2, text: "网络" },
      ],
      showMarketing_methods: false,
      showResult: false,
      id: "",
      productName: "",
      imageInfo: "",
      resultCode: "",
      customerCode: "",
      griddingCode: "",
      products: "",
      // pictureData:"",
      fileList: [],
      custName: "",
      prospect_detailsEdit: {},
      pictureId: [],
      isconfirm: false,
      capture: ["camera"],
      actions: [{ name: "相机" }, { name: "相册" }],
      currentDate: "",
      showPicker: false,
      currentDate1: "",
      timeOut: false,
      potential_need_type: [],
      showPopup: false,
      resultArr: [],
      productTypeArr: "",
      taskUpdateFlag:true,
      taskId:""
    };
  },
  components: {
    ChildNav,
  },
  async created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    this.productName = this.$route.query.productName;
    this.taskId = this.$route.query.taskId;
    this.custName = this.$route.query.custName;
    this.taskUpdateFlag = this.$route.query.taskUpdateFlag;
    await this.editRecord();
    this.dic_nation();
  },
  updated() {},
  methods: {
    task_product_type(val) {
      const findWill = JSON.parse(
        localStorage.getItem("dicTaskProductType")
      ).find((it) => +it.key == val);
      return findWill ? findWill.value : "";
    },
    resultListClick() {
      this.productTypeArr = [];
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
      // this.currentDate = `${time.getFullYear()}-${
      //   time.getMonth() + 1
      // }-${time.getDate()}`;
      this.currentDate = time;
      this.currentDate1 = time;
      console.log(time);
      this.showPicker = false;
    },
    deleteImage({ url }) {
      const index = this.fileList.findIndex((it) => it.url === url);
      this.pictureId.splice(index, 1);
    },
    appMessage(str) {
      str = String(str);
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        window.android.openCamera((el) => {
          console.log(el);
        });
      } else if (isiOS) {
        window.webkit.messageHandlers.AppModel.postMessage({
          str: str,
        });
      }
    },
    enumData(val, data) {
      if (val && data.length > 0) {
        const find = data.find((it) => it.index == val);
        console.log(find);
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    dic_nation() {
      // 客户意向
      this.$httpGet({
        url: "/dic/type/dic_client_will",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.columnsCustomer_intention = transformDara;
        this.editRecords.intention = this.enumData(
          this.editRecords.intention,
          this.columnsCustomer_intention
        );
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
      this.tabId = ev;
      if (ev == 1) {
        if (this.editRecords.imageId) {
          this.editPicture();
        }
      } else {
        this.fileList = [];
      }
    },
    async editRecord(val) {
      const res = await this.$httpGet({
        url: `/api/semCustomersRecords/appGet/${this.id}`,
        data: {
          id: this.id,
        },
      });
      this.editRecords = res.data;
      this.pictureId = res.data.imageInfo ? res.data.imageInfo.split(",") : [];
      this.customerCode = res.data.customerCode;
      this.griddingCode = res.data.griddingCode;
      this.products = res.data.products;
      this.currentDate1 = res.data.dueTime;
      if (this.editRecords.isSucc == 1) {
        this.timeOut = true;
      } else {
        this.timeOut = false;
      }
      res.data.productTypeName?this.productTypeArr = res.data.productTypeName:this.productTypeArr=""
      res.data.productType?this.resultArr = res.data.productType.split(","):this.resultArr=""
      console.log(this.resultArr);
    },
    onResult(value) {
      console.log(value);
      this.editRecords.isSucc = value.index;
      this.showResult = false;
      if (value.index == 1) {
        this.timeOut = true;
      } else {
        this.timeOut = false;
      }
    },
    onCustomer_intention(value) {
      // this.prospect_detailsEdit.intention = value.index;
      this.editRecords.intention = value.text;
      this.showCustomer_intention = false;
    },
    onMarketing_methods(value) {
      this.editRecords.semType = value.index;
      this.showMarketing_methods = false;
    },
    modifyResult() {
      if(this.resultArr){
        this.resultArr=this.resultArr.toString()
      }else{
        this.resultArr=""
      }
      // console.log(this.id);
      // console.log(this.editRecords.code);
      this.$httpPut({
        url: "/api/semCustomersRecords/updateRecord",
        data: {
          customerCode: this.editRecords.customerCode,
          griddingCode: this.editRecords.griddingCode,
          products: this.editRecords.products,
          code: this.editRecords.code,
          id: this.id,
          isSucc: this.editRecords.isSucc,
          semType: this.editRecords.semType,
          intention: this.columnsCustomer_intention.find(
            (it) => it.text === this.editRecords.intention
          ).index,
          actualDemand: this.editRecords.actualDemand,
          marketAmount: this.editRecords.marketAmount,
          remark: this.editRecords.remark,
          feedback: this.editRecords.feedback,
          dueTime: this.currentDate1,
          productType: this.resultArr,
        },
      }).then((res) => {
        Toast({
          message: "保存成功",
          position: "middle",
        });
      });
    },
    async modifyCompetitor() {
      var reg = /^\d*\.{0,1}\d*$/;
      if (!reg.test(this.editRecords.interestRate)) {
        Dialog.alert({
          title: "提示",
          message: "产品利率必须为数字",
        });
        return;
      }
      if (this.editRecords.competitorId) {
        this.$httpPut({
          url: "/api/semCustomersRecords/updateCompetitor",
          data: {
            customerCode: this.editRecords.customerCode,
            semCode: this.editRecords.code,
            // semCode: this.resultCode,
            id: this.editRecords.competitorId,
            rivalName: this.editRecords.rivalName,
            rivalProduct: this.editRecords.rivalProduct,
            interestRate: this.editRecords.interestRate,
          },
        }).then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
        });
      } else {
        this.$httpPost({
          url: "/api/customersRecords/appAddCompetitor",
          data: {
            customerCode: this.editRecords.customerCode,
            semCode: this.editRecords.code,
            rivalName: this.editRecords.rivalName,
            rivalProduct: this.editRecords.rivalProduct,
            interestRate: this.editRecords.interestRate,
          },
        }).then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
        });
      }
    },
    async modifyPicture() {
      if (this.editRecords.imageId) {
        this.$httpPut({
          url: "/api/semCustomersRecords/updateScreenage",
          data: {
            customerCode: this.customerCode,
            semCode: this.editRecords.code,
            // semCode: this.resultCode,
            id: this.editRecords.imageId,
            imageInfo: this.pictureId.join(","),
          },
        }).then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
        });
      } else {
        this.$httpPost({
          url: "/api/customersRecords/appAddImage",
          data: {
            imageInfo: this.pictureId.join(","),
            customerCode: this.editRecords.customerCode,
            semCode: this.editRecords.code,
          },
        }).then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
        });
      }
    },
    /**
     * 获取图片接口
     */
    async editPicture() {
      if (this.pictureId) {
        this.pictureId.forEach((el) => {
          this.$httpGet({
            url: "/api/show/image/base64",
            params: {
              id: el,
            },
          }).then((res) => {
            this.fileList.push({
              url: "data:image/jpg;base64," + res.data,
              isImage: true,
            });
          });
        });
      }
    },
    beforeRead(file) {
      alert("file");
    },
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      console.log(file);
      this.$httpPost({
        url: "/api/upload/attachment",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((res) => {
        console.log(res.data);
        this.pictureId.push(res.data.pid);
      });
    },
    handleClick() {
      this.isconfirm = true;
    },
    onSelect(item) {
      this.isconfirm = false;
      // Toast(item.name);
      if (item.name == "相册") {
        this.cameraList = "camera";
        this.$refs.uploadImg.chooseFile();
      } else if (item.name == "相机") {
        this.cameraList = null;
        this.$refs.uploadImg.chooseFile();
      }
    },
    onCancel() {
      Toast("取消");
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
