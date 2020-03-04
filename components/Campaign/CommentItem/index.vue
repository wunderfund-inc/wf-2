<template>
  <b-media v-if="comment.approved" class="comment">
    <b-img
      slot="aside"
      :blank="!hasAvatar"
      :src="comment.avatar"
      blank-color="#ccc"
      width="48"
      height="48"
      alt="placeholder"
      class="comment-avatar"
    />
    <article class="pb-3">
      <section>
        <h5 class="my-0">
          <strong>{{ `${comment.name.first} ${comment.name.last}` }}</strong>
        </h5>
        <small class="font-italic text-muted">
          {{ fromNow(comment.createdAt) }} ago
        </small>
        <b-badge v-if="comment.role" variant="secondary">
          <small>{{ comment.role }}</small>
        </b-badge>
        <p class="mb-0">{{ comment.message }}</p>
      </section>
      <div class="row">
        <div class="col">
          <small>
            <b-link @click="displayForm" class="text-muted">
              {{ toggleForm ? "Never Mind" : "Reply" }}
            </b-link>
          </small>
        </div>
      </div>
      <comment-form v-if="toggleForm" />
    </article>
    <div v-if="comment.replies.length > 0">
      <comment-item
        v-for="(reply, index) in comment.replies"
        :key="index"
        :comment="reply"
      />
    </div>
    <!-- <div v-if="!toggleForm" class="comment-form">
      <b-button
        v-show="!toggleForm"
        variant="light"
        size="sm"
        @click="toggleForm = !toggleForm"
      >
        Reply
      </b-button>
    </div>
    <campaign-comment-form v-if="toggleForm">
      <template v-slot:button-title>
        Reply
      </template>
      <b-button
        class="button--cancel"
        variant="link"
        size="sm"
        @click="toggleForm = !toggleForm"
      >
        Cancel
      </b-button>
    </campaign-comment-form>
    <div v-if="comment.replies && comment.replies.length">
      <comment v-for="reply in comment.replies" :key="reply.id" :comment="reply" />
    </div> -->
  </b-media>
</template>

<script>
import { formatDistanceToNow } from "date-fns";
import CommentItem from "@/components/Campaign/CommentItem";
import CommentForm from "@/components/Campaign/CommentForm";

export default {
  name: "CommentItem",
  components: {
    CommentItem,
    CommentForm
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      toggleForm: false
    };
  },
  computed: {
    hasAvatar() {
      return this.comment.avatar;
    }
  },
  methods: {
    displayForm() {
      this.toggleForm = !this.toggleForm;
    },
    fromNow(dateCreated) {
      // return formatDistance(subDays(new Date(), dateCreated), );
      return formatDistanceToNow(dateCreated);
    }
  }
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
