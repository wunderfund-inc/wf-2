<template>
  <div id="app">
    <base-navigation />
    <nuxt class="min-height" />
    <base-footer />
  </div>
</template>

<script>
import BaseNavigation from "@/components/Base/BaseNavigation/index";
import BaseFooter from "@/components/Base/BaseFooter/index";

export default {
  components: {
    BaseNavigation,
    BaseFooter
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

.min-height {
  min-height: 70vh;
}
</style>
