import Logo from '~/components/Logo'
import links from './links.json'

export default {
  components: {
    Logo
  },
  data() {
    return {
      links: links
    }
  }
}
