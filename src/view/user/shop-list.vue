<template>
  <div class="releaseInfo">
    <van-nav-bar :title="titleText" left-arrow @click-left="backFun" />

    <div class="list-main">
      <ul>
        <li v-for="(item,index) in dataList" :key="index" @click="toDetail(item.propsOrderId)">
          <img @click="openImg(item.customerImgUrl)" :src="item.customerImgUrl || item.propsImgUlr" />
          <div class="list-text">
            <p>
              {{ item.propsName }}
              <span v-if="item.releaseType == 1">售卖</span>
              <i v-if="item.releaseType == 0">求购</i>
            </p>
            <p>{{ item.titleDescribe }}</p>
            <!-- <p>状态：{{ item.orderStatus == 1 ? '待付款' : item.orderStatus == 2 ? '已付款' : item.orderStatus == 3 ? '待发货' : item.orderStatus == 4 ? '已发货' : item.orderStatus == 5 ? '待确认' : item.orderStatus == 6 ? '交易成功' : item.orderStatus == 7 ? '交易关闭' :item.orderStatus == 8 ? '申诉中' :item.orderStatus == 9 ? '申诉成功' :item.orderStatus == 10 ? '申述失败' : '--' }}</p> -->
            <p>状态：{{ item.closeName }}</p>
          </div>
          <div class="right-pirce"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { setOpenId } from "@/assets/utils";
import { ImagePreview } from "vant";

export default {
  name: "ReleaseInfo",
  data() {
    return {
      toggleIndex: 1,
      dataList: [],
      titleText: this.$route.params.titles,
      releaseType: null,
      orderStatus: null
    };
  },
  methods: {
    openImg(url) {
      if (url) {
        ImagePreview([url]);
      }
    },
    backFun() {
      this.$router.push({ path: "/user" });
    },
    getDList() {
      this.axios
        .post(`/user/orderInfo`, {
          openId: this.$store.state.openId,
          releaseType: this.releaseType,
          orderStatus: this.orderStatus,
          pageNo: 1,
          pageSize: 10000
        })
        .then(res => {
          if (res.data.returnCode == "SUCCESS") {
            this.dataList = res.data.result;
          }
        })
        .catch(error => {
          //捕获失败
        });
    },
    toDetail(releaseId) {
      this.$router.push({
        name: "Buydetail",
        params: {
          releaseId,
          releaseType: this.releaseType,
          orderStatus: this.orderStatus,
          titleText: this.titleText
        }
      });
    }
  },
  mounted() {
    if (!setOpenId(this.$store.state.openId)) {
      return false;
    }
    this.releaseType = this.$route.params.releaseType;
    this.orderStatus = this.$route.params.orderStatus;
    this.getDList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.releaseInfo {
  .nav-title-btn {
    width: 300px;
    overflow: hidden;
    li {
      width: 100px;
      text-align: center;
      float: left;
      color: #9096a9;
      font-size: 14px;
      padding: 0 10px;
      font-weight: normal;
      &.active {
        color: #e53b33;
        font-size: 18px;
        i {
          width: 20px;
          height: 3px;
          background: #e53b33;
          display: block;
          margin: 0 auto;
          border-radius: 5px;
        }
      }
    }
  }
  .list-main {
    width: 325px;
    margin: 0 auto;
    ul > li {
      overflow: hidden;
      padding-top: 19px;
      padding-bottom: 7px;
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
        float: left;
        width: auto;
        margin-left: 10px;
        p:nth-child(1) {
          color: #101010;
          font-size: 16px;
          font-weight: bold;
          span {
            display: inline-block;
            width: 28px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-weight: normal;
            background: #fff0f0;
            color: #e53b33;
            font-size: 10px;
            margin-left: 10px;
          }
          i {
            display: inline-block;
            width: 28px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            font-weight: normal;
            background: rgba(255, 142, 57, 0.1);
            color: #ff8e39;
            font-style: normal;
            font-size: 10px;
            margin-left: 10px;
          }
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
          color: #9096a9;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
