<template>
  <div class="ScreenCustomerPool">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='筛选'">
      <van-form @submit="onSubmit">
        <van-field
          v-model="screen_name"
          name="姓名："
          label="姓名："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="screen_number"
          name="编号："
          label="编号："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写编号' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="key_customers_txt"
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
          :rules="[{ required: true, message: '请填写客户群体' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="custome_level_txt"
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
          :rules="[{ required: true, message: '请填写推荐产品' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="education_level_txt"
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
          :value="choose_gender_txt"
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
          :rules="[{ required: true, message: '请填写年龄' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="occupation_category_txt"
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
          :value="organization_txt"
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
          :value="regional_grid_txt"
          label="所属网格："
          placeholder="点击选择所属网格"
          @click="regional_grid = true"
        />
        <van-popup v-model="regional_grid" position="bottom">
          <van-area
            :area-list="areaList"
            @confirm="onRegional_grid"
            @cancel="regional_grid = false"
          />
        </van-popup>
        <div class="save" style="margin: 16px;">
          <van-button round block type="primary" @click="prev()">查询</van-button>
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
      key_customers_list: ["是", "否"],
      key_customers: false,
      custome_level_txt: "",
      custome_level_list: ["铂金", "钻石"],
      Custome_level: false,
      recommended_products: "",
      education_level_txt: "",
      education_level_list: [
        "博士",
        "硕士",
        "本科",
        "大专",
        "中专",
        "高中",
        "初中",
        "小学",
      ],
      education_level: false,
      choose_gender_txt: "",
      choose_gender_list: ["男", "女"],
      choose_gender: false,
      occupation_category_txt: "",
      occupation_category_list: ["请选择"],
      occupation_category: false,
      products_held_txt: "",
      products_held_list: ["请选择"],
      products_held: false,
      organization_txt: "",
      organization_list: ["请选择"],
      organization: false,
      regional_grid_txt: "",
      areaList: {
        province_list: {
          110000: "川汇区",
          120000: "项城市",
          130000: "扶沟县",
          140000: "西华县",
          150000: "商水县",
          160000: "沈丘县",
        },
        city_list: {
          110100: "陈州回族街道",
          110200: "七一路街道",
          110300: "荷花路街道",
          110400: "人和街道",
          110500: "小桥街道",
          110600: "李埠口乡",

          120100: "花园街道",
          120200: "水寨街道",
          120300: "东方街道",
          120400: "莲花街道",
          120500: "千佛阁街道",
          120600: "光武街",

          130100: "桐丘街道",
          130200: "扶亭街道",
          130300: "崔桥镇",
          130400: "江村镇",
          130500: "白潭镇",
          130600: "韭园镇",
        },
        county_list: {
          110101: "城关村",
          110102: "化河村",
          110205: "王店村",
          110206: "许湾村",
          110301: "城关村",
          110302: "城郊村",
          110401: "王皮溜镇",
          110402: "太清宫镇",
          110505: "迟营村",
          110506: "田口村",
          110601: "胡集村",
          110702: "古郊村",

          120101: "南顿村",
          120102: "高寺村",
          120203: "官会村",
          120204: "丁集村",
          120305: "郑郭村",
          120306: "范集村",

          130101: "包屯村",
          130102: "曹里村",
          130203: "大李村",
          130204: "练寺村",
          130305: "汴岗村",
          130306: "范集村",
        },
      },
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
      columns: [
        {
          text: "川汇区",
          children: [
            {
              text: "陈州回族街道",
              children: [{ text: "城关村" }, { text: "化河村" }],
            },
            {
              text: "七一路街道",
              children: [{ text: "王店村" }, { text: "许湾村" }],
            },
            {
              text: "荷花路街道",
              children: [{ text: "城关村" }, { text: "城郊村" }],
            },
            {
              text: "人和街道",
              children: [{ text: "王皮溜镇" }, { text: "太清宫镇" }],
            },
            {
              text: "小桥街道",
              children: [{ text: "迟营村" }, { text: "田口村" }],
            },
            {
              text: "李埠口乡",
              children: [{ text: "胡集村" }, { text: "古郊村" }],
            },
          ],
        },
        {
          text: "淮阳区",
          children: [
            {
              text: "柳湖街道",
              children: [{ text: "豆门村" }, { text: "冯塘村" }],
            },
            {
              text: "城关回族镇",
              children: [{ text: "刘振村" }, { text: "许湾村" }],
            },
            {
              text: "新站镇",
              children: [{ text: "城关村" }, { text: "黄集村" }],
            },
            {
              text: "鲁台镇",
              children: [{ text: "齐老镇" }, { text: "曹河镇" }],
            },
            {
              text: "四通镇",
              children: [{ text: "迟营村" }, { text: "田口村" }],
            },
            {
              text: "临蔡镇",
              children: [{ text: "胡集村" }, { text: "古郊村" }],
            },
          ],
        },
        {
          text: "项城市",
          children: [
            {
              text: "花园街道",
              children: [{ text: "南顿村" }, { text: "高寺村" }],
            },
            {
              text: "水寨街道",
              children: [{ text: "官会村" }, { text: "丁集村" }],
            },
            {
              text: "东方街道",
              children: [{ text: "郑郭村" }, { text: "范集村" }],
            },
            {
              text: "莲花街道",
              children: [{ text: "三店镇" }, { text: "永丰镇" }],
            },
            {
              text: "千佛阁街道",
              children: [{ text: "迟营村" }, { text: "田口村" }],
            },
            {
              text: "光武街",
              children: [{ text: "胡集村" }, { text: "古郊村" }],
            },
          ],
        },
        {
          text: "扶沟县",
          children: [
            {
              text: "桐丘街道",
              children: [{ text: "包屯村" }, { text: "曹里村" }],
            },
            {
              text: "扶亭街道",
              children: [{ text: "大李村" }, { text: "练寺村" }],
            },
            {
              text: "崔桥镇",
              children: [{ text: "汴岗村" }, { text: "范集村" }],
            },
            {
              text: "江村镇",
              children: [{ text: "三店镇" }, { text: "永丰镇" }],
            },
            {
              text: "白潭镇",
              children: [{ text: "迟营村" }, { text: "田口村" }],
            },
            {
              text: "韭园镇",
              children: [{ text: "胡集村" }, { text: "古郊村" }],
            },
          ],
        },
        {
          text: "西华县",
          children: [
            {
              text: "昆山",
              children: [{ text: "红花村" }, { text: "聂堆村" }],
            },
            {
              text: "娲城",
              children: [{ text: "东夏村" }, { text: "迟营村" }],
            },
            {
              text: "箕子台个街道",
              children: [{ text: "叶埠村" }, { text: "皮营" }],
            },
            {
              text: "西夏亭",
              children: [{ text: "三店镇" }, { text: "永丰镇" }],
            },
            {
              text: "逍遥",
              children: [{ text: "迟营村" }, { text: "田口村" }],
            },
            {
              text: "奉母",
              children: [{ text: "胡集村" }, { text: "古郊村" }],
            },
          ],
        },
        {
          text: "商水县",
          children: [
            {
              text: "柳湖街道",
              children: [{ text: "豆门村" }, { text: "冯塘村" }],
            },
            {
              text: "城关回族镇",
              children: [{ text: "刘振村" }, { text: "许湾村" }],
            },
            {
              text: "新站镇",
              children: [{ text: "城关村" }, { text: "黄集村" }],
            },
            {
              text: "鲁台镇",
              children: [{ text: "齐老镇" }, { text: "曹河镇" }],
            },
            {
              text: "四通镇",
              children: [{ text: "迟营村" }, { text: "田口村" }],
            },
            {
              text: "临蔡镇",
              children: [{ text: "胡集村" }, { text: "古郊村" }],
            },
          ],
        },
        {
          text: "沈丘县",
          children: [
            {
              text: "桐丘街道",
              children: [{ text: "包屯村" }, { text: "曹里村" }],
            },
            {
              text: "扶亭街道",
              children: [{ text: "大李村" }, { text: "练寺村" }],
            },
            {
              text: "崔桥镇",
              children: [{ text: "汴岗村" }, { text: "范集村" }],
            },
            {
              text: "江村镇",
              children: [{ text: "三店镇" }, { text: "永丰镇" }],
            },
            {
              text: "白潭镇",
              children: [{ text: "迟营村" }, { text: "田口村" }],
            },
            {
              text: "韭园镇",
              children: [{ text: "胡集村" }, { text: "古郊村" }],
            },
          ],
        },
      ],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  updated() {},
  methods: {
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
      this.regional_grid_txt = values.map((item) => item.name).join("/");
      this.regional_grid = false;
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    prev() {
      this.$router.go(-1);
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
