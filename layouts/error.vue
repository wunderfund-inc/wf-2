<template>
  <div id="app">
    <div class="container py-5">
      <img
        src="~/assets/bg/404.jpg"
        alt="404 Error Image"
        class="img-thumbnail"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default() {},
      required: true,
    },
  },
};
</script>

<style scoped>
.fill-page {
  width: 100vw;
}
</style>
