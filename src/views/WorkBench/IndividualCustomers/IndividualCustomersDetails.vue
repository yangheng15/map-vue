<template>
  <div class="FarmersInformation">
    <div class="public_nav">
      <van-nav-bar left-arrow @click-left="onClickLeft" :title="typeCN">
      </van-nav-bar>
    </div>
    <div v-if="typeCN == '客户池客户详情'">
      <van-field
        v-model="publicCustomerName"
        name="名称："
        label="名称："
        placeholder="客户名称"
        type="textarea"
        autosize
        readonly
      />
      <van-field
        v-model="publicCustomerTelephone"
        name="手机号："
        label="手机号："
        placeholder="请输入手机号"
        readonly
      />
      <van-field
        v-model="publicCustomerId"
        readonly
        name="身份证："
        label="身份证："
        placeholder="请输入身份证"
      />
      <van-field
        readonly
        name="area"
        :value="publicCustomerGrid"
        label="所属网格："
        placeholder="客户所属网格"
      />
      <van-popup v-model="regional_grid" position="bottom">
        <van-picker
          show-toolbar
          :columns="areaList"
          @cancel="regional_grid = false"
          @confirm="onRegional_grid"
        />
      </van-popup>
      <van-field
        v-model="publicCustomerWorkUnit"
        name="工作单位："
        label="工作单位："
        placeholder="请输入工作单位"
        type="textarea"
        autosize
        readonly
      />

      <van-field
        v-model="publicCustomerAddress"
        name="联系地址："
        label="联系地址："
        placeholder="请输入联系地址"
        type="textarea"
        autosize
        readonly
      />
      <van-field
        readonly
        name="picker"
        :value="industry"
        label="所属行业："
        placeholder="客户所属行业"
      />
      <van-popup v-model="industryShow" position="bottom">
        <van-picker
          show-toolbar
          :columns="industry_list"
          @confirm="onIndustryShow"
          @cancel="industryShow = false"
        />
      </van-popup>

      <van-field
        @click="getLongitudeLatitude"
        v-model="publicCustomerLocation"
        readonly
        name="位置："
        label="位置："
        placeholder="点击选择位置信息"
      >
      </van-field>
      <van-field
        v-if="sourceClues == 2"
        v-model="sourceCluesName"
        name="线索来源："
        label="线索来源："
        placeholder=""
        readonly
      />
      <div style="width: 99%; margin: 0.5rem auto; position: relative">
        <baidu-map
          class="bm-view"
          :center="mapCenter1"
          :zoom="zoom"
          ak="WjS3NqjeiRpXVIQiWp2WiHhFyEcYz90e"
          @longpress="longpress"
          @ready="mapReady"
        >
          <bm-marker
            :dragging="false"
            :position="mapCenter"
            @dragend="markerDragend"
            :icon="{
              url: require('../../../assets/grid/sign.svg'),
              size: { width: 30, height: 30 },
            }"
          ></bm-marker>
          <!-- <template>
              <p
                style="
                  width: 35px;
                  height: 35px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background: #dedede;
                  border: 1px solid #d8d8d8;
                  border-radius: 5px;
                  position: absolute;
                  right: 20px;
                  margin: 0;
                  top: 20px;
                "
                @click="appMessage1"
              >
                <img src="../../../assets/grid/current_location.svg" alt />
              </p>
            </template> -->
        </baidu-map>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Dialog } from "vant";
import { Image as VanImage } from "vant";
import moment from "moment";
export default {
  data() {
    return {
      publicCustomerName: "",
      publicCustomerAddress: "",
      publicCustomerGrid: "",
      industry_list: [],
      industry: "",
      industryShow: false,
      uploader: [],
      pictureId: [],
      businessLicenseNo: "",
      legalPersonName: "",
      legalPersonTelephone: "",
      otherContactsName: "",
      otherContactsTelephone: "",
      publicCustomerLocation: "",
      sourceClues: "",
      sourceCluesName: "",

      potential_need_type: [],
      otherTxt: "",

      // radio: "2",
      areaList: [],
      regional_grid: false,
      tabId: 0,

      id: "",
      prospect_detailsEdit: {},

      show: false,

      longitude: "114.654102",
      latitude: "33.623741",
      mapCenter: { lng: "114.654102", lat: "33.623741" },
      mapCenter1: { lng: "114.654102", lat: "33.623741" },
      zoomNum: 19,
      positionMarker: null,
      longitudeLatitude: false,
      map: null,
      zoom: 20,
      id: "",
      detailAddress: "",
      demandLoan: "",
      MarketingRecord: [],
      customersDemandList1: [],
      customerCode: "",
      gridCode: "",
      productCode: "",
      productName: "",
      custName: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (
        from.path === "/EditMarketingRecord" ||
        from.path === "/AddMarketingRecord"
      ) {
        vm.tab(2);
      }
    });
  },
  async created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    await this.editRecord();
    await this.dic_nation();
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    formatDate(date) {
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    mapReady({ BMap, map }) {
      this.map = map;
    },
    markerDragend({ point }) {
      const { lng, lat } = point;
      this.publicCustomerLocation = `${lng},${lat}`;
    },
    markerLongpress(point) {
      Dialog.confirm({
        message: "要标记当前位置吗？",
      })
        .then(() => {
          const { lng, lat } = point;
          // alert(lng + "-" + lat);
          this.mapCenter = point;
          this.mapCenter1 = point;
          this.publicCustomerLocation = `${lng},${lat}`;
        })
        .catch(() => {
          // on cancel
        });
    },
    longpress({ point }) {
      const zoom = this.map.getZoom();
      if (Math.abs(zoom - this.zoom) > 0) {
        this.zoom = zoom;
        return;
      }
      this.markerLongpress(point);
      // clearTimeout(this.timeOutEvent);
      // // this.timeOutEvent = 0;
      // this.timeOutEvent = setTimeout(() => {
      //   //执行长按要执行的内容
      //   this.markerLongpress(point);
      //   this.timeOutEvent = 0;
      // }, 600);
    },
    enumData(val, data) {
      // debugger
      if (val && data.length > 0) {
        const find = data.find((it) => it.index == val);
        // debugger
        console.log(find);
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    enumData1(val, data) {
      let find = "";
      if (val && data.length > 0) {
        find = data.find((it) => it.index === val);
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    dic_nation() {
      // 所属行业
      this.$httpGet({
        url: "/dic/type/industry_type",
      }).then((res) => {
        let transformDara = [];
        console.log(res);
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.industry_list = transformDara;
        this.industry = this.enumData(this.industry, this.industry_list);
      });
      // 所属网格
      this.$httpGet({
        url: "/api/semGridding/query",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          it.children &&
            it.children.forEach((ele, index1) => {
              transformDara.push({ index: ele.code, text: ele.name });
            });
        });
        this.areaList = transformDara;
        this.publicCustomerGrid = this.enumData1(
          this.publicCustomerGrid,
          this.areaList
        );
      });
    },
    async editRecord(val) {
      const res = await this.$httpGet({
        url: `/api/publicCustomerPool/get/${this.id}`,
        data: {
          id: this.id,
        },
      });
      console.log(res.data.code);
      this.customerCode = res.data.code;
      localStorage.setItem("customerCode", this.customerCode);
      this.publicCustomerName = res.data.name;
      res.data.address != false
        ? (this.publicCustomerAddress = res.data.address)
        : (this.publicCustomerAddress = this.detailAddress);
      this.publicCustomerGrid = res.data.gridding;
      this.industry = res.data.industryType;
      this.publicCustomerLocation = res.data.location;
      this.sourceClues = res.data.source;
      this.sourceCluesName = res.data.shareName;
      this.mapCenter = {
        lng: res.data.location.split(",")[0],
        lat: res.data.location.split(",")[1],
      };
      this.mapCenter1 = { ...this.mapCenter };
      this.legalPersonName = res.data.legalName;
      this.legalPersonTelephone = res.data.legalPhone;
      this.pictureId = res.data.customerImg
        ? res.data.customerImg.split(",")
        : [];
      this.businessLicenseNo = res.data.businessLicenseNo;
      this.otherContactsName = res.data.otherContactsName;
      this.otherContactsTelephone = res.data.otherContactsPhone;
      if (res.data.customersDemandList.length > 0) {
        res.data.customersDemandList.forEach((item) => {
          for (
            let index = 0;
            index < this.potential_need_type.length;
            index++
          ) {
            const i = this.potential_need_type.findIndex(
              (it) => it.index == item.demandType
            );
            console.log(i);
            i >= 0 &&
              (this.potential_need_type[
                i
              ].radio = item.demandStatus.toString());
            i < 0 && (this.otherTxt = item.description);
          }
        });
      }
      console.log(this.potential_need_type);
      //   this.customersDemandList1 = res.data.customersDemandList;
      //   console.log(this.customersDemandList1);
      //   if (this.customersDemandList1) {
      //     this.customersDemandList1.forEach((it) => {
      //       this.potential_need_type.index = it.demandStatus;
      //       this.potential_need_type.radio = it.demandType;
      //       if (it.demandType == -1) {
      //         this.otherTxt = it.description;
      //       }
      //       console.log(this.potential_need_type);
      //     });
      //   }
      if (this.pictureId) {
        this.pictureId.forEach((el) => {
          this.$httpGet({
            url: "/api/show/image/base64",
            params: {
              id: el,
            },
          }).then((res) => {
            this.uploader.push({
              url: "data:image/jpg;base64," + res.data,
              isImage: true,
            });
          });
        });
      }
      this.customersDemandList = res.data.customersDemandList;
    },
    onRegional_grid(value) {
      this.publicCustomerGrid = value["text"];
      this.prospect_detailsEdit.publicCustomerGrid = value["index"];
      this.regional_grid = false;
    },
    onIndustryShow(value) {
      console.log(value);
      this.industry = value["text"];
      this.prospect_detailsEdit.industry = value["index"];
      this.industryShow = false;
    },
    handler({ BMap, map }) {
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    getMarkedRecord() {
      const customerCodeBack = localStorage.getItem("customerCode");
      this.$httpGet({
        url: "/api/publicCustomersInfo/marketRecord",
        params: {
          customerCode: this.customerCode || customerCodeBack,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.MarketingRecord = res.data;
      });
      // }
    },
    //选中一个item
    selectItem(thisItem) {
      if (typeof thisItem.checked == "undefined") {
        this.$set(thisItem, "checked", true);
      } else {
        thisItem.checked = !thisItem.checked;
      }
    },

    getLongitudeLatitude() {
      this.longitudeLatitude = !this.longitudeLatitude;
    },
    appMessage() {
      let positionArr = window.android.getLocation().split(",");
      this.mapCenter = { lng: positionArr[0], lat: positionArr[1] };
      this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
      this.prospect_details.location = positionArr.toString();
    },
    appMessage1() {
      var u = navigator.userAgent;
      //Android终端
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      //iOS终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        let positionArr = window.android.getLocation().split(",");
        // let positionArr = [124.281873, 45.514322]
        if (
          positionArr[0] === this.mapCenter1.lng &&
          positionArr[1] === this.mapCenter1.lat
        ) {
          // 如果当前的 中心点和之前的中心点一样
          this.mapCenter1 = {
            lng: positionArr[0],
            lat: positionArr[1] + 0.0001,
          }; //直接将中心点回传不生效，需要稍微改动一下中心点
          this.zoomNum = this.map.getZoom();
          return;
        }
        this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
        this.mapCenter = this.mapCenter1;
        // this.zoomNum = 20;
        this.zoomNum = this.map.getZoom();
        this.createMarker(positionArr);
      }
      if (isiOS) {
        let positionArr = window.prompt("getLocation").split(",");
        // let positionArr = [124.281873, 45.514322]
        if (
          positionArr[0] === this.mapCenter1.lng &&
          positionArr[1] === this.mapCenter1.lat
        ) {
          // 如果当前的 中心点和之前的中心点一样
          this.mapCenter1 = {
            lng: positionArr[0],
            lat: positionArr[1] + 0.0001,
          }; //直接将中心点回传不生效，需要稍微改动一下中心点
          this.zoomNum = this.map.getZoom();
          return;
        }
        this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
        this.mapCenter = this.mapCenter1;
        // this.zoomNum = 20;
        this.zoomNum = this.map.getZoom();
        this.createMarker(positionArr);
      }
    },
    createMarker(position) {
      if (this.positionMarker) {
        this.map.removeOverlay(this.positionMarker);
      }
      this.positionMarker = new BMap.Marker(new BMap.Point(...position)); // 创建标注
      this.map.addOverlay(this.positionMarker); // 将标注添加到地图中
    },
    afterRead(file) {
      let formData = new FormData();
      formData.append("file", file.file);
      this.$httpPost({
        url: "/api/upload/attachment",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      }).then((res) => {
        console.log(res.data.pid);
        this.pictureId.push(res.data.pid);
      });
    },
    selectDelegation(item, index) {
      // this.$set(this.potential_need_type, index, {...this.potential_need_type[index]})
      // this.customersDemandList1.push({
      //     demandStatus: item.index,
      //     demandType: item.radio,
      // });
    },
    async saveCustomersDemand() {
      console.log(this.potential_need_type);
      let arr = [];
      this.potential_need_type.forEach((item) => {
        arr.push({
          demandStatus: item.radio,
          demandType: item.index,
        });
      });
      if (this.otherTxt) {
        arr.push({
          description: this.otherTxt,
          demandType: -1,
        });
      }
      const res = await this.$httpPost({
        url: "/api/customersDemand/save",
        data: {
          code: this.customerCode,
          customersDemandList: arr,
        },
      })
        .then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
          // this.$router.go(-1);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    modifyResult() {
      if (this.publicCustomerName == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入名称！",
        });
        return;
      }
      if (this.publicCustomerAddress == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入地址！",
        });
        return;
      }
      if (this.pictureId == "") {
        Dialog.alert({
          title: "提示",
          message: "请添加客户照片！",
        });
        return;
      }
      if (this.businessLicenseNo == "") {
        Dialog.alert({
          title: "提示",
          message: "请输入营业执照号！",
        });
        return;
      }
      this.$httpPut({
        url: "/api/publicCustomersInfo/update",
        data: {
          code: this.id,
          name: this.publicCustomerName,
          address: this.publicCustomerAddress,
          gridding: this.prospect_detailsEdit.publicCustomerGrid,
          industryType: this.prospect_detailsEdit.industry,
          location: this.publicCustomerLocation,
          legalName: this.legalPersonName,
          legalPhone: this.legalPersonTelephone,
          customerImg: this.pictureId.join(","),
          businessLicenseNo: this.businessLicenseNo,
          otherContactsName: this.otherContactsName,
          otherContactsPhone: this.otherContactsTelephone,
        },
      })
        .then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
          // this.$router.go(-1);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    deleteRemark(val) {
      Dialog.confirm({
        title: "你确定删除吗",
      })
        .then(() => {
          this.$httpDelete({
            url: "/api/semCustRecords/delete",
            params: {
              ids: val,
            },
          })
            .then((res) => {
              Toast({
                message: "删除成功",
                position: "middle",
              });
              this.getMarkedRecord();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
  },
  filters: {
    dic_client_will(val) {
      const findWill = JSON.parse(localStorage.getItem("dicClientWill")).find(
        (it) => +it.key == val
      );
      // console.log(findWill);
      return findWill ? findWill.value : "";
    },
  },
};
</script>
<style scoped>
.public_nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000000;
}
.van-icon {
  font-size: 20px;
}
.van-nav-bar {
  background-color: rgb(61, 66, 94);
}
.van-nav-bar >>> .van-nav-bar__title {
  color: #ffffff !important;
  font-size: 16px;
  font-weight: 600;
}
.van-nav-bar__right img {
  width: 20px;
}
.share {
  color: #fff;
  font-weight: 600;
}
.van-nav-bar >>> .van-icon {
  color: #fff;
}
.income_expenditure .van-cell >>> .van-field__label {
  width: 75%;
}
.household_base .van-cell >>> .van-field__label {
  width: 7em;
}
.household_have .van-cell >>> .van-field__label {
  width: 5em;
}
.FarmersInformation {
  padding-top: 46px;
}
.FarmersInformation .tabList {
  display: flex;
  height: 3rem;
  line-height: 3rem;
  background: #fff;
  border-bottom: 0.001rem solid #e8e8e8;
  justify-content: space-between;
  padding: 0rem 1rem;
}
.van-radio--horizontal >>> .van-radio__icon {
  height: 24px !important;
}
input {
  border-radius: 0.3rem;
}
.bm-view {
  width: 100%;
  height: 15rem;
}
.bm-view1 {
  width: 100%;
  height: 23rem;
}
.checked::before {
  position: absolute;
  content: "";
  width: 0.8rem;
  height: 0.8rem;
  top: 0.1rem;
  background: rgb(61, 66, 94);
  left: 0.1rem;
  border-radius: 100%;
}
.checked {
  position: relative;
  background: #fff;
  border: 0.1rem solid rgb(61, 66, 94) !important;
  border-radius: 100%;
}
.cur {
  color: #df0f0f;
  position: relative;
}
textarea {
  border: 0.05rem solid #bbb;
  background-color: #fff;
  border-radius: 0.3rem;
  padding: 0.5rem;
}
.save {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 50px;
}
.save button {
  border: 0.05rem solid #bbb;
  background: #fff;
  color: #000;
  width: 6rem;
  height: 2rem;
  border-radius: 0.4rem;
}
.save1 {
  background: #fff;
  text-align: center;
  padding-bottom: 50px;
}
.save1 button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  border-radius: 0.4rem;
  color: #fff;
  width: 6rem;
  line-height: 2rem;
}

.save {
  text-align: center;
  padding-bottom: 50px;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 6rem;
  height: 2rem;
  border-radius: 0.3rem;
}
.img4 {
  position: absolute;
  right: 5%;
  top: 0.1rem;
  background: url("../../../assets/home/md-phone.svg") no-repeat;
  background-size: cover;
  width: 1rem;
  height: 1rem;
}
.img1 {
  position: absolute;
  right: -1.5rem;
  bottom: 0rem;
  background: url("../../../assets/home/md-phone.svg") no-repeat;
  background-size: cover;
  width: 1rem;
  height: 1rem;
}
/* 下面都是营销记录 */
.marked_record {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.marked_record p {
  margin: 3px 0px;
}
.positionFixd {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.approval .approval_Passed {
  display: inline-block;
  line-height: 1.6rem;
  text-align: center;
  width: 6.5rem;
  height: 1.6rem;
  font-size: 0.7rem;
  border: 1px solid #3cc8ab;
  color: #3cc8ab;
  margin-left: 0.5rem;
}
.approval .approval_Passed1 {
  display: inline-block;
  line-height: 1.6rem;
  text-align: center;
  width: 6.5rem;
  height: 1.6rem;
  font-size: 0.7rem;
  border: 1px solid #c1b9b9;
  color: #c1b9b9;
  margin-left: 0.5rem;
}
.add_record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  font-size: 0.8rem;
  border-radius: 100%;
  background-color: #3d425e;
  color: #fff;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  li,
  select,
  input,
  p,
  div,
  span {
    font-size: 0.8rem;
  }
  /*placeholder样式-开始*/
  input::-webkit-input-placeholder {
    font-size: 0.8rem !important;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: 0.8rem !important;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: 0.8rem !important;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    font-size: 0.8rem !important;
  }
  .cur {
    font-size: 0.8rem;
  }
  .end_line {
    font-size: 0.7rem;
  }
  .save1 button {
    font-size: 0.8rem;
    line-height: 1.8rem;
    height: 1.8rem;
    width: 5rem;
  }
  .approval .approval_Passed {
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .approval .approval_Passed1 {
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .add_record {
    width: 3.5rem;
    height: 3.5rem;
  }
}
</style>
