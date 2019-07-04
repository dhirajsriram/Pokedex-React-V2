import React from "react";
const PokemonContext = React.createContext({});
export const PokemonProvider = PokemonContext.Provider;
export const PokemonConsumer = PokemonContext.Consumer;
export const numberPadding = function(number, size) {
    var s = String(number);
    while (s.length < (size || 2)) {
        s = '0' + s;
    }
    return s;
};
export const findType = function(type) {
    switch (type) {
        case 'normal':
            return '#A8A878';
        case 'fighting':
            return '#C03028';
        case 'flying':
            return '#A890F0';
        case 'poison':
            return '#b97fc9';
        case 'ground':
            return '#E0C068';
        case 'rock':
            return '#705848';
        case 'ghost':
            return '#705898';
        case 'steel':
            return '#B8B8D0';
        case 'fire':
            return '#fd7d24';
        case 'water':
            return '#4592c4';
        case 'grass':
        case 'bug':
            return '#729f3f';
        case 'electric':
            return '#F8D030';
        case 'psychic':
            return '#F85888';
        case 'ice':
            return '#37EDF1';
        case 'dragon':
            return '#B8A038';
        case 'dark':
            return '#3a3a3a';
        case 'fairy':
            return '#EE99AC';
        default:
    }
}

export const Types = [
	'fire',
	'water',
	'grass',
	'electric',
	'fighting',
	'psychic',
	'normal',
	'steel',
	'dark',
	'dragon',
    'fairy',
    'reset'
];