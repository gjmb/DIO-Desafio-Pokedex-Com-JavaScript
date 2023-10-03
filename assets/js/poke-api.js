
const pokeApi = {}

function convertPokeApiDetalToPokemon(pokeDetail){
    const pokemon=new Pokemon();
    pokemon.order = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.type = type;
    pokemon.types = types;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response)=>response.json())
            .then(convertPokeApiDetalToPokemon)
    
}

pokeApi.getPokemons = (offset=0, limit=8) => {
    const url=`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((detailRequests) => Promise.all(detailRequests))
            .then((pokemonsDetails) =>pokemonsDetails)
            .catch((error) => console.error(error))
            .finally(() =>console.log("Request completed."));
};
