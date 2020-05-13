<template>
  <div class="hello">
        <van-nav-bar title="标题" left-arrow/>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
    };
  },
  methods: {
    getData() {
      this.axios
        .post("/labelEditing/deleteLabel")
        .then(res => {})
        .catch(error => {
          //捕获失败
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
