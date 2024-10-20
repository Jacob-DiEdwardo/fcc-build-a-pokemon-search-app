const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const doPokemonSearch = async () => {
  try {
    const nameOrId = searchInput.value.toLowerCase();
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`
    );
    const data = await res.json();

    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = ` #${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} sprite">
    `;

    types.innerHTML = data.types
      .map(typeData => `<div class="${typeData.type.name}">${typeData.type.name}</div>`)
      .join('');

    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;
  } catch (e) {
    resetScreen();
    alert('Pokémon not found');
    console.error(e);
  }
};

const resetScreen = () => {
  spriteContainer.innerHTML = '';
  pokemonName.textContent = '';
  pokemonID.textContent = '';
  types.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
};

searchButton.addEventListener('click', doPokemonSearch);

searchInput.addEventListener('keydown', (e) => {
  if (e.key === "Enter") {
    doPokemonSearch();
  }
})
