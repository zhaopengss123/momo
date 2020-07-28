<template>
  <div class="pay">
    <van-nav-bar title="提现" left-arrow @click-left="backFun" />
    <!-- right-text="提现记录"       @click-right="payList"
    -->

    <div class="pay-main">
      <div class="pay-text">可提现金额(元)</div>
      <div class="pay-number">{{ userInfo.userTotalPrice || 0 }}</div>
      <div class="pay-btn" @click="cash">全部提出</div>
    </div>
  </div>
</template>

<script>
import { setOpenId } from "@/assets/utils";

export default {
  name: "Pay",
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    backFun() {
      this.$router.back(-1);
    },
    payList() {
      this.$router.push({ path: "/cashlist" });
    },
    cash() {
      if(!(this.userInfo.userTotalPrice && this.userInfo.userTotalPrice > 10)){
        this.$dialog({ message: '可提现金额必须大于10元~' });
        return ;
      }
      this.axios
        .post(`/user/withdrawal`, {
              openId: this.$store.state.openId,
              price: this.userInfo.userTotalPrice || 0
        })
        .then((res) => {
          if (res.data.returnCode == "SUCCESS") {
             this.$toast.success("操作成功！");
          }else{
            this.$dialog({ message: res.data.returnMsg });
          }
        })
        .catch((error) => {
          //捕获失败
        });
    },
  },
  mounted() {
    if (!setOpenId(this.$store.state.openId)) {
      return false;
    }
    this.userInfo = this.$store.state.userInfo;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pay {
  width: 375px;
  height: 100%;
  background: #fafafa;
  .pay-main {
    margin-top: 64px;
    color: #222222;
    font-size: 16px;
    text-align: center;
    .pay-number {
      color: #e53b33;
      font-size: 50px;
      font-weight: bold;
      font-style: italic;
      margin-top: 10px;
    }
    .pay-btn {
      width: 335px;
      height: 55px;
      line-height: 55px;
      text-align: center;
      color: #fff;
      background: #e53b33;
      border-radius: 10px;
      margin: 0 auto;
      margin-top: 60px;
    }
  }
}
</style>
