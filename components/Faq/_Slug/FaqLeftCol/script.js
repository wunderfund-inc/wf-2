export default {
  asyncData({ route }) {
    return { slug: route.params.slug };
  }
};
