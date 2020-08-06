import Prismic from "prismic-javascript";

const endpoint = "https://wunderfund.cdn.prismic.io/api/v2";

const dynamicRoutes = async () => {
  try {
    const api = await Prismic.getApi(endpoint);
    const campaigns = await api.query(
      Prismic.Predicates.at("document.type", "campaign")
    );
    return campaigns.results.map(campaign => `/${campaign.uid}`);
  } catch (error) {
    throw Error(error);
  }
};

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Wunderfund",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Montserrat:200,300,400"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#c89f5c" },
  /*
   ** Global CSS
   */
  css: ["~/assets/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~helpers/filters", "~plugins/firebase"],
  pageTransition: "page",
  /*
   ** Nuxt.js modules
   */
  modules: [
    // "@/modules/static",
    // "@/modules/crawler",
    "@nuxtjs/prismic",
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "@nuxtjs/eslint-module",
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
              "faEnvelopeSquare"
            ]
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
              "faCcDiscover"
            ]
          }
        ]
      }
    ]
  ],
  prismic: {
    endpoint: "https://wunderfund.cdn.prismic.io/api/v2"
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Environment variables
   */
  env: {
    BASE_URL: process.env.BASE_URL || "http://localhost:3000",
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_ID: process.env.FIREBASE_MESSAGING_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    TAPI_CLIENT_ID: process.env.TAPI_CLIENT_ID,
    TAPI_API_KEY: process.env.TAPI_API_KEY
  },
  /*
   ** Build configuration
   */
  buildModules: [["@nuxtjs/google-analytics", { id: "UA-140072604-1" }]],
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.vue = "vue/dist/vue.common";
    }
  },
  generate: {
    routes: dynamicRoutes,
    fallback: "404.html"
  }
};
