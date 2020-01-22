<template lang="pug">
  nuxt-link.text-dark(:to="`/c/${company.uid}`")
    b-card(:style="`background-image: url(${company.background.browse.url || ''}); background-repeat: no-repeat; background-position: top; background-size: auto 125px`")
      .text-center
        b-card-img-lazy.mb-3(
          :src="company.logo.url || ''"
          style="max-height: 150px; max-width: 150px"
        )
        b-card-title {{ company.name.short }}
        b-card-text.mb-3
          small.text-muted {{ company.motto }}
      b-row(justify-content-end)
        b-col
          small.text-muted
            font-awesome-icon(:icon="['fas', 'map-marker-alt']")
            |
            | {{ company.location.city }}, {{ company.location.state }}
        b-col.text-right
          b-badge.card-badge.mx-1(
            v-for="(offering, index) in company.offerings"
            :key="index"
            size="lg"
          ) Reg. {{ offering.offeringType }}
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
