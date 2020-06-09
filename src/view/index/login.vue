<template>
  <div class="login">dsadsadadasdasdas</div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    const code = this.$route.query.code;
    const href_url = window.location.href;
    if (1) {
      this.axios.post(`/user/loginAuthorization/071f3H7h1MAn9v0VOW8h1ZmM7h1f3H75`).then(res => {
          console.log(res);
      });
    } else {
//       setTimeout(res=>{
//              // window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce17baac45d34fc3&redirect_uri=https://momo.beituokj.com&response_type=code&scope=snsapi_base#wechat_redirect`;
//               window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce17baac45d34fc3&redirect_uri=https://momo.beituokj.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
// `;

//       },2000);
      
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
