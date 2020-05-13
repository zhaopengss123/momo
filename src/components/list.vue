<template>
  <div class="list">
      <div class="list-nav">
          <ul>
              <li>时间</li>
              <li>价格</li>
              <li>筛选</li>
          </ul>
      </div>
      <div class="list-main">
          <ul>
              <li>
                  <img :src="'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'">
                  <div class="list-text">
                      <p></p>
                      <p></p>
                      <p></p>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {};
  },
  methods: {},
  mounted() {}
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
       width:100%;
       justify-content:space-between;
      li {
        flex-direction: column;
        padding:0 17px;
        background-image: url('../assets/top-jt.png');
        background-size: 8px auto;
        background-position: right center;
        background-repeat: no-repeat;
      }
    }
  }
  .list-main{
      width: 100%;
      ul>li{
          img{
              
          }
      }
  }
}
</style>