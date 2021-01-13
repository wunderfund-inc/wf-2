<template>
  <form novalidate class="form" @submit.prevent="commitInvestment">
    <!-- Details about the Offering -->
    <section class="card bg-light mb-3">
      <div class="container">
        <h5 class="card-title my-3 font-weight-bold">Offering Details:</h5>
        <!-- <div class="form-row pt-3">
          <template v-if="offering.security_type === 'Promissory Note'">
            <p>
              <small>
                The debt will accrue interest at
                <strong>{{ offering.interest_rate }}%</strong>
                per year. The debt schedule pays back the investor in equal
                {{ offering.payment_interval.toLowerCase() }} installments made
                over
                <strong>
                  {{ offering.months_to_maturity / 12 }}
                  {{ offering.months_to_maturity === 12 ? "year" : "years" }}.
                </strong>
              </small>
            </p>
            <p class="mb-0">
              <small>
                Minimum Investment Amount:
                <strong>
                  {{ offering.minimum_investment_amount | asCurrency }}
                </strong>
              </small>
            </p>
          </template>

          <template v-if="offering.security_type === 'Revenue Share'">
            <p>
              <small>
                This debt will pay
                <strong>{{ offering.percent_per_period }}%</strong> of
                {{ offering.revenue_type.toLowerCase() }} revenues on
                {{ offering.payment_interval === "Annual" ? "an" : "a" }}
                {{ offering.payment_interval.toLowerCase() }} basis until it
                pays off <strong>{{ `${offering.return_multiplier}x` }}</strong>
                the investment amount.
              </small>
            </p>

            <p class="mb-0">
              <small>
                Minimum Investment Amount:
                <strong>
                  {{ offering.minimum_investment_amount | asCurrency }}
                </strong>
              </small>
            </p>
          </template>

          <template v-if="offering.security_type === 'Convertible Note'">
            <p>
              <small>
                Equity ownership calculated as (Amount Invested /
                {{ offering.valuation_type.toLowerCase() }} valuation of
                <strong>
                  {{ offering.valuation_cap | currencyDisplayFormat }}
                </strong>
                ).
              </small>
            </p>

            <p class="mb-0">
              <small>
                Price Per Share:
                <strong>{{ offering.price_per_share | asCurrency }}</strong>
              </small>
              <br />
              <small>
                Minimum Shares to Invest in:
                <strong>{{ offering.securities_min }}</strong>
              </small>
            </p>
          </template>

          <template v-if="offering.security_type === 'Equity'">
            <p>
              <small>
                Equity ownership calculated as (Amount Invested /
                {{ offering.valuation_type.toLowerCase() }} valuation of
                <strong>
                  {{
                    (offering.price_per_share * offering.securities_total)
                      | currencyDisplayFormat
                  }}
                </strong>
                ).
              </small>
            </p>
          </template>

          <template v-if="offering.security_type === 'SAFE Note'">
            <p>
              <small v-if="offering.early_bird_percent && !ebExpired">
                Right now, your investment will give you a
                <strong>{{ `${offering.early_bird_percent}%` }}</strong>
                discount on futures shares in this company.
                <span v-if="offering.early_bird_amount">
                  After this company raises at least
                  <strong>
                    {{ offering.early_bird_amount | currencyDisplayFormat }},
                  </strong>
                  the discount decreases to
                  <strong>{{ `${offering.percent_discount}%` }}.</strong>
                </span>
                <span v-else-if="offering.early_bird_date_end">
                  After
                  <strong>
                    {{ formatDate(offering.early_bird_date_end) }},
                  </strong>
                  the discount decreases to
                  <strong>{{ `${offering.percent_discount}%.` }}</strong>
                </span>
              </small>

              <small v-else>
                Your investment gives you a
                <strong>{{ `${offering.percent_discount}%` }}</strong>
                discount on future shares into this company.
              </small>

              <small v-if="offering.valuation_cap">
                You're speculating that the company will be worth more than
                <strong>
                  {{ offering.valuation_cap | currencyDisplayFormat }}
                </strong>
                in the future.
              </small>
            </p>

            <p class="mb-0">
              <small>
                Minimum Investment Amount:
                <strong>
                  {{ offering.minimum_investment_amount | asCurrency }}
                </strong>
              </small>
            </p>
          </template>

          <template v-if="offering.security_type === 'SAFT Note'"></template>
        </div> -->
      </div>
    </section>

    <!-- Input to select class of security (if Equity) -->
    <section
      v-if="offering.security_type === 'Equity'"
      class="card bg-light mb-3"
    >
      <div class="container">
        <h5 class="card-title my-3 font-weight-bold">
          Select which class of security you want to invest in:
        </h5>

        <div class="form-row pb-4">
          <div
            v-for="(tier, index) in offering.minimum_investment_amount_tiers"
            :key="index"
            class="col-12 col-md-6"
          >
            <label
              :class="!canInvest && index !== 0 ? 'bg-light' : ''"
              class="card py-2 pl-1 mb-md-0"
            >
              <div class="container">
                <div class="form-row form-check-inline">
                  <b-form-radio
                    v-model="securityClass"
                    :value="tier"
                    :disabled="!canInvest && index !== 0"
                    class="form-check-input"
                    size="lg"
                    name="offerings"
                  >
                    <span class="form-check-label">
                      {{ tier.security_tier }}
                    </span>
                    <small v-if="!canInvest && index !== 0" class="text-small">
                      <a href="https://google.com" target="_blank">
                        Why can't I select this one?
                      </a>
                    </small>
                  </b-form-radio>
                </div>

                <div class="form-row text-muted pt-3">
                  <small>
                    Minimum number of shares needed to purchase for a valid
                    investment:
                    <strong>{{ tier.minimum_shares }}</strong>
                  </small>
                  <br />
                  <small>
                    Price per share:
                    <strong>{{ tier.pps | asCurrency }}</strong>
                  </small>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- Input either number of shares (if equity) or actual amount (else) -->
    <section class="card bg-light mb-3">
      <div class="container">
        <div class="form-group mt-3">
          <template v-if="offering.security_type === 'Equity' && securityClass">
            <b-form-group
              label-cols-lg="6"
              label="Number of shares you wish to buy:"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text text-muted"># Shares</span>
                </div>
                <TheMask
                  id="inv-amt"
                  v-model.number="form.amount"
                  mask="######"
                  class="form-control text-right"
                  type="tel"
                />
              </div>

              <div
                v-if="!validatedForm.amount.valid"
                class="small text-danger text-right pt-2"
              >
                {{ validatedForm.amount.message }}
              </div>

              <div class="row d-flex justify-content-between px-3 pt-3">
                <h6>Price Per Share:</h6>
                <h6>x {{ securityClass.pps | asCurrency }}</h6>
              </div>

              <hr class="mt-0 mb-2" />

              <div class="row d-flex justify-content-between px-3">
                <h5>Total Amount to Invest:</h5>
                <h4 class="text-success">
                  {{ (securityClass.pps * form.amount) | asCurrency }}
                </h4>
              </div>
            </b-form-group>
          </template>
          <template v-else>
            <b-form-group
              label-cols-lg="6"
              label="Amount you wish to invest:"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <b-input-group prepend="USD">
                <VueNumeric
                  v-model="form.amount"
                  :precision="2"
                  currency="$"
                  separator=","
                  class="form-control"
                  type="tel"
                />
              </b-input-group>
              <b-form-invalid-feedback :state="validatedForm.amount.valid">
                {{ validatedForm.amount.message }}
              </b-form-invalid-feedback>
            </b-form-group>
          </template>
        </div>
      </div>
    </section>

    <!-- Input: Payment Method -->
    <section v-if="validatedForm.amount.valid" class="card bg-light mb-3">
      <div class="container">
        <b-form-group
          label-cols-lg="6"
          label="How would you like to pay?"
          label-size="lg"
          label-class="font-weight-bold pt-3"
          class="mb-0"
        >
          <div class="py-3">
            <b-form-radio
              v-if="offering.payment_method_ach"
              v-model="form.method"
              value="ACH"
              name="selected-method"
            >
              ACH (Bank Transfer)
            </b-form-radio>
            <b-form-radio
              v-if="offering.payment_method_cc"
              v-model="form.method"
              value="CC"
              name="selected-method"
            >
              a Credit Card
            </b-form-radio>
            <b-form-radio
              v-if="offering.payment_method_check"
              v-model="form.method"
              value="CHECK"
              name="selected-method"
            >
              a Check
            </b-form-radio>
            <b-form-radio
              v-if="offering.payment_method_wire"
              v-model="form.method"
              value="WIRE"
              name="selected-method"
            >
              a Wire Transfer
            </b-form-radio>
            <b-form-radio
              v-if="offering.payment_method_crypto"
              v-model="form.method"
              value="CRYPTO"
              name="selected-method"
            >
              Cryptocurrency (Ethereum)
            </b-form-radio>
          </div>
        </b-form-group>
      </div>
    </section>

    <!-- Input: Payment Method credentials -->
    <section
      v-if="validatedForm.amount.valid && validatedForm.method.valid"
      class="card bg-light mb-3"
    >
      <div class="container py-3">
        <b-form-group
          label-cols-lg="6"
          label="Investment processing brought to you by:"
          label-size="lg"
          label-class="font-weight-bold small"
        >
          <div class="row">
            <div class="col justify-content-center">
              <b-link
                href="https://www.northcapital.com/"
                target="_blank"
                class="mb-0"
              >
                <b-img thumbnail src="~assets/logo/tapi_secure.png" />
              </b-link>
            </div>
          </div>
        </b-form-group>

        <div v-if="form.method === 'ACH'" class="form-group mb-0">
          <div class="form-row">
            <div class="col-12 col-md-6">
              <b-form-group label="Bank Routing Number" label-for="ach-routing">
                <TheMask
                  id="ach-routing"
                  v-model="form.methodDetails.routing"
                  mask="#########"
                  placeholder="123456789"
                  class="form-control"
                  type="tel"
                />
                <b-form-invalid-feedback :state="validatedAchRouting.valid">
                  {{ validatedAchRouting.message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-6">
              <b-form-group label="Bank Account Number" label-for="ach-account">
                <TheMask
                  id="ach-account"
                  v-model="form.methodDetails.account"
                  mask="#################"
                  placeholder="123456(78901234567)"
                  class="form-control"
                  type="tel"
                />
                <b-form-invalid-feedback :state="validatedAchAccount.valid">
                  {{ validatedAchAccount.message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </div>
        </div>

        <div v-if="form.method === 'CC'" class="form-group mb-0">
          <b-form-row>
            <div class="col-12">
              <b-form-group
                label="Name (as it appears on your card)"
                label-for="cc-name"
              >
                <b-form-input id="cc-name" v-model="form.methodDetails.name" />
                <b-form-invalid-feedback :state="validatedCardName.valid">
                  {{ validatedCardName.message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </b-form-row>
          <b-form-row>
            <div class="col-12">
              <b-form-group>
                <div class="d-flex d-inline-flex align-items-top">
                  <label for="cc-number">Credit Card Number</label>
                  <div class="pl-3">
                    <brand-icon :class="creditCardClasses('VI')" i="cc-visa" />
                    <brand-icon
                      :class="creditCardClasses('MC')"
                      i="cc-mastercard"
                    />
                    <brand-icon
                      :class="creditCardClasses('DI')"
                      i="cc-discover"
                    />
                  </div>
                </div>
                <TheMask
                  id="cc-number"
                  v-model="form.methodDetails.number"
                  class="form-control"
                  mask="#### #### #### ####"
                  placeholder="4242 4242 4242 4242"
                  type="tel"
                />
                <b-form-invalid-feedback :state="validatedCardNumber.valid">
                  {{ validatedCardNumber.message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </b-form-row>
          <b-form-row>
            <div class="col-12 col-md-4">
              <b-form-group label="Expiration Month">
                <b-form-select v-model="form.methodDetails.month">
                  <option
                    v-for="(month, index) in months"
                    :key="index"
                    :value="month.value"
                    :disabled="month.disabled"
                  >
                    {{ month.text }}
                  </option>
                </b-form-select>
                <b-form-invalid-feedback :state="validatedExpiryMonth.valid">
                  {{ validatedExpiryMonth.message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-4">
              <b-form-group label="Expiration Year">
                <b-form-select
                  v-model="form.methodDetails.year"
                  :options="years"
                >
                  <template v-slot:first>
                    <option :value="null" disabled>-- Please Select --</option>
                  </template>
                </b-form-select>
                <b-form-invalid-feedback :state="validatedExpiryYear.valid">
                  {{ validatedExpiryYear.message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-12 col-md-4">
              <b-form-group label="Security Code" label-for="cc-cvv">
                <TheMask
                  id="cc-cvv"
                  v-model="form.methodDetails.cvv"
                  class="form-control"
                  mask="###"
                  placeholder="123"
                  type="tel"
                />
                <b-form-invalid-feedback :state="validatedCVV.valid">
                  {{ validatedCVV.message }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
          </b-form-row>
        </div>

        <div v-if="form.method === 'CHECK'" class="form-group mb-0">
          <p>
            We will email you details for sending a check after you sign your
            agreement.
          </p>
        </div>

        <div v-if="form.method === 'WIRE'" class="form-group mb-0">
          <p>
            We will email you details for sending a wire transfer after you sign
            your agreement.
          </p>
        </div>

        <div v-if="form.method === 'CRYPTO'" class="form-group mb-0"></div>
      </div>
    </section>

    <!-- Input: attestations -->
    <section
      v-if="validatedForm.methodDetails.valid"
      class="card bg-light mb-3"
    >
      <div class="container">
        <b-form-group
          class="mb-0"
          label="Finally, the following must be agreed upon:"
          label-class="font-weight-bold pt-3"
          label-cols-lg="6"
          label-size="lg"
        >
          <b-form-checkbox
            v-model="form.attestations[0]"
            value="The investor acknowledged a potential 100% loss on all investments into this company via Wunderfund's technology."
            class="py-2"
            switch
          >
            I understand that startups and small businesses are very risky. I
            acknowledge a potential 100% loss on all investments into this
            particular company, using Wunderfund's technology.
          </b-form-checkbox>
          <b-form-checkbox
            v-model="form.attestations[1]"
            value="The investor acknowledged the fact that securities sold on this platform are not easily resold."
            class="py-2"
            switch
          >
            I understand securities created via Wunderfund's technology are not
            easily resold. There is no secondary market for these particular
            securities offered.
          </b-form-checkbox>
          <b-form-checkbox
            v-model="form.attestations[2]"
            value="The investor acknowledged an understanding of crowdfunding."
            class="py-2"
            switch
          >
            I am savvy enough to understand the subject of crowdfunding. I have
            contacted the company (or posted in the comments) with any questions
            I may have before starting this commitment process.
          </b-form-checkbox>
          <b-form-checkbox
            v-model="form.attestations[3]"
            value="The investor acknowledged having the sophistication and education to evaluate this investment."
            class="py-2"
            switch
          >
            I understand that this platform (and the team behind it) cannot
            offer investment advice. I must have the sophistication and
            education necessary to evaluate investments on my own.
          </b-form-checkbox>
          <b-form-checkbox
            v-model="form.attestations[4]"
            value="The investor acknowledged accurate information regarding their personal identity (or the entity they represent)."
            class="py-2"
            switch
          >
            <span>
              I acknowledge that the information
              {{
                isEntity
                  ? "I have provided regarding the entity I represent"
                  : "regarding my personal identity"
              }}
              is true to my knowledge.
            </span>
          </b-form-checkbox>
        </b-form-group>
      </div>
    </section>

    <!-- Input: testimonial -->
    <section v-if="valid" class="card bg-light mb-3">
      <div class="container">
        <b-form-group
          label="*Optionally*, would you also be willing to tell us your reason for investing in this company?"
          label-class="font-weight-bold"
          label-for="testimonial"
          class="my-3"
        >
          <b-form-textarea
            id="testimonial"
            v-model="form.testimonial"
            placeholder="Enter something here"
            rows="4"
            class="mt-md-3"
          />
        </b-form-group>
      </div>
    </section>
  </form>
</template>

<script>
import { TheMask } from "vue-the-mask";
import VueNumeric from "vue-numeric";
import BrandIcon from "@/components/Common/BrandIcon";
import { months } from "./choices";
import {
  investmentForm,
  isFormValid,
  validateAchAccount,
  validateAchRouting,
  validateCardName,
  validateCardNumber,
  validateExpiryMonth,
  validateExpiryYear,
  validateCVV,
} from "./form";

export default {
  components: {
    TheMask,
    VueNumeric,
    BrandIcon,
  },
  props: {
    offering: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      securityClass: null,
      form: {
        amount: 0,
        method: null,
        methodDetails: {},
        attestations: [],
        testimonial: null,
      },
      months,
    };
  },
  computed: {
    years: () => {
      const yearList = [];
      const thisYear = new Date().getFullYear();

      for (let index = thisYear; index < thisYear + 10; index++) {
        yearList.push({ value: String(index - 2000), text: index });
      }

      return yearList;
    },
    canInvest: () => false,
    validatedForm() {
      const user = { annualIncome: 0, netWorth: 0, isEntity: false };

      if (this.offering.security_type === "Equity") {
        if (!this.securityClass) {
          return {
            amount: { valid: false },
            method: { valid: false },
            methodDetails: { valid: false },
            attestations: { valid: false },
          };
        }

        // eslint-disable-next-line camelcase
        const { investment_minimum, pps } = this.securityClass;
        return investmentForm(
          user,
          {
            pricePerShare: pps,
            minShares: investment_minimum,
            securityType: "Equity",
          },
          this.form
        );
      } else {
        // eslint-disable-next-line camelcase
        const { minimum_investment_amount } = this.offering;
        return investmentForm(
          user,
          {
            minimumInvestmentAmount: minimum_investment_amount,
          },
          this.form
        );
      }
    },
    valid() {
      return isFormValid(this.validatedForm);
    },
    validatedAchAccount() {
      return validateAchAccount(this.form.methodDetails.account);
    },
    validatedAchRouting() {
      return validateAchRouting(this.form.methodDetails.routing);
    },
    determineCreditCard() {
      const viRegex = /^4\d{3}([-]?)\d{4}\1\d{4}\1\d{4}$/;
      const mcRegex = /^5[1-5]\d{2}([-]?)\d{4}\1\d{4}\1\d{4}$/;
      const diRegex = /^6(?:011|22(?:1(?=[-]?(?:2[6-9]|[3-9]))|[2-8]|9(?=[-]?(?:[01]|2[0-5])))|4[4-9]\d|5\d\d)([-]?)\d{4}\1\d{4}\1\d{4}$/;
      const aeRegex = /^3[47]\d{1,2}(| |-)\d{6}\1\d{6}$/;

      if (viRegex.test(this.form.methodDetails.number)) return "VI";
      else if (mcRegex.test(this.form.methodDetails.number)) return "MC";
      else if (diRegex.test(this.form.methodDetails.number)) return "DI";
      else if (aeRegex.test(this.form.methodDetails.number)) return "AE";
      else return "";
    },
    validatedCardName() {
      return validateCardName(this.form.methodDetails.name);
    },
    validatedCardNumber() {
      return validateCardNumber(this.form.methodDetails.number);
    },
    validatedExpiryMonth() {
      return validateExpiryMonth(this.form.methodDetails.month);
    },
    validatedExpiryYear() {
      return validateExpiryYear(this.form.methodDetails.year);
    },
    validatedCVV() {
      return validateCVV(this.form.methodDetails.cvv);
    },
  },
  methods: {
    commitInvestment() {
      // eslint-disable-next-line
      console.log("Form Submitted");
    },
    creditCardClasses(cc) {
      const reg = this.determineCreditCard === cc;
      const extra = reg ? "text-success" : "text-muted";
      return `mx-1 fa-lg ${extra}`;
    },
  },
};
</script>
