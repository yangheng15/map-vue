<template>
  <div class="AssetsLiabilitiesDetail">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '客户资产负债详情'">
      <van-field
        required
        readonly
        clickable
        name="picker"
        :value="assets_type_txt"
        label="类型："
        placeholder="点击选择类型"
        @click="assets_type = true"
      />
      <van-popup v-model="assets_type" position="bottom">
        <van-picker
          show-toolbar
          :columns="assets_type_list"
          @confirm="onassets_type"
          @cancel="assets_type = false"
        />
      </van-popup>
      <van-field
        required
        v-if="assets_type_txt == '资产'"
        readonly
        clickable
        name="资产"
        :value="assets_type_info_txt"
        label="资产类型："
        placeholder="点击选择资产类型"
        @click="assets_type_info = true"
      />
      <van-popup v-model="assets_type_info" position="bottom">
        <van-picker
          show-toolbar
          :columns="assets_type_info_list"
          @confirm="onassets_type_info"
          @cancel="assets_type_info = false"
        />
      </van-popup>
      <van-field
        required
        v-if="assets_type_txt == '负债'"
        readonly
        clickable
        name="负债"
        :value="liabilities_type_info_txt"
        label="负债类型："
        placeholder="点击选择负债类型"
        @click="liabilities_type_info = true"
      />
      <van-popup v-model="liabilities_type_info" position="bottom">
        <van-picker
          show-toolbar
          :columns="liabilities_type_info_list"
          @confirm="onliabilities_type_info"
          @cancel="liabilities_type_info = false"
        />
      </van-popup>
      <van-field
        required
        v-if="assets_type_txt == '资产'"
        v-model="asset_name_txt"
        name="资产名称："
        label="资产名称："
        placeholder="请输入资产名称"
      />
      <van-field
        required
        v-if="assets_type_txt == '负债'"
        v-model="asset_name_txt"
        name="负债名称："
        label="负债名称："
        placeholder="请输入负债名称"
      />
      <van-field
        required
        v-if="assets_type_txt == '资产'"
        v-model="evaluation_value"
        name="评估价值（万元）："
        label="评估价值（万元）："
        placeholder="请输入评估价值（万元）"
      />
      <van-field
        required
        v-if="assets_type_txt == '负债'"
        v-model="evaluation_value"
        name="负债金额（万元）："
        label="负债金额（万元）："
        placeholder="请输入负债金额（万元）"
      />
      <van-field name="uploader" label="资产负债照片" required>
        <template #input>
          <van-uploader
            :after-read="afterRead"
            v-model="uploader"
            @delete="deleteImage"
          >
            <template #preview-cover="uploader">
              <div class="preview-cover van-ellipsis">
                {{ uploader.createTime }}
              </div>
            </template></van-uploader
          >
        </template>
      </van-field>
      <van-field
        v-model="message_income"
        rows="2"
        autosize
        label="资产描述"
        type="textarea"
        maxlength="50"
        placeholder="请输入资产描述"
        show-word-limit
      />
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="inventoryDate | transform"
        label="清查日期"
        placeholder="点击选择清查日期"
        @click="showInventoryDate = true"
      />
      <van-popup v-model="showInventoryDate" position="bottom">
        <van-datetime-picker
          type="date"
          title="清查日期"
          @confirm="onInventoryDate"
          @cancel="showInventoryDate = false"
        />
      </van-popup>
      <div class="save">
        <van-button round block type="primary" @click="modifyResult()">保存</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import { Toast, Dialog } from "vant";
export default {
  name: "AssetsLiabilitiesDetail",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      value: "",
      id: "",
      customerCode: "",
      select_type_txt: "",
      assets_type_list: [],
      assets_type_txt: "",
      assets_type: false,
      select_type: false,
      assets_type_info_txt: "",
      assets_type_info_list: [],
      assets_type_info: false,
      liabilities_type_info_txt: "",
      liabilities_type_info_list: [],
      liabilities_type_info: false,
      asset_name_txt: "",
      currentDate: "",
      showPicker: false,
      currentDate1: "",
      message_income: "",
      inventoryDate: "",
      inventoryDate1: "",
      showInventoryDate: false,
      evaluation_value: "",
      uploader: [],
      customerImgTime: [],
      pictureTime: [],
      picCreatedTime: "",
      imageTime: [],
      pictureId: [],
      pictureIdTime: "",
      prospect_detailsEdit: {},
      assetsType: "",
    };
  },
  async created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    this.customerCode = this.$route.query.customerCode;
    await this.editRecord();
    this.dic_nation();
  },
  updated() {},
  methods: {
    onassets_type(value) {
      this.assets_type_txt = value["text"];
      this.prospect_detailsEdit.assets_type_txt = value["index"];
      this.assets_type = false;
      this.asset_name_txt= ''
    },
    onliabilities_type_info(value) {
      this.liabilities_type_info_txt = value["text"];
      this.prospect_detailsEdit.liabilities_type_info_txt = value["index"];
      this.liabilities_type_info = false;
    },
    onassets_type_info(value) {
      this.assets_type_info_txt = value["text"];
      this.prospect_detailsEdit.assets_type_info_txt = value["index"];
      this.assets_type_info = false;
    },
    enumData(val, data) {
      let find = "";
      if (val && data.length > 0) {
        const find = data.find((it) => it.index == val);
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    deleteImage(file, item) {
      this.pictureId.splice(item.index, 1);
      this.uploader.splice(item.index, 1);
      this.customerImgTime.splice(item.index, 1);
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";
      let formData = new FormData();
      this.compressImg(file.file, (base64Codes) => {
        let bl = this.base64UrlToBlob(base64Codes, file.file.name);
        formData.append("file", bl); // 文件对象
        this.$httpPost({
          url: "/api/upload/attachment",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        }).then((res) => {
          file.status = "done";
          file.message = "上传成功";
          let el = res.data.createTime;
          let time =
            new Date(el).getFullYear() +
            "-" +
            (new Date(el).getMonth() + 1) +
            "-" +
            new Date(el).getDate();
          this.pictureId.push(res.data.pid);
          this.customerImgTime.push({
            pid: res.data.pid,
            createTime: time,
          });
          let item = this.uploader[this.uploader.length - 1];
          item.createTime = time;
          this.uploader.splice(this.uploader.length - 1, 1);
          this.uploader.push(item);
        });
      });
    },
    dic_nation() {
      // 资产负债类型
      this.$httpGet({
        url: "/dic/type/customers_assets_type",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.assets_type_list = transformDara;
        this.assets_type_txt = this.enumData(this.assets_type_txt, this.assets_type_list);
      });
      // 客户资产类型
      this.$httpGet({
        url: "/dic/type/customers_assets_type_info",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.assets_type_info_list = transformDara;
        this.assets_type_info_txt = this.enumData(
          this.assets_type_info_txt,
          this.assets_type_info_list
        );
      });
      // 客户负债类型
      this.$httpGet({
        url: "/dic/type/customers_liabilities_type_info",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.liabilities_type_info_list = transformDara;
        this.liabilities_type_info_txt = this.enumData(
          this.liabilities_type_info_txt,
          this.liabilities_type_info_list
        );
      });
    },

    onInventoryDate(time) {
      this.inventoryDate = `${time.getFullYear()}-${
        time.getMonth() + 1
      }-${time.getDate()}`;
      this.inventoryDate1 = time;
      this.showInventoryDate = false;
    },
    modifyResult() {
      if (this.assets_type_txt == "") {
        Dialog.alert({
          title: "提示",
          message: "请选择类型！",
        });
        return;
      }
      if (this.assets_type_txt == "资产" && this.assets_type_info_txt == undefined) {
        Dialog.alert({
          title: "提示",
          message: "请选择资产类型！",
        });
        return;
      }
      if (this.assets_type_txt == "负债" && this.liabilities_type_info_txt == undefined) {
        Dialog.alert({
          title: "提示",
          message: "请选择负债类型！",
        });
        return;
      }
      if (this.assets_type_txt == "资产" && this.asset_name_txt == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入资产名称！",
        });
        return;
      }
      if (this.assets_type_txt == "负债" && this.asset_name_txt == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入负债名称！",
        });
        return;
      }
      if (this.assets_type_txt == "资产" && this.evaluation_value == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入评估价值（万元）！",
        });
        return;
      }
      if (this.assets_type_txt == "负债" && this.evaluation_value == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入负债金额（万元）！",
        });
        return;
      }
      if (this.uploader == "") {
        Dialog.alert({
          title: "提示",
          message: "请选择资产或者负债照片！",
        });
        return;
      }
      if (this.assets_type_txt == "资产") {
        this.assetsType = this.assets_type_info_txt;
      } else if (this.assets_type_txt == "负债") {
        this.assetsType = this.liabilities_type_info_txt;
      }
      this.$httpPut({
        url: "/api/customersAssetsInfo/update",
        data: {
          id: this.id,
          customerCode: this.customerCode,
          type: this.prospect_detailsEdit.assets_type_txt,
          assetsType: this.prospect_detailsEdit.assetsType,
          name: this.asset_name_txt,
          amount: this.evaluation_value,
          assetsImg: this.pictureId.join(","),
          description: this.message_income,
          assetsImgList: this.customerImgTime,
          checkTime: this.inventoryDate1,
        },
      })
        .then((res) => {
          Toast({
            message: "修改成功",
            position: "middle",
          });
          this.$router.go(-1);
        })
        .catch((err) => {});
    },
    async editRecord(val) {
      const res = await this.$httpGet({
        url: `/api/customersAssetsInfo/get/${this.id}`,
        data: {
          id: this.id,
        },
      });
      this.assets_type_txt = res.data.type;
      if (res.data.type == 1) {
        this.assets_type_info_txt = res.data.assetsType;
      } else if (res.data.type == 2) {
        this.liabilities_type_info_txt = res.data.assetsType;
      }

      this.asset_name_txt = res.data.name;
      this.evaluation_value = res.data.amount;
      // this.pictureId = res.data.assetsImg;
      this.message_income = res.data.description;
      this.inventoryDate = res.data.checkTime;
      this.customerImgTime = res.data.assetsImgList;
      this.customerImgTime.forEach((it) => {
        this.pictureId.push(it.pid);
        // this.pictureIdTime = it.createTime;
        if (it.pid) {
          this.$httpGet({
            url: "/api/show/image/base64",
            params: {
              id: it.pid,
            },
          }).then((res) => {
            this.uploader.push({
              url: "data:image/jpg;base64," + res.data,
              isImage: true,
              createTime: it.createTime,
            });
          });
        }
      });
    },
  },
  filters: {
    customers_assets_type(val) {
      const findWill = JSON.parse(localStorage.getItem("dicCustomersAssetsType")).find(
        (it) => +it.key == val
      );
      return findWill ? findWill.value : "";
    },
    customers_assets_type_info(val) {
      const findWill = JSON.parse(localStorage.getItem("dicAssetsTypeInfo")).find(
        (it) => +it.key == val
      );
      return findWill ? findWill.value : "";
    },
    customers_liabilities_type_info(val) {
      const findWill = JSON.parse(localStorage.getItem("dicLiabilitiesTypeInfo")).find(
        (it) => +it.key == val
      );
      return findWill ? findWill.value : "";
    },
  },
};
</script>
<style scoped>
.AssetsLiabilitiesDetail {
  padding-top: 46px;
}
.bm-view {
  width: calc(100% - 1rem);
  margin: auto;
  border: 0.05rem solid #bbb;
  height: 59vh;
}
.save {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0rem;
}
.save button {
  border: none;
  background: rgb(61, 66, 94);
  width: 5rem;
  height: 2rem;
  border-radius: 0.3rem;
  line-height: 2rem;
  text-align: center;
  color: #fff;
}
.van-cell >>> .van-field__label {
  width: 43%;
}
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
@media screen and (max-width: 359px) {
  li,
  select,
  input,
  p,
  div,
  span {
    font-size: 13px;
  }
  /*placeholder样式-开始*/
  input::-webkit-input-placeholder {
    font-size: 13px !important;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 13px !important;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: 13px !important;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-size: 13px !important;
  }
}
</style>
