import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * A hook to fetch and manage caught Pokemon.
 * @returns {object} An object containing the caughtPokemons array, catchPokemon and releasePokemon functions, loading
 * state, and error state.
 */

const useCaughtPokemons = () => {
    const [caughtPokemons, setCaughtPokemons] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Fetches the list of caught Pokemon from the API.
     * @async
     */
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
            setError('Failed to fetch caught pokemons');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCaughtPokemons();
    }, []);

    /**
     * Catches a Pokemon by adding it to the caughtPokemons array.
     * @param {string} pokemonName - The name of the Pokemon to catch.
     */
    const catchPokemon = async (pokemonName: string) => {
        try {
            await axios.post('http://localhost:5000/api/pokemon/catch', { pokemonId: pokemonName }, { withCredentials: true });
            setCaughtPokemons(prevCaughtPokemons => [...prevCaughtPokemons, pokemonName]);
        } catch (error) {
            console.error('Failed to catch pokemon:', error);
            setError('Failed to catch pokemon');
        }
    };

    /**
     * Releases a Pokemon by removing it from the caughtPokemons array.
     * @param {string} pokemonName - The name of the Pokemon to release.
     */
    const releasePokemon = async (pokemonName: string) => {
        try {
            await axios.post('http://localhost:5000/api/pokemon/release', { pokemonId: pokemonName }, { withCredentials: true });
            setCaughtPokemons(prevCaughtPokemons => prevCaughtPokemons.filter(pokemon => pokemon !== pokemonName));
        } catch (error) {
            console.error('Failed to release pokemon:', error);
            setError('Failed to release pokemon');
        }
    };

    return { caughtPokemons, catchPokemon, releasePokemon, loading, error };
};

export default useCaughtPokemons;
