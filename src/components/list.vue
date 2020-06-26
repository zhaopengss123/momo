<template>
  <div class="list">
    <div class="list-nav">
      <van-dropdown-menu>
        <van-dropdown-item v-model="sort" @change="reset" :options="option1" />
        <van-dropdown-item title="筛选" ref="item">
          <van-field type="number" v-model="unitPrice" label="单价" placeholder="请输入单价" />
          <van-dropdown-menu>
            <van-dropdown-item v-model="deliveryId" get-container="body" :options="deliveryList" />
          </van-dropdown-menu>
          <van-dropdown-menu>
            <van-dropdown-item v-model="starlight" get-container="body" :options="starlightList" />
          </van-dropdown-menu>
          <van-dropdown-menu>
            <van-dropdown-item v-model="privilege" get-container="body" :options="privilegeList" />
          </van-dropdown-menu>

          <van-button block type="info" @click="reset1">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="list-main">
        <ul>
          <li
            v-for="(item,index) in dataList"
            :key="index"
            @click="toDetail(item.id,item.releaseType)"
          >
            <img :src="item.customerImgUrl || item.propsImg" />
            <div class="list-text">
              <p>
                {{ item.name }}
                <span v-if="item.releaseType == 1">售卖</span>
                <i v-if="item.releaseType == 0">求购</i>
              </p>
              <p>{{ item.titleDescribe }}</p>
              <p v-if="item.createTime">{{ item.createTime }}</p>
            </div>
            <div class="right-pirce">
              <p>¥{{ item.unitPrice }}</p>
              <p>库存{{ item.stock }}</p>
            </div>
          </li>
        </ul>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  getScrollHeight,
  getScrollTop,
  getWindowHeight
} from "../utils/screen";
export default {
  name: "List",
  props: {
    propsName: {
      type: String,
      default: null
    },
    isSell: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      dataList: [],
      starlightList: [{ text: "不限星光", value: null }],
      pages: 1,
      unitPrice: null,
      sort: null,
      value2: "a",
      starlight: null,
      privilege: null,
      deliveryId: null,
      privilegeList: [
        {
          text: "不限权限",
          value: null
        },
        {
          text: "特权",
          value: 1
        },
        {
          text: "非特权",
          value: 0
        }
      ],
      option1: [
        { text: "默认排序", value: null },
        { text: "最新发布", value: 1 },
        { text: "价格从低到高", value: 2 },
        { text: "价格从高到低", value: 3 }
      ],
      deliveryList: [
        {
          text: "不限制配送方式",
          value: null
        }
      ],
      isLoading: false
    };
  },
  methods: {
    onRefresh() {
      this.getData(1);
      this.pageNo = 1;
    },
    toDetail(id, releaseType) {
      this.$router.push({
        name: "Publishdetail",
        params: { id: id, releaseType: releaseType }
      });
    },
    getData(pageNo = this.pageNo, propsName, isseach = false) {
      let pageNos = pageNo;
      this.axios
        .post("release/search", {
          pageNo: pageNo,
          pageSize: this.pageSize,
          propsName: !propsName && !isseach ? this.propsName : propsName,
          starlight: this.starlight,
          sort: this.sort,
          isSell: this.isSell,
          privilege: this.privilege,
          deliveryId: this.deliveryId,
          unitPrice: this.unitPrice
        })
        .then(res => {
          this.isLoading = false;
          this.pages = res.data.result.length ? this.pages + 1 : this.pages;
          if (pageNos != 1) {
            if (res.data.result.length) {
              const list = JSON.parse(JSON.stringify(this.dataList));
              this.dataList = [...list, ...res.data.result];
            }
          } else {
            this.dataList = res.data.result;
          }
        })
        .catch(error => {
          //捕获失败
        });
    },
    //无限滚动加载
    load() {
      let vm = this;
      if (getScrollTop() + getWindowHeight() >= getScrollHeight()) {
        if (vm.pageNo < vm.pages) {
          //先判断下一页是否有数据
          vm.pageNo += 1; //查询条件的页码+1
          vm.getData(); //拉取接口数据
        } else {
          //到底了
        }
      }
    },
    reset1() {
      this.$refs.item.toggle();
      this.reset();
    },
    reset() {
      this.getData(1);
      this.pageNo = 1;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.load);
    this.axios.post("props/starlight/all").then(res => {
      const list = res.data.result;
      list.map((item, index) => {
        const j = {
          text: "星光：" + item,
          value: item
        };
        this.starlightList.push(j);
      });
    });
    this.axios.post("delivery/all").then(res => {
      const list = res.data.result;
      list.map((item, index) => {
        const j = {
          text: "配送方式：" + item.name,
          value: item.id
        };
        this.deliveryList.push(j);
      });
    });

    this.getData();
  },
  destroyed() {
    window.removeEventListener("scroll", this.load, false);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list {
  width: 325px;
  overflow: hidden;
  margin: 0 auto;
  .list-nav {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #101010;
    font-size: 14px;
    border-bottom: solid 1px #eeeeee;
    ul {
      display: flex;
      width: 100%;
      justify-content: space-between;
      li {
        flex-direction: column;
        padding: 0 17px;
        background-image: url("../assets/top-jt.png");
        background-size: 8px auto;
        background-position: right center;
        background-repeat: no-repeat;
      }
    }
  }
  .van-pull-refresh__track.van-pull-refresh__track {
    overflow: hidden;
  }
  .list-main {
    width: 100%;

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
    }
  }
}
</style>