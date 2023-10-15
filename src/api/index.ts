import axios from "axios";

export const baseUrl = "https://pokeapi.co/api/v2/";

let headers = {
  "Content-Type": "application/json",
};

export const apiClient = axios.create({
  baseURL: baseUrl,
  headers: { ...headers },
});

export const getPokemon = async () => {
  try {
    const response = await apiClient.get(`/pokemon`);
    const list = response.data.results;
    const pokemons = list?.map(async (pokemon: any) => {
      const res = await fetch(pokemon.url);
      const pokemonInfo = await res.json();

      const evolutionResponse = await fetch(
        `${baseUrl}evolution-chain/${pokemonInfo.id}`
      );
      const evolutionInfo = await evolutionResponse.json();

      console.log(evolutionInfo, "==evolutionInfo==");
      return {
        id: pokemonInfo?.id,
        name: pokemonInfo?.name,
        // generation:pokemonInfo?.generation?.name,
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
