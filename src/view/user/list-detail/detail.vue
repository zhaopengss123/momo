<template>
  <div class="detail">
    <van-nav-bar title="道具详情" left-arrow @click-left="backFun" />
    <div>
      <div class="header">
        <img :src="item.customerImgUrl || item.propsImgUrl" />
        <div class="list-text">
          <p>{{ item.propsName }}</p>
          <p>{{ item.titleDescribe }}</p>
          <p v-if="item.createTime">{{ item.createTime }} · 平台上传</p>
        </div>
        <div class="right-pirce">
          <p>¥{{ item.unitPrice }}</p>
          <p>库存{{ item.originalStock }}</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <li>
            <p>订单详情</p>
          </li>
          <li>
            <span>道具类别</span>
            <span>{{ item.releaseType == 1 ? '售卖' : '求购' }}</span>
          </li>
          <li>
            <span>发布时间</span>
            <span>{{ item.createTime }}</span>
          </li>
          <li>
            <span>订单号</span>
            <span>{{ item.orderNo }}</span>
          </li>
          <li>
            <span>配送方式</span>
            <span>{{ item.deliveryTypeName }}</span>
          </li>
          <li>
            <span>商品描述</span>
            <span></span>
          </li>
          <li style="height:auto;"><span></span><span style="text-align:left; float:left; line-height:20px;">{{ item.propsDescribe }}</span></li>
          <li v-if="item.downShelfTime">
            <span>下架时间</span>
            <span>{{ item.downShelfTime }}</span>
          </li>
          <li class="line">
            <i></i>
          </li>
          <li>
            <span>剩余库存</span>
            <span>{{ item.dynamicStock }}</span>
          </li>
          <li class="line">
            <i></i>
          </li>
          <li>
            <span>单价</span>
            <span>{{ item.unitPrice }}</span>
          </li>
          <li v-if="item.releaseType == 1">
            <span>保证金</span>
            <span>{{ item.cashDeposit }}</span>
          </li>

          <li>
            <span>总金额</span>
            <span>{{ item.totalPrice }}</span>
          </li>
          <li>
            <span>支付金额</span>
            <span>{{ item.payPrice }}</span>
          </li>
          <li>
            <span>支付时间</span>
            <span>{{ item.payTime }}</span>
          </li>
          <li v-if="item.isSell == 0">
            <span>房间号</span>
            <span>{{ item.roomNumber }}</span>
          </li>
          <li v-if="item.isSell == 0">
            <span>主播名</span>
            <span>{{ item.guestsName }}</span>
          </li>
          <li v-if="item.isSell == 0">
            <span>嘉宾</span>
            <span>{{ item.anchorName }}</span>
          </li>

          <li v-if="item.releaseStatus == 0">
            <span>道具状态</span>
            <span>已下架</span>
          </li>
          <li v-if="item.releaseStatus !=1 && item.releaseStatus !=0">
            <span>原因</span>
            <span>{{ item.closeName }}</span>
          </li>
        </ul>
      </div>

      <div class="submit-btn" v-if="item.releaseStatus == 2">支付发布订单</div>
      <div class="submit-btn close-btn" @click="dismount" v-if="item.releaseStatus == 1 ">下架道具</div>
    </div>
  </div>
</template>

<script>
import { TransfromDateTimes, getopenId } from "@/assets/utils";
export default {
  name: "Detail",
  data() {
    return {
      item: {},
      imgList: [],
      fileList: [],
      sendGoodsName: ""
    };
  },
  methods: {
    backFun() {
      this.$router.back(-1);
    },
    sendGoods() {
      if (!this.sendGoodsName) {
        this.$toast.fail("请输入发货名");
        return false;
      }
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认发货？"
        })
        .then(() => {
          this.axios
            .post(`/propsOrder/sendGoods`, {
              propsOrderId: this.item.releasePropsId,
              openId: this.$store.state.openId,
              imgUrl: this.fileList.join(","),
              sendGoodsName: this.sendGoodsName
            })
            .then(res => {
              if (res.data.returnCode == "SUCCESS") {
                this.$toast.success("发货成功");
                setTimeout(() => {
                  this.$router.back(-1);
                }, 1500);
              } else {
                this.$toast.fail(res.data.returnMsg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    //下架道具
    dismount() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定下架该道具"
        })
        .then(() => {
          this.axios
            .post(`/release/dismount/${this.item.releasePropsId}`)
            .then(res => {
              if (res.data.returnCode == "SUCCESS") {
                this.$toast.success("下架成功");
                setTimeout(() => {
                  this.$router.back(-1);
                }, 1500);
              } else {
                this.$toast.fail(res.data.returnMsg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    submitReceive() {
      this.$dialog
        .confirm({
          title: "确认收货",
          message: "确认收货后货款会到对方账户，请仔细核对"
        })
        .then(() => {
          this.axios
            .post(`/propsOrder/confirmGoods/${this.item.releasePropsId}`)
            .then(res => {
              if (res.data.returnCode == "SUCCESS") {
                this.$toast.success("操作成功");
                setTimeout(() => {
                  this.$router.back(-1);
                }, 1500);
              } else {
                this.$toast.fail(res.data.returnMsg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  mounted() {
    const releaseId = this.$route.params.releaseId;
    this.axios.post(`/user/releaseInfoById/${releaseId}`).then(res => {
      if (res.data.returnCode == "SUCCESS") {
        this.item = res.data.result;
        this.imgList = res.data.result.releaseImg
          ? res.data.result.releaseImg.split(",")
          : [];
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detail {
  .list-img.list-img {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    img {
      width: 48%;
      height: auto;
      margin: 0 1%;
      margin-bottom: 10px;
      flex-grow: 1;
    }
  }
  & > div:nth-child(2) {
    overflow: hidden;
    padding-top: 19px;
    padding-bottom: 7px;
    width: 325px;
    overflow: hidden;
    margin: 0 auto;

    .header {
      padding: 3px 0;
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
    .list {
      overflow: hidden;
      clear: both;
      width: 100%;
      margin-top: 14px;
      li {
        width: 100%;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        &.line {
          height: 20px;
        }
        i {
          display: block;
          width: 100%;
          height: 1px;
          background: #eee;
          margin-top: 9px;
        }
        p {
          color: #101010;
          font-size: 16px;
          font-weight: bold;
        }
        span {
          float: left;
          font-size: 14px;
          color: #9b9b9b;
          &:nth-child(2) {
            float: right;
            color: #101010;
            text-align: right;
          }
          &:nth-child(1) {
          }
        }
      }
    }
  }
  .submit-btn {
    width: 325px;
    height: 54px;
    line-height: 54px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: bolder;
    background: linear-gradient(
      203deg,
      rgba(248, 131, 39, 1) 0%,
      rgba(224, 48, 91, 1) 100%
    );
    border-radius: 27px;
    margin-top: 15px;
    &.close-btn {
      background: #dbdbdf;
      color: #9096a9;
    }
  }
}
</style>
