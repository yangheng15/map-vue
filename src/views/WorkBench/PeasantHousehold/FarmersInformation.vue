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
        >
            <template #button>
              <a class="img4" :href="'tel:' + farmers_details.telphone"></a>
            </template>
          </van-field>
        <van-field
          readonly
          clickable
          name="area"
          :value="farmers_details.gridding"
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
          v-model="farmers_details.location"
          name="位置："
          label="位置："
          placeholder="单行输入"
          :rules="[{ required: true, message: '请填写位置（经纬度）' }]"
        />
        <div style="width: 99%; margin: 0.5rem auto">
          <baidu-map
            class="bm-view"
            :center="{ lng: 114.6, lat: 33.6 }"
            :zoom="14"
            ak="YOUR_APP_KEY"
          >
            <bm-marker
              :dragging="true"
              :position="{ lng: 114.6, lat: 33.6 }"
              @dragend="markerDragend"
              :icon="{
                url: require('../../../assets/grid/location_map.svg'),
                size: { width: 30, height: 30 },
              }"
            ></bm-marker>
          </baidu-map>
        </div>
        <div class="save">
          <van-button round block type="primary" @click="modifyResult()"
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
          <van-button round block type="primary" @click="modifyResult()()"
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
            <router-link
              tag="p"
              :to="{
                name: 'FarmerMemberDetails',
                query: {
                  title: '农户成员详情',
                  id: thisItem.id,
                  familyCode: thisItem.familyCode,
                },
              }"
              style="color: #000; font-weight: 550; width: 40%"
            >
              {{ thisItem.name }}
              <span class="approval_Passed">{{ thisItem.relationship }}</span>
            </router-link>
            <p>年龄：{{ thisItem.age }}</p>
            <p>年收入：{{ thisItem.annualIncome }}</p>
          </div>
          <div>
            <p style="position: relative;">电话：{{ thisItem.telphone }}
               <a class="img1" :href="'tel:' + thisItem.telphone"></a>
            </p>
            <p class="delete" @click="deleteFamilyPeople(thisItem.id)">删除</p>
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
              v-model="relationship_householder_txt"
              name="与户主关系"
              label="与户主关系"
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写与户主关系' }]"
            />
            <!-- <van-field
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
            </van-popup> -->
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
                @click="addPopupFamily()"
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
            <router-link
              tag="p"
              :to="{
                name: 'AssetsLiabilitiesDetail',
                query: {
                  title: '农户资产负债详情',
                  id: thisItem.id,
                  familyCode: thisItem.familyCode,
                },
              }"
              style="color: #000; font-weight: 550"
            >
              {{ thisItem.name }}
              <span v-if="thisItem.type === 1" class="approval_Passed"
                >资产</span
              >
              <span v-if="thisItem.type === 2" class="approval_Passed1"
                >负债</span
              >
            </router-link>
            <p>清查日期：{{ thisItem.checkTime | transform }}</p>
          </div>
          <p>评估价值（万元）：{{ thisItem.amount }}</p>
          <p class="delete" @click="deleteFamilyAssets(thisItem.id)">删除</p>
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
              :value="select_type_txt.text"
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
              v-if="select_type_txt.index == 1"
              v-model="asset_type_txt"
              name="资产类型："
              label="资产类型："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写资产类型' }]"
            />
            <van-field
              v-if="select_type_txt.index !== 1"
              v-model="asset_type_txt"
              name="负债类型："
              label="负债类型："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写负债类型' }]"
            />
            <!-- <van-field
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
            </van-popup> -->
            <van-field
              v-if="select_type_txt.index == 1"
              v-model="evaluation_value"
              name="评估价值："
              label="评估价值："
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写评估价值' }]"
            />
            <van-field
              v-if="select_type_txt.index !== 1"
              v-model="evaluation_value"
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
            <!-- <van-cell title="清查日期" :value="date" @click="show = true" />
            <van-calendar v-model="show" @confirm="onConfirm1" /> -->
            <div style="margin-top: 3rem" class="save_pop">
              <van-button
                style="margin-right: 1rem"
                round
                type="primary"
                @click="AddPopupAssets()"
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
          <van-field
            readonly
            v-model="addAllNum"
            name="合计（自动计算）（万元）："
            label="合计（自动计算）（万元）："
            placeholder="单行输入"
            :rules="[
              { required: true, message: '请填写合计（自动计算）（万元）' },
            ]"
          />
          <p>收入信息</p>
          <van-field
            readonly
            v-model="addIncomeNum"
            name="总收入（自动计算）（万元）："
            label="总收入（自动计算）（万元）："
            placeholder="单行输入"
            :rules="[
              { required: true, message: '请填写总收入（自动计算）（万元）' },
            ]"
          />
          <van-field
            v-model="familyIncome.householdIncome"
            name="家庭年收入（万元）："
            label="家庭年收入（万元）："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写家庭年收入（万元）' }]"
          />
          <van-field
            v-model="familyIncome.otherIncome"
            name="其他收入（万元）："
            label="其他收入（万元）："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写其他收入（万元）' }]"
          />
          <p>支出信息</p>
          <van-field
            readonly
            v-model="addExpenditureNum"
            name="总支出（自动计算）（万元）："
            label="总支出（自动计算）（万元）："
            placeholder="单行输入"
            :rules="[
              { required: true, message: '请填写总支出（自动计算）（万元）：' },
            ]"
          />
          <van-field
            v-model="familyIncome.mortgage"
            name="按揭（万元）："
            label="按揭（万元）："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写按揭（万元）：' }]"
          />
          <van-field
            v-model="familyIncome.businessExpend"
            name="经营性支出（万元）："
            label="经营性支出（万元）："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写经营性支出（万元）' }]"
          />
          <van-field
            v-model="familyIncome.utilities"
            name="水电气（万元）："
            label="水电气（万元）："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写水电气（万元）' }]"
          />
          <van-field
            v-model="familyIncome.lcme"
            name="教育医疗（万元）："
            label="教育医疗（万元）："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写教育医疗（万元）' }]"
          />
          <van-field
            v-model="familyIncome.otherExpend"
            name="其他支出（万元）："
            label="其他支出（万元）："
            placeholder="单行输入"
            :rules="[{ required: true, message: '请填写其他支出（万元）' }]"
          />
        </ul>
        <div class="save" style="padding-top: 2rem">
          <van-button block round type="primary" @click="UpdateFamilyIncome()"
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
import { Toast, Dialog } from "vant";
import moment from "moment";
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
      customer_id: "",
      date_of_birth: "9/20",
      showDateBirth: false,
      occupation: "程序员",
      phone_number: "",
      residential_address: "郑州周口市",
      work_address: "郑州周口市",
      qq_number: "2548456723",
      work_unit: "北京卓越联腾",
      weChat: "45483567953",
      user_positioning: "175.255,33.71",
      contact_address: "北京卓越联腾",

      regional_grid_txt: "",
      areaList: [],
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
      family_member: [],
      assets: [],
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
      farmers_details: "",
      prospect_detailsEdit: {},
      date: "",
      show: false,
      familyIncome: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === "/FarmerMemberDetails") {
        vm.tab(3);
      } else if (from.path === "/AssetsLiabilitiesDetail") {
        vm.tab(4);
      }
    });
  },
  async created() {
    this.typeCN = this.$route.query.title;
    this.id = this.$route.query.id;
    await this.editFarmers();
    this.dic_nation();
  },

  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm1(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    markerDragend({ point }) {
      const { lng, lat } = point;
      this.farmers_details.location = `${lng},${lat}`;
    },
    enumData(val, data) {
      // debugger
      if (val && data.length > 0) {
        // console.log(this.prospect_details);
        // console.log(data, val);
        const find = data.find((it) => it.index === val);
        // debugger
        return find ? find.text : "";
      } else {
        return "";
      }
    },
    enumData1(val, data) {
      let find = "";
      console.log(val, data);
      if (val && data.length > 0) {
        find = data.find((it) => it.index === val);
        console.log(find);
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
        // console.log(res.data);
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
        // console.log(this.farmers_details.type);
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
              console.log(ele);
              transformDara.push({ index: ele.code, text: ele.name });
            });
        });
        console.log(transformDara);
        this.areaList = transformDara;
        this.farmers_details.gridding = this.enumData1(
          this.farmers_details.gridding,
          this.areaList
        );
        // this.areaList = res.data.length > 0 &&  this.transformData(res.data);
        // console.log(this.areaList);
        // //回显数据
        // const arrIndex = this.prospect_details.gridding.split(',');
        // console.log(arrIndex);
        // this.prospect_details.gridding = `${this.areaList[arrIndex[0]].text}/${this.areaList[arrIndex[0]]['children'][arrIndex[1]].text}`
        // console.log(this.prospect_details.gridding);
      });
    },
    onFamily_type(value) {
      this.prospect_detailsEdit.type = value["index"];
      this.farmers_details.type = value["text"];
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
    onRegional_grid(value) {
      this.prospect_detailsEdit.gridding = value.index;
      this.farmers_details.gridding = value.text;
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
      // console.log(BMap, map);
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    },
    tab(ev) {
      this.tabId = ev;
      if (ev == 3) {
        this.getFamilyPeople();
      } else if (ev == 4) {
        this.getFamilyAssets();
      } else if (ev == 5) {
        this.getFamilyIncome();
      }
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
    addPopupFamily() {
      this.$httpPost({
        url: "/api/customersFamilyMembers/add",
        data: {
          name: this.household_name,
          age: this.household_age,
          identifyNo: this.customer_id,
          telphone: this.phone_number,
          annualIncome: this.annual_income,
          relationship: this.relationship_householder_txt,
          servOpen: this.Customer_intention_txt,
          familyCode: this.farmers_details.familyCode,
        },
      }).then((res) => {
        this.getFamilyPeople();
        this.isPopupVisibleFamily = false;
        Toast({
          message: "保存成功",
          position: "middle",
        });
      });
    },
    AddPopupAssets() {
      this.$httpPost({
        url: "/api/customersFamilyAssetsLiability/add",
        data: {
          name: this.asset_type_txt,
          familyCode: this.farmers_details.familyCode,
          type: this.select_type_txt.index,
          description: this.message_income,
          amount: this.evaluation_value,
          // checkTime:this.date,
        },
      }).then((res) => {
        this.getFamilyAssets();
        this.isPopupVisibleAssets = false;
        Toast({
          message: "保存成功",
          position: "middle",
        });
      });
    },
    closePopupFamily() {
      this.isPopupVisibleFamily = false;
    },
    deleteFamilyPeople(id) {
      Dialog.confirm({
        title: "你确定删除这条记录吗",
      })
        .then(() => {
          this.$httpDelete({
            url: "/api/customersFamilyMembers/delete",
            params: {
              ids: id,
            },
          })
            .then((res) => {
              this.getFamilyPeople();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    deleteFamilyAssets(id) {
      Dialog.confirm({
        title: "你确定删除这条记录吗",
      })
        .then(() => {
          this.$httpDelete({
            url: "/api/customersFamilyAssetsLiability/delete",
            params: {
              ids: id,
            },
          })
            .then((res) => {
              this.getFamilyAssets();
            })
            .catch(() => {});
        })
        .catch(() => {});
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
      console.log(this.farmers_details);
      this.prospect_detailsEdit.type = res.data.type;
    },
    getFamilyPeople() {
      this.$httpGet({
        url: "/api/customersFamilyMembers/query",
        params: {
          familyCode: this.farmers_details.familyCode,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.family_member = res.data;
        // this.peasant_household.forEach((it) => {
        //   this.familyCode = it.type;
        // });
        // this.getDic();
      });
    },
    getFamilyAssets() {
      this.$httpGet({
        url: "/api/customersFamilyAssetsLiability/query",
        params: {
          familyCode: this.farmers_details.familyCode,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        this.assets = res.data;
        // this.peasant_household.forEach((it) => {
        //   this.familyCode = it.type;
        // });
        // this.getDic();
      });
    },
    getFamilyIncome() {
      this.$httpGet({
        url: `/api/customersFamilyIncome/get/${this.farmers_details.familyCode}`,
      }).then((res) => {
        this.familyIncome = res.data;
        // this.peasant_household.forEach((it) => {
        //   this.familyCode = it.type;
        // });
        // this.getDic();
      });
    },
    modifyResult() {
      this.$httpPut({
        url: "/api/customersFamily/update",
        data: {
          id: this.id,
          familyCode: this.farmers_details.familyCode,
          houseName: this.farmers_details.houseName,
          type: this.prospect_detailsEdit.type,
          num: this.farmers_details.num,
          houseProperty: this.farmers_details.houseProperty,
          cars: this.farmers_details.cars,

          rufsBehalf: this.farmers_details.rufsBehalf,
          rufsAmount: this.farmers_details.rufsAmount,
          creditBehalf: this.farmers_details.creditBehalf,
          gridding: this.prospect_detailsEdit.gridding,
          membersEvaluate: this.farmers_details.membersEvaluate,
          address: this.farmers_details.address,
          telphone: this.farmers_details.telphone,
          location: this.farmers_details.location,
          hasFixPlace: this.farmers_details.hasFixPlace,
          hasBadAsset: this.farmers_details.hasBadAsset,
          hasIncome: this.farmers_details.hasIncome,
          hasOverFinace: this.farmers_details.hasOverFinace,
          hasHarmonyFamily: this.farmers_details.hasHarmonyFamily,
          hasBadAddiction: this.farmers_details.hasBadAddiction,
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
    UpdateFamilyIncome() {
      this.$httpPut({
        url: "/api/customersFamilyIncome/update",
        data: {
          sum: this.addAllNum,
          sumIncome: this.addIncomeNum,
          householdIncome: this.familyIncome.householdIncome,
          otherIncome: this.familyIncome.otherIncome,
          sumExpend: this.addExpenditureNum,
          mortgage: this.familyIncome.mortgage,
          businessExpend: this.familyIncome.businessExpend,
          utilities: this.familyIncome.utilities,
          lcme: this.familyIncome.lcme,
          otherExpend: this.familyIncome.otherExpend,
          familyCode: this.farmers_details.familyCode,
        },
      })
        .then((res) => {
          Toast({
            message: "修改成功",
            position: "middle",
          });
        })
        .catch((err) => {
          // console.log(err);
        });
    },
  },
  computed: {
    addExpenditureNum() {
      return (
        Number(this.familyIncome.mortgage) +
        Number(this.familyIncome.businessExpend) +
        Number(this.familyIncome.utilities) +
        Number(this.familyIncome.lcme) +
        Number(this.familyIncome.otherExpend)
      );
    },
    addIncomeNum() {
      return (
        Number(this.familyIncome.householdIncome) +
        Number(this.familyIncome.otherIncome)
      );
    },
    addAllNum() {
      return (
        Number(this.familyIncome.householdIncome) +
        Number(this.familyIncome.otherIncome) -
        Number(this.familyIncome.mortgage) -
        Number(this.familyIncome.businessExpend) -
        Number(this.familyIncome.utilities) -
        Number(this.familyIncome.lcme) -
        Number(this.familyIncome.otherExpend)
      );
    },
  },
};
</script>
<style scoped>
.income_expenditure .van-cell >>> .van-field__label {
  width: 75%;
}
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
.van-radio__icon {
  height: 1.25rem;
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
  background: #fff;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.income_expenditure p {
  width: 100%;
  padding: 0rem 1rem;
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
