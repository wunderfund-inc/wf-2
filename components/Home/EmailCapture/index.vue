<template>
  <section class="py-5 cta__section">
    <div class="container">
      <div class="row pb-3">
        <div class="col">
          <h6 class="text-center">
            Be the first to hear about investment opportunities!
          </h6>
        </div>
      </div>

      <div class="row d-flex justify-content-center">
        <div class="col-md-5">
          <transition name="fade" mode="out-in">
            <form v-if="show" @submit.prevent="subscribeUser">
              <div class="input-group">
                <input
                  v-model="$v.form.email.$model"
                  :state="validateState('email')"
                  class="form-control"
                  placeholder="Your email address"
                  type="text"
                  required
                />
                <div class="input-group-append">
                  <button
                    :disabled="$v.form.$anyError || submitting"
                    :class="`btn btn-sm btn-${color}`"
                    @click="subscribeUser"
                  >
                    <span
                      v-if="submitting"
                      class="spinner-border spinner-border-sm mr-2"
                      role="status"
                      aria-hiden="true"
                    />
                    <span v-if="submitting">Submitting...</span>
                    <span v-if="!submitting">Sign Up</span>
                  </button>
                </div>
              </div>
            </form>
            <p v-else class="text-center">
              You have subscribed to our newsletter. Thanks!
            </p>
          </transition>
          <div v-if="$v.form.email.$error" class="text-center">
            <small class="text-danger">Invalid email address.</small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { validationMixin } from "vuelidate";
import { email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: "",
      },
      submitting: false,
      show: true,
    };
  },
  validations: {
    form: {
      email: {
        email,
      },
    },
  },
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
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    async subscribeUser() {
      try {
        this.submitting = true;
        const url =
          "https://us-central1-wunderfund-server.cloudfunctions.net/newsletterOnSubscribe";
        await this.$axios.$post(url, { email: this.form.email });
        await setTimeout(() => (this.show = !this.show), 2000);
      } catch (error) {
        this.submitting = false;
        // eslint-disable-next-line
        console.error(error);
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$font: "Montserrat", sans-serif;
$color: #c89f5c;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.color {
  &__gold {
    background-color: $color;
    border: 1px solid transparent;

    &:hover,
    &:focus {
      background-color: transparent;
      border: 1px solid #ced4da;
      color: $color;
    }
  }
}

.cta {
  &__section {
    background-color: #fafbfc;
  }
}
</style>
