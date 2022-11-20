import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { PokemonClient } from "pokenode-ts";
import { NAVIGATION, URL_POKEMON } from "@/assets/enums/enums";

export type Pokemon = {
  id: number;
  name: string;
  image: string;
  description?: string;
  type?: Array<string>;
  stats?: Array<string>;
  taille?: number;
  poids?: number;
};

export const usePokemonStore = defineStore("Pokemon", () => {
  const pokemonCard = {
    id: ref(0),
    name: ref(""),
    image: ref(""),
  };
  const pokemonDetails = {
    id: ref(0),
    name: ref(""),
    image: ref(""),
    description: ref(""),
    type: [""],
    stats: [{}],
    taille: ref(0),
    poids: ref(0),
  };
  const pokemonList = ref<Pokemon[]>([]);
  const pokemonCloneList = ref<Pokemon[]>([]);
  const pokemonDetailsScreen = ref(false);
  const currentUrl = ref<string>(URL_POKEMON.CURRENT);
  const urlNext = ref<string>("");
  const urlPrevious = ref<string>("");
  const filterText = ref<string>("");
  const counterFetch = ref(0);
  const setPokemonImage = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const prevButtonIsVisible = computed(() => {
    if (urlPrevious.value != null && !pokemonDetailsScreen.value) {
      return true;
    } else {
      return false;
    }
  });
  const nextButtonIsVisible = computed(() => {
    if (urlNext.value != null && !pokemonDetailsScreen.value) {
      return true;
    } else {
      return false;
    }
  });

  async function fetchPokemonFromLanguage(
    url: string,
    langue: string,
    mode?: number
  ) {
    const api = new PokemonClient();
    pokemonList.value = [];
    pokemonCloneList.value = [];

    // on empeche l'utilisateur de faire plusieur fetche en meme temps
    if (counterFetch.value != 0) {
      return;
    } else {
      counterFetch.value++;
    }

    try {
      const listPokemonAPI = await axios.get(url);

      if (mode === NAVIGATION.NEXT) {
        currentUrl.value = listPokemonAPI.data.next;
      } else if (mode === NAVIGATION.PREVIOUS) {
        currentUrl.value = listPokemonAPI.data.previous;
      }

      urlNext.value = listPokemonAPI.data.next;
      urlPrevious.value = listPokemonAPI.data.previous;

      for (let i = 0; i < listPokemonAPI.data.results.length; i++) {
        const pokemon = await fetchPokemonCard(langue, listPokemonAPI, i);
        pokemonList.value.push(pokemon);
        pokemonCloneList.value.push(pokemon);
      }
      counterFetch.value = 0;
    } catch (e) {
      console.error(e);
    }
  }

  const fetchPokemonCard = async (
    langue: string,
    response: AxiosResponse,
    i: number
  ): Promise<Pokemon> => {
    const pokemon = Object.create(pokemonCard);

    const pokemonSpecies = await axios.get(response.data.results[i].url);

    pokemon.id = pokemonSpecies.data.id;
    pokemon.image = setPokemonImage(pokemon.id);

    pokemonSpecies.data.names.find((element: any) => {
      element.language.name === langue ? (pokemon.name = element.name) : null;
    });

    return pokemon;
  };

  const showPokemonDetails = async (obj: Pokemon, langue: string) => {
    const api = new PokemonClient();
    pokemonDetails.stats = [];

    pokemonDetails.name.value = obj.name;
    pokemonDetails.id.value = obj.id;
    pokemonDetails.image.value = obj.image;

    await api
      .getPokemonSpeciesById(pokemonDetails.id.value)
      .then(async (data) => {
        data.flavor_text_entries.find((element: any) => {
          element.language.name === langue
            ? (pokemonDetails.description = element.flavor_text)
            : null;
        });
      });
    // On récupère les types du pokémon
    await api.getPokemonById(pokemonDetails.id.value).then(async (data) => {
      pokemonDetails.taille.value = data.height / 10;
      pokemonDetails.poids.value = data.weight / 10;

      for (let i = 0; i < data.types.length; i++) {
        await axios.get(data.types[i].type.url).then((data) => {
          data.data.names.find((element: any) => {
            element.language.name === langue
              ? (pokemonDetails.type[i] = element.name)
              : null;
          });
        });
      }
      // on récupère le nom et les (PV/DEF/ATTACK) stats en fonction de la langue
      for (let i = 0; i < 3; i++) {
        const pokemonStats = {
          name: ref(""),
          stat: ref(0),
        };
        const statName = await axios.get(data.stats[i].stat.url);
        pokemonStats.stat.value = data.stats[i].base_stat;

        statName.data.names.forEach((element: any) => {
          if (element.language.name === langue) {
            pokemonStats.name.value = element.name;
          }
        });

        pokemonDetails.stats.push(pokemonStats);
      }
      console.log(pokemonDetails.stats);
    });
  };

  return {
    urlNext,
    pokemonList,
    pokemonCloneList,
    pokemonDetails,
    pokemonDetailsScreen,
    fetchPokemonFromLanguage,
    showPokemonDetails,
    urlPrevious,
    filterText,
    currentUrl,
    nextButtonIsVisible,
    prevButtonIsVisible,
  };
});
