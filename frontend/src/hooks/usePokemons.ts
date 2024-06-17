import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Pokemon {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    results: Pokemon[];
}

const usePokemons = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchPokemons = async () => {
        try {
            const response = await axios.get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon', {
                withCredentials: false
            });
            setPokemons(response.data.results);
        } catch (error) {
            console.error('failed to fetch pokemons:', error);
            setError('Failed to fetch pokemons');
        }
    };

    useEffect(() => {
        fetchPokemons();
    }, []);

    return { pokemons, setPokemons, fetchPokemons, error };
};

export default usePokemons;
