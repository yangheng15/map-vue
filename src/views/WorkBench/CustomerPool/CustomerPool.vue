<template>
  <div class="CustomerPool">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '客户池'">
      <van-search
        v-model="search_txt"
        show-action
        placeholder="客户名称"
        @search="onSearch"
      >
        <template #action>
          <div @click="$router.push('/ScreenCustomerPool/?title=筛选')">
            筛选
          </div>
        </template>
      </van-search>
      <div class="customer_list">
        <ul
          v-for="(thisItem, index) in customer_pool"
          :key="index"
          class="cartItem"
        >
          <p class="selctBtn" @click="joinCust(thisItem)">
            <img
              style="width: 20px"
              :src="thisItem.flag ? imgArr[1] : imgArr[0]"
            />
          </p>
          <li class="newCustomerList" style="width: 100%">
            <router-link
              tag="p"
              style="width: 98%; margin: 4px 0px"
              :to="{
                name: 'CustomerViewPresentation',
                query: { title: '客户视图', id: thisItem.id },
              }"
              >{{ thisItem.name }}</router-link
            >
            <p style="width: 1%"></p>
            <p class="schedule_star">
              <van-rate
                v-model="star"
                :size="18"
                color="#0078D7"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p style="color: #df0f0f">AUM:{{ thisItem.aum }}</p>
            <p v-if="thisItem.level" style="color: #1badf2">
              {{ thisItem.level | dic_client_grade }}客户
            </p>
            <p class="marter">
              <span v-if="!thisItem.business1" class="business1"
                >{{ thisItem.business1 }}存款</span
              >
              <span v-if="!thisItem.business2" class="business2"
                >{{ thisItem.business2 }}贷款</span
              >
              <span v-if="!thisItem.business3" class="business3"
                >{{ thisItem.business3 }}理财</span
              >
            </p>
          </li>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      <!-- <div class="save" style="margin-top:50px">
        <van-button type="primary" size="small" color="rgb(61, 66, 94)" @click="showPopup()">批量分配</van-button>
      </div> -->
      <!-- <div v-show="isPopupVisible" class="isPopupVisibleSign">
        <div class="isPopupVisibleSign_content">
          <p class="pop_title">批量分配</p>
          <div class="pop_content">
            <van-field
              v-model="grid_name"
              name="网格名称"
              label="网格名称"
              placeholder="单行输入"
              :rules="[{ required: true, message: '请填写网格名称' }]"
            />
            <van-field
              readonly
              clickable
              name="picker"
              :value="grid_theme_txt"
              label="网格主题"
              placeholder="点击选择网格主题"
              @click="grid_theme = true"
            />
            <van-popup v-model="grid_theme" position="bottom">
              <van-picker
                show-toolbar
                :columns="grid_theme_list"
                @confirm="onGrid_theme"
                @cancel="grid_theme = false"
              />
            </van-popup>
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
                style="
                  display: flex;
                  flex-flow: row;
                  position: relative;
                  align-items: center;
                  height: 2rem;
                  margin-top: 0.3rem;
                  margin-left: 5px;
                "
                v-for="(thisItem, index) in customer_pool_pop"
                :key="index"
              >
                <van-radio-group v-model="radio">
                  <van-radio :name="thisItem.id" style="height: 2rem">
                    <li
                      style="
                        width: 12rem;
                        list-style-type: none;
                        display: flex;
                        justify-content: space-around;
                        align-items: flex-end;
                      "
                    >
                      <p style="margin: 0rem; width: 35%">
                        {{ thisItem.name }}
                      </p>
                      <p style="margin: 0rem; width: 55%">
                        {{ thisItem.text }}
                      </p>
                    </li>
                  </van-radio>
                </van-radio-group>
              </dd>
            </dl>
            <div style="margin-top: 2rem" class="save">
              <van-button
                style="margin-right: 1rem"
                round
                type="primary"
                @click="closePopup()"
                >保存</van-button
              >
              <van-button round type="primary" @click="closePopup()"
                >取消</van-button
              >
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import ChildNav from "../../../components/Public/ChildNav";
import { Toast, Dialog } from "vant";
let img1 = require("../../../assets/WorkBench/empty_heart.svg"),
  img2 = require("../../../assets/WorkBench/full_heart.svg");
export default {
  name: "CustomerPool",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      user_positioning: "",
      grid_theme: 0,
      grid_theme_txt: "",
      grid_theme_list: ["网格主题", "2020特色存款营销", "etc开通", "助农贷款"],
      grid_theme: false,
      grid_name: "",
      checked: true,
      value: 1,
      radio: "1",
      search_txt: "",
      show: false,
      show_back: false,
      isPopupVisible: false,
      isPopupVisibleScreen: false,
      isPopupVisibleFamily: false,
      text: "本季度",
      level: "",
      levelName: "",
      customerCode: "",
      customer_pool_pop: [
        {
          name: "20001",
          text: "世纪广场etc开通",
          id: 0,
        },
        {
          name: "10001",
          text: "柳芳社区etc开通",
          id: 1,
        },
      ],
      customer_pool: [],
      empty_heart: true,
      imgArr: [img1, img2],
      star: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path === "/ScreenCustomerPool/") {
        vm.$store
          .dispatch("UPDATESCREEN", vm.$store.state.screeningCriteria)
          .then(() => {
            vm.customer_pool = vm.$store.state.screenCustomerPoolData;
            if (vm.customer_pool) {
              vm.customer_pool.forEach((el) => {
                console.log(el.star);
                vm.star = parseInt(el.star);
              });
            }
          });
      } else {
        vm.getCustomerPool();
      }
    });
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  // computed: {
  //   customer_pool() {
  //     console.log(this.$store.state.screenCustomerPoolData);
  //     return this.$store.state.screenCustomerPoolData
  //   }
  // },
  methods: {
    onGrid_theme(value) {
      this.grid_theme_txt = value;
      this.grid_theme = false;
    },
    showPopup() {
      this.isPopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    getCustomerPool() {
      this.$httpGet({
        url: "/api/customerPool/app",
        params: {
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        console.log(res);
        this.customer_pool = res.data;
        console.log(this.customer_pool);
        this.customer_pool.forEach((el) => {
          console.log(el.star);
          this.star = parseInt(el.star);
        });
      });
    },
    getdic() {
      this.$httpGet({
        url: `/dic/dic_client_grade/${this.level}`,
      }).then((res) => {
        this.levelName = res.data.codeText;
      });
    },
    onSearch(val) {
      this.$httpGet({
        url: "/api/customerPool/app",
        params: {
          limit: 10,
          page: 1,
          name: val,
        },
      }).then((res) => {
        this.customer_pool = res.data;
        this.customer_pool.forEach((el) => {
          this.star = parseInt(el.star);
        });
      });
    },
    joinCust(item) {
      // console.log(this.customerCode);
      if (item.flag) {
        Toast({
          message: "已存在我的客户信息",
          position: "middle",
        });
      } else {
        item.flag = !item.flag;
      }

      this.$httpPost({
        url: "/api/customers/joinCust",
        params: {
          customerCode: item.code,
        },
      })
        .then((res) => {
          // console.log(code);
          this.empty_heart = !this.empty_heart;
          // console.log(this.empty_heart);
        })
        .catch(() => {});
    },
  },
  computed: {
    customer_poolshi() {
      return this.$store.state.customer_poolshi;
    },
  },
  filters: {
    dic_client_grade(val) {
      console.log(val);
      return JSON.parse(localStorage.getItem("dic")).find((it) => it.key == val)
        .value;
    },
  },
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.van-checkbox__icon {
  height: 20px;
}
.marter span {
  margin: 0px 2px;
}
.van-search {
  width: 100%;
}
.CustomerPool {
  padding-top: 46px;
}
/* 下面是弹窗 */
.isPopupVisibleSign {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0rem;
  width: 100%;
  height: 100vh;
  padding: 0.5rem 0.5rem;
  background: rgba(193, 185, 185, 0.7);
}
.isPopupVisibleSign_content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 77%;
  background: rgb(255, 255, 255);
  border-radius: 0.5rem;
}
.pop_content {
  padding: 1rem 1rem 1rem 1rem;
}
.pop_title {
  text-align: center;
  background: rgb(61, 66, 94);
  color: #fff;
  font-size: 1rem;
  height: 2.5em;
  margin: 0rem;
  line-height: 2.5rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

/* 上面是弹窗 */

.bm-view {
  width: 100%;
  height: 78vh;
}
.c-row-label {
  width: 70px;
}
.customer_list ul {
  background: #fff;
  /* margin-top: 10px; */
}
.customer_list ul li {
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem 0.5rem;
  border-bottom: 0.001rem solid #e8e8e8 !important;
}
.customer_list ul li p {
  width: 60%;
  margin: 5px 0px;
}
.customer_list ul li p:nth-child(even) {
  text-align: right;
  width: 40%;
}
.customer_list .schedule_star img {
  width: 1.2rem;
  vertical-align: middle;
}
.newCustomerList .business1 {
  display: inline-block;
  border: 0.05rem solid #0fb38f;
  color: #0fb38f;
  padding: 0.1rem 0.3rem;
}
.newCustomerList .business2 {
  display: inline-block;
  border: 0.05rem solid #1432e3;
  color: #1432e3;
  padding: 0.1rem 0.3rem;
}
.newCustomerList .business3 {
  display: inline-block;
  border: 0.05rem solid #ecd14a;
  color: #ecd14a;
  padding: 0.1rem 0.3rem;
}
.cartItem {
  display: flex;
  flex-flow: row;
  position: relative;
}
.selctBtn {
  /* width: 1.2rem;
  height: 1.2rem; */
  /* border: 1px solid #000; */
  margin: 1rem 0rem 0rem 1.2rem;
  position: absolute;
  top: -0.3rem;
  right: 1rem;
  /* cursor: pointer; */
}
.checked {
  position: absolute;
  background: rgb(61, 66, 94);
  border: 1px solid rgb(61, 66, 94);
  color: #fff;
}
.cartItem li {
  width: 90%;
}
.save {
  /* background: #fff; */
  text-align: center;
  padding-bottom: 50px;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 6rem;
  border-radius: 0.4rem;
  height: 2rem;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
  .customer_list ul li p {
    width: 57%;
  }
  .customer_list ul li p:nth-child(even) {
    width: 43%;
  }

  .end_line {
    font-size: 0.8rem;
  }
  .two_select select {
    height: 1.5rem;
  }
  .pop_title {
    font-size: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .pop_content {
    padding: 0.5rem;
  }
  .save {
    padding-bottom: 2rem;
  }
}
</style>
