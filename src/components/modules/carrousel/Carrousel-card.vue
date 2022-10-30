<script lang="ts">
import PokemonFigure from "./functional/Pokemon-figure.vue";
import PokemonInfo from "./functional/Pokemon-dial-info.vue";
</script>
<template>
  <section>
    <ul>
      <!-- --------------------      on met les datas en brut ------------------------>
      <li>
        <PokemonFigure />
        <PokemonInfo />
      </li>
      <!-- --------------------      on met les datas en brut ------------------------>
      <li>
        <PokemonFigure />
        <PokemonInfo />
      </li>
      <!-- --------------------      on met les datas en brut ------------------------>
      <li>
        <PokemonFigure />
        <PokemonInfo />
      </li>
      <!-- --------------------      on met les datas en brut ------------------------>

      <li>
        <PokemonFigure />
        <PokemonInfo />
      </li>
      <!-- --------------------      on met les datas en brut ------------------------>
    </ul>
  </section>
</template>

<script setup lang="ts">
const pokemon = 0;
</script>

<style scoped>
ul {
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
li {
  list-style: none;
  margin: 0.5rem 0.25rem;
}

@media (min-width: 1024px) {
}
</style>
