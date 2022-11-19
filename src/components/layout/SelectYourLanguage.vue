<script lang="ts"></script>

<template>
  <div class="language-bloc">
    <h1>NOM DE VOTRE POKÉDEEX</h1>

    <input
      type="search"
      v-model="username"
      name="username"
      id="username"
      placeholder="Entrer votre nom"
    />
    <h2 class="language-title">CHOISIR UNE LANGUE</h2>

    <select v-model="language">
      <option v-for="lang in languageOptions" v-bind:value="lang.ref">
        {{ lang.name }}
      </option>
    </select>
    <button class="create-pokemon" @click="isLanguageSelected = true">
      Créer mon Pokédex
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
const user = useUserStore();

const { language, isLanguageSelected, username } = storeToRefs(user);

const languageOptions = [
  { ref: "fr", name: "Francais" },
  { ref: "en", name: "Anglais" },
  { ref: "es", name: "Espanole" },
  { ref: "de", name: "Allemand" },
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
