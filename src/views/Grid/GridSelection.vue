<template>
  <div class="GridSelection">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '网格选择'">
      <div class="resource_selection">
        <ul
          v-for="(thisItem, index) in grid_selection1"
          :key="index"
          class="cartItem"
        >
          <van-checkbox v-model="ownerCheck" shape="square">{{
            thisItem.name
          }}</van-checkbox>
        </ul>
      </div>
      <!-- <div class="resource_selection" style="margin-top: 0.5rem">
        <p>基础网格</p>
        <ul
          v-for="(thisItem, index) in grid_selection2"
          :key="index"
          class="cartItem"
        >
          <van-checkbox v-model="thisItem.id" shape="square">{{
            thisItem.name
          }}</van-checkbox>
        </ul>
      </div> -->
      <div class="resource_selection" style="margin-top: 0.5rem">
        <p>专题网格</p>
        <ul
          v-for="(thisItem, index) in grid_selection3"
          :key="index"
          class="cartItem"
        >
          <van-checkbox-group v-model="resultArr">
            <van-checkbox :name="thisItem.code" shape="square">{{
              thisItem.codeText
            }}</van-checkbox>
          </van-checkbox-group>
        </ul>
      </div>
      <div class="save" @click="back">
        <button>确认</button>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "GridSelection",
  components: {
    ChildNav,
  },
  data() {
    return {
      typeCN: "",
      value: "",
      resource_selection3: [],
      grid_selection1: [{ name: "只看我的" }],
      grid_selection2: [],
      grid_selection3: [],
      resultArr: [],
      ownerCheck: false,
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.token = localStorage.getItem("_token");
    this.obtainDic();
  },
  methods: {
    back() {
      this.$router.push({
        name: "Grid",
        params: {
          specialSubject: this.resultArr.join(","),
          owner: this.ownerCheck,
        },
      });
    },
    async obtainDic() {
      this.$httpGet({
        url: "/dic/type/dic_grid_theme_type",
      }).then((res) => {
        res.data = res.data.filter(function (item, index) {
          return item.parentId != null;
        });
        this.grid_selection3 = res.data;

        for (var item = 0; item < res.data.length; item++) {
          let lalala = res.data[item].code;
          // this.resource_selection3[item] = res.data[item].code;
        }
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.GridSelection {
  padding-top: 46px;
}
.cartItem {
  display: flex;
  flex-flow: row;
  position: relative;
  margin-top: 5px;
  font-size: 14px;
}

.cartItem li {
  width: 76%;
  margin-left: 10px;
}
.resource_selection {
  background: #fff;
  padding: 15px;
  border-bottom: 1px solid #e8e8e8;
}
.resource_selection p {
  width: 100%;
  margin: 0px 0px 10px 0px;
}
.save {
  margin-top: 50px;
  text-align: center;
  padding-bottom: 50px;
}
.save button {
  border: 1px solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 80px;
  height: 30px;
  line-height: 28px;
  border-radius: 6px;
}
.van-checkbox {
  height: 30px;
}
@media screen and (max-width: 359px) {
  * {
    font-size: 13px;
  }
}
</style>
