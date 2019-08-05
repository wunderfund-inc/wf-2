import Logo from '../Logo'
import ButtonLink from '../ButtonLink'

export default {
  components: {
    Logo,
    ButtonLink
  },
  data() {
    return {
      links: [
        {
          linkClass: 'button--green',
          title: 'Documentation',
          url: 'https://nuxtjs.org'
        },
        {
          linkClass: 'button--grey',
          title: 'Github',
          url: 'https://github.com/nuxt/nuxt.js'
        }
      ]
    }
  }
}
