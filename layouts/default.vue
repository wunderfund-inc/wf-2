<template lang="pug">
  #app
    main-navigation
    nuxt
    main-footer
</template>

<script>
import MainNavigation from "@/components/Base/MainNavigation/index";
import MainFooter from "@/components/Base/MainFooter/index";

export default {
  components: {
    MainNavigation,
    MainFooter
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
