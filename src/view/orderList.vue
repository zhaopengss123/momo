<template>
  <div class="orderList">
    <van-nav-bar title="订单列表" left-arrow @click-left="$router.go(-1)" />
    <div class="list">
      <ul>
        <li v-for="(item,index) in tabData" :key="index" @click="handleEvaluate(item.code)">
          <van-cell style="border:none;" :title="`采购合同号：${ item.purchaseContractCode }`">
            <template #right-icon>
              <van-tag type="primary" v-if="item.evaluateStatus == 1" >已评价</van-tag>
              <van-tag type="primary" plain v-if="item.evaluateStatus == 2" >可评价</van-tag>
              <van-tag type="danger" v-if="item.evaluateStatus == 3" >不可评价</van-tag>

            </template>
          </van-cell>
          <!-- <div class="title">订单号：12343445</div> -->
          <div class="main">
            <div>品牌： {{ item.brandName }}</div>
            <div>品类： {{ item.categoryName }}</div>
          </div>
          <van-cell title="去评价" is-link />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "orderList",
  data() {
    return {
      tabData: [
        {
          orderId: 257070, // 订单id
          orderNumber: "SO2008251279", // 订单编号
          customerContractId: 1231551, //客户合同id
          purchaseContractCode: "cvv5657678798", //采购合同
          brandName: "顾家", // 品牌
          categoryName: "顾家", // 分类名称
          customerServiceId: null, // 回访id
          customerServiceStatus: null, // 回访状态
          installationOrderId: 1384, //安装订单id
          installationOrderStatus: "0", // 安装订单状态 0 未接单 1转单 2转单被拒 3未通知 4已通知为预约 5派单已撤销 6已预约待指派 7维修中或安装中 8汇报未完成 9汇报已完成 10回访中 11回访驳回 12已完成 13已预约未确定 14已指派待派单 15待安装
          evaluateStatus: 1, // 1 表示已评价   2 可评价   3  不可评价
        },
        {
          orderId: 257070, // 订单id
          orderNumber: "SO2008251279", // 订单编号
          customerContractId: 1231551, //客户合同id
          purchaseContractCode: "cvv5657678798", //采购合同
          brandName: "顾家", // 品牌
          categoryName: "顾家", // 分类名称
          customerServiceId: null, // 回访id
          customerServiceStatus: null, // 回访状态
          installationOrderId: 1384, //安装订单id
          installationOrderStatus: "0", // 安装订单状态 0 未接单 1转单 2转单被拒 3未通知 4已通知为预约 5派单已撤销 6已预约待指派 7维修中或安装中 8汇报未完成 9汇报已完成 10回访中 11回访驳回 12已完成 13已预约未确定 14已指派待派单 15待安装
          evaluateStatus: 2, // 1 表示已评价   2 可评价   3  不可评价
        },
        {
          orderId: 257070, // 订单id
          orderNumber: "SO2008251279", // 订单编号
          customerContractId: 1231551, //客户合同id
          purchaseContractCode: "cvv5657678798", //采购合同
          brandName: "顾家", // 品牌
          categoryName: "顾家", // 分类名称
          customerServiceId: null, // 回访id
          customerServiceStatus: null, // 回访状态
          installationOrderId: 1384, //安装订单id
          installationOrderStatus: "0", // 安装订单状态 0 未接单 1转单 2转单被拒 3未通知 4已通知为预约 5派单已撤销 6已预约待指派 7维修中或安装中 8汇报未完成 9汇报已完成 10回访中 11回访驳回 12已完成 13已预约未确定 14已指派待派单 15待安装
          evaluateStatus: 3, // 1 表示已评价   2 可评价   3  不可评价
        },
      ],
    };
  },
  methods: {
    handleEvaluate(code) {
      this.$router.push({ path: "/evaluate", query: { code } });
    },
    getData() {
      this.axios
        .get(
          `/api/app/orderEvaluater/evaluateOrderList?customerId=${this.$store.state.userInfo.customerId}`
        )
        .then((res) => {});
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.orderList {
  width: 100%;
  background: #fafafa;
  min-height: 100%;
  padding-bottom: 20px;
  .list {
    font-size: 14px;
    ul {
      li {
        display: block;
        width: 350px;
        margin: 0 auto;
        background: #fff;
        margin-top: 10px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 0px 10px #dcdcdc;
        .van-cell:not(:last-child)::after {
          border-bottom: none;
        }
        .main {
          height: 40px;
          line-height: 40px;
          color: #333;
          border-top: solid 1px #f0f0f0;
          border-bottom: solid 1px #f0f0f0;
          width: 316px;
          margin: 0 auto;
          div {
            float: left;
            &:nth-child(2) {
              float: right;
            }
          }
        }
      }
    }
  }
}
</style>
