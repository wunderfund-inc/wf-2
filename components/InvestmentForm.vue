<template>
  <div class="container">
    <div class="row justify-content-center">
      <article class="col-md-8">
        <form novalidate class="form" @submit.prevent>
          <!-- Details about the Offering -->
          <section class="card bg-light mb-3">
            <div class="card-body">
              <h5 class="card-title font-weight-bold">
                What this company is offering:
              </h5>
              <p class="card-text">
                <template v-if="offering.security_type === 'Promissory Note'">
                  <strong>A Loan</strong> - The company will pay you back (with
                  {{ offering.interest_rate }}% interest) in equal
                  {{ offering.payment_interval.toLowerCase() }} installments
                  made over {{ offering.months_to_maturity / 12 }}
                  {{ offering.months_to_maturity === 12 ? "year" : "years" }}.
                </template>
                <template v-if="offering.security_type === 'Revenue Share'">
                  <strong>Revenue Share</strong> - The company will pay
                  {{ offering.percent_per_period }}% of
                  {{ offering.revenue_type.toLowerCase() }} revenues on
                  {{ offering.payment_interval === "Annual" ? "an" : "a" }}
                  {{ offering.payment_interval.toLowerCase() }} basis until it
                  pays off {{ `${offering.return_multiplier}x` }} the investment
                  amount.
                </template>
                <template v-if="offering.security_type === 'Convertible Note'">
                  <strong>A Convertible Note</strong> - The money you invest in
                  this company will accrue interest at a rate of
                  {{ offering.interest_rate }}% until a conversion-qualifying
                  event when the investment + interest will convert into equity
                  ownership - shares of company stock - at a
                  {{ offering.discount_rate }}% discounted share price.
                  Additionally, the conversion share price will be capped at a
                  maximum of {{ offering.price_per_share | asCurrency }}/share
                  for investors that participate.
                </template>
                <template v-if="offering.security_type === 'Equity'">
                  <strong>Equity</strong> - You will own a percentage of this
                  company, calculated as (# of Shares Invested /
                  {{ offering.securities_total | properIntegerFormat }} shares).
                </template>
                <template v-if="offering.security_type === 'SAFE Note'">
                  <strong>A SAFE Note</strong> -{{ " " }}
                  <span v-if="offering.percent_discount">
                    At the moment, your investment will give you a
                    {{ `${offering.percent_discount}%` }} discount on future
                    shares into this company.
                    <br />
                  </span>
                  It's speculated that the company will be worth more than
                  {{ offering.valuation_cap | currencyDisplayFormat }}
                  in the future.
                </template>
                <!-- <template
                  v-if="offering.security_type === 'SAFT Note'"
                ></template> -->
              </p>
            </div>
          </section>

          <!-- Input to select class of security (if Equity) -->
          <section
            v-if="
              offering.security_type === 'Equity' &&
              offering.minimum_investment_amount_tiers.length > 1
            "
            class="card bg-light mb-3"
          >
            <div class="container">
              <h5 class="card-title my-3 font-weight-bold">
                Select which class of security you want to invest in:
              </h5>

              <div class="form-row pb-2">
                <div
                  v-for="(
                    tier, index
                  ) in offering.minimum_investment_amount_tiers"
                  :key="index"
                  class="col-12 col-md-6"
                >
                  <label
                    :class="!canInvest(tier) ? 'bg-light' : ''"
                    class="card py-2 pl-1"
                  >
                    <div class="container">
                      <div class="form-row form-check-inline">
                        <b-form-radio
                          v-model="securityClass"
                          :value="tier"
                          :disabled="!canInvest(tier)"
                          class="form-check-input"
                          size="lg"
                          name="offerings"
                        >
                          <span class="form-check-label">
                            {{ tier.security_tier }}
                          </span>
                        </b-form-radio>
                        <small v-if="!canInvest(tier)" class="text-small">
                          <a v-b-toggle.collapse-invest class="mt-2 mb-3">
                            Why can't I select this one?
                          </a>
                          <b-collapse id="collapse-invest" class="pt-3">
                            <span class="text-muted">
                              This class of security requires you to invest more
                              than you've attested to be your annual limit. If
                              you're trying to invest more than the maximum
                              annual limit per user ($2,200), you will need to
                              first update your accreditation status. Please
                              update it
                              <nuxt-link to="/account/accreditation">
                                in your account.
                              </nuxt-link>
                            </span>
                          </b-collapse>
                        </small>
                      </div>

                      <div class="form-row text-muted pt-3">
                        <small>
                          Minimum number of shares needed to purchase for a
                          valid investment:
                          <strong>{{ tier.investment_minimum }}</strong>
                        </small>
                      </div>
                      <div class="form-row text-muted pt-1">
                        <small>
                          Price per share:
                          <strong>{{ tier.pps | asCurrency }}</strong>
                        </small>
                      </div>
                      <div class="form-row text-muted pt-1">
                        <small>
                          Minimum Investment:
                          <strong>
                            {{
                              (tier.pps * tier.investment_minimum) | asCurrency
                            }}
                          </strong>
                        </small>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <!-- Input either number of shares (if equity) or raw amount (else) -->
          <template v-if="offering.security_type === 'Equity' && securityClass">
            <section class="card bg-light mb-3">
              <div class="container">
                <div class="form-group mt-3">
                  <b-form-group
                    label-cols-lg="6"
                    label="Number of shares you wish to buy:"
                    label-size="lg"
                    label-class="font-weight-bold pt-0"
                    class="mb-0"
                  >
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text text-muted">
                          # Shares
                        </span>
                      </div>
                      <input
                        id="inv-amt"
                        v-model.number="form.amount"
                        type="number"
                        class="form-control text-right"
                        :step="offering.securities_min"
                        :min="offering.securities_min"
                      />
                    </div>

                    <b-form-invalid-feedback
                      :state="validatedForm.amount.valid"
                    >
                      {{ validatedForm.amount.message }}
                    </b-form-invalid-feedback>

                    <b-form-text v-if="!validatedForm.amount.valid">
                      If you're trying to invest more than the maximum annual
                      limit per user ($2,200), you will need to first update
                      your accreditation status. Please update it
                      <nuxt-link to="/account/accreditation">here,</nuxt-link>
                      in your account.
                    </b-form-text>

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
                </div>
              </div>
            </section>
          </template>
          <template v-if="offering.security_type !== 'Equity'">
            <section class="card bg-light mb-3">
              <div class="container">
                <div class="form-group mt-3">
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

                    <b-form-invalid-feedback
                      :state="validatedForm.amount.valid"
                    >
                      {{ validatedForm.amount.message }}
                    </b-form-invalid-feedback>

                    <b-form-text v-if="!validatedForm.amount.valid">
                      If you're trying to invest more than the maximum annual
                      limit per user ($2,200), you will need to first update
                      your accreditation status. Please update it
                      <nuxt-link to="/account/accreditation">here,</nuxt-link>
                      in your account.
                    </b-form-text>
                  </b-form-group>
                </div>
              </div>
            </section>
          </template>

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
                      <b-img thumbnail src="~/assets/logo/tapi_secure.png" />
                    </b-link>
                  </div>
                </div>
              </b-form-group>

              <div v-if="form.method === 'CC'">
                <hr />
                <h4 class="alert-heading pt-1">A note about credit cards:</h4>
                <p>
                  Federal Regulations limit the extent to which you can make
                  investments with borrowed money. Additionally, investing with
                  a Credit Card comes with inherent
                  <a
                    href="https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/investor-19"
                    target="_blank"
                    >risks</a
                  >
                  you should be aware of before making this investment. Because
                  of these limits, most banks have blocked the ability to use a
                  Credit Card on an Investment Crowdfunding portal, such as
                  <a href="/" target="_blank">ours</a>.
                </p>
                <p>
                  If you have issues with your Credit Card, please consider
                  another option for your investment or
                  <a href="mailto:taylor@wunderfund.co" target="_blank">
                    contact us
                  </a>
                  so we can answer your questions.
                </p>

                <h4 class="alert-heading pt-1">Also note:</h4>
                <p>
                  When investing with a credit card, please note in your bank
                  statements that it will be under the title
                  <strong>"NORTHSTAR"</strong> or
                  <strong>"NCPTLPRVTSEC"</strong> (via our
                  <a href="https://www.northcapital.com" target="_blank">
                    transfer agent
                  </a>
                  ) so you don't cancel it by mistake.
                </p>
              </div>

              <hr class="py-2" />

              <div v-if="form.method === 'ACH'" class="form-group mb-0">
                <div class="form-row">
                  <div class="col-12 col-md-6">
                    <b-form-group
                      label="Bank Routing Number"
                      label-for="ach-routing"
                    >
                      <TheMask
                        id="ach-routing"
                        v-model="form.methodDetails.routing"
                        mask="#########"
                        placeholder="123456789"
                        class="form-control"
                        type="tel"
                      />
                      <b-form-invalid-feedback
                        :state="validatedAchRouting.valid"
                      >
                        {{ validatedAchRouting.message }}
                      </b-form-invalid-feedback>
                    </b-form-group>
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
                      <b-form-invalid-feedback
                        :state="validatedAchAccount.valid"
                      >
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
                      <b-form-input
                        id="cc-name"
                        v-model="form.methodDetails.name"
                      />
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
                          <brand-icon
                            :class="creditCardClasses('VI')"
                            i="cc-visa"
                          />
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
                      <b-form-invalid-feedback
                        :state="validatedCardNumber.valid"
                      >
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
                      <b-form-invalid-feedback
                        :state="validatedExpiryMonth.valid"
                      >
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
                        <template #first>
                          <option :value="null" disabled>
                            -- Please Select --
                          </option>
                        </template>
                      </b-form-select>
                      <b-form-invalid-feedback
                        :state="validatedExpiryYear.valid"
                      >
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
                  We will email you details for sending a check after you sign
                  your agreement.
                </p>
              </div>

              <div v-if="form.method === 'WIRE'" class="form-group mb-0">
                <p>
                  We will email you details for sending a wire transfer after
                  you sign your agreement.
                </p>
              </div>

              <div
                v-if="form.method === 'CRYPTO'"
                class="form-group mb-0"
              ></div>
            </div>
          </section>

          <!-- Input: SSN (if from USA) -->
          <section
            v-if="
              offering.ssn_required &&
              validatedForm.methodDetails.valid &&
              user.country === 'USA' &&
              !user.isEntity
            "
            class="card bg-light mb-3"
          >
            <div class="container">
              <div class="form-group mt-3">
                <b-form-group
                  label-cols-lg="6"
                  label="Social Security Number:"
                  label-size="lg"
                  label-class="font-weight-bold pt-0"
                  class="mb-0"
                >
                  <TheMask
                    id="ssn"
                    v-model="form.ssn"
                    class="form-control"
                    mask="###-##-####"
                    :masked="true"
                    placeholder="###-##-####"
                    type="tel"
                  />
                  <small class="text-muted">
                    Why do we ask for this? This company requires your SSN on
                    your agreement to give you a K-1 Tax Form. This only applies
                    for people who attested to living in the United States. We
                    will never save this information, thus you will need to fill
                    this out with every investment.
                  </small>
                  <b-form-invalid-feedback
                    v-if="!validatedForm.ssn.valid"
                    :state="validatedForm.ssn.valid"
                  >
                    {{ validatedForm.ssn.message }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
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
                  I understand that startups and small businesses are very
                  risky. I acknowledge a potential 100% loss on all investments
                  into this particular company, using Wunderfund's technology.
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="form.attestations[1]"
                  value="The investor acknowledged the fact that securities sold on this platform are not easily resold."
                  class="py-2"
                  switch
                >
                  I understand securities created via Wunderfund's technology
                  are not easily resold. There is no secondary market for these
                  particular securities offered.
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="form.attestations[2]"
                  value="The investor acknowledged an understanding of crowdfunding."
                  class="py-2"
                  switch
                >
                  I am savvy enough to understand the subject of crowdfunding. I
                  have contacted the company (or posted in the comments) with
                  any questions I may have before starting this commitment
                  process.
                </b-form-checkbox>
                <b-form-checkbox
                  v-model="form.attestations[3]"
                  value="The investor acknowledged having the sophistication and education to evaluate this investment."
                  class="py-2"
                  switch
                >
                  I understand that this platform (and the team behind it)
                  cannot offer investment advice. I must have the sophistication
                  and education necessary to evaluate investments on my own.
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
                      user.isEntity
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
      </article>
      <aside class="col-md-4">
        <div style="position: sticky; top: 20px" class="mb-3">
          <b-card no-body>
            <template #header>
              <h6 class="text-center mb-0">Investment Summary</h6>
            </template>
            <b-list-group flush>
              <b-list-group-item>
                <div class="container">
                  <div class="row justify-content-between">
                    <b-card-text>
                      Investor:
                      <small><nuxt-link to="/account">(Edit)</nuxt-link></small>
                    </b-card-text>
                    <address class="mb-0 font-weight-bold">
                      {{ user.firstName }} {{ user.lastName }}

                      <template v-if="user.isEntity">
                        <small class="text-muted">, on behalf of</small>
                        <br />
                        {{ user.entityName }}
                      </template>

                      <br />
                      {{ user.street1 }}
                      <br v-if="user.street2 && user.street2.length > 0" />
                      <span v-if="user.street2">{{ user.street2 }}</span>
                      <br />
                      {{ `${user.city}, ${user.state} ${user.country}` }}
                      <br />
                      {{ user.postal }}
                    </address>
                  </div>
                </div>
              </b-list-group-item>
              <b-list-group-item>
                <div class="container">
                  <template
                    v-if="offering && offering.security_type === 'Equity'"
                  >
                    <div v-if="validatedForm.amount.valid">
                      <div class="row justify-content-between">
                        <b-card-text># Shares:</b-card-text>
                        <b-card-text>
                          <strong>{{ form.amount }}</strong>
                        </b-card-text>
                      </div>
                      <div class="row justify-content-between">
                        <b-card-text>Total Amount to Invest:</b-card-text>
                        <b-card-text>
                          <strong>
                            USD
                            {{ (form.amount * securityClass.pps) | asCurrency }}
                          </strong>
                        </b-card-text>
                      </div>
                    </div>
                  </template>

                  <template v-else>
                    <div
                      v-if="validatedForm.amount.valid"
                      class="row justify-content-between"
                    >
                      <b-card-text>Total Amount to Invest:</b-card-text>
                      <b-card-text>
                        <strong>USD {{ form.amount | asCurrency }}</strong>
                      </b-card-text>
                    </div>
                  </template>

                  <template v-if="validatedForm.method.valid">
                    <div class="row justify-content-between">
                      <b-card-text>Paying via:</b-card-text>
                      <b-card-text>
                        <strong>{{ form.method | paymentMethodFormat }}</strong>
                      </b-card-text>
                    </div>
                  </template>
                </div>
                <button
                  type="submit"
                  :disabled="!valid"
                  :class="`btn btn-block btn-${color}`"
                  @click="commitInvestment"
                >
                  Sign Agreement
                </button>
                <small class="text-muted">
                  *You will be redirected to sign your agreement.
                </small>
                <br />
                <small class="text-danger">{{ submissionError }}</small>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { TheMask } from "vue-the-mask";
import VueNumeric from "vue-numeric";
import {
  canInvest,
  investmentForm,
  isFormValid,
  validateAchAccount,
  validateAchRouting,
  validateCardName,
  validateCardNumber,
  validateExpiryMonth,
  validateExpiryYear,
  validateCVV,
  validateSSN,
} from "../helpers/form";
import { months } from "@/helpers/choices";
import BrandIcon from "@/components/BrandIcon";
import { accredited } from "@/helpers/validators";
import { db, timestamp } from "@/plugins/firebase";
import { determineCard } from "@/helpers/card";

export default {
  components: {
    TheMask,
    VueNumeric,
    BrandIcon,
  },
  props: {
    companyName: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    offering: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      securityClass: null,
      form: {
        amount: this.offering.securities_min,
        method: null,
        methodDetails: {},
        attestations: [],
        testimonial: null,
        ssn: null,
      },
      months,
      investmentId: null,
      submissionError: null,
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
    validatedForm() {
      if (this.offering.security_type === "Equity") {
        if (!this.securityClass) {
          return {
            amount: { valid: false },
            method: { valid: false },
            methodDetails: { valid: false },
            attestations: { valid: false },
            ssn: { valid: false },
          };
        }

        // eslint-disable-next-line camelcase
        const { investment_minimum, pps } = this.securityClass;
        return investmentForm(
          this.user,
          {
            pricePerShare: pps,
            minShares: investment_minimum,
            securityType: "Equity",
            ssnRequired: this.offering.ssn_required,
          },
          this.form
        );
      } else {
        return investmentForm(
          this.user,
          {
            securityType: this.offering.security_type,
            minimumInvestmentAmount: this.offering.minimum_investment_amount,
            ssnRequired: this.offering.ssn_required,
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
      return determineCard(this.form.methodDetails.number);
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
    validatedSSN() {
      if (this.offering.ssn_required) {
        return validateSSN(
          this.form.ssn,
          this.user.country,
          this.user.isEntity
        );
      }
      return { valid: true };
    },
    color() {
      switch (this.$config.PLATFORM) {
        case "WFP":
          return "success";
        case "WFH":
          return "primary";
        default:
          return "secondary";
      }
    },
  },
  created() {
    if (this.offering.security_type === "Equity") {
      if (this.offering.minimum_investment_amount_tiers.length === 1) {
        this.securityClass = this.offering.minimum_investment_amount_tiers[0];
      }
    }
  },
  methods: {
    creditCardClasses(cc) {
      const reg = this.determineCreditCard === cc;
      const extra = reg ? "text-success" : "text-muted";
      return `mx-1 fa-lg ${extra}`;
    },
    canInvest(offering) {
      return canInvest(this.user, offering);
    },
    async commitInvestment() {
      try {
        await this.$store.dispatch("agreement/showOverlay", true);
        const companyId = this.$route.params.companyId;
        const userId = this.$store.state.auth.userId;
        const user = await db.collection("users").doc(userId).get();
        const userData = user.data();
        const newInvestment = db.collection("investments").doc();
        const newInvestmentId = newInvestment.id;
        const investmentPayload = {
          campaign_id: companyId, // `wunderfund` or `spikes-beer-ice`
          company_name: this.companyName.toUpperCase(), // `WUNDERFUND`
          date_created: timestamp,
          date_updated: timestamp,
          investment_type: userData.is_entity ? "ENTITY" : "PERSONAL",
          investment_agreement_id: null,
          investment_amount_type:
            this.offering.security_type === "Equity" ? "SHARES" : "RAW", // `RAW` or `SHARES`
          investment_amount: this.form.amount,
          investment_method: this.form.method, // `ACH`, `CC`, `CHECK`, `WIRE`, `CRYPTO`
          investment_attestations: this.form.attestations,
          offering_details: this.offering, // typeof {}
          offering_id: this.offering.id,
          tapi_offering_id: this.offering.transact_api_offering_id,
          tapi_trade_id: null,
          uid: newInvestmentId,
          user_accredited: accredited(
            userData.accredited_ai,
            userData.accredited_nw
          ),
          user_testimonial: this.form.testimonial, // typeof string
          user_id: this.$store.state.auth.userId,
          user_email: this.$store.state.auth.email,
          user_first_name: userData.first_name,
          user_last_name: userData.last_name,
          user_avatar: userData.avatar || null,
          user_tapi_account_id: userData.transact_api_account_id,
          user_ssn: this.form.ssn,
          user_phone: userData.phone,
        };

        if (this.form.method === "ACH") {
          investmentPayload.method_details = {
            ach_account: this.form.methodDetails.account,
            ach_routing: this.form.methodDetails.routing,
          };
        } else if (this.form.method === "CC") {
          investmentPayload.method_details = {
            cc_name: this.form.methodDetails.name,
            cc_number: this.form.methodDetails.number,
            cc_expiry_month: this.form.methodDetails.month,
            cc_expiry_year: this.form.methodDetails.year,
            cc_cvv: this.form.methodDetails.cvv,
          };
        } else if (this.form.method === "CRYPTO") {
          investmentPayload.method_details = {
            crypto_address: this.form.methodDetails.address,
          };
        }

        await newInvestment.set(investmentPayload);
        this.investmentId = newInvestmentId;

        const domain = "https://ecf-api.vercel.app/api";
        const endpoint = "getSubscriptionAgreement";

        const payload = {
          investment_id: this.investmentId,
          ssn: this.form.ssn,
        };

        const { agreementUrl } = await this.$axios.$post(
          `${domain}/${endpoint}`,
          payload
        );
        await window.location.replace(agreementUrl);
      } catch (error) {
        this.submissionError = error.message;
        await this.$store.dispatch("agreement/showOverlay", false);
      }
    },
  },
};
</script>
