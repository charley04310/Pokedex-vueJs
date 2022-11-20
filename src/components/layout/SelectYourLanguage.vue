<template>
  <div class="language-bloc">
    <h1>{{ ENTRER_POKEDEX_NAME }}<span style="font-size: 10px">(*)</span></h1>

    <input
      type="search"
      v-model="username"
      name="username"
      id="username"
      :placeholder="ENTRER_VOTRE_NOM"
    />
    <h2 class="language-title">{{ CHOISIR_UNE_LANGUE }}</h2>

    <select v-model="language">
      <option v-for="lang in languageOptions" v-bind:value="lang.ref">
        {{ lang.name }}
      </option>
    </select>
    <button class="create-pokemon" @click="isLanguageSelected = true">
      <h2>{{ CREER_MON_POKEDEX }}</h2>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import {
  TRADUCTION_FR,
  TRADUCTION_EN,
  TRADUCTION_DE,
  TRADUCTION_IT,
  TRADUCTION_ES,
  LANGUAGE,
} from "@/assets/enums/enums";

/* import {
  ENTRER_VOTRE_NOM,
  ENTRER_POKEDEX_NAME,
  CHOISIR_UNE_LANGUE,
  CREER_MON_POKEDEX,
} from "@/assets/composable/traduction"; */
import { computed, ref } from "vue";

const user = useUserStore();
const { language, isLanguageSelected, username } = storeToRefs(user);

const ENTRER_POKEDEX_NAME = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.POKEDEX_NAME;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.POKEDEX_NAME;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.POKEDEX_NAME;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.POKEDEX_NAME;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.POKEDEX_NAME;
  }
});
const ENTRER_VOTRE_NOM = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.ENTRER_VOTRE_NOM;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.ENTRER_VOTRE_NOM;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.ENTRER_VOTRE_NOM;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.ENTRER_VOTRE_NOM;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.ENTRER_VOTRE_NOM;
  }
});
const CHOISIR_UNE_LANGUE = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.CHOISIR_LANGUE;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.CHOISIR_LANGUE;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.CHOISIR_LANGUE;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.CHOISIR_LANGUE;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.CHOISIR_LANGUE;
  }
});
const CREER_MON_POKEDEX = computed(() => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.CREER_POKEDEX;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.CREER_POKEDEX;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.CREER_POKEDEX;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.CREER_POKEDEX;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.CREER_POKEDEX;
  }
});
const languageOptions = [
  { ref: LANGUAGE.FRANCAIS, name: "Français" },
  { ref: LANGUAGE.ANGLAIS, name: "Anglais" },
  { ref: LANGUAGE.ESPAGNOLE, name: "Espagnole" },
  { ref: LANGUAGE.ALLEMAND, name: "Allemand" },
  { ref: LANGUAGE.ITALIEN, name: "Italien" },
];
// #TODO : ABONNER LE STORE A LA LANGUE
</script>

<style lang="css" scoped>
.language-title {
  margin-top: 1rem;
}
.language-bloc {
  margin: 0 3rem;
  height: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  color: white;
}
input,
select {
  padding-left: 1rem;
  width: 100%;
  margin: 0 auto;
  margin-top: 0px;
  margin-top: 1rem;
  color: white;
  height: 40px;
  border-radius: 5px 2px 5px 1px;
  border: none;

  background: #888a9699;
}

button.create-pokemon {
  color: white;
  background: #888a96e9;
  margin-top: 1rem;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
}
</style>
