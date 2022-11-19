<template>
  <nav class="pokemon-details-navigation">
    <section class="header-details-pokemon">
      <button class="close-button" @click="emit('onClickCloseDetails')">
        <i class="fa fa-arrow-left"></i> retour
      </button>
    </section>

    <aside>
      <section class="section-pokemon-aside">
        <img
          v-if="pokemonStore.pokemonDetails.image != null"
          class="pokemon-image"
          v-bind:src="pokemonStore.pokemonDetails.image"
          :alt="`Ce pokemon est : ${pokemonStore.pokemonDetails.name}`"
        />
      </section>

      <section class="section-pokemon-aside">
        <h2>NOM</h2>
        <p v-html="pokemonStore.pokemonDetails.name"></p>
      </section>
      <section class="section-pokemon-aside">
        <h2>TYPE</h2>
        <ul class="list-type-pokemon">
          <slot v-for="pokemonType in pokemonStore.pokemonDetails.type">
            <li v-html="`#${pokemonType}`"></li>
          </slot>
        </ul>
      </section>
    </aside>
    <article>
      <section>
        <div>
          <h2>MORPHOLOGIE</h2>
          <p
            class="description-pokemon"
            v-html="
              `POIDS : [${pokemonStore.pokemonDetails.poids} kg] TAILLE : [${pokemonStore.pokemonDetails.taille} m]`
            "
          ></p>
        </div>
      </section>
      <section>
        <div>
          <h2>STATS</h2>
          <ul class="list-type-pokemon">
            <slot v-for="pokemonStat in pokemonStore.pokemonDetails.stats">
              <li v-html="Pokemonstats(pokemonStat)"></li>
            </slot>
          </ul>
        </div>
      </section>
      <section>
        <h2>DESCRIPTION</h2>
        <p
          class="description-pokemon"
          v-html="pokemonStore.pokemonDetails.description"
        ></p>
      </section>
    </article>
  </nav>
</template>
<script setup lang="ts">
import { usePokemonStore } from "@/stores/pokemon";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const pokemonStore = usePokemonStore();

const Pokemonstats = (pokemonStat: any) => {
  if (pokemonStat.name && pokemonStat.stat) {
    return `${pokemonStat.name} : [${pokemonStat.stat}] `;
  }
};

const emit = defineEmits<{
  (e: "onClickCloseDetails"): void;
}>();
</script>

<style scoped>
h2 {
  background-color: rgba(136, 138, 150, 0.46);
  padding: 0.25rem 0.5rem;
  color: white;
}
aside {
  display: flex;
  align-items: top;
}
.header-details-pokemon {
  color: rgba(128, 128, 128, 0.44);
  width: 100%;
}
.close-button {
  color: #fff;
  text-align: center;
  background: none;
  border: 0px;
  cursor: pointer;
  width: 80px;
  padding-bottom: 5px;
}
.pokemon-image {
  margin: 0 1rem;
}
.pokemon-details-navigation {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}
.section-pokemon-aside {
  width: 33.33%;
}
.section-pokemon-aside p,
.section-pokemon-aside li,
.list-type-pokemon li {
  padding: 0.25rem 0.5rem;
}
.list-type-pokemon {
  justify-content: start;
  width: 100%;
}

.description-pokemon {
  padding: 0.5rem;
}

@media (min-width: 1024px) {
}
</style>
