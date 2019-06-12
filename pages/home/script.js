import Logo from '~/components/Logo'
import Link from '~/components/Link'
import links from './links.json'

export default {
  components: {
    Logo,
    Link
  },
  data() {
    return {
      links: links
    }
  }
}
