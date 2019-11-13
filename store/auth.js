export const state = () => ({
  token: null
});

export const getters = {
  isAuthenticated: state => state.token
};
