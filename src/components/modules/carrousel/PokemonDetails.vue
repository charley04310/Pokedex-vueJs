<template>
  <nav>
    <aside>
      <img v-if="props.image != null" v-bind:src="props.image" alt="" />
    </aside>
    <article>
      <section>
        <div>
          <input type="range" id="volume" value="67" name="volume" disabled />
          <label for="volume">Volume</label>
        </div>

        <p v-html="props.nom"></p>
      </section>
    </article>
  </nav>
  <button @click="emit('onClickCloseDetails')">FERMER</button>
</template>
<script setup lang="ts">
const props = defineProps<{
  nom: string;
  image: string;
}>();

const emit = defineEmits<{
  (e: "onClickCloseDetails"): void;
}>();
</script>

<style scoped>
@media (min-width: 1024px) {
}
</style>
