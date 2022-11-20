<script setup lang="ts">
import Header_vue from "./components/layout/Header.vue";
import ScreenPokemon from "./components/layout/ScreenPokedex.vue";
import GameBoard from "./components/layout/GameBoard.vue";
</script>

<template>
  <Header_vue />
  <ScreenPokemon />
  <GameBoard />
</template>

<style lang="css">
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@100;500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@100;500&family=Rokkitt:wght@300&display=swap");
h1,
h2 {
  font-family: "Archivo", sans-serif;
}
p,
li {
  font-family: "Rokkitt", serif;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
