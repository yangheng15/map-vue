<template>
  <div class="ScreenCustomerPool">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '筛选'">
      <van-form @submit="onSubmit">
        <van-field
          v-model="screen_name"
          name="姓名："
          label="姓名："
          placeholder="单行输入"
        />
        <van-field
          v-model="screen_number"
          name="编号："
          label="编号："
          placeholder="单行输入"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="key_customers_txt.text"
          label="重点客户："
          placeholder="点击选择是否重点客户"
          @click="key_customers = true"
        />
        <van-popup v-model="key_customers" position="bottom">
          <van-picker
            show-toolbar
            :columns="key_customers_list"
            @confirm="onKey_customers"
            @cancel="key_customers = false"
          />
        </van-popup>
        <van-field
          v-model="customer_base"
          name="客户群体："
          label="客户群体："
          placeholder="单行输入"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="custome_level_txt.text"
          label="客户等级："
          placeholder="点击选择客户等级"
          @click="Custome_level = true"
        />
        <van-popup v-model="Custome_level" position="bottom">
          <van-picker
            show-toolbar
            :columns="custome_level_list"
            @confirm="onCustome_level"
            @cancel="Custome_level = false"
          />
        </van-popup>
        <van-field
          v-model="recommended_products"
          name="推荐产品："
          label="推荐产品："
          placeholder="单行输入"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="education_level_txt.text"
          label="最高学历："
          placeholder="点击选择最高学历"
          @click="education_level = true"
        />
        <van-popup v-model="education_level" position="bottom">
          <van-picker
            show-toolbar
            :columns="education_level_list"
            @confirm="onEducation_level"
            @cancel="education_level = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="choose_gender_txt.text"
          label="性别："
          placeholder="点击选择性别"
          @click="choose_gender = true"
        />
        <van-popup v-model="choose_gender" position="bottom">
          <van-picker
            show-toolbar
            :columns="choose_gender_list"
            @confirm="onChoose_gender"
            @cancel="choose_gender = false"
          />
        </van-popup>
        <van-field
          v-model="screen_age"
          name="年龄："
          label="年龄："
          placeholder="单行输入"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="occupation_category_txt.text"
          label="职业类别："
          placeholder="点击选择职业类别"
          @click="occupation_category = true"
        />
        <van-popup v-model="occupation_category" position="bottom">
          <van-picker
            show-toolbar
            :columns="occupation_category_list"
            @confirm="onOccupation_category"
            @cancel="occupation_category = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="products_held_txt"
          label="持有产品："
          placeholder="点击选择持有产品"
          @click="products_held = true"
        />
        <van-popup v-model="products_held" position="bottom">
          <van-picker
            show-toolbar
            :columns="products_held_list"
            @confirm="onProducts_held"
            @cancel="products_held = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="picker"
          :value="organization_txt.text"
          label="所属机构："
          placeholder="点击选择所属机构"
          @click="organization = true"
        />
        <van-popup v-model="organization" position="bottom">
          <van-picker
            show-toolbar
            :columns="organization_list"
            @confirm="onOrganization"
            @cancel="organization = false"
          />
        </van-popup>
        <van-field
          readonly
          clickable
          name="area"
          :value="regional_grid_txt.text"
          label="所属网格："
          placeholder="点击选择所属网格"
          @click="regional_grid = true"
        />
        <van-popup v-model="regional_grid" position="bottom">
          <van-picker
          show-toolbar
          :columns="areaList"
          @cancel="regional_grid = false"
          @confirm="onRegional_grid"
        />
        </van-popup>
        <div class="save" style="margin: 16px">
          <van-button round block type="primary" @click="sceenPool()"
            >查询</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
export default {
  name: "ScreenCustomerPool",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      phone_number: "",
      weChat: "",
      nation_txt: "汉族",
      nation_list: ["汉族"],
      nation: false,
      marital_status_txt: "已婚",
      marital_status_list: ["已婚", "未婚"],
      marital_status: false,
      work_unit: "",
      contact_address: "",
      annual_income: "",
      qq_number: "",
      country_txt: "",
      country_list: ["中国"],
      country: false,
      residential_address: "",
      user_positioning: "",
      work_address: "",
      health_txt: "",
      health_list: ["请选择", "健康"],
      health: false,
      car_number: "",

      region_choice: false,
      active: false,
      screen_name: "",
      screen_number: "",
      customer_base: "",
      key_customers_txt: "",
      key_customers_list: [
        {
          index: 0,
          text: "否",
        },
        {
          index: 1,
          text: "是",
        },
      ],
      key_customers: false,
      custome_level_txt: "",
      custome_level_list: [],
      Custome_level: false,
      recommended_products: "",
      education_level_txt: "",
      education_level_list: [],
      education_level: false,
      choose_gender_txt: "",
      choose_gender_list: [
        {
          index: 0,
          text: "男",
        },
        {
          index: 1,
          text: "女",
        },
      ],
      choose_gender: false,
      occupation_category_txt: "",
      occupation_category_list: [],
      occupation_category: false,
      products_held_txt: "",
      products_held_list: ["请选择"],
      products_held: false,
      organization_txt: "",
      organization_list: [],
      organization: false,
      regional_grid_txt: "",
      areaList: [],
      regional_grid: false,
      screen_age: "",
      token: "",
      deliverTime: "",
      deliverDepartment: "",
      deliverPerson: "",
      articleId: "",
      isPlaying: false,
      dataURL: "",
      pictureId: undefined,
      value: "",
      showPicker: false,
    };
  },
  beforeRouteLeave (to, from, next) {
    this.$store.commit('SCREENING', {
          limit: 10,
          page: 1,
          name: this.screen_name,
          code: this.screen_number,
          branchCode: this.organization_txt.index,
          isPpoint: this.key_customers_txt.index,
          customer_base:this.customer_base,
          level: this.custome_level_txt.index,
          recommended_products:this.recommended_products,
          education: this.education_level_txt.index,
          gridding: this.regional_grid_txt.index,
          gender: this.choose_gender_txt.index,
          age:this.screen_age,
          profession: this.occupation_category_txt.index,
          products_held_txt:this.products_held_txt.index,
          regional_grid_txt:this.regional_grid_txt.index,
        })
        next();
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.dic_nation();
  },
  updated() {},
  methods: {
    dic_nation() {
      // 最高学历
      this.$httpGet({
        url: "/dic/type/dic_education",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.id, text: it.codeText });
          }
        });
        this.education_level_list = transformDara;
      });
      // 职业
      this.$httpGet({
        url: "/dic/type/dic_career",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.id, text: it.codeText });
          }
        });
        this.occupation_category_list = transformDara;
      });
      // 客户等级
      this.$httpGet({
        url: "/dic/type/dic_client_grade",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.custome_level_list = transformDara;
      });
      // 所属机构
      this.$httpGet({
        url: "/api/v1/org/all",
      }).then((res) => {
        let transformDara = [];
        res.row.forEach((it, index) => {
          transformDara.push({ index: it.pid, text: it.orgName });
        });
        this.organization_list = transformDara;
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
          it.children&&it.children.forEach((ele, index1) => {
            transformDara.push({ index: ele.code, text: ele.name });
          });
        });
        this.areaList = transformDara;
      });
    },
    onKey_customers(value) {
      this.key_customers_txt = value;
      this.key_customers = false;
    },
    onCustome_level(value) {
      this.custome_level_txt = value;
      this.Custome_level = false;
    },
    onEducation_level(value) {
      this.education_level_txt = value;
      this.education_level = false;
    },
    onChoose_gender(value) {
      this.choose_gender_txt = value;
      this.choose_gender = false;
    },
    onOccupation_category(value) {
      this.occupation_category_txt = value;
      this.occupation_category = false;
    },
    onOrganization(value) {
      this.organization_txt = value;
      this.organization = false;
    },
    onProducts_held(value) {
      this.products_held_txt = value;
      this.products_held = false;
    },
    onRegional_grid(values) {
      this.regional_grid_txt = values;
      this.regional_grid = false;
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    sceenPool() {
      this.$store.dispatch('UPDATESCREEN', {
          limit: 10,
          page: 1,
          name: this.screen_name,
          code: this.screen_number,
          branchCode: this.organization_txt.index,
          isPpoint: this.key_customers_txt.index,
          customer_base:this.customer_base,
          level: this.custome_level_txt.index,
          recommended_products:this.recommended_products,
          education: this.education_level_txt.index,
          gridding: this.regional_grid_txt.index,
          gender: this.choose_gender_txt.index,
          age:this.screen_age,
          profession: this.occupation_category_txt.index,
          products_held_txt:this.products_held_txt.index,
          regional_grid_txt:this.regional_grid_txt.index,
        }).then(() => {
          this.$router.back();
        })
    },
  },
};
</script>
<style scoped>
.ScreenCustomerPool {
  padding-top: 46px;
}
.sample {
  left: 2rem !important;
  top: 2rem !important;
  position: absolute;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
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
}
</style>
