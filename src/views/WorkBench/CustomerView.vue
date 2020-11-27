<template>
  <div class="CustomerView">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '客户视图'">
      <div class="tabTitle" style="border-top: 0px; padding-top: 0rem">
        <ul
          class="tabList"
          style="
            display: flex;
            height: 3rem;
            line-height: 3rem;
            background: #fff;
            border-bottom: 0.001rem solid #e8e8e8;
            padding: 0rem 1rem;
            justify-content: space-between;
          "
        >
          <li @click="tab(0)" :class="tabId == 0 ? 'cur' : 'ordinary'">
            基本信息
          </li>
          <li @click="tab(1)" :class="tabId == 1 ? 'cur' : 'ordinary'">
            联系方式
          </li>
          <li @click="tab(2)" :class="tabId == 2 ? 'cur' : 'ordinary'">学历</li>
          <li @click="tab(3)" :class="tabId == 3 ? 'cur' : 'ordinary'">工作</li>
        </ul>
        <div v-show="tabId === 0">
          <van-form @submit="onSubmit">
            <van-field
              v-model="CustomerViewDetails.code"
              name="客户编号："
              label="客户编号："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写客户编号' }]"
            />
            <van-field
              readonly
              clickable
              name="picker"
              :value="CustomerViewDetails.level"
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
              readonly
              clickable
              name="picker"
              :value="CustomerViewDetails.gender == 0 ? '男' : '女'"
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
              v-model="CustomerViewDetails.faith"
              name="宗教信仰："
              label="宗教信仰："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写宗教信仰' }]"
            />
            <van-field
              readonly
              clickable
              name="picker"
              :value="CustomerViewDetails.education"
              label="教育程度："
              placeholder="点击选择教育程度"
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
              v-model="CustomerViewDetails.name"
              name="客户名称："
              label="客户名称："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写客户名称' }]"
            />
            <van-field
              readonly
              clickable
              name="picker"
              :value="CustomerViewDetails.marriage"
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
              v-model="CustomerViewDetails.interest"
              name="兴趣爱好："
              label="兴趣爱好："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写兴趣爱好' }]"
            />
            <van-field
              v-model="CustomerViewDetails.identifyNo"
              name="身份证号："
              label="身份证号："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写身份证号' }]"
            />
            <van-field
              readonly
              clickable
              name="picker"
              :value="CustomerViewDetails.nation"
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
              name="calendar"
              :value="CustomerViewDetails.birthdayGl | transform"
              label="出生日期"
              placeholder="点击选择出生日期"
              @click="showDateBirth = true"
            />
            <van-calendar v-model="showDateBirth" @confirm="onDateBirth" />
            <van-field
              readonly
              clickable
              name="picker"
              :value="CustomerViewDetails.children"
              label="子女状况："
              placeholder="点击选择子女状况"
              @click="childrenStatus = true"
            />
            <van-popup v-model="childrenStatus" position="bottom">
              <van-picker
                show-toolbar
                :columns="childrenStatus_list"
                @confirm="onChildrenStatus"
                @cancel="childrenStatus = false"
              />
            </van-popup>
            <van-field
              readonly
              clickable
              name="picker"
              :value="CustomerViewDetails.profession"
              label="职业："
              placeholder="点击选择职业"
              @click="professionStatus = true"
            />
            <van-popup v-model="professionStatus" position="bottom">
              <van-picker
                show-toolbar
                :columns="professionStatus_list"
                @confirm="onProfessionStatus"
                @cancel="professionStatus = false"
              />
            </van-popup>
            <div class="save">
              <van-button
                round
                block
                type="primary"
                @click="addBasicInformation()"
                >保存</van-button
              >
            </div>
          </van-form>
        </div>
        <div v-show="tabId === 1">
          <van-field
            v-model="CustomerViewDetails.telphone"
            name="手机号码："
            label="手机号码："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写手机号码' }]"
          >
            <template #button>
              <a class="img4" :href="'tel:' + phone_number"></a>
            </template>
          </van-field>
          <van-field
            v-model="CustomerViewDetails.address"
            name="居住地址："
            label="居住地址："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写居住地址' }]"
          />
          <!-- <van-field
            v-model="work_address"
            name="工作地址："
            label="工作地址："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写工作地址' }]"
          /> -->
          <van-field
            v-model="CustomerViewDetails.qq"
            name="QQ："
            label="QQ："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写QQ' }]"
          />
          <van-field
            v-model="CustomerViewDetails.workUnit"
            name="工作单位："
            label="工作单位："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写工作单位' }]"
          />
          <van-field
            v-model="CustomerViewDetails.wechat"
            name="微信："
            label="微信："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写微信' }]"
          />
          <van-field
            v-model="CustomerViewDetails.contactAddr"
            name="联系地址："
            label="联系地址："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写联系地址' }]"
          />
          <van-field
            readonly
            clickable
            name="area"
            :value="CustomerViewDetails.gridding"
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
          <van-field
            v-model="CustomerViewDetails.location"
            readonly
            name="位置："
            label="位置："
            placeholder="单行输入"
          >
          <template #button>
            <img
              @click="getLongitudeLatitude"
              style="opacity: 0.9; margin-right: 15px"
              class=""
              src="../../assets/grid/sign.svg"
              alt=""
            /> </template>
          </van-field>
          <div
            style="width: 99%; margin: 0.5rem auto; position: relative"
            v-if="longitudeLatitude"
          >
            <baidu-map
              class="bm-view"
              :center="mapCenter1"
              :zoom="zoom"
              ak="WjS3NqjeiRpXVIQiWp2WiHhFyEcYz90e"
              @longpress="longpress"
              @ready="mapReady"
            >
              <bm-marker
                :dragging="true"
                :position="mapCenter"
                @dragend="markerDragend"
                :icon="{
                  url: require('../../assets/grid/sign.svg'),
                  size: { width: 30, height: 30 },
                }"
              ></bm-marker>
              <template>
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
                  <img src="../../assets/grid/current_location.svg" alt />
                </p>
              </template>
            </baidu-map>
          </div>
          <div class="save" style="margin-top: 20px">
            <van-button
              round
              block
              type="primary"
              @click="addBasicInformation()"
              >保存</van-button
            >
          </div>
        </div>
        <div v-show="tabId === 2">
          <div
            class="stock stock_education"
            v-for="(thisItem, index) in educationList"
            :key="index"
          >
            <div>
              <p>{{ thisItem.school }}</p>
              <p>{{ thisItem.education | dic_education }}</p>
              <p>{{ thisItem.createdTime | transform }}</p>
            </div>
            <p>{{ thisItem.profession }}</p>
            <p class="delete" @click="deleteCustomersAcademic(thisItem.id)">
              删除
            </p>
          </div>
          <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
          <span class="add_record" @click="showPopupEducation()">+</span>
          <div
            v-show="isPopupVisibleEducation"
            style="
              position: fixed;
              z-index: 100;
              top: 0px;
              left: 0rem;
              width: 100%;
              height: 100vh;
              padding: 0.5rem 0.5rem;
              background: rgba(193, 185, 185, 0.7);
            "
          >
            <div
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 77%;
                background: rgb(255, 255, 255);
                border-radius: 0.5rem;
              "
            >
              <p class="pop_title">学历添加</p>
              <van-field
                v-model="school"
                name="学校"
                label="学校"
                placeholder="单行输入"
                :rules="[{ required: true, message: '请填写学校' }]"
              />
              <van-field
                v-model="major"
                name="专业"
                label="专业"
                placeholder="单行输入"
                :rules="[{ required: true, message: '请填写专业' }]"
              />
              <!-- <van-field
                readonly
                clickable
                name="calendar"
                :value="admission_time"
                label="入学时间"
                placeholder="点击选择入学时间"
                @click="showAdmission_time = true"
              />
              <van-calendar
                v-model="showAdmission_time"
                @confirm="onAdmission_time"
              />
              <van-field
                readonly
                clickable
                name="calendar"
                :value="graduation_time"
                label="毕业时间"
                placeholder="点击选择毕业时间"
                @click="showGraduation_time = true"
              />
              <van-calendar
                v-model="showGraduation_time"
                @confirm="onGraduation_time"
              /> -->
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
                  @confirm="onEducation_level1"
                  @cancel="education_level = false"
                />
              </van-popup>
              <div style="margin-top: 3rem" class="save_pop">
                <van-button
                  style="margin-right: 1rem"
                  round
                  type="primary"
                  @click="addCustomersAcademic()"
                  >保存</van-button
                >
                <van-button round type="primary" @click="closePopupEducation()"
                  >取消</van-button
                >
              </div>
            </div>
          </div>
        </div>
        <div v-show="tabId === 3">
          <div
            class="stock stock_education"
            v-for="(thisItem, index) in workList"
            :key="index"
          >
            <div>
              <p>{{ thisItem.companyName }}</p>
              <p>{{ thisItem.createdTime | transform }}</p>
            </div>
            <p>{{ thisItem.post }}</p>
            <p class="delete" @click="deleteCustomersWork(thisItem.id)">删除</p>
          </div>
          <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
          <span class="add_record" @click="showPopupWork()">+</span>
          <div
            v-show="isPopupVisibleWork"
            style="
              position: fixed;
              z-index: 100;
              top: 0px;
              left: 0rem;
              width: 100%;
              height: 100vh;
              padding: 0.5rem 0.5rem;
              background: rgba(193, 185, 185, 0.7);
            "
          >
            <div
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 77%;
                background: rgb(255, 255, 255);
                border-radius: 0.5rem;
              "
            >
              <p class="pop_title">工作添加</p>
              <van-field
                v-model="corporate_name"
                name="公司名称"
                label="公司名称"
                placeholder="单行输入"
                :rules="[{ required: true, message: '请填写公司名称' }]"
              />
              <van-field
                v-model="position"
                name="职位"
                label="职位"
                placeholder="单行输入"
                :rules="[{ required: true, message: '请填写职位' }]"
              />
              <div style="margin-top: 3rem" class="save_pop">
                <van-button
                  style="margin-right: 1rem"
                  round
                  type="primary"
                  @click="addCustomersWork()"
                  >保存</van-button
                >
                <van-button round type="primary" @click="closePopupWork()"
                  >取消</van-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import con from "../../assets/grid/location_map.svg";
import { Toast, Dialog } from "vant";
export default {
  components: {
    ChildNav,
  },
  data() {
    return {
      radio: "2",
      customer_number: "112346546",
      customer_rating: "二级",
      choose_gender_txt: "女",
      choose_gender_list: ["男", "女"],
      choose_gender: false,
      religious_belief: "无",
      education_level_txt: "",
      education_level_list: [],
      education_level: false,
      marital_status_txt: "",
      marital_status_list: [],
      marital_status: false,
      screen_name: "陈晓坛",
      nation_txt: "",
      nation_list: [],
      nation: false,
      childrenStatus_txt: "",
      childrenStatus_list: [],
      childrenStatus: false,
      customer_hobby: "无",
      customer_id: "110242199702125858",
      date_of_birth: "2020-10-18",
      showDateBirth: false,
      occupation: "程序员",
      phone_number: "15840991076",
      residential_address: "郑州周口市",
      work_address: "郑州周口市",
      qq_number: "2548456723",
      work_unit: "北京卓越联腾",
      weChat: "45483567953",
      user_positioning: "175.255,33.71",
      contact_address: "北京卓越联腾",

      regional_grid_txt: "川汇区/陈州回族街道/城关村",
      areaList: [],
      prospect_detailsEdit: {},
      regional_grid: false,
      school: "",
      major: "",
      admission_time: "",
      showAdmission_time: false,
      graduation_time: "",
      showGraduation_time: false,
      corporate_name: "",
      position: "",

      family_number: "154235945121",
      family_type_txt: "经营型",
      family_type_list: ["务工，务农", "经营型"],
      family_type: false,
      property_situation_txt: "商品房",
      property_situation_list: ["无房", "自建", "商品房"],
      property_situation: false,
      vehicle_condition_txt: "一辆",
      vehicle_condition_list: ["无车", "一辆", "两辆", "三辆以上"],
      vehicle_condition: false,
      credit_epresentative: "张军",
      credit_amount: "600",
      credit_amount: "1000",
      family_num: "4",
      business_opening:
        "活期存款、定期存款、网上银行、手机银行、支付宝支付、信用卡",
      mainEvaluation: "大家都非常好",
      detailed_address: "吉林省白城市大安市安广镇大田村",
      contacts: "张军",
      household_name: "",
      household_age: "",
      annual_income: "",
      relationship_householder_txt: "",
      relationship_householder_list: ["户主", "夫妻", "父女", "父子"],
      relationship_householder: false,
      select_type_txt: "",
      select_type_list: ["资产", "贷款"],
      select_type: false,
      asset_type_txt: "",
      asset_type_list: ["房产", "汽车"],
      asset_type: false,
      debt_type_txt: "",
      debt_type_list: ["房产", "汽车"],
      debt_type: false,
      evaluation_value: "",
      amount_liabilities: "",
      message_income: "",
      con1: con,
      active: false,
      circlePath: {
        center: {
          lng: 114.65,
          lat: 33.37,
        },
        radius: 5000,
      },
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
      educationList: [],
      workList: [
        {
          university: "XXXX商贸公司",
          date: "2005~2008",
          major: "副总经理",
        },
        {
          university: "XXX外贸公司",
          date: "2001~2005",
          major: "职员",
        },
      ],
      customer_pool: [
        {
          name: "20001",
          text: "XXXX-网格",
          id: 0,
        },
        {
          name: "10001",
          text: "XXXX-网格",
          id: 1,
        },
      ],
      isPopupVisible: false,
      showPicker: false,
      isPopupVisibleFamily: false,
      isPopupVisibleAssets: false,
      isPopupVisibleEducation: false,
      isPopupVisibleWork: false,
      id: "",
      CustomerViewDetails: "",
      level: "",
      custome_level_txt: "",
      custome_level_list: [],
      Custome_level: false,
      professionStatus_txt: "",
      professionStatus_list: [],
      professionStatus: false,
      longitudeLatitude: false,
      mapCenter: { lng: "114.654102", lat: "33.623741" },
      mapCenter1: { lng: "114.654102", lat: "33.623741" },
      zoomNum: 19,
      zoom: 20
    };
  },
  async created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    await this.getCustomerView();
    this.dic_nation();
    console.log(this.CustomerViewDetails.location );
    if (this.CustomerViewDetails.location == "") {
      debugger
      this.appMessage();
    }
  },

  methods: {
    getLongitudeLatitude() {
      this.longitudeLatitude = !this.longitudeLatitude;
    },
    appMessage() {
      let positionArr = window.android.getLocation().split(",");
      this.mapCenter = { lng: positionArr[0], lat: positionArr[1] };
      this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
      this.CustomerViewDetails.location = positionArr.toString();
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
        if(positionArr[0] === this.mapCenter1.lng && positionArr[1] === this.mapCenter1.lat) {// 如果当前的 中心点和之前的中心点一样
          this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1]+0.0001 }; //直接将中心点回传不生效，需要稍微改动一下中心点
          this.zoomNum = this.map.getZoom()
          return
        }
        this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
        this.mapCenter = this.mapCenter1
        // this.zoomNum = 20;
        this.zoomNum = this.map.getZoom()
        this.createMarker(positionArr);
      }
      if (isiOS) {
        let positionArr = window.prompt("getLocation").split(",");
        // let positionArr = [124.281873, 45.514322]
        if(positionArr[0] === this.mapCenter1.lng && positionArr[1] === this.mapCenter1.lat) {// 如果当前的 中心点和之前的中心点一样
          this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1]+0.0001 }; //直接将中心点回传不生效，需要稍微改动一下中心点
          this.zoomNum = this.map.getZoom()
          return
        }
        this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
        this.mapCenter = this.mapCenter1
        // this.zoomNum = 20;
        this.zoomNum = this.map.getZoom()
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
    mapReady({ BMap, map }) {
      this.map = map;
    },
    longpress({ point }) {
      console.log(123);
      const zoom = this.map.getZoom();
      if( Math.abs(zoom - this.zoom) > 0) {
          this.zoom = zoom
          return;
      }
      this.markerLongpress(point)
      // clearTimeout(this.timeOutEvent);
      // // this.timeOutEvent = 0;
      // this.timeOutEvent = setTimeout(() => {
      //   //执行长按要执行的内容
      //   this.markerLongpress(point);
      //   this.timeOutEvent = 0;
      // }, 600);
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
          this.CustomerViewDetails.location = `${lng},${lat}`;
        })
        .catch(() => {
          // on cancel
        });
    },
    tab(ev) {
      this.tabId = ev;
      if (this.tabId === 2) {
        this.getCustomersAcademic();
      } else if (this.tabId === 3) {
        this.getCustomersWor();
        // GET /api/customersWork/query
      }
    },
    getCustomersAcademic() {
      this.$httpGet({
        url: "/api/customersAcademic/query",
        params: {
          customersCode: this.CustomerViewDetails.code,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.educationList = res.data;
      });
    },
    getCustomersWor() {
      this.$httpGet({
        url: "/api/customersWork/query",
        params: {
          customersCode: this.CustomerViewDetails.code,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.workList = res.data;
      });
    },
    addBasicInformation() {
      this.$httpPut({
        url: "/api/customersBasicInfo/update",
        data: {
          id: this.CustomerViewDetails.id,
          code: this.CustomerViewDetails.code,
          name: this.CustomerViewDetails.name,
          identifyNo: this.CustomerViewDetails.identifyNo,
          level: this.prospect_detailsEdit.level,
          nationality: this.CustomerViewDetails.nationality,
          nation: this.prospect_detailsEdit.nation,
          gender: this.prospect_detailsEdit.gender,
          birthdayGl: this.CustomerViewDetails.birthdayGl,
          faith: this.CustomerViewDetails.faith,
          marriage: this.prospect_detailsEdit.marriage,
          children: this.prospect_detailsEdit.children,
          education: this.prospect_detailsEdit.education,
          interest: this.CustomerViewDetails.interest,
          profession: this.prospect_detailsEdit.profession,
          telphone: this.CustomerViewDetails.telphone,
          qq: this.CustomerViewDetails.qq,
          wechat: this.CustomerViewDetails.wechat,
          address: this.CustomerViewDetails.address,
          gridding: this.prospect_detailsEdit.gridding,
          location: this.CustomerViewDetails.location,
          workUnit: this.CustomerViewDetails.workUnit,
          contactAddr: this.CustomerViewDetails.contactAddr,
        },
      })
        .then((res) => {
          Toast({
            message: "修改成功",
            position: "middle",
          });
          // this.$router.go(-1);
        })
        .catch((err) => {});
    },
    enumData1(val, data) {
      let find = "";
      if (val && data.length > 0) {
        find = data.find((it) => it.index == val);
        return find ? find.text : "";
      } else {
        return "";
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
    onCustome_level(value) {
      this.prospect_detailsEdit.level = value.index;
      this.CustomerViewDetails.level = value.text;
      this.Custome_level = false;
    },
    onProfessionStatus(value) {
      this.prospect_detailsEdit.profession = value.index;
      this.CustomerViewDetails.profession = value.text;
      this.professionStatus = false;
    },
    dic_nation() {
      // 最高学历
      this.$httpGet({
        url: "/dic/type/dic_education",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.education_level_list = transformDara;
        this.CustomerViewDetails.education = this.enumData(
          this.CustomerViewDetails.education,
          this.education_level_list
        );
      });
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
        this.CustomerViewDetails.gridding = this.enumData1(
          this.CustomerViewDetails.gridding,
          this.areaList
        );
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
        this.CustomerViewDetails.level = this.enumData1(
          this.CustomerViewDetails.level,
          this.custome_level_list
        );
      });
      // 婚姻状况
      this.$httpGet({
        url: "/dic/type/dic_marital_status",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.marital_status_list = transformDara;
        this.CustomerViewDetails.marriage = this.enumData1(
          this.CustomerViewDetails.marriage,
          this.marital_status_list
        );
      });
      // 子女状况
      this.$httpGet({
        url: "/dic/type/dic_children_num",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.childrenStatus_list = transformDara;
        this.CustomerViewDetails.children = this.enumData1(
          this.CustomerViewDetails.children,
          this.childrenStatus_list
        );
      });
      // 职业
      this.$httpGet({
        url: "/dic/type/dic_career",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.professionStatus_list = transformDara;
        this.CustomerViewDetails.profession = this.enumData1(
          this.CustomerViewDetails.profession,
          this.professionStatus_list
        );
      });
      // 民族
      this.$httpGet({
        url: "/dic/type/dic_nation",
      }).then((res) => {
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.nation_list = transformDara;
        this.CustomerViewDetails.nation = this.enumData1(
          this.CustomerViewDetails.nation,
          this.nation_list
        );
      });
    },
    markerDragend({ point }) {
      const { lng, lat } = point;
      this.CustomerViewDetails.location = `${lng},${lat}`;
    },
    async getCustomerView() {
      const res = await this.$httpGet({
        url: `/api/customersBasicInfo/get/${this.id}`,
      });
      this.CustomerViewDetails = res.data;
      if (this.CustomerViewDetails.level) {
        this.$httpGet({
          url: `/dic/dic_client_grade/${this.CustomerViewDetails.level}`,
        }).then((res) => {
          this.level = res.data.codeText;
        });
      }
      if (this.CustomerViewDetails.location) {
        const positionArr = this.CustomerViewDetails.location.split(",");
        console.log(positionArr);
        this.mapCenter = { lng: positionArr[0], lat: positionArr[1] };
        this.mapCenter1 = { lng: positionArr[0], lat: positionArr[1] };
      } else {
        this.appMessage();
      }
    },
    onFamily_type(value) {
      this.family_type_txt = value;
      this.family_type = false;
    },
    onProperty_situation(value) {
      this.property_situation_txt = value;
      this.property_situation = false;
    },
    onRelationship_householder(value) {
      this.relationship_householder_txt = value;
      this.relationship_householder = false;
    },
    onSelect_type(value) {
      this.select_type_txt = value;
      this.select_type = false;
    },
    onAsset_type(value) {
      this.asset_type_txt = value;
      this.asset_type = false;
    },
    onDebt_type(value) {
      this.debt_type_txt = value;
      this.debt_type = false;
    },
    onVehicle_condition(value) {
      this.vehicle_condition_txt = value;
      this.vehicle_condition = false;
    },
    onSubmit(values) {
      console.log("submit", values);
    },
    onChoose_gender(value) {
      this.choose_gender_txt = value;
      this.choose_gender = false;
    },
    onEducation_level(value) {
      this.prospect_detailsEdit.education = value.index;
      this.CustomerViewDetails.education = value.text;
      this.education_level = false;
    },
    onEducation_level1(value) {
      this.education_level_txt = value;
      this.education_level = false;
    },
    onMarital_status(value) {
      this.prospect_detailsEdit.marriage = value.index;
      this.CustomerViewDetails.marriage = value.text;
      this.marital_status = false;
    },
    onNation(value) {
      this.prospect_detailsEdit.nation = value.index;
      this.CustomerViewDetails.nation = value.text;
      this.nation = false;
    },
    onChildrenStatus(value) {
      this.prospect_detailsEdit.children = value.index;
      this.CustomerViewDetails.children = value.text;
      this.childrenStatus = false;
    },
    onDateBirth(date) {
      this.date_of_birth = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      this.showDateBirth = false;
    },
    onAdmission_time(date) {
      this.admission_time = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showAdmission_time = false;
    },
    onGraduation_time(date) {
      this.graduation_time = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showGraduation_time = false;
    },
    onRegional_grid(value) {
      this.prospect_detailsEdit.gridding = value.index;
      this.CustomerViewDetails.gridding = value.text;
      // this.regional_grid_txt.text = values.join('/');
      // this.regional_grid_txt.index = `${this.areaList[index[0]].id},${this.areaList[[index[1]]].id}`;
      this.regional_grid = false;
    },

    prev() {
      this.$router.go(-1);
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    handler({ BMap, map }) {
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    openValue1() {
      this.show1 = !this.show1;
    },
    openValue2() {
      this.show2 = !this.show2;
    },
    openValue3() {
      this.show3 = !this.show3;
    },
    openValue4() {
      this.show4 = !this.show4;
    },
    openValue5() {
      this.show5 = !this.show5;
    },
    getvalue1(index, item) {
      this.value1 = item.name;
      this.show1 = false;
    },
    getvalue2(index, item) {
      this.value2 = item.name;
      this.show2 = false;
    },
    getvalue3(index, item) {
      this.value3 = item.name;
      this.show3 = false;
    },
    getvalue4(index, item) {
      this.value4 = item.name;
      this.show4 = false;
    },
    getvalue5(index, item) {
      this.value5 = item.name;
      this.show5 = false;
    },

    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    handleChange(value) {
      // console.log(`selected ${value}`);
    },
    //选中一个item
    selectItem(thisItem) {
      if (typeof thisItem.checked == "undefined") {
        this.$set(thisItem, "checked", true);
      } else {
        thisItem.checked = !thisItem.checked;
      }
    },
    showPopupFamily() {
      this.isPopupVisibleFamily = true;
    },
    closePopupFamily() {
      this.isPopupVisibleFamily = false;
    },
    showPopupAssets() {
      this.isPopupVisibleAssets = true;
    },
    closePopupAssets() {
      this.isPopupVisibleAssets = false;
    },
    showPopupEducation() {
      this.isPopupVisibleEducation = true;
    },
    // 添加学历
    addCustomersAcademic() {
      this.$httpPost({
        url: "/api/customersAcademic/add",
        data: {
          customersCode: this.CustomerViewDetails.code,
          school: this.school,
          profession: this.major,
          education: this.prospect_detailsEdit.education,
        },
      })
        .then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
          this.getCustomersAcademic();
          this.isPopupVisibleEducation = false;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    deleteCustomersAcademic(val) {
      Dialog.confirm({
        title: "你确定移除吗",
      })
        .then(() => {
          this.$httpDelete({
            url: "/api/customersAcademic/delete",
            params: {
              ids: val,
            },
          })
            .then((res) => {
              this.getCustomersAcademic();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    // 添加工作
    addCustomersWork() {
      this.$httpPost({
        url: "/api/customersWork/add",
        data: {
          customerCode: this.CustomerViewDetails.code,
          companyName: this.corporate_name,
          post: this.position,
          workingStatus: 1,
        },
      })
        .then((res) => {
          Toast({
            message: "保存成功",
            position: "middle",
          });
          this.getCustomersWor();
          this.isPopupVisibleWork = false;
        })
        .catch((err) => {
          // console.log(err);
        });
    },
    deleteCustomersWork(val) {
      Dialog.confirm({
        title: "你确定移除吗",
      })
        .then(() => {
          this.$httpDelete({
            url: "/api/customersWork/delete",
            params: {
              ids: val,
            },
          })
            .then((res) => {
              this.getCustomersWor();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    closePopupEducation() {
      this.isPopupVisibleEducation = false;
    },
    showPopupWork() {
      this.isPopupVisibleWork = true;
    },
    closePopupWork() {
      // addCustomersWork
      this.isPopupVisibleWork = false;
    },
  },
  filters: {
    dic_education(val) {
      const findWill = JSON.parse(localStorage.getItem("dicEducation")).find(
        (it) => +it.key == val
      );
      console.log(findWill);
      return findWill ? findWill.value : "";
    },
  },
};
</script>
<style scoped>
.household_base .van-cell >>> .van-field__label {
  width: 9em;
}
.household_have .van-cell >>> .van-field__label {
  width: 7.5em;
}
.CustomerView {
  padding-top: 46px;
}
.padding_lr {
  padding: 0rem 1rem !important;
}
/* 知识库 */
.knowledge {
  padding: 1rem;
  text-align: center;
}
.knowledge_title {
  font-size: 1.3rem;
  margin: 0rem;
}
.knowledge_date {
  margin: 1.2rem 0rem;
}
.knowledge_body {
  border-top: 0.08rem dotted #bbb;
  padding-top: 1rem;
}
.knowledge_img {
  width: 100%;
}
.knowledge_text {
  text-indent: 25px;
  line-height: 1.8rem;
  text-align: left;
}
input {
  border-radius: 0.3rem;
}
.save_pop {
  background: #fff;
  text-align: center;
  padding-bottom: 50px;
}
.save_pop button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  border-radius: 0.4rem;
  color: #fff;
  font-size: 14px;
  width: 6rem;
  height: 2rem;
}
.pop_title {
  background: rgb(61, 66, 94);
  text-align: center;
  font-size: 16px;
  height: 3rem;
  line-height: 3rem;
  color: #fff;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  margin: 0;
}
.peasant_households {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}
.peasant_households li {
  width: 35%;
  height: 2rem;
  line-height: 2rem;
  margin-top: 0.5rem;
}
.peasant_households li:nth-child(even) {
  width: 65%;
}
.peasant_households li input,
.peasant_households li textarea,
.peasant_households li select {
  border: 0.05rem solid #bbb;
  border-radius: 0.3rem;
  width: 100%;
  padding: 0.2rem 0.5rem;
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
  float: right;
  margin-right: 1rem;
}
.mission_details li .telephone {
  float: right;
  margin-right: 1rem;
}
.mission_details li:last-child {
  padding-bottom: 0.5rem;
}
.marketing_record {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 0.5rem 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.marketing_record .marketing_record_date {
  width: 30%;
  margin: 0rem 0rem 0rem 0rem;
}
.marketing_record .marketing_record_name {
  margin: 0rem;
  width: 50%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.marketing_record img {
  float: right;
}
.add_record {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: rgb(61, 66, 94);
  color: #fff;
}
.mission_details .schedule_star {
  display: inline-block;
  margin: 0rem 0rem 0rem 1.6rem;
}
.mission_details .schedule_star img {
  width: 1.2rem;
  margin: 0rem;
}
.cur {
  color: #df0f0f;
  position: relative;
}
.stock {
  padding: 0rem;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.stock p {
  margin: 0.5rem 0rem 0rem;
}
.stock:last-child {
  padding-bottom: 0.5rem;
}
.stock_have p {
  width: 33.3%;
}

.stock li {
  width: 60%;
  /* text-align: right; */
  margin: 0.5rem 0rem;
}
.stock li:nth-child(odd) {
  width: 38%;
}
.stock li input,
.stock li select {
  border: 0.05rem solid #bbb;
  background-color: #fff;
  height: 2rem;
  border-radius: 0.3rem;
  padding-left: 0.5rem;
  width: 100%;
}
textarea {
  border: 0.05rem solid #bbb;
  background-color: #fff;
  border-radius: 0.3rem;
  padding: 0.5rem;
}
.cw_stock {
  line-height: 2rem;
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
  /* height: 2rem; */
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
.cw_stock1 li {
  text-align: left;
}
.stock_education {
  position: relative;
  padding: 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.end_line {
  margin: 1rem;
  text-align: center;
  color: #c1b9b9;
  font-size: 1rem;
}
.stock_education div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.stock_education .delete {
  color: #1432e3;
  cursor: pointer;
}
.add_record {
  position: fixed;
  bottom: 3rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  background-color: rgb(61, 66, 94);
  color: #fff;
  font-size: 1.5rem;
}
.text_area {
  background: #fff;
  width: 100%;
  text-align: center;
  padding: 0.5rem 1rem;
}
.text_area p {
  padding-top: 0.5rem;
}
.text_area textarea {
  border: 0.05rem solid #bbb;
  width: 100%;
}
.contact {
  background: #fff;
}
.contact li {
  width: 100%;
  padding: 0.5rem 0rem;
}
.contact li input {
  width: 58%;
  border-radius: 0.3rem;
  border: 0.05rem solid #bbb;
  height: 2rem;
  padding-left: 0.5rem;
  display: inline-block;
}
.contact li p {
  width: 58%;
  height: 2rem;
  padding-left: 0.5rem;
  display: inline-block;
  position: relative;
}
.contact li p input {
  width: 100%;
}
.contact li p img {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 1.2rem;
}
.yes_no li input,
.yes_no li select {
  border-radius: 0.4rem;
}
.search_currency {
  position: relative;
}
.search_currency img {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 1.2rem;
}
.approval_Passed {
  position: absolute;
  text-align: center;
  width: 4.5rem;
  line-height: 1.5rem;
  border: 1px solid #3cc8ab;
  top: 1rem;
  color: #3cc8ab;
  font-size: 0.8rem;
  left: 17%;
}
.approval_Passed1 {
  position: absolute;
  text-align: center;
  width: 4.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  border: 1px solid #7e4a46;
  top: 1rem;
  color: #7e4a46;
  font-size: 0.8rem;
  left: 17%;
}
.income_expenditure {
  padding: 0rem 1rem;
  background: #fff;
  width: calc(100% - 4rem);
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.income_expenditure p {
  width: 100%;
  color: #000;
  font-size: 0.9rem;
  font-weight: 550;
  margin: 0;
}
.income_expenditure .ie_left {
  width: calc(60% - 2rem);
  text-align: right;
  margin-right: 2rem;
}
.income_expenditure li {
  width: 40%;
  margin-bottom: 0.5rem;
}
.income_expenditure li input {
  width: 100%;
  border: 0.05rem solid #bbb;
  border-radius: 0;
  padding: 0rem 0.5rem;
  border-radius: 0.3rem;
}
.have_popup {
  position: relative;
}
.have_popup img {
  position: absolute;
  right: 0.5rem;
  top: 0.2rem;
  width: 1.5rem;
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
  background: url("../../assets/home/md-phone.svg") no-repeat;
  background-size: cover;
  width: 1rem;
  height: 1rem;
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
    height: 1.7rem;
    line-height: 1.5rem;
  }
  .approval .approval_Passed1 {
    height: 1.7rem;
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
  .stock li {
    margin: 0.3rem 0rem;
  }
  .save1 button {
    font-size: 0.8rem;
    line-height: 1.8rem;
    height: 1.8rem;
    width: 5rem;
  }
  .pop_title {
    font-size: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .save_pop button {
    font-size: 0.8rem;
    line-height: 1.8rem;
    height: 1.8rem;
    width: 5rem;
  }
  .save_pop {
    margin-top: 2rem !important;
    padding-bottom: 2.5rem;
  }
  .stock_education {
    padding: 0.5rem;
  }
}
</style>
