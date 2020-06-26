<template>
  <div class="detail">
    <van-nav-bar title="道具详情" left-arrow @click-left="backFun" />

    <div>
      <van-steps v-if="active != -10" :active="active" active-color="#e0305b">
        <van-step>待支付</van-step>
        <van-step>待发货</van-step>
        <van-step>待审核</van-step>
        <van-step>交易成功</van-step>
      </van-steps>
      <div class="header">
        <img :src="item.customerImgUrl || item.propsImgUlr" />
        <div class="list-text">
          <p>{{ item.propsName }}</p>
          <p>{{ item.titleDescribe }}</p>
          <p v-if="item.createTime">{{ item.createTime }} · 平台上传</p>
        </div>
        <div class="right-pirce">
          <p>¥{{ item.totalPrice }}</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <li>
            <p>订单详情</p>
          </li>
          <li v-if="item.orderStatus == 1">
            <span>支付剩余时间</span>
            <span>
              <b>{{ countDown.d }}</b>
              <b>天</b>
              <b>{{ countDown.h }}</b>
              <b>时</b>
              <b>{{ countDown.m }}</b>
              <b>分</b>
              <b>{{ countDown.s }}</b>
              <b>秒</b>
            </span>
          </li>
          <li v-if=" (item.orderStatus == 4 || item.orderStatus == 5)">
            <span>自动确认收货时间</span>
            <span>
              <b>{{ countDown.d }}</b>
              <b>天</b>
              <b>{{ countDown.h }}</b>
              <b>时</b>
              <b>{{ countDown.m }}</b>
              <b>分</b>
              <b>{{ countDown.s }}</b>
              <b>秒</b>
            </span>
          </li>
          <li v-if="item.orderStatus != 1">
            <span>订单号</span>
            <span>{{ item.orderNo }}</span>
          </li>
          <li
            v-if="item.roomNumber && ((releaseType == 1 && item.payStatus == 1) || releaseType == 0) "
          >
            <span>直播间号</span>
            <span>{{ item.roomNumber }}</span>
          </li>
          <li
            v-if="item.guestsName && ((releaseType == 1 && item.payStatus == 1) || releaseType == 0) "
          >
            <span>嘉宾</span>
            <span>{{ item.guestsName }}</span>
          </li>
          <li
            v-if="item.anchorName && ((releaseType == 1 && item.payStatus == 1) || releaseType == 0) "
          >
            <span>主播名</span>
            <span>{{ item.anchorName }}</span>
          </li>
          <li
            v-if="item.leavingMsg && ((releaseType == 1 && item.payStatus == 1) || releaseType == 0) "
          >
            <span>备注</span>
            <span></span>
          </li>

          <li
            style="height:auto;"
            v-if="item.leavingMsg && ((releaseType == 1 && item.payStatus == 1) || releaseType == 0) "
          >
            <span></span>
            <span
              style="text-align:left; float:left; line-height:20px; margin-bottom:15px;"
            >{{ item.leavingMsg }}</span>
          </li>
          <li v-if="item.payTime">
            <span>下单时间</span>
            <span>{{ item.payTime }}</span>
          </li>

          <li class="line" v-if=" ((releaseType == 1 && item.payStatus == 1) || releaseType == 0) ">
            <i></i>
          </li>
          <li
            v-if="item.deliveryTypeName && ((releaseType == 1 && item.payStatus == 1) || releaseType == 0) "
          >
            <span>配送方式</span>
            <span>{{ item.deliveryTypeName }}</span>
          </li>
          <li
            v-if="item.deliveryTime && ((releaseType == 1 && item.payStatus == 1) || releaseType == 0) "
          >
            <span>配送时间</span>
            <span>{{ item.deliveryTime }}</span>
          </li>

          <li class="line">
            <i></i>
          </li>
          <li>
            <span>单价</span>
            <span>{{ item.unitPrice }}</span>
          </li>
          <li>
            <span>购买数量</span>
            <span>{{ item.buyAmount }}</span>
          </li>
          <li>
            <span>总金额</span>
            <span>{{ item.totalPrice }}</span>
          </li>
          <li v-if="item.payPrice && item.orderStatus != 1">
            <span>支付金额</span>
            <span>{{ item.payPrice }}</span>
          </li>

          <li>
            <span>商品描述</span>
            <span></span>
          </li>
          <li style="height:auto;">
            <span></span>
            <span
              style="text-align:left; float:left; line-height:20px; margin-bottom:15px;"
            >{{ item.propsDescribe }}</span>
          </li>

          <li class="line" v-if="releaseType == 1 && item.releaseType == 1">
            <i></i>
          </li>
          <li v-if="releaseType == 1 && item.releaseType == 1">
            <span>保证金</span>
            <span>{{ item.cashDeposit }}</span>
          </li>
          <li v-if="releaseType == 1 && item.releaseType == 1">
            <span>服务费</span>
            <span>{{ item.serviceCharge }}</span>
          </li>

          <li class="line">
            <i></i>
          </li>
          <li v-if="item.startAppealTime">
            <span>申诉开始时间</span>
            <span>{{ item.startAppealTime }}</span>
          </li>
          <li v-if="item.endAppealTime">
            <span>申诉结算时间</span>
            <span>{{ item.endAppealTime }}</span>
          </li>
          <li v-if="item.appealExplain">
            <span>申诉原因</span>
            <span>{{ item.appealExplain }}</span>
          </li>

          <li v-if="(releaseType == 1 && item.orderStatus == 3) ">
            <span>发货名</span>
            <span>
              <input
                class="name-text"
                type="text"
                v-model="sendGoodsName"
                placeholder="请输入陌陌账号或者名字"
              />
            </span>
          </li>

          <li v-if="(releaseType == 1 && item.orderStatus == 3) ">
            <span>上传截图</span>
            <span></span>
          </li>
          <van-uploader
            v-if="(releaseType == 1 && item.orderStatus == 3) "
            v-model="fileList"
            multiple
            :max-count="4"
            :after-read="afterRead"
            :before-delete="delImg"
          />
          <li v-if="item.confirmTime">
            <span>交易状态</span>
            <span>交易成功</span>
          </li>

          <li v-if="releaseType == 1  &&  item.costSettlementTime">
            <span>结算时间</span>
            <span>{{ item.costSettlementTime }}</span>
          </li>
          <li v-if="releaseType == 1  && item.costSettlement">
            <span>结算金额</span>
            <span>{{ item.costSettlement }}</span>
          </li>

          <li
            v-if=" (item.orderStatus == 4 || item.orderStatus == 5 || item.orderStatus == 6 || item.orderStatus == 8 || item.orderStatus == 9 || item.orderStatus == 10)"
          >
            <span>发货名</span>
            <span>{{ item.sendGoodsName }}</span>
          </li>
          <li v-if="imgList.length">
            <span>发货截图</span>
            <span></span>
          </li>
        </ul>
      </div>
      <div class="list-img" v-if="imgList.length">
        <van-image
        v-for="(item,index) in imgList" :key="index"
        @click="openImg(item)"
          width="75px"
          height="75px"
          fit="cover"
          :src="item"
        />
      </div>
      <div
        class="submit-btn"
        @click="subPay"
        v-if=" (item.releaseType == 1 && releaseType == 0 && item.orderStatus == 1) || (item.releaseType == 0 && releaseType == 1 && item.orderStatus == 1)"
      >去支付</div>
      <div
        class="submit-btn"
        v-if="releaseType == 0 && (item.orderStatus == 4 || item.orderStatus == 5)"
        @click="submitReceive"
      >确认收货</div>

      <van-cell-group
        style="margin-top:20px"
        v-if="releaseType == 0 && (item.orderStatus == 4 || item.orderStatus == 5)"
      >
        <van-field v-model="msg" label="申诉原因" placeholder="请输入申诉原因" />
      </van-cell-group>
      <div
        class="submit-btn close-btn"
        @click="appeal"
        v-if="releaseType == 0 && (item.orderStatus == 4 || item.orderStatus == 5)"
      >订单申诉</div>
      <div
        class="submit-btn"
        v-if="(releaseType == 1 && item.orderStatus == 3) "
        @click="sendGoods()"
      >去发货</div>
      <div
        class="submit-btn close-btn"
        @click="dismount"
        v-if="releaseType == 1 && (item.orderStatus == 2 || item.orderStatus == 3 || item.orderStatus == 4 || item.orderStatus == 5 )"
      >取消订单</div>
    </div>
    
  </div>
</template>

<script>
// import $ from "jquery";
import {ImagePreview} from "vant";
import { TransfromDateTimes, getopenId } from "@/assets/utils";
export default {
  name: "Detail",
  data() {
    return {
      msg: null,
      item: {},
      imgList: [],
      fileList: [],
      sendGoodsName: "",
      releaseId: null,
      releaseType: null,
      orderStatus: null,
      active: 0,
      countDown: {},
      imgUrl: []
    };
  },
  methods: {
    openImg(url){
      ImagePreview([url]);
    },
    backFun() {
      this.$router.push({
        name: "ShopList",
        params: {
          releaseType: this.releaseType,
          orderStatus: this.orderStatus,
          titles: this.$route.params.titleText
        }
      });
    },
    delImg(file, state) {
      this.fileList.splice(state.index, 1);
      this.imgUrl.splice(state.index, 1);
    },
    afterRead(files) {
      let file = files.file;
      let param = new FormData();
      files.status = "uploading";
      files.message = "上传中...";
      param.append("file", file, file.name);
      param.append("openId", this.$store.state.openId);
      param.append("releasePropsId", this.item.propsOrderId);
      const that = this;
      $.ajax({
        url: "https://momoserver.beituokj.com/web/release/uploadImg",
        type: "post",
        data: param,
        contentType: false,
        processData: false,
        success: function(data) {
          if (data.returnCode == "SUCCESS") {
            files.status = "done";
            that.imgUrl.push(data.result.host + data.result.url);
          } else {
            files.status = "failed";
            file.message = "上传失败";
          }
        },
        error: function(data) {
          files.status = "failed";
          file.message = "上传失败";
        }
      });
    },

    // 确定申诉该订单
    appeal() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定申诉该订单？"
        })
        .then(() => {
          this.axios
            .post(`/propsOrder/appeal`, {
              msg: this.msg,
              propsOrderId: this.item.propsOrderId
            })
            .then(res => {
              if (res.data.returnCode == "SUCCESS") {
                this.$toast.success("提交成功！工作人员会尽快处理");
                setTimeout(() => {
                  this.$router.push({
                    name: "ShopList",
                    params: {
                      releaseType: this.releaseType,
                      orderStatus: this.orderStatus,
                      titles: this.$route.params.titleText
                    }
                  });
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
    getCountDown(endTime) {
      var surplus = parseInt((endTime - new Date().getTime()) / 1000);
      var d = Math.floor(surplus / (24 * 60 * 60)),
        h = Math.floor((surplus / (60 * 60)) % 24),
        m = Math.floor((surplus / 60) % 60),
        s = surplus % 60;
      let countDown = {
        d: d >= 0 ? d : 0,
        h: h >= 0 ? h : 0,
        m: m >= 0 ? m : 0,
        s: s >= 0 ? s : 0
      };
      this.countDown = countDown;
      s >= 0 && setTimeout(this.getCountDown, 1000, endTime);
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
              propsOrderId: this.item.propsOrderId,
              openId: this.$store.state.openId,
              imgUrl: this.imgUrl.join(","),
              sendGoodsName: this.sendGoodsName
            })
            .then(res => {
              if (res.data.returnCode == "SUCCESS") {
                this.$toast.success("操作成功");
                setTimeout(() => {
                  this.$router.push({
                    name: "ShopList",
                    params: {
                      releaseType: this.releaseType,
                      orderStatus: this.orderStatus,
                      titles: this.$route.params.titleText
                    }
                  });
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
          message: "确定取消该订单吗？"
        })
        .then(() => {
          this.axios
            .post(`/propsOrder/cancel/${this.item.propsOrderId}`)
            .then(res => {
              if (res.data.returnCode == "SUCCESS") {
                this.$toast.success("取消订单成功");
                setTimeout(() => {
                  this.$router.push({
                    name: "ShopList",
                    params: {
                      releaseType: this.releaseType,
                      orderStatus: this.orderStatus,
                      titles: this.$route.params.titleText
                    }
                  });
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

    subPay() {
      const that = this;
      this.axios
        .post(`/propsOrder/goPay/${this.item.propsOrderId}`)
        .then(res => {
          if (res.data.returnCode == "SUCCESS") {
            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId: res.data.result.appId, //公众号名称，由商户传入
                timeStamp: "" + res.data.result.timeStamp, //时间戳，自1970年以来的秒数
                nonceStr: res.data.result.nonceStr, //随机串
                package: res.data.result.packages,
                signType: res.data.result.signType, //微信签名方式：
                paySign: res.data.result.paySign //微信签名
              },
              function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  that.$router.push({ path: "/user" });
                }
              }
            );
          } else {
            this.$toast.fail(res.data.returnMsg);
          }
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
            .post(`/propsOrder/confirmGoods/${this.item.propsOrderId}`)
            .then(res => {
              if (res.data.returnCode == "SUCCESS") {
                this.$toast.success("操作成功");
                setTimeout(() => {
                  this.$router.push({
                    name: "ShopList",
                    params: {
                      releaseType: this.releaseType,
                      orderStatus: this.orderStatus,
                      titles: this.$route.params.titleText
                    }
                  });
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
    this.releaseType = this.$route.params.releaseType;
    this.orderStatus = this.$route.params.orderStatus;
    const releaseId = this.$route.params.releaseId;
    this.releaseId = releaseId;
    this.axios
      .post(`/user/orderInfoById`, {
        orderId: this.releaseId,
        releaseType: this.releaseType
      })
      .then(res => {
        if (res.data.returnCode == "SUCCESS") {
          this.item = res.data.result;
          this.imgList = res.data.result.sendGoodsImg
            ? res.data.result.sendGoodsImg.split(",")
            : [];
          if (this.item.orderStatus == 1 && this.item.payTimeOut) {
            let payTimeOut = this.item.payTimeOut.replace(/-/g, "/");
            payTimeOut = new Date(payTimeOut).getTime();

            this.getCountDown(payTimeOut);
          }

          if (
            (this.item.orderStatus == 4 || this.item.orderStatus == 5) &&
            this.item.confirmTimeOut
          ) {
            let confirmTimeOut = this.item.confirmTimeOut.replace(/-/g, "/");
            confirmTimeOut = new Date(confirmTimeOut).getTime();
            this.getCountDown(confirmTimeOut);
          }

          this.active =
            this.item.orderStatus == 1
              ? 0
              : this.item.orderStatus == 2 || this.item.orderStatus == 3
              ? 1
              : this.item.orderStatus == 4 || this.item.orderStatus == 5
              ? 2
              : this.item.orderStatus == 6
              ? 3
              : -1;
        }
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detail {
  .van-image{
    border: solid 1px #ccc;
    margin: 2px ;
  }
  .name-text {
    font-size: 15px;
    text-align: right;
    border: none;
    outline: none;
  }
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
        b {
          font-weight: normal;
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
      background: #ccc;
    }
  }
}
</style>
