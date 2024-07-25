<template>
  <main>
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="text-center pb-5">Before you start investing...</h1>
          <b-jumbotron class="p-4">
            <template #lead>
              <span>You will need this information to sign an agreement.</span>
              <small>
                Please make sure you fill in this form as if you're filing your
                taxes.
              </small>
            </template>
            <hr />
            <ProfileForm :user="user" />
          </b-jumbotron>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { doc, getDoc } from "firebase/firestore/lite";
import ProfileForm from "@/components/ProfileForm";
import { db } from "@/plugins/firebase";

export default {
  components: { ProfileForm },
  middleware: ["authenticated"],
  async asyncData({ store }) {
    const userId = store.state.auth.userId;
    const snapshot = await getDoc(doc(db, `users/${userId}`));
    const user = snapshot.data();
    return { user };
  },
};
</script>
