<template>
  <div class="AddPotentialCustomers">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '潜在客户添加'">
      <van-field
        v-model="customer_name"
        name="客户名称："
        label="客户名称："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写客户名称' }]"
      />
      <van-field
        v-model="phone_number"
        name="手机号："
        label="手机号："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="card_number"
        name="证件号码："
        label="证件号码："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写证件号码' }]"
      />
      <van-field
        v-model="weChat"
        name="微信："
        label="微信："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写微信' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="nation_txt.text"
        label="民族："
        placeholder="点击选择民族"
        @click="nation = true"
      />
      <van-popup v-model="nation" position="bottom">
        <van-picker
          show-toolbar
          :columns="nation_list"
          @confirm="onNation"
          @cancel="nation = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="marital_status_txt.text"
        label="婚姻状况："
        placeholder="点击选择婚姻状况"
        @click="marital_status = true"
      />
      <van-popup v-model="marital_status" position="bottom">
        <van-picker
          show-toolbar
          :columns="marital_status_list"
          @confirm="onMarital_status"
          @cancel="marital_status = false"
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
      <van-field
        v-model="work_unit"
        name="工作单位："
        label="工作单位："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写工作单位' }]"
      />
      <van-field
        v-model="contact_address"
        name="联系地址："
        label="联系地址："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写联系地址' }]"
      />
      <van-field
        v-model="annual_income"
        name="年收入："
        label="年收入："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写年收入' }]"
      />
      <van-field
        v-model="qq_number"
        name="QQ："
        label="QQ："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写QQ' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="education_level_txt.text"
        label="学历："
        placeholder="点击选择学历"
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
        :value="country_txt.text"
        label="国籍："
        placeholder="点击选择国籍"
        @click="country = true"
      />
      <van-popup v-model="country" position="bottom">
        <van-picker
          show-toolbar
          :columns="country_list"
          @confirm="onCountry"
          @cancel="country = false"
        />
      </van-popup>

      <van-field
        v-model="residential_address"
        name="居住地址："
        label="居住地址："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写居住地址' }]"
      />
      <van-field
        v-model="user_positioning"
        name="经纬度："
        label="经纬度："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写定位（经纬度）' }]"
      />
      <van-field
        v-model="work_address"
        name="工作地址："
        label="工作地址："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写工作地址' }]"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="health_txt.text"
        label="健康状况："
        placeholder="点击选择健康状况"
        @click="health = true"
      />
      <van-popup v-model="health" position="bottom">
        <van-picker
          show-toolbar
          :columns="health_list"
          @confirm="onHealth"
          @cancel="health = false"
        />
      </van-popup>
      <van-field
        v-model="car_number"
        name="车牌号："
        label="车牌号："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写车牌号' }]"
      />
      <div class="save">
        <van-button round block type="primary" @click="addResult()"
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
  name: "AddPotentialCustomers",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      phone_number: "",
      weChat: "",
      nation_txt: "",
      nation_list: [
        { index: 0, text: "汉族" },
      ],
      nation: false,
      marital_status_txt: "",
      marital_status_list: [
        { index: 0, text: "已婚" },
        { index: 1, text: "未婚" },
      ],
      marital_status: false,
      work_unit: "",
      contact_address: "",
      annual_income: "",
      qq_number: "",
      country_txt: "",
      country_list: [{ index: 0, text: "中国" }],
      country: false,
      residential_address: "",
      user_positioning: "",
      work_address: "",
      health_txt: "",
      health_list: [{ index: 0, text: "良好" }],
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
        { index: 0, text: "博士" },
        { index: 1, text: "硕士" },
        { index: 2, text: "本科" },
        { index: 3, text: "大专" },
        { index: 4, text: "中专" },
        { index: 5, text: "高中" },
        { index: 6, text: "初中" },
        { index: 7, text: "小学" },
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
      circlePath: {
        center: {
          lng: 114.65,
          lat: 33.37,
        },
        radius: 5000,
      },
      token: "",
      tabId: 0,
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
      value1: "",
      value2: "",
      value3: "",
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
      customer_name: "",
      card_number: "",
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  updated() {},
  methods: {
    onNation(value) {
      this.nation_txt = value;
      this.nation = false;
    },
    onMarital_status(value) {
      this.marital_status_txt = value;
      this.marital_status = false;
    },
    onCountry(value) {
      this.country_txt = value;
      this.country = false;
    },
    onHealth(value) {
      this.health_txt = value;
      this.health = false;
    },
    onEducation_level(value) {
      this.education_level_txt = value;
      this.education_level = false;
    },
    onRegional_grid(values) {
      this.regional_grid_txt = values.map((item) => item.name).join("/");
      this.regional_grid = false;
    },
    addResult() {
      this.$httpPost({
        url: "/api/customersPotential/add",
        data: {
          name: this.customer_name,
          telphone: this.phone_number,
          identifyNo: this.card_number,
          wechat: this.weChat,
          nation: this.nation_txt.index,
          marriage: this.marital_status_txt.index,
          gridding: this.regional_grid_txt,
          workUnit: this.work_unit,
          connectAddress: this.contact_address,
          annualIncome: this.annual_income,
          qq: this.qq_number,
          education: this.education_level_txt.index,
          nationality: this.country_txt.index,
          health: this.health_txt.index,
          address: this.residential_address,
          location: this.user_positioning,
          workAddress: this.work_address,
          plateNumber: this.car_number,
        },
      })
        .then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
          this.$router.go(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.AddPotentialCustomers {
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
