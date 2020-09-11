<template>
  <section class="img__bg py-5">
    <div class="container text-center text-light">
      <h3 class="pb-4">Not sure if crowdfunding is for you?</h3>
      <a
        href="https://airtable.com/shrNZSPsjsBCtk1yv"
        target="_blank"
        rel="noreferrer"
      >
        <button :class="`btn btn-${color} px-4`">See if you qualify!</button>
      </a>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    color() {
      switch (process.env.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    }
  }
};
</script>

<style scoped>
.img__bg {
  background-image: url("https://images.unsplash.com/photo-1556740714-a8395b3bf30f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
