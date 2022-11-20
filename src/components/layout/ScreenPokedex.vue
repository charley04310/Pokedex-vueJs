<script lang="ts">
import ScreenPokemonList from "../modules/carrousel/PokemonsList.vue";
import ScreenPokemonDetails from "../modules/carrousel/PokemonDetails.vue";
import ScreenSelectYourLanguage from "../layout/SelectYourLanguage.vue";
import type { Pokemon } from "../../stores/pokemon";
</script>

<template>
  <section class="title-container">
    <div class="title-deco-container">
      <div class="title-bloc-left"></div>
      <div class="bloc-title-deco">
        <h2 class="title-deco">DOT MATRIX WITH STEREO SOUND</h2>
      </div>
      <div class="title-bloc-right"></div>
    </div>
  </section>
  <section id="screen">
    <nav id="display">
      <ScreenSelectYourLanguage v-if="!isLanguageSelected && isLogged" />

      <ScreenPokemonList
        v-if="!pokemonDetailsScreen && isLogged && isLanguageSelected"
        @onClickOpenDetailsScreen="(value) => getPokemonDetails(value)"
      />
      <ScreenPokemonDetails
        v-if="pokemonDetailsScreen"
        @onClickCloseDetails="SwitchStateScreen"
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
const { isLogged, isLanguageSelected, language } = storeToRefs(userStore);
const { pokemonDetailsScreen } = storeToRefs(pokemonStore);
const SwitchStateScreen = () => {
  pokemonDetailsScreen.value = !pokemonDetailsScreen.value;
};

async function getPokemonDetails(value: Pokemon) {
  await pokemonStore.showPokemonDetails(value, language.value);
  pokemonDetailsScreen.value = true;
}
</script>

<style lang="css">
.title-deco {
  text-align: center;
  font-size: 16px;
  color: white;
  padding: 1rem 0;
  padding: 0 1rem;
}
.title-container {
  margin: 0 auto;
  position: relative;
}
.title-deco-container {
  display: flex;
  position: absolute;
  width: 100%;
  top: 11px;
  left: 20px;
}
.title-bloc-left {
  width: 13%;
  border-bottom: 3px solid #204a87;
  border-top: 3px solid #5c3566;
  padding: 0.25rem;
  height: 100%;
}
.title-bloc-right {
  width: 10%;
  border-bottom: 3px solid #204a87;
  border-top: 3px solid #5c3566;
  padding: 0.25rem;
  height: 100%;
}
#screen {
  background-color: #888a96;
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
  .title-bloc-left {
    width: 25%;
  }
  .title-deco-container {
    top: 18px;
    left: 43px;
  }
  .title-container {
    width: 600px;
  }
  #screen {
    padding: 3rem 5rem 3rem 5rem;
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
