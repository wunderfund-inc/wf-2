module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: [
    "@nuxtjs",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
  ],
  settings: {
    // pnpm's symlinked layout breaks import/named's parsing of firebase's re-exports
    "import/ignore": ["firebase"],
  },
  plugins: ["prettier"],
  // add your custom rules here
  rules: {
    "vue/comment-directive": 0,
  },
};
