<script setup lang="ts">
import PokemonTypeVue from "../functional/Pokemon-type.vue";
import PokemonName from "../functional/Pokemon-name.vue";
</script>

<template>
  <div class="pokemon-info">
    <PokemonName />
    <PokemonTypeVue />
  </div>
</template>

<style scoped>
div.pokemon-info {
  margin: 0 1rem;
}
@media (min-width: 1024px) {
}
</style>
