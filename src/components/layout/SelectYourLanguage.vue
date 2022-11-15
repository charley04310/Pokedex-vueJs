<script lang="ts"></script>

<template>
  <div class="language-bloc">
    <h1>Selectionner un language</h1>
    <select v-model="language">
      <option v-for="product in products" v-bind:value="product.ref">
        {{ product.name }}
      </option>
    </select>
    <button @click="isLanguageSelected = true">select</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import { watch } from "vue";
const store = useUserStore();
const { language, isLanguageSelected } = storeToRefs(store);
watch(language, () => {
  console.log(language.value);
});
const products = [
  { ref: "fr", name: "Francais" },
  { ref: "en", name: "Anglais" },
  { ref: "es", name: "Espanole" },
  { ref: "de", name: "Allemand" },
];
// #TODO : ABONNER LE STORE A LA LANGUE
</script>

<style lang="css"></style>
