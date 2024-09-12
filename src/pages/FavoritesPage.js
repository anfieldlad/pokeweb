import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from localStorage when component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Function to remove a Pokémon from favorites
  const removeFromFavorites = (pokemonToRemove) => {
    const updatedFavorites = favorites.filter(pokemon => pokemon.name !== pokemonToRemove.name);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Your Favorite Pokémon
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ marginTop: '20px' }}>
          No favorite Pokémon added yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((pokemon, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={pokemon?.sprites?.other?.['official-artwork']?.front_default || 'https://via.placeholder.com/250?text=No+Image'}
                  alt={pokemon.name}
                  sx={{ objectFit: 'contain', width: 'auto', margin: '0 auto' }}
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/250?text=No+Image')}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      color: '#3f51b5',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {pokemon.name}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/pokemon/${pokemon.name}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: '10px' }}
                  >
                    View Details
                  </Button>
                  {/* Add Remove from Favorites Button */}
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => removeFromFavorites(pokemon)}
                    sx={{ marginTop: '10px' }}
                  >
                    Remove from Favorites
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default FavoritesPage;
