<template>
  <div class="index">
    <van-nav-bar title="陌陌道具城" />
    <div class="header">
      <img :src="userInfo.userHeadImgUrl" alt />
      <div>
        <div class="header-top"><span>{{ userInfo.nickName }}</span><span v-if="userInfo.phone">{{ userInfo.phone }}</span><span v-else><router-link to="/bindphone">未绑定 ></router-link></span></div>
        <div class="header-bottom">
          <span>￥{{ userInfo.userTotalPrice || 0 }}</span>
          <span>去提现 ></span>
        </div>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="card-title">我的发布</div>
        <div class="card-main">
          <ul>
            <li>
              <router-link to="/releaseInfo">
              <span>我的发布</span>
              </router-link>
            </li>
            <!-- <li class="last">
              <span>已下架</span>
            </li> -->
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-title">我的购买</div>
        <div class="card-main">
          <ul>
                 <li :class="buyNumberFun(1) ? 'active' : ''">
              <router-link :to="{ name: 'ShopList',params:{ releaseType: 0, orderStatus: 1, titles: '待支付' } }">
                <span>待支付</span>
              </router-link>
              <i></i>
            </li>
            <li :class="buyNumberFun(3) ? 'active' : ''">
            <router-link :to="{ name: 'ShopList',params:{ releaseType: 0, orderStatus: 3, titles: '待发货' } }">
              <span>待发货</span>
             </router-link>
             <i></i>
            </li>
            <li :class="buyNumberFun(5) ? 'active' : ''">
            <router-link :to="{ name: 'ShopList',params:{ releaseType: 0, orderStatus: 5, titles: '待审核' } }">
              <span>待审核</span>
             </router-link>
             <i></i>
            </li>
            <li :class="buyNumberFun(8) ? 'active' : ''">
             <router-link :to="{ name: 'ShopList',params:{ releaseType: 0, orderStatus: 8, titles: '审核中' } }">
              <span>申诉中</span>
            </router-link>
            <i></i>
            </li>
            <li>
            <router-link :to="{ name: 'ShopList',params:{ releaseType: 0, orderStatus: 6, titles: '交易成功' } }">
              <span>交易成功</span>
            </router-link>
            <i></i>
            </li>
            <li>
             <router-link :to="{ name: 'ShopList',params:{  releaseType: 0, titles: '全部订单' } }">
              <span>全部订单</span>
              </router-link>
              <i></i>
            </li>
          </ul>
        </div>
      </div>

      <div class="card">
        <div class="card-title">我的售卖</div>
        <div class="card-main">
          <ul>
            <li :class="sellNumberFun(1) ? 'active' : ''">
              <router-link :to="{ name: 'ShopList',params:{ releaseType: 1, orderStatus: 1, titles: '待支付' } }">
                <span>待支付</span>
              </router-link>
              <i></i>
            </li>
            <li :class="sellNumberFun(3) ? 'active' : ''">
            <router-link :to="{ name: 'ShopList',params:{ releaseType: 1, orderStatus: 3, titles: '待发货' } }">
              <span>待发货</span>
             </router-link>
             <i></i>
            </li>
            <li :class="sellNumberFun(5) ? 'active' : ''">
            <router-link :to="{ name: 'ShopList',params:{ releaseType: 1, orderStatus: 5, titles: '待审核' } }">
              <span>待审核</span>
             </router-link>
             <i></i>
            </li>
            <li :class="sellNumberFun(8) ? 'active' : ''">
             <router-link :to="{ name: 'ShopList',params:{ releaseType: 1, orderStatus: 8, titles: '审核中' } }">
              <span>申诉中</span>
            </router-link>
            <i></i>
            </li>
            <li>
            <router-link :to="{ name: 'ShopList',params:{ releaseType: 1, orderStatus: 6, titles: '交易成功' } }">
              <span>交易成功</span>
            </router-link>
            <i></i>
            </li>
            <li>
             <router-link :to="{ name: 'ShopList',params:{  releaseType: 1, titles: '全部订单' } }">
              <span>全部订单</span>
              </router-link>
              <i></i>
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
import { getopenId } from "@/assets/utils";

export default {
  name: "Index",
  data() {
    return {
      userInfo: {},
      sellNumber:[],
      buyNumber: []
    };
  },
  components: { footerComponent },
  methods: {},
  mounted() {
      this.axios.post(`/user/info/${this.$store.state.openId}`).then(res => {
        if (res.data.returnCode == "SUCCESS") {
          this.$store.commit("setUserInfo", res.data.result);
          this.userInfo = res.data.result;
        }
      });
            this.axios.post(`/user/sellOrderNum/${this.$store.state.openId}`).then(res => {
        if (res.data.returnCode == "SUCCESS") {
            this.sellNumber = res.data.result;
        }
      });
            this.axios.post(`/user/buyOrderNum/${this.$store.state.openId}`).then(res => {
        if (res.data.returnCode == "SUCCESS") {
            this.buyNumber = res.data.result;
        }
      });
  },
  computed:{
    buyNumberFun(){
      const that = this;
        return function(data){
        let blon = false;
        that.buyNumber.map(item=>{
          if(data == item.orderStatus){
            blon = true;
          }
        })
          return blon;
        }
    },
    sellNumberFun(){
      const that = this;
        return function(data){
        let blon = false;
        that.sellNumber.map(item=>{
          if(data == item.orderStatus){
            blon = true;
          }
        })
          return blon;
        }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index {
  .header {
    float: left;
    margin-left: 25px;
    margin-top: 13px;
    margin-bottom: 30px;
    a {
      color: inherit;
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      float: left;
    }
    div {
      float: left;
      margin-left: 10px;
      .header-top{
        line-height: 25px;
       span {
         float:left;
        &:nth-child(1) {
          color: #373c41;
          font-size: 16px;
          margin-top: 5px;
        }
        &:nth-child(2) {
          color: #919ba5;
          font-size: 12px;
          margin-top: 6px;
          margin-left:10px;
        }
      }
      }
      .header-bottom{
        display:block;
        clear:both;
        line-height: 25px;
        span{
          float:left;
        }
        span:nth-child(1){
          color:#E53B33;
          font-size: 16px;
          padding-bottom:3px;
        }
        span:nth-child(2){
          color: #919BA5;
          font-size:12px;
          margin-left:10px;
        }
      }

    }
  }
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
      position: relative;
      a {
        display: block;
        width: 100%;
        height: 100%;
        color: inherit;
      }
      &.active{
              i{
        position: absolute;
        top: 0;
        right:20px;
        width:5px;
        height:5px;
        border-radius: 50%;
        background:red;
        display:block;
      }
      }

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
