<template>
  <ul>
    <!-- --------------------      on met les datas en brut ------------------------>
    <slot v-for="Pokemon in pokemonList">
      <li @click="emitModal(Pokemon)" class="pokemon-puce">
        <figure>
          <img
            :src="Pokemon.image"
            :alt="`${POKEMON_CONSULTE} ${Pokemon.name}`"
          />
          <p class="pokemon-id" v-html="'#' + Pokemon.id"></p>
          <p class="pokemon-name" v-html="Pokemon.name"></p>
        </figure>
      </li>
    </slot>
  </ul>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { usePokemonStore } from "../../../stores/pokemon";
import { useUserStore } from "../../../stores/user";
import { storeToRefs } from "pinia";
import type { Pokemon } from "../../../stores/pokemon";
import {
  LANGUAGE,
  TRADUCTION_DE,
  TRADUCTION_EN,
  TRADUCTION_ES,
  TRADUCTION_FR,
  TRADUCTION_IT,
} from "@/assets/enums/enums";

const emit = defineEmits<{
  (e: "onClickOpenDetailsScreen", value: Pokemon): void;
}>();

const pokemonStore = usePokemonStore();
const userStore = useUserStore();
const { pokemonList, currentUrl } = storeToRefs(pokemonStore);
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
onMounted(() => {
  if (pokemonList.value.length === 0) {
    pokemonStore.fetchPokemonFromLanguage(currentUrl.value, language.value);
  }
});
function emitModal(value: Pokemon) {
  emit("onClickOpenDetailsScreen", value);
}
</script>

<style lang="css">
.pokemon-puce {
  background: #f2f2f27d;
  margin: 5px;
  border-radius: 3px;
  border: 0.5px solid #fdfdfd5c;
  text-align: right;
  width: 30%;
}
.pokemon-puce:hover {
  background: rgb(197, 197, 255);
}
ul {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: center;
}
p {
  color: black;
}

.pokemon-name {
  text-transform: uppercase;
  position: absolute;
  bottom: 1px;
  font-size: 10px;
  left: 5px;
}

p.pokemon-id {
  text-align: left;
  font-size: 11px;

  right: 0;
  position: absolute;
  left: 5px;
  top: 6px;
}

figure {
  position: relative;
  cursor: pointer;
  height: 100px;
  color: #fff0;
}

.abilities span {
  padding: 0px 17px;
  background: #0000ff59;
  border-radius: 1px;
}
.abilities span:nth-child(2) {
  margin-left: 5px;
  font-size: 12px;
}
div.pokemon-type {
  margin-top: 5px;
}

@media (min-width: 1024px) {
}
</style>
