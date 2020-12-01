<template>
  <div class="ResourceSelection">
    <!-- <child-nav :title="typeCN"></child-nav> -->
    <div>
      <!-- <van-search v-model="value" placeholder="网格名称、客户名称、资源名称" /> -->
      <!-- <div class="resource_selection">
        <p>任务</p>
        <ul v-for="(thisItem,index) in resource_selection1" :key="index" class="cartItem">
          <van-checkbox v-model="thisItem.id" shape="square">{{thisItem.name}}</van-checkbox>
        </ul>
        <van-pagination
          v-model="currentPage"
          :total-items="125"
          :show-page-size="3"
          force-ellipses
        />
      </div>
      <div class="resource_selection new_selection_two">
        <p>客户</p>
        <ul v-for="(thisItem,index) in resource_selection2" :key="index" class="cartItem">
          <van-checkbox v-model="thisItem.id" shape="square">{{thisItem.name}}</van-checkbox>
        </ul>
      </div> -->
      <div class="new_selection_three">
        <!-- <p>资源</p> -->
        <ul
          v-for="(thisItem, index) in resource_selection3"
          :key="index"
          class="cartItem"
        >
          <van-checkbox-group v-model="resultArr">
            <van-checkbox
              :name="thisItem.code"
              checked-color="rgb(61, 66, 94)"
              shape="square"
              >{{ thisItem.codeText }}</van-checkbox
            >
          </van-checkbox-group>
          <!-- <van-checkbox
            @change="bianhua"
            v-model="thisItem.code"
            checked-color="rgb(61, 66, 94)"
            shape="square"
          >{{thisItem.codeText}}</van-checkbox>-->
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
  name: "ResourceSelection",
  components: {
    ChildNav,
  },
  data() {
    return {
      checkAllFlag: false,
      typeCN: "",
      // checked: false,
      currentPage: 1,
      value: "",
      resource_selection1: [
        {
          name: "卓越联腾企业贷客户拜访营销",
          id: 1,
        },
        {
          name: "某某企业电话营销",
          id: 2,
        },
        {
          name: "某某客户理财营销",
          id: 3,
        },
      ],
      resource_selection2: [
        {
          name: "个人",
          id: 1,
        },
        {
          name: "企业",
          id: 2,
        },
      ],
      resource_selection3: [],
      path_planning: [],
      resultArr: [],
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
    this.token = localStorage.getItem("_token");
    this.obtainDic();
  },
  methods: {
    back() {
      const localArr = []
      this.resultArr.forEach((item) => {
        localArr.push(this.resource_selection3.find(it => it.code === item).codeText)
      })
      this.$emit("resourceEmit", { typeIds: this.resultArr.join(","), localArr });
      // console.log(this.resultArr.join(","));
      // this.$router.push({
      //   name: "Grid",
      //   params: { typeIds: this.resultArr.join(",") },
      // });
    },
    async obtainDic() {
      this.$httpGet({
        url: "/dic/type/dic_grid_resource_type",
      }).then((res) => {
        res.data = res.data.filter(function (item, index) {
          return item.parentId != null;
        });
        this.resource_selection3 = res.data;

        for (var item = 0; item < res.data.length; item++) {
          // console.log(res.data[item].code);
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
.ResourceSelection {
  padding-top: 46px;
}
.van-pagination {
  margin-top: 20px;
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
.selctBtn {
  width: 1rem;
  height: 1rem;
  border: 1px solid #000;
  /* margin: 1rem 0rem 0rem 1.2rem; */
  cursor: pointer;
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

.path_search input {
  padding: 0rem 2.3rem 0rem 1rem;
}
.path_search img {
  left: auto;
  right: 5%;
}

.resource_selection {
  background: #fff;
  padding: 1rem;
  border-bottom: 0.001rem solid #e8e8e8;
}
.new_selection_two,
.new_selection_three {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
}
.new_selection_three {
  padding: 0rem 1rem;
}
.new_selection_two ul {
  width: 50%;
}
.new_selection_three ul {
  width: 50%;
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
  margin-top: 1rem;
  text-align: center;
  padding-bottom: 1.5rem;
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
    line-height: 1.6rem;
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
