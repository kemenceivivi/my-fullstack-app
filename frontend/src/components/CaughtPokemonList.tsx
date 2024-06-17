import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    Grid,
    Button,
    SelectChangeEvent,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    CircularProgress
} from '@mui/material';
import usePokemonTypes from '../hooks/usePokemonTypes';
import useCaughtPokemons from "../hooks/useCaughtPokemon";

/**
 * A component that displays a list of caught Pokemon and allows the user to release them.
 * @component
 */

const CaughtPokemonList: React.FC = () => {
    const { caughtPokemons, releasePokemon, loading, error } = useCaughtPokemons();
    const { types, error: typesError } = usePokemonTypes();
    const [selectedType, setSelectedType] = useState('');

    const handleTypeChange = (event: SelectChangeEvent<string>) => {
        setSelectedType(event.target.value);
    };

    if (error || typesError) {
        return <Typography variant="h6" color="error">{error || typesError}</Typography>;
    }

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Caught Pokémon
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
                {caughtPokemons.map((pokemonName, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="h6">{pokemonName}</Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => releasePokemon(pokemonName)}
                            >
                                Release
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CaughtPokemonList;
