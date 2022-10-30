<script setup lang="ts"></script>

<template>
  <section class="pokemon-type">
    <div class="abilities">
      <span>Grass</span>
      <span>Poison</span>
    </div>
  </section>
</template>

<style scoped>
.abilities span {
  padding: 0px 17px;
  background: blue;
  border-radius: 3px;
}
.abilities span:nth-child(2) {
  margin-left: 5px;
}
section.pokemon-type {
  margin-top: 5px;
  display: flex;
}
@media (min-width: 1024px) {
}
</style>
