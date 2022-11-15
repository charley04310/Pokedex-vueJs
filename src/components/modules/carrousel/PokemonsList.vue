<script lang="ts"></script>

<template>
  <ul>
    <!-- --------------------      on met les datas en brut ------------------------>
    <slot v-for="Pokemon in pokemonList">
      <li @click="emitModal(Pokemon)" class="pokemon-puce">
        <figure>
          <img
            :src="Pokemon.image"
            :alt="'The pokemon that you are consulting is ' + Pokemon.name"
          />
          <p class="pokemon-id" v-html="'#' + Pokemon.id"></p>
          <p class="pokemon-name" v-html="Pokemon.name"></p>
        </figure>
      </li>
    </slot>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePokemonStore } from "../../../stores/pokemon";
import { useUserStore } from "../../../stores/user";
import { storeToRefs } from "pinia";
import type { Pokemon } from "../../../stores/pokemon";
const emit = defineEmits<{
  (e: "onClickOpenDetailsScreen", value: Pokemon): void;
}>();

const pokemonStore = usePokemonStore();
const userStore = useUserStore();

const { pokemonList, currentUrl } = storeToRefs(pokemonStore);

const { language } = storeToRefs(userStore);

onMounted(() => {
  pokemonStore.fetchPokemonFromLanguage(currentUrl.value, language.value);
});
/* 
async function getPokemonDetails(id: number) {
  const api = new PokemonClient();

  await api
    .getPokemonById(id)
    .then((data) => console.log(data)) // will output "Luxray"
    .catch((error) => console.error(error));
} */

function emitModal(value: Pokemon) {
  emit("onClickOpenDetailsScreen", value);
}
</script>

<style lang="css">
.pokemon-puce {
  background: #f2f2f27d;
  margin: 5px;
  border-radius: 3px;
  border: 0.5px solid gray;
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
