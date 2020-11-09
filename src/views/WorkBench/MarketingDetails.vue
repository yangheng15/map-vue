<template>
  <div class="MarketingDetails">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '营销客户详情'">
      <p class="detail_title">客户信息</p>
      <ul class="mission_details">
        <li>
          <span style="font-weight: 600"
            >客&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户：</span
          >
          {{ custName }}
          <router-link
            tag="a"
            class="img1"
            :to="{
              name: 'CustomerViewPresentation',
              query: { title: '客户视图', id: this.custId },
            }"
          ></router-link>
        </li>
        <li>
          <span style="font-weight: 600">营销产品：</span>{{ productName }}
          <router-link
            tag="a"
            class="img2"
            :to="{
              name: 'ProductIntroduction',
              query: { title: '产品介绍', productCode: productCode },
            }"
          ></router-link>
        </li>
        <li>
          <span style="font-weight: 600">客户地址：</span>{{ address }}
          <router-link
            tag="a"
            class="img3"
            :to="{
              name: 'MapAddressDisplay',
              query: { title: '地址', location: location, custName: custName },
            }"
          ></router-link>
        </li>
        <li>
          <span style="font-weight: 600">联系方式：</span>{{ telphone }}
          <a class="img4" :href="'tel:' + telphone"></a>
        </li>
        <li>
          <span style="font-weight: 600"
            >意&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向：</span
          >{{
            intention == 0
              ? "强"
              : intention == 1
              ? "一般"
              : intention == 2
              ? "无"
              : intention == 3
              ? "已有他行产品"
              : intention == 4
              ? "直接拒绝"
              : "同意采集"
          }}
        </li>
      </ul>
      <div>
        <p class="detail_title">营销记录</p>
        <ul style="background: #fff">
          <li
            v-for="(thisItem, index) in MarketingRecord"
            :key="index"
            class="marked_record"
          >
            <div class="positionFixd">
              <router-link
                tag="p"
                :to="{
                  name: 'EditMarketingRecord',
                  query: {
                    title: '营销记录',
                    id: thisItem.id,
                    custName: custName,
                    productName: productName,
                  },
                }"
                style="width: 55%"
                >{{ thisItem.semTime | transform }}</router-link
              >

              <p>
                <van-button
                  color="#3d425e"
                  size="mini"
                  @click="deleteRemark(thisItem.id)"
                  >删除</van-button
                >
              </p>
            </div>

            <div class="positionFixd">
              <router-link
                tag="p"
                :to="{
                  name: 'EditMarketingRecord',
                  query: {
                    title: '营销记录',
                    id: thisItem.id,
                    custName: custName,
                    productName: productName,
                  },
                }"
                class="dadian"
                >{{ thisItem.remark }}</router-link
              >
              <p style="width: 50%; display: flex" class="approval">
                <!-- <span class="approval_Passed">已营销</span> -->
                <span
                  :class="
                    thisItem.intention == '1'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{ thisItem.intention | dic_client_will }}</span
                >
                <span
                  :class="
                    thisItem.isSucc == '1'
                      ? 'approval_Passed'
                      : 'approval_Passed1'
                  "
                  >{{
                    thisItem.isSucc == "0"
                      ? "失败"
                      : thisItem.isSucc == "1"
                      ? "成功"
                      : thisItem.isSucc == "2"
                      ? "未成功"
                      : ""
                  }}
                </span>
              </p>
            </div>
          </li>
        </ul>
        <div class="end_line">已加载完毕</div>
      </div>
      <div
        style="
          margin-left: 85%;
          position: fixed !important;
          float: right;
          z-index: 9999;
          align-items: right;
          bottom: 5%;
          right: 5%;
        "
      >
        <router-link
          tag="span"
          class="add_record"
          :to="{
            name: 'AddMarketingRecord',
            query: {
              title: '添加营销记录',
              customerCode: this.customerCode,
              gridCode: this.gridCode,
              productCode: this.productCode,
              productName: this.productName,
              custName: this.custName,
              id: this.id,
            },
          }"
          >添加记录</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import { Dialog } from "vant";
export default {
  data() {
    return {
      MarketingRecord: [],
      tabId: 0,
      token: "",
      title: "详情",
      textTitle: "--",
      content: "",
      deliverTime: "",
      deliverDepartment: "",
      deliverPerson: "",
      articleId: "",
      isPlaying: false,
      dataURL: "",
      pictureId: undefined,
      isLGB: true,
      tpxw: {},
      isEdit: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      custName: "",
      telephone: "",
      intention: "",
      customerCode: "",
      gridCode: "",
      productCode: "",
      id: "",
      custId: "",
      taskId: "",
      productName: "",
      telphone: "",
      address: "",
      location: "",
    };
  },
  components: {
    ChildNav,
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.custName = this.$route.query.custName;
    this.intention = this.$route.query.intention;
    this.telephone = this.$route.query.telephone;
    this.customerCode = this.$route.query.customerCode;
    this.gridCode = this.$route.query.gridCode;
    this.productCode = this.$route.query.productCode;
    this.productName = this.$route.query.productName;
    this.address = this.$route.query.address;
    this.telphone = this.$route.query.telphone;
    this.location = this.$route.query.location;
    this.id = this.$route.query.id;
    this.custId = this.$route.query.custId;
    this.taskId = this.$route.query.taskId;
    this.getMarkedRecord();
  },
  updated() {},
  methods: {
    tab(ev) {
      this.tabId = ev;
    },
    getMarkedRecord() {
      // if (this.customerCode && this.gridCode) {
      this.$httpGet({
        url: "/api/appMarket/marketRecord",
        params: {
          customerCode: this.customerCode,
          limit: 10,
          gridCode: this.gridCode,
          taskId: this.taskId,
          page: 1,
        },
      }).then((res) => {
        this.MarketingRecord = res.data;
      });
      // }
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
      console.log(findWill);
      return findWill ? findWill.value : "";
    },
  },
};
</script>
<style scoped>
.positionFixd {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
.dadian {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.MarketingDetails {
  padding-top: 46px;
}
.end_line {
  margin: 1rem;
  text-align: center;
  color: #c1b9b9;
  font-size: 1rem;
}
.detail_title {
  padding: 0.3rem;
  font-size: 0.9rem;
  font-weight: 550;
  margin: 0;
  background: #f5f5f5;
}
.marked_record {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.marked_record p {
  margin: 3px 0px;
}
.approval {
  position: relative;
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
.cell_dashed {
  border-bottom: 0.001rem dashed #e8e8e8;
  height: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
.mission_details {
  background: #fff;
  padding-top: 0.5rem;
  position: relative;
}
.mission_details li {
  margin-bottom: 0.7rem;
  padding-left: 0.5rem;
}
.mission_details li img {
  width: 1.4rem;
  vertical-align: bottom;
  margin: 0rem 0rem 0rem 2rem;
}
.mission_details li a {
  text-decoration: none;
  /* float: right; */
  position: absolute;
  right: 0rem;
  top: 0.5rem;
  background: url("../../assets/WorkBench/img1.svg") no-repeat;
  background-size: cover;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 1rem;
}
.mission_details li .img2 {
  position: absolute;
  right: 0rem;
  top: 2.3rem;
  background: url("../../assets/WorkBench/img2.svg") no-repeat;
  background-size: cover;
}
.mission_details li .img3 {
  position: absolute;
  right: 0rem;
  top: 4.1rem;
  background: url("../../assets/WorkBench/img3.svg") no-repeat;
  background-size: cover;
}
.mission_details li .img4 {
  position: absolute;
  right: 0rem;
  top: 5.9rem;
  background: url("../../assets/WorkBench/img4.svg") no-repeat;
  background-size: cover;
}
.mission_details li .telephone {
  float: right;
  margin-right: 1rem;
}
.mission_details li:last-child {
  padding-bottom: 0.5rem;
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
  height: 0.05rem;
  background: #df0f0f;
}
.result_list {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  flex-wrap: wrap;
}
.result_list dt {
  width: 20%;
  font-weight: 500;
  font-size: 1rem;
  line-height: 2rem;
}
.result_list dd {
  width: 80%;
}
.result_list dd select {
  width: 100%;
  height: 2rem;
  border: 0.05rem solid #bbb;
  border-radius: 0.4rem;
}
.save {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0rem;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  width: 5rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #fff;
  border-radius: 0.3rem;
}
.competitor li {
  display: flex;
}
.competitor li p {
  width: 25%;
  line-height: 2rem;
}
.van-button--mini {
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
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
  .tabTitle .tabList {
    border-bottom: 0.001rem solid #e8e8e8 !important;
  }
  .cur {
    font-size: 0.8rem;
  }
  .task_management {
    line-height: 1.6rem;
    width: 5rem;
    height: 1.6rem;
    top: 0.5rem;
    font-size: 0.8rem;
    right: 1rem;
  }
  .customer_list ul li {
    padding: 0.3rem 0.5rem;
    font-size: 0.7rem !important;
  }
  .approval .approval_Passed {
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .approval .approval_Passed1 {
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .end_line {
    font-size: 0.7rem;
  }
  .add_record {
    width: 3.5rem;
    height: 3.5rem;
  }
  .mission_details li a,
  .mission_details li p {
    width: 1.3rem;
    height: 1.3rem;
  }
  .mission_details li {
    margin-bottom: 0.5rem;
  }
}
</style>
