// src/pages/FavoritesPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [imageError, setImageError] = useState({}); // Menyimpan status error gambar

  const defaultImage = 'https://via.placeholder.com/250?text=No+Image'; // Gambar default

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (name) => {
    const updatedFavorites = favorites.filter(fav => fav.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleImageError = (index) => {
    setImageError((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Favorite Pokemon
      </Typography>
      <Grid container spacing={3}>
        {favorites.length > 0 ? (
          favorites.map((pokemon, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="250"
                  image={imageError[index] ? defaultImage : pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  onError={() => handleImageError(index)} // Ganti gambar jika terjadi error
                  style={{ objectFit: 'contain', backgroundColor: '#f7f7f7' }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
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
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => removeFromFavorites(pokemon.name)}
                    fullWidth
                    style={{ marginTop: '10px' }}
                  >
                    Remove from Favorites
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ marginTop: '50px' }}>
            No favorite Pokemon added yet.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default FavoritesPage;
