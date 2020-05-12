import Prismic from "prismic-javascript";

const endpoint = "https://wunderfund.cdn.prismic.io/api/v2";

const dynamicRoutes = async () => {
  try {
    // Get dynamic routes from Prismic-based campaigns
    const api = await Prismic.getApi(endpoint);
    const campaigns = await api.query(
      Prismic.Predicates.at("document.type", "campaign")
    );
    const campaignRoutes = campaigns.results.map(
      campaign => `/${campaign.uid}`
    );

    return campaignRoutes;
    // Get dynamic routes from FAQ data
    // const FaqList = Object.keys(FaqData.faqs);
    // const faqRoutes = FaqList.map(faq => `/faq/${faq}`);

    // return campaignRoutes.concat(faqRoutes);
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
  loading: { color: "#fff" },
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
              "faGoogle"
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
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.resolve.alias.vue = "vue/dist/vue.common";
      config.resolve.alias.autonumeric =
        "node_modules/autonumeric/dist/autoNumeric.min";
    }
  },
  generate: {
    routes: dynamicRoutes,
    fallback: "404.html"
  }
};
