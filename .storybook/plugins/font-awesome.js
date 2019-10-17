import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faTwitter,
  faTwitterSquare,
  faGoogle,
  faLinkedin,
  faYoutubeSquare
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faFacebook);
library.add(faFacebookF);
library.add(faFacebookSquare);
library.add(faTwitter);
library.add(faTwitterSquare);
library.add(faGoogle);
library.add(faLinkedin);
library.add(faYoutubeSquare);
Vue.component('font-awesome-icon', FontAwesomeIcon);
