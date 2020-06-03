<template>
  <div class="index">
    <van-nav-bar  left-arrow @click-left="backFun">
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
                    <img hidden src="../../assets/seach.png" alt=""></div>
                </li>
              </ul>
          </div>
          <div class="commodity-list">
              <div :class="selectClass.id == item.id ? 'active' : '' " @click="selectFun(item)" v-for="(item,index) in commodityList" :key="index">
                  <img :src="item.imgUrl" alt="" srcset="">
              </div>
          </div>
          <div class="commodity-detail">
            <div class="list">
              <ul>
                <li>
                  <div>选择道具</div>
                  <div>{{ selectClass.name }}</div>
                </li>
                <li>
                  <div>选择道具</div>
                  <div>{{ selectClass.name }}</div>
                </li>
                 <li>
                  <div>标题描述</div>
                  <div><input maxlength="30" type="text" placeholder="请输入"></div>
                </li>
                 <li>
                  <div>直播间号</div>
                  <div><input type="text" placeholder="请输入"></div>
                </li>
                <li>
                  <div>主播姓名</div>
                  <div><input maxlength="20" type="text" placeholder="请输入"></div>
                </li>
                <li style="padding:10px 0;">
                  <div>配送时间</div>
                  <div>
                    <van-dropdown-menu style="width:100px; float:right; margin-right:2px;">
                         <van-dropdown-item v-model="form1.deliveryTypeId" @change="reset" :options="deliveryList" />
                    </van-dropdown-menu>    
                  </div>
                </li>
                 <li>
                  <div>求购金额(单价/份)</div>
                  <div><input type="number" placeholder="请输入"></div>
                </li>
                <li>
                  <div>数量</div>
                  <div><input type="number" placeholder="请输入"></div>
                </li>
                <li>
                  <div>合计金额</div>
                  <div></div>
                </li>       
              </ul>
          </div>
          </div>
      </div>
         
     </div>

</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      toggleIndex: 1,
      commodityList: [],
      parescommodityList: [],
      selectClass: {},
      showPicker: false,
      deliveryList: [],
      form1:{
        deliveryTypeId: null
      }
    };
  },
  methods: {
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
    getDelivery(){
         this.axios.post(`/delivery/all`).then(res => {
          if (res.data.returnCode == "SUCCESS") {
              let deliveryList = [{
                text: '请选择',
                value: null
              }];
              res.data.result.map(item=>{
                item.value = item.id;
                item.text = item.name;
                deliveryList.push(item);
              })
              this.deliveryList = deliveryList;
          }
        })
        .catch(error => {
          //捕获失败
        });

    }
    
  },
  mounted() {
    this.getDList(1);
    this.getDelivery();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index {
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
