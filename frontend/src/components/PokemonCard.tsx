import React from 'react';
import { Card, Typography, Button } from '@mui/material';

interface PokemonCardProps {
    pokemon: { name: string };
    isCaught: boolean;
    onRelease: () => void;
    onCatch: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, isCaught, onRelease, onCatch }) => {
    return (
        <Card variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6">{pokemon.name}</Typography>
            {isCaught ? (
                <Button variant="contained" color="secondary" onClick={onRelease}>
                    Release
                </Button>
            ) : (
                <Button variant="contained" color="primary" onClick={onCatch}>
                    Catch
                </Button>
            )}
        </Card>
    );
};

export default PokemonCard;
