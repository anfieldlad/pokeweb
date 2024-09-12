import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, CardMedia, CardContent, Card, Grid, Chip, Box, LinearProgress } from '@mui/material';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import axios from 'axios';

const DetailPage = () => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!pokemonName) {
        console.error("pokemonName is undefined or null");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonName]);

  useEffect(() => {
    if (pokemon) {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const isAlreadyFavorite = storedFavorites.some(fav => fav.name === pokemon.name);
      setIsFavorite(isAlreadyFavorite);
    }
  }, [pokemon]);

  const addToFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    storedFavorites.push(pokemon);
    localStorage.setItem('favorites', JSON.stringify(storedFavorites));
    setIsFavorite(true);
  };

  const removeFromFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavorites = storedFavorites.filter(fav => fav.name !== pokemon.name);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(false);
  };

  if (loading) {
    return <Typography variant="h5" align="center">Loading...</Typography>;
  }

  if (!pokemon) {
    return <Typography variant="h5" align="center">Pokémon not found!</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={4}>
        {/* Gambar Pokémon */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={pokemon?.sprites?.other?.['official-artwork']?.front_default || 'https://via.placeholder.com/300?text=No+Image'}
              alt={pokemon.name}
              sx={{ objectFit: 'contain', width: 'auto', margin: '0 auto' }}
            />
            <CardContent>
              <Typography 
                variant="h3" 
                align="center" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1976d2', 
                  textTransform: 'capitalize',
                  letterSpacing: '2px'  
                }}
              >
                {pokemon.name}
              </Typography>
              
              {/* Tombol Add to Favorites */}
              <div style={{ marginTop: '20px' }}>
                {isFavorite ? (
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={removeFromFavorites}
                  >
                    Remove from Favorites
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={addToFavorites}
                  >
                    Add to Favorites
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Detail Pokémon */}
        <Grid item xs={12} sm={8}>
          <Card sx={{ padding: '20px' }}>
            <CardContent>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#424242', 
                  borderBottom: '2px solid #1976d2', 
                  paddingBottom: '8px',
                  marginBottom: '20px'
                }}
              >
                Pokémon Details
              </Typography>
              
              {/* Height dan Weight dengan Ikon */}
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6} sm={4}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <HeightIcon color="primary" sx={{ fontSize: '40px' }} />
                    <Typography 
                      variant="h6" 
                      sx={{ marginTop: '10px', fontWeight: 'bold', color: '#616161' }}
                    >
                      Height: {pokemon.height / 10} m
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <FitnessCenterIcon color="secondary" sx={{ fontSize: '40px' }} />
                    <Typography 
                      variant="h6" 
                      sx={{ marginTop: '10px', fontWeight: 'bold', color: '#616161' }}
                    >
                      Weight: {pokemon.weight / 10} kg
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Types */}
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ marginTop: '20px', fontWeight: 'bold', color: '#424242' }}
              >
                Types:
              </Typography>
              <Grid container spacing={1}>
                {pokemon.types.map((typeObj, index) => (
                  <Grid item key={index}>
                    <Chip 
                      label={typeObj.type.name} 
                      sx={{ 
                        backgroundColor: '#e0f7fa', 
                        fontWeight: 'bold', 
                        textTransform: 'capitalize' 
                      }} 
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Abilities */}
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ marginTop: '20px', fontWeight: 'bold', color: '#424242' }}
              >
                Abilities:
              </Typography>
              <Grid container spacing={1}>
                {pokemon.abilities.map((abilityObj, index) => (
                  <Grid item key={index}>
                    <Chip 
                      label={abilityObj.ability.name} 
                      sx={{ 
                        backgroundColor: '#f1f8e9', 
                        fontWeight: 'bold', 
                        textTransform: 'capitalize' 
                      }} 
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Moves dengan Chip */}
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ marginTop: '20px', fontWeight: 'bold', color: '#424242' }}
              >
                Moves:
              </Typography>
              <Grid container spacing={1}>
                {pokemon.moves.slice(0, 10).map((moveObj, index) => (
                  <Grid item key={index}>
                    <Chip 
                      label={moveObj.move.name} 
                      sx={{ 
                        marginBottom: '5px', 
                        fontSize: '14px', 
                        backgroundColor: '#e3f2fd', 
                        fontWeight: 'bold' 
                      }} 
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Stats */}
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ marginTop: '20px', fontWeight: 'bold', color: '#424242' }}
              >
                Stats:
              </Typography>
              {pokemon.stats.map((statObj, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1" gutterBottom>
                    {statObj.stat.name.toUpperCase()}:
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={statObj.base_stat} 
                    sx={{ height: '10px', borderRadius: '5px' }} 
                  />
                  <Typography variant="body2" align="right">
                    {statObj.base_stat}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailPage;
