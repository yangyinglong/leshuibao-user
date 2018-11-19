<template>
  <div class="content">
    <b style="color: #999999;">&nbsp|&nbsp</b>
    <router-link to="/" style="text-decoration: none;"><b class="linked" @click="logout">退出</b></router-link>
  </div>

</template>

<script>
  // eslint-disable-next-line indent
  /* eslint-disable indent,indent,space-before-function-paren,no-unused-vars */

  // import $ from '@/api/axios.js';
  // import Qs from 'qs';

  export default {
    name: 'Logout',
    data() {
      return {
        dialogLoginVisible: false,
        // loginLable: '登录',
        loginform: {
          name: '',
          password: '',
          rememberPassword: false
        },
        loading: false,
        loginStatus: 0
      }
    },
    methods: {
      logout: function () {
        sessionStorage.clear()
        this.$store.dispatch('logout').then(() => {
          this.$notify({
            type: 'success',
            message: '再见!',
            duration: 1000
          })
          this.$router.replace('/')
        })
      }
    }
  }

</script>

<style scoped>

</style>
