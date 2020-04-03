<template>
  <main class="container py-5">
    <h1 class="text-center pb-5">
      Fill out your address before we get started.
    </h1>
    <section>
      <div class="row">
        <article class="col-12">
          <b-card>
            <address-form />
          </b-card>
        </article>
      </div>
    </section>
  </main>
</template>

<script>
import AddressForm from "@/components/Form/Profile/AddressForm";

export default {
  components: { AddressForm }
};
</script>
