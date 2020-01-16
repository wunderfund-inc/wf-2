<template lang="pug">
  nuxt-link.text-dark(:to="`/c/${company.uid}`")
    b-card
      .text-center.pb-3
        b-card-img(top :src="company.logo")
      b-card-title {{ company.name.short }}
      b-card-text {{ company.motto }}
      b-row(justify-content-end)
        b-col
          small.text-muted {{ company.location.city }}, {{ company.location.state }}
        b-col
          b-badge.card-badge(
            v-for="(offering, index) in company.offerings"
            :key="index"
            size="sm"
          ) Reg {{ offering.offeringType }}
</template>

<script>
export default {
  props: {
    company: {
      type: Object,
      default() {}
    }
  }
};
</script>

<style lang="scss" scoped>
$primary: #0091ea;
$font: "Montserrat", sans-serif;

a {
  text-decoration: none;
  .card {
    img {
      max-height: 200px;
      max-width: 200px;
    }
    .card-badge {
      background-color: rgba(236, 195, 11, 0.5);
      color: #494949;
      font-size: 12px;
      padding: 7px;
      float: right;
      margin: 5px 6px 0 6px;
      font-family: $font;
      font-weight: 400;
    }
  }
  .card:hover {
    cursor: pointer;
    text-decoration: none;
    -webkit-box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
    -moz-box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
    box-shadow: 0px 4px 12px 1px rgba(89, 89, 89, 0.1);
  }
}
</style>
