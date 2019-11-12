export default {
  computed: {
    passwordOld: {
      get() {
        return this.$store.getters["user/passwordOld"];
      },
      set(val) {
        this.$store.commit("user/SET_OLD_PASSWORD", val);
      }
    },
    passwordNew: {
      get() {
        return this.$store.getters["user/passwordNew"];
      },
      set(val) {
        this.$store.commit("user/SET_NEW_PASSWORD", val);
      }
    }
  }
};
