<template>
  <div class="CustomerCaim">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '客户认领'">
      <van-search v-model="search_txt" placeholder="客户名称" />
      <div class="customer_list">
        <ul
          v-for="(thisItem, index) in customer_list"
          :key="index"
          class="cartItem"
        >
          <li style="width: 100%">
            <p style="width: 98%">{{ thisItem.name }}</p>
            <p style="width: 1%"></p>
            <p class="schedule_star">
              <van-rate
                v-model="value"
                :size="14"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                readonly
              />
            </p>
            <p>
              <a style="text-decoration: none; margin-right: 0.6rem">认领</a>
            </p>
          </li>
          <van-checkbox
            class="selctBtn"
            v-model="thisItem.id"
            shape="square"
          ></van-checkbox>
        </ul>
      </div>
      <van-divider :style="{ borderColor: '#fff' }">已加载完毕</van-divider>
      <div class="save" style="margin-top: 10rem">
        <button @click="showPopup()">批量认领</button>
      </div>
      <div v-show="isPopupVisible" class="isPopupVisibleSign">
        <div class="isPopupVisibleSign_content">
          <p class="pop_title">批量认领</p>
          <div class="pop_content">
            <van-field
              v-model="grid_name"
              name="网格名称"
              label="网格名称"
              placeholder="请填写网格名称"
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
                <van-radio-group v-model="radio" style>
                  <van-radio
                    :name="thisItem.id"
                    style="width: 100%; height: 2rem"
                  >
                    <li
                      style="
                        width: 11rem;
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
            <div style="margin-top: 3rem" class="save">
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
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "CustomerCaim",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      grid_theme: 0,
      grid_theme_txt: "",
      grid_theme_list: ["网格主题", "2020特色存款营销", "etc开通", "助农贷款"],
      grid_theme: false,
      grid_name: "",
      checked: true,
      value: 1,
      radio: "1",
      search_txt: "",
      isPopupVisible: false,
      customer_list: [
        {
          name: "北京卓越联腾科技有限公司",
          text: "上次联系",
          date: "三个月前",
          id: 1,
        },
        { name: "刘莎莎", text: "上次联系", date: "三个月前", id: 2 },
      ],
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
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
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
  },
  mounted() {},
};
</script>
<style scoped>
* {
  font-size: 14px;
}
.van-search {
  width: 100%;
}
.CustomerCaim {
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
.cartItem {
  display: flex;
  flex-flow: row;
  position: relative;
}
.selctBtn {
  margin: 1rem 0rem 0rem 1.2rem;
  position: absolute;
  top: -0.3rem;
  right: 1rem;
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
@media screen and (max-width: 359px) {
  * {
    font-size: 13px;
  }
  .customer_list ul li p {
    width: 57%;
  }
  .customer_list ul li p:nth-child(even) {
    width: 43%;
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
