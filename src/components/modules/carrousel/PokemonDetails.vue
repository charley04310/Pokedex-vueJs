<template>
  <nav class="pokemon-details-navigation">
    <section class="header-details-pokemon">
      <button class="close-button" @click="emit('onClickCloseDetails')">
        <i class="fa fa-arrow-left"></i>
      </button>
    </section>

    <aside>
      <section class="section-pokemon-aside">
        <img
          v-if="pokemonStore.pokemonDetails.image != null"
          class="pokemon-image"
          v-bind:src="pokemonStore.pokemonDetails.image"
          :alt="`${POKEMON_CONSULTE} ${pokemonStore.pokemonDetails.name}`"
        />
      </section>

      <section class="section-pokemon-aside">
        <h2>{{ TITRE_NOM }}</h2>
        <p v-html="pokemonStore.pokemonDetails.name"></p>
      </section>
      <section class="section-pokemon-aside">
        <h2>{{ TITRE_TYPE }}</h2>
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
          <h2>{{ TITRE_MORPHOLOGIE }}</h2>
          <p
            class="description-pokemon"
            v-html="
              `${POKEMON_POIDS} : [${pokemonStore.pokemonDetails.poids} kg] ${POKEMON_TAILLE}: [${pokemonStore.pokemonDetails.taille} m]`
            "
          ></p>
        </div>
      </section>
      <section>
        <div>
          <h2>{{ TITRE_STATS }}</h2>
          <ul class="list-type-pokemon">
            <slot v-for="pokemonStat in pokemonStore.pokemonDetails.stats">
              <li v-html="Pokemonstats(pokemonStat)"></li>
            </slot>
          </ul>
        </div>
      </section>
      <section>
        <h2>{{ TITRE_DESCRIPTION }}</h2>
        <p
          class="description-pokemon"
          v-html="pokemonStore.pokemonDetails.description"
        ></p>
      </section>
    </article>
  </nav>
</template>
<script setup lang="ts">
import {
  LANGUAGE,
  TRADUCTION_DE,
  TRADUCTION_EN,
  TRADUCTION_ES,
  TRADUCTION_FR,
  TRADUCTION_IT,
} from "@/assets/enums/enums";
import { usePokemonStore } from "@/stores/pokemon";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const userStore = useUserStore();
const pokemonStore = usePokemonStore();

const { language } = storeToRefs(userStore);

const POKEMON_CONSULTE = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.POKEMON_CONSULTE;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.POKEMON_CONSULTE;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.POKEMON_CONSULTE;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.POKEMON_CONSULTE;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.POKEMON_CONSULTE;
  }
});
const TITRE_NOM = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.TITRE_NOM;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.TITRE_NOM;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.TITRE_NOM;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.TITRE_NOM;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.TITRE_NOM;
  }
});
const TITRE_TYPE = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.TITRE_TYPE;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.TITRE_TYPE;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.TITRE_TYPE;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.TITRE_TYPE;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.TITRE_TYPE;
  }
});
const TITRE_MORPHOLOGIE = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.TITRE_MORPHOLOGIE;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.TITRE_MORPHOLOGIE;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.TITRE_MORPHOLOGIE;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.TITRE_MORPHOLOGIE;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.TITRE_MORPHOLOGIE;
  }
});
const TITRE_STATS = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.TITRE_STATS;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.TITRE_STATS;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.TITRE_STATS;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.TITRE_STATS;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.TITRE_STATS;
  }
});
const TITRE_DESCRIPTION = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.TITRE_DESCRIPTION;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.TITRE_DESCRIPTION;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.TITRE_DESCRIPTION;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.TITRE_DESCRIPTION;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.TITRE_DESCRIPTION;
  }
});
const POKEMON_POIDS = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.POKEMON_POIDS;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.POKEMON_POIDS;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.POKEMON_POIDS;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.POKEMON_POIDS;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.POKEMON_POIDS;
  }
});
const POKEMON_TAILLE = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.POKEMON_TAILLE;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.POKEMON_TAILLE;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.POKEMON_TAILLE;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.POKEMON_TAILLE;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.POKEMON_TAILLE;
  }
});
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
  width: 40px;
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
