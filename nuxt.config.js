// import Prismic from "prismic-javascript";

// const endpoint = "https://wunderfund.cdn.prismic.io/api/v2";

// const dynamicRoutes = async () => {
//   try {
//     const api = await Prismic.getApi(endpoint);
//     const campaigns = await api.query(
//       Prismic.Predicates.at("document.type", "campaign")
//     );
//     return campaigns.results.map((campaign) => `/${campaign.uid}`);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Wunderfund",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Montserrat:200,300,400",
      },
    ],
  },

  // Customize the progress-bar color
  loading: { color: "#c89f5c" },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/main.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~helpers/filters", "~plugins/firebase"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  pageTransition: "page",

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://axios.nuxtjs.org/
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://prismic.nuxtjs.org/
    "@nuxtjs/prismic",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    [
      "nuxt-fontawesome",
      {
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: [
              "faMapMarkerAlt",
              "faLink",
              "faFilePdf",
              "faMinusCircle",
              "faEnvelopeSquare",
            ],
          },
          {
            set: "@fortawesome/free-brands-svg-icons",
            icons: [
              "faFacebook",
              "faFacebookF",
              "faFacebookSquare",
              "faInstagram",
              "faLinkedin",
              "faTwitter",
              "faTwitterSquare",
              "faYoutube",
              "faYoutubeSquare",
              "faGoogle",
              "faCcVisa",
              "faCcMastercard",
              "faCcDiscover",
            ],
          },
        ],
      },
    ],
  ],
  prismic: {
    endpoint: "https://wunderfund.cdn.prismic.io/api/v2",
  },
  // https://go.nuxtjs.dev/axios
  axios: {},
  // Environment Variables
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    PLATFORM: process.env.PLATFORM,
  },
  privateRuntimeConfig: {},
  /*
   ** Build configuration
   */
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    ["@nuxtjs/google-analytics", { id: "UA-140072604-1" }],
  ],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.vue = "vue/dist/vue.common";
    },
  },
  // generate: {
  //   routes: dynamicRoutes,
  //   fallback: "404.html",
  // },
};
