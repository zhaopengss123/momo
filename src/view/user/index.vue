<template>
  <div class="index">
    <van-nav-bar title="momo道具城" />
    <div class="card">
      <div class="card-title">我的发布</div>
      <div class="card-main">
        <ul>
          <li><span>已上架</span></li>
           <li class="last"><span>已下架</span></li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-title">我的购买</div>
      <div class="card-main">
        <ul>
          <li><span>已上架</span></li>
           <li class="last"><span>已下架</span></li>
        </ul>
      </div>
    </div>

    <footer-component :activeIndex="2"></footer-component>
  </div>
</template>

<script>
import footerComponent from "@/components/footer";
export default {
  name: "Index",
  data() {
    return {};
  },
  components: { footerComponent },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index {
  .card {
    overflow: hidden;
    width: 100%;
    margin-top: 24px;
    padding-bottom: 10px;

  .card-main {
      width: 325px;
      margin: 0 auto;
      box-shadow:0px 0px 10px 0px rgba(238,238,238,1);
      border-radius:20px;
      overflow: hidden;
      padding-bottom: 20px;
      margin-top: 10px;
  } 
      .card-title {
      width: 325px;
      color: #101010;
      margin: 0 auto;
      font-size: 16px;
      font-weight:500;
    }

      li{
        float: left;
        margin-top: 20px;
        width: 25%;
        text-align: center;
        color: #666666;
        font-size: 12px;
        padding-top: 30px;
        background-image: url('../../assets/user/1.png');
        background-repeat: no-repeat;
        background-size: auto 25px;  
        background-position: center top; 
        &.last{
          background-image: url('../../assets/user/2.png');
        }
      }
  
  }
}
</style>
