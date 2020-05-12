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
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
$primary: #c89f5c;

.gold {
  border: 1px solid $primary;
  cursor: pointer;
  color: white;
  text-decoration: none;
  -webkit-transition: 0.3s all ease;
  transition: 0.3s ease all;
  background-color: $primary;
  padding: 12px;
  &:hover {
    border: 1px solid lighten($primary, 10%);
    color: white;
    background-color: lighten($primary, 10%);
  }
}
</style>
