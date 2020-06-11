<template>
  <div class="index">
    <van-nav-bar left-arrow @click-left="backFun">
      <template #title>
        <ul class="nav-title-btn">
          <li :class="toggleIndex === 1 ? 'active' : ''" @click="toggleIndex = 1; getDList(1)">
            <span>我要买</span>
            <i></i>
          </li>
          <li :class="toggleIndex === 2 ? 'active' : ''" @click="toggleIndex = 2; getDList(2)">
            <span>我要卖</span>
            <i></i>
          </li>
        </ul>
      </template>
    </van-nav-bar>
    <div class="main">
      <div class="list topList">
        <ul>
          <li>
            <div>选择道具</div>
            <div>
              <input class="top-input" type="text" placeholder="输入关键字搜索" />
              <img hidden src="../../assets/seach.png" alt />
            </div>
          </li>
        </ul>
      </div>
      <div class="commodity-list">
        <div
          :class="selectClass.id == item.id ? 'active' : '' "
          @click="selectFun(item)"
          v-for="(item,index) in commodityList"
          :key="index"
        >
          <img :src="item.imgUrl" alt srcset />
        </div>
      </div>
    </div>
    <div class="form1" v-if="toggleIndex === 1">
      <van-form @submit="onSubmit1">
        <van-field readonly v-model="selectClass.name" name="道具名" label="道具名" placeholder="请选择道具" />
         <van-field
          v-model="form1.titleDescribe"
          name="标题描述"
          label="标题描述"
          placeholder="标题描述"
          :rules="[{ required: true, message: '请填写标题描述' }]"
        />
        <van-field
          v-model="form1.roomNumber"
          type="number"
          name="直播间号"
          label="直播间号"
          placeholder="直播间号"
          :rules="[{ required: true, message: '请填写直播间号' }]"
        />
        <van-field
          v-model="form1.anchorName"
          name="主播姓名"
          label="主播姓名"
          placeholder="主播姓名"
          :rules="[{ required: true, message: '请填写主播姓名' }]"
        />
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
          :value="form1.distributionTimeName"
          label="配送时间"
          placeholder="点击选择配送时间"
          @click="showPickertime1 = true"
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
        <van-field
          v-model="form1.unitPrice"
          type="number"
          name="道具单价"
          label="道具单价"
          placeholder="道具单价"
          :rules="[{ required: true, message: '请填写道具单价' }]"
        />
        <van-field
          v-model="form1.stock"
          type="number"
          name="数量"
          label="数量"
          placeholder="数量"
          :rules="[{ required: true, message: '请填写数量' }]"
        />
        <van-field
          v-model="form1.describe"
          name="道具描述"
          label="道具描述"
          placeholder="道具描述"
          :rules="[{ required: true, message: '请填写道具描述' }]"
        />
        <div style="margin: 16px;">
          <van-button class="sbtn" round block type="info" :loading="subLoading" native-type="submit">发布</van-button>
        </div>
      </van-form>
    </div>

    <div class="form2" v-if="toggleIndex === 2">
      <van-form @submit="onSubmit2">
        <van-field readonly v-model="selectClass.name" name="道具名" label="道具名" placeholder="请选择道具" />
        <van-field
          v-model="form2.titleDescribe"
          name="标题描述"
          label="标题描述"
          placeholder="标题描述"
          :rules="[{ required: true, message: '请填写标题描述' }]"
        />
        <van-field
          v-model="form2.anchorName"
          name="主播姓名"
          label="主播姓名"
          placeholder="主播姓名"
          :rules="[{ required: true, message: '请填写主播姓名' }]"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="form2.deliveryTypeName"
          label="配送方式"
          placeholder="点击选择配送方式"
          @click="showPicker1 = true"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="form2.guestsName"
          label="嘉宾"
          placeholder="点击选择嘉宾"
          @click="showguestsPicker1 = true"
        />

        
        <van-field
          v-model="form2.unitPrice"
          type="number"
          name="道具单价"
          label="道具单价"
          placeholder="道具单价"
          :rules="[{ required: true, message: '请填写道具单价' }]"
        />
        <van-field
          v-model="form2.stock"
          type="number"
          name="数量"
          label="数量"
          placeholder="数量"
          :rules="[{ required: true, message: '请填写数量' }]"
        />
        <van-field
          v-model="form2.describe"
          name="道具描述"
          label="道具描述"
          placeholder="道具描述"
          :rules="[{ required: true, message: '请填写道具描述' }]"
        />
        <div style="margin: 16px;">
          <van-button class="sbtn" round block type="info" :loading="subLoading" native-type="submit">发布</van-button>
        </div>
      </van-form>
    </div>


    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="deliveryList"
        @confirm="onConfirm"
        @cancel="showPicker = false"
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
        <van-popup v-model="showguestsPicker1" position="bottom">
      <van-picker
        show-toolbar
        :columns="guestsList"
        @confirm="onConfirmGuests1"
        @cancel="showguestsPicker1 = false"
      />
    </van-popup>

        <van-popup v-model="showPicker1" position="bottom">
      <van-picker
        show-toolbar
        :columns="deliveryList"
        @confirm="onConfirm1"
        @cancel="showPicker1 = false"
      />
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


  </div>
</template>

<script>
import { TransfromDateTimes } from '@/assets/utils';
export default {
  name: "Index",
  data() {
    return {
      distributionTime: new Date(),
      subLoading: false,
      toggleIndex: 1,
      commodityList: [],
      parescommodityList: [],
      selectClass: {},
      showPicker: false,
      showPicker1: false,
      showguestsPicker: false,
      showguestsPicker1: false,
      deliveryList: [],
      guestsList: [],
      totalMoney: 0,
      showPickertime1: false,
      form1: {
        deliveryTypeId: null,
        deliveryTypeName: null,
        describe: "",
        roomNumber: null,
        anchorName: null,
        unitPrice: null,
        stock: null,
        describe: null,
        titleDescribe: null,
        guestsId: 1,
        guestsName: '主持人/主播',
        distributionTime:  TransfromDateTimes()
      },
      form2: {
        deliveryTypeId: null,
        deliveryTypeName: null,
        describe: "",
        roomNumber: null,
        anchorName: null,
        unitPrice: null,
        titleDescribe: "",
        stock: null,
        describe: null,
        guestsId: 1,
        guestsName: '主持人/主播',
        distributionTime: TransfromDateTimes()
      },
      sceneInfo: `{"h5_info”:{"wap_url”:"https://momo.beituokj.com”,”type”:”Wap”,”wap_name”:”充值支付”}}`
    };
  },
  methods: {

    onConfirm(val) {
      this.form1.deliveryTypeId = val.id;
      this.form1.deliveryTypeName = val.name;
      this.showPicker = false;
    },
    onConfirm1(val) {
      this.form2.deliveryTypeId = val.id;
      this.form2.deliveryTypeName = val.name;
      this.showPicker1 = false;
    },
    onConfirmGuests(val){
      this.form1.guestsId = val.id;
      this.form1.guestsName = val.text;
      this.showguestsPicker = false;
    },
    onConfirmGuests1(val){
      this.form2.guestsId = val.id;
      this.form2.guestsName = val.text;
      this.showguestsPicker1 = false;
    },
    changeDateTime(){
      this.form1.distributionTime = this.distributionTime;
      this.form1.distributionTimeName = TransfromDateTimes(this.distributionTime);
      this.showPickertime1 = false;
    },
    // 求购发布
    onSubmit1() {
      this.subLoading = true;
      this.axios
        .post(`/release/buy`, {
          propsConfigId: this.selectClass.id,
          roomNumber: this.form1.roomNumber,
          anchorName: this.form1.anchorName,
          deliveryTypeId: this.form1.deliveryTypeId,
          unitPrice: this.form1.unitPrice,
          guestsId: this.form1.guestsId,
          stock: this.form1.stock,
          describe: this.form1.describe,
          openId: this.$store.state.openId,
          titleDescribe: this.form1.titleDescribe,
          sceneInfo: this.sceneInfo,
          distributionTime: this.form1.distributionTime
        })
        .then(res => {
          this.subLoading = false;
          if (res.data.returnCode == "SUCCESS") {
            Dialog({ message: "操作成功" });
            setTimeout(res => {
              this.$router.push({ path: "/" });
              done();
            }, 1000);
          } else {
            Dialog({ message: res.data.returnMsg });
          }
        })
        .catch(error => {
          this.subLoading = false;
        });
    },

    // 售卖发布
    onSubmit2() {
      this.subLoading = true;
      this.axios
        .post(`/release/sell`, {
          propsConfigId: this.selectClass.id,
          roomNumber: this.form2.roomNumber,
          anchorName: this.form2.anchorName,
          deliveryTypeId: this.form2.deliveryTypeId,
          guestsId: this.form2.guestsId,
          unitPrice: this.form2.unitPrice,
          stock: this.form2.stock,
          describe: this.form2.describe,
          openId: this.$store.state.openId
        })
        .then(res => {
          this.subLoading = false;
          if (res.data.returnCode == "SUCCESS") {
            Dialog({ message: "操作成功" });
            setTimeout(res => {
              this.$router.push({ path: "/" });
              done();
            }, 1000);
          } else {
            Dialog({ message: res.data.returnMsg });
          }
        })
        .catch(error => {
          this.subLoading = false;
        });
    },
    backFun() {
      this.$router.back(-1);
    },
    getDList(number) {
      this.axios
        .post(`/props/all/${number}`)
        .then(res => {
          if (res.data.returnCode == "SUCCESS") {
            this.commodityList = res.data.result || [];
            this.parescommodityList = res.data.result;
          }
        })
        .catch(error => {
          //捕获失败
        });
    },
    selectFun(item) {
      this.selectClass = item;
    },
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
    }
  },
  mounted() {
    this.getDList(1);
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
.index {
  .sbtn {
    background: linear-gradient(
      203deg,
      rgba(248, 131, 39, 1) 0%,
      rgba(224, 48, 91, 1) 100%
    );
    color: #fff;
    border: none;
  }
  .selectPicker {
    width: 100%;
    height: 260px;
    position: fixed;
    bottom: 0;
    left: 0;
    box-shadow: 0px 0px 15px #333;
  }
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
  .main {
    width: 325px;
    margin: 0 auto;
    margin-top: 10px;
    .list ul li {
      height: 47px;
      line-height: 47px;
      color: #101010;
      font-size: 16px;
      font-weight: bold;
      overflow: hidden;
      div {
        width: 50%;
      }
      div:nth-child(1) {
        float: left;
      }
      div:nth-child(2) {
        float: right;
        text-align: right;
        img {
          width: 14px;
          float: right;
          margin-top: 16.5px;
        }
        input {
          border: none;
          height: 47px;
          line-height: 47px;
          text-align: right;
          width: 100%;
          &.top-input {
            width: 150px;
            float: right;
            text-align: left;
            border: solid 1px #ccc;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            border-radius: 20px;
            text-indent: 10px;
            background: url("../../assets/seach.png") no-repeat 130px center;
            background-size: 14px auto;
            margin-top: 8.5px;
          }
        }
      }
    }
    .commodity-list {
      width: 100%;
      overflow: hidden;
      div {
        width: 54px;
        height: 54px;
        float: left;
        border-radius: 12px;
        border: solid 1px #ccc;
        overflow: hidden;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-child(5n) {
          margin-right: 0;
        }
        &.active {
          border: solid 1px #f88327;
          box-shadow: 0px 0px 5px #f88327;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .commodity-detail {
      .list {
        li {
          div:nth-child(2) {
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
