import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { PokemonClient } from "pokenode-ts";
import pokemonTraduction from "../assets/traductions/fr_pokemon.json";

export type Pokemon = {
  id: number;
  name: string;
  image: string;
  description?: string;
  type?: Array<string>;
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
    taille: ref(0),
    poids: ref(0),
  };
  const setPokemonImage = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const pokemonList = ref<Pokemon[]>([]);
  const pokemonCloneList = ref<Pokemon[]>([]);

  const currentUrl = ref<string>(
    "https://pokeapi.co/api/v2/pokemon-species?offset=0&limit=9"
  );
  const urlNext = ref<string>("");
  const urlPrevious = ref<string>("");
  const filterText = ref<string>("");

  const prevButtonIsVisible = computed(() => {
    if (urlPrevious.value != null) {
      return true;
    } else {
      return false;
    }
  });
  const nextButtonIsVisible = computed(() => {
    if (urlNext.value != null) {
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

    try {
      const listPokemonAPI = await axios.get(url);

      if (mode === 1) {
        currentUrl.value = listPokemonAPI.data.next;
      } else if (mode === 0) {
        currentUrl.value = listPokemonAPI.data.previous;
      }

      urlNext.value = listPokemonAPI.data.next;
      urlPrevious.value = listPokemonAPI.data.previous;

      for (let i = 0; i < listPokemonAPI.data.results.length; i++) {
        const pokemon = await fetchPokemonCard(langue, listPokemonAPI, i);
        pokemonList.value.push(pokemon);
        pokemonCloneList.value.push(pokemon);
      }
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
      pokemonDetails.taille.value = data.height;
      pokemonDetails.poids.value = data.weight;

      for (let i = 0; i < data.types.length; i++) {
        await axios.get(data.types[i].type.url).then((data) => {
          data.data.names.find((element: any) => {
            element.language.name === langue
              ? (pokemonDetails.type[i] = element.name)
              : null;
          });
        });
      }
    });
  };

  watch(filterText, async (search) => {
    let count = 0;

    const resultSearchUser = pokemonTraduction.filter((pokemon: any) => {
      return (
        pokemon.name
          .toLocaleLowerCase()
          .startsWith(search.toLocaleLowerCase()) && count++ < 9
      );
    });

    if (search.length === 0) {
      pokemonList.value = pokemonCloneList.value;
    } else {
      pokemonList.value = resultSearchUser;
    }
  });

  return {
    urlNext,
    pokemonList,
    pokemonDetails,
    fetchPokemonFromLanguage,
    showPokemonDetails,
    urlPrevious,
    filterText,
    currentUrl,
    nextButtonIsVisible,
    prevButtonIsVisible,
  };
});
