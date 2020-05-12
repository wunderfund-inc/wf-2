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
                    {{
                      `${firstName} ${lastName}` +
                        (isEntity ? `, on behalf of ${entityName}` : ``)
                    }}
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

              <template v-if="offering && offering.security_type === 'Equity'">
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
            <div v-if="error" class="text-center">
              <p class="text-danger mt-3 mb-0">{{ error }}</p>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-overlay>
  </div>
  <!-- <b-overlay :show="submitting" rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner large variant="secondary" />
          <p class="pt-3">Redirecting to sign the Agreement...</p>
        </div>
      </template>

      <b-card header="Commitment Summary" header-class="text-center">
        <b-card-text>
          Hello! My name is
          <strong>{{ firstName }} {{ lastName }}.</strong>
        </b-card-text>

        <template v-if="validPersonal">
          <b-card-text>
            I want to personally invest in the
            <strong>Regulation {{ form.offering }}</strong> offering of
            <strong>{{ form.companyName }}.</strong>
          </b-card-text>
        </template>

        <template v-if="validEntity">
          <b-card-text>
            I want to invest in the
            <strong>Regulation {{ form.offering }}</strong> offering of
            <strong>{{ form.companyName }}</strong> on behalf of
            <strong>{{ form.entity.name }}.</strong>
          </b-card-text>
        </template>

        <template v-if="validSharesAmount">
          <b-card-text>
            I'm committing to buying
            <strong>
              {{ `${form.amount} ${form.amount === 1 ? "share" : "shares"}` }}
            </strong>
            at {{ offering.price_per_share | asCurrency }}/share
            <strong>
              (USD
              {{ (form.amount * offering.price_per_share) | asCurrency }}
              total)
            </strong>
            and paying via
            <strong>{{ form.method | paymentMethodFormat }}.</strong>
          </b-card-text>
        </template>

        <template v-if="validRawAmount">
          <b-card-text>
            I'm committing to invest
            <strong>USD {{ form.amount | asCurrency }}</strong> and paying via
            <strong>{{ form.method | paymentMethodFormat }}.</strong>
          </b-card-text>
        </template>

        <template v-if="validAttestations">
          <b-card-text>
            <strong>I've agreed to the terms</strong> necessary for this
            investment to be valid.
          </b-card-text>
        </template>

        <b-button
          @click="submitInvestment"
          :disabled="!validForm"
          block
          variant="success"
        >
          Commit to Investing
        </b-button>

        <p class="text-muted text-center">
          <small>
            * You will be redirected to sign your agreement.
          </small>
        </p>
      </b-card>
    </b-overlay> -->
  <!-- </div> -->
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
      validAmount: "agreement/validAmount",
      validMethod: "agreement/validMethod",
      validAttestations: "agreement/validAttestations"
    })
  },
  methods: {
    async submitInvestment() {
      try {
        this.submitting = true;

        await this.$store.dispatch("agreement/saveToDB", {
          auth: this.auth,
          user: this.user,
          companyId: this.$route.params.companyId,
          companyName: this.companyName
        });

        await this.$store.dispatch("agreement/fetchURL", {
          offering: this.offering,
          auth: this.auth
        });

        this.submitting = false;

        await window.location.replace(this.url);
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
  // data() {
  //   return {
  //     submitting: false
  //   };
  // },
  // computed: {
  //   ...mapGetters({
  //     accredited: "profile/accredited",
  //     agreementUrl: "checkout/agreementUrl"
  //   }),
  //   email() {
  //     return this.$store.state.auth.email;
  //   },
  //   userId() {
  //     return this.$store.state.auth.userId;
  //   },
  //   firstName() {
  //     return this.$store.state.profile.first_name;
  //   },
  //   lastName() {
  //     return this.$store.state.profile.last_name;
  //   },
  //   avatar() {
  //     return this.$store.state.profile.avatar;
  //   },
  //   validPersonal() {
  //     return (
  //       this.form.investmentType === "PERSONAL" && this.form.offering !== ""
  //     );
  //   },
  //   validEntity() {
  //     return (
  //       this.form.investmentType === "ENTITY" &&
  //       this.form.offering !== "" &&
  //       this.form.entity.name
  //     );
  //   },
  //   validSharesAmount() {
  //     return (
  //       this.form.amountType === "SHARES" &&
  //       this.form.method !== "" &&
  //       this.form.amount >= this.offering.securities_min
  //     );
  //   },
  //   validRawAmount() {
  //     return (
  //       this.form.amountType === "RAW" &&
  //       this.form.method !== "" &&
  //       this.form.amount >= this.offering.minimum_investment_amount
  //     );
  //   },
  //   validAttestations() {
  //     return (
  //       this.form.attestations.length === 5 &&
  //       this.form.attestations.every(el => {
  //         return ![null, undefined, false].includes(el);
  //       })
  //     );
  //   },
  //   validForm() {
  //     const validTransaction =
  //       this.form.security === "EQUITY"
  //         ? this.validSharesAmount
  //         : this.validRawAmount;

  //     if (this.form.investmentType === "PERSONAL") {
  //       return this.validPersonal && validTransaction && this.validAttestations;
  //     } else if (this.form.investmentType === "ENTITY") {
  //       return this.validEntity && validTransaction && this.validAttestations;
  //     } else {
  //       return false;
  //     }
  //   }
  // },
  // methods: {
  //   async submitInvestment() {
  //     try {
  //       this.submitting = true;

  //       const investmentRef = await db.collection("investments").doc();

  //       const investmentData = {
  //         campaign_id: this.form.companyUID, // `wunderfund`
  //         campaign_offering: this.offering,
  //         offering_id: this.offering.offering_data.id,
  //         company_name: this.form.companyName.toUpperCase(), // `WUNDERFUND`
  //         date_created: timestamp,
  //         date_updated: timestamp,
  //         investment_type: this.form.investmentType, // `PERSONAL` or `ENTITY`
  //         investment_agreement_id: null,
  //         investment_amount_type: this.form.amountType, // `RAW` or `SHARES`
  //         investment_amount: this.form.amount,
  //         investment_method: this.form.method, // `ACH`, `CC`, `CHECK`, `WIRE`
  //         investment_attestations: this.form.attestations,
  //         user_testimonial: this.form.testimonial, // typeof string[]
  //         user_id: this.userId,
  //         user_email: this.email,
  //         user_first_name: this.firstName,
  //         user_last_name: this.lastName,
  //         user_avatar: this.avatar || null
  //       };

  //       if (investmentData.investmentType === "ENTITY") {
  //         investmentData.entity = this.form.entity;
  //       }

  //       if (["ACH", "CC", "CRYPTO"].includes(investmentData.method)) {
  //         investmentData.method_extras = { ...this.form.methodExtras };
  //       }

  //       await investmentRef.set(investmentData);

  //       // await db
  //       //   .collection(`offerings/${this.offering.offering_data.id}/investments`)
  //       //   .doc()
  //       //   .set(investmentData);

  //       const apiEndpt =
  //         "https://us-central1-wunderfund-server.cloudfunctions.net/agreementOnRequest";

  //       const url = await this.$axios.$post(apiEndpt, investmentData);

  //       await window.location.replace(url);
  //     } catch (error) {
  //       // eslint-disable-next-line
  //       console.error(error);
  //       this.submitting = false;
  //       await this.$store.dispatch("toggleOverlay", false);
  //     }
  //   }
  // }
};
</script>
