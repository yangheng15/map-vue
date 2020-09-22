<template>
  <div class="ProductCatalogDetail">
    <child-nav :title="typeCN"></child-nav>
    <div v-if="typeCN=='产品目录详情'" style="background:#f5f5f5">
      <p class="productName">产品名称：企业贷</p>
      <p class="productTitle">产品描述</p>
      <van-field
        v-model="product_description"
        rows="10"
        autosize
        label
        type="textarea"
        maxlength="500"
        placeholder="请输入产品描述"
        show-word-limit
      />
      <p class="productTitle">营销话术</p>
      <van-field
        v-model="marketing_talk"
        rows="10"
        autosize
        label
        type="textarea"
        maxlength="500"
        placeholder="请输入营销话术"
        show-word-limit
      />
      <p class="productTitle">现场影像</p>
      <div class="productImg">
        <van-image width="79px" height="79px" fit="contain" :src="picture" />
        <van-image width="79px" height="79px" fit="contain" :src="picture" />
        <van-uploader :after-read="afterRead" />
      </div>
    </div>
  </div>
</template>
<script>
import ChildNav from "../../components/Public/ChildNav";
import img from "../../assets/WorkBench/qiyedai.jpg";
export default {
  name: "ProductCatalogDetail",
  components: {
    ChildNav,
  },
  data() {
    return {
      title: "",
      typeCN: "",
      product_description:
        "向企事业法人或国家规定可以作为借款人的其他组织发放的用于借款人日常生产经营周转的贷款。业务特点：满足企业日常生产经营过程中的流动资金需求。使用指南：使用对象：企事业法人或国家规定可以作为借款人的其他组织。授信额度：根据借款人经营规模、业务特征及应收账款、资金循环周期等要素测算其营运资金需求，综合考虑借款人现金流、负债、还款能力、担保等因素，合理确定授信金额。",
      marketing_talk:
        "在金融竞争日益激烈的今天，特别是我国加入WTO之后，对外的不断开放，国际金融市场的竞争压力也不断加大。国内金融机构为了适应这一新的形势，纷纷在市场销售，制度创新，管理模式更新，等方面都做出了积极努力。特别是集约化经营，扁平式管理等等，而对于日前信用社来讲，形势更加严重，仍处于传统的粗放式经营，管理模式，严重制约了信用社的发展。也必将不利于信用社的竞争和新的形势下的发展需求。为适应当前信用社的改革。结合邳州农信社的实际情况，按照信用社“五自”原则，“资本自聚、资金自筹，经营自主、风险自担，亏损自负、”提高贷款质量，有效降低风险。",
      picture: img,
    };
  },
  created() {
    this.typeCN = this.$route.query.title;
  },
  updated() {},
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
  },
  beforeDestroy() {},
};
</script>
<style scoped>
* {
  font-size: 14px;
}
p {
  margin: 0;
}
.ProductCatalogDetail {
  padding-top: 46px;
}
.productName {
  background-color: #fff;
  padding: 10px 5px;
}
.productTitle {
  padding: 8px 5px;
}
.productImg {
  padding: 15px;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
}

@media screen and (min-width: 320px) and (max-width: 374px) {
  * {
    font-size: 13px;
  }
}
</style>
