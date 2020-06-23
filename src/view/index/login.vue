<template>
  <div class="login">
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
    const code = this.$route.query.code;
    const href_url = "https://" + document.domain;
    const phone = false;
    if (code) {
      this.axios.post(`/user/loginAuthorization/${code}`).then(res => {
        this.$store.commit("editOpenId", res.data.result.openId);
        this.$router.push({ path: "/index" });
      });
    } else {
      window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce17baac45d34fc3&redirect_uri=${href_url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
