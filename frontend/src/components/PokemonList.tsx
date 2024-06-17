import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Card,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button,
    SelectChangeEvent
} from '@mui/material';
import useCaughtPokemons from "../hooks/useCaughtPokemon";

export interface PokemonType {
    name: string;
    url: string;
}

interface Pokemon {
    name: string;
    url: string;
}

export interface TypeResponse {
    results: PokemonType[];
}

export interface PokemonListResponse {
    results: Pokemon[];
}

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [types, setTypes] = useState<PokemonType[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const { caughtPokemons, catchPokemon, releasePokemon } = useCaughtPokemons();

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon', {
                    withCredentials: false
                });
                setPokemons(response.data.results);
            } catch (error) {
                console.error('Failed to fetch pokemons:', error);
            }
        };

        fetchPokemons();
    }, []);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axios.get<TypeResponse>('https://pokeapi.co/api/v2/type', {
                    withCredentials: false
                });
                setTypes(response.data.results);
            } catch (error) {
                console.error('Failed to fetch types:', error);
            }
        };

        fetchTypes();
    }, []);

    const handleTypeChange = async (event: SelectChangeEvent<string>) => {
        const type = event.target.value as string;
        setSelectedType(type);

        if (type === '') {
            const response = await axios.get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon?limit=10', {
                withCredentials: false
            });
            setPokemons(response.data.results);
        } else {
            try {
                const response = await axios.get<{ pokemon: { pokemon: Pokemon }[] }>(`https://pokeapi.co/api/v2/type/${type}`, {
                    withCredentials: false
                });
                const filteredPokemons = response.data.pokemon.map(p => p.pokemon);
                setPokemons(filteredPokemons);
            } catch (error) {
                console.error('Failed to fetch pokemons of selected type:', error);
            }
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Pokémon List
            </Typography>
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="type-select-label">Select Type</InputLabel>
                <Select
                    labelId="type-select-label"
                    id="type-select"
                    value={selectedType}
                    onChange={handleTypeChange}
                    label="Select Type"
                >
                    <MenuItem value="">
                        <Typography>All</Typography>
                    </MenuItem>
                    {types.map((type, index) => (
                        <MenuItem value={type.name} key={index}>
                            {type.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={2}>
                {pokemons.map((pokemon, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6">{pokemon.name}</Typography>
                            {caughtPokemons.includes(pokemon.name) ? (
                                <Button variant="contained" color="secondary" onClick={() => releasePokemon(pokemon.name)}>
                                    Release
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" onClick={() => catchPokemon(pokemon.name)}>
                                    Catch
                                </Button>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default PokemonList;
