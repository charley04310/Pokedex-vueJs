import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("User", () => {
  const isLogged = ref(false);
  const isLanguageSelected = ref(false);
  const language = ref("fr");
  const username = ref("");

  return {
    isLogged,
    isLanguageSelected,
    language,
    username,
  };
});
