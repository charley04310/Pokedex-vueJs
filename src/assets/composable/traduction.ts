import {
  TRADUCTION_EN,
  TRADUCTION_FR,
  TRADUCTION_IT,
  TRADUCTION_ES,
  TRADUCTION_DE,
  LANGUAGE,
} from "../enums/enums";
import { computed } from "vue";

export const ENTRER_POKEDEX_NAME = computed((language) => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.POKEDEX_NAME;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.POKEDEX_NAME;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.POKEDEX_NAME;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.POKEDEX_NAME;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.POKEDEX_NAME;
    default:
      return TRADUCTION_ES.POKEDEX_NAME;
  }
});

export const ENTRER_VOTRE_NOM = computed((language) => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.ENTRER_VOTRE_NOM;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.ENTRER_VOTRE_NOM;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.ENTRER_VOTRE_NOM;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.ENTRER_VOTRE_NOM;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.ENTRER_VOTRE_NOM;
  }
});

export const CHOISIR_UNE_LANGUE = computed((language) => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.CHOISIR_LANGUE;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.CHOISIR_LANGUE;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.CHOISIR_LANGUE;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.CHOISIR_LANGUE;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.CHOISIR_LANGUE;
  }
});
export const CREER_MON_POKEDEX = computed((language) => {
  switch (language.value) {
    case LANGUAGE.FRANCAIS:
      return TRADUCTION_FR.CREER_POKEDEX;
    case LANGUAGE.ANGLAIS:
      return TRADUCTION_EN.CREER_POKEDEX;
    case LANGUAGE.ALLEMAND:
      return TRADUCTION_DE.CREER_POKEDEX;
    case LANGUAGE.ITALIEN:
      return TRADUCTION_IT.CREER_POKEDEX;
    case LANGUAGE.ESPAGNOLE:
      return TRADUCTION_ES.CREER_POKEDEX;
  }
});
