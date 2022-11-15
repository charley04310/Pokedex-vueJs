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
body {
  background-color: rgb(192, 192, 192);
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
