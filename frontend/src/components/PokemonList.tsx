import React, { useState } from 'react';
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
import usePokemonTypes from "../hooks/usePokemonTypes";
import useCaughtPokemons from "../hooks/useCaughtPokemon";
import axios from "axios";
import usePokemons from "../hooks/usePokemons";
import {Pokemon, PokemonListResponse} from "../types/types";

/**
 * PokemonList component for displaying a list of Pokemon with filtering by type and catch/release functionality.
 * @component
 */

const PokemonList: React.FC = () => {
    const { pokemons, setPokemons, error: pokemonsError } = usePokemons();
    const { types, error: typesError } = usePokemonTypes();
    const { caughtPokemons, catchPokemon, releasePokemon } = useCaughtPokemons();
    const [selectedType, setSelectedType] = useState<string>('');

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

    if (pokemonsError || typesError) {
        return <Typography variant="h6" color="error">{pokemonsError || typesError}</Typography>;
    }

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
