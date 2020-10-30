<template>
  <b-media v-if="comment.approved" class="comment">
    <template v-slot:aside>
      <b-avatar
        :src="comment.avatar || require(`@/assets/logo/wf-circle.png`)"
      />
    </template>
    <article class="pb-3">
      <section>
        <h5 class="my-0">
          <strong>
            {{ comment.name.first }} {{ comment.name.last | firstLetterOnly }}.
          </strong>
        </h5>
        <b-badge v-if="comment.role" :variant="roleColors(comment.role)">
          <small>{{ comment.role }}</small>
        </b-badge>
        <small class="font-italic text-muted">
          {{ fromNow(comment.createdAt) }} ago
        </small>
        <p class="mb-0">{{ comment.message }}</p>
      </section>
    </article>
  </b-media>
</template>

<script>
import { formatDistanceToNow } from "date-fns";

export default {
  name: "CommentItem",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      toggleForm: false,
    };
  },
  computed: {
    hasAvatar() {
      return this.comment.avatar;
    },
  },
  methods: {
    displayForm() {
      this.toggleForm = !this.toggleForm;
    },
    fromNow(dateCreated) {
      return formatDistanceToNow(
        new Date(0).setUTCSeconds(dateCreated.seconds)
      );
    },
    roleColors(role) {
      switch (role) {
        case "FOUNDER":
          return "success";
        case "EMPLOYEE":
          return "warning";
        case "PROMOTER":
          return "danger";
        default:
          return "info";
      }
    },
  },
};
</script>

<style scoped>
.comment-avatar {
  border-radius: 15px;
}
.button--cancel {
  text-decoration: none;
}
</style>
