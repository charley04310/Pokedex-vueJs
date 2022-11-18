<script lang="ts">
import ScreenPokemonList from "../modules/carrousel/PokemonsList.vue";
import ScreenPokemonDetails from "../modules/carrousel/PokemonDetails.vue";
import ScreenSelectYourLanguage from "../layout/SelectYourLanguage.vue";
import { ref } from "vue";
import type { Pokemon } from "../../stores/pokemon";
</script>

<template>
  <section id="screen">
    <h2>DOT MATRIX WITH STEREO SOUND</h2>

    <nav id="display">
      <ScreenSelectYourLanguage v-if="!isLanguageSelected && isLogged" />

      <ScreenPokemonList
        v-if="!ModalIsOpen && isLogged && isLanguageSelected"
        @onClickOpenDetailsScreen="(value) => getPokemonDetails(value)"
      />
      <ScreenPokemonDetails
        v-if="ModalIsOpen"
        @onClickCloseDetails="SwitchStateScreen"
        :nom="pokemonStore.pokemonDetails.name"
        :image="pokemonStore.pokemonDetails.image"
      />
    </nav>
  </section>
</template>
<script setup lang="ts">
import { usePokemonStore } from "../../stores/pokemon";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const pokemonStore = usePokemonStore();
const ModalIsOpen = ref(false);

const { isLogged, isLanguageSelected, language } = storeToRefs(userStore);

function getPokemonDetails(value: Pokemon) {
  ModalIsOpen.value = true;
  pokemonStore.showPokemonDetails(value, language.value);
}

const SwitchStateScreen = () => {
  /*   pokemonList.value.forEach((element) => {
    console.log(element);
  }); */
  ModalIsOpen.value = !ModalIsOpen.value;
};
</script>

<style lang="css">
h2 {
  text-align: center;
  font-size: 18px;
  color: white;
}
#screen {
  background-color: grey;
  padding: 2rem 0;
  border-radius: 1.5rem;
  text-align: right;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}

#display {
  position: relative;
  background-color: rgb(0, 172, 0);
  width: auto;
  height: 350px;
  border: 3px solid green;
}

@media (min-width: 600px) {
  #screen {
    padding: 0 5rem 3rem 5rem;
    border-radius: 1.5rem 1.5rem 5rem 1.5rem;
    width: 600px;
  }
  #display {
    width: 400px;
  }
  #display::after {
    content: "BATTERY";
    position: absolute;
    color: #fff;
    left: -6em;
    font-size: 12px;
    top: 10em;
    transform: translateY(-50%);
  }
  #display::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    left: -3em;
    top: 6em;
    transform: translateY(-50%);
  }
}
</style>
