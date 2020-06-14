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
          <van-button size="small" plain type="info" @click="sendCode">发送验证码</van-button>
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
      code: ""
    };
  },
  methods: {
    backFun() {
      this.$router.back(-1);
    },
    onSubmit(values) {
      
     this.axios.post(`/user/checkBindingPhone`,{
        openId: getopenId(),
        phone: this.phone,
        code: this.code
      }).then(res => {
        if (res.data.returnCode == "SUCCESS") {
            this.$toast.success('操作成功');
            let userInfo = this.$store.state.userInfo;
            userInfo.phone = this.phone;
            this.$store.commit("setUserInfo", userInfo);
        }else{
          this.$toast.fail(res.data.returnMsg);
        }
      });
    },
    sendCode() {
    let isMobile = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
    if (isMobile.test(this.phone) && this.phone.length == 11) {
      this.axios.post(`/user/bindingPhone`,{
        openId: getopenId(),
        phone: this.phone
      }).then(res => {
          // 发送成功
           if (res.data.returnCode == "SUCCESS") {
             this.$toast.success('发送成功');
           }else{
             this.$toast.fail('发送失败');
           }
      });
    }else{
      this.$toast.fail('请输入正确的手机号');
    }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bindphone {
}
</style>
