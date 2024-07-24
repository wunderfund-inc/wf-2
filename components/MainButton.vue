<template>
  <button :class="`btn gold ${extraClasses}`">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    extraClasses: {
      type: String,
      default: "",
      required: false,
    },
  },
};
</script>

<style scoped>
.gold {
  border: 1px solid #c89f5c;
  cursor: pointer;
  color: white;
  text-decoration: none;
  -webkit-transition: 0.3s all ease;
  transition: 0.3s ease all;
  background-color: #c89f5c;
  padding: 12px;
}

.gold:hover {
  border: 1px solid lighten(#c89f5c, 10%);
  color: white;
  background-color: lighten(#c89f5c, 10%);
}
</style>
