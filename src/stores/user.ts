import { ref } from "vue";
import { defineStore } from "pinia";
import { LANGUAGE } from "@/assets/enums/enums";

export const useUserStore = defineStore("User", () => {
  const isLogged = ref(false);
  const isLanguageSelected = ref(false);
  const language = ref(LANGUAGE.FRANCAIS);
  const username = ref("");

  return {
    isLogged,
    isLanguageSelected,
    language,
    username,
  };
});
