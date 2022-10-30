<script lang="ts">
import { ref } from "vue";
import CarrouselModal from "../Carrousel-modal.vue";
</script>
<template>
  <figure @click="openModal()">
    <img src="src/assets/img/pokemon.png" alt="pokemon" />
  </figure>
  <CarrouselModal v-if="modalIsVisible" @onClickClose="openModal()" />
</template>

<script setup lang="ts">
const modalIsVisible = ref(false);

function openModal() {
  modalIsVisible.value = !modalIsVisible.value;
}
</script>

<style scoped>
figure {
  cursor: pointer;
  background: #f2f2f2;
  border-radius: 10px;
}
@media (min-width: 1024px) {
}
</style>
