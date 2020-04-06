<template>
  <div id="app">
    <b-img src="~assets/bg/404.jpg" class="fill-page" />
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {},
      required: true
    }
  }
};
</script>

<style scoped>
.fill-page {
  width: 100vw;
}
</style>
