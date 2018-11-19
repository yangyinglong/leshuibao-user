<template>
  <div class="navigate">
    <div class="headerLeft">
      <router-link to="/" style="text-decoration: none;"><b class="logo">乐税宝|</b></router-link>
      <b>{{msg}}</b>
    </div>
    <div class="headerRight">
      <b class="logo">&nbsp</b>
      <router-link to="/login" style="text-decoration: none;"><b class="linked">个人中心</b></router-link>
      <b style="color: #999999;">&nbsp|&nbsp</b>
      <router-link to="/login" style="text-decoration: none;"><b class="linked">个人中心</b></router-link>
      <b style="color: #999999;">&nbsp|&nbsp</b>
      <router-link to="/" style="text-decoration: none;"><b class="linked">退出</b></router-link>
      <b>&nbsp&nbsp&nbsp&nbsp</b>
    </div>
    <br><br>
    <hr>
  </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>

</style>
