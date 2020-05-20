<template>
  <q-layout view="lHh Lpr lFf" class="img-background" style="border: solid 1px black">
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
.img-background {
  background: #568fa9;
  /* Full height */
  height: 100%;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.dark {
  /* color: #fff !important; */
  background: #47474736;
  /* opacity: 0.3; */
}
</style>
