<script setup lang="ts">
import { usePokemonStore } from "../../stores/pokemon";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
const store = usePokemonStore();
const userStore = useUserStore();
const { language } = storeToRefs(userStore);

const { filterText, urlPrevious, urlNext } = storeToRefs(store);
</script>

<template>
  <section class="gameplay">
    <input
      type="search"
      v-model="filterText"
      name="getPokemon"
      id="search"
      placeholder="Search for Pokemon"
    />
    <div class="button-navigation">
      <button
        v-if="store.prevButtonIsVisible"
        @click="store.fetchPokemonFromLanguage(urlPrevious, language)"
      >
        PREVIOUUUS
      </button>
      <button
        v-if="store.nextButtonIsVisible"
        @click="store.fetchPokemonFromLanguage(urlNext, language)"
      >
        NEEEEXT
      </button>
    </div>
  </section>
</template>

<script lang="ts"></script>

<style lang="css">
.gameplay {
  display: flex;
  flex-direction: column;
  width: auto;
  margin: 0 auto;
}
#search {
  padding-left: 1rem;
  width: 50%;
  margin: 0 auto;
  margin-top: 0px;
  margin-top: 1rem;
  height: 40px;
  border-radius: 5px 2px 5px 1 px;
  border-radius: 10px;
  background: gray;
}
@media (min-width: 600px) {
  .gameplay {
    width: 600px;
  }
}
</style>
