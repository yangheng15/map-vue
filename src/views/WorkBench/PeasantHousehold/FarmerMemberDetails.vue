<template>
  <div class="EditPotentialCustomers">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '农户成员详情'">
      <van-field
        v-model="prospect_details.name"
        name="姓名："
        label="姓名："
        placeholder="请填写姓名"
      />
       <!-- <van-field
        v-model="prospect_details.age"
        name="年龄："
        label="年龄："
        placeholder="请填写年龄"
      /> -->
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="currentDate | transform"
        label="出生日期"
        placeholder="点击选择出生日期"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          type="date"
          :min-date="minBirthDate" 
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <van-field
        v-model="prospect_details.relationship"
        name="与户主关系："
        label="与户主关系："
        placeholder="请填写与户主关系"
      />
      <van-field
        v-model="prospect_details.telphone"
        name="手机号："
        label="手机号："
        placeholder="请填写手机号"
      />
      <van-field
        v-model="prospect_details.identifyNo"
        name="身份证号："
        label="身份证号："
        placeholder="请填写身份证号"
      />
      <van-field
        v-model="prospect_details.annualIncome"
        name="年收入："
        label="年收入："
        placeholder="请填写年收入"
      />
      <div class="save">
        <van-button round block type="primary" @click="modifyResult()"
          >保存</van-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import { Toast } from "vant";
export default {
  name: "EditPotentialCustomers",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      nation_txt: "",
      nation_list: [],
      nation: false,
      value: "",
      id: "",
      familyCode: "",
      prospect_details: "",
      prospect_detailsEdit: {},
      minBirthDate: new Date(1920, 0, 1),
      currentDate: '',
      showPicker: false,
      currentDate1:''
    };
  },
  async created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    this.familyCode = this.$route.query.familyCode;
    await this.editRecord();
    this.dic_nation();
  },
  updated() {},
  methods: {
    enumData(val, data) {
      if (val && data.length > 0) {
        const find = data.find((it) => it.index === +val);
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    dic_nation() {
      // 民族
      this.$httpGet({
        url: "/dic/type/dic_nation",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.id, text: it.codeText });
          }
        });
        this.nation_list = transformDara;
        this.prospect_details.nation = this.enumData(
          this.prospect_details.nation,
          this.nation_list
        );
      });
    },
    onNation(value) {
      this.prospect_detailsEdit.nation = value.index;
      this.prospect_details.nation = value.text;
      this.nation = false;
    },
        onConfirm(time) {
      // this.currentDate = `${time.getFullYear()}-${
      //   time.getMonth() + 1
      // }-${time.getDate()}`;
      this.currentDate = time
      this.currentDate1 = time
      this.showPicker = false;
    },
    async editRecord(val) {
      const res = await this.$httpGet({
        url: `/api/customersFamilyMembers/get/${this.id}`,
      });
      this.prospect_details = res.data;
      this.currentDate = this.prospect_details.birthday 
    },
    modifyResult() {
      this.$httpPut({
        url: "/api/customersFamilyMembers/update",
        data: {
          id: this.id,
          familyCode: this.familyCode,
          name: this.prospect_details.name,
          age: this.prospect_details.age,
          telphone: this.prospect_details.telphone,
          identifyNo: this.prospect_details.identifyNo,
          relationship: this.prospect_details.relationship,
          annualIncome: this.prospect_details.annualIncome,
          birthday:this.currentDate1
        },
      })
        .then((res) => {
          Toast({
            message: "修改成功",
            position: "middle",
          });
          this.$router.go(-1);
        })
        .catch((err) => {
        });
    },
  },
};
</script>
<style scoped>
.EditPotentialCustomers {
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
