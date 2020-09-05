<template>
  <div class="bindphone">
    <van-nav-bar title="会员登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        type="number"
        name="手机"
        label="手机"
        placeholder="手机"
        :rules="[{ required: false, message: '请填写您的手机号' }]"
      />
      <van-field
        v-model="code"
        type="number"
        name="验证码"
        label="验证码"
        maxlength="6"
        placeholder="验证码"
        :rules="[{ required: false, message: '请填写验证码' }]"
      >
        <template #button>
          <van-button
            size="small"
            plain
            type="info"
            native-type="button"
            :disabled="getCodeTime != 60"
            @click="sendCode"
          >{{ getCodeTime == 60 ? '发送验证码' : getCodeTime+'s' }}</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "Bindphone",
  data() {
    return {
      phone: "",
      code: "",
      getCodeTime: 60,
    };
  },
  methods: {
    onSubmit(values) {
      this.axios
        .get(`/api/app/miniApp/customerLogin?phone=${ this.phone }&code=${ this.code }`)
        .then((res) => {
          if(res.status != 200){ return  }
          this.$store.commit('setUserInfo',res.data.data)
          this.$router.push({ path: "/order" });
        });
    },
    sendCode() {
      let isMobile = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
      if (isMobile.test(this.phone) && this.phone.length == 11) {
        this.axios
          .get(`/api/app/miniApp/sendSms?phone=${ this.phone }&dataType=0`)
          .then((res) => {
            // 发送成功
            if (res.status == 200) {
              this.$toast.success("发送成功");
              this.setIntervalCode();
            } else {
              this.$toast.fail(res.data.returnMsg);
            }
          })
      } else {
        this.$toast.fail("请输入正确的手机号");
      }
    },
    /* ---------------- 倒计时 ---------------- */
    setIntervalCode() {
      let interval = setInterval((_) => {
        let getCodeTime = this.getCodeTime - 1;
        this.getCodeTime = getCodeTime;
        if (getCodeTime <= 0) {
          clearInterval(interval);
          this.getCodeTime = 60;
        }
      }, 1000);
    },
    Serialize(data){
      var val = "", str = "";
      for (var v in data) {
        str = v + "=" + data[v];
        val += str + '&';
      }
      return val.slice(0, val.length - 1);
    }
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bindphone {
  .fhIcon {
    width: 300px;
    height: 100px;
    background-repeat: no-repeat;
    background-size: 200px auto;
    background-position: center center;
    display: block;
  }
}
</style>
