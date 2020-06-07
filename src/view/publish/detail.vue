<template>
  <div class="detail">
    <van-nav-bar title="道具详情" left-arrow @click-left="backFun" />
    <div>
      <div class="header">
      <img :src="item.propsImg" />
      <div class="list-text">
        <p>{{ item.name }}</p>
        <!-- <p>最酷炫的道具之一</p> -->
        <p v-if="item.createTime">{{ item.createTime }} · 平台上传</p>
      </div>
      <div class="right-pirce">
        <p>¥{{ item.unitPrice }}</p>
        <p>库存{{ item.stock }}</p>
      </div>
      </div>
      <div class="list">
        <ul>
          <li>
            <span>截止时间</span>
            <span></span>
          </li>
          <li>
            <span>求购金额</span>
            <span>{{ item.unitPrice }}/份</span>
          </li>
          <li>
            <span>数量</span>
            <span>{{ item.stock }}</span>
          </li>
          <li>
            <span>合计金额</span>
            <span>{{ item.unitPrice*item.stock }}元</span>
          </li>
        </ul>
      
    </div>
    <div class="submit-btn">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      item: {}
    };
  },
  methods: {
    backFun() {
      this.$router.back(-1);
    }
  },
  mounted() {
    this.item = JSON.parse(this.$route.params.items);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detail {
  & > div:nth-child(2) {
    overflow: hidden;
    padding-top: 19px;
    padding-bottom: 7px;
    width: 325px;
    overflow: hidden;
    margin: 0 auto;
    .header{
      overflow: hidden;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      box-shadow: 0px 0px 5px #ccc;
      float: left;
      margin-left: 5px;
    }
    .list-text {
      color: #9096a9;
      font-size: 12px;
      width: 200px;
      float: left;
      margin-left: 10px;
      p:nth-child(1) {
        color: #101010;
        font-size: 16px;
        font-weight: bold;
      }
      p:nth-child(3) {
        color: #4a4a4a;
        margin-top: 6px;
      }
    }
    .right-pirce {
      float: right;
      text-align: right;
      p:nth-child(1) {
        color: #e53b33;
        font-size: 16px;
        font-weight: bold;
        margin-top: 15px;
      }
      p:nth-child(2) {
        color: #9096a9;
        font-size: 12px;
      }
    }
    .list{
      overflow: hidden;
      clear: both;
      width: 100%;
      margin-top: 14px;
      li{
        width: 100%;
        height: 47px;
        line-height: 47px;
        span{
          float: left;
          font-size: 16px;
          &:nth-child(2){
            float: right;
            text-align: right;
          }
          &:nth-child(1){
            font-weight: bold;
          }
        }
      }
    }
  }
  .submit-btn{
    width: 325px;
    height: 54px;
    line-height: 54px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: bolder;
    background:linear-gradient(203deg,rgba(248,131,39,1) 0%,rgba(224,48,91,1) 100%);
    border-radius:27px;
    margin-top: 15px;
  }
}
</style>
