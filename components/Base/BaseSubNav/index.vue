<template lang="pug">
header#sub-nav
  .container
    .row
      .col
        b-navbar(type="light")
          b-navbar-nav.mx-auto(justified)
            .row
              .col(
                v-for="(item, index) in list"
                :key="index"
              )
                b-nav-item(
                  active-class="font-weight-bolder"
                  :to="`/${category}/${item.slug}`"
                ) {{ item.title }}
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  }
};
</script>
