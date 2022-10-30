<template>
  <div class="box modal">
    <section class="title-dialog">
      <h1>Bulbasaur</h1>
      <p class="id"><span class="number-prefix">#</span>001</p>
    </section>
    <section>
      <h2>Capacity</h2>
      <ul>
        <li>
          <span> weigth: 230 lbs</span>
        </li>
        <li>
          <span> weigth: 230 lbs</span>
        </li>
        <li>
          <span> weigth: 230 lbs</span>
        </li>
      </ul>
    </section>
    <section>
      <h2>Type</h2>
    </section>
    <button @click="emit('onClickClose')">FERMER</button>
  </div>

  <div class="overlay"></div>
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: "onClickClose"): void;
}>();
</script>

<style scoped>
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 2;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.box {
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: #0255a5;
  font-family: Menlo;
  padding: 15px 10px;
  text-align: center;
  width: 300px;
}
@media (min-width: 1024px) {
}
</style>
