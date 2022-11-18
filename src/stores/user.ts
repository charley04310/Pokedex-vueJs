import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("User", () => {
  const isLogged = ref(false);
  const isLanguageSelected = ref(false);
  const language = ref("fr");

  return {
    isLogged,
    isLanguageSelected,
    language,
  };
});
