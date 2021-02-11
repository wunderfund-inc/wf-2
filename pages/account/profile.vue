<template>
  <main class="container py-5">
    <h1 class="text-center mb-5">Account</h1>
    <div class="row justify-content-center">
      <article class="col-12 col-md-9 mb-3">
        <div class="card bg-light mb-4">
          <h4 class="card-body pb-0">Heads Up!</h4>
          <p class="card-body mb-0 py-0">Description of why we need this</p>
          <hr />
          <div class="card-body">
            <ProfileForm :user="user" />
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<script>
import ProfileForm from "@/components/ProfileForm";
import { db } from "../../plugins/firebase";

export default {
  middleware: ["authenticated"],
  components: {
    ProfileForm,
  },
  async asyncData({ store }) {
    try {
      const { userId } = store.state.auth;
      const userDocument = await db.collection("users").doc(userId).get();
      const userData = userDocument.data();
      return { user: userData };
    } catch (error) {
      throw new Error(error);
    }
  },
};
</script>
