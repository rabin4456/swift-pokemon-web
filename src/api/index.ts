import axios from "axios";

export const baseUrl = "https://pokeapi.co/api/v2/";

let headers = {
  "Content-Type": "application/json",
};

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: { ...headers },
});

export const getPokemon = async (id: string) => {
  try {
    const response = await apiClient.get(`/generation/${id}`);
    const list = response?.data?.pokemon_species;
    const pokemons = list?.map(async (pokemon: any) => {
      try {
        const res = await fetch(`${baseUrl}pokemon/${pokemon?.name}`);
        const pokemonInfo = await res?.json();
        const evolutionResponse: any =
          parseInt(id) < 5 &&
          (await fetch(`${baseUrl}evolution-chain/${pokemonInfo.id}`));
        const evolutionInfo =
          parseInt(id) < 5 && (await evolutionResponse?.json());

        return {
          id: pokemonInfo?.id,
          name: pokemonInfo?.name,
          types: pokemonInfo?.types,
          image: pokemonInfo?.sprites?.other?.home?.front_default,
          color: pokemonInfo?.game_indices[8],
          stats: pokemonInfo?.stats,
          about: {
            type: pokemonInfo?.types,
            height: pokemonInfo?.height,
            weight: pokemonInfo?.weight,
            ability: pokemonInfo?.abilities,
          },
          evolution: evolutionInfo?.chain?.evolves_to[0],
        };
      } catch (error) {
        console.log(error, "====erorrr====");
      }
    });
    return await Promise.all(pokemons);
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};
