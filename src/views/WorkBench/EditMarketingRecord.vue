<template>
  <div class="EditMarketingRecord">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '营销记录'">
      <ul class="mission_details">
        <li>
          客户：{{ editRecords.customerName }}
          <img src="../../assets/WorkBench/location.svg" alt />
        </li>
        <li>方式：{{ editRecords.semType }}</li>
        <li>营销产品：{{ editRecords.products }}</li>
        <li>执行时间：{{ editRecords.semTime | transform }}</li>
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
            name="picker"
            :value="editRecords.isSucc == 0 ? '成功' : (editRecords.isSucc == 1 ? '未成功' : '失败')"
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
            :value="
              editRecords.intention == 0
                ? '强'
                : editRecords.intention == 1
                ? '一般'
                : editRecords.intention == 2
                ? '无'
                : editRecords.intention == 3
                ? '已有产品'
                : editRecords.intention == 4
                ? '直接拒绝'
                : '同意采集'
            "
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
          <div class="save">
            <van-button type="primary" block @click="modifyResult()">保存</van-button>
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
          <!-- <img style="width:100px;height:100px" :src="'data:image/jpg;base64,'+this.pictureData" alt=""> -->
          <!-- <van-uploader v-model="fileList1" multiple /> -->
            <van-uploader
            result-type="dataUrl"
              :after-read="afterRead"
              :max-count="1"
              v-model="fileList"
              multiple
            />
          </div>
          <div class="save" style="margin-top: 20px">
            <van-button type="primary" block @click="modifyPicture()">保存</van-button>
          </div>
        </div>
        <div v-show="tabId === 2" style="background: #fff; height: 70vh">
          <van-field
            v-model="editRecords.rivalName"
            name="对手名称："
            label="对手名称："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写对手名称' }]"
          />
          <van-field
            v-model="editRecords.rivalProduct"
            name="对手产品："
            label="对手产品："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写对手产品' }]"
          />
          <van-field
            v-model="editRecords.interestRate"
            name="产品利率："
            label="产品利率："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写产品利率' }]"
          />
          <div class="save" style="margin-top: 20px">
            <van-button type="primary" block @click="modifyCompetitor()">保存</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import moment from "moment";
import { Toast } from "vant";
export default {
  data() {
    return {
      tabId: 0,
      editRecords: [],
      columnsResult: [
        { index: 0, text: "成功" },
        { index: 1, text: "未成功" },
        { index: 2, text: "失败" },
      ],
      columnsCustomer_intention: [
        { index: 0, text: "强" },
        { index: 1, text: "一般" },
        { index: 2, text: "无" },
        { index: 3, text: "已有他行产" },
        { index: 4, text: "直接拒绝" },
        { index: 5, text: "同意采集" },
      ],
      showCustomer_intention: false,
      showResult: false,
      id: "",
      imageInfo:"",
      resultCode:"",
      customerCode:"",
      griddingCode:"",
      products:"",
      // pictureData:"",
      fileList: [
        { url: "" },
      ],
    };
  },
  components: {
    ChildNav,
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    this.editRecord();
  },
  updated() {},
  methods: {
    prev() {
      this.$router.go(-1);
    },
    tab(ev) {
      this.tabId = ev;
      if(ev==1){
        this.editPicture()
      }
    },
    editRecord(val) {
      console.log(val);
      this.$httpGet({
        url: `/api/semCustomersRecords/appGet/${this.id}`,
        data: {
          id: this.id,
        },
      }).then((res) => {
        console.log(res.data);
        this.editRecords = res.data;
        this.imageInfo=res.data.imageInfo
        this.customerCode=res.data.customerCode
        this.griddingCode=res.data.griddingCode
        this.products=res.data.products
      });
    },
    onResult(value) {
      console.log(value);
      this.editRecords.isSucc = value.index;
      this.showResult = false;
    },
    onCustomer_intention(value) {
      this.editRecords.intention = value.index;
      this.showCustomer_intention = false;
    },
    modifyResult() {
      console.log(this.id);
      console.log(this.editRecords.code);
      this.$httpPut({
        url: "/api/semCustomersRecords/updateRecord",
        data: {
          customerCode: this.editRecords.customerCode,
          griddingCode: this.editRecords.griddingCode,
          products: this.editRecords.products,
          code: this.editRecords.code,
          id: this.id,
          isSucc: this.editRecords.isSucc,
          intention: this.editRecords.intention,
          actualDemand: this.editRecords.actualDemand,
          remark: this.editRecords.remark,
          feedback: this.editRecords.feedback,
        },
      }).then((res) => {
        console.log(res);
        Toast({
          message: "保存成功",
          position: "middle",
        });
      });
    },
    async modifyCompetitor() {
      this.$httpPut({
        url: "/api/semCustomersRecords/updateCompetitor",
        data: {
          customerCode: this.editRecords.customerCode,
          semCode: this.editRecords.code,
          // semCode: this.resultCode,
          id: this.editRecords.id,
          rivalName: this.editRecords.rivalName,
          rivalProduct: this.editRecords.rivalProduct,
          interestRate: this.editRecords.interestRate,
        },
      }).then((res) => {
        console.log(res);
        Toast({
          message: "保存成功",
          position: "middle",
        });
      });
    },
    async modifyPicture() {
      this.$httpPut({
        url: "/api/semCustomersRecords/updateScreenage",
        data: {
          customerCode: this.editRecords.customerCode,
          semCode: this.editRecords.code,
          // semCode: this.resultCode,
          id: this.editRecords.id,
          imageInfo: this.imageInfo,
        },
      }).then((res) => {
        console.log(res);
        Toast({
          message: "保存成功",
          position: "middle",
        });
      });
    },
    async editPicture() {
      console.log(this.imageInfo);
      this.$httpGet({
        url: "/api/show/image/base64",
        params: {
          id: this.imageInfo,
        },
      }).then((res) => {
        console.log(res.data);
        this.fileList[0].url='data:image/jpg;base64,'+res.data;
        this.fileList[0].isImage=true
      });
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
        console.log(res.data.pid);
        this.pictureId = res.data.pid;
      });
    },
    
  },
    filters: {
    transform(val) {
      if (val) {
        return moment(val).format("YYYY-MM-DD");
      }
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
