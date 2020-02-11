<template>
  <h1>Secret Page</h1>
</template>

<script>
export default {
  middleware: ["authenticated", "admin"]
};
</script>
