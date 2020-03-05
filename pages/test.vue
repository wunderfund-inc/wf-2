<template lang="pug">
article.container
  h1.mb-4 Questions or Comments?
  section#campaign-items.mb-2
    comment-item(
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
    )
  section#campaign-form.mb-5
    comment-form(v-if="signedIn")
    p(v-else) #[nuxt-link(to="/auth/login") Log in] or #[nuxt-link(to="/auth/register") Sign up] to comment!
</template>

<script>
import CommentItem from "@/components/Campaign/CommentItem";
import CommentForm from "@/components/Campaign/CommentForm";

export default {
  components: {
    CommentItem,
    CommentForm
  },
  data() {
    return {
      signedIn: true,
      comments: [
        {
          name: {
            first: "Justin",
            last: "Chiou"
          },
          message: "Whoa! Ipsem Lorem blah blah blah.",
          approved: true,
          avatar: null,
          role: "INVESTOR",
          createdAt: 1583094227000
        },
        {
          name: {
            first: "Marvin",
            last: "Abrinica"
          },
          message: "Ipsem Lorem hah hah aha!",
          approved: true,
          avatar: null,
          role: "FOUNDER",
          createdAt: 1583094327000
        }
      ]
    };
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
