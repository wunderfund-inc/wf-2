<template>
  <main>
    <div class="container py-5">
      <h1 class="mb-5">Oh No!</h1>
      <p>
        If you're on this page, it's because your credit card cannot be used to
        invest in
        {{ investment.company_name }}.
      </p>
      <p>
        Sometimes this happens because your bank won't let you invest in the
        equity space via a credit card. For now, please choose an alternative
        method for investing.
      </p>
      <p>
        As always, we are using
        <a href="https://northcapital.com" target="_blank">
          North Capital Private Securities
        </a>
        to process investments. If you have any questions, please
        <a href="mailto:taylor@wunderfund.co">email us</a> at any time.
      </p>
      <form v-if="!submitted" @submit="handleSubmit">
        <div class="card bg-light mb-3">
          <div class="card-body">
            <BFormGroup
              label-cols-lg="6"
              label="How would you like to pay instead?"
              label-size="lg"
              label-class="font-weight-bold pt-3"
              class="mb-0"
            >
              <BFormRadio
                v-model="form.method"
                value="ACH"
                name="selected-method"
              >
                ACH (Bank Transfer)
              </BFormRadio>
              <BFormRadio
                v-model="form.method"
                value="CHECK"
                name="selected-method"
              >
                a Check
              </BFormRadio>
              <BFormRadio
                v-if="investment.investment_amount >= 5000"
                v-model="form.method"
                value="WIRE"
                name="selected-method"
              >
                a Wire Transfer
              </BFormRadio>
            </BFormGroup>
          </div>
        </div>
        <div v-if="form.method === 'ACH'" class="card bg-light mb-3">
          <div class="card-body">
            <div class="form-row">
              <div class="col-12 col-md-6">
                <BFormGroup label="Bank Routing Number" label-for="ach-routing">
                  <TheMask
                    id="ach-routing"
                    v-model="form.methodDetails.routing"
                    mask="#########"
                    placeholder="123456789"
                    class="form-control"
                    type="tel"
                  />
                  <BFormInvalidFeedback :state="validatedAchRouting.valid">
                    {{ validatedAchRouting.message }}
                  </BFormInvalidFeedback>
                </BFormGroup>
              </div>
              <div class="col-12 col-md-6">
                <b-form-group
                  label="Bank Account Number"
                  label-for="ach-account"
                >
                  <TheMask
                    id="ach-account"
                    v-model="form.methodDetails.account"
                    mask="#################"
                    placeholder="123456(78901234567)"
                    class="form-control"
                    type="tel"
                  />
                  <BFormInvalidFeedback :state="validatedAchAccount.valid">
                    {{ validatedAchAccount.message }}
                  </BFormInvalidFeedback>
                </b-form-group>
              </div>
            </div>
            <div class="form-row">
              <button type="submit" class="btn btn-success w-100">
                Resubmit Payment Method
              </button>
            </div>
          </div>
        </div>
        <div v-if="form.method === 'CHECK'" class="card bg-light mb-3">
          <div class="card-body">
            <p class="card-text">
              We will email you details for sending a check to our transfer
              agent.
            </p>
            <button type="submit" class="btn btn-success w-100">
              Send Email
            </button>
          </div>
        </div>
        <div v-if="form.method === 'WIRE'" class="card bg-light mb-3">
          <div class="card-body">
            <p class="card-text">
              We will email you details for sending a wire transfer to our
              transfer agent.
            </p>
            <button type="submit" class="btn btn-success w-100">
              Send Email
            </button>
          </div>
        </div>
      </form>
      <p v-else class="text-center mt-5">
        <span v-if="form.method === 'ACH'">
          Submitted! We'll send you a confirmation email when your transaction
          goes through.
        </span>
        <span v-else>Sent! Check your inbox.</span>
      </p>
    </div>
  </main>
</template>

<script>
import { BFormGroup, BFormInvalidFeedback, BFormRadio } from "bootstrap-vue";
import { TheMask } from "vue-the-mask";
import { doc, getDoc } from "firebase/firestore/lite";
import { db, functions } from "@/plugins/firebase";
import { validateAchAccount, validateAchRouting } from "@/helpers/form";

/**
 * Returns a firebase document for a particular investment.
 * @param {string} investmentId
 * @returns [investment, error]
 */
async function getInvestment(investmentId) {
  try {
    const docRef = doc(db, `investments/${investmentId}`);
    const snapshot = await getDoc(docRef);
    const investment = snapshot.data();
    if (!investment) {
      throw new Error("no investment found.");
    }
    return [investment, null];
  } catch (error) {
    return [null, error];
  }
}

export default {
  components: {
    BFormGroup,
    BFormInvalidFeedback,
    BFormRadio,
    TheMask,
  },
  async asyncData({ redirect, route }) {
    const uid = route.query.uid;
    if (!uid) return redirect("/");
    const [investment, error] = await getInvestment(uid);
    if (error) return redirect("/");
    return { investment, uid };
  },
  data() {
    return {
      submitted: false,
      form: {
        method: null,
        methodDetails: {
          account: null,
          routing: null,
        },
      },
    };
  },
  computed: {
    validatedAchAccount() {
      return validateAchAccount(this.form.methodDetails.account);
    },
    validatedAchRouting() {
      return validateAchRouting(this.form.methodDetails.routing);
    },
  },
  methods: {
    async handleSubmit(e) {
      e.preventDefault();
      this.submitted = true;
      const callFunction = functions.httpsCallable("redoEmail");
      try {
        await callFunction({
          ...this.form,
          // eslint-disable-next-line no-undef
          uid: this.uid,
        });
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
      setTimeout(() => this.$router.push("/"), 5000);
    },
  },
};
</script>
