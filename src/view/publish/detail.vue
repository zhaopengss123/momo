<template>
  <div class="detail">
    <van-nav-bar title="道具详情" left-arrow @click-left="backFun" />
    <div>
      <div class="header">
        <img :src="item.customerImgUrl || item.propsImg" />
        <div class="list-text">
          <p>{{ item.propsName }}</p>
          <p>{{ item.titleDescribe }}</p>
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
            <span>类型</span>
            <span>{{ item.releaseType == 1 ? '售卖' :'求购' }}</span>
          </li>
          <li>
            <span>单价</span>
            <span>{{ item.unitPrice }}</span>
          </li>
          <li>
            <span>配送方式</span>
            <span>{{ item.deliveryTypeName }}</span>
          </li>
          <li>
            <span>商品描述</span>
            <span></span>
          </li>
          <li v-if="item.propsDescribe">
            <span></span>
            <span style="text-align:left; float:left; line-height:20px;">{{ item.propsDescribe }}</span>            
          </li>
        </ul>
      </div>
      <div class="submit-btn" @click="sbumitsBtn()">{{ item.releaseType == 1 ? '购买' : '售卖' }}</div>
    </div>
    <!-- 购买 -->
    <van-popup
      v-model="showPop"
      position="bottom"
      :style="{ height: 'auto',paddingTop:'10px',paddingBottom: '10px' }"
    >
      <van-form @submit="onSubmit">
        <van-field name="stepper" label="售卖数量">
          <template #input>
            <van-stepper v-model="stock" min="1" :max="item.stock" integer />
          </template>
        </van-field>
        <van-field
          v-model="form1.roomNumber"
          type="number"
          name="直播间号"
          label="直播间号"
          placeholder="直播间号"
          :rules="[{ required: true, message: '请填写直播间号' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="form1.guestsName"
          label="嘉宾"
          placeholder="点击选择嘉宾"
          @click="showguestsPicker = true"
        />
        <van-field v-model="form1.anchorName" name="主播姓名" label="主播姓名" placeholder="主播姓名" />
        <van-field
          readonly
          clickable
          name="picker"
          :value="form1.deliveryTypeName"
          label="配送方式"
          placeholder="点击选择配送方式"
          @click="showPicker = true"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="form1.distributionTime"
          label="配送时间"
          placeholder="点击选择配送时间"
          @click="showPickertime1 = true"
        />
        <van-field v-model="leavingMsg" name="leavingMsg" label="备注" placeholder="备注" />

        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>
    <!-- 售卖 -->
    <van-popup
      v-model="showPop2"
      position="bottom"
      :style="{ height: 'auto',paddingTop:'10px',paddingBottom: '10px' }"
    >
      <van-form @submit="onSubmit2">
        <van-field name="stepper" label="数量">
          <template #input>
            <van-stepper v-model="stock" min="1" :max="item.stock" integer />
          </template>
        </van-field>

        <van-field v-model="leavingMsg" name="leavingMsg" label="备注" placeholder="备注" />
        

        <div style="margin: 16px;">
          <div class="resu">*注：售卖商品需要缴纳少量的保证金</div>
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-popup>

    <van-popup v-model="showPickertime1" position="bottom">
      <van-datetime-picker
        @confirm="changeDateTime()"
        @cancel="showPickertime1 = false"
        v-model="distributionTime"
        type="datetime"
        title="选择配送时间"
      />
    </van-popup>

    <van-popup v-model="showguestsPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="guestsList"
        @confirm="onConfirmGuests"
        @cancel="showguestsPicker = false"
      />
    </van-popup>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="deliveryList"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { TransfromDateTimes, getopenId } from "@/assets/utils";
export default {
  name: "Detail",
  data() {
    return {
      item: {},
      showPop: false,
      stock: 1,
      leavingMsg: "",
      releaseType: 0,
      showguestsPicker: false,
      showPickertime1: false,
      showPop2: false,
      deliveryList: [],
      distributionTime: new Date(),
      guestsList: [],
      showPicker: false,
      form1: {
        roomNumber: null,
        guestsId: null,
        anchorName: null,
        distributionTime: TransfromDateTimes(),
        deliveryTypeId: null,
        deliveryTypeName: null
      }
    };
  },
  methods: {
    getDelivery() {
      this.axios.post(`/delivery/all`).then(res => {
        if (res.data.returnCode == "SUCCESS") {
          let deliveryList = [];
          res.data.result.map(item => {
            item.value = item.id;
            item.text = item.name;
            deliveryList.push(item);
          });
          this.deliveryList = deliveryList;
        }
      });
    },
    onConfirm(val) {
      this.form1.deliveryTypeId = val.id;
      this.form1.deliveryTypeName = val.name;
      this.showPicker = false;
    },
    onConfirmGuests(val) {
      this.form1.guestsId = val.id;
      this.form1.guestsName = val.text;
      this.showguestsPicker = false;
    },
    changeDateTime() {
      this.form1.distributionTime = TransfromDateTimes(this.distributionTime);
      this.showPickertime1 = false;
    },
    sbumitsBtn() {
      if (this.releaseType == 0) {
        this.showPop2 = true;
      } else {
        this.showPop = true;
      }
    },
    backFun() {
      this.$router.back(-1);
    },

    onSubmit() {
      const that = this;
      this.axios
        .post(`/propsOrder/buy`, {
          roomNumber: this.form1.roomNumber,
          guestsId: this.form1.guestsId,
          anchorName: this.form1.anchorName,
          deliveryTime: this.form1.distributionTime,
          releasePropsId: this.item.releaseId,
          userOpenId: this.$store.state.openId,
          deliveryTypeId: this.form1.deliveryTypeId,
          stock: this.stock,
          leavingMsg: this.leavingMsg,
          sceneInfo:
            "{'h5_info':{'wap_url:'wx.beibeiyue.com','type':'Wap','wap_name':'充值支付'}}"
        })
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
            this.$dialog({ message: res.data.returnMsg });
          }
        });
    },

    onSubmit2() {
      const that = this;
      this.axios
        .post(`/propsOrder/sell`, {
          releasePropsId: this.item.releaseId,
          userOpenId: this.$store.state.openId,
          stock: this.stock,
          leavingMsg: this.leavingMsg,
          sceneInfo:
            "{'h5_info':{'wap_url:'wx.beibeiyue.com','type':'Wap','wap_name':'充值支付'}}"
        })
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
            this.$dialog({ message: res.data.returnMsg });
          }
        });
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.releaseType = this.$route.params.releaseType;
    this.axios.post(`/release/info/${id}`).then(res => {
      if (res.data.returnCode == "SUCCESS") {
        this.item = res.data.result;
      }
    });
    this.getDelivery();
    this.axios.post(`/guestsInfo/all`).then(res => {
      if (res.data.returnCode == "SUCCESS") {
        let guestsList = [];
        res.data.result.map(item => {
          item.value = item.id;
          item.text = item.guestsName;
          guestsList.push(item);
        });
        this.guestsList = guestsList;
      }
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detail {
  .resu{
    color: red;
    font-size: 12px;
    margin-bottom: 20px;
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
        height: 47px;
        line-height: 47px;
        span {
          float: left;
          font-size: 16px;
          &:nth-child(2) {
            float: right;
            text-align: right;
          }
          &:nth-child(1) {
            font-weight: bold;
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
  }
}
</style>
