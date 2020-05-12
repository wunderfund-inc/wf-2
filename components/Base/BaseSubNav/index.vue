<template>
  <b-list-group class="text-center text-md-left d-print-none">
    <b-list-group-item
      v-for="(link, index) in links"
      :key="index"
      :to="link.url"
      :active="$route.path === link.url"
      active-class="bg-success border-success"
    >
      {{ link.name }}
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      default() {},
      required: true
    }
  }
};
</script>
