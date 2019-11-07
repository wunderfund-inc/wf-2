export const state = () => ({
  token: "qwerasdf"
});

export const getters = {
  isAuthenticated: state => state.token
};
