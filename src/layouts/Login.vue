<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="container-fluid">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      leftDrawerOpen: false,
      routes: this.$router.options.routes[0].children
    }
  },
  mounted () {
    console.log(this.$router.options.routes[1])
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
.dark {
  /* color: #fff !important; */
  /* background: #47474736; */
    background: #96969636;
  /* opacity: 0.3; */
}
</style>
