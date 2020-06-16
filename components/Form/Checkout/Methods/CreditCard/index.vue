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
        <div class="form-group">
          <div class="d-flex d-inline-flex align-items-top">
            <label for="cc-number">Credit Card Number</label>
            <div class="pl-3">
              <brand-icon :class="creditCardClasses('VI')" i="cc-visa" />
              <brand-icon :class="creditCardClasses('MC')" i="cc-mastercard" />
              <brand-icon :class="creditCardClasses('DI')" i="cc-discover" />
            </div>
          </div>

          <the-mask
            id="cc-number"
            v-model="number"
            class="form-control"
            mask="#### #### #### ####"
            placeholder="4242 4242 4242 4242"
            type="tel"
          />
        </div>
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
import BrandIcon from "@/components/Common/BrandIcon";

export default {
  components: {
    TheMask,
    BrandIcon
  },
  computed: {
    determineCreditCard() {
      const viRegex = /^4\d{3}([-]?)\d{4}\1\d{4}\1\d{4}$/;
      const mcRegex = /^5[1-5]\d{2}([-]?)\d{4}\1\d{4}\1\d{4}$/;
      const diRegex = /^6(?:011|22(?:1(?=[-]?(?:2[6-9]|[3-9]))|[2-8]|9(?=[-]?(?:[01]|2[0-5])))|4[4-9]\d|5\d\d)([-]?)\d{4}\1\d{4}\1\d{4}$/;

      if (viRegex.test(this.number)) return "VI";
      else if (mcRegex.test(this.number)) return "MC";
      else if (diRegex.test(this.number)) return "DI";
      else return "";
    },
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
  },
  methods: {
    creditCardClasses(cc) {
      const reg = this.determineCreditCard === cc;
      const extra = reg ? "" : "text-muted";
      return `mx-1 fa-lg ${extra}`;
    }
  }
};
</script>
