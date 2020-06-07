<template>
  <div class="index">
    <van-nav-bar title="momo道具城" />
    <div>
      <div class="card">
        <div class="card-title">我的发布</div>
        <div class="card-main">
          <ul>
            <li>
              <span>已上架</span>
            </li>
            <li class="last">
              <span>已下架</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-title">我的购买</div>
        <div class="card-main">
          <ul>
            <li>
              <span>待支付</span>
            </li>
            <li>
              <span>待发货</span>
            </li>
            <li>
              <span>待审核</span>
            </li>
            <li>
              <span>审核失败</span>
            </li>
            <li>
              <span>交易成功</span>
            </li>
            <li>
              <span>全部订单</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-title">我的售卖</div>
        <div class="card-main">
          <ul>
            <li>
              <span>已上架</span>
            </li>
            <li>
              <span>已下架</span>
            </li>
            <li>
              <span>待审核</span>
            </li>
            <li>
              <span>审核失败</span>
            </li>
            <li>
              <span>交易成功</span>
            </li>
            <li>
              <span>全部订单</span>
            </li>
          </ul>
        </div>
      </div>
     <div class="card">
        <div class="card-title">联系客服</div>
      </div>
     <div class="card">
        <div class="card-title">订单申诉</div>
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
      box-shadow: 0px 0px 10px 0px rgba(238, 238, 238, 1);
      border-radius: 20px;
      overflow: hidden;
      padding-bottom: 20px;
      margin-top: 10px;
    }
    .card-title {
      width: 325px;
      color: #101010;
      margin: 0 auto;
      font-size: 16px;
      font-weight: bold;
    }

    li {
      float: left;
      margin-top: 20px;
      width: 25%;
      text-align: center;
      color: #666666;
      font-size: 12px;
      padding-top: 30px;
      background-image: url("../../assets/user/1.png");
      background-repeat: no-repeat;
      background-size: auto 25px;
      background-position: center top;
    }
    &:nth-child(1) {
      li.last {
        background-image: url("../../assets/user/2.png");
      }
    }
    &:nth-child(2) {
      li:nth-child(1) {
        background-image: url("../../assets/user/3.png");
      }
      li:nth-child(2) {
        background-image: url("../../assets/user/4.png");
      }
      li:nth-child(3) {
        background-image: url("../../assets/user/5.png");
      }
      li:nth-child(4) {
        background-image: url("../../assets/user/6.png");
      }
      li:nth-child(5) {
        background-image: url("../../assets/user/7.png");
      }
      li:nth-child(6) {
        background-image: url("../../assets/user/8.png");
      }
    }
        &:nth-child(3) {
      li:nth-child(1) {
        background-image: url("../../assets/user/1.png");
      }
      li:nth-child(2) {
        background-image: url("../../assets/user/2.png");
      }
      li:nth-child(3) {
        background-image: url("../../assets/user/5.png");
      }
      li:nth-child(4) {
        background-image: url("../../assets/user/6.png");
      }
      li:nth-child(5) {
        background-image: url("../../assets/user/7.png");
      }
      li:nth-child(6) {
        background-image: url("../../assets/user/8.png");
      }
    }
  }
}
</style>
