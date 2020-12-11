<template>
  <div class="AssetsLiabilitiesDetail">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '农户资产负债详情'">
      <van-field
        readonly
        clickable
        name="picker"
        :value="
          prospect_details.type == 1
            ? '资产'
            : prospect_details.type == 2
            ? '负债'
            : ''
        "
        label="类型："
        placeholder="点击选择类型"
        @click="select_type = true"
      />
      <van-popup v-model="select_type" position="bottom">
        <van-picker
          show-toolbar
          :columns="select_type_list"
          @confirm="onSelect_type"
          @cancel="select_type = false"
        />
      </van-popup>
      <van-field
        v-if="prospect_details.type == 1"
        v-model="prospect_details.name"
        name="资产类型："
        label="资产类型："
        placeholder="请填写资产类型"
      />
      <van-field
        v-if="prospect_details.type !== 1"
        v-model="prospect_details.name"
        name="负债类型："
        label="负债类型："
        placeholder="请填写负债类型"
      />
      <van-field
        v-if="prospect_details.type == 1"
        v-model="prospect_details.amount"
        name="评估价值（万元）："
        label="评估价值（万元）："
        placeholder="请填写评估价值"
      />
      <van-field
        v-if="prospect_details.type !== 1"
        v-model="prospect_details.amount"
        name="负债金额（万元）："
        label="负债金额（万元）："
        placeholder="请填写负债金额"
      />
      <van-field
        v-model="prospect_details.description"
        rows="2"
        autosize
        label="描述"
        type="textarea"
        maxlength="50"
        placeholder="请输入描述"
        show-word-limit
      />
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="currentDate | transform"
        label="清查日期"
        placeholder="点击选择清查日期"
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
  name: "AssetsLiabilitiesDetail",
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
      prospect_details: "",
      prospect_detailsEdit: {},
      select_type_list: [
        {
          index: 1,
          text: "资产",
        },
        {
          index: 2,
          text: "负债",
        },
      ],
      select_type: false,
      currentDate: '',
      showPicker: false,
      currentDate1:''
    };
  },
  async created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    await this.editRecord();
    this.dic_nation();
  },
  updated() {},
  methods: {
    onSelect_type(value) {
      this.select_type_txt = value;
      this.select_type = false;
    },
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
      // debugger;
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
        url: `/api/customersFamilyAssetsLiability/get/${this.id}`,
      });
      this.prospect_details = res.data;
      this.currentDate = this.prospect_details.checkTime 
    },
    modifyResult() {
      this.$httpPut({
        url: "/api/customersFamilyAssetsLiability/update",
        data: {
          id: this.id,
          name: this.prospect_details.name,
          familyCode: this.prospect_details.familyCode,
          type: this.prospect_details.type,
          description: this.prospect_details.description,
          amount: this.prospect_details.amount,
          checkTime:this.currentDate1
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
          // console.log(err);
        });
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
@media screen and (min-width: 320px) and (max-width: 374px) {
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
