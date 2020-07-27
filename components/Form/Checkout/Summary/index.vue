<template>
  <div style="position: sticky; top: 20px;">
    <b-overlay :show="submitting" rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner large variant="secondary" />
          <p class="pt-3">Redirecting...</p>
        </div>
      </template>
      <b-card no-body>
        <template v-slot:header>
          <h6 class="text-center mb-0">Investment Summary</h6>
        </template>
        <b-list-group flush>
          <b-list-group-item>
            <template v-if="editingProfile">
              <input-profile />
            </template>
            <template v-else>
              <div class="container">
                <div class="row justify-content-between">
                  <b-card-text>
                    Investor:
                    <small>
                      (<b-link @click.prevent="editProfile">Edit</b-link>)
                    </small>
                  </b-card-text>
                  <address class="mb-0 font-weight-bold">
                    {{ firstName }} {{ lastName }}

                    <template v-if="isEntity">
                      <small class="text-muted">, on behalf of</small>
                      <br />
                      {{ entityName }}
                    </template>

                    <br />
                    {{ street1 }}
                    <br v-if="street2 && street2.length > 0" />
                    <span v-if="street2">{{ street2 }}</span>
                    <br />
                    {{ `${city}, ${state} ${postal}` }}
                  </address>
                </div>
              </div>
            </template>
          </b-list-group-item>
          <b-list-group-item>
            <div class="container">
              <template v-if="offering">
                <div class="row justify-content-between">
                  <b-card-text>Selected Offering:</b-card-text>
                  <b-card-text>
                    <strong>Regulation {{ offering.offering_type }}</strong>
                  </b-card-text>
                </div>
              </template>

              <template
                v-if="
                  offering &&
                    ['Equity', 'Convertible Note'].includes(
                      offering.security_type
                    )
                "
              >
                <div v-if="validAmount">
                  <div class="row justify-content-between">
                    <b-card-text># Shares:</b-card-text>
                    <b-card-text>
                      <strong>{{ amount }}</strong>
                    </b-card-text>
                  </div>
                  <div class="row justify-content-between">
                    <b-card-text>Total Amount to Invest:</b-card-text>
                    <b-card-text>
                      <strong>
                        USD
                        {{ (amount * offering.price_per_share) | asCurrency }}
                      </strong>
                    </b-card-text>
                  </div>
                </div>
              </template>

              <template v-else>
                <div v-if="validAmount" class="row justify-content-between">
                  <b-card-text>Total Amount to Invest:</b-card-text>
                  <b-card-text>
                    <strong>USD {{ amount | asCurrency }}</strong>
                  </b-card-text>
                </div>
              </template>

              <template v-if="method">
                <div class="row justify-content-between">
                  <b-card-text>Paying via:</b-card-text>
                  <b-card-text>
                    <strong>{{ method | paymentMethodFormat }}</strong>
                  </b-card-text>
                </div>
              </template>
            </div>
            <button
              @click="submitInvestment"
              :disabled="!validMethod || !validAmount || !validAttestations"
              class="btn btn-success btn-block"
            >
              Sign Agreement
            </button>
            <small class="text-muted">
              *You will be redirected to sign your agreement.
            </small>
            <div v-if="error" class="text-center">
              <p class="text-danger mt-3 mb-0">{{ error }}</p>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import InputProfile from "@/components/Form/Checkout/InputProfile";

export default {
  components: { InputProfile },
  props: {
    companyName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      submitting: false,
      error: null
    };
  },
  computed: {
    ...mapState({
      firstName: state => state.profile.first_name,
      lastName: state => state.profile.last_name,
      street1: state => state.profile.address_street_1,
      street2: state => state.profile.address_street_2,
      city: state => state.profile.address_city,
      state: state => state.profile.address_state,
      postal: state => state.profile.address_postal,
      editingProfile: state => state.agreement.editingProfile,
      offering: state => state.agreement.offering,
      amount: state => state.agreement.amount,
      method: state => state.agreement.method,
      isEntity: state => state.profile.is_entity,
      entityName: state => state.profile.entity_name,
      user: state => state.profile,
      auth: state => state.auth,
      url: state => state.agreement.url
    }),
    ...mapGetters({
      accredited: "profile/accredited",
      validAmount: "agreement/validAmount",
      validMethod: "agreement/validMethod",
      validAttestations: "agreement/validAttestations"
    })
  },
  methods: {
    async submitInvestment() {
      try {
        this.submitting = true;

        await this.$store.dispatch("agreement/saveToFirebase", {
          accredited: this.accredited,
          auth: this.auth,
          companyId: this.$route.params.companyId,
          companyName: this.companyName
        });

        await this.$store.dispatch("agreement/fetchURL", { auth: this.auth });

        this.submitting = false;

        // eslint-disable-next-line
        console.log(this.url);
        // await window.location.replace(this.url);
      } catch (error) {
        this.error = error;
      }
    },
    editProfile() {
      this.$store.dispatch("agreement/setAttribute", {
        prop: "editingProfile",
        val: true
      });
    }
  }
};
</script>
