<template>
  <div class="FarmersInformation">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '农户'">
      <ul class="tabList">
        <li @click="tab(0)" :class="tabId == 0 ? 'cur' : 'ordinary'">基本</li>
        <li @click="tab(1)" :class="tabId == 1 ? 'cur' : 'ordinary'">联系</li>
        <li @click="tab(2)" :class="tabId == 2 ? 'cur' : 'ordinary'">
          三有三无
        </li>
        <li @click="tab(3)" :class="tabId == 3 ? 'cur' : 'ordinary'">成员</li>
        <li @click="tab(4)" :class="tabId == 4 ? 'cur' : 'ordinary'">资产</li>
        <li @click="tab(5)" :class="tabId == 5 ? 'cur' : 'ordinary'">收支</li>
      </ul>
      <div v-show="tabId === 0" class="household_base">
        <van-field
          v-model="farmers_details.familyCode"
          name="家庭户号："
          label="家庭户号："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写家庭户号' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="farmers_details.type"
          label="家庭类型："
          placeholder="点击选择家庭类型"
          @click="family_type = true"
        />
        <van-popup v-model="family_type" position="bottom">
          <van-picker
            show-toolbar
            :columns="family_type_list"
            @confirm="onFamily_type"
            @cancel="family_type = false"
          />
        </van-popup>
        <van-field
          v-model="farmers_details.houseProperty"
          name="家庭拥有房产情况："
          label="家庭拥有房产情况："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写家庭拥有房产情况' }]"
        />
        <van-field
          v-model="farmers_details.cars"
          name="家庭自用车辆情况："
          label="家庭自用车辆情况："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写家庭自用车辆情况' }]"
        />
        <van-field
          v-model="farmers_details.rufsBehalf"
          name="授信代表："
          label="授信代表："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写授信代表' }]"
        />
        <van-field
          v-model="farmers_details.rufsAmount"
          name="授信金额："
          label="授信金额："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写授信金额' }]"
        />
        <van-field
          v-model="farmers_details.creditBehalf"
          name="用信金额："
          label="用信金额："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写用信金额' }]"
        />
        <van-field
          v-model="farmers_details.num"
          name="家庭人数："
          label="家庭人数："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写家庭人数' }]"
        />
        <!-- <van-field
          v-model="business_opening"
          rows="2"
          autosize
          label="家庭业务开通情况"
          type="textarea"
          maxlength="50"
          placeholder="请输入家庭业务开通情况"
          show-word-limit
        /> -->
        <van-field
          v-model="farmers_details.membersEvaluate"
          rows="2"
          autosize
          label="对家庭及主要成员的评价"
          type="textarea"
          maxlength="50"
          placeholder="请输入对家庭及主要成员的评价"
          show-word-limit
        />
        <div class="save">
          <van-button round block type="primary" @click="modifyResult()"
            >保存</van-button
          >
        </div>
      </div>
      <div v-show="tabId === 1">
        <van-field
          v-model="farmers_details.address"
          name="详细地址："
          label="详细地址："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写详细地址' }]"
        />
        <van-field
          v-model="contacts"
          name="联系人："
          label="联系人："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写联系人' }]"
        />
        <van-field
          v-model="farmers_details.telphone"
          name="手机号："
          label="手机号："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <!-- <van-field
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
        </van-popup> -->
        <van-field
          v-model="farmers_details.location"
          name="位置："
          label="位置："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写位置（经纬度）' }]"
        />
        <div style="width: 99%; margin: 0.5rem auto">
          <baidu-map
            class="bm-view"
            :center="{ lng: 114.65, lat: 33.37 }"
            :zoom="12"
            ak="YOUR_APP_KEY"
          >
            <bm-marker
              :position="{ lng: 114.73, lat: 33.38 }"
              :icon="{ url: con1, size: { width: 50, height: 50 } }"
            ></bm-marker>
          </baidu-map>
        </div>
        <div class="save">
          <van-button round block type="primary" @click="prev()"
            >保存</van-button
          >
        </div>
        <div
          v-show="isPopupVisible"
          style="
            position: fixed;
            z-index: 10;
            top: 0px;
            left: 0rem;
            width: 100%;
            height: 100vh;
            padding: 0.5rem 0.5rem;
            background: #fff;
          "
        >
          <input
            style="
              border: 0.05rem solid #bbb;
              width: 100%;
              padding: 0rem 0.5rem;
            "
            type="text"
            placeholder="网格名称"
          />
          <select
            style="
              border: 0.05rem solid #bbb;
              width: 100%;
              padding: 0.3rem 0.5rem;
              background: #fff;
              border-radius: 0.3rem;
              margin-top: 0.5rem;
            "
            name
            id
          >
            <option value="网格类型">网格类型</option>
            <option value="自定义">自定义</option>
            <option value="行政区域">行政区域</option>
          </select>
          <select
            style="
              border: 0.05rem solid #bbb;
              width: 100%;
              padding: 0.3rem 0.5rem;
              background: #fff;
              border-radius: 0.3rem;
              margin-top: 0.5rem;
            "
            name
            id
          >
            <option value="网格专题">网格专题</option>
            <option value="自定义">自定义</option>
            <option value="行政区域">行政区域</option>
          </select>
          <dl>
            <dt
              style="
                display: flex;
                background: #e6e3e3;
                border: 0.05rem solid #bbb;
                justify-content: space-around;
                line-height: 2rem;
                margin-top: 1rem;
              "
            >
              <p style="margin: 0rem">编号</p>
              <p style="margin: 0rem">名称</p>
            </dt>
            <dd
              style="display: flex; flex-flow: row; position: relative"
              v-for="(thisItem, index) in customer_pool"
              :key="index"
            >
              <div
                style="
                  width: 1.2rem;
                  height: 1.2rem;
                  border: 0.05rem solid #000;
                  margin: 1rem 0rem 0rem 1.2rem;
                  cursor: pointer;
                  border-radius: 100%;
                "
                :class="thisItem.checked ? 'checked' : ''"
                @click="selectItem(thisItem)"
              ></div>
              <li
                style="
                  width: 90%;
                  list-style-type: none;
                  display: flex;
                  justify-content: space-around;
                  align-items: flex-end;
                "
                class="newCustomerList"
              >
                <p style="margin: 0rem">{{ thisItem.name }}</p>
                <p style="margin: 0rem">{{ thisItem.text }}</p>
              </li>
            </dd>
          </dl>
          <div style="margin-top: 10rem" class="save">
            <button @click="closePopup()">确定</button>
          </div>
        </div>
      </div>
      <div v-show="tabId === 2" class="household_have">
        <van-field name="radio" label="有无固定场所：">
          <template #input>
            <van-radio-group
              v-model="farmers_details.hasFixPlace"
              direction="horizontal"
            >
              <van-radio name="1">有</van-radio>
              <van-radio name="0">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="有无不良资信：">
          <template #input>
            <van-radio-group
              v-model="farmers_details.hasBadAsset"
              direction="horizontal"
            >
              <van-radio name="1">有</van-radio>
              <van-radio name="0">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="有无稳定工作：">
          <template #input>
            <van-radio-group
              v-model="farmers_details.hasIncome"
              direction="horizontal"
            >
              <van-radio name="1">有</van-radio>
              <van-radio name="0">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="有无过度融资：">
          <template #input>
            <van-radio-group
              v-model="farmers_details.hasOverFinace"
              direction="horizontal"
            >
              <van-radio name="1">有</van-radio>
              <van-radio name="0">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="有无和睦家庭：">
          <template #input>
            <van-radio-group
              v-model="farmers_details.hasHarmonyFamily"
              direction="horizontal"
            >
              <van-radio name="1">有</van-radio>
              <van-radio name="0">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field name="radio" label="有无不良嗜好：">
          <template #input>
            <van-radio-group
              v-model="farmers_details.hasBadAddiction"
              direction="horizontal"
            >
              <van-radio name="1">有</van-radio>
              <van-radio name="0">无</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div class="save" style="padding-top: 2rem">
          <van-button round block type="primary" @click="prev()"
            >保存</van-button
          >
        </div>
      </div>
      <div v-show="tabId === 3">
        <div
          class="stock stock_education"
          v-for="(thisItem, index) in family_member"
          :key="index"
        >
          <div style="margin-bottom: 0.5rem">
            <p style="color: #000; font-weight: 550; width: 40%">
              {{ thisItem.name }}
              <span class="approval_Passed">户主</span>
            </p>
            <p>{{ thisItem.age }}</p>
            <p>{{ thisItem.income }}</p>
          </div>
          <div>
            <p>{{ thisItem.telephone }}</p>
            <p class="delete">删除</p>
          </div>
        </div>
        <span class="add_record" @click="showPopupFamily()">+</span>
        <div
          v-show="isPopupVisibleFamily"
          style="
            position: fixed;
            z-index: 100;
            top: 0px;
            left: 0rem;
            width: 100%;
            height: 100vh;
            background: rgba(193, 185, 185, 0.7);
          "
        >
          <div
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 85%;
              background: rgb(255, 255, 255);
              border-radius: 0.5rem;
            "
          >
            <p class="pop_title">农户成员添加</p>
            <van-field
              v-model="household_name"
              name="姓名"
              label="姓名"
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <van-field
              v-model="household_age"
              name="年龄"
              label="年龄"
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写年龄' }]"
            />
            <van-field
              readonly
              clickable
              name="picker"
              :value="relationship_householder_txt"
              label="与户主关系："
              placeholder="点击选择与户主关系"
              @click="relationship_householder = true"
            />
            <van-popup v-model="relationship_householder" position="bottom">
              <van-picker
                show-toolbar
                :columns="relationship_householder_list"
                @confirm="onRelationship_householder"
                @cancel="relationship_householder = false"
              />
            </van-popup>
            <van-field
              v-model="customer_id"
              name="身份证号："
              label="身份证号："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写身份证号' }]"
            />
            <van-field
              v-model="phone_number"
              name="手机号码："
              label="手机号码："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写手机号码' }]"
            />
            <van-field
              v-model="annual_income"
              name="年收入："
              label="年收入："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写年收入' }]"
            />
            <div style="margin-top: 3rem" class="save_pop">
              <van-button
                style="margin-right: 1rem"
                round
                type="primary"
                @click="closePopupFamily()"
                >保存</van-button
              >
              <van-button round type="primary" @click="closePopupFamily()"
                >取消</van-button
              >
            </div>
          </div>
        </div>
      </div>
      <div v-show="tabId === 4">
        <div
          class="stock stock_education"
          v-for="(thisItem, index) in assets"
          :key="index"
        >
          <div style="margin-bottom: 0.5rem">
            <p style="color: #000; font-weight: 550">{{ thisItem.name }}</p>
            <p>{{ thisItem.date }}</p>
          </div>
          <p>{{ thisItem.menoy }}</p>
          <p class="delete">删除</p>
          <span v-if="thisItem.id === 1" class="approval_Passed">资产</span>
          <span v-if="thisItem.id === 2" class="approval_Passed1">负债</span>
        </div>
        <span class="add_record" @click="showPopupAssets()">+</span>
        <div
          v-show="isPopupVisibleAssets"
          style="
            position: fixed;
            z-index: 100;
            top: 0px;
            left: 0rem;
            width: 100%;
            height: 100vh;
            background: rgba(193, 185, 185, 0.7);
          "
        >
          <div
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 91%;
              background: rgb(255, 255, 255);
              border-radius: 0.5rem;
            "
          >
            <p class="pop_title">资产添加</p>
            <van-field
              readonly
              clickable
              name="picker"
              :value="select_type_txt"
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
              readonly
              clickable
              name="picker"
              :value="asset_type_txt"
              label="资产类型："
              placeholder="点击选择资产类型"
              @click="asset_type = true"
            />
            <van-popup v-model="asset_type" position="bottom">
              <van-picker
                show-toolbar
                :columns="asset_type_list"
                @confirm="onAsset_type"
                @cancel="asset_type = false"
              />
            </van-popup>
            <van-field
              readonly
              clickable
              name="picker"
              :value="debt_type_txt"
              label="负债类型："
              placeholder="点击选择负债类型"
              @click="debt_type = true"
            />
            <van-popup v-model="debt_type" position="bottom">
              <van-picker
                show-toolbar
                :columns="debt_type_list"
                @confirm="onDebt_type"
                @cancel="debt_type = false"
              />
            </van-popup>
            <van-field
              v-model="evaluation_value"
              name="评估价值："
              label="评估价值："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写评估价值' }]"
            />
            <van-field
              v-model="amount_liabilities"
              name="负债金额："
              label="负债金额："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写负债金额' }]"
            />
            <van-field
              v-model="message_income"
              rows="2"
              autosize
              label="描述"
              type="textarea"
              maxlength="50"
              placeholder="请输入年收入"
              show-word-limit
            />
            <div style="margin-top: 3rem" class="save_pop">
              <van-button
                style="margin-right: 1rem"
                round
                type="primary"
                @click="closePopupAssets()"
                >保存</van-button
              >
              <van-button round type="primary" @click="closePopupAssets()"
                >取消</van-button
              >
            </div>
          </div>
        </div>
      </div>
      <div v-show="tabId === 5">
        <ul class="cw_stock yes_no income_expenditure">
          <p>基本信息</p>
          <li class="ie_left">合计（自动计算）（万元）：</li>
          <li>
            <input type="text" disabled value="20" placeholder="单行输入" />
          </li>
          <p>收入信息</p>
          <li class="ie_left">总收入（自动计算）（万元）：</li>
          <li>
            <input type="text" disabled value="100" placeholder="单行输入" />
          </li>
          <li class="ie_left">家庭年收入（万元）：</li>
          <li>
            <input type="text" value="40" placeholder="单行输入" />
          </li>
          <li class="ie_left">其他收入（万元）：</li>
          <li>
            <input type="text" value="60" placeholder="单行输入" />
          </li>
          <p>支出信息</p>
          <li class="ie_left">总支出（自动计算）（万元）：</li>
          <li>
            <input type="text" disabled value="80" placeholder="单行输入" />
          </li>
          <li class="ie_left">按揭（万元）：</li>
          <li class="search_currency">
            <input type="text" value="2" placeholder="单行输入" />
          </li>

          <li class="ie_left">经营性支出（万元）：</li>
          <li class="search_currency">
            <input type="text" value="50" placeholder="单行输入" />
          </li>
          <li class="ie_left">水电气（万元）：</li>
          <li class="search_currency">
            <input type="text" value="10" placeholder="单行输入" />
          </li>
          <li class="ie_left">教育医疗（万元）：</li>
          <li class="search_currency">
            <input type="text" value="15" placeholder="单行输入" />
          </li>
          <li class="ie_left">其他支出（万元）：</li>
          <li class="search_currency">
            <input type="text" value="3" placeholder="单行输入" />
          </li>
        </ul>
        <div class="save" style="padding-top: 2rem">
          <van-button block round type="primary" @click="prev()"
            >保存</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import con from "../../../assets/grid/location_map.svg";
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
      education_level_txt: "博士",
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
      marital_status_txt: "已婚",
      marital_status_list: ["已婚", "未婚"],
      marital_status: false,
      screen_name: "陈晓坛",
      nation_txt: "汉族",
      nation_list: ["汉族"],
      nation: false,
      childrenStatus_txt: "有",
      childrenStatus_list: ["有", "无"],
      childrenStatus: false,
      customer_hobby: "无",
      customer_id: "110242199702125858",
      date_of_birth: "9/20",
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
      school: "",
      major: "",
      admission_time: "",
      showAdmission_time: false,
      graduation_time: "",
      showGraduation_time: false,
      corporate_name: "",
      position: "",

      family_number: "154235945121",
      family_type_txt: "",
      family_type_list: [],
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
      stock: [
        {
          menoy_name: "存款余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "活期存款余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "定期存款余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "大额存单余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "贷款余额",
          menoy: "500,000.00",
        },
        {
          menoy_name: "历史贷款类型",
          menoy: "抵押贷",
        },
        {
          menoy_name: "最近放贷时间",
          menoy: "2020-01-01",
        },
        {
          menoy_name: "存贷比",
          menoy: "50%",
        },
      ],
      education: [
        {
          university: "上海交通大学",
          date: "2005~2008",
          education: "硕士",
          major: "计算机科学",
        },
        {
          university: "上海交通大学",
          date: "2001~2005",
          education: "本科",
          major: "计算机科学",
        },
      ],
      work: [
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
      family_member: [
        {
          name: "张军",
          age: "年龄：30",
          relationship: "与户主关系：户主",
          id: "身份证：110115198008086654",
          telephone: "电话：18612287876",
          income: "年收入：40万",
        },
      ],
      assets: [
        {
          name: "房产",
          date: "清查日期：2020-01-01",
          menoy: "评估价值（万元）：100",
          id: 1,
        },
        {
          name: "贷款",
          date: "清查日期：2020-01-01",
          menoy: "负债金额（万元）：100",
          id: 2,
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
      isPopupVisibleFamily: false,
      isPopupVisibleAssets: false,
      isPopupVisibleEducation: false,
      isPopupVisibleWork: false,
      id: "",
      farmers_details: "",
      prospect_detailsEdit: {},
    };
  },
  async created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    await this.editFarmers();
    this.dic_nation();
  },

  methods: {
    enumData(val, data) {
      // debugger
      if (val && data.length > 0) {
        console.log(this.prospect_details);
        console.log(data, val);
        const find = data.find((it) => it.index === val);
        // debugger
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    dic_nation() {
      // 家庭类型
      this.$httpGet({
        url: "/dic/type/dic_family_type",
      }).then((res) => {
        console.log(res.data);
        let transformDara = [];
        res.data.forEach((it, index) => {
          if (it.parentId !== null) {
            transformDara.push({ index: it.code, text: it.codeText });
          }
        });
        this.family_type_list = transformDara;
        this.farmers_details.type = this.enumData(
          this.farmers_details.type,
          this.family_type_list
        );
        console.log(this.farmers_details.type);
      });
    },
    onFamily_type(value) {
      this.prospect_detailsEdit.type = value['index'];
      this.farmers_details.type = value['text'];
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
      this.education_level_txt = value;
      this.education_level = false;
    },
    onMarital_status(value) {
      this.marital_status_txt = value;
      this.marital_status = false;
    },
    onNation(value) {
      this.nation_txt = value;
      this.nation = false;
    },
    onChildrenStatus(value) {
      this.childrenStatus_txt = value;
      this.childrenStatus = false;
    },
    onDateBirth(date) {
      this.date_of_birth = `${date.getMonth() + 1}/${date.getDate()}`;
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
    onRegional_grid(values) {
      this.regional_grid_txt = values.map((item) => item.name).join("/");
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
      console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    tab(ev) {
      this.tabId = ev;
      // localStorage.setItem("indexTabId", this.tabId);
    },

    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    handleChange(value) {
      console.log(`selected ${value}`);
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
    closePopupEducation() {
      this.isPopupVisibleEducation = false;
    },
    showPopupWork() {
      this.isPopupVisibleWork = true;
    },
    closePopupWork() {
      this.isPopupVisibleWork = false;
    },
    async editFarmers() {
      const res = await this.$httpGet({
        url: `/api/customersFamily/get/${this.id}`,
        data: {
          id: this.id,
        },
      });
      this.farmers_details = res.data;
    },
    modifyResult() {
      this.$httpPut({
        url: "/api/customersPotential/update",
        data: {
          id: this.id,
          houseName: this.farmers_details.houseName,
          familyCode: this.farmers_details.familyCode,
          houseProperty: this.farmers_details.houseProperty,
          cars: this.farmers_details.cars,
          type: this.prospect_detailsEdit.type,
          rufsBehalf: this.farmers_details.rufsBehalf,
          rufsAmount: this.farmers_details.rufsAmount,
          creditBehalf: this.farmers_details.creditBehalf,
          num: this.farmers_details.num,
          membersEvaluate: this.farmers_details.membersEvaluate,
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
.household_base .van-cell >>> .van-field__label {
  width: 9em;
}
.household_have .van-cell >>> .van-field__label {
  width: 7.5em;
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
