<template>
  <div class="login">
      <button @click="towx">1111</button>

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    towx() {
      const code = this.$route.query.code;
      const href_url = encodeURIComponent(window.location.href);
      const openId = 'osHzdt5mqVBHOA5gN_hO8TY1GZP8';
      const phone = false;
      this.$store.commit('editOpenId',openId);
      console.log(this.$store.state.openId);
      this.$router.push({ path:'/index' })
      // if (code) {
      //   this.axios.post(`/user/loginAuthorization/021rkhkt0rPxQi1R3Plt0iybkt0rkhku`).then(res => {
      //     console.log(res);
      //   });
      // } else {
      //   window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce17baac45d34fc3&redirect_uri=${ href_url }&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
      // }
    }
  },
  mounted() {},
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
