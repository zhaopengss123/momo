<template>
  <div class="list">
    <div class="list-nav">
      <van-dropdown-menu>
        <van-dropdown-item v-model="sort" @change="reset" :options="option1" />
        <van-dropdown-item title="筛选" ref="item">
                <van-dropdown-menu>
                    <van-dropdown-item v-model="starlight" :options="starlightList" />
                    <van-dropdown-item title="筛选" ref="item">
                    <van-button block type="info" @click="reset">确认</van-button>
                    </van-dropdown-item>
                </van-dropdown-menu>
          <van-switch-cell title="包邮" />
          <van-switch-cell  title="团购" />
          <van-button block type="info" @click="reset">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="list-main">
      <ul>
        <li v-for="(item,index) in dataList" :key="index">
          <img :src="item.propsImg" />
          <div class="list-text">
            <p>{{ item.name }}</p>
            <!-- <p>最酷炫的道具之一</p> -->
            <p v-if="item.createTime">{{ item.createTime }} · 平台上传</p>
          </div>
          <div class="right-pirce">
            <p>¥{{ item.unitPrice }}</p>
            <p>库存{{ item.stock }}</p>
          </div>
        </li>
      </ul>
    </div>
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
      default: ""
    }
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 20,
      dataList: [],
      starlightList:[{ text:'默认星光',value: null }],
      pages: 1,
      sort: null,
      value2: "a",
      starlight: null,
      option1: [
        { text: "默认排序", value: null },
        { text: "最新发布", value: 1 },
        { text: "价格从低到高", value: 2 },
        { text: "价格从高到低", value: 3 }
      ]
    };
  },
  methods: {
    getData(pageNo = this.pageNo) {
      this.axios
        .post("release/search", {
          pageNo: pageNo,
          pageSize: this.pageSize,
          propsName: this.propsName,
          starlight: this.starlight,
          sort: this.sort
        })
        .then(res => {
          this.pages = res.data.result.length ? this.pages + 1 : this.pages;
          if (res.data.result.length) {
            const list = JSON.parse(JSON.stringify(this.dataList));
            this.dataList = [...list, ...res.data.result];
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
    reset(){
        this.getData(1);
        this.pageNo = 1;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.load);
   this.axios.post("props/starlight/all").then(res =>{
       const list = res.data.result;
       list.map((item,index)=>{
           const j = {
               text: item,
               value: item
           }
          this.starlightList.push(j);
       })
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