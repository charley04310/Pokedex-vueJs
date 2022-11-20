<script lang="ts">
import { usePokemonStore } from "../../stores/pokemon";
import type { Pokemon } from "../../stores/pokemon";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import fr_pokemon from "../../assets/traductions/fr_pokemon.json";
import de_pokemon from "../../assets/traductions/de_pokemon.json";
import en_pokemon from "../../assets/traductions/en_pokemon.json";
</script>

<template>
  <section class="gameplay">
    <h1>
      <b>System <em>GAME TOY</em></b> <span style="font-size: 12px">TM</span>
    </h1>

    <div
      class="bloc-navigation"
      v-if="userStore.isLanguageSelected && userStore.isLogged"
    >
      <button
        class="button-navigation"
        :disabled="!pokemon.prevButtonIsVisible"
        @click="
          pokemon.fetchPokemonFromLanguage(
            urlPrevious,
            language,
            NAVIGATION.PREVIOUS
          )
        "
      >
        <img src="src/assets/img/arrow_left.svg" alt="flèche de gauche" />
      </button>
      <input
        type="search"
        v-model="filterText"
        name="getPokemon"
        id="search"
        :placeholder="CHERCHER_UN_POKEMON"
      />
      <button
        class="button-navigation"
        :disabled="!pokemon.nextButtonIsVisible"
        @click="
          pokemon.fetchPokemonFromLanguage(urlNext, language, NAVIGATION.NEXT)
        "
      >
        <img src="src/assets/img/arrow_right.svg" alt="flèche de droite" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  NAVIGATION,
  LANGUAGE,
  TRADUCTION_FR,
  TRADUCTION_EN,
  TRADUCTION_DE,
  TRADUCTION_ES,
  TRADUCTION_IT,
  SEARCH,
  SCREEN,
} from "../../assets/enums/enums";

const pokemon = usePokemonStore();
const userStore = useUserStore();
const { language } = storeToRefs(userStore);

const { filterText, urlPrevious, urlNext, pokemonList, pokemonCloneList } =
  storeToRefs(pokemon);

const CHERCHER_UN_POKEMON = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.CHERCHER_UN_POKEMON;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.CHERCHER_UN_POKEMON;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.CHERCHER_UN_POKEMON;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.CHERCHER_UN_POKEMON;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.CHERCHER_UN_POKEMON;
  }
});
// fonctionnalité de la bar de recherche
watch(filterText, async (search) => {
  let count = 0;
  let jsonTraduction = ref<Pokemon[]>();
  const resultSearchUser = ref<Pokemon[]>();
  // on choisi le bon fichier de traduction en fonction de la langue
  switch (language.value) {
    case LANGUAGE.ALLEMAND:
      jsonTraduction.value = de_pokemon;
      break;
    case LANGUAGE.FRANCAIS:
      jsonTraduction.value = fr_pokemon;
    case LANGUAGE.ITALIEN && LANGUAGE.ESPAGNOLE && LANGUAGE.ANGLAIS:
      jsonTraduction.value = en_pokemon;
      break;
    default:
      jsonTraduction.value = en_pokemon;
  }

  if (Number.isInteger(parseInt(search))) {
    resultSearchUser.value = jsonTraduction.value.filter((pokemon: any) => {
      return (
        pokemon.id.toString().startsWith(search.toString()) &&
        count++ < SCREEN.NBR_CARDS
      );
    });
  } else {
    resultSearchUser.value = jsonTraduction.value.filter((pokemon: any) => {
      return (
        pokemon.name
          .toLocaleLowerCase()
          .startsWith(search.toLocaleLowerCase()) && count++ < SCREEN.NBR_CARDS
      );
    });
  }

  // si la bar de recherche est vide on récupère le clone dans la Pokelist
  if (search.length === SEARCH.EMPTY_SEARCH) {
    pokemonList.value = pokemonCloneList.value;
  } else {
    pokemonList.value = resultSearchUser.value;
  }
});
</script>

<style lang="css" scoped>
h1 {
  color: #24346e;
  text-align: left;
  margin-top: 0.5rem;
}
.gameplay {
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 0 auto;
  text-align: center;
}
#search {
  padding-left: 1rem;
  width: 50%;
  margin: 0 auto;
  margin-top: 0px;
  height: 40px;
  border-radius: 5px 2px 5px 1 px;
  border-radius: 10px;
  background: #888a96;
  color: white;
}
.bloc-navigation {
  display: flex;
  margin-top: 3rem;
  align-items: center;
}
.button-navigation {
  background: none;
  cursor: pointer;
  border: none;
  margin: 0 1rem;
  border-radius: 5px;
}
@media (min-width: 600px) {
  .gameplay {
    width: 600px;
  }
}
</style>
