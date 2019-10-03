<template lang="pug">
  nuxt-link(:to="`/campaign/${campaign.id}`")
    b-card(
      :img-src="campaign.cardImg"
      img-top
    )
      b-card-title {{ campaign.companyName }}
      b-card-text {{ campaign.companyMotto }}
      b-row(justify-content-end)
        b-col
          small.text-muted {{ campaign.companyCity }}, {{ campaign.companyState }}
        b-col
          b-badge.card-badge(size="sm") {{ campaign.offeringType | reg_format }}
</template>

<script>
export default {
  props: {
    campaign: {
      type: Object,
      default() {},
      cardImg: {
        type: String,
        required: true
      },
      companyName: {
        type: String,
        required: true
      },
      companyMotto: {
        type: String,
        required: true
      },
      companyCity: {
        type: String,
        required: true
      },
      companyState: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      offeringType: {
        type: String,
        default: "CF"
      }
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
      height: 250px;
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
