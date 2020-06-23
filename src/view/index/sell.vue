<template>
  <div class="index">
    <van-nav-bar left-arrow @click-left="backFun" title="售卖大厅" />
    <div class="seach">
      <input type="text" v-model="propsName" placeholder="输入关键字" />
    </div>
    <list-component :isSell="1" :propsName="propsName" ref="child"></list-component>
  </div>
</template>

<script>
import listComponent from "@/components/list";
import footerComponent from "@/components/footer";
export default {
  name: "Buy",
  data() {
    return {
      bannerList: [],
      propsName:''
    };
  },
  components: { listComponent, footerComponent },
  methods: {
    backFun() {
      this.$router.back(-1);
    }
  },
  mounted() {
  },
  watch:{
    propsName(val){
        this.$refs.child.getData(1,val);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.seach {
  width: 325px;
  height: 44px;
  border: solid 1px #c0c4cc;
  line-height: 44px;
  margin: 0 auto;
  border-radius: 31.5px;
  overflow: hidden;
  margin-top: 12px;
  background: url("../../assets/seach.png") no-repeat 15px center;
  background-size: 14px auto;
}
.seach input {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 44px;
  text-indent: 40px;
  border: none;
  outline: none;
  background: none;
  font-size: 14px;
}

</style>
