import { useState, useEffect } from 'react';
import axios from 'axios';
import {Pokemon, TypeResponse} from "../types/types";

const usePokemonTypes = () => {
    const [types, setTypes] = useState<Pokemon[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchTypes = async () => {
        try {
            const response = await axios.get<TypeResponse>('https://pokeapi.co/api/v2/type', {
                withCredentials: false
            });
            setTypes(response.data.results);
        } catch (error) {
            console.error('Failed to fetch types:', error);
            setError('Failed to fetch types');
        }
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    return { types, error };
};

export default usePokemonTypes;
