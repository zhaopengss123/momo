<template>
  <div class="bindphone">
    <van-nav-bar title="绑定手机" left-arrow @click-left="backFun" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        type="number"
        name="手机"
        label="手机"
        placeholder="手机"
        :rules="[{ required: true, message: '请填写手机' }]"
      />
      <van-field
        v-model="code"
        type="number"
        name="验证码"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <van-button size="small" plain type="info" native-type="button" :disabled="getCodeTime != 60" @click="sendCode">{{ getCodeTime == 60 ? '发送验证码' : getCodeTime+'s' }}</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getopenId } from "@/assets/utils";

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
    backFun() {
      this.$router.back(-1);
    },
    onSubmit(values) {
     this.axios.post(`/user/checkBindingPhone`,{
        openId: this.$store.state.openId,
        phone: this.phone,
        code: this.code
      }).then(res => {
        if (res.data.returnCode == "SUCCESS") {
            this.$toast.success('操作成功');
            let userInfo = this.$store.state.userInfo;
            userInfo.phone = this.phone;
            this.$store.commit("setUserInfo", userInfo);
            this.$router.push('/user')
        }else{
          this.$toast.fail(res.data.returnMsg);
        }
      });
    },
    sendCode() {
    let isMobile = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (isMobile.test(this.phone) && this.phone.length == 11) {
      this.axios.post(`/user/bindingPhone`,{
        openId: this.$store.state.openId,
        phone: this.phone
      }).then(res => {
          // 发送成功
           if (res.data.returnCode == "SUCCESS") {
             this.$toast.success('发送成功');
             this.setIntervalCode();
           }else{
             this.$toast.fail(res.data.returnMsg);
           }
      });
    }else{
      this.$toast.fail('请输入正确的手机号');
    }
    },
      /* ---------------- 倒计时 ---------------- */
  setIntervalCode() {
    let interval = setInterval(_ => {
      let getCodeTime = this.getCodeTime - 1;
      this.getCodeTime  = getCodeTime;
      if (getCodeTime <= 0) { clearInterval(interval); this.getCodeTime = 60 }
    }, 1000)
  },
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bindphone {
}
</style>
