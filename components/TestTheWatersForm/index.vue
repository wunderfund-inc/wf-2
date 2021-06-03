<template>
  <section class="cta__section">
    <div v-if="displayThanks" class="container py-3 bg-light">
      Thank you for your submission. We'll let you know when the offering is
      finally up on our site, so stay tuned!
    </div>
    <div v-else class="container py-3 bg-light">
      <h6>
        This company is still in the pre-investment stages. Fill out the form
        below to make this a better deal:
      </h6>
      <form @submit.prevent="sendToAirtable">
        <div class="form-row mb-3">
          <div class="col">
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="form-row mb-3">
          <div class="col">
            <label for="likeliness" class="form-label">
              How likely would you be to invest in {{ companyName }}?
            </label>
            <select
              id="likeliness"
              v-model="form.likeliness"
              name="likeliness"
              class="form-control"
              required
            >
              <option :value="null" disabled>Please Select</option>
              <option value="Definitely Would">Definitely Would</option>
              <option value="Probably Would">Probably Would</option>
              <option value="Unsure">Unsure</option>
              <option value="Probably Would Not">Probably Would Not</option>
              <option value="Definitely Would Not">Definitely Would Not</option>
            </select>
          </div>
        </div>
        <div class="form-row mb-3">
          <div class="col">
            <label for="amount" class="form-label">
              How much would you be willing to invest in {{ companyName }}?
            </label>
            <select
              id="amount"
              v-model="form.amount"
              name="amount"
              class="form-control"
              required
            >
              <option :value="null" disabled>Please Select</option>
              <option value="$100">$100</option>
              <option value="$101 - $1,000">$101 - $1,000</option>
              <option value="$1,001 - $5,000">$1,001 - $5,000</option>
              <option value="$5,000+">$5,000+</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <button type="submit" class="w-100 btn btn-success">Submit</button>
          </div>
        </div>
        <div v-if="error" class="form-row mt-3 text-danger">{{ error }}</div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    companyName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {
        email: null,
        likeliness: null,
        amount: 0,
        campaign: this.$route.params.companyId,
      },
      error: null,
      displayThanks: false,
    };
  },
  methods: {
    async sendToAirtable() {
      try {
        await this.$axios({
          url: "https://api.airtable.com/v0/apppAfHzBw2HK5Y5I/Table%201",
          data: {
            fields: {
              Date: new Date(),
              Email: this.form.email,
              "Likeliness to Invest": this.form.likeliness,
              Amount: this.form.amount,
              Campaign: this.form.campaign,
            },
          },
          method: "POST",
          headers: {
            Authorization: `Bearer key8EIdNUuzRNnAvB`,
            "Content-Type": "application/json",
          },
        });
        this.displayThanks = !this.displayThanks;
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
