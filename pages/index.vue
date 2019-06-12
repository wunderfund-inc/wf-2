<template>
  <section class="container">
    <div>
      <logo />
      <h1 class="title">Wunderfund 2.0</h1>
      <h2 class="subtitle">The next iteration of Wunderfund</h2>
      <div class="links">
        <button-link
          v-for="(link, index) in links"
          :key="index"
          :link-classes="link.linkClass"
          :url="link.url"
          :title="link.title"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo'
import ButtonLink from '~/components/ButtonLink'

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
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
