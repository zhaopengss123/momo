<template>
  <div class="cashlist">
    <van-nav-bar title="提现记录" left-arrow @click-left="backFun" />
    <div class="list">
      <ul>
        <li v-for="(item,index) in dataList" :key="index">
          <div class="left">
            <span>提现至微信零钱</span>
            <span>2018-06-19 14:48</span>
          </div>
          <div class="right">
            <span>1.2元</span>
            <span>提现成功</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="nodata">暂无提现记录</div>
  </div>
</template>

<script>
import { setOpenId } from "@/assets/utils";

export default {
  name: "cashlist",
  data() {
    return {
      dataList:[]
    };
  },
  methods: {
    backFun() {
      this.$router.back(-1);
    },
  },
  mounted() {
    if (!setOpenId(this.$store.state.openId)) {
      return false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cashlist {
  width: 100%;
  height: 100%;
  .nodata{
    color: #999;
    text-align: center;
    margin-top: 50px;
    font-size: 13px;
  }
  .list {
    width: 335px;
    margin: 0 auto;
    padding: 0 7.5px;
    ul > li {
      border-bottom: solid 1px #DFDFDF;
      overflow: hidden;
      height: 80px;
      .left {
        float: left;
        span{
          display: block;
        }
        span:nth-child(1) {
          color: #030303;
          font-size: 16px;
          margin-top: 18px;
        }
        span:nth-child(2) {
          color: #575757;
          font-size: 12px;
          margin-top: 5px;
        }
      }

      .right{
        float: right;
        text-align: right;
        span{
          display: block;
        }
        span:nth-child(1) {
          color: #E53B33;
          font-size: 16px;
          margin-top: 19px;
        }
        span:nth-child(2) {
          color: #575757;
          font-size: 12px;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
