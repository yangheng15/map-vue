<template>
  <div class="WorkbenchBranch">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='添加'">
      <ul class="mission_details">
        <li>
          客户1：北京卓越科技有限公司
          <img src="../../assets/WorkBench/location.svg" alt />
        </li>
        <li>任务类型：建档</li>
        <li>执行时间：2020-08-30日前</li>
      </ul>
      <div>
        <p style="margin-left:0.5rem">客户信息</p>
        <div>
          <textarea
            style="width:calc(100% - 1.2rem);height:16rem;padding:0.6rem;margin:0.6rem;border:0.05rem solid #bbb"
            name
            id
            cols="30"
            rows="10"
            placeholder
          ></textarea>
        </div>
      </div>
      <div style="margin-top:0.5rem">
        <p style="margin-left:0.5rem">现场影像</p>
        <div>
          <div style="width:100%;height:7rem;padding:0.6rem;background:#fff">
            <uploaderAlone
              ref="actImgeAlone"
              @uplodCallBack="smallImgUplodCallBack"
              @deleteImage="deleteSmallImage"
              isSign="true"
              :quality="0.7"
            ></uploaderAlone>
          </div>
        </div>
      </div>
      <div class="save">
        <button>保存</button>
      </div>
      <!-- PutRecord -->
    </div>
    <div v-if="typeCN=='添加营销客户详情'">
      <ul class="stock cw_stock">
        <li>客户：</li>
        <li>
          <input type="text" placeholder="单行输入" />
        </li>
        <li>是否营销：</li>
        <li>
          <select name id>
            <option value="已营销">已营销</option>
            <option value="未营销">未营销</option>
          </select>
        </li>
        <li>客户意向：</li>
        <li>
          <select name id>
            <option value="强">强</option>
            <option value="一般">一般</option>
            <option value="无">无</option>
          </select>
        </li>
        <li>营销结果：</li>
        <li>
          <select name id>
            <option value="营销成功">营销成功</option>
            <option value="尚未成功">尚未成功</option>
          </select>
        </li>
        <li>执行时间：</li>
        <li>
          <input type="text" placeholder="单行输入" />
        </li>
        <li>描述：</li>
        <li style="width:100%">
          <textarea
            style="width:calc(100% - 1.2rem);height:13rem;padding:0.6rem;margin:0.6rem;border:0.05rem solid #bbb"
            name
            id
            cols="30"
            rows="10"
            placeholder
          ></textarea>
        </li>
      </ul>
      <div>
        <div></div>
      </div>
      <div class="save">
        <button>保存</button>
      </div>
      <!-- PutRecord -->
    </div>
    <div v-if="typeCN=='地址'">
      <baidu-map class="map" :center="{lng:114.65, lat: 33.37}" :zoom="12" ak="YOUR_APP_KEY">
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
      </baidu-map>
    </div>
    <div v-if="typeCN=='任务详情'" class="tabTitle">
      <ul class="tabList">
        <li @click="tab(0)" :class="tabId==0?'cur':''">任务信息</li>
        <li @click="tab(1)" :class="tabId==1?'cur':''">营销客户</li>
      </ul>
      <div v-show="tabId===0">
        <ul class="mission_details">
          <div class="task_management">产品营销</div>
          <li>
            任务名称：特色存款营销-张男
            <span style="font-size:1.5rem;float: right;">200,000.00</span>
          </li>
          <li>
            创建日期：2020-07-08
            <span style="font-size:1.2rem;float: right;color:#3CC8AB">160,000.00</span>
          </li>
          <li>截止日期：2020-09-30</li>
          <li>任任务网格：XXXX网格</li>
          <li>
            营销产品：月生利
            <!-- <img style="margin-left:0.5rem" src="./search.svg" alt /> -->
          </li>
          <li>
            完成度：80%
            <div class="progress">
              <div class="progress-done" data-done="80"></div>
            </div>
          </li>
          <li>
            结果评价：
            <select style="margin-left:2.5rem;width:10rem;border-radius:0.4rem" name id>
              <option value="待评价">待评价</option>
              <option value="成功">成功</option>
              <option value="失败">失败</option>
            </select>
          </li>
        </ul>
        <baidu-map class="bm-view" :center="{lng:114.65, lat: 33.37}" :zoom="11" ak="YOUR_APP_KEY">
          <bm-overlay
            pane="labelPane"
            :class="{sample: true, active}"
            @draw="draw"
            @mouseover.native="active = true"
            @mouseleave.native="active = false"
          >
            <div style="width:21rem;height:22rem;border:0.07rem dashed #D33E42"></div>
          </bm-overlay>
        </baidu-map>
      </div>
      <div v-show="tabId===1">
        <div class="screen_content">
          <!-- <img src="./search.svg" alt /> -->
          <input type="text" placeholder="客户编号，客户名称" />
          <button>筛选</button>
        </div>
        <div class="not_select">
          <div class="divInput">
            <div class="select_sort" @click="openValue1">
              <input v-model="value1" type="text" placeholder="已营销" />
              <!-- <img src="./jiantou.png" /> -->
            </div>
            <div v-show="show1">
              <ul>
                <li
                  @click="getvalue1(index,item)"
                  v-for="(item,index) in tableData1"
                  :key="item.index"
                >{{ item.name }}</li>
              </ul>
            </div>
          </div>
          <div class="divInput">
            <div class="select_sort" @click="openValue2">
              <input v-model="value2" type="text" placeholder="客户意向" />
              <!-- <img src="./jiantou.png" alt /> -->
            </div>
            <div v-show="show2">
              <ul>
                <li
                  @click="getvalue2(index,item)"
                  v-for="(item,index) in tableData2"
                  :key="item.index"
                >{{ item.name }}</li>
              </ul>
            </div>
          </div>
          <div class="divInput">
            <div class="select_sort" @click="openValue3">
              <input v-model="value3" type="text" placeholder="营销成功" />
              <!-- <img src="./jiantou.png" alt /> -->
            </div>
            <div v-show="show3">
              <ul>
                <li
                  @click="getvalue3(index,item)"
                  v-for="(item,index) in tableData3"
                  :key="item.index"
                >{{ item.name }}</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- @click="$router.push('/ContentManage/MarketingRecord/'+thisItem.id+'?title=营销记录')" -->
        <div class="customer_list">
          <ul
            v-for="(thisItem,index) in MarketingRecord"
            :key="index"
            @click="$router.push('/ContentManage/ArticleViewBasic/'+thisItem.id+'?title=营销客户详情')"
          >
            <li>
              <p>李三</p>
              <p class="approval">
                <span class="approval_Passed">成功</span>
              </p>
              <p class="schedule_star">最近一次营销 3天前</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div v-if="typeCN=='潜在客户添加'">
      <van-field
        v-model="phone_number"
        name="手机号："
        label="手机号："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写手机号' }]"
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
        :value="nation_txt"
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
        :value="marital_status_txt"
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
        <van-area :area-list="areaList" @confirm="onRegional_grid" @cancel="regional_grid = false" />
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
        :value="education_level_txt"
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
        :value="country_txt"
        label="国家："
        placeholder="点击选择国家"
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
        name="定位："
        label="定位："
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
        :value="health_txt"
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
        <van-button round block type="primary" @click="prev()">保存</van-button>
      </div>
    </div> -->
    <div v-if="typeCN=='潜在客户详情'">
      <van-field
        v-model="phone_number"
        name="手机号："
        label="手机号："
        placeholder="单行输入"
        :rules="[{ required: true, message: '请填写手机号' }]"
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
        :value="nation_txt"
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
        :value="marital_status_txt"
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
        <van-area :area-list="areaList" @confirm="onRegional_grid" @cancel="regional_grid = false" />
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
        :value="education_level_txt"
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
        :value="country_txt"
        label="国家："
        placeholder="点击选择国家"
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
        name="定位："
        label="定位："
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
        :value="health_txt"
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
        <van-button round block type="primary" @click="prev()">保存</van-button>
      </div>
    </div>
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
    <div v-if="typeCN=='农户家庭添加'">
      <ul class="stock cw_stock peasant_households">
        <li>*家庭类型：</li>
        <li>
          <select name id>
            <option value="务工，务农型">务工，务农</option>
            <option value="经营型">经营型</option>
          </select>
        </li>
        <li>*所属网格：</li>
        <li>
          <input type="text" placeholder="搜索所属网格" />
          <!-- <img src="./search.svg" alt /> -->
        </li>
        <li>居住地址：</li>
        <li>
          <input type="text" placeholder="单行输入" />
        </li>
        <li>经纬度：</li>
        <li>
          <input type="text" placeholder="点击图标地图选取" />
          <img src="../../assets/WorkBench/md-room.svg" alt />
        </li>
      </ul>
      <div class="save">
        <button
          @click="$router.push('/ContentManage/ArticleList4Notice/activityNotice?title=农户')"
        >保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "WorkbenchBranch",
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
      MarketingRecord: [
        {
          id: 1,
        },
      ],
      marketing_record: [
        {
          id: 1,

          name: "上门拜访，与负责领导洽谈一些事项",
          date: "刚刚",
        },
        {
          id: 2,
          name: "客户出差，电话沟通，等待电话沟通",
          date: "2020-08-12 9:00",
        },
        {
          id: 3,
          name: "上门拜访，初步达成意向想去上门拜访",
          date: "2020-08-10 16:00",
        },
      ],
      tableData1: [
        {
          name: "上门",
        },
        {
          name: "电话",
        },
        {
          name: "短信",
        },
        {
          name: "建档",
        },
      ],
      tableData2: [
        {
          name: "上",
        },
        {
          name: "下",
        },
      ],
      tableData3: [
        {
          name: "企营贷",
        },
        {
          name: "个人理财",
        },
      ],
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
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    if (localStorage.getItem("indexTabId")) {
      this.tabId = Number(localStorage.getItem("indexTabId"));
      localStorage.removeItem("indexTabId");
    }
    this.token = localStorage.getItem("token");
    this.articleId = this.$route.params.id;
    this.title = this.$route.query.title;
    this.isLGB = localStorage.getItem("isLgbWorker") == "0";
    this.height = 400 * (document.documentElement.clientWidth / 750) + "";
    // $loading.show("拼命加载中..");
    if (this.articleId == "url") {
      this.dataURL =
        this.$route.query.url +
        (this.$route.query.url.indexOf() == -1 ? "?_s=1" : "") +
        "&token=" +
        this.token;
    } else {
      this.dataURL =
        "/lgbsmp/api/v1/generalContent/" +
        this.articleId +
        "?token=" +
        this.token;
    }
  },
  updated() {
    // this.$seeks.getImgTab();
    // this.$previewRefresh();
  },
  methods: {
    onNation(value) {
      this.nation_txt = value;
      this.nation = false;
    },
    onMarital_status(value) {
      this.marital_status_txt = value;
      this.marital_status = false;
    },
    onKey_customers(value) {
      this.key_customers_txt = value;
      this.key_customers = false;
    },
    onCountry(value) {
      this.country_txt = value;
      this.country = false;
    },
    onHealth(value) {
      this.health_txt = value;
      this.health = false;
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
    allowControl(str) {
      return this.$seeks.allowControl(str);
    },
    // getData() {
    //   if (!this.articleId) {
    //     $loading.hide();
    //     return;
    //   }
    // },
    tab(ev) {
      this.tabId = ev;
      // localStorage.setItem("indexTabId", this.tabId);
    },
    // region_choice(){
    //   this.region_choice=true
    // },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
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
    draw({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(114.65, 33.37));
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
  },
};
</script>
<style scoped>
.WorkbenchBranch {
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
.map {
  width: calc(100%);
  height: 93vh;
}
.cur {
  color: #df0f0f;
  font-weight: 500;
  font-size: 0.9rem;
}
.cell_dashed {
  border-bottom: 0.001rem dashed #e8e8e8;
  height: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
.mission_details {
  background: #fff;
  padding: 0.5rem 0.5rem 0rem 0.5rem;
  position: relative;
}
.mission_details li {
  margin-bottom: 0.7rem;
  /* padding-left: 0.5rem; */
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
.tabTitle {
  border-top: 0px;
}
.tabTitle .tabList {
  display: flex;
  justify-content: space-around;
  height: 45px;
  width: 100%;
  line-height: 45px;
  background-color: #fff;
  border-bottom: 0.001rem solid #e8e8e8;
}
.progress {
  display: inline-block;
  vertical-align: bottom;
  background-color: rgba(100, 100, 100, 0.2);
  position: relative;
  height: 1rem;
  width: 50%;
  margin-left: 3rem;
}
.progress-done {
  background: #3cc8ab;
  height: 1rem;
  width: 80%;
  transition: width 1s ease 0.3s;
  text-align: right;
  color: #fff;
  padding-right: 0.3rem;
  line-height: 1rem;
}
.task_management {
  position: absolute;
  line-height: 1.6rem;
  text-align: center;
  width: 4.5rem;
  height: 1.6rem;
  border: 1px solid #1432e3;
  color: #1432e3;
  top: 5.3rem;
  font-size: 0.8rem;
  right: 4rem;
  transform: rotate(336deg);
  -ms-transform: rotate(336deg);
  -moz-transform: rotate(336deg);
  -webkit-transform: rotate(336deg);
  -o-transform: rotate(336deg);
}
.screen_content {
  display: flex;
  position: relative;
  background: #fff;
}
.screen_content input {
  width: 83%;
  height: 44px;
  margin: 4px;
  line-height: 20px;
  padding: 0rem 1rem 0rem 2.3rem;
  text-align: left;
  border-radius: 2px 2px 2px 2px;
  background-color: #fafafa;
  text-align: center;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.24);
  border: 1px solid rgba(255, 0, 0, 0);
}
.screen_content img {
  position: absolute;
  width: 14px;
  height: 14px;
  top: 40%;
  left: 5%;
  z-index: 100;
  opacity: 0.5;
}
.screen_content input::-webkit-input-placeholder {
  text-align: left;
  font-size: 14px;
}
.screen_content input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  text-align: left;
  font-size: 14px;
}
.screen_content input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  text-align: left;
  font-size: 14px;
}
.screen_content button {
  border: none;
  background: none;
}
.customer_list ul {
  background: #fff;
  margin-top: 10px;
}
.customer_list ul li {
  display: flex;
  flex-wrap: wrap;
  padding: 0.8rem 0.8rem;
}
.customer_list ul li p {
  width: 50%;
  margin-bottom: 0.3rem;
}
.customer_list ul li p:nth-child(even) {
  text-align: right;
}
.approval {
  position: relative;
}
.approval .approval_Passed {
  position: absolute;
  line-height: 3.6rem;
  text-align: center;
  width: 3.6rem;
  height: 3.6rem;
  border: 1px solid #259b24;
  color: #259b24;
  border-radius: 100%;
  top: -0.7rem;
  font-size: 0.8rem;
  right: 1rem;
  transform: rotate(330deg);
  -ms-transform: rotate(330deg); /* IE 9 */
  -moz-transform: rotate(330deg); /* Firefox */
  -webkit-transform: rotate(330deg); /* Safari 和 Chrome */
  -o-transform: rotate(330deg); /* Opera */
}
.not_select {
  display: flex;
  background: #fff;
}
.not_select .divInput {
  width: 33.3%;
  background: #fff;
}
.not_select .divInput ul {
  width: 33.3%;
  position: absolute;
  background: #fff;
  z-index: 6;
}
.not_select .divInput ul li {
  display: inline-block;
  list-style: none;
  width: 7rem;
  font-size: 0.8rem;
  /* border-top: 0.05rem solid #bbb; */
  background-color: #fff;
  margin: 0.4rem 1rem 0.4rem 1rem;
}
.not_select .divInput ul li:first-child {
  border: 0px;
}
.not_select .divInput .select_sort {
  width: 140px;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  position: relative;
  background-color: #fff;
}
.not_select .divInput .select_sort input {
  border: none;
  outline: none;
  width: 90%;
  height: 30px;
  padding: 0rem 1.2rem;
  border-radius: 0.3rem;
  margin-top: 5px;
  color: #1a1818;
  border: 1px solid #bbb;
  background-color: #fff;
}
.not_select .divInput .select_sort img {
  position: absolute;
  right: 34px;
  top: 18%;
  width: 13%;
}
.stock {
  padding: 0rem 1rem;
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
  width: 70%;
  margin: 0.5rem 0rem;
}
.stock li:nth-child(odd) {
  width: 30%;
}
.stock li input,
.stock li select {
  border: 0.05rem solid #bbb;
  height: 2rem;
  background: #fff;
  padding-left: 0.5rem;
  width: 100%;
  border-radius: 0.3rem;
}
.cw_stock {
  line-height: 2rem;
}
.cw_stock li {
  position: relative;
}
.cw_stock li img {
  position: absolute;
  top: 0.6rem;
  right: 1rem;
  width: 1rem;
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

.peasant_households li {
  margin-top: 1rem;
}
.peasant_households li select,
.peasant_households li input {
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
  .screen_content input {
    height: 2rem;
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
}
</style>
