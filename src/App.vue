<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App'
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  html,body{
    width: 100%;
    height: 100%;
  }
  #app{
    max-width: 375px;
    width:375px;
    margin: 0 auto;
    height: 100%;
  }
</style>
