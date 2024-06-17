import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useCaughtPokemons = () => {
    const [caughtPokemons, setCaughtPokemons] = useState<string[]>([]);

    useEffect(() => {
        const fetchCaughtPokemons = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/pokemon/caught', { withCredentials: true });
                const data = response.data;
                if (Array.isArray(data)) {
                    setCaughtPokemons(data.map((pokemon: { pokemonId: string }) => pokemon.pokemonId));
                } else {
                    console.error('Unexpected response data:', data);
                }
            } catch (error) {
                console.error('Failed to fetch caught pokemons:', error);
            }
        };

        fetchCaughtPokemons();
    }, []);

    const catchPokemon = useCallback(async (pokemonName: string) => {
        try {
            await axios.post('http://localhost:5000/api/pokemon/catch', { pokemonId: pokemonName }, { withCredentials: true });
            setCaughtPokemons(prevCaughtPokemons => [...prevCaughtPokemons, pokemonName]);
        } catch (error) {
            console.error('Failed to catch pokemon:', error);
        }
    }, []);

    const releasePokemon = useCallback(async (pokemonName: string) => {
        try {
            await axios.post('http://localhost:5000/api/pokemon/release', { pokemonId: pokemonName }, { withCredentials: true });
            setCaughtPokemons(prevCaughtPokemons => prevCaughtPokemons.filter(pokemon => pokemon !== pokemonName));
        } catch (error) {
            console.error('Failed to release pokemon:', error);
        }
    }, []);

    return { caughtPokemons, catchPokemon, releasePokemon };
};

export default useCaughtPokemons;
