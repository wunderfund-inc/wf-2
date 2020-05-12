<template>
  <section>
    <div class="form-row">
      <div class="col-12">
        <b-form-group
          label="Name (as it appears on your card)"
          label-for="cc-name"
        >
          <b-form-input id="cc-name" v-model="name" />
        </b-form-group>
      </div>
    </div>
    <div class="form-row">
      <div class="col-12">
        <b-form-group label="Credit Card Number" label-for="cc-number">
          <the-mask
            id="cc-number"
            v-model="number"
            class="form-control"
            mask="#### #### #### ####"
            placeholder="4242 4242 4242 4242"
            type="tel"
          />
        </b-form-group>
      </div>
    </div>
    <div class="form-row">
      <div class="col-12 col-md-4">
        <b-form-group label="Expiration Month">
          <b-form-select v-model="expiryMonth">
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="month.value"
              :disabled="month.disabled"
            >
              {{ month.text }}
            </option>
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col-12 col-md-4">
        <b-form-group label="Expiration Year">
          <b-form-select :options="years" v-model="expiryYear">
            <template v-slot:first>
              <option :value="null" disabled>-- Please Select --</option>
            </template>
          </b-form-select>
        </b-form-group>
      </div>
      <div class="col-12 col-md-4">
        <b-form-group label="Security Code" label-for="cc-cvv">
          <the-mask
            id="cc-cvv"
            v-model="cvv"
            class="form-control"
            mask="####"
            placeholder="123(4)"
            type="tel"
          />
        </b-form-group>
      </div>
    </div>
  </section>
</template>

<script>
import { TheMask } from "vue-the-mask";

export default {
  components: {
    TheMask
  },
  computed: {
    name: {
      get() {
        return this.$store.state.agreement.name;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "name",
          val
        });
      }
    },
    number: {
      get() {
        return this.$store.state.agreement.number;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "number",
          val
        });
      }
    },
    expiryMonth: {
      get() {
        return this.$store.state.agreement.expiryMonth;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "expiryMonth",
          val
        });
      }
    },
    expiryYear: {
      get() {
        return this.$store.state.agreement.expiryYear;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "expiryYear",
          val
        });
      }
    },
    cvv: {
      get() {
        return this.$store.state.agreement.cvv;
      },
      set(val) {
        this.$store.dispatch("agreement/setAttribute", {
          prop: "cvv",
          val
        });
      }
    },
    months() {
      return [
        { value: null, text: "-- Please Select --", disabled: true },
        { value: "01", text: "January" },
        { value: "02", text: "February" },
        { value: "03", text: "March" },
        { value: "04", text: "April" },
        { value: "05", text: "May" },
        { value: "06", text: "June" },
        { value: "07", text: "July" },
        { value: "08", text: "August" },
        { value: "09", text: "September" },
        { value: "10", text: "October" },
        { value: "11", text: "November" },
        { value: "12", text: "December" }
      ];
    },
    years() {
      const yearList = [];
      const thisYear = new Date().getFullYear();

      for (let index = thisYear; index < thisYear + 10; index++) {
        yearList.push({ value: String(index - 2000), text: index });
      }

      return yearList;
    }
  }
};
</script>
