<template lang="pug">
  main
    main-navigation
    nuxt
    main-footer
</template>

<script>
import MainNavigation from "@/components/Base/MainNavigation/index";
import MainFooter from "@/components/Base/MainFooter/index";

export default {
  components: {
    MainNavigation,
    MainFooter
  }
};
</script>

<style lang="scss">
// html {
//   font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
//     Roboto, "Helvetica Neue", Arial, sans-serif;
//   word-spacing: 1px;
//   -ms-text-size-adjust: 100%;
//   -webkit-text-size-adjust: 100%;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-font-smoothing: antialiased;
//   box-sizing: border-box;
//   margin: 0;
//   *,
//   *:before,
//   *:after {
//     box-sizing: border-box;
//     margin: 0;
//   }
//   #nuxt-loading.error > div {
//     border-left: 0.5rem solid #c89f5c;
//   }
//   h1 {
//     font-family: "Montserrat";
//     font-size: 60px;
//     font-weight: 300;
//     color: #272727;
//   }
//   h2 {
//     font-family: "Montserrat";
//     font-size: 50px;
//     font-weight: 200;
//     color: #272727;
//   }
//   h3 {
//     font-family: "Montserrat";
//     font-size: 35px;
//     font-weight: 400;
//     color: #272727;
//   }
//   h4 {
//     font-family: "Montserrat";
//     font-size: 24px;
//     font-weight: 400;
//     color: #272727;
//   }
//   h5 {
//     font-family: "Montserrat";
//     font-size: 19px;
//     font-weight: 300;
//     color: #272727;
//   }
//   h6 {
//     font-family: "Montserrat";
//     font-size: 16px;
//     font-weight: 300;
//     color: #272727;
//   }
//   p {
//     font-family: "Montserrat";
//     font-size: 12px;
//     font-weight: 400;
//     color: #272727;
//   }
//   ::selection {
//     background: #c89f5c;
//     color: white;
//   }
//   .form-control {
//     font-family: "Montserrat";
//     height: 50px;
//     font-size: 14px;
//     color: #494949;
//     font-weight: 300;
//     width: 300px;
//     border-radius: 3px;
//   }
//   a.blueLink {
//     color: #003b5a;
//   }
// }
// @media (max-width: 768px) {
//   html {
//     h1 {
//       font-size: 45px;
//     }
//     h2 {
//       font-size: 36px;
//     }
//     h3 {
//       font-size: 28px;
//     }
//     h4 {
//       font-size: 22px;
//     }
//     h5 {
//       font-size: 16px;
//     }
//     h6 {
//       font-size: 14px;
//     }
//     p {
//       font-size: 13px;
//     }
//   }
// }
// @media (max-width: 540px) {
//   html {
//     h1 {
//       font-family: "Montserrat";
//       font-size: 30px;
//     }
//     h2 {
//       font-size: 24px;
//     }
//     h3 {
//       font-size: 20px;
//     }
//     h4 {
//       font-size: 18px;
//     }
//     h5 {
//       font-size: 14px;
//     }
//     h6 {
//       font-size: 12px;
//     }
//     p {
//       font-size: 11px;
//     }
//   }
// }
</style>
