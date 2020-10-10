<template>
  <div class="PathPlanning">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN == '路径规划'">
      <van-search
        v-model="customers"
        placeholder="请输入客户名称"
        @search="onSearch"
      />
      <div class="choice_people" style="border-bottom: 1px solid #e8e8e8">
        <p>
          已选择
          <span style="color: #ed3632; font-size: 1.2rem">{{
            path_planning.length
          }}</span>
          人
        </p>
        <ul v-for="(thisItem, index) in resultArr" :key="index">
          <li>
            <span>
              <img
                style="width: 3rem; border-radius: 100%"
                src="../../assets/grid/men1.jpg"
                alt
              />
              <img
                class="chahao"
                style="width: 1rem"
                src="../../assets/grid/chahao.jpg"
                @click="remotePlanning(thisItem)"
                alt
              />
            </span>
            <p>{{ thisItem.name }}</p>
          </li>
        </ul>
      </div>
      <div class="resource_selection selection_people">
        <van-checkbox-group v-model="resultArr">
          <ul
            v-for="(thisItem, index) in path_planning_list"
            :key="index"
            class="cartItem"
            style="border-bottom: 1px solid #e8e8e8"
          >
            <li>
              <p>
                <img
                  style="width: 3rem; border-radius: 100%"
                  src="../../assets/grid/men1.jpg"
                  alt
                />
              </p>
              <div>
                <p>{{ thisItem.name }}</p>
                <p>客户等级：{{ thisItem.level }}级</p>
              </div>
            </li>
            <van-checkbox :name="thisItem" shape="square"></van-checkbox>
          </ul>
        </van-checkbox-group>
        <div class="save" @click="back">
          <button>确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
export default {
  name: "PathPlanning",
  components: {
    ChildNav,
  },
  data() {
    return {
      checkAllFlag: false,
      typeCN: "",
      // checked: false,
      currentPage: 1,
      customers: "",
      path_planning: [],
      path_planning_list: [],
      resultArr: [],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.token = localStorage.getItem("_token");
    this.gridCustomers();
  },
  methods: {
    back() {
      // console.log(this.resultArr);
      this.$router.push({
        name: "Grid",
        params: { pathIds: this.resultArr },
      });
    },
    remotePlanning(row) {
      this.resultArr.splice(
        this.resultArr.findIndex((it) => it === row),
        1
      );
    },
    selectItem(thisItem) {
      // console.log(thisItem);
      if (typeof thisItem.checked == "undefined") {
        this.$set(thisItem, "checked", true);
      } else {
        thisItem.checked = !thisItem.checked;
      }
    },
    gridCustomers() {
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/semGridding/custInfo",
        params: {
          userName: _username,
          limit: 10,
          page: 1,
        },
      }).then((res) => {
        console.log(res);
        this.path_planning_list = res.data;
      });
    },
    onSearch(val) {
      console.log(val);
      let _username = localStorage.getItem("username");
      this.$httpGet({
        url: "/api/semGridding/custInfo",
        params: {
          userName: _username,
          limit: 10,
          page: 1,
          custName: val,
        },
      }).then((res) => {
        console.log(res);
        this.path_planning_list = res.data;
      });
    },
  },
};
</script>

<style scoped>
.PathPlanning {
  padding-top: 46px;
}
.choice_people li .chahao {
  position: absolute;
  background-color: #ff5f72;
  border-radius: 100%;
  z-index: 20;
  top: -2rem;
  right: -0.3rem;
  width: 1rem;
  height: 1rem;
}
.cartItem {
  display: flex;
  flex-flow: row;
  position: relative;
  margin-top: 0.2rem;
  font-size: 0.9rem;
}
.checked::before {
  position: absolute;
  content: "";
  font-size: 0.9rem;
  top: 50%;
  position: absolute;
  left: 50%;
  width: 1rem;
  height: 0.5rem;
  border: 0.1rem solid #fff;
  border-top: 0;
  border-right: 0rem;
  transform: rotate(-50deg) translate(0%, -125%);
}
.checked {
  position: relative;
  background: rgb(61, 66, 94);
  border: 1px solid rgb(61, 66, 94);
  color: #fff;
}
.cartItem li {
  width: 76%;
  margin-left: 0.5rem;
}
.resource_selection {
  background: #fff;
  padding: 1rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.resource_selection p {
  width: 100%;
  margin: 0px 0px 10px 0px;
}
.choice_people {
  display: flex;
  background: #fff;
  flex-wrap: wrap;
  padding: 0.5rem;
  border-bottom: 1px solid #e8e8e8 !important;
}
.choice_people p {
  width: 100%;
}
.choice_people li {
  margin-right: 1.5rem;
}
.choice_people li span {
  position: relative;
}
.selection_people {
  padding: 0.5rem;
}
.selection_people ul {
  border-bottom: 1px solid #e8e8e8 !important;
  padding: 0.5rem 0rem;
  align-items: center;
}
.selection_people ul li {
  display: flex;
  justify-content: flex-start;
}
.selection_people ul li p {
  width: auto;
}
.selection_people ul li div {
  margin-left: 0.5rem;
}
.save {
  margin-top: 3rem;
  text-align: center;
  padding-bottom: 3rem;
}
.save button {
  border: 0.05rem solid #bbb;
  background: rgb(61, 66, 94);
  color: #fff;
  width: 6rem;
  height: 2rem;
  border-radius: 0.3rem;
}
.van-checkbox {
  height: 2rem;
}
@media screen and (min-width: 320px) and (max-width: 374px) {
  li,
  select,
  input,
  p,
  div {
    font-size: 0.8rem;
  }
  .latest_tasks ul li {
    font-size: 0.7rem;
  }
  .latest_tasks ul {
    margin: 0;
  }
  .end_line {
    font-size: 0.8rem;
  }
  .two_select select {
    height: 1.5rem;
  }
  .pop_title {
    height: 2em;
    line-height: 2rem;
  }
  .pop_content {
    padding: 0.5rem;
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
  .van-radio__icon {
    height: 1.2rem !important;
  }
  .save button {
    height: 1.7rem;
    line-height: 1.7rem;
    width: 5rem;
    font-size: 0.8rem;
  }
  .pop_content p .pop_content_right {
    height: 1.5rem;
  }
  .map_marker p img {
    width: 1.5rem;
  }
  .selection_people ul {
    padding: 0rem;
  }
}
</style>
