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
    <input
      type="search"
      v-model="filterText"
      name="getPokemon"
      id="search"
      placeholder="Chercher pour un pokemon"
    />
    <div
      class="button-navigation"
      v-if="userStore.isLanguageSelected && userStore.isLogged"
    >
      <button
        :disabled="!pokemon.prevButtonIsVisible"
        @click="pokemon.fetchPokemonFromLanguage(urlPrevious, language, 0)"
      >
        PREVIOUUUS
      </button>
      <button
        :disabled="!pokemon.nextButtonIsVisible"
        @click="pokemon.fetchPokemonFromLanguage(urlNext, language, 1)"
      >
        NEEEEXT
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
const pokemon = usePokemonStore();
const userStore = useUserStore();
const { language } = storeToRefs(userStore);

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

<style lang="css">
.gameplay {
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 0 auto;
}
#search {
  padding-left: 1rem;
  width: 50%;
  margin: 0 auto;
  margin-top: 0px;
  margin-top: 1rem;
  height: 40px;
  border-radius: 5px 2px 5px 1 px;
  border-radius: 10px;
  background: gray;
}
@media (min-width: 600px) {
  .gameplay {
    width: 600px;
  }
}
</style>
