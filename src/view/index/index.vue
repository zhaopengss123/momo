<template>
  <div class="index">
        <van-nav-bar title="默默道具城"/>
        <list-component></list-component>
  </div>
</template>

<script>
import listComponent from '@/components/list'
export default {
  name: "Index",
  data() {
    return {
    };
  },
  components:{ listComponent },
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
<style scoped lang="scss">
  
</style>
