<template>
  <div class="footer">
        <div class="footer-postion">
            <div class="footer-main">
                <div class="center-origin" @click="pushPath('/publish')">发布</div>
                <div class="footer-bg">
                    <div @click="pushPath('/index')" :class="activeIndex == 1 ? 'active' : ''"><span>首页</span></div>
                    <div :class="activeIndex == 2 ? 'active' : ''"><span>我的</span></div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    propsName: {
      type: String,
      default: ""
    },
    activeIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
        indexPath: null
    };
  },
  methods: {
    pushPath(path) {
        if(this.indexPath != path){
            this.$router.push({ path: path });
        }
    }
  },
  mounted() {
      this.indexPath = this.$router.history.current.fullPath;
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer {
  height: 111px;
  width: 100%;
  position: relative;
  font-size: 10px;
  .footer-postion {
    width: 100%;
    height: 111px;
    position: fixed;
    bottom: 0;
    left: 0;
    .footer-main {
      width: 100%;
      height: 111px;
      overflow: hidden;
    }
    .footer-bg {
      width: 100%;
      height: 77px;
      background: #fff;
      box-shadow: 0px -5px 10px 0px rgba(238, 238, 238, 1);
      margin-top: 34px;
      line-height: 90px;
      color: #9096a9;
      div:nth-child(1) {
        float: left;
        background: url("../assets/footer1.png") no-repeat center 15px;
        background-size: 17px 16px;
        margin-left: 55px;
        &.active {
          background: url("../assets/footer1-ed.png") no-repeat center 15px;
          background-size: 17px 16px;
          color: #e53b33;
        }
      }
      div:nth-child(2) {
        float: right;
        background: url("../assets/footer2.png") no-repeat center 15px;
        background-size: 16px 17px;
        margin-right: 55px;
        &.active {
          background: url("../assets/footer1-ed.png") no-repeat center 15px;
          background-size: 17px 16px;
          color: #e53b33;
        }
      }
    }
  }
  .center-origin {
    width: 88px;
    height: 88px;
    color: #e53b33;
    position: absolute;
    top: -5px;
    left: 50%;
    margin-left: -44px;
    background: url("../assets/center-icon.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 170px;
  }
}
</style>