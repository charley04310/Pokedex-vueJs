<script setup lang="ts">
import Header_component from "./components/layout/Header.vue";
import Carrousel from "./components/modules/carrousel/Carrousel.vue";
</script>

<template>
  <header>
    <Header_component />
  </header>

  <main>
    <Carrousel />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
