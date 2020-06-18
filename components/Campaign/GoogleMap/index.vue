<template>
  <main />
</template>

<script>
import MarkerClustererPlus from "@google/markerclustererplus";

export default {
  props: {
    companyLocation: {
      type: Object,
      default() {},
      required: true
    },
    locations: {
      type: Array,
      required: true
    }
  },
  async mounted() {
    try {
      const gmapsInit = require("@/helpers/gmaps");
      const google = await gmapsInit.init();
      const map = new google.maps.Map(this.$el, {
        zoom: 5,
        center: { lat: this.companyLocation.lat, lng: this.companyLocation.lng }
      });

      const markerClickHandler = marker => {
        map.setZoom(13);
        map.setCenter(marker.getPosition());
      };

      const coord = this.locations.map(x => {
        return {
          position: {
            lat: x.lat,
            lng: x.lng
          }
        };
      });

      const markers = coord.map(x => {
        const marker = new google.maps.Marker({ ...x, map });
        marker.addListener("click", () => markerClickHandler(marker));
        return marker;
      });

      // eslint-disable-next-line no-unused-vars
      const mc = new MarkerClustererPlus(map, markers, { imagePath: "m" });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
};
</script>
