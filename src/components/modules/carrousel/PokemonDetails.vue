<template>
  <nav>
    <aside>
      <img
        v-if="pokemonStore.pokemonDetails.image != null"
        v-bind:src="pokemonStore.pokemonDetails.image"
        alt=""
      />
    </aside>
    <article>
      <section>
        <div>
          <p v-html="pokemonStore.pokemonDetails.description"></p>
        </div>
        <div>
          <h2>Abilities</h2>
          <ul>
            <slot v-for="pokemonType in pokemonStore.pokemonDetails.type">
              <li v-html="pokemonType"></li>
            </slot>
          </ul>
          <p v-html="`${pokemonStore.pokemonDetails.poids} kg`"></p>
          <p v-html="`${pokemonStore.pokemonDetails.taille} m`"></p>
        </div>
      </section>
    </article>
  </nav>
  <button @click="emit('onClickCloseDetails')">FERMER</button>
</template>
<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemon";
const pokemonStore = usePokemonStore();

const emit = defineEmits<{
  (e: "onClickCloseDetails"): void;
}>();
</script>

<style scoped>
@media (min-width: 1024px) {
}
</style>
