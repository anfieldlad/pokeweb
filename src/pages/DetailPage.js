import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid, CardActions } from '@mui/material';

const DetailPage = () => {
  const { id } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false); // Untuk menangani error gambar

  // Gambar default jika gambar dari API tidak tersedia
  const defaultImage = 'https://via.placeholder.com/250?text=No+Image';

  useEffect(() => {
    fetchPokemonDetail();
  }, []);

  useEffect(() => {
    if (pokemonDetail) {
      checkIfFavorite(); // Cek apakah Pokémon sudah ada di favorit
    }
  }, [pokemonDetail]);

  // Fetch detail Pokémon dari API
  const fetchPokemonDetail = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemonDetail(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Cek apakah Pokémon sudah ada di daftar favorit
  const checkIfFavorite = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorited = savedFavorites.some(fav => fav.name === pokemonDetail.name);
    setIsFavorite(isFavorited);
  };

  // Menambahkan Pokémon ke favorit
  const addToFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!savedFavorites.some(fav => fav.name === pokemonDetail.name)) {
      savedFavorites.push(pokemonDetail);
      localStorage.setItem('favorites', JSON.stringify(savedFavorites));
      setIsFavorite(true); // Update state isFavorite
      alert(`${pokemonDetail.name} added to favorites!`);
    }
  };

  const handleImageError = () => {
    setImageError(true); // Set imageError menjadi true jika gambar gagal dimuat
  };

  return (
    <div className="container">
      {pokemonDetail ? (
        <Card>
          <CardMedia
            component="img"
            height="300"
            // Cek apakah gambar valid, jika tidak gunakan gambar default
            image={
              imageError || !pokemonDetail.sprites?.other?.['official-artwork']?.front_default
                ? defaultImage
                : pokemonDetail.sprites?.other?.['official-artwork']?.front_default
            }
            alt={pokemonDetail.name}
            onError={handleImageError} // Jika gambar gagal dimuat, gunakan handleImageError
            style={{ objectFit: 'contain', backgroundColor: '#f7f7f7' }}
          />
          <CardContent>
            {/* Tombol Add to Favorites atau Already in Favorites */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addToFavorites}
              disabled={isFavorite}
              sx={{ marginBottom: '20px' }}
            >
              {isFavorite ? 'Already in Favorites' : 'Add to Favorites'}
            </Button>

            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{
                fontWeight: 'bold',
                textTransform: 'capitalize',
                color: '#3f51b5',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              {pokemonDetail.name}
            </Typography>
            <Typography variant="body1" align="center">
              Height: {pokemonDetail.height}
            </Typography>
            <Typography variant="body1" align="center" sx={{ marginBottom: '20px' }}>
              Weight: {pokemonDetail.weight}
            </Typography>

            {/* Tampilan yang lebih menarik untuk daftar Moves */}
            <Typography variant="h6" align="center" sx={{ marginTop: '20px' }}>
              Moves
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {pokemonDetail.moves.slice(0, 10).map((move, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                          color: '#ff5722',
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        {move.move.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        align="center"
                        sx={{ color: '#757575', marginTop: '10px' }}
                      >
                        Learned at: {move.version_group_details[0].level_learned_at || 'Unknown'}
                      </Typography>
                      <Typography variant="body2" align="center" sx={{ color: '#757575' }}>
                        Method: {move.version_group_details[0].move_learn_method.name}
                      </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                      <Button
                        size="small"
                        color="primary"
                        href={move.move.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h5" align="center">
          Loading...
        </Typography>
      )}
    </div>
  );
};

export default DetailPage;
