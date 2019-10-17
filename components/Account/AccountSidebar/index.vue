<template lang="pug" functional>
  b-card.mb-4(no-body)
    b-list-group(flush)
      b-list-group-item(to="/u" exact-active-class="active") My Investments
      b-list-group-item(to="/u/profile" exact-active-class="active") Profile
      b-list-group-item(to="/u/accredit" exact-active-class="active") Accreditation
      b-list-group-item(to="/u/account" exact-active-class="active") Account
</template>

<script>
export default {
  functional: true
};
</script>
