<template>
  <div>
    <div v-html="apply">
      {{apply}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "SubPayment",
    data() {
      return {
        apply: ''
      }
    },
    mounted() {
      let form = this.$route.query.htmls
      this.apply = form
      this.$nextTick(() => {
          document.forms[0].submit()
        }
      )
    }
  }
</script>

<style scoped>

</style>
