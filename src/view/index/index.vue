<template>
  <div class="index">
    <van-nav-bar title="陌陌道具城" />
    <div class="seach">
      <input type="text" v-model="propsName" placeholder="输入关键字" />
    </div>
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in bannerList" :key="index">
          <a :href="image.clickUrl">
            <img v-lazy="image.imgUrl" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="index-card">
      <div>
        <div class="card-text">
          <router-link to="/buy">
            <span>求购大厅</span>
            <span>seek to purchase</span>
          </router-link>
        </div>
      </div>
      <div>
        <div class="card-text">
          <router-link to="/sell">
          <span>售卖大厅</span>
          <span>for sell</span>
          </router-link>
        </div>
      </div>
    </div>
    <list-component :propsName="propsName" ref="child"></list-component>
    <footer-component></footer-component>
  </div>
</template>

<script>
import listComponent from "@/components/list";
import footerComponent from "@/components/footer";
export default {
  name: "Index",
  data() {
    return {
      bannerList: [],
      propsName: ""
    };
  },
  components: { listComponent, footerComponent },
  methods: {
    getBanner() {
      this.axios
        .post("/banner/all")
        .then(res => {
          this.bannerList = res.data.result || [];
        })
        .catch(error => {
          //捕获失败
        });
    }
  },
  mounted() {
    this.getBanner();
  },
  watch: {
    propsName(val) {
      this.$refs.child.getData(1, val, true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.seach {
  width: 325px;
  height: 44px;
  border: solid 1px #c0c4cc;
  line-height: 44px;
  margin: 0 auto;
  border-radius: 31.5px;
  overflow: hidden;
  margin-top: 12px;
  background: url("../../assets/seach.png") no-repeat 15px center;
  background-size: 14px auto;
}
.seach input {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 44px;
  text-indent: 40px;
  border: none;
  outline: none;
  background: none;
  font-size: 14px;
}
.my-swipe a {
  display: block;
  overflow: hidden;
}
.banner {
  width: 325px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 20px;
}
.banner img {
  width: 325px;
  height: 120px;
}
.index-card {
  width: 325px;
  margin: 0 auto;
  margin-top: 21px;
}
.index-card > div {
  width: 155px;
  float: left;
  height: 80px;
  background: url("../../assets/page-icon1.png") no-repeat;
  background-size: 100% 100%;
}
.index-card > div:nth-child(2) {
  background: url("../../assets/page-icon2.png") no-repeat;
  background-size: 100% 100%;
  margin-left: 15px;
}
.card-text {
  margin-top: 25px;
  margin-left: 17px;
  font-size: 12px;
}
.index-card > div:nth-child(1) {
  & > div:nth-child(1) {
    color: #c4534d;
    a {
      color: #c4534d;
    }
  }
    & > div:nth-child(2) {
    color: #3470E2;
    a {
      color: #3470E2;
    }
  }
}

.card-text span {
  display: block;
}
.card-text span:nth-child(1) {
  font-weight: bold;
}
.card-text span:nth-child(2) {
  font-size: 10px;
}
</style>
