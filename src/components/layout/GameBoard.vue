<script lang="ts">
import { usePokemonStore } from "../../stores/pokemon";
import type { Pokemon } from "../../stores/pokemon";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import fr_pokemon from "../../assets/traductions/fr_pokemon.json";
import de_pokemon from "../../assets/traductions/de_pokemon.json";
import en_pokemon from "../../assets/traductions/en_pokemon.json";
</script>

<template>
  <section class="gameplay">
    <h1><b>System GAME TOY</b> <span>TM</span></h1>

    <div
      class="bloc-navigation"
      v-if="userStore.isLanguageSelected && userStore.isLogged"
    >
      <button
        class="button-navigation"
        :disabled="!pokemon.prevButtonIsVisible"
        @click="pokemon.fetchPokemonFromLanguage(urlPrevious, language, 0)"
      >
        <img src="src/assets/img/arrow_left.svg" alt="flèche de droite" />
      </button>
      <input
        type="search"
        v-model="filterText"
        name="getPokemon"
        id="search"
        placeholder="Chercher pour un pokemon"
      />
      <button
        class="button-navigation"
        :disabled="!pokemon.nextButtonIsVisible"
        @click="pokemon.fetchPokemonFromLanguage(urlNext, language, 1)"
      >
        <img src="src/assets/img/arrow_right.svg" alt="flèche de gauche" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const pokemon = usePokemonStore();
const userStore = useUserStore();
const { language, username, isLanguageSelected } = storeToRefs(userStore);

const { filterText, urlPrevious, urlNext, pokemonList, pokemonCloneList } =
  storeToRefs(pokemon);

// fonctionnalité de la bar de recherche
watch(filterText, async (search) => {
  let count = 0;
  let jsonTraduction = ref<Pokemon[]>();

  // on choisi le bon fichier de traduction en fonction de la langue
  switch (language.value) {
    case "de":
      jsonTraduction.value = de_pokemon;
      break;
    case "fr":
      jsonTraduction.value = fr_pokemon;
    case "it" && "es" && "en":
      jsonTraduction.value = en_pokemon;
      break;
    default:
      jsonTraduction.value = en_pokemon;
  }

  // on construit le tableau en fonction de la recheche utilisateur
  const resultSearchUser = jsonTraduction.value.filter((pokemon: any) => {
    return (
      pokemon.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()) &&
      count++ < 9
    );
  });

  // si la bar de recherche est vide on récupère le clone dans la Pokelist
  if (search.length === 0) {
    pokemonList.value = pokemonCloneList.value;
  } else {
    pokemonList.value = resultSearchUser;
  }
});
("r ");
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
