<template>
  <div class="orderList">
    <van-nav-bar title="订单列表" left-arrow @click-left="$router.go(-1)" />
    <div class="list">
      <ul>
        <li v-for="(item,index) in tabData" :key="index" @click="handleEvaluate(item.code)">
          <van-cell style="border:none;" :title="`采购合同号：${ item.code }`">
            <template #right-icon>
              <van-tag type="success">已评价</van-tag>
              <!-- <van-tag type="danger">未评价</van-tag> -->
            </template>
          </van-cell>
          <!-- <div class="title">订单号：12343445</div> -->
          <div class="main">
            <div>品牌： {{ item.name }}</div>
            <div>品类： {{ item.name }}</div>
          </div>
          <van-cell title="去评价" is-link />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "orderList",
  data() {
    return {
      tabData: [
        {
          name: "顾家",
          code: "1234455",
        },
        {
          name: "顾家",
          code: "1234455",
        },
        {
          name: "顾家",
          code: "1234455",
        },
        {
          name: "顾家",
          code: "1234455",
        },
        {
          name: "顾家",
          code: "1234455",
        },
        {
          name: "顾家",
          code: "1234455",
        },
        {
          name: "顾家",
          code: "1234455",
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
        .get(`/api/app/order/evaluateOrderList?customerId=324806`, {
        })
        .then((res) => {
  
        });
    },
  },
  mounted() {
    this.getData()
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
