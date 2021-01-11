<template>
  <form class="form" @submit.prevent="commitInvestment"></form>
</template>

<script>
/*
Validation TODOs:
- [ ] amount
- [ ] method
- [ ] method details
- [x] attestations

interface ValidationResult {
  valid: boolean;
  message?: string;
}

interface InvestmentFormValidity {
  amount: ValidationResult;
  method: ValidationResult;
  methodDetails: ValidationResult;
  attestations: ValidationResult;
  testimonial?: ValidationResult;
}
*/

export default {
  data() {
    return {
      form: {
        amount: 0,
        method: null,
        methodDetails: null,
        attestations: [false, false, false, false, false],
        testimonial: null,
      },
    };
  },
  methods: {
    commitInvestment() {
      // eslint-disable-next-line
      console.log("Form Submitted");
    },
  },
};
</script>
