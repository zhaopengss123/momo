<template>
  <div class="releaseInfo">
    <van-nav-bar left-arrow @click-left="backFun">
      <template #title>
        <ul class="nav-title-btn">
          <li :class="toggleIndex === 1 ? 'active' : ''" @click="toggleIndex = 1; getDList(1)">
            <span>我的售卖</span>
            <i></i>
          </li>
          <li :class="toggleIndex === 0 ? 'active' : ''" @click="toggleIndex = 0; getDList(0)">
            <span>我的求购</span>
            <i></i>
          </li>
        </ul>
      </template>
    </van-nav-bar>
    <div class="list-main">
      <ul>
        <li v-for="(item,index) in dataList" :key="index" @click="toDetail(item.releasePropsId)">
          <img :src="item.propsImgUrl" />
          <div class="list-text">
            <p>
              {{ item.titleDescribe }}
              <span v-if="item.releaseType == 1">售卖</span>
              <i v-if="item.releaseType == 0">求购</i>
            </p>
            <p>状态：{{ item.releaseStatus == 1 ? '已上架' : item.releaseStatus == 0 ? '已下架' : item.releaseStatus == 2 ? '待付款' : item.releaseStatus == 3 ? '交易关闭' : item.releaseStatus == 4 ? '待审核' : item.releaseStatus == 5 ? '审核通过' : item.releaseStatus == 6 ? '审核失败' : '--' }}</p>
            <p v-if="item.releaseStatus !=1">{{ item.closeName }}</p>
          </div>
          <div class="right-pirce">
            <p>库存{{ item.originalStock }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "ReleaseInfo",
  data() {
    return {
      toggleIndex: 1,
      dataList: []
    };
  },
  methods: {
    backFun() {
      this.$router.back(-1);
    },
    getDList(type) {
      this.axios
        .post(`/user/releaseInfo`, {
          type,
          openId: this.$store.state.openId,
          pageNo: 1,
          pageSize: 1000
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
      this.$router.push({ name: "ReleaseDetail", params: { releaseId } });
    }
  },
  mounted() {
    this.getDList(1);
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
        width: 200px;
        float: left;
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
