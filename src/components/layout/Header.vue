<template>
  <header id="power">
    <button @click="changeConnexionState">Off On</button>
  </header>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { isLogged } = storeToRefs(userStore);

const changeConnexionState = () => {
  isLogged.value = !isLogged.value;
};
</script>
<style scoped>
#power {
  width: 100%;
  padding: 1.5rem 0;
  border: 5px solid rgb(93, 93, 93);
  margin-bottom: 2rem;
  border-radius: 1rem 1rem 0 0;
}
#power > button {
  border: 3px solid rgb(93, 93, 93);
  background-color: rgb(129, 129, 129);
  padding: 1px 8px;
  border-radius: 15px;
  color: #fff;
  margin-left: 3rem;
  cursor: pointer;
}
@media (min-width: 1024px) {
}
</style>
